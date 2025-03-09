<template>
    <div class="container mt-16 text-main-text">
        <div v-if="loading" class="text-center py-10">
            <p>Yüklənir...</p>
        </div>
        <div v-else-if="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
        </div>
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ article.articleHeader }}</h1>
        <p class="text-base sm:text-lg mt-2">Nəşr tarixi: {{ article.articleDate }}</p>
        <p class="text-base sm:text-lg mt-2">Müəllif: {{ article.articleAuthor }}</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

// Statik məlumatlar (hazırda istifadə olunur)
const tableArticles = [
    {id: 1, articleHeader: 'Hamiləliyin ilk üçaylığında ultrasəs müayinəsi', articleDate: '30-12-2020', articleAuthor: 'Yaqut Hüseyn'},
    {id: 2, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Samirə Nəsibova'},
    {id: 3, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Lalə Həsənova'},
    {id: 4, articleHeader: 'Miqren xəstəliyi', articleDate: '30-01-2020', articleAuthor: 'Xanoğlan Qəmbərov'},
    {id: 5, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-10-2020', articleAuthor: 'Leyla Ələkbərova'},
    {id: 6, articleHeader: 'Vertigo şikayəti olan xəstələrə otonevrolojı yanaşma', articleDate: '28-11-2020', articleAuthor: 'Nigar Muradova'},
    {id: 7, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Nübar İsmayılova'},
    {id: 8, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '20-12-2020', articleAuthor: 'Mədinə Dilbazi'},
    {id: 9, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '15-12-2020', articleAuthor: 'Leyla Süleymanova'},
    {id: 10, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Almaz Nəbiyeva'},
];

// Statik məlumatlardan məqaləni tapırıq
const article = computed(() => {
    return tableArticles.find(article => article.id === parseInt(route.params.id));
});

// API inteqrasiyası - aktivləşdirmək üçün şərhləri silin
/*
// Məqalə, yükləmə və xəta üçün ref-lər
const articleData = ref(null);
const loading = ref(false);
const error = ref(null);

// API-dən məqalə məlumatlarını yükləmək üçün funksiya
const fetchArticle = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // route.params.id ilə API-yə sorğu göndəririk
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/article-list/${route.params.id}/`);
    console.log('API-dən gələn məqalə dataları:', response.data);
    
    // API response-dan məlumatları əldə edirik
    articleData.value = {
      id: response.data.id,
      articleHeader: response.data.title, // API-nin field adı title ola bilər
      articleDate: response.data.publish_date, // API-nin field adı publish_date ola bilər
      articleAuthor: response.data.author, // API-nin field adı author ola bilər
      articleContent: response.data.content, // API-nin field adı content ola bilər
      // Əlavə field-lər əlavə edilə bilər
    };
    
  } catch (err) {
    console.error('API çağırışında xəta:', err);
    error.value = 'Məqalə yüklənərkən xəta baş verdi. Daha sonra yenidən cəhd edin.';
    
    // Statik məlumatlardan fallback istifadə edirik
    const fallbackArticle = tableArticles.find(article => article.id === parseInt(route.params.id));
    if (fallbackArticle) {
      articleData.value = fallbackArticle;
      error.value = null; // Statik məlumatlar tapıldığı üçün xətanı silirik
    }
  } finally {
    loading.value = false;
  }
};

// Component mount olduqda API-ni çağır
onMounted(() => {
  fetchArticle();
});

// API məlumatları və ya statik məlumatlar üçün computed
const article = computed(() => {
  // API-dən məlumatlar varsa onları göstər, yoxsa statik məlumatlardan istifadə et
  if (articleData.value) {
    return articleData.value;
  }
  
  // Statik məlumatlardan məqaləni tapırıq
  return tableArticles.find(article => article.id === parseInt(route.params.id)) || {};
});
*/
</script>

<style scoped>
.article-content {
  line-height: 1.6;
}
.article-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.article-content p {
  margin-bottom: 1rem;
}
.article-content img {
  max-width: 100%;
  margin: 1rem 0;
  border-radius: 0.25rem;
}
</style>