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
    } catch (err) {
      error.value = "Vakansiya məlumatlarını yükləmək mümkün olmadı.";
      console.error("API xətası:", err);
    } finally {
      loading.value = false;
    }
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