<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center  md:items-start sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">{{ missionTitle }}</h1>
                <p class="mt-4 text-xl font-thin text-justify" v-html="formattedMissionText"></p>
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const missionTitle = ref('');
const missionText = ref('');

const fetchOurMission = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/ourmission-list/');
    const missionData = response.data.results[0];
    missionTitle.value = missionData.title;
    missionText.value = missionData.text;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedMissionText = computed(() => {
  return missionText.value.replace(/\n/g, '<br>');
});

onMounted(() => {
  fetchOurMission();
});
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>