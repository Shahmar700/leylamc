<template>
  <div class="container mt-16 text-main-text">
    <!-- Skeleton yükləməsi -->
    <SkeletonLoader v-if="showSkeleton" :contentLines="8" :showLink="true" />
  
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>
    
    <!-- İlk öncə məlumatların mövcudluğunu yoxlayırıq -->
    <div v-else-if="checkup && checkup.title" class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <!-- Geri butonu -->
        <button @click="goBack" class="flex items-center text-gray-600 mb-6 hover:text-green-600 transition-colors">
          <i class="fa-solid fa-arrow-left mr-2"></i> Geriyə
        </button>
        
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
        <div v-if="checkup.photo" class="relative mb-4">
        <img 
          :src="checkup.photo" 
          :alt="checkup.title" 
          class="w-full h-auto rounded-md" 
          :class="{ 'grayscale opacity-90': isExpired(checkup.finish_date) }"
        >
        <div 
          v-if="isExpired(checkup.finish_date)" 
          class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold"
        >
          <span class="-rotate-[30deg] tracking-widest">VAXTI BİTİB</span>
        </div>
      </div>
        <p class="text-base sm:text-lg mt-2">Başlanğıc tarixi: {{ formatDate(checkup.start_date) || 'Göstərilməyib' }}</p>
        <p class="text-base sm:text-lg mt-2">Bitmə tarixi: {{ formatDate(checkup.finish_date) || 'Göstərilməyib' }}</p>
        <br>
        <ul class="ml-7 list-disc">
          <li class="font-normal text-base sm:text-lg">
            Həkim konsultasiyası
          </li>
          <li class="font-normal text-base sm:text-lg">
            Sidiyin ümumi analizi 
          </li>
        </ul>
        <br>
        <p class="text-base sm:text-lg">-Öncədən qeydiyyat mütləqdir!</p>
        <div v-if="checkup.link">
          <a target="_blank" :href="checkup.link" class="text-green-600 hover:text-green-800 underline">Ətraflı məlumat</a>
        </div>
      </div>
      <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
        <SideBanners class="mb-4" /> 
        <SideBanners2 class="mb-4" /> 
      </div>
    </div>
    
    <!-- Məlumat yoxdursa -->
    <div v-else class="text-center py-10">
      <p>Check-up haqqında məlumat tapılmadı.</p>
    </div>
    
    <Maps class="mt-14 sm:mt-24"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";
import { useHead } from '@vueuse/head';

// Router əldə edirik
const router = useRouter();

// null yerinə boş obyekt istifadə edin
const checkup = ref({});
const error = ref(null);

// Dinamik page title - checkup.title əsasında hesablanır
const pageTitle = computed(() => {
  return checkup.value?.title || 'Check-up Detalları';
});


// Bugünkü tarixi əldə edirik
const today = new Date().toISOString().split('T')[0]; 

// Tarixi yoxlama funksiyası
const isExpired = (finish_date) => {
  if (!finish_date) return false; // Bitmə tarixi təyin edilməyibsə, vaxtı keçməyib
  return finish_date < today;
};

// Tarixi formatlayan metod
const formatDate = (dateString) => {
  if (!dateString) return 'Göstərilməyib';
  
  try {
    const date = new Date(dateString);
    
    // Tarix etibarlıdırmı?
    if (isNaN(date.getTime())) {
      return 'Etibarsız tarix';
    }
    
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error('Tarix formatlaması xətası:', error);
    return 'Tarix formatı düzgün deyil';
  }
};
// Skeleton loading hookunu 400ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(400);


