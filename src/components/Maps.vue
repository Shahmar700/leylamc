<template>
    <div class="relative">
      <!-- Map Buttons  -->
      <div class="absolute flex top-5 right-3 lg:top-10 lg:right-10">
        <button @click="showMap" :class="mapButtonClass" class="text-lg py-2 px-4 font-bold rounded-tl-3xl rounded-bl-3xl">Xəritə</button>
        <button @click="showSatellite" :class="satelliteButtonClass" class="text-base md:text-lg py-2 px-4 font-bold rounded-tr-3xl rounded-br-3xl">Peyk</button>
      </div>
      <!-- Map -->
      <div v-if="isMapVisible">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.211125231689!2d49.86082747668834!3d40.38201317144531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0531d3023f%3A0x9482a17274a7a91b!2sLeyla%20Medical%20Center!5e0!3m2!1saz!2saz!4v1734327732423!5m2!1saz!2saz"
        class="w-full h-80 sm:h-96 md:h-[480px] lg:h-[600px] xl:h-[720px] 2xl:h-[840px] rounded-2xl"
        style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <!-- Satellite -->
      <div v-else>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7550.37101423927!2d49.860319027467895!3d40.38352206415216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0531d3023f%3A0x9482a17274a7a91b!2sLeyla%20Medical%20Center!5e1!3m2!1saz!2saz!4v1734327837362!5m2!1saz!2saz" 
        class="w-full h-80 sm:h-96 md:h-[480px] lg:h-[600px] xl:h-[720px] 2xl:h-[840px] rounded-2xl"
        style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const isMapVisible = ref(true);
  
  const showMap = () => {
    isMapVisible.value = true;
  };
  
  const showSatellite = () => {
    isMapVisible.value = false;
    setTimeout(() => {
      const iframe = document.querySelector('iframe');
      const satelliteButton = iframe.contentWindow.document.querySelector('.gm-inset-map-impl');
      if (satelliteButton) {
        satelliteButton.click();
      }
    }, 1000); // 1 saniyə gecikmə ilə peyk düyməsinə klik edirik
  };
  
  const mapButtonClass = computed(() => {
    return isMapVisible.value ? 'text-primary bg-[#ededed]' : 'text-main-text bg-[#fff]';
  });
  
  const satelliteButtonClass = computed(() => {
    return isMapVisible.value ? 'text-main-text bg-[#fff]' : 'text-primary bg-[#ededed]';
  });
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.3s, color 0.3s;
  }
  </style>