<template>
  <a class="p-2 rounded-3xl border-2 hover:border-2 hover:border-primary transition-all duration-300 hover:scale-1005 hover:shadow-md cursor-pointer">
      <div class="rounded-3xl overflow-hidden w-full h-[325px] xl:h-[370px] 2xl:h-[400px] xl:object-contain relative">
          <!-- Overlay to hide alt text during loading -->
          <div v-if="!imageLoaded" 
              class="absolute inset-0 bg-white z-10 rounded-3xl flex items-center justify-center">
              <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <!-- Main image with better alt text -->
          <img 
              v-lazy="image" 
              :alt="`${name}`" 
              class="rounded-3xl object-cover w-full h-full" 
              @load="onImageLoad"
          >
      </div>
      <div class="mt-6">
          <h1 class="text-primary text-2xl font-bold">{{ name }}</h1>
          <p class="dr-position text-gray-500 text-sm md:text-base mt-1 pb-2 font-medium">{{ position }}</p>
      </div>
  </a>
</template>

<script setup>
import { defineProps, ref } from 'vue'   

const imageLoaded = ref(false);

const onImageLoad = () => {
// Şəkil yükləndikdən sonra overlay-i gizlət
setTimeout(() => {
  imageLoaded.value = true;
}, 50);
};

const props = defineProps({
  image: {
      type: String, 
      required: true
  },
  name: {
      type: String, 
      required: true
  },
  position: {
      type: String, 
      required: true
  },
})
</script>

<style scoped>
img[lazy=loading] {
opacity: 0;  /* Tamamilə şəffaf et */
transition: opacity 0.4s;
}

img[lazy=loaded] {
opacity: 1;
transition: opacity 0.4s;
}

/* Digər stillər saxlanılır */
.doctor-name {
font-size: 1.25rem;
font-weight: bold;
margin-top: 8px;
}

.doctor-position {
font-size: 1rem;
color: #666;
}

.dr-position{
font-family: 'Poppins', sans-serif;
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

.animate-spin {
animation: spin 1s linear infinite;
}
</style>