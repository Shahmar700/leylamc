<template>
    <div class="container mt-16 text-main-text">
      <div v-if="loading" class="text-center py-10">
        <p>Yüklənir...</p>
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <h1 class="text-3xl font-semibold mb-10">{{ serviceData?.title || serviceData?.title_az }}</h1>
          <div class="text-base sm:text-lg" v-html="formattedText"></div>
          <br>
          
          <!-- Service links if available -->
          <div class="flex flex-wrap gap-4 mt-4">
            <a v-if="serviceData?.service_link" target="_blank" 
               :href="serviceData.service_link" 
               class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Video 1
            </a>
            <a v-if="serviceData?.link" target="_blank" 
               :href="serviceData.link" 
               class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Video 2
            </a>
            <a v-if="serviceData?.link1" target="_blank" 
               :href="serviceData.link1" 
               class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Video 3
            </a>
          </div>
        </div>
        
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
  
      <!-- Service photo if available -->
      <div v-if="serviceData?.photo" class="mt-10">
        <img :src="serviceData.photo" :alt="serviceData.title" class="w-full max-w-3xl mx-auto rounded-lg">
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
  
  // Route əldə edirik
  const route = useRoute();
  
  // Data state-ləri
  const serviceData = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  // Tibbi xidmət məlumatlarını çəkmək
  // Tibbi xidmət məlumatlarını çəkmək
const fetchServiceDetails = async (slug) => {
  if (!slug) {
    console.error('Slug parametri tapılmadı');
    error.value = 'Səhifə tapılmadı';
    loading.value = false;
    return;
  }
  
  try {
    loading.value = true;
    error.value = null;
    
    console.log(`API sorğusu göndərilir: http://192.168.2.242:8000/api/leyla/v1/medical-service-list/${slug}/`);
    
    // Əsas məlumatları əldə edirik
    const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/medical-service-list/${slug}/`);
    
    console.log("API cavabı:", response);
    
    if (response.data) {
      serviceData.value = response.data;
      console.log("Alınan tibbi xidmət məlumatı:", serviceData.value);
    } else {
      throw new Error('Medical service not found');
    }
  } catch (err) {
    console.error("Tibbi xidmət API çağırışında xəta:", err);
    console.error("Xəta detalları:", err.response ? err.response.data : "Response yoxdur");
    error.value = "Məlumatları yükləmək mümkün olmadı. Xahiş edirik daha sonra yenidən cəhd edin.";
  } finally {
    loading.value = false;
  }
};
  
  // Computed xüsusiyyəti ilə mətnin formatlanması
  const formattedText = computed(() => {
    const text = serviceData.value?.text_az || serviceData.value?.text || '';
    return text
      .replace(/\n/g, "<br>")
      .replace(/(.*?:)/g, "<b>$1</b>"); // Başlıqları bold formatda göstərmək
  });
  
  // URL dəyişdiyində yeni məlumat çək
  watch(() => route.params.slug, (newSlug) => {
    if (newSlug) {
      fetchServiceDetails(newSlug);
    }
  }, { immediate: true });
  
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
    loading.value = false;
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