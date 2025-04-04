<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
      <!-- Skeleton yükləməsi -->
      <SkeletonLoader v-if="showSkeleton" :contentLines="8" :showLink="true" />
    
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <h1 class="text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
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
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';


import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";

// API-dən məlumatları çəkmək üçün state-lər
const checkups = ref([]);
const error = ref(null);

// Skeleton loading hookunu 400ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(400);


// API-dən məlumatları çəkmək funksiyası
const fetchCheckupsData = async () => {
  try {
    startLoading();
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/checkup-list/');
    checkups.value = response.data.results || [];
  } catch (err) {
    error.value = "Məlumatları yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    stopLoading()
  }
};

// // Komponent yükləndikdə API çağırışı
// onMounted(() => {
//   fetchCheckupsData();
// });

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
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToFirstPage = () => {
  currentPage.value = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};
window.scrollTo({ top: 0, behavior: 'smooth' });

const isExpired = (finish_date) => {
  return finish_date < today;
};

const router = useRouter();

const goToCheckUp = (checkup) => {
  router.push({ name: 'check-up-inner', params: { slug: checkup.slug } });
};

const pageTitle = ref("Check Up")

// Məlumatlar yükləndikdən sonra SEO məlumatlarını yeniləyən funksiya
const updateSeoMetadata = () => {
  const canonicalUrl = 'https://leylamc.com/az/tibbi-xidmətlər/check-uplar';
  
  useHead({
    title: `Leyla Medical Center | ${pageTitle.value}`,
    meta: [
      { 
        name: 'description', 
        content: 'Leyla Medical Center-də müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun. Profilaktik tibbi yoxlamalar, laboratoriya analizləri və detallı müayinələr vasitəsilə sağlamlığınızı nəzarətdə saxlayın.'
      },
      { 
        name: 'keywords', 
        content: 'check up, tibbi müayinə, profilaktik yoxlama, kompleks müayinə, sağlamlıq müayinəsi, Leyla Medical Center, tibbi yoxlama paketləri, sağlamlıq paketləri, illik müayinə, profilaktik tədbir' 
      },
      
      // Open Graph meta tagları (sosial mediada paylaşım üçün) - yenilənmiş URL
      { property: 'og:title', content: 'Leyla Medical Center | Check Up Paketləri' },
      { property: 'og:description', content: 'Müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun. Profilaktik tibbi yoxlamalar, laboratoriya analizləri və detallı müayinələr.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: checkups.value.length > 0 ? checkups.value[0].photo : 'https://leylamc.com/images/leyla-mc-logo.png' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Leyla Medical Center | Check Up Paketləri' },
      { name: 'twitter:description', content: 'Müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun. Profilaktik tibbi yoxlamalar, laboratoriya analizləri və detallı müayinələr.' },
      { name: 'twitter:image', content: checkups.value.length > 0 ? checkups.value[0].photo : 'https://leylamc.com/images/leyla-mc-logo.png' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org) - yenilənmiş URL-lər
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Check Up Paketləri | Leyla Medical Center",
          "description": "Leyla Medical Center-də müxtəlif check-up paketləri ilə sağlamlığınızı qoruyun.",
          "url": canonicalUrl,
          "inLanguage": "az",
          "provider": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": "https://leylamc.com/images/leyla-mc-logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Yusif Səfərov küç.19, Xətai rayonu",
              "addressLocality": "Bakı",
              "addressCountry": "Azərbaycan"
            },
            "telephone": "+994124902131"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": checkups.value.slice(0, 10).map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.title,
              "url": `https://leylamc.com/az/tibbi-xidmətlər/check-uplar/${item.slug}`
            }))
          },
          "specialty": [
            {
              "@type": "MedicalSpecialty",
              "name": "Profilaktik Təbabət"
            },
            {
              "@type": "MedicalSpecialty",
              "name": "Diaqnostika"
            }
          ],
          "audience": {
            "@type": "MedicalAudience",
            "audienceType": "Public"
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  });
};

// Məlumatlar yükləndikdən sonra SEO əlavə edək
onMounted(() => {
  fetchCheckupsData().then(() => {
    // API sorğusu bitdikdən sonra SEO məlumatlarını yenilə
    updateSeoMetadata();
  });
});

// Component unmount olduqda təmizləmə
onUnmounted(() => {
  cleanupSkeleton();
});
</script>

<style scoped>
ul {
    list-style: disc;
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