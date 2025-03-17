<template>
    <div class="container mt-16 text-main-text">
      <div v-if="loading" class="text-center py-10">
        <p>Yüklənir...</p>
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else-if="vacancy" class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <div class="mb-6">
            <button @click="goBack" class="flex items-center text-gray-600 mb-4 text-sm sm:text-base">
              <i class="fa-solid fa-arrow-left mr-2"></i> Geriyə
            </button>
            <img :src="vacancy.image" :alt="vacancy.title" class="w-full max-h-[400px] object-cover rounded-lg mb-6">
            <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">{{ vacancy.title }}</h1>
            <h3 class="text-sm sm:text-base md:text-lg">Leyla Medical Center aşağıda qeyd edilən ixtisaslar üzrə vakant yerlər elan edir:</h3>
            <div class="vacancy-details mt-6 sm:mt-8">
              <div class="mb-4 sm:mb-6">
                <h2 class="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-green-600">Vəzifə</h2>
                <p class="text-sm sm:text-base">{{ vacancy.job_position }}</p>
              </div>
  
              <div class="mb-4 sm:mb-6">
                <h2 class="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-green-600">Əmək haqqı</h2>
                <p class="text-sm sm:text-base">{{ vacancy.job_salary }} AZN</p>
              </div>
  
              <div class="mb-4 sm:mb-6">
                <h2 class="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-green-600">Tələb olunan bacarıqlar</h2>
                <div class="text-sm sm:text-base vacancy-content" v-html="formatText(vacancy.skills_demand)"></div>
              </div>
            </div>
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
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useHead } from '@vueuse/head';
  
  import SideBanners from "@/components/SideBanners.vue";
  import SideBanners2 from "@/components/SideBanners2.vue";
  import Maps from "@/components/Maps.vue";
  
  const route = useRoute();
  const router = useRouter();
  const vacancy = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchVacancyDetail = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/vacancy-list/${route.params.slug}/`);
    vacancy.value = response.data;
    
    // Məlumatlar uğurla yükləndikdən sonra SEO meta taglarını əlavə edirik
    updateSEO();
  } catch (err) {
    error.value = "Vakansiya məlumatlarını yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};

// Meta və SEO məlumatlarını əlavə etmək üçün funksiya
const updateSEO = () => {
  if (!vacancy.value) return;
  
  // Vakansiya tələblərinin mətnə çevrilmiş versiyası (HTML olmadan)
  const plainSkills = vacancy.value.skills_demand ? 
    vacancy.value.skills_demand.replace(/<[^>]*>/g, ' ').substring(0, 160) : '';
  
  // Meta description üçün mətn
  const metaDescription = `${vacancy.value.job_position} vakansiyası: ${vacancy.value.job_salary} AZN maaş. ${plainSkills}`;
  
  useHead({
    title: `Leyla Medical Center Vakansiyaları | ${vacancy.value}`,
    meta: [
      { 
        name: 'description', 
        content: metaDescription
      },
      { 
        name: 'keywords', 
        content: `${vacancy.value.title}, vakansiya, iş, ${vacancy.value.job_position}, tibb sahəsi, Leyla Medical Center, karyera` 
      },
      // Open Graph meta tagları
      { property: 'og:title', content: `${vacancy.value.title} | Leyla Medical Center` },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://leylamc.com/vacancies/${route.params.slug}` },
      { property: 'og:image', content: vacancy.value.image },
      { property: 'og:locale', content: 'az_AZ' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${vacancy.value.title} | Leyla Medical Center` },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: vacancy.value.image },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": vacancy.value.title,
          "description": vacancy.value.skills_demand || "",
          "datePosted": new Date().toISOString(),
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Leyla Medical Center",
            "sameAs": "https://leylamc.com",
            "logo": "https://leylamc.com/images/logo.png"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bakı",
              "addressRegion": "Bakı",
              "addressCountry": "Azərbaycan"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "AZN",
            "value": {
              "@type": "QuantitativeValue",
              "value": vacancy.value.job_salary,
              "unitText": "MONTH"
            }
          },
          "skills": plainSkills
        })
      }
    ],
    link: [
      { rel: 'canonical', href: `https://leylamc.com/vacancies/${route.params.slug}` }
    ]
  });
};
  
  onMounted(() => {
    fetchVacancyDetail();
  });
  
  const goBack = () => {
    router.push({ name: 'vacancies' });
  };
  
  const formatText = (text) => {
    if (!text) return '';
    return text.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
  };
  </script>
  
  <style scoped>
  .vacancy-content :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  .vacancy-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
  
  .vacancy-content :deep(li) {
    margin-bottom: 0.5rem;
  }
  </style>