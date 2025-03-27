<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-5 md:mb-10">{{ pageTitle }}</h1>
            <p class="text-main-text text-base md:text-xl">E-randevu bölümü vasitəsilə Siz istənilən həkimin qəbuluna yazıla bilərsiniz. Bunun üçün şəxsi məlumatlarınız, qəbulunda olmaq istədiyiniz həkimin ixtisası və Adı / Soyadı, sizə uyğun olan qəbul günü və saatını qeyd etməyiniz kifayyətdir.</p>
            <br>
            <p class="text-main-text text-base md:text-xl">Qeyd etdiyiniz nömrənizə uyğun olaraq Çağrı Mərəzi operatorlarımız siznlə əlaqə saxlayacaq və qəbul günü / saatını təkrar olaraq sizinlə təsdiqlədəcək.</p>
            <br>
            <p class="text-main-text text-base md:text-xl">Sizin sağlamlığınız – bizim dəyərimizdir!</p>
            <br>
                <form @submit.prevent="submitForm" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2">Ad və Soyad</label>
                        <input v-model="name" type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
                    </div>

                    <!-- DOĞUM TARİXİ START  -->
                    <div class="flex flex-col w-full lg:w-1/2 relative">
                        <label for="birthdate" class="mb-2">Doğum Tarixi</label>
                        <VueDatePicker v-model="birthdate" id="birthdate" class="border border-gray-300 p-2 rounded-md" :enableTimePicker="false" format="dd-MM-yyyy" required>
                            <template #input="{ inputValue, inputEvents }">
                                <input
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    type="text"
                                    class="border border-gray-300 p-2 rounded-md w-full"
                                    placeholder="Doğum Tarixi"
                                />
                            </template>
                        </VueDatePicker>
                        <i class="fa-regular fa-calendar absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none hidden"></i>
                    </div>
                    <!-- DOĞUM TARİXİ END  -->

                    <!-- Şəxsiyyət vəsiqəsi -->
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="idCard" class="mb-2">Şəxsiyyət vəsiqəsi</label>
                        <input v-model="idCard" type="text" id="idCard" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <!-- Şəxsiyyət vəsiqəsi END -->

                    <!-- Phone  -->
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

                    <!-- Ünvan  -->
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="address" class="mb-2">Ünvan</label>
                        <input v-model="address" type="text" id="address" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <!-- Ünvan END -->

                    <!-- E - mail  -->
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="email" class="mb-2">Elektron Ünvan</label>
                        <input v-model="email" type="email" id="email" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <!-- E-mail End  -->

                    <!-- İxtisas  -->
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="specialty" class="mb-2">İxtisas</label>
                        <select v-model="specialty" id="specialty" class="border border-gray-300 p-2 rounded-md" required>
                            <option value="">Seçin</option>
                            <option value="1">Ümumi Cərrah</option>
                            <option value="2">Uşaq Cərrahı</option>
                            <option value="3">Estetik-Plastik Cərrah</option>
                            <option value="4">Mama-Ginekoloq</option>
                            <option value="5">Mammoloq</option>
                        </select>
                    </div>
                    <!-- İxtisas End -->

                    <!-- Sizə uyğun zaman  -->
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="preferredTime" class="mb-2">Sizə uyğun zaman</label>
                        <input v-model="preferredTime" type="text" id="preferredTime" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <!-- Sizə uyğun zaman END -->
                    
                    <div class="w-full mt-4">
                        <button type="submit" class="bg-primary px-5 py-3 rounded-md mr-5 h-[45px] text-white">Göndər</button>
                        <button type="button" @click="resetForm" class="bg-[#f07c00] text-white px-5 py-3 rounded-md h-[45px]">Yenilə</button>
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
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import { ref } from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';
import Maps from "@/components/Maps.vue"; 
// DatePicker 
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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
const idCard = ref('');
const phoneNumber = ref('');
const email = ref('');
const message = ref('');
const birthdate = ref('');
const address = ref('');
const preferredTime = ref('');
const specialty = ref('');
const formSubmitted = ref(false);
const formSuccess = ref(false);
const formError = ref('');

const onInput = (event) => {
  phoneNumber.value = event.target.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};

const resetForm = () => {
  name.value = '';
  idCard.value = '';
  phoneNumber.value = '';
  email.value = '';
  message.value = '';
  birthdate.value = '';
  address.value = '';
  preferredTime.value = '';
  specialty.value = '';
  selectedCountry.value = countries.value[0];
};

const submitForm = async () => {
  formSubmitted.value = true;
  formSuccess.value = false;
  formError.value = '';

  try {
    const fullPhoneNumber = `${selectedCountry.value.dial_code}${phoneNumber.value}`;
    const response = await axios.post('http://bytexerp.online/api/leyla/v1/directoroffice-api/', {
      name: name.value,
      idCard: idCard.value,
      phone: fullPhoneNumber,
      email: email.value,
      message: message.value,
      birthdate: birthdate.value,
      address: address.value,
      preferredTime: preferredTime.value,
      specialty: specialty.value,
    });

    if (response.status === 201) {
      formSuccess.value = true;
      // Formu təmizləmək
      resetForm();
    }
  } catch (error) {
    formError.value = 'Formu göndərərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.';
    console.error('Form submission error:', error);
  }
};

const pageTitle = ref('E-növbə');

// useHead tətbiqi ilə SEO məlumatlarını əlavə edirik
useHead({
    title: `Leyla Medical Center | ${pageTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: 'Leyla Medical Center-də onlayn randevu sistemi ilə istənilən həkimin qəbuluna rahatlıqla yazılın. Şəxsi məlumatlarınızı, qəbulunda olmaq istədiyiniz həkimin məlumatlarını və uyğun vaxtı qeyd etməklə sağlamlığınıza qayğı göstərin.'
    },
    { 
      name: 'keywords', 
      content: 'e-növbə, onlayn randevu, həkim qəbulu, Leyla Medical Center, onlayn tibbi xidmətlər, Azərbaycanda tibbi xidmətlər, həkim qəbuluna yazılmaq, tibbi randevu, elektron qeydiyyat' 
    },
    // Open Graph meta tagları sosial media paylaşımları üçün
    { property: 'og:title', content: 'Leyla Medical Center | E-növbə' },
    { property: 'og:description', content: 'Onlayn randevu sistemi ilə istənilən həkimimizin qəbuluna yazılın. Sizin sağlamlığınız – bizim dəyərimizdir!' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/online-services/e-appointment' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-mc-logo.png' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    // Twitter meta tagları
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leyla Medical Center | E-növbə' },
    { name: 'twitter:description', content: 'Onlayn randevu sistemi ilə istənilən həkimin qəbuluna yazılmağa və vaxtınıza qənaət etməyə imkan verir.' },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-mc-logo.png' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "name": "Leyla Medical Center",
        "url": "https://leylamc.com",
        "logo": "https://leylamc.com/images/leyla-mc-logo.png",
        "description": "Leyla Medical Center-də onlayn randevu sistemi ilə istənilən həkimin qəbuluna rahatlıqla yazılın.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mikayıl Müşfiq küçəsi, 2B",
          "addressLocality": "Bakı",
          "addressRegion": "Bakı",
          "postalCode": "AZ1005",
          "addressCountry": "AZ"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.3799",
          "longitude": "49.8469"
        },
        "telephone": "+994 12 310 10 10",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://leylamc.com/online-services/e-appointment",
            "inLanguage": "az",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Reservation",
            "name": "Onlayn həkim randevusu"
          }
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/online-services/e-appointment' }
  ]
});
</script>

<style scoped>
p{
    text-align: justify;
}

</style>