<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ pageTitle }}</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="item in paginatedNews" :key="item.id" class="relative mb-4 news-card cursor-pointer overflow-hidden rounded-md" @click="goToNews(item.slug)">
                        <div class="overflow-hidden">
                            <img :src="item.main_photo" class="w-full h-auto rounded-md news-image transition-transform duration-300" :alt="item.title">
                        </div>
                        <p 
                          class="text-base sm:text-lg mt-2 p-2 truncated-title" 
                          :title="item.title"
                        >
                          {{ truncateTitle(item.title) }}
                        </p>
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
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

// Dinamik səhifə başlığı
const pageTitle = ref('Xəbərlər');
const news = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;

const fetchAllNews = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/news-list/');
    console.log(response.data); // Məlumatları konsolda göstərmək
    
    // Xəbərləri yaranma tarixinə görə azalan sıra ilə düzürük (ən yeni xəbərlər əvvəldə)
    news.value = response.data.results.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    
    // Xəbərlər yükləndikdən sonra SEO məlumatlarını yeniləyirik
    updateSEO();
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// Başlıq mətnini 50 simvoldan sonra kəsmək üçün funksiya
const truncateTitle = (text) => {
  if (text.length <= 70) {
    return text;
  }
  return text.substring(0, 70) + '...';
};

onMounted(() => {
  fetchAllNews();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

let pollingInterval;

const startPolling = () => {
  pollingInterval = setInterval(fetchAllNews, 5000); // Hər 5 saniyədən bir API çağırışı
};

const stopPolling = () => {
  clearInterval(pollingInterval);
};


const totalPages = computed(() => Math.ceil(news.value.length / itemsPerPage));

const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return news.value.slice(start, end);
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

const goToNews = (slug) => {
  router.push({ name: 'news-content', params: { slug } });
};

// Dinamik meta description yaratmaq üçün computed xüsusiyyət
const metaDescription = computed(() => {
  if (!news.value || news.value.length === 0) {
    return 'Leyla Medical Center-in ən son xəbərləri, tibbi yeniliklər, həkim məsləhətləri və tibbi kampaniyalar haqqında məlumat əldə edin.';
  }
  
  // İlk 3 xəbərin başlığını birləşdiririk
  const recentNewsTitles = news.value
    .slice(0, 3)
    .map(item => item.title)
    .join(', ');
  
  return `Leyla Medical Center-in son tibbi xəbərləri: ${recentNewsTitles}. Yeniliklər, həkim məsləhətləri və digər tibbi məlumatlar.`;
});

// İlk şəklin URL-sini təyin edirik
const firstNewsImage = computed(() => {
  return news.value && news.value.length > 0 
    ? news.value[0].main_photo 
    : 'https://leylamc.com/images/news-default.jpg';
});

// SEO meta məlumatlarını yeniləmək üçün funksiya
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
        content: 'leyla medical center, tibbi xəbərlər, səhiyyə xəbərləri, xəstəxana yenilikləri, tibbi məsləhətlər, həkim tövsiyələri, tibbi tədbirlər, tibbi aksiyalar, yeni tibbi xidmətlər' 
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
      { property: 'og:url', content: 'https://leylamc.com/news' },
      { property: 'og:image', content: firstNewsImage.value },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
      { name: 'twitter:description', content: metaDescription.value },
      { name: 'twitter:image', content: firstNewsImage.value },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pageTitle.value,
          "description": metaDescription.value,
          "url": "https://leylamc.com/news",
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
            "itemListElement": news.value.slice(0, 10).map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "NewsArticle",
                "headline": item.title,
                "image": item.main_photo,
                "datePublished": item.created_at || new Date().toISOString(),
                "url": `https://leylamc.com/news/${item.slug}`
              }
            }))
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: 'https://leylamc.com/news' }
    ]
  });
};

// Xəbər məlumatları dəyişdikdə SEO məlumatlarını yeniləyirik
watch(news, () => {
  updateSEO();
}, { deep: true });

// Cari səhifə dəyişdikdə də SEO məlumatlarını yeniləyə bilərik
watch(currentPage, () => {
  // Burada səhifə dəyişdiyində, URL-ə səhifə nömrəsi əlavə edə bilərik
  // Məsələn: useHead içərisində canonical URL-i dəyişdirə bilərik
});
</script>

<style scoped>
/* .pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.pagination span {
  cursor: pointer;
  padding: 8px 12px;
}

.active-page {
  background-color: #4F46E5;
  color: white;
  border-radius: 4px;
}

.inactive-page {
  color: #4F46E5;
}

.pagination-button {
  background: none;
  border: none;
  color: #4F46E5;
  cursor: pointer;
  padding: 8px;
}

.pagination-button:disabled {
  color: #ccc;
  cursor: not-allowed;
} */

.news-card {
  transition: all 0.3s ease;
  /* box-shadow: 0 1px 3px rgba(0,0,0,0.1); */
}

.news-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.news-card:hover .news-image {
  transform: scale(1.05);
}

.news-image {
  transform-origin: center;
  transition: transform 0.4s ease-out;
}

.truncated-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  position: relative;
}

/* Əgər xüsusi tooltip istəyirsinizsə (browser tooltip kifayət etmirsə) */
.news-card:hover .truncated-title::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: normal;
  max-width: 300px;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.news-card:hover .truncated-title:hover::after {
  opacity: 1;
  visibility: visible;
}
</style>