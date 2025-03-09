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