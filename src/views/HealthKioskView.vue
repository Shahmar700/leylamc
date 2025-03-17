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
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
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
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

// Səhifə başlığı
const pageTitle = ref('Sağlıq Köşkü');

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
  
  // Məlumatlar yükləndikdən sonra SEO məlumatlarını yeniləyirik
  updateSEO();
  
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

// Dinamik meta description üçün
const metaDescription = computed(() => {
if (!healthKioskData.value || healthKioskData.value.length === 0) {
  return 'Leyla Medical Center-in Sağlamlıq Köşkləri haqqında məlumat əldə edin. Preventiv sağlamlıq xidmətləri və tibbi məsləhətlər.';
}

// İlk 3 köşkün adını birləşdiririk
const kioskNames = healthKioskData.value
  .slice(0, 3)
  .map(item => item.title)
  .join(', ');

return `Leyla Medical Center Sağlamlıq Köşkləri: ${kioskNames}. Preventiv tibbi xidmətlər və sağlamlıq məsləhətləri.`;
});

// İlk şəklin URL-sini təyin edirik
const firstKioskImage = computed(() => {
return healthKioskData.value && healthKioskData.value.length > 0 
  ? healthKioskData.value[0].photo 
  : 'https://leylamc.com/images/health-kiosk-default.jpg';
});

// Köşk başlıqlarını birləşdirib keywords üçün hazırlayırıq
const kioskKeywords = computed(() => {
if (!healthKioskData.value || healthKioskData.value.length === 0) {
  return '';
}

return healthKioskData.value
  .slice(0, 5) // İlk 5 köşkü götürürük
  .map(item => item.title.toLowerCase())
  .join(', ');
});

// SEO meta məlumatlarını yeniləmək funksiyası
const updateSEO = () => {
useHead({
  title: `Leyla Medical Center | ${pageTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: metaDescription.value
    },
    { 
      name: 'keywords', 
      content: `sağlamlıq köşkləri, leyla medical center, preventiv tibb, sağlamlıq xidmətləri, ${kioskKeywords.value}` 
    },
    { 
      property: 'og:title', 
      content: `Leyla Medical Center | ${pageTitle.value}` 
    },
    { 
      property: 'og:description', 
      content: metaDescription.value
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/health-kiosks' },
    { property: 'og:image', content: firstKioskImage.value },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
    { name: 'twitter:description', content: metaDescription.value },
    { name: 'twitter:image', content: firstKioskImage.value },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle.value,
        "description": metaDescription.value,
        "url": "https://leylamc.com/health-kiosks",
        "publisher": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": {
            "@type": "ImageObject",
            "url": "https://leylamc.com/images/logo.png"
          }
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": healthKioskData.value.slice(0, 10).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "MedicalClinic",
              "name": item.title,
              "image": item.photo,
              "url": `https://leylamc.com/health-kiosks/${item.id}`
            }
          }))
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/health-kiosks' }
  ]
});
};

// Köşk məlumatları dəyişdikdə SEO məlumatlarını yeniləyirik
watch(healthKioskData, () => {
if (!loading.value) {
  updateSEO();
}
}, { deep: true });

// Cari səhifə dəyişdikdə meta yenilənməsi
watch(currentPage, () => {
// Əlavə səhifə spesifik meta əlavə edilə bilər
// Məsələn, kanonik URL-də səhifə parametri
if (!loading.value) {
  updateSEO();
}
});
</script>


<style scoped>
ul {
  list-style: disc;
}

/* Şəkil hover effektləri */
.grid > div {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.grid > div:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.grid > div img {
  transition: transform 0.5s ease;
  border-radius: 8px;
}

.grid > div:hover img {
  transform: scale(1.05);
}

/* Pagination CSS-i də əlavə edək */
.pagination {
  margin-top: 2rem;
  user-select: none;
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
</style>