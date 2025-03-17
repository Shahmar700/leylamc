<template>
  <div class="container mt-16 text-main-text">
      <div class="flex flex-col lg:flex-row items-center xl:items-start md:justify-between">
          <div class="w-full lg:w-3/4" data-aos="zoom-out-right">
              <h1 class="text-3xl font-semibold mb-10">{{ pageHeading }}</h1>
              <div>
                  <div class="flex mb-2 md:mb-4 headingBtns border-b">
                      <button 
                          v-for="category in availableCategories" 
                          :key="category" 
                          @click="activeTab = category" 
                          :class="{ 'font-bold': activeTab === category }"
                          class="text-xs md:text-sm"
                      >
                          {{ category }}
                      </button>
                  </div>
                  <div v-if="loading" class="py-10 text-center">
                      <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p class="mt-4 text-gray-600">Məlumatlar yüklənir...</p>
                  </div>
                  <!-- Cədvəli responsive konteynerin içinə yerləşdiririk -->
                    <div v-else class="table-container">
                        <table  class="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b text-start"><i class="fa-regular fa-calendar mr-1"></i>Tarix</th>
                                    <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-pencil mr-1"></i>Mənbə</th>
                                    <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-link mr-1"></i>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="item in paginatedContent" 
                                    :key="item.id" 
                                    @click="openUrl(item.url)" 
                                    class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary hover:border"
                                >
                                    <td class="py-2 px-4 border-b whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                    <td class="py-2 px-4 border-b">{{ item.source }}</td>
                                    <td class="py-2 px-4 border-b">
                                        <span class="truncate block max-w-[300px]">{{ item.url }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  <div v-if="totalPages > 1" class="pagination mt-4 flex justify-center lg:justify-start">
                      <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button">
                          <i class="fa-solid fa-angles-left"></i>
                      </button>
                      <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">
                          <i class="fa-solid fa-angle-left"></i>
                      </button>
                      <span 
                          v-for="page in pages" 
                          :key="page" 
                          @click="goToPage(page)" 
                          :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }"
                      >
                          {{ page }}
                      </span>
                      <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button">
                          <i class="fa-solid fa-angle-right"></i>
                      </button>
                      <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button">
                          <i class="fa-solid fa-angles-right"></i>
                      </button>
                  </div>
              </div>
          </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
              <SideBanners class="mb-4 mt-14 lg:mt-0" /> 
          </div>
      </div>
      <Maps class="mt-14 sm:mt-24" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

const pageHeading = ref("KİV yazanlar")

// State dəyişənləri
const mediaItems = ref([]);
const loading = ref(true);
const activeTab = ref('');
const itemsPerPage = 7;
const currentPage = ref(1);

// Bütün mövcud kateqoriyaları hesablama
const availableCategories = computed(() => {
const categories = new Set(mediaItems.value.map(item => item.category));
return Array.from(categories);
});

// API-dan məlumatları yükləmək
const fetchMediaItems = async () => {
try {
  loading.value = true;
  const response = await axios.get('https://bytexerp.online/api/leyla/v1/media-list/');
  
  // Məlumatları yeni tarixdən köhnəyə doğru sıralayırıq
  mediaItems.value = response.data.results.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // İlk kateqoriyanı aktiv tab olaraq təyin etmək
  if (mediaItems.value.length > 0 && !activeTab.value) {
    activeTab.value = mediaItems.value[0].category;
  }
  
  updateSEO();
  loading.value = false;
} catch (error) {
  console.error('Media məlumatlarını yükləmək xətası:', error);
  loading.value = false;
}
};

// Tarixi formatlamaq funksiyası
const formatDate = (dateStr) => {
if (!dateStr) return '';
const date = new Date(dateStr);
return date.toLocaleDateString('az-AZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
};

// Aktiv taba görə məlumatları filtrləmək
const filteredContent = computed(() => {
if (!activeTab.value) return [];
return mediaItems.value.filter(item => item.category === activeTab.value);
});

// Səhifələnmiş məlumatlar
const totalPages = computed(() => Math.ceil(filteredContent.value.length / itemsPerPage));

const paginatedContent = computed(() => {
const start = (currentPage.value - 1) * itemsPerPage;
const end = start + itemsPerPage;
return filteredContent.value.slice(start, end);
});

// Səhifə nömrələri
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

// Naviqasiya funksiyaları
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

// Tab dəyişdikdə səhifəni sıfırla
watch(activeTab, () => {
currentPage.value = 1;
});

// SEO məlumatlarını yeniləmək
const updateSEO = () => {
const metaDescription = computed(() => {
  return `Leyla Medical Center haqqında ${availableCategories.value.join(', ')} kateqoriyalarında KİV yazıları. Klinikanın fəaliyyəti ilə bağlı media məlumatları.`;
});

useHead({
  title: `Leyla Medical Center | ${ pageHeading.value }`,
  meta: [
    { 
      name: 'description', 
      content: metaDescription.value
    },
    { 
      name: 'keywords', 
      content: 'leyla medical center, KİV yazıları, media, qəzet məqalələri, televiziya, radio, internet məqalələri, tibb xəbərləri' 
    },
    { property: 'og:title', content: 'Leyla Medical Center | KİV yazıları' },
    { property: 'og:description', content: metaDescription.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/kiv-yazilari' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leyla Medical Center | KİV yazıları' },
    { name: 'twitter:description', content: metaDescription.value },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "KİV yazıları",
        "description": metaDescription.value,
        "url": "https://leylamc.com/kiv-yazilari",
        "publisher": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center"
        },
        "about": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center"
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/kiv-yazilari' }
  ]
});
};

// Səhifə yükləndiyində məlumatları çəkmək
onMounted(() => {
fetchMediaItems();
});
</script>

<style scoped>
.headingBtns {
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.headingBtns button {
padding: 8px 16px;
border: 1px solid #6bb52b;
background-color: transparent;
cursor: pointer;
color: #6bb52b;
border-radius: 2px;
white-space: nowrap;
}

.headingBtns button.font-bold {
font-weight: bold;
border-bottom: 2px solid #6bb52b;
background-color: #6bb52b;
color: #fff;
}
@media (max-width: 768px) {
table tr{
  font-size: 12px;
  }
}
table tr{
  font-size: 14px;
}
/* Sadəcə horizontal scroll üçün stil */
.table-container {
  width: 100%;
}

/* 768px-dən kiçik ekranlarda horizontal scroll */
@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* iOS üçün daha rahat sürüşdürmə */
  }
  
  /* Cədvəl üçün minimum genişlik təyin et ki, sütunlar sıxılmasın */
  .table-container table {
    min-width: 600px;
  }
}
/* Loading animasiyası */
@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

.animate-spin {
animation: spin 1s linear infinite;
}
</style>