<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h2 class="text-6xl font-bold text-primary mb-6">404</h2>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Səhifə tapılmadı</h1>
        <p class="text-gray-600 mb-10">Axtardığınız səhifə silinmiş, adı dəyişdirilmiş və ya müvəqqəti olaraq əlçatan deyil.</p>
      </div>
      
      <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <button @click="goBack" class="greenBtn px-8 py-3 text-sm md:text-base">
          Geri qayıt
        </button>
        <router-link to="/" class="greenBtn px-8 py-3 text-sm md:text-base">
          Əsas səhifəyə keç
        </router-link>
      </div>
      
      <!-- SVG icon instead of image -->
      <div class="mt-12">
        <svg class="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"></path>
          <path d="M8 13a1 1 0 100-2 1 1 0 000 2zM16 13a1 1 0 100-2 1 1 0 000 2zM9 16a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>