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
        
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ checkup.title }}</h1>
        <img v-if="checkup.photo" :src="checkup.photo" :alt="checkup.title" class="w-full h-auto rounded-md mb-4">
        <p class="text-base sm:text-lg mt-2">Başlanğıc tarixi: {{ checkup.start_date || 'Göstərilməyib' }}</p>
        <p class="text-base sm:text-lg mt-2">Bitmə tarixi: {{ checkup.finish_date || 'Göstərilməyib' }}</p>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";

// Router əldə edirik
const router = useRouter();

// null yerinə boş obyekt istifadə edin
const checkup = ref({});
const error = ref(null);

// Skeleton loading hookunu 400ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(400);

const fetchCheckupData = async (slug) => {
  try {
    startLoading();
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/checkup-list/${slug}/`);
    checkup.value = response.data || {};
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    stopLoading();
  }
};

// Geri qayıtmaq funksiyası
const goBack = () => {
  // Əvvəlki səhifəyə qayıt
  router.go(-1);
  
  // Alternativ olaraq bütün check-uplara qayıtmaq istəsəniz:
  // router.push({ name: 'check-up' });
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
</style>