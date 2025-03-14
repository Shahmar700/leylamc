<template>
  <div class="container mt-14 md:mt-16 text-main-text">
      <div class="flex flex-col md:flex-row sm:justify-between">
          <div class=" w-full sm:w-3/4">
              <!-- <h1 class="text-main-text text-2xl md:text-3xl my-6">Sertifikatlar</h1> -->
              <div v-if="certificates.length === 0" class="text-center text-lg">
                  Heç bir məlumat tapılmadı
              </div>
              <div v-else class="p-4 border cursor-pointer transition-all duration-200 certificate-card">
                  <div 
                      v-for="certificate in certificates" 
                      :key="certificate.id" 
                      class="relative mb-4"
                      @click="openImageModal(certificate.photo)"
                  >
                      <div class="w-[250px] h-[150px] flex flex-col md:flex-row">
                        <img :src="certificate.photo" class="w-full h-full rounded-md">
                        <h2 class="text-lg font-semibold mt-2 ml-4">{{ certificate.title }}</h2>
                      </div>
                      <!-- <p class="text-base">{{ certificate.text }}</p> -->
                  </div>
              </div>
          </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
              <SideBanners class="mb-4" /> 
              <SideBanners2 class="mb-4" /> 
          </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>

      <!-- Modal komponenti -->
      <Modal 
          :is-open="isModalOpen" 
          :src-img="selectedImage" 
          @close="closeModal"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import Modal from "@/components/Modal.vue"; // Modal komponentini import edirik

const certificates = ref([]);
const isModalOpen = ref(false); // Modal açıq olub-olmamasını izləyən dəyişən
const selectedImage = ref(''); // Seçilmiş şəkil url-ni saxlayan dəyişən

const fetchCertificates = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/certificate-list/');
    certificates.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// Şəkil modalını açan funksiya
const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  isModalOpen.value = true;
};

// Modalı bağlayan funksiya
const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  fetchCertificates();
});
</script>

<style scoped>
.certificate-card:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>