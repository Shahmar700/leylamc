<template>
  <div class="container mt-16 text-main-text">
    <!-- Yüklənmə indikatoru -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p class="ml-4 text-xl">Məlumatlar yüklənir...</p>
    </div>
    
    <!-- Xəta mesajı -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500 text-xl mb-4">{{ error }}</p>
      <button @click="fetchPediatricDetails" class="px-4 py-2 bg-primary text-white rounded-md">
        Yenidən cəhd edin
      </button>
    </div>
    
    <!-- Əsas kontent -->
    <div v-else-if="pediatric" class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <h1 class="text-3xl font-semibold mb-10">{{ pediatric.name }}</h1>
        <p class="text-base sm:text-lg" v-html="pediatricText"></p>
        <br>
        <!-- <div v-if="pediatric.service_link">
          <a :href="pediatric.service_link" target="_blank" class="text-green-600 hover:text-green-800 underline">
            <i class="fas fa-external-link-alt mr-2"></i>
            Ətraflı məlumat üçün
          </a>
        </div> -->
      </div>
      <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
        <SideBanners class="mb-4" /> 
        <SideBanners2 class="mb-4" /> 
      </div>
    </div>

    <!-- GALLERY SIDE  -->
    <div v-if="!loading && !error && pediatric" class="mt-10">
      <!-- <GallerySection :images="images" /> -->
    </div>

    <Maps v-if="!loading && !error && pediatric" class="mt-14 sm:mt-24"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";

const route = useRoute();
const pediatric = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPediatricDetails = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Pediatriya məlumatlarını əldə etmək üçün API sorğusu
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/pediatricdep-list/');
    const pediatrics = response.data.results;
    const foundPediatric = pediatrics.find(p => p.slug === route.params.slug);
    
    if (foundPediatric) {
      pediatric.value = foundPediatric;
    } else {
      error.value = "Belə pediatriya bölməsi tapılmadı";
      console.error('Pediatric not found');
    }
  } catch (err) {
    error.value = "Məlumatlar yüklənərkən xəta baş verdi";
    console.error("Pediatric details API çağırışında xəta:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (route.params.slug) {
    fetchPediatricDetails();
  }
});

// Route parametrləri dəyişdikdə təkrar yüklə
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    fetchPediatricDetails();
  }
}, { immediate: true });

const pediatricText = computed(() => {
  return pediatric.value ? pediatric.value.text : '';
});

// Gallery Pediatrics - Şəkillər dəyişdirilə bilər
import gs1 from "@/assets/images/general_surgery/gs1.jpg"
import gs2 from "@/assets/images/general_surgery/gs2.jpg"

const images = [
  { src: gs1, alt: 'Pediatriya Şəkil 1' },
  { src: gs2, alt: 'Pediatriya Şəkil 2' },
  { src: gs1, alt: 'Pediatriya Şəkil 3' },
  { src: gs2, alt: 'Pediatriya Şəkil 4' },
];
</script>