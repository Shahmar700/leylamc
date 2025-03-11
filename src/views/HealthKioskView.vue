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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(item, index) in paginatedHealthKioskData" :key="index" class="relative mb-4 cursor-pointer hover:opacity-90 transition-opacity" @click="goToHealthKiosk(item)">
              <img :src="item.photo" :alt="item.title" class="w-full h-[200px] object-cover rounded-md">
              <p class="text-base sm:text-lg mt-2">{{ item.title }}</p>
            </div>
          </div>
          <div v-if="totalPages > 1" class="pagination mt-4 flex justify-center lg:justify-start">
            <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angles-left"></i></button>
            <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angle-left"></i></button>
            <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
            <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angle-right"></i></button>
            <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angles-right"></i></button>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

// API-dən məlumatları çəkmək üçün state-lər
const healthKioskData = ref([]);
const loading = ref(true);
const error = ref(null);

// API-dən məlumatları çəkmək funksiyası
const fetchHealthKioskData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/health-pavilion-list/');
    console.log("API cavabı:", response.data); // Debugginq üçün
    healthKioskData.value = response.data.results || [];
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};

// Komponent yükləndikdə API çağırışı
onMounted(() => {
  fetchHealthKioskData();
});

// Pagination və digər funksiyalar
const itemsPerPage = 9;
const currentPage = ref(1);

const filteredHealthKioskData = computed(() => {
  return healthKioskData.value;
});

const totalPages = computed(() => Math.ceil(filteredHealthKioskData.value.length / itemsPerPage));

const paginatedHealthKioskData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredHealthKioskData.value.slice(start, end);
});

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  } else if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'];
  } else if (current >= total - 2) {
    return ['...', total - 4, total - 3, total - 2, total - 1, total];
  } else {
    return ['...', current - 1, current, current + 1, '...'];
  }
});

const goToPage = (page) => {
  if (page === '...') return;
  currentPage.value = page;
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

const router = useRouter();

const goToHealthKiosk = (item) => {
  router.push({ name: 'health-kiosk-detail', params: { id: item.id } });
};
</script>


<style scoped>
ul {
    list-style: disc;
}

</style>