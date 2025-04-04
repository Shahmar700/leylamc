<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-5 md:mb-10">{{ pageTitle }}</h1>
                <p class="mt-4 text-base md:text-xl font-normal text-justify">Tibbi suallarınızı, müxtəlif xəstəliklər haqqında suallarınızı, xəstəliklərin müalicəsi, diaqnostika üsulları, tibbi manipulyasiyaların qaydaları, həmçinin online həll oluna biləcək və cavablandırıla bilinəcək istənilən suallarınızı yönləndirə bilərsiniz.</p>
                <br>
                <form @submit.prevent="submitForm" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2">Ad və Soyad</label>
                        <input v-model="name" type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
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
                        <label for="message" class="mb-2">Sualınızı qeyd edin</label>
                        <textarea v-model="message" id="message" rows="4" class="border border-gray-300 p-2 rounded-md" required></textarea>
                    </div>
                    <div class="w-full">
                        <button type="submit" class="greenBtn mt-4">Göndər</button>
                    </div>
                </form>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'; // Əlavə edin
import { useHead } from '@vueuse/head';

// Səhifə başlığını tanımlayırıq
const pageTitle = ref('E-məsləhət');

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
const phoneNumber = ref('')

const onInput = (event) => {
  phoneNumber.value = event.target.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};


// Form məlumatları
const name = ref('');
const email = ref('');
const message = ref('');
const isSubmitting = ref(false);
const errors = ref({});

// Telefon nömrəsini tam formatda əldə etmək üçün
const fullPhoneNumber = computed(() => {
  return selectedCountry.value.dial_code + phoneNumber.value;
});

// Form göndərmə funksiyası
const submitForm = async () => {
  // Form validasiyasını yoxla
  if (!validateForm()) {
    return;
  }
  
  try {
    isSubmitting.value = true;
    
    // API üçün məlumatları hazırla
    const formData = {
      name_surname: name.value.trim(),
      phone: fullPhoneNumber.value,
      email: email.value.trim(),
      question: message.value.trim()
    };
    
    // API-yə məlumatları göndər
    await axios.post('https://bytexerp.online/api/leyla/v1/eadvice-create/', formData);
    
    // Uğurlu göndərmə mesajı
    Swal.fire({
      icon: 'success',
      title: 'Uğurlu əməliyyat',
      text: 'Məsləhət sorğunuz uğurla göndərildi. Tezliklə sizinlə əlaqə saxlanılacaq.',
    });
    
    // Formu təmizlə
    name.value = '';
    email.value = '';
    message.value = '';
    phoneNumber.value = '';
    
  } catch (error) {
    console.error('API xətası:', error);
    
    // Xəta mesajını hazırla
    let errorMessage = 'Məsləhət sorğunuzu göndərmək mümkün olmadı.';
    
    if (error.response && error.response.data) {
      console.log('API xəta detalları:', error.response.data);
      // Backend-dən gələn xəta mesajlarını göstər
      if (typeof error.response.data === 'object') {
        const firstError = Object.values(error.response.data)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
    }
    
    // Xəta mesajını göstər
    Swal.fire({
      icon: 'error',
      title: 'Xəta baş verdi',
      text: errorMessage,
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Form validasiyası
const validateForm = () => {
  errors.value = {};
  let isValid = true;
  
  // Ad Soyad validasiyası
  if (!name.value.trim()) {
    errors.value.name = 'Ad və soyad daxil edilməlidir';
    isValid = false;
  } else if (name.value.trim().length < 3) {
    errors.value.name = 'Ad və soyad minimum 3 simvol olmalıdır';
    isValid = false;
  }
  
  // Telefon validasiyası
  if (!phoneNumber.value.trim()) {
    errors.value.phone = 'Telefon nömrəsi daxil edilməlidir';
    isValid = false;
  }
  
  // Email validasiyası
  if (!email.value.trim()) {
    errors.value.email = 'Email ünvanı daxil edilməlidir';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    errors.value.email = 'Düzgün email ünvanı daxil edin';
    isValid = false;
  }
  
  // Sual validasiyası
  if (!message.value.trim()) {
    errors.value.message = 'Sualınızı daxil edin';
    isValid = false;
  } else if (message.value.trim().length < 10) {
    errors.value.message = 'Sualınız minimum 10 simvol olmalıdır';
    isValid = false;
  }
  
  // Xəta varsa, istifadəçiyə göstər
  if (!isValid) {
    let errorMessage = 'Zəhmət olmasa formda olan xətaları düzəldin:';
    for (const key in errors.value) {
      errorMessage += '\n- ' + errors.value[key];
    }
    
    Swal.fire({
      icon: 'warning',
      title: 'Diqqət',
      text: errorMessage,
    });
  }
  
  return isValid;
};

// SEO meta məlumatlarını əlavə edirik
useHead({
  title: `Leyla Medical Center | ${pageTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: 'Leyla Medical Center-in E-məsləhət xidməti ilə tibbi suallarınıza online cavab alın. Xəstəliklər, müalicə və diaqnostika üsulları haqqında mütəxəssis məsləhəti üçün müraciət edin.'
    },
    { 
      name: 'keywords', 
      content: 'e-məsləhət, online tibbi məsləhət, həkim məsləhəti, online konsultasiya, Leyla Medical Center, tibbi suallar, sağlamlıq məsləhəti, online həkim, tibbi konsultasiya, Azərbaycanda tibbi xidmətlər' 
    },
    // Open Graph meta tagları
    { property: 'og:title', content: `Leyla Medical Center | ${pageTitle.value}` },
    { property: 'og:description', content: 'Tibbi suallarınıza online cavab alın. Xəstəliklər, müalicə və diaqnostika üsulları haqqında mütəxəssis məsləhəti üçün müraciət edin.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/online-xidmətlər/e-məsləhət' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-mc-logo.png' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    // Twitter meta tagları
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
    { name: 'twitter:description', content: 'Tibbi suallarınıza online cavab alın. Xəstəliklər, müalicə və diaqnostika üsulları haqqında mütəxəssis məsləhəti üçün müraciət edin.' },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-mc-logo.png' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": `${pageTitle.value} | Leyla Medical Center`,
        "description": "Tibbi suallarınıza online cavab almaq üçün E-məsləhət xidməti",
        "url": "https://leylamc.com/az/online-xidmətlər/e-məsləhət",
        "provider": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": "https://leylamc.com/images/leyla-mc-logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mikayıl Müşfiq küçəsi, 2B",
            "addressLocality": "Bakı",
            "addressRegion": "Bakı",
            "postalCode": "AZ1005",
            "addressCountry": "AZ"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+994 12 310 10 10",
            "contactType": "customer service"
          }
        },
        "mainEntity": {
          "@type": "WebForm",
          "name": "E-məsləhət Formu",
          "description": "Tibbi suallarınızı, müxtəlif xəstəliklər haqqında suallarınızı, xəstəliklərin müalicəsi, diaqnostika üsulları, tibbi manipulyasiyaların qaydaları haqqında online məsləhət almaq üçün forma."
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/online-xidmətlər/e-məsləhət' }
  ]
});
</script>

<style scoped>


</style>