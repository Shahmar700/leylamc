<template>
  <div class="relative">
    <!-- Location Buttons - Xəritə yükləndikdən sonra görünəcək -->
    <div 
      v-show="isIframeLoaded" 
      class="absolute flex gap-2 bottom-5 left-1/2 transform -translate-x-1/2 md:bottom-auto md:top-5 lg:top-10 z-10 transition-opacity duration-300"
      :class="{'opacity-0': !isIframeLoaded, 'opacity-100': isIframeLoaded}"
    >
      <button 
        v-for="(location, index) in locations" 
        :key="index"
        @click="selectLocation(index)"
        :class="[
          'text-xs sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3 md:px-4 font-medium md:font-bold rounded-lg md:rounded-xl transition-all duration-300 shadow-md whitespace-nowrap',
          currentLocation === index ? 'bg-primary text-white' : 'bg-white text-main-text',
          {'opacity-70 cursor-not-allowed': isChanging}
        ]"
        :disabled="isChanging"
      >
        <span class="hidden lg:inline">{{ location.name }}</span>
        <span class="inline lg:hidden">{{ location.shortName }}</span>
      </button>
    </div>
    
    <!-- Map/Satellite Buttons - Xəritə yükləndikdən sonra görünəcək -->
    <div 
      v-show="isIframeLoaded" 
      class="absolute flex top-3 right-3 lg:top-10 lg:right-10 z-10 transition-opacity duration-300"
      :class="{'opacity-0': !isIframeLoaded, 'opacity-100': isIframeLoaded}"
    >
      <button 
        @click="showMap" 
        :class="[
          mapButtonClass, 
          'text-xs sm:text-sm md:text-lg py-1.5 px-2 sm:py-2 sm:px-3 md:py-2 md:px-4 font-bold rounded-tl-xl rounded-bl-xl md:rounded-tl-3xl md:rounded-bl-3xl transition-all duration-300',
          {'opacity-70 cursor-not-allowed': isChanging}
        ]"
        :disabled="isChanging"
      >
        Xəritə
      </button>
      <button 
        @click="showSatellite" 
        :class="[
          satelliteButtonClass, 
          'text-xs sm:text-sm md:text-lg py-1.5 px-2 sm:py-2 sm:px-3 md:py-2 md:px-4 font-bold rounded-tr-xl rounded-br-xl md:rounded-tr-3xl md:rounded-br-3xl transition-all duration-300',
          {'opacity-70 cursor-not-allowed': isChanging}
        ]"
        :disabled="isChanging"
      >
        Peyk
      </button>
    </div>
    
    <!-- Xəritə konteyner -->
    <div class="relative overflow-hidden rounded-2xl">
      <!-- Xəritə iframe -->
      <iframe 
        :src="currentMapUrl" 
        @load="handleIframeLoad"
        class="w-full h-80 sm:h-96 md:h-[480px] lg:h-[600px] xl:h-[720px] 2xl:h-[840px]"
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <!-- Yükləmə göstəricisi -->
      <div 
        :class="{'opacity-0': !isIframeLoaded, 'opacity-100': isIframeLoaded}"
        v-if="isChanging || !isIframeLoaded" 
        class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
      >
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span class="text-gray-600 font-medium text-lg">Xəritə yüklənir...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Xəritə yerləşimləri
const locations = [
  { 
    name: 'Leyla Medical Center',
    shortName: 'LMC',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8561183!3d40.3883306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0531d3023f%3A0x9482a17274a7a91b!2sLeyla%20Medical%20Center!5e0!3m2!1saz!2saz!4v1743608020369!5m2!1saz!2saz',
    satelliteUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8561183!3d40.3883306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0531d3023f%3A0x9482a17274a7a91b!2sLeyla%20Medical%20Center!5e1!3m2!1saz!2saz!4v1743608020369!5m2!1saz!2saz'
  },
  { 
    name: 'Pediatriya 1',
    shortName: 'Ped 1',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8615294!3d40.383315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0053952e89%3A0xf52b6fb877c09d54!2sLeyla%20Medical%20Center%20Pediatriya%20yeni%20bina%F0%9F%A9%BA%F0%9F%A9%BA!5e0!3m2!1saz!2saz!4v1743608073569!5m2!1saz!2saz',
    satelliteUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8615294!3d40.383315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0053952e89%3A0xf52b6fb877c09d54!2sLeyla%20Medical%20Center%20Pediatriya%20yeni%20bina%F0%9F%A9%BA%F0%9F%A9%BA!5e1!3m2!1saz!2saz!4v1743608073569!5m2!1saz!2saz'
  },
  { 
    name: 'Pediatriya 2',
    shortName: 'Ped 2',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8411211!3d40.4056749!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030874f6041f5f7%3A0x1b85476f352eb91a!2sLeyla%20Medical%20Center%20Pediatriya%202!5e0!3m2!1saz!2saz!4v1743608352560!5m2!1saz!2saz',
    satelliteUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24311.408743412045!2d49.8411211!3d40.4056749!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030874f6041f5f7%3A0x1b85476f352eb91a!2sLeyla%20Medical%20Center%20Pediatriya%202!5e1!3m2!1saz!2saz!4v1743608352560!5m2!1saz!2saz'
  }
];

// State variables
const currentLocation = ref(0);
const isMapMode = ref(true);
const isChanging = ref(false);
const isIframeLoaded = ref(false);

// iframe yüklənməsi tamamlandığında çağırılan handler
const handleIframeLoad = () => {
  console.log('Iframe loaded');
  
  // İlkin yüklənmə zamanı
  if (!isIframeLoaded.value) {
    // Kiçik gecikmə ilə buttonları göstər
    setTimeout(() => {
      isIframeLoaded.value = true;
    }, 300);
  }
  
  // Xəritə dəyişikliyi zamanı
  if (isChanging.value) {
    setTimeout(() => {
      isChanging.value = false;
    }, 300);
  }
};

// Enhanced location selection with skeleton loading
const selectLocation = (index) => {
  if (currentLocation.value !== index && !isChanging.value) {
    isChanging.value = true;
    setTimeout(() => {
      currentLocation.value = index;
      setTimeout(() => {
        isChanging.value = false;
      }, 700); // İframe yüklənmə üçün vaxt
    }, 300);
  }
};

// Map/Satellite toggle functions with skeleton loading
const showMap = () => {
  if (!isMapMode.value && !isChanging.value) {
    isChanging.value = true;
    setTimeout(() => {
      isMapMode.value = true;
      setTimeout(() => {
        isChanging.value = false;
      }, 700); // İframe yüklənmə üçün vaxt
    }, 300);
  }
};

const showSatellite = () => {
  if (isMapMode.value && !isChanging.value) {
    isChanging.value = true;
    setTimeout(() => {
      isMapMode.value = false;
      setTimeout(() => {
        isChanging.value = false;
      }, 700); // İframe yüklənmə üçün vaxt
    }, 300);
  }
};

// Computed properties
const currentMapUrl = computed(() => {
  const location = locations[currentLocation.value];
  return isMapMode.value ? location.mapUrl : location.satelliteUrl;
});

const mapButtonClass = computed(() => {
  return isMapMode.value ? 'text-primary bg-[#ededed]' : 'text-main-text bg-[#fff]';
});

const satelliteButtonClass = computed(() => {
  return isMapMode.value ? 'text-main-text bg-[#fff]' : 'text-primary bg-[#ededed]';
});
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>