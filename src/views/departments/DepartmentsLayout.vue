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
          <h1 class="text-3xl font-semibold mb-10">{{ departmentData?.name || departmentData?.name_az }}</h1>
          <div class="text-base sm:text-lg" v-html="formattedText"></div>
          <br>
          
          <!-- Department links if available -->
          <div class="flex flex-wrap gap-4 mt-4">
            <a v-if="departmentData?.link" target="_blank" 
               :href="departmentData.link" 
               class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Video 1
            </a>
            <a v-if="departmentData?.link1" target="_blank" 
               :href="departmentData.link1" 
               class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
              Video 2
            </a>
            <a v-if="departmentData?.link2" target="_blank" 
               :href="departmentData.link2" 
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
  
      <!-- Department photo if available -->
      <div v-if="departmentData?.photo" class="mt-10">
        <img :src="departmentData.photo" :alt="departmentData.name" class="w-full max-w-3xl mx-auto rounded-lg">
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
  const departmentData = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  // Department məlumatlarını çəkmək
  const fetchDepartmentDetails = async (slug) => {
    if (!slug) {
      console.error('Slug parametri tapılmadı');
      error.value = 'Səhifə tapılmadı';
      loading.value = false;
      return;
    }
    
    try {
      loading.value = true;
      error.value = null;
      
      // Əsas məlumatları əldə edirik
      const response = await axios.get(`https://bytexerp.online/api/leyla/v1/department-list/${slug}/`);
      
      if (response.data) {
        departmentData.value = response.data;
        console.log("Alınan department məlumatı:", response.data);
      } else {
        throw new Error('Department not found');
      }
    } catch (err) {
      console.error("Department details API çağırışında xəta:", err);
      error.value = "Məlumatları yükləmək mümkün olmadı. Xahiş edirik daha sonra yenidən cəhd edin.";
    } finally {
      loading.value = false;
    }
  };
  
  // Computed xüsusiyyəti ilə mətnin formatlanması
  const formattedText = computed(() => {
    const text = departmentData.value?.text_az || departmentData.value?.text || '';
    return text
      .replace(/\n/g, "<br>")
      .replace(/(.*?:)/g, "<b>$1</b>"); // Başlıqları bold formatda göstərmək
  });
  
  // URL dəyişdiyində yeni məlumat çək
  watch(() => route.params.slug, (newSlug) => {
    if (newSlug) {
      fetchDepartmentDetails(newSlug);
    }
  }, { immediate: true });
  
  // Component mount olduqda ilkin yükləmə
  onMounted(() => {
    // URL-dən slug parametrini alırıq və əgər mövcuddursa çağırırıq
    const slug = route.params.slug;
    if (slug) {
      fetchDepartmentDetails(slug);
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