<template>
  <div class="container mt-16 text-main-text">
      <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <div v-if="newsItem">
            <div class="w-[70%]">
              <img :src="newsItem.main_photo" alt="News Image" class="w-full h-auto mb-4">
            </div>
              <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4">{{ newsItem.title }}</h1>
              <p class="text-sm screen-400:text-base md:text-lg">{{ newsItem.text }}</p>
              <p class="text-sm text-gray-500 mt-4">{{ new Date(newsItem.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
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
         <GallerySection :images="images" />
      </div>

      <Maps class="mt-14 sm:mt-24"/>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";
  
  const route = useRoute();
  const newsItem = ref(null);
  const images = ref([]);
  
  const fetchNewsItem = async () => {
    try {
      const response = await axios.get(`http://bytexerp.online/api/leyla/v1/news-list/${route.params.slug}/`);
      newsItem.value = response.data;

      // Xəbər məlumatları alındıqdan sonra şəkilləri yükləyirik
      await fetchNewsPhotos();
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
        photo.news.id === newsItem.value.id
      );
      
      // Şəkil URL-lərini çıxarıb array şəklində saxlayırıq
      images.value = filteredPhotos.map(photo => photo.image);
    } catch (error) {
      console.error('Şəkil yükləməsində xəta:', error);
    }
  };
  
  onMounted(() => {
    fetchNewsItem();
  });
  </script>
  
  <style scoped>
  /* .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  } */
  </style>