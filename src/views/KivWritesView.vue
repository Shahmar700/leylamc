<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center xl:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">KİV yazanlar</h1>
                <div>
                    <div class="flex mb-4 headingBtns border-b">
                        <button @click="activeTab = 'gazet'" :class="{ 'font-bold': activeTab === 'gazet' }">Qazet və jurnallar</button>
                        <button @click="activeTab = 'internet'" :class="{ 'font-bold': activeTab === 'internet' }">İnternet</button>
                        <button @click="activeTab = 'tv'" :class="{ 'font-bold': activeTab === 'tv' }">Televiziya və Radio</button>
                    </div>
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b text-start"><i class="fa-regular fa-calendar mr-1"></i>Tarix</th>
                                <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-pencil mr-1"></i>Mənbə</th>
                                <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-link mr-1"></i>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in paginatedContent" :key="item.id" @click="openUrl(item.url)" class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary hover:border">
                                <td class="py-2 px-4 border-b">{{ item.date }}</td>
                                <td class="py-2 px-4 border-b">{{ item.source }}</td>
                                <td class="py-2 px-4 border-b">{{ item.url }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="totalPages > 1" class="pagination mt-4 flex justify-center lg:justify-start">
                        <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angles-left"></i></button>
                        <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angle-left"></i></button>
                        <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
                        <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angle-right"></i></button>
                        <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angles-right"></i></button>
                    </div>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

const activeTab = ref('gazet');

const content = ref([
  { id: 1, date: '01.01.2025', source: 'Qazet 1', url: 'http://example.com', type: 'gazet' },
  { id: 2, date: '02.01.2025', source: 'Jurnal 1', url: 'http://example.com', type: 'gazet' },
  { id: 3, date: '03.01.2025', source: 'İnternet 1', url: 'http://example.com', type: 'internet' },
  { id: 4, date: '04.01.2025', source: 'TV 1', url: 'http://example.com', type: 'tv' },
  { id: 5, date: '05.01.2025', source: 'Radio 1', url: 'http://example.com', type: 'tv' },
  { id: 6, date: '06.01.2025', source: 'Qazet 2', url: 'http://example.com', type: 'gazet' },
  { id: 7, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 8, date: '08.01.2025', source: 'İnternet 2', url: 'http://example.com', type: 'internet' },
  { id: 9, date: '09.01.2025', source: 'TV 2', url: 'http://example.com', type: 'tv' },
  { id: 10, date: '10.01.2025', source: 'Radio 2', url: 'http://example.com', type: 'tv' },
  { id: 11, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 12, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 13, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 14, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 15, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 16, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
  { id: 17, date: '07.01.2025', source: 'Jurnal 2', url: 'http://example.com', type: 'gazet' },
]);

const itemsPerPage = 7;
const currentPage = ref(1);

const filteredContent = computed(() => {
  return content.value.filter(item => item.type === activeTab.value);
});

const totalPages = computed(() => Math.ceil(filteredContent.value.length / itemsPerPage));

const paginatedContent = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredContent.value.slice(start, end);
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

const openUrl = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.headingBtns button {
  padding: 8px 16px;
  border: 1px solid #6bb52b;
  background-color: transparent;
  cursor: pointer;
  color: #6bb52b;
  border-radius: 2px;
}

.headingBtns button.font-bold {
  font-weight: bold;
  border-bottom: 2px solid #6bb52b;
  background-color: #6bb52b;
  color: #fff;
}

</style>