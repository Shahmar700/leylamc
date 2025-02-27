<template>
    <div class="container mt-17">
      <div v-if="newsItem">
        <h1 class="text-4xl font-bold mb-4">{{ newsItem.title }}</h1>
        <img :src="newsItem.main_photo" alt="News Image" class="w-full h-auto mb-4">
        <p class="text-lg">{{ newsItem.text }}</p>
        <p class="text-sm text-gray-500 mt-4">{{ new Date(newsItem.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
      </div>
      <div v-else>
        <p>Yüklənir...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const newsItem = ref(null);
  
  const fetchNewsItem = async () => {
    try {
      const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/news-list/${route.params.slug}/`);
      newsItem.value = response.data;
    } catch (error) {
      console.error('API çağırışında xəta:', error);
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