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
          <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ checkup.title }}</h1>
          <img :src="checkup.photo" :alt="checkup.title" class="w-full h-auto rounded-md mb-4">
          <p class="text-base sm:text-lg mt-2">Başlanğıc tarixi: {{ checkup.start_date }}</p>
          <p class="text-base sm:text-lg mt-2">Bitmə tarixi: {{ checkup.finish_date }}</p>
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
          <div>
            <a target="_blank" href="https://www.instagram.com/p/CeaarG4IOul/?utm_source=ig_web_copy_link"></a>
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
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const checkup = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchCheckupData = async (slug) => {
  try {
    loading.value = true;
    const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/checkup-list/${slug}/`);
    checkup.value = response.data || null;
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};

const route = useRoute();

onMounted(() => {
  const slug = route.params.slug;
  if (slug) {
    fetchCheckupData(slug);
  }
});
</script>

<style scoped>
ul{
    list-style: disc;
}
</style>