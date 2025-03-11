<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ visionTitle }}</h1>
                <p class="mt-4 text-base md:text-lg lg:text-xl text-justify">{{ visionText }}</p>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

const visionTitle = ref('');
const visionText = ref('');

const fetchOurVision = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/ourvision-list/');
    const visionData = response.data.results[0];
    visionTitle.value = visionData.title;
    visionText.value = visionData.text;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

onMounted(() => {
  fetchOurVision();
});
</script>

<style scoped>


</style>