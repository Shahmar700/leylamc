<template>
  <div class="container mt-16 text-main-text">
      <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <!-- Geri butonu -->
          <button @click="goBack" class="flex items-center text-gray-600 mb-6 hover:text-green-600 transition-colors">
          <i class="fa-solid fa-arrow-left mr-2"></i> Geriyə
          </button>
          <div v-if="newsItem">
            <div class="w-[70%]">
              <img :src="newsItem.main_photo" alt="News Image" class="w-full h-auto mb-4">
            </div>
              <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4">{{ newsItem.title }}</h1>
              <p class="text-sm screen-400:text-base md:text-lg text-justify">{{ newsItem.text }}</p>
              <p class="text-sm text-gray-500 mt-4">{{ formatDate(newsItem.created_at) }}</p>
          </div>
          <div v-else>
            <p>Yüklənir...</p>
          </div>
        </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
              <SideBanners class="mb-4" /> 
              <SideBanners2 class="mb-4" />   
          </div>
        </div>

      <!-- GALLERY SIDE  -->
      <div class="mt-10">
         <GallerySection :images="galleryImages" />
      </div>

      <Maps class="mt-14 sm:mt-24"/>
  </div>
</template>

  
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";
  
const route = useRoute();
const newsItem = ref(null);
const images = ref([]);

const router = useRouter();
const goBack = () => {
  // Əvvəlki səhifəyə qayıt
  router.push({ name: 'all-news' });
};
  
// Qalereya üçün formatlanmış şəkillər
const galleryImages = computed(() => {
  return images.value.map((url, index) => ({
    src: url,
    alt: `${newsItem.value?.title || 'Xəbər şəkli'} - ${index + 1}`,
    id: index
  }));
});

// Tarix formatlaması üçün funksiya
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Azərbaycan dilində ayların adları
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

const fetchNewsItem = async () => {
  try {
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/news-list/${route.params.slug}/`);
    newsItem.value = response.data;

    // Xəbər məlumatları alındıqdan sonra şəkilləri yükləyirik
    await fetchNewsPhotos();
    
    // SEO məlumatlarını yeniləyirik
    updateSEO();
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

const fetchNewsPhotos = async () => {
  try {
    if (!newsItem.value) return;
    
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/news-photo-list/');
    
    // Cari xəbərə aid olan şəkilləri filtərləyirik
    const filteredPhotos = response.data.results.filter(photo => 
      photo.news && photo.news.id === newsItem.value.id
    );
    
    // Şəkil URL-lərini çıxarıb array şəklində saxlayırıq
    images.value = filteredPhotos.map(photo => photo.image);
  } catch (error) {
    console.error('Şəkil yükləməsində xəta:', error);
  }
};

// Meta açıqlaması üçün xəbər mətninin qısa versiyası
const shortDescription = computed(() => {
  if (!newsItem.value?.text) return '';
  // 160 simvolla məhdudlaşdırılmış təmiz mətn
  return newsItem.value.text.length > 160 
    ? newsItem.value.text.substring(0, 157) + '...' 
    : newsItem.value.text;
});

// SEO məlumatlarını yeniləmək funksiyası
const updateSEO = () => {
  if (!newsItem.value) return;

  const canonicalUrl = `https://leylamc.com/news/${route.params.slug}`;
  
  useHead({
    title: `Leyla Medical Center | ${newsItem.value.title}`,
    meta: [
      { 
        name: 'description', 
        content: shortDescription.value 
      },
      { 
        name: 'keywords', 
        content: `leyla medical center, tibbi xəbərlər, ${newsItem.value.title}, səhiyyə xəbərləri, tibbi məqalə` 
      },
      { 
        property: 'og:title', 
        content: newsItem.value.title
      },
      { 
        property: 'og:description', 
        content: shortDescription.value
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: newsItem.value.main_photo },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      { property: 'article:published_time', content: newsItem.value.created_at },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: newsItem.value.title },
      { name: 'twitter:description', content: shortDescription.value },
      { name: 'twitter:image', content: newsItem.value.main_photo },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": newsItem.value.title,
          "description": shortDescription.value,
          "image": [
            newsItem.value.main_photo,
            ...images.value
          ],
          "datePublished": newsItem.value.created_at,
          "dateModified": newsItem.value.updated_at || newsItem.value.created_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          },
          "author": {
            "@type": "Organization",
            "name": "Leyla Medical Center"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/logo.png"
            }
          }
        })
      }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  });
};

// Xəbər məlumatları dəyişdikdə SEO məlumatlarını yeniləyirik
watch(newsItem, () => {
  if (newsItem.value) {
    updateSEO();
  }
}, { deep: true });
  
onMounted(() => {
  fetchNewsItem();
});
</script>
  
<style scoped>
h1 {
  line-height: 1.3;
}

img {
  max-width: 100%;
  height: auto;
}

.text-justify {
  text-align: justify;
}
</style>