<template>
    <div class="container mt-14 md:mt-16 text-main-text">
        <!-- Yüklənmə göstəricisi -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>

        <!-- Xəta göstəricisi (əgər varsa) -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
            <div class="flex items-center">
                <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <p>{{ error }}</p>
            </div>
        </div>

        <div v-else class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class="w-full sm:w-3/4">
                <!-- API-dən gələn şəkli göstəririk -->
                <img v-if="photoUrl" :src="photoUrl" alt="Keyfiyyət sertifikatı" class="w-full rounded-lg shadow-lg mb-6"/>
                
                <h1 class="text-main-text text-2xl md:text-3xl my-6 font-medium">{{ title }}</h1>
                
                <!-- API-dən gələn mətn varsa, onu göstəririk -->
                <div v-if="formattedText" class="font-normal text-base md:text-lg lg:text-xl mt-4" v-html="formattedText"></div>
                
                <!-- API-dən mətn gəlməsə, statik mətnləri göstəririk -->
                <div v-else>
                    <p class="font-normal text-base md:text-lg lg:text-xl mt-4">"İntertek Azeri LTD" MMC tərəfindən Mərkəzimizdə keçirilən Beynəlxalq Standarta uyğunluq üzrə audit nəticəsində ISO 9001:2015 sertifikatına layiq görüldük❗</p>
                    <p class="font-normal text-base md:text-lg lg:text-xl mt-4">22 illik fəaliyyətimiz çərçivəsində əsas məqsədimiz əhalinin sağlamlığının yaxşılaşdırılmaq, səhiyyə sisteminin inkişafına və bu sahəyə olan etimadın daha da gücləndirilməsinə dəstək olmaqdır. Eyni zamanda, reproduktiv sağlamlıq strateqiyasını yaxşılaşdırmaqla yanaşı, Azərbaycan səhiyyəsində prioritet sahələr üzrə yeni innovasiyaları və müalicə metodlarını tətbiq etmək, ən son tibbi texnologiyalardan istifadə etməklə sağlamlıq sektorunda marka yaratmaq, qazandığımız uğurları dünya səhiyyə sisteminə inteqrasiya etmək, yerli və xarici vətəndaşlara yüksək səviyyədə diaqnostik və müalicə xidmətləri göstərməkdir.</p>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useHead } from '@vueuse/head';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

// Reaktiv dəyişənlər
const title = ref('Keyfiyyətə Nəzarət');
const text = ref('');
const photoUrl = ref('');
const isLoading = ref(true);
const error = ref(null);

// API-dən məlumatları almaq funksiyası
const fetchQualityControl = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/qualitycontrol-list/');
    const data = response.data.results[0];
    
    if (data) {
      title.value = data.title || 'Keyfiyyətə Nəzarət';
      text.value = data.text || '';
      photoUrl.value = data.photo || '';
    } else {
      error.value = 'Məlumat tapılmadı';
    }
  } catch (err) {
    console.error('API çağırışında xəta:', err);
    error.value = 'Məlumatları yükləmək mümkün olmadı';
  } finally {
    isLoading.value = false;
  }
};

// Mətnin formatlanması üçün computed xüsusiyyət
const formattedText = computed(() => {
  return text.value ? text.value.replace(/\n/g, '<br>') : '';
});

// HTML təqləri olmayan təmiz mətn (meta açıqlamalar üçün)
const plainText = computed(() => {
  return text.value ? text.value.replace(/<[^>]*>/g, '').replace(/\n/g, ' ') : '';
});

// Standart təsvir mətni (API-dən mətn gəlməsə)
const defaultDescription = 'Leyla Medical Center ISO 9001:2015 sertifikatına layiq görülmüşdür. Keyfiyyətə nəzarət və səhiyyə sahəsində qabaqcıl xidmətlərimiz haqqında məlumat əldə edin.';

// SEO meta məlumatları üçün reaktiv baxış
watch([title, text, photoUrl], () => {
  updateSEO();
});

// SEO məlumatlarını yeniləmək funksiyası
const updateSEO = () => {
  useHead({
    title: `Leyla Medical Center | ${title.value}`,
    meta: [
      { 
        name: 'description', 
        content: plainText.value ? plainText.value.substring(0, 160) : defaultDescription
      },
      { 
        name: 'keywords', 
        content: 'keyfiyyətə nəzarət, ISO 9001:2015, tibbi xidmətlər, Leyla Medical Center, səhiyyə standartları, tibbi sertifikatlar, beynəlxalq standartlar' 
      },
      { 
        property: 'og:title', 
        content: `Leyla Medical Center | ${title.value}` 
      },
      { 
        property: 'og:description', 
        content: plainText.value ? plainText.value.substring(0, 160) : defaultDescription 
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/keyfiyyətə-nəzarət' },
      { property: 'og:image', content: photoUrl.value || 'https://leylamc.com/images/quality-certificate.jpg' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${title.value}` },
      { name: 'twitter:description', content: plainText.value ? plainText.value.substring(0, 160) : defaultDescription },
      { name: 'twitter:image', content: photoUrl.value || 'https://leylamc.com/images/quality-certificate.jpg' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title.value,
          "description": plainText.value || defaultDescription,
          "url": "https://leylamc.com/az/haqqımızda/keyfiyyətə-nəzarət",
          "image": photoUrl.value || 'https://leylamc.com/images/quality-certificate.jpg',
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
            "headline": title.value,
            "description": plainText.value || defaultDescription,
            "image": photoUrl.value || 'https://leylamc.com/images/quality-certificate.jpg'
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/keyfiyyətə-nəzarət' }
    ]
  });
};

// Səhifə yüklənəndə API-dən məlumatları çək
onMounted(() => {
  fetchQualityControl();
});
</script>

<style scoped>
ul{
    list-style: disc;
}
</style>