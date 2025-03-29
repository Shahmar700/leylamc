<template>
    <div class="container mt-16 text-main-text">
        <!-- Yüklənmə göstəricisi -->
        <div v-if="isSubmitting" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
        </div>

        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <!-- Satisfaction survey  -->
            <div>
                <div class="lg:w-3/4" data-aos="zoom-out-right">
                    <h1 class="text-2xl font-bold mb-6">{{ satisfactionHeader }}</h1>
                    
                    <!-- Uğurlu göndərmə mesajı -->
                    <div v-if="submitSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        <p>Anket uğurla göndərildi. Təşəkkür edirik!</p>
                    </div>

                    <!-- Xəta mesajı -->
                    <div v-if="submitError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        <p>{{ submitError }}</p>
                    </div>

                    <form @submit.prevent="submitForm" class="mt-6">
                        <!-- Suallar -->
                        <div v-for="(question, index) in questions" :key="index" class="question flex flex-col mb-10 text-sm lg:text-lg">
                            <p class="mb-2 lg:mr-7">{{ question.text }}</p>
                            <div class="flex gap-2 md:first-letter:gap-5">
                                <label v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :for="'numInput-' + index + '-' + rating" :class="{ selected: question.selectedRating === rating }" class="mr-2 md:mr-5 text-sm md:text-base">
                                    <div class="flex flex-col justify-center screen-500:flex-row">
                                        <input class="cursor-pointer" :id="'numInput-' + index + '-' + rating" type="radio" :name="'question-' + index" :value="rating" v-model="question.selectedRating" />
                                        <span class="ml-0 screen-375:ml-1 md:ml-2 mt-2 screen-500:mt-0 text-white bg-[#6bb42b7a] font-semibold py-1 px-[10px] rounded-full">{{ rating }}</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- İstifadə edilmiş xidmət -->
                        <div class="flex flex-col w-full lg:w-2/3 text-base lg:text-lg mb-6">
                            <label for="usedService" class="mb-2 !text-main-text">İstifadə etdiyiniz xidmət</label>
                            <input type="text" id="usedService" v-model="formData.used_service" class="border border-gray-300 p-2 rounded-md">
                        </div>

                        <!-- Təklif və irad -->
                        <div class="flex flex-col w-full lg:w-2/3 text-base lg:text-lg mb-6">
                            <label for="message" class="mb-2 !text-main-text">Təklif və iradınız</label>
                            <textarea id="message" rows="4" v-model="formData.patient_comment" class="border border-gray-300 p-2 rounded-md"></textarea>
                        </div>

                        <div class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5 text-base lg:text-lg">
                            <div class="flex flex-col w-full lg:w-2/3">
                                <label for="name" class="mb-2 !text-main-text">Ad, Soyad <span class="text-red-500">*</span></label>
                                <input type="text" id="name" v-model="formData.patient_name" class="border border-gray-300 p-2 rounded-md" required>
                                <p v-if="validationErrors.name" class="text-red-500 text-sm mt-1">{{ validationErrors.name }}</p>
                            </div>
                            <div class="flex flex-col w-full lg:w-2/3">
                                <label for="phone" class="mb-2 !text-main-text">Əlaqə Nömrəsi <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <!-- Ölkə kodu seçimi -->
                                    <div class="absolute inset-y-0 left-0 flex items-center px-3 border-r border-gray-300 rounded-l-md">
                                        <select v-model="selectedCountry" class="bg-transparent border-0 outline-none" style="width: 80px">
                                            <option v-for="country in countries" :key="country.code" :value="country">
                                                {{ country.flag }} {{ country.dial_code }}
                                            </option>
                                        </select>
                                    </div>
                                    
                                    <!-- Telefon nömrəsi üçün input -->
                                    <input
                                        type="text"
                                        id="phone"
                                        v-model="phoneNumberInput"
                                        @input="onPhoneInput"
                                        class="w-full pl-28 pr-2 py-2 border border-gray-300 rounded focus:outline-none"
                                        placeholder="Telefon nömrəsi"
                                        required
                                    />
                                </div>
                                <p v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">{{ validationErrors.phone }}</p>
                            </div>
                            <div class="w-full">
                                <button type="submit" class="greenBtn mt-4" :disabled="isSubmitting">
                                    {{ isSubmitting ? 'Göndərilir...' : 'Göndər' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <Maps class="mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import { ref, reactive, watch  } from "vue";
import axios from 'axios';
import { useHead } from '@vueuse/head';
import Swal from 'sweetalert2'

// Xəta və yüklənmə state-ləri
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(null);
const validationErrors = reactive({
    name: '',
    phone: ''
});

const satisfactionHeader = ref('Məmnunluq anketi')

// Suallar
const questions = ref([
  { text: "*0101 Çağrı Mərkəzinin operativliyi", selectedRating: null, field: "call_center_evaluation" },
  { text: "Qeydiyyat şöbəsinin peşəkarlığı", selectedRating: null, field: "reception_evaluation" },
  { text: "Biomaterial qəbulu (Qanalma) şöbəsinin fəaliyyəti", selectedRating: null, field: "bloodletting_evaluation" },
  { text: "Müayinə nəticələrinin təyin olunan vaxta uyğun olaraq təhvil verilməsi", selectedRating: null, field: "test_date_evaluation" },
  { text: "Xidmətlərin qiyməti", selectedRating: null, field: "service_price_evaluation" },
  { text: '"Ünvanda Xidmət" əməkdaşlarının operativliyi', selectedRating: null, field: "home_service_evaluation" },
  { text: '"E-nəticə" xidməti daxilində nəticələrinin elektron emailinizə göndərilməsi/saytdan əldə olunması', selectedRating: null, field: "eservices_evaluation" },
]);

// Ölkə siyahısı
const countries = ref([
    { name: 'Azərbaycan', dial_code: '+994', code: 'AZ', flag: '🇦🇿' },
    { name: 'Türkiye', dial_code: '+90', code: 'TR', flag: '🇹🇷' },
    { name: 'Rusiya', dial_code: '+7', code: 'RU', flag: '🇷🇺' },
    { name: 'ABŞ', dial_code: '+1', code: 'US', flag: '🇺🇸' },
    { name: 'Özbəkistan', dial_code: '+998', code: 'UZ', flag: '🇺🇿' },
    { name: 'Gürcüstan', dial_code: '+995', code: 'GE', flag: '🇬🇪' },
    { name: 'Türkmənistan', dial_code: '+993', code: 'TM', flag: '🇹🇲' },
]);

// Seçilmiş ölkə - default olaraq Azərbaycan
const selectedCountry = ref(countries.value[0]);

// Telefon nömrəsi üçün yardımçı dəyişənlər
const phoneNumberInput = ref('');

// Telefon inputu üçün təmizləmə funksiyası
const onPhoneInput = (event) => {
    phoneNumberInput.value = event.target.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
    
    // formData-dakı patient_number-i avtomatik yeniləyirik
    formData.patient_number = selectedCountry.value.dial_code + phoneNumberInput.value;
};

// watch ilə selectedCountry dəyişdikdə patient_number-i yeniləyirik
watch(selectedCountry, () => {
    formData.patient_number = selectedCountry.value.dial_code + phoneNumberInput.value;
});

// Form məlumatları
const formData = reactive({
    patient_name: '',
    patient_number: '',
    patient_comment: '',
    used_service: '',
    call_center_evaluation: null,
    reception_evaluation: null,
    bloodletting_evaluation: null,
    test_date_evaluation: null,
    service_price_evaluation: null,
    home_service_evaluation: null,
    eservices_evaluation: null
});

// Validasiya funksiyası
const validateForm = () => {
    let isValid = true;
    validationErrors.name = '';
    validationErrors.phone = '';
    
    if (!formData.patient_name || formData.patient_name.trim().length === 0) {
        validationErrors.name = 'Ad və soyad daxil etmək zəruridir';
        isValid = false;
    }
    
    if (!phoneNumberInput.value || phoneNumberInput.value.trim().length === 0) {
        validationErrors.phone = 'Əlaqə nömrəsi daxil etmək zəruridir';
        isValid = false;
    } else if ((selectedCountry.value.dial_code + phoneNumberInput.value).length > 15) {
        validationErrors.phone = 'Əlaqə nömrəsi 15 simvoldan uzun ola bilməz';
        isValid = false;
    }
    
    return isValid;
};

// Formu təmizləmək üçün funksiya
const resetForm = () => {
    formData.patient_name = '';
    phoneNumberInput.value = '';
    formData.patient_number = '';
    formData.patient_comment = '';
    formData.used_service = '';
    
    // Bütün sual reytinqlərini sıfırlayırıq
    questions.value.forEach(question => {
        question.selectedRating = null;
        formData[question.field] = null;
    });
};

// Form göndərmə funksiyası
const submitForm = async () => {
    // Form validasiyası
    if (!validateForm()) {
        // Validasiya xətası üçün SweetAlert bildirişi
        Swal.fire({
            title: 'Diqqət!',
            text: 'Zəhmət olmasa, bütün tələb olunan sahələri doldurun.',
            icon: 'warning',
            confirmButtonText: 'Bağla',
            confirmButtonColor: '#6ab42b'
        });
        return;
    }
    
    // Əgər heç bir sual cavablandırılmayıbsa
    const hasAnyRating = questions.value.some(q => q.selectedRating !== null);
    if (!hasAnyRating) {
        Swal.fire({
            title: 'Diqqət!',
            text: 'Zəhmət olmasa, ən azı bir xidməti qiymətləndirin.',
            icon: 'warning',
            confirmButtonText: 'Bağla',
            confirmButtonColor: '#6ab42b'
        });
        return;
    }
    
    // Sualların cavablarını formData-ya köçürürük
    questions.value.forEach(question => {
        formData[question.field] = question.selectedRating;
    });
    
    // Yüklənmə başladığını göstəririk
    isSubmitting.value = true;
    submitError.value = null;
    
    try {
        // Göndərmə bildirişi
        Swal.fire({
            title: 'Göndərilir...',
            text: 'Zəhmət olmasa, gözləyin',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // API sorğusu
        const response = await axios.post('https://bytexerp.online/api/leyla/v1/satisfactionsurvey-create/', formData);
        
        // Uğurlu nəticə - SweetAlert ilə bildiriş
        Swal.fire({
            title: 'Təşəkkür edirik!',
            text: 'Məmnunluq anketini doldurduğunuz üçün təşəkkür edirik. Rəyiniz bizim üçün dəyərlidir!',
            icon: 'success',
            confirmButtonText: 'Bağla',
            confirmButtonColor: '#6ab42b'
        });
        
        submitSuccess.value = true;
        console.log('Form uğurla göndərildi:', response.data);
        
        // Formu təmizləyirik
        resetForm();
        
    } catch (error) {
        // Xəta baş verərsə
        console.error('Form göndərmə xətası:', error);
        
        let errorMessage = 'Form göndərilərkən gözlənilməz xəta baş verdi.';
        
        if (error.response) {
            // Server xətası
            errorMessage = `Məlumatları göndərərkən xəta baş verdi: ${error.response.data.message || 'Server xətası'}`;
        } else if (error.request) {
            // Sorğu xətası
            errorMessage = 'Serverə qoşulmaq mümkün olmadı. İnternet bağlantınızı yoxlayın.';
        }
        
        // SweetAlert ilə xəta bildirişi
        Swal.fire({
            title: 'Xəta!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Yenidən cəhd edin',
            confirmButtonColor: '#d33'
        });
        
        submitError.value = errorMessage;
    } finally {
        // Yüklənməni bitiririk
        isSubmitting.value = false;
    }
};

// SEO meta məlumatları
useHead({
    title: `Leyla Medical Center | ${satisfactionHeader.value}`,
    meta: [
        { name: 'description', content: 'Leyla Medical Center-in xidmətləri haqqında fikirlərinizi bizimlə bölüşün.' },
        { property: 'og:title', content: 'Məmnunluq Anketi - Leyla Medical Center' },
        { property: 'og:description', content: 'Leyla Medical Center-in xidmətləri haqqında fikirlərinizi bizimlə bölüşün.' },
        { property: 'og:type', content: 'website' },
        { name: 'keywords', content: 'məmnunluq anketi, tibbi xidmətlər, Leyla Medical Center rəyləri' },
    ],
});
</script>

<style scoped>
p{
    text-align: justify;
}
select {
    appearance: none;
}

.relative {
    position: relative;
}
.absolute {
    position: absolute;
}
label {
  cursor: pointer;
  color: lightgray;
  user-select: none;
}

label.selected {
  color: black;
}

.inset-y-0 {
    top: 0;
    bottom: 0;
}

.left-0 {
    left: 0;
}
.selected span{
    background-color: lightgreen;
    color: #fff;
}

label.selected span{
    background-color: #6ab42b;
}

.greenBtn {
    background-color: #6ab42b;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s;
}

.greenBtn:hover {
    background-color: #589c22;
}

.greenBtn:disabled {
    background-color: #a0d38a;
    cursor: not-allowed;
}
</style>