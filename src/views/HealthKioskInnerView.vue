<template>
    <div class="container mt-16 text-main-text">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
  
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
        <div class="flex items-center">
          <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <p>{{ error }}</p>
        </div>
      </div>
  
      <div v-else class="flex flex-col md:flex-row md:items-start items-center justify-between">
        <div class="w-full md:w-3/4" data-aos="zoom-out-right">
          <div class="mb-8">
            <button @click="goBack" class="flex items-center text-primary hover:text-primary-dark transition-colors">
              <i class="fas fa-arrow-left mr-2"></i> Geri qayıt
            </button>
          </div>
          
          <h1 class="text-2xl md:text-3xl font-semibold mb-6">{{ healthKioskItem.title }}</h1>
          
          <div class="mb-6">
            <img :src="healthKioskItem.photo" :alt="healthKioskItem.title" class="w-full md:w-2/3 h-auto rounded-lg shadow-md">
          </div>
          
          <div v-if="healthKioskItem.text" class="prose max-w-none">
            <p class="text-base md:text-lg text-justify">{{ healthKioskItem.text }}</p>
          </div>
          
          <div v-else class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <p class="text-yellow-700">Bu məqalə üçün mətn hələ əlavə edilməyib.</p>
          </div>
          
          <div class="mt-6 text-sm text-gray-500">
            <p>Dərc edilmə tarixi: {{ formatDate(healthKioskItem.created_at) }}</p>
          </div>
        </div>
        
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
      
      <Maps class="mt-14 sm:mt-24"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useHead } from '@vueuse/head';
  
  import SideBanners from "@/components/SideBanners.vue";
  import SideBanners2 from "@/components/SideBanners2.vue";
  import Maps from "@/components/Maps.vue";
  
  const route = useRoute();
  const router = useRouter();
  
  const healthKioskItem = ref({});
  const loading = ref(true);
  const error = ref(null);
  
  // API-dən məlumatları çəkmək funksiyası
  // API-dən məlumatları çəkmək funksiyası
const fetchHealthKioskDetail = async () => {
  const id = parseInt(route.params.id);
  
  try {
    loading.value = true;
    
    // Detail endpoint əvəzinə list endpoint-indən istifadə edək və ID-yə görə filtrasiya edək
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/health-pavilion-list/');
    
    if (response.data && response.data.results) {
      // ID-yə görə elementin tapılması
      const item = response.data.results.find(item => item.id === id);
      
      if (item) {
        healthKioskItem.value = item;
        
        // SEO meta məlumatlarını yeniləyək
        updateSEO();
      } else {
        error.value = "Məlumat tapılmadı.";
      }
    } else {
      error.value = "Məlumatları yükləmək mümkün olmadı.";
    }
  } catch (err) {
    console.error("API xətası:", err);
    error.value = "Məlumatları yükləmək mümkün olmadı.";
  } finally {
    loading.value = false;
  }
};
  
  // Tarix formatlaması üçün funksiya
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Azərbaycan dilində ayların adları
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 
      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };
  
  // Geri qayıtmaq üçün funksiya
  const goBack = () => {
  // router.back(); - bu bəzən gözlənilməz nəticələrə səbəb ola bilər
  
  // Bunun əvəzinə köşk siyahısı səhifəsinə yönləndirək
  router.push({ 
    name: 'health-kiosk'
  });
  };

  const updateSEO = () => {
  // Köşk mətnindən təsvir yaradırıq (ilk 160 simvol)
  const description = healthKioskItem.value.text 
    ? healthKioskItem.value.text.substring(0, 160) + '...' 
    : `${healthKioskItem.value.title} - Leyla Medical Center Sağlıq Köşkündən məlumatlar`;
  
  useHead({
    title: `${healthKioskItem.value.title} - Leyla Medical Center`,
    meta: [
      // Əsas meta taglar
      { 
        name: 'description', 
        content: description
      },
      { 
        name: 'keywords', 
        content: `${healthKioskItem.value.title}, sağlamlıq köşkü, tibbi məlumatlar, leyla medical center, səhiyyə məlumatları, sağlamlıq məsləhətləri` 
      },
      
      // Open Graph meta tagları - sosial mediada paylaşım üçün
      { property: 'og:title', content: `${healthKioskItem.value.title} - Leyla Medical Center` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://leylamc.com/az/haqqımızda/mediada-biz/sağlıq-köşkü/${route.params.id}` },
      { property: 'og:image', content: healthKioskItem.value.photo || 'https://leylamc.com/images/leyla-mc-logo.png' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      { property: 'article:published_time', content: healthKioskItem.value.created_at },
      { property: 'article:modified_time', content: healthKioskItem.value.updated_at || healthKioskItem.value.created_at },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${healthKioskItem.value.title} - Leyla Medical Center` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: healthKioskItem.value.photo || 'https://leylamc.com/images/leyla-mc-logo.png' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthTopicContent",
          "headline": healthKioskItem.value.title,
          "description": description,
          "image": healthKioskItem.value.photo,
          "url": `https://leylamc.com/az/haqqımızda/mediada-biz/sağlıq-köşkü/${route.params.id}`,
          "datePublished": healthKioskItem.value.created_at,
          "dateModified": healthKioskItem.value.updated_at || healthKioskItem.value.created_at,
          "publisher": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/leyla-mc-logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://leylamc.com/az/haqqımızda/mediada-biz/sağlıq-köşkü/${route.params.id}`
          }
        })
      }
    ],
    link: [
      // Canonical link
      { rel: 'canonical', href: `https://leylamc.com/az/haqqımızda/mediada-biz/sağlıq-köşkü/${route.params.id}` }
    ]
  });
};

  // Komponentin yüklənməsi zamanı
  onMounted(() => {
    fetchHealthKioskDetail();
  });
  </script>
  
  <style scoped>
  /* Stil əlavələri burada */
  .prose {
    /* max-width: 65ch; */
    color: inherit;
  }
  
  .prose p {
    margin-bottom: 1em;
    line-height: 1.75;
  }
  
  img {
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.02);
  }
  </style>