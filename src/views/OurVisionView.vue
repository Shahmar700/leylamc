<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ visionTitle }}</h1>
                <p class="mt-4 text-base md:text-lg lg:text-xl text-justify">{{ visionText }}</p>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";
import { useHead } from '@vueuse/head';

const visionTitle = ref('');
const visionText = ref('');

const fetchOurVision = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/ourvision-list/');
    const visionData = response.data.results[0];
    visionTitle.value = visionData.title;
    visionText.value = visionData.text;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

onMounted(() => {
  fetchOurVision();
});

// SEO meta məlumatları - reaktiv olaraq visionTitle dəyişdikdə yenilənəcək
watch(visionTitle, (newTitle) => {
  updateSEO();
});

// SEO məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
  useHead({
    title: `Leyla Medical Center | ${visionTitle.value}`,
    meta: [
      { 
        name: 'description', 
        content: `Leyla Medical Center-in missiyası və vizyonu. ${visionText.value.substring(0, 150)}...` 
      },
      { 
        name: 'keywords', 
        content: 'leyla medical center, leyla tibb mərkəzi, vizyon, missiya, tibbi xidmətlər, səhiyyə, sağlamlıq, tibb mərkəzi, azərbaycan tibb mərkəzi' 
      },
      { 
        property: 'og:title', 
        content: `Leyla Medical Center | ${visionTitle.value}` 
      },
      { 
        property: 'og:description', 
        content: `${visionTitle.value} - Leyla Medical Center-in missiyası, vizyonu və dəyərləri. ${visionText.value.substring(0, 150)}...`
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://leylamc.com/our-vision' },
      { property: 'og:image', content: 'https://leylamc.com/images/leyla-vision.jpg' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${visionTitle.value}` },
      { 
        name: 'twitter:description', 
        content: `${visionTitle.value} - Leyla Medical Center-in missiyası və vizyonu. ${visionText.value.substring(0, 150)}...`
      },
      { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-vision.jpg' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "description": visionText.value,
          "url": "https://leylamc.com/our-vision",
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
      { rel: 'canonical', href: 'https://leylamc.com/our-vision' }
    ]
  });
};
</script>

<style scoped>


</style>