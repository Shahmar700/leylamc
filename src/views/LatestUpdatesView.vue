<template>
  <div class="container mt-16 text-main-text">
    <div class="flex flex-col lg:flex-row items-center md:items-start md:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <h1 class="text-3xl font-semibold mb-10">Son Yeniliklər</h1>
        <div>
          <div class="flex mb-4 headingBtns border-b">
            <button @click="activeTab = 'leyla_medical_center'" :class="{ 'font-bold': activeTab === 'leyla_medical_center' }" class="text-xs md:text-base">Leyla Medical Center</button>
            <button @click="activeTab = 'info_lab'" :class="{ 'font-bold': activeTab === 'info_lab' }" class="text-xs md:text-base">İnfo Lab</button>
          </div>
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b text-start">Ad</th>
                <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-link"></i> PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedContent" :key="item.id" @click="openPdf(item.pdf_file)" class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary hover:border">
                <td class="py-2 px-4 border-b">{{ item.author }}</td>
                <td class="py-2 px-4 border-b">
                  <i class="fa-regular fa-file-pdf"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPages > 1" class="pagination mt-8 flex justify-center">
            <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
              <i class="fa-solid fa-angles-left"></i>
            </button>
            <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <span 
              v-for="page in pages" 
              :key="page" 
              @click="goToPage(page)" 
              :class="{ 
                'font-bold !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                'active-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                'inactive-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage !== page && page !== '...',
                'pagination-dots !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': page === '...'
              }"
            >
              {{ page }}
            </span>
            <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
              <i class="fa-solid fa-angle-right"></i>
            </button>
            <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
        <SideBanners class="mb-4 mt-16 lg:mt-0" /> 
      </div>
    </div>
    <Maps class="mt-14 sm:mt-24" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useHead } from '@vueuse/head'; 
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const activeTab = ref('leyla_medical_center');
const content = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const router = useRouter();
const route = useRoute();

// API-dən məlumatları yükləyən funksiya
const fetchContent = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/latestnews-list/');
    content.value = response.data.results.reverse(); // Məlumatları tərsinə çevir;
    updateSEO(); // SEO məlumatlarını yeniləyirik
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// PDF faylını açmaq üçün funksiya
const openPdf = (pdfUrl) => {
  window.open(pdfUrl, '_blank');
};

// Filtrlənmiş məzmun
const filteredContent = computed(() => {
  return content.value.filter(item => item.news_cat === activeTab.value);
});

// Səhifələmə
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

// SEO meta məlumatlarını əlavə etmək üçün funksiya
const updateSEO = () => {
  const tabName = activeTab.value === 'leyla_medical_center' ? 'Leyla Medical Center' : 'İnfo Lab';
  const currentTabContent = content.value.filter(item => item.news_cat === activeTab.value);
  const topItemNames = currentTabContent.slice(0, 5).map(item => item.author).join(', ');
  const metaDescription = activeTab.value === 'leyla_medical_center'
    ? `Leyla Medical Center-in son yenilikləri: ${topItemNames}.`
    : `İnfo Lab yenilikləri: ${topItemNames}.`;

  useHead({
    title: `Son Yeniliklər | ${tabName} | Leyla Medical Center`,
    meta: [
      { name: 'description', content: metaDescription },
      { name: 'keywords', content: `leyla medical center, son yeniliklər, ${tabName}, tibbi materiallar` },
      { property: 'og:title', content: `Son Yeniliklər | ${tabName} | Leyla Medical Center` },
      { property: 'og:description', content: metaDescription },
      { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/mediada-biz/son-yeniliklər' },
    ],
    link: [
      { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/mediada-biz/son-yeniliklər' }
    ]
  });
};

// Tab dəyişdikdə URL query parametrini yeniləmək
watch(activeTab, (newTab) => {
  currentPage.value = 1;
  updateSEO();
  router.replace({ path: '/az/haqqımızda/mediada-biz/son-yeniliklər', query: { tab: newTab } });
});

// Səhifə yükləndikdə məlumatları yükləyirik
onMounted(() => {
  const tabParam = route.query.tab;
  if (tabParam && ['leyla_medical_center', 'info_lab'].includes(tabParam)) {
    activeTab.value = tabParam;
  }
  fetchContent();
});
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

tbody>tr:hover .fa-file-pdf{
  transform: scale(1.1);
}

table tr{
  font-size: 14px;
}


/* Pagination CSS */
.pagination {
    margin-top: 2rem;
    user-select: none;
    padding: 10px 0;
    z-index: 999999;
}

.pagination > * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination-button {
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
}

.pagination-button:hover:not(:disabled) {
    background-color: #e5e7eb;
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.active-page {
    background-color: #6ab42b;
    color: white;
    font-weight: bold;
    padding: 0 0.75rem;
}

.inactive-page {
    padding: 0 0.75rem;
    background-color: #f3f4f6;
    color: #374151;
}

.inactive-page:hover {
    background-color: #e5e7eb;
}

.pagination-dots {
    cursor: default;
    color: #6b7280;
}

</style>