// SEO məlumatlarını yeniləyən funksiya
const updateSeoMetadata = () => {
  // Vaxtın keçib-keçmədiyini yoxlayırıq
  const expired = isExpired(checkup.value?.finish_date);
  
  // Doğru URL strukturunu təyin edirik
  const canonicalUrl = `https://leylamc.com/az/tibbi-xidmətlər/check-uplar/${route.params.slug}`;
  
  useHead({
    title: `Leyla Medical Center | ${pageTitle.value}${expired ? ' (Vaxtı bitib)' : ''}`,
    meta: [
      { 
        name: 'description', 
        content: `${pageTitle.value} - ${checkup.value?.description?.substring(0, 150) || 'Leyla Medical Center-də müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun. Profilaktik tibbi yoxlamalar vasitəsilə sağlamlığınızı nəzarətdə saxlayın.'}${expired ? ' (Bu check-up paketinin vaxtı bitib)' : ''}`
      },
      { 
        name: 'keywords', 
        content: `${pageTitle.value}, check up, tibbi müayinə, profilaktik yoxlama, kompleks müayinə, sağlamlıq müayinəsi, Leyla Medical Center, tibbi yoxlama paketləri` 
      },
      
      // Open Graph meta tagları (sosial mediada paylaşım üçün)
      { property: 'og:title', content: `Leyla Medical Center | ${pageTitle.value}${expired ? ' (Vaxtı bitib)' : ''}` },
      { property: 'og:description', content: `${checkup.value?.description?.substring(0, 150) || 'Leyla Medical Center-də müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun.'}${expired ? ' (Bu check-up paketinin vaxtı bitib)' : ''}` },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: checkup.value?.photo || 'https://leylamc.com/images/leyla-mc-logo.png' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      { property: 'og:updated_time', content: checkup.value?.updated_at || new Date().toISOString() },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}${expired ? ' (Vaxtı bitib)' : ''}` },
      { name: 'twitter:description', content: `${checkup.value?.description?.substring(0, 150) || 'Leyla Medical Center-də müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun.'}${expired ? ' (Bu check-up paketinin vaxtı bitib)' : ''}` },
      { name: 'twitter:image', content: checkup.value?.photo || 'https://leylamc.com/images/leyla-mc-logo.png' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": pageTitle.value,
          "description": checkup.value?.description || `Leyla Medical Center-də ${pageTitle.value} paketi ilə sağlamlığınızı qoruyun.`,
          "url": canonicalUrl,
          "image": checkup.value?.photo,
          "procedureType": "Check-up müayinəsi",
          "howPerformed": "Bu check-up paketi tibbi müayinələr və analizlər vasitəsilə həyata keçirilir",
          "preparation": "Öncədən qeydiyyat mütləqdir",
          "status": expired ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
          "validFrom": checkup.value?.start_date,
          "validThrough": checkup.value?.finish_date,
          "provider": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": "https://leylamc.com/images/leyla-mc-logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yusif Səfərov küç.19, Xətai rayonu",
              "addressLocality": "Bakı", 
              "addressCountry": "Azərbaycan"
            },
            "telephone": "+994124902131"
          },
          "offers": {
            "@type": "Offer",
            "availability": expired ? "https://schema.org/Discontinued" : "https://schema.org/InStock",
            "validFrom": checkup.value?.start_date,
            "validThrough": checkup.value?.finish_date,
            "price": checkup.value?.price || "0",
            "priceCurrency": "AZN"
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  });
};
const fetchCheckupData = async (slug) => {
  try {
    startLoading();
    const response = await axios.get(`https://bytexerp.online/api/leyla/v1/checkup-list/${slug}/`);
    checkup.value = response.data || {};
    
    // Məlumatlar əldə edildikdən sonra SEO məlumatlarını yeniləyirik
    updateSeoMetadata();
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    stopLoading();
  }
};

// watch ilə checkup dəyişdikdə SEO məlumatlarını yeniləyirik
watch(() => checkup.value, () => {
  if (checkup.value && checkup.value.title) {
    updateSeoMetadata();
  }
}, { deep: true });

// Geri qayıtmaq funksiyası
const goBack = () => {
  // Birbaşa əsas check-up səhifəsinə yönləndir
  router.push({ name: 'check-up' });
  
  // Alternativ həll: Əgər browser tarixçəsinin yoxlanması lazımdırsa:
  // if (window.history.length > 1) {
  //   router.go(-1);
  // } else {
  //   router.push({ name: 'check-up' });
  // }
};

const route = useRoute();

onMounted(() => {
  const slug = route.params.slug;
  if (slug) {
    fetchCheckupData(slug);
  } else {
    error.value = "Səhifə parametri tapılmadı";
    stopLoading();
  }
});

// Component unmount olduqda təmizləmə
onUnmounted(() => {
  cleanupSkeleton();
});
</script>

<style scoped>
ul{
    list-style: disc;
}
.grayscale {
  filter: grayscale(100%);
}
</style>