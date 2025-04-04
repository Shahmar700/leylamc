<template>
  <div class="container mt-14 mb:mt-16 text-main-text">
      <div class="flex flex-col md:flex-row items-center  md:items-start sm:justify-between">
          <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
              <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ missionTitle }}</h1>
              <p class="mt-4 text-base md:text-lg lg:text-xl text-justify" v-html="formattedMissionText"></p>
          </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
              <SideBanners class="mb-4" /> 
              <SideBanners2 class="mb-4" /> 
          </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const missionTitle = ref('');
const missionText = ref('');

const fetchOurMission = async () => {
try {
  const response = await axios.get('https://bytexerp.online/api/leyla/v1/ourmission-list/');
  const missionData = response.data.results[0];
  missionTitle.value = missionData.title;
  missionText.value = missionData.text;
} catch (error) {
  console.error('API çağırışında xəta:', error);
}
};

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedMissionText = computed(() => {
return missionText.value.replace(/\n/g, '<br>').replace(/(.*?:)/g, '<b>$1</b>'); // Başlıqları bold formatda göstərmək
});

// HTML təqləri təmizlənmiş mətn - meta açıqlamalar üçün
const plainMissionText = computed(() => {
return missionText.value.replace(/<[^>]*>/g, '');
});

onMounted(() => {
fetchOurMission();
});

// SEO meta məlumatları - reaktiv olaraq məlumatlar dəyişdikdə yenilənəcək
watch([missionTitle, missionText], () => {
if (missionTitle.value && missionText.value) {
  updateSEO();
}
});

// SEO məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
useHead({
  title: `Leyla Medical Center | ${missionTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: `Leyla Medical Center-in missiyası: ${plainMissionText.value.substring(0, 150)}...` 
    },
    { 
      name: 'keywords', 
      content: 'leyla medical center, leyla tibb mərkəzi, missiya, məqsəd, tibbi xidmətlər, səhiyyə, sağlamlıq, tibb mərkəzi, azərbaycan tibb mərkəzi, keyfiyyətli tibbi xidmət' 
    },
    { 
      property: 'og:title', 
      content: `Leyla Medical Center | ${missionTitle.value}` 
    },
    { 
      property: 'og:description', 
      content: `${missionTitle.value} - Leyla Medical Center-in missiyası və məqsədləri. ${plainMissionText.value.substring(0, 150)}...`
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/missiyamız' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-mission.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Leyla Medical Center | ${missionTitle.value}` },
    { 
      name: 'twitter:description', 
      content: `${missionTitle.value} - Leyla Medical Center-in missiyası. ${plainMissionText.value.substring(0, 150)}...`
    },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-mission.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Leyla Medical Center",
        "description": plainMissionText.value,
        "url": "https://leylamc.com/az/haqqımızda/missiyamız",
        "logo": {
          "@type": "ImageObject",
          "url": "https://leylamc.com/images/logo.png"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bakı",
          "addressCountry": "Azərbaycan"
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/missiyamız' }
  ]
});
};
</script>

<style scoped>
ul{
  list-style: disc;
}
</style>