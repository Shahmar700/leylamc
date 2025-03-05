<template>
    <div class="container mt-16 text-main-text">
      <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <h1 class="text-3xl font-semibold mb-10">{{ surgery?.name }}</h1>
          <p class="text-base sm:text-lg" v-html="surgeryText"></p>
          <br>
          <div>
            <a target="_blank" :href="surgery?.service_link">{{ surgery?.service_link }}</a>
          </div>
        </div>
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
  
      <!-- GALLERY SIDE  -->
      <div class="mt-10">
        <GallerySection :images="images" />
      </div>
  
      <Maps class="mt-14 sm:mt-24"/>
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
const surgery = ref(null);

const fetchSurgeryDetails = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/surgeondep-list/');
    const surgeries = response.data.results;
    surgery.value = surgeries.find(s => s.slug === route.params.slug);
    if (!surgery.value) {
      throw new Error('Surgery not found');
    }
  } catch (error) {
    console.error("Surgery details API çağırışında xəta:", error);
  }
};

onMounted(() => {
  fetchSurgeryDetails();
});

watch(() => route.params.slug, () => {
  fetchSurgeryDetails();
});

const surgeryText = computed(() => {
  return surgery.value ? surgery.value.text : '';
});

// Gallery General Surgery 
import gs1 from "@/assets/images/general_surgery/gs1.jpg"
import gs2 from "@/assets/images/general_surgery/gs2.jpg"

const images = [
  { src: gs1, alt: 'Image 1' },
  { src: gs2, alt: 'Image 2' },
  { src: gs1, alt: 'Image 3' },
  { src: gs2, alt: 'Image 4' },
];
</script>