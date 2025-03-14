<template>
  <div class="container mt-16 text-main-text">
    <!-- Skeleton yükləməsi -->
    <SkeletonLoader v-if="showSkeleton" />
    
    <!-- Xəta göstəricisi -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>
    
    <!-- Department məlumatları -->
    <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <h1 class="text-3xl font-semibold mb-10">{{ department.name }}</h1>
        <div class="text-base sm:text-lg" v-html="formattedText"></div>
        <br>
        <div v-if="department.link">
          <a :href="department.link" target="_blank" class="text-green-600 hover:text-green-800 underline">
            <i class="fas fa-external-link-alt mr-2"></i>
            Ətraflı məlumat üçün
          </a>
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
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";
import { useHead } from '@vueuse/head';

import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const department = ref({});
const error = ref(null);

// Skeleton hook-unu 300ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(300);

const fetchDepartment = async () => {
  try {
    // Yükləmə başlayır
    startLoading();
    
    // Slug boş olmadığını yoxla
    if (!route.params.slug) {
      console.error('Slug parametri yoxdur!');
      error.value = 'Department məlumatı tapılmadı.';
      stopLoading();
      return;
    }
    
    const apiUrl = `http://bytexerp.online/api/leyla/v1/department-list/${route.params.slug}/`;
    const response = await axios.get(apiUrl);
    
    department.value = response.data;
    error.value = null;
  } catch (err) {
    console.error('API çağırışında xəta:', err);
    error.value = 'Department məlumatlarını yükləmək mümkün olmadı.';
    department.value = {};
  } finally {
    // Yükləmə bitdi
    stopLoading();
  }
};

onMounted(() => {
  fetchDepartment();
});

onUnmounted(() => {
  cleanupSkeleton();
  stopPolling();
});

let pollingInterval;

const startPolling = () => {
  pollingInterval = setInterval(fetchDepartment, 30000);
};

const stopPolling = () => {
  clearInterval(pollingInterval);
};

// route.params.slug dəyərinin dəyişməsini izləyirik
watch(
  () => route.params.slug, 
  (newSlug, oldSlug) => {
    if (newSlug && newSlug !== oldSlug) {
      fetchDepartment();
    }
  },
  { immediate: true }
);

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedText = computed(() => {
  return department.value.text
    ? department.value.text.replace(/\n/g, "<br>").replace(/(.*?:)/g, "<b>$1</b>") 
    : '';
});

// HTML təqləri olmayan təmiz mətn versiyası (meta açıqlamalar üçün)
const plainText = computed(() => {
  if (!department.value.text) return '';
  return department.value.text
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .trim();
});

// Meta açıqlamalar üçün məhdud uzunluqlu təmiz mətn
const metaDescription = computed(() => {
  const text = plainText.value;
  if (!text) return 'Leyla Medical Center-in peşəkar tibbi şöbəsi ilə tanış olun. Yüksək keyfiyyətli diaqnostika və müalicə xidmətləri.';
  return text.length > 160 ? text.substring(0, 157) + '...' : text;
});

// Department şəkli (əgər varsa) və ya standart şəkil URL-si
const departmentImage = computed(() => {
  return department.value.photo || `https://leylamc.com/images/departments/${route.params.slug || 'department'}.jpg`;
});

// SEO meta məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
  if (!department.value || !department.value.name) return;
  
  const departmentName = department.value.name;
  const canonicalUrl = `https://leylamc.com/departments/${route.params.slug}`;
  
  useHead({
    title: `Leyla Medical Center | ${departmentName}`,
    meta: [
      { 
        name: 'description', 
        content: metaDescription.value
      },
      { 
        name: 'keywords', 
        content: `leyla medical center, ${departmentName.toLowerCase()}, tibb mərkəzi, tibbi şöbə, xəstəxana şöbəsi, tibbi xidmətlər, ${route.params.slug}, müalicə, diaqnostika, bakı tibb mərkəzi` 
      },
      { 
        property: 'og:title', 
        content: `Leyla Medical Center | ${departmentName}` 
      },
      { 
        property: 'og:description', 
        content: metaDescription.value
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: departmentImage.value },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${departmentName}` },
      { name: 'twitter:description', content: metaDescription.value },
      { name: 'twitter:image', content: departmentImage.value },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": departmentName,
          "description": plainText.value,
          "url": canonicalUrl,
          "image": departmentImage.value,
          "medicalSpecialty": departmentName,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yusif Səfərov küç.19",
            "addressLocality": "Bakı",
            "addressCountry": "Azərbaycan"
          },
          "telephone": "+994 12 000 00 00",
          "isPartOf": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/logo.png"
            }
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  });
};

// Department məlumatları dəyişdikdə SEO meta məlumatlarını yenilə
watch(
  department,
  () => {
    if (department.value && department.value.name) {
      updateSEO();
    }
  },
  { deep: true }
);
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