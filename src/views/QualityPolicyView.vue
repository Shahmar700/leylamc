<template>
  <div class="container mt-14 mb:mt-16 text-main-text">
      <div class="flex flex-col md:flex-row items-center md:items-start sm:justify-between">
          <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
              <h1 class="text-2xl md:text-3xl font-semibold mb-5 md:mb-10">{{ policyTitle }}</h1>
              <p class="text-base md:text-lg lg:text-xl" v-html="formattedPolicyText"></p>
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
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import { useHead } from '@vueuse/head';

const policyTitle = ref('');
const policyText = ref('');

const fetchQualityPolicy = async () => {
try {
  const response = await axios.get('http://bytexerp.online/api/leyla/v1/qualitypolicy-list/');
  const policyData = response.data.results[0];
  policyTitle.value = policyData.title;
  policyText.value = policyData.text;
} catch (error) {
  console.error('API çağırışında xəta:', error);
}
};

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedPolicyText = computed(() => {
return policyText.value
  .replace(/\n/g, '<br>')
  .replace(/(.*?:)/g, '<b>$1</b>'); // Başlıqları bold formatda göstərmək
});

// HTML təqləri olmayan təmiz mətn (meta açıqlamalar üçün)
const plainPolicyText = computed(() => {
return policyText.value.replace(/<[^>]*>/g, '');
});

onMounted(() => {
fetchQualityPolicy();
});

// SEO meta məlumatları - reaktiv olaraq məlumatlar dəyişdikdə yenilənəcək
watch([policyTitle, policyText], () => {
if (policyTitle.value && policyText.value) {
  updateSEO();
}
});

// SEO məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
useHead({
  title: `Leyla Medical Center | ${policyTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: `Leyla Medical Center-in keyfiyyət siyasəti: ${plainPolicyText.value.substring(0, 150)}...` 
    },
    { 
      name: 'keywords', 
      content: 'leyla medical center, keyfiyyət siyasəti, tibb mərkəzi standartları, keyfiyyətə nəzarət, tibbi xidmət keyfiyyəti, beynəlxalq standartlar, ISO standartları, sağlamlıq xidmətləri keyfiyyəti' 
    },
    { 
      property: 'og:title', 
      content: `Leyla Medical Center | ${policyTitle.value}` 
    },
    { 
      property: 'og:description', 
      content: `${policyTitle.value} - Leyla Medical Center-in keyfiyyət idarəetmə sistemi və standartları. ${plainPolicyText.value.substring(0, 150)}...`
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/keyfiyyət-siyasəti' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-quality-policy.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Leyla Medical Center | ${policyTitle.value}` },
    { 
      name: 'twitter:description', 
      content: `${policyTitle.value} - Leyla Medical Center-in keyfiyyət idarəetmə siyasəti. ${plainPolicyText.value.substring(0, 150)}...`
    },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-quality-policy.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": policyTitle.value,
        "description": plainPolicyText.value.substring(0, 150),
        "url": "https://leylamc.com/az/haqqımızda/keyfiyyət-siyasəti",
        "publisher": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": {
            "@type": "ImageObject",
            "url": "https://leylamc.com/images/logo.png"
          }
        },
        "mainEntity": {
          "@type": "Article",
          "headline": policyTitle.value,
          "description": plainPolicyText.value.substring(0, 150),
          "publisher": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/logo.png"
            }
          }
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/keyfiyyət-siyasəti' }
  ]
});
};
</script>

<style scoped>
ul{
  list-style: disc;
}
</style>