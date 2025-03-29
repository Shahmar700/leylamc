<template>
  <div class="container mt-16 text-main-text">
    <!-- Skeleton yükləməsi -->
    <SkeletonLoader v-if="showSkeleton" :contentLines="8" :showLink="true" />

    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <h1 class="text-3xl font-semibold mb-10">{{ serviceData?.title || serviceData?.title_az }}</h1>
        <div class="sm:text-lg text-justify" v-html="formattedText"></div>
        <br>
        
        <!-- Service links if available -->
        <div class="flex flex-col flex-wrap gap-4 mt-4">
            <a v-if="serviceData?.service_link" target="_blank" 
              :href="serviceData.service_link" 
              class="text-green-600 hover:text-green-800 text-[14px] screen-400:text-base flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i> Ətraflı məlumat üçün
            </a>
          
            <a v-if="serviceData?.link" target="_blank" 
              :href="serviceData.link" 
              class="text-green-600 hover:text-green-800 text-[14px] screen-400:text-base flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i> Ətraflı məlumat üçün
            </a>

            <a v-if="serviceData?.link1" target="_blank" 
              :href="serviceData.link1" 
              class="text-green-600 hover:text-green-800  text-[14px] screen-400:text-base flex items-center">
              <i class="fas fa-external-link-alt mr-2"></i> Ətraflı məlumat üçün
            </a>
          </div>
        <!-- Service photo if available -->
        <div v-if="serviceData?.photo" class="mt-10">
          <img :src="serviceData.photo" :alt="serviceData.title" class="w-full max-w-3xl mx-auto rounded-lg">
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
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";
import { useHead } from '@vueuse/head';

// Route əldə edirik
const route = useRoute();

// Data state-ləri
const serviceData = ref(null);
const error = ref(null);

// Skeleton loading hookunu 400ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(400);

// Tibbi xidmət məlumatlarını çəkmək
const fetchServiceDetails = async (slug) => {
if (!slug) {
  console.error('Slug parametri tapılmadı');
  error.value = 'Səhifə tapılmadı';
  stopLoading(); // useSkeleton hook-u ilə yükləməni dayandır
  return;
}

try {
  // Skeleton Yükləməni başlat
  startLoading();
  error.value = null;
  
  console.log(`API sorğusu göndərilir: http://bytexerp.online/api/leyla/v1/medical-service-list/${slug}/`);
  
  // Əsas məlumatları əldə edirik
  const response = await axios.get(`http://bytexerp.online/api/leyla/v1/medical-service-list/${slug}/`);
  
  console.log("API cavabı:", response);
  
  if (response.data) {
    serviceData.value = response.data;
    console.log("Alınan tibbi xidmət məlumatı:", serviceData.value);
    // SEO məlumatlarını yeniləyirik
    updateSEO();
  } else {
    throw new Error('Medical service not found');
  }
} catch (err) {
  console.error("Tibbi xidmət API çağırışında xəta:", err);
  console.error("Xəta detalları:", err.response ? err.response.data : "Response yoxdur");
  error.value = "Məlumatları yükləmək mümkün olmadı. Xahiş edirik daha sonra yenidən cəhd edin.";
} finally {
  // Skeleton Yükləməni dayandır
  stopLoading();
}
};

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedText = computed(() => {
const text = serviceData.value?.text_az || serviceData.value?.text || '';
return text
  .replace(/\n/g, "<br>")
  .replace(/(.*?:)/g, "<b>$1</b>"); // Başlıqları bold formatda göstərmək
});

// HTML təqləri olmayan təmiz mətn üçün computed property
const plainText = computed(() => {
if (!serviceData.value) return '';
const text = serviceData.value?.text_az || serviceData.value?.text || '';
return text
  .replace(/<[^>]*>/g, '')
  .replace(/\n/g, ' ')
  .trim();
});

// Meta açıqlamalar üçün məhdud uzunluqlu təmiz mətn
const metaDescription = computed(() => {
const text = plainText.value;
if (!text) return 'Leyla Medical Center-in təklif etdiyi tibbi xidmətlər haqqında məlumat alın. Yüksək keyfiyyətli tibbi xidmət və diaqnostika.';
return text.length > 160 ? text.substring(0, 157) + '...' : text;
});

// Tibbi xidmətin adı
const serviceName = computed(() => {
return serviceData.value?.title || serviceData.value?.title_az || 'Tibbi xidmət';
});

// Xidmətin şəkli
const serviceImage = computed(() => {
return serviceData.value?.photo || `https://leylamc.com/images/medical-services/${route.params.slug || 'service'}.jpg`;
});

// SEO məlumatlarını yeniləmək funksiyası
const updateSEO = () => {
  if (!serviceData.value) return;

  // Yeni URL strukturunu tətbiq edirik
  const canonicalUrl = `https://leylamc.com/az/tibbi-xidmətlər/${route.params.slug}`;

  useHead({
    title: `Leyla Medical Center | ${serviceName.value}`,
    meta: [
      { 
        name: 'description', 
        content: metaDescription.value
      },
      { 
        name: 'keywords', 
        content: `leyla medical center, ${serviceName.value.toLowerCase()}, tibbi xidmət, ${route.params.slug}, müalicə xidməti, diaqnostika, tibb mərkəzi, bakı tibbi xidmətlər, həkim xidməti` 
      },
      { 
        property: 'og:title', 
        content: `Leyla Medical Center | ${serviceName.value}` 
      },
      { 
        property: 'og:description', 
        content: metaDescription.value
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: serviceImage.value },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${serviceName.value}` },
      { name: 'twitter:description', content: metaDescription.value },
      { name: 'twitter:image', content: serviceImage.value },
      
      // Strukturlu məlumatları təkmilləşdirilmiş şəkildə əlavə edirik (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": serviceName.value,
          "description": plainText.value,
          "url": canonicalUrl,
          "image": serviceImage.value,
          "performerType": "Medical Organization",
          "procedureType": "Therapeutic",
          "followup": "Həkiminizin təyin etdiyi müddətdə nəzarət üçün müraciət edin.",
          "isPartOf": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/logo.png"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yusif Səfərov küç.19",
              "addressLocality": "Bakı",
              "addressCountry": "Azərbaycan"
            },
            "telephone": "+994124902131"
          },
          "medicalSpecialty": [
            "https://schema.org/MedicalSpecialty"
          ],
          "relevantSpecialty": [
            {
              "@type": "MedicalSpecialty",
              "name": serviceData.value.category || "Tibbi xidmət"
            }
          ]
        })
      }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  });
};

// URL dəyişdiyində yeni məlumat çək
watch(() => route.params.slug, (newSlug) => {
if (newSlug) {
  fetchServiceDetails(newSlug);
}
}, { immediate: true });

// Xidmət məlumatları dəyişdikdə SEO məlumatlarını yenilə
watch(serviceData, () => {
if (serviceData.value) {
  updateSEO();
}
}, { deep: true });

// Component mount olduqda ilkin yükləmə
onMounted(() => {
// Ana səhifədə olub-olmadığımızı yoxlayırıq
if (route.name === 'medical-services') {
  // Ana səhifə məntiqini işə salın - bütün xidmətləri göstərmək
  // Bunun üçün ayrıca bir fetchAllServices() funksiyası yaza bilərsiniz
  console.log("Bu, medical services ana səhifəsidir");
} 
// Detail səhifədə olub-olmadığımızı yoxlayırıq və slug var mı?
else if (route.name === 'medical-service-detail' && route.params.slug) {
  console.log("Route params:", route.params);
  fetchServiceDetails(route.params.slug);
} 
// Nə ana səhifə, nə də düzgün detail səhifədə deyilik
else {
  error.value = "Slug parametri tapılmadı";
  stopLoading();
  console.error("Route params:", route.params, "Route name:", route.name);
}
});
</script>

<style scoped>
ul {
list-style: disc;
}

.text-base {
word-wrap: break-word;
overflow-wrap: break-word;
}
</style>