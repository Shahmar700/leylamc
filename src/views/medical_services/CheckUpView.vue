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
          <h1 class="text-3xl font-semibold mb-10">Check Up</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(checkup, index) in paginatedCheckups" :key="index" @click="goToCheckUp(checkup)" class="relative mb-4 rounded-md cursor-pointer hover:shadow-md hover:scale-101 transition-all duration-200" :class="{ 'opacity-90' : isExpired(checkup.finish_date) }">
              <div class="relative">
                <img :src="checkup.photo" :alt="checkup.title" class="w-full h-auto rounded-md" :class="{ 'filter: grayscale' : isExpired(checkup.finish_date) }">
                <div v-if="isExpired(checkup.finish_date)" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                  <span class="-rotate-[30deg] tracking-widest">VAXTI BİTİB</span>
                </div>
              </div>
              <p class="text-base sm:text-lg mt-1 p-2">{{ checkup.title }}</p>
            </div>
          </div>
          <div v-if="totalPages > 1" class="pagination mt-4 flex justify-start">
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
const checkups = ref([]);
const loading = ref(true);
const error = ref(null);

// API-dən məlumatları çəkmək funksiyası
const fetchCheckupsData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/checkup-list/');
    checkups.value = response.data.results || [];
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};

// Komponent yükləndikdə API çağırışı
onMounted(() => {
  fetchCheckupsData();
});

// Pagination və digər funksiyalar
const itemsPerPage = 9;
const currentPage = ref(1);

const today = new Date().toISOString().split('T')[0];

const filteredCheckups = computed(() => {
  return checkups.value.filter(checkup => {
    return checkup.start_date <= today;
  });
});

const totalPages = computed(() => Math.ceil(filteredCheckups.value.length / itemsPerPage));

const paginatedCheckups = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCheckups.value.slice(start, end);
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

const isExpired = (finish_date) => {
  return finish_date < today;
};

const router = useRouter();

const goToCheckUp = (checkup) => {
  router.push({ name: 'check-up-inner', params: { slug: checkup.slug } });
};
</script>

<style scoped>
ul {
    list-style: disc;
}

</style>