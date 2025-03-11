<template>
    <div class="container mt-14 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row sm:justify-between">
            <div class=" w-full sm:w-3/4">
                <!-- <h1 class="text-main-text text-2xl md:text-3xl my-6">Sertifikatlar</h1> -->
                <div v-if="certificates.length === 0" class="text-center text-lg">
                    Heç bir məlumat tapılmadı
                </div>
                <div v-else class="">
                    <div v-for="certificate in certificates" :key="certificate.id" class="relative mb-4">
                        <img :src="certificate.photo" class="w-full h-auto rounded-md">
                        <h2 class="text-lg font-semibold mt-2">{{ certificate.title }}</h2>
                        <p class="text-base">{{ certificate.text }}</p>
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
import axios from 'axios';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const certificates = ref([]);

const fetchCertificates = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/certificate-list/');
    // console.log(response.data); // Məlumatları konsolda göstərmək
    certificates.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

onMounted(() => {
  fetchCertificates();
});
</script>

<style  scoped>


</style>