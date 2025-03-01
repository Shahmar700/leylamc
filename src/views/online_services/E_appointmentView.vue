<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
            <p class="text-main-text text-base">E-randevu bölümü vasitəsilə Siz istənilən həkimin qəbuluna yazıla bilərsiniz. Bunun üçün şəxsi məlumatlarınız, qəbulunda olmaq istədiyiniz həkimin ixtisası və Adı / Soyadı, sizə uyğun olan qəbul günü və saatını qeyd etməyiniz kifayyətdir.</p>
            <br>
            <p class="text-main-text text-base">Qeyd etdiyiniz nömrənizə uyğun olaraq Çağrı Mərəzi operatorlarımız siznlə əlaqə saxlayacaq və qəbul günü / saatını təkrar olaraq sizinlə təsdiqlədəcək.</p>
            <br>
            <p class="text-main-text text-base">Sizin sağlamlığınız – bizim dəyərimizdir!</p>
            <br>
                <form @submit.prevent="submitForm" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2">Ad və Soyad</label>
                        <input v-model="name" type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
                    </div>

                    <!-- DOĞUM TARİXİ START  -->
                    <!-- DOĞUM TARİXİ END  -->
                    
                    <div class="relative flex flex-col w-full lg:w-1/2">
                        <!-- Ölkə kodu seçimi (absolute) -->
                        <select
                        v-model="selectedCountry"
                        class="absolute inset-y-0 left-0 pl-2 pr-6 border-r border-gray-300 bg-transparent focus:outline-none appearance-none"
                        >
                        <option
                            v-for="country in countries"
                            :key="country.code"
                            :value="country"
                        >
                            {{ country.flag }} {{ country.dial_code }}
                        </option>
                        </select>

                        <!-- Telefon nömrəsi üçün input -->
                        <input
                        type="text"
                        v-model="phoneNumber"
                        @input="onInput"
                        class="w-full pl-24 pr-2 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Telefon nömrəsi"
                        />
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="email" class="mb-2">Elektron Ünvan</label>
                        <input v-model="email" type="email" id="email" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="message" class="mb-2">Təklif və Şikayət</label>
                        <textarea v-model="message" id="message" rows="4" class="border border-gray-300 p-2 rounded-md" required></textarea>
                    </div>
                    <div class="w-full">
                        <button type="submit" class="greenBtn mt-4">Göndər</button>
                    </div>
                </form>

                <div v-if="formSubmitted" class="mt-4">
                    <p v-if="formSuccess" class="text-green-500">Form uğurla göndərildi!</p>
                    <p v-else class="text-red-500">{{ formError }}</p>
                </div>
            </div>
            <div class="w-[310px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <Maps class="mt-24"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";

const countries = ref([
  { name: 'Azərbaycan', dial_code: '+994', code: 'AZ', flag: '🇦🇿' },
  { name: 'Türkiye', dial_code: '+90', code: 'TR', flag: '🇹🇷' },
  { name: 'Rusiya', dial_code: '+7', code: 'RU', flag: '🇷🇺' },
  { name: 'ABŞ', dial_code: '+1', code: 'US', flag: '🇺🇸' },
  { name: 'Özbəkistan', dial_code: '+998', code: 'UZ', flag: '🇺🇿' },
  { name: 'Gürcüstan', dial_code: '+995', code: 'GE', flag: '🇬🇪' },
  { name: 'Türkmənistan', dial_code: '+993', code: 'TM', flag: '🇹🇲' },
]);

const selectedCountry = ref(countries.value[0]);
const name = ref('');
const phoneNumber = ref('');
const email = ref('');
const message = ref('');
const formSubmitted = ref(false);
const formSuccess = ref(false);
const formError = ref('');

const onInput = (event) => {
  phoneNumber.value = event.target.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};

const submitForm = async () => {
  formSubmitted.value = true;
  formSuccess.value = false;
  formError.value = '';

  try {
    const fullPhoneNumber = `${selectedCountry.value.dial_code}${phoneNumber.value}`;
    const response = await axios.post('http://192.168.2.242:8000/api/leyla/v1/directoroffice-api/', {
      name: name.value,
      phone: fullPhoneNumber,
      email: email.value,
      message: message.value,
    });

    if (response.status === 201) {
      formSuccess.value = true;
      // Formu təmizləmək
      name.value = '';
      phoneNumber.value = '';
      email.value = '';
      message.value = '';
    }
  } catch (error) {
    formError.value = 'Formu göndərərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.';
    console.error('Form submission error:', error);
  }
};
</script>

<style scoped>
p{
    text-align: justify;
}

</style>