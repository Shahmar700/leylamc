<template>
  <div class="container mt-16 text-main-text">
    <!-- Yüklənmə göstəricisi -->
    <div v-if="loading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4">Aksiyalar yüklənir...</p>
    </div>
    
    <!-- Xəta göstəricisi -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>
    
    <!-- Əsas məzmun -->
    <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
      <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
        
        <!-- Aksiyalar siyahısı -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(offer, index) in paginatedOffersData" 
            :key="index" 
            class="relative mb-4 cursor-pointer hover:opacity-90 transition-opacity" 
            @click="goToOffer(offer)"
            :class="{ 'opacity-90': isExpired(offer.finish_date) }"
          >
            <div class="offer-card rounded-md overflow-hidden shadow-md">
              <!-- Şəkil konteyner - Vaxtı Bitib funksionalı ilə -->
              <div class="relative">
                <img 
                  :src="offer.photo" 
                  :alt="offer.title" 
                  class="w-full h-[200px] object-cover" 
                  :class="{ 'grayscale': isExpired(offer.finish_date) }"
                >
                <!-- Vaxtı bitib göstəricisi -->
                <div 
                  v-if="isExpired(offer.finish_date)" 
                  class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold"
                >
                  <span class="-rotate-[30deg] tracking-widest">VAXTI BİTİB</span>
                </div>
              </div>
              
              <!-- Aksiya məlumat bölməsi -->
              <div class="p-3">
                <p class="text-base sm:text-lg font-medium mb-2 truncate">{{ offer.title }}</p>
                <div class="flex justify-between text-sm text-gray-600">
                  <p>Başlama: {{ formatDate(offer.start_date) }}</p>
                  <p>Bitmə: {{ formatDate(offer.finish_date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination bölməsi -->
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
      
      <!-- Yan panel -->
      <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
        <SideBanners class="mb-4" /> 
        <SideBanners2 class="mb-4" /> 
      </div>
    </div>
    
    <!-- Xəritə bölməsi -->
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
  
  const router = useRouter();
  
// Bugünkü tarixi əldə etmək
const today = new Date().toISOString().split('T')[0]; 

// Tarixi yoxlama funksiyası - vaxtı keçib-keçmədiyini yoxlayır
const isExpired = (finish_date) => {
  if (!finish_date) return false; // Bitmə tarixi təyin edilməyibsə, vaxtı keçməyib
  return finish_date < today;
};

  // Səhifə başlığı
  const pageTitle = ref('Aksiyalar');
  
  // API-dən məlumatları çəkmək üçün state-lər
  const offersData = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
const updateSEO = () => {
  useHead({
    title: `Leyla Medical Center | ${pageTitle.value}`,
    meta: [
      {
        name: 'description',
        content: 'Leyla Medical Center-in cari aksiyaları, endirimlər və xüsusi təkliflər. Sağlamlığınız üçün ən yaxşı qiymətlər və imkanlar.'
      },
      {
        property: 'og:title',
        content: `Leyla Medical Center | ${pageTitle.value}`
      },
      {
        property: 'og:description',
        content: 'Leyla Medical Center-in cari aksiyaları, endirimlər və xüsusi təkliflər. Sağlamlığınız üçün ən yaxşı qiymətlər və imkanlar.'
      },
      {
        name: 'keywords',
        content: 'tibbi aksiyalar, endirimlər, sağlamlıq təklifləri, tibbi xidmətlərdə endirim, Leyla Medical Center aksiyaları'
      }
    ]
  });
};
  
  // Tarixi formatlayan metod
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  // API-dən məlumatları çəkmək funksiyası
  const fetchOffersData = async () => {
    try {
      loading.value = true;
      const response = await axios.get('https://bytexerp.online/api/leyla/v1/offer-list/');
      console.log("Aksiya API cavabı:", response.data);
      offersData.value = response.data.results || [];
      
      // Məlumatlar yükləndikdən sonra SEO məlumatlarını yeniləyirik
      updateSEO();
      
    } catch (err) {
      error.value = "Aksiya məlumatlarını yükləmək mümkün olmadı.";
      console.error("API xətası:", err);
    } finally {
      loading.value = false;
    }
  };
  
  // Aksiya detallarına keçid
  const goToOffer = (offer) => {
    router.push({
      name: 'offer-detail',
      params: { slug: offer.slug }
    });
  };
  
  // Komponent yükləndikdə API çağırışı
  onMounted(() => {
    fetchOffersData();
  });
  
  // Pagination və digər funksiyalar
  const itemsPerPage = 9;
  const currentPage = ref(1);
  
  const filteredOffersData = computed(() => {
    return offersData.value;
  });
  
  const totalPages = computed(() => Math.ceil(filteredOffersData.value.length / itemsPerPage));
  
  const paginatedOffersData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredOffersData.value.slice(start, end);
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
  
  // Pagination funksiyaları
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
  .grayscale {
  filter: grayscale(100%);
}
  .offer-card {
    transition: all 0.3s ease;
    height: 100%;
  }
  
  .offer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .active-page {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: white;
    background-color: #57af39;
    transition: background-color 0.3s;
  }
  
  .inactive-page {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    transition: background-color 0.3s;
  }
  
  .inactive-page:hover {
    background-color: #e5e7eb;
  }
  
  .pagination-button {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #f3f4f6;
    transition: background-color 0.3s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #e5e7eb;
  }
  
  .pagination-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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