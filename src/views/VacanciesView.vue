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
        <h1 class="text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  v-for="(vacancy, index) in paginatedVacancies" 
                  :key="index" 
                  class="mb-4 cursor-pointer hover:opacity-90 transition-all transform hover:scale-101 duration-200" 
                  @click="goToVacancyDetail(vacancy.slug)"
                  >
                  <img :src="vacancy.image" :alt="vacancy.title" class="w-full h-auto rounded-md">
                  <p class="text-base sm:text-lg mt-2">{{ vacancy.title }}</p>
                </div>
            </div>
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
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch  } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useHead } from '@vueuse/head'; 

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const router = useRouter();
const pageTitle = ref('Vakansiyalar');
// API-dən məlumatları çəkmək üçün state-lər
const vacanciesData = ref([]);
const loading = ref(true);
const error = ref(null);

// Vakansiya detalına keçid funksiyası
const goToVacancyDetail = (slug) => {
  router.push({
    name: 'vacancy-detail',
    params: { slug }
    // Alternativ naviqasiya metodu: 
    // path: `/az/haqqımızda/mediada-biz/vakansiya/${slug}`
  });
};

// API-dən məlumatları çəkmək funksiyası
const fetchVacanciesData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/vacancy-list/');
    console.log('API cavabı:', response.data);
    vacanciesData.value = response.data.results || [];
    
    // Məlumatlar yükləndikdən sonra SEO məlumatlarını yeniləyirik
    updateSEO();
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};

// SEO meta məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
  // Vakansiyalar haqqında qısa məlumat əldə etmək
  const vacancyTitles = vacanciesData.value
    .slice(0, 5)
    .map(v => v.title)
    .join(', ');
    
  const metaDescription = vacanciesData.value.length > 0 
    ? `Leyla Medical Center-də açıq vakansiyalar: ${vacancyTitles}. Karyeranıza bizim komanda ilə başlayın.`
    : 'Leyla Medical Center vakansiyaları səhifəsi. Karyeranızı tibb sahəsində inkişaf etdirmək üçün bizə qoşulun.';
    
  // İlk vakansiya şəklini istifadə edirik (əgər varsa)
  const firstVacancyImage = vacanciesData.value.length > 0 && vacanciesData.value[0].image
    ? vacanciesData.value[0].image
    : 'https://leylamc.com/images/vacancy-default.jpg';
    
  useHead({
    title: `Leyla Medical Center | ${pageTitle.value}`,
    meta: [
      { 
        name: 'description', 
        content: metaDescription
      },
      { 
        name: 'keywords', 
        content: 'leyla medical center vakansiyalar, tibb sahəsində iş, həkim vakansiyaları, tibb bacısı vakansiyaları, tibb işçisi vakansiyaları, klinika vakansiyaları, iş elanları, karyera' 
      },
      // Open Graph meta tagları - URL yolunu yeniləyirik
      { property: 'og:title', content: `Leyla Medical Center | ${pageTitle.value}` },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya' },
      { property: 'og:image', content: firstVacancyImage },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: firstVacancyImage },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org JobPosting)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": vacanciesData.value.map((vacancy, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "JobPosting",
              "title": vacancy.title,
              "description": vacancy.skills_demand || "Leyla Medical Center vakansiyası",
              "datePosted": vacancy.created_at || new Date().toISOString(),
              "hiringOrganization": {
                "@type": "Organization",
                "name": "Leyla Medical Center",
                "sameAs": "https://leylamc.com",
                "logo": "https://leylamc.com/images/logo.png"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bakı",
                  "addressRegion": "Bakı",
                  "addressCountry": "Azərbaycan"
                }
              },
              // URL strukturunu yeniləyirik
              "url": `https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya/${vacancy.slug}`
            }
          }))
        })
      }
    ],
    // Canonical link-də URL-i yeniləyirik
    link: [
      { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya' }
    ]
  });
};

// Komponent yükləndikdə API çağırışı
onMounted(() => {
  fetchVacanciesData();
  
  // Pagination ləğv edildikdə səhifənin yuxarısına scroll et
  const unwatch = watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Komponent söndürüldükdə izləməni ləğv et
  onUnmounted(() => {
    unwatch();
  });
});

// Pagination və digər funksiyalar
const itemsPerPage = 9;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(vacanciesData.value.length / itemsPerPage));

const paginatedVacancies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return vacanciesData.value.slice(start, end);
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
</script>

<style scoped>
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



ul {
    list-style: disc;
}
button {
    margin: 0 5px;
    background-color: #6bb52b;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
button:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}
span {
    margin: 0 5px;
    cursor: pointer;
}
.font-bold {
    font-weight: bold;
}
.active-page {
    background-color: #6bb52b;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}
.inactive-page {
    color: #a5d6a7;
    padding: 5px 10px;
    border-radius: 5px;
}
.pagination {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 5px 10px;
    width: 100%;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
