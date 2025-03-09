<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <!-- Directors  -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="zoom-out-left">
                    <div class="flex flex-col items-center">
                        <div class="w-full">
                            <img src="@/assets/images/elnur-vahabov.jpeg" alt="" class="mb-3 rounded-2xl w-full h-full object-cover">
                        </div>
                        <h5 class="font-extrabold text-main-text text-md md:text-xl">Direktor</h5>
                        <h5 class="font-extrabold text-main-text text-md md:text-xl">Dr.Elnur Vahabov</h5>
                    </div>
                    <div class="flex flex-col items-center">
                        <div>
                            <img src="@/assets/images/sevda-ceferova.jpeg" alt="" class="mb-3 rounded-2xl w-full h-full object-cover">
                        </div>
                        <h5 class="font-extrabold text-main-text text-md md:text-xl">Tibbi Direktor</h5>
                        <h5 class="font-extrabold text-main-text text-md md:text-xl">MD., PhD., MBA., MSc HM., UN Physician</h5>
                        <h5 class="font-extrabold text-main-text text-md md:text-xl">Dr.Sevda Cəfərova</h5>
                    </div>
                    <div></div>
                 </div>
                 <h1 class="text-main-text text-lg md:text-2xl font-bold my-4">Leyla Medical Center-in Direktor Kabineti ilə əlaqə forması</h1>
                <p class="text-main-text text-base">Biz daima inkişafdayıq. Bizim üçün sizin rahatlığınız və bizdən razılığınız çox vacibdir. Sizi narahat edən bir şey olduğu halda biz onu mütləq aradan qaldırmağa hazırıq. Öz təklifinizi və ya şikayətinizi aşağıdakı formanı doldurmağla Leyla Medical Center-in direktoruna məruzə edə bilərsiniz.</p>
                <div class="mt-5">
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(012) 490 21 31</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(012) 490 18 58</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(+994 50) 225 73 30</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-location-dot mr-2"></i>
                        <span>Xətai rayonu, Yusif Səfərov küç.19</span>
                    </div>
                </div>

                <form @submit.prevent="submitForm" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="patient_fullname" class="mb-2">Ad və Soyad</label>
                        <input v-model="patient_fullname" type="text" id="patient_fullname" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
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
                        v-model="patient_phone_number"
                        @input="onInput"
                        class="w-full pl-24 pr-2 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Telefon nömrəsi"
                        />
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="e_mail" class="mb-2">Elektron Ünvan</label>
                        <input v-model="e_mail" type="email" id="e_mail" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="patient_comment" class="mb-2">Təklif və Şikayət</label>
                        <textarea v-model="patient_comment" id="patient_comment" rows="4" class="border border-gray-300 p-2 rounded-md" required></textarea>
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
const patient_fullname = ref('');
const patient_phone_number = ref('');
const e_mail = ref('');
const patient_comment = ref('');
const formSubmitted = ref(false);
const formSuccess = ref(false);
const formError = ref('');

const onInput = (event) => {
  patient_phone_number.value = event.target.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};

const submitForm = async () => {
  formSubmitted.value = true;
  formSuccess.value = false;
  formError.value = '';

  try {
    const fullPhoneNumber = `${selectedCountry.value.dial_code}${patient_phone_number.value}`;
    console.log({
      patient_fullname: patient_fullname.value,
      patient_phone_number: fullPhoneNumber,
      e_mail: e_mail.value,
      patient_comment: patient_comment.value,
    }); // Göndərilən məlumatları konsolda göstərmək

    const response = await axios.post('http://bytexerp.online/api/leyla/v1/directoroffice-api/', {
      patient_fullname: patient_fullname.value,
      patient_phone_number: fullPhoneNumber,
      e_mail: e_mail.value,
      patient_comment: patient_comment.value,
    });

    if (response.status === 201) {
      formSuccess.value = true;
      // Formu təmizləmək
      patient_fullname.value = '';
      patient_phone_number.value = '';
      e_mail.value = '';
      patient_comment.value = '';
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