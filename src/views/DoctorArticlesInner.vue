<template>
  <div class="container mt-16 text-main-text">
      <!-- Yüklənmə göstəricisi -->
      <div v-if="loading" class="py-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p class="mt-2">Məqalə yüklənir...</p>
      </div>
      
      <!-- Xəta mesajı -->
      <div v-else-if="error" class="p-4 bg-red-50 text-red-600 rounded-md">
          {{ error }}
      </div>
      
      <!-- Məqalə məzmunu -->
      <div v-else-if="article" class="flex flex-col md:flex-row md:gap-10">
          <div class="w-full md:w-3/4">
              <!-- Geriyə qayıt butonu -->
              <button @click="goBack" class="flex items-center text-gray-600 mb-6 hover:text-green-600 transition-colors">
                  <i class="fa-solid fa-arrow-left mr-2"></i> Məqalələrə qayıt
              </button>
              
              <!-- Məqalə başlığı -->
              <h1 class="text-2xl md:text-3xl font-semibold mb-6">{{ article.title_az || article.title }}</h1>
              
              <!-- Həkim və məqalə məlumatları -->
              <div class="flex flex-col sm:flex-row sm:items-center mb-8">
                  <!-- Həkim şəkli və məlumatı -->
                  <div v-if="article.doctor" class="flex items-center">
                      <img 
                          :src="article.doctor.photo" 
                          :alt="getAuthorFullName(article)" 
                          class="w-12 h-12 rounded-full object-cover mr-3"
                          @error="handleImageError"
                      >
                      <div>
                          <p class="font-semibold">{{ getAuthorFullName(article) }}</p>
                          <p class="text-sm text-gray-600">{{ article.doctor.position_az || article.doctor.position }}</p>
                      </div>
                  </div>
                  
                  <!-- Nəşr tarixi -->
                  <div class="mt-3 sm:mt-0 sm:ml-auto flex items-center text-gray-600">
                      <i class="fa-regular fa-calendar-days mr-2"></i>
                      <span>{{ formatDate(article.created_at) }}</span>
                  </div>
              </div>
              
              <!-- Məqalə məzmunu -->
              <div class="prose prose-lg max-w-none">
                  <div v-if="article.text_az || article.text" v-html="formatArticleContent(article.text_az || article.text)"></div>
                  <div v-else class="text-gray-500 italic">Bu məqalədə mətn məzmunu yoxdur.</div>
              </div>
              
              <!-- Həkim haqqında ətraflı -->
              <div v-if="article.doctor" class="mt-10 pt-8 border-t border-gray-200">
                  <h2 class="text-xl font-semibold mb-4">Müəllif haqqında</h2>
                  <div class="flex flex-col sm:flex-row sm:items-center">
                      <img 
                          :src="article.doctor.photo" 
                          :alt="getAuthorFullName(article)" 
                          class="w-20 h-20 rounded-full object-cover mr-5 mb-4 sm:mb-0"
                          @error="handleImageError"
                      >
                      <div>
                          <h3 class="font-semibold text-lg">{{ getAuthorFullName(article) }}</h3>
                          <p class="text-gray-700">{{ article.doctor.position_az || article.doctor.position }}</p>
                          <p v-if="article.doctor.experience_text_az || article.doctor.experience_text" class="mt-2 text-gray-600">
                              {{ article.doctor.experience_text_az || article.doctor.experience_text }}
                          </p>
                          <button 
                              @click="goToDoctor(article.doctor)"
                              class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
                          >
                              Həkim profilinə baxın
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Sağ kənar panel -->
          <div class="w-full md:w-1/4 mt-8 md:mt-0">
              <div class="max-h-[700px] overflow-y-scroll">
                  <h3 class="font-semibold text-lg mb-4">Digər məqalələr</h3>
                  <div v-if="relatedArticles.length" class="space-y-4">
                      <div 
                          v-for="relatedArticle in relatedArticles" 
                          :key="relatedArticle.id"
                          class="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                          <a 
                              @click.prevent="goToArticle(relatedArticle)"
                              class="text-primary hover:underline cursor-pointer font-medium"
                          >
                              {{ relatedArticle.title_az || relatedArticle.title }}
                          </a>
                          <p class="text-sm text-gray-600 mt-1">
                              {{ formatDate(relatedArticle.created_at) }}
                          </p>
                      </div>
                  </div>
                  <div v-else class="text-gray-500 italic">
                      Əlaqəli məqalə tapılmadı
                  </div>
              </div>
          </div>
      </div>
      
      <!-- Məqalə tapılmadı -->
      <div v-else class="text-center py-10">
          <p>Məqalə tapılmadı.</p>
          <button @click="goBack" class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition">
              Məqalələrə qayıt
          </button>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';

const route = useRoute();
const router = useRouter();

// State
const article = ref(null);
const relatedArticles = ref([]);
const loading = ref(true);
const error = ref(null);
const defaultImage = ref('/images/default-doctor.jpg');

// Məqalə məlumatlarını API-dən alırıq
const fetchArticle = async (slug) => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await axios.get(`https://bytexerp.online/api/leyla/v1/article-list/${slug}/`);
    article.value = response.data;
    
    // Əlaqəli məqalələri yüklə
    await fetchRelatedArticles();
    
  } catch (err) {
    console.error('Məqalə yükləmə xətası:', err);
    error.value = 'Məqaləni yükləmək mümkün olmadı. Zəhmət olmasa daha sonra yenidən cəhd edin.';
  } finally {
    loading.value = false;
  }
};

// Route değişikliklerini izleyin
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      // Sayfa yeniden yüklenmeden yeni slug ile içeriği getir
      fetchArticle(newSlug);
      // Sayfayı en üste kaydır
      window.scrollTo(0, 0);
    }
  }
);

// Əlaqəli məqalələri gətir (eyni həkimin digər məqalələri və ya son məqalələr)
const fetchRelatedArticles = async () => {
  if (!article.value) return;
  
  try {
      const response = await axios.get('https://bytexerp.online/api/leyla/v1/article-list/');
      let allArticles = response.data.results || [];
      
      // Cari məqaləni siyahıdan çıxarırıq
      allArticles = allArticles.filter(a => a.id !== article.value.id);
      
      // Əgər eyni doktor tərəfindən məqalələr varsa, onları əlaqəli siyahısına əlavə et
      if (article.value.doctor) {
          const doctorArticles = allArticles.filter(a => 
              a.doctor && a.doctor.id === article.value.doctor.id
          );
          
          if (doctorArticles.length > 0) {
              relatedArticles.value = doctorArticles.slice(0, 5);
              return;
          }
      }
      
      // Əgər eyni doktorun məqalələri yoxdursa, son 5 məqaləni göstər
      relatedArticles.value = allArticles.slice(0, 5);
      
  } catch (err) {
      console.error('Əlaqəli məqalə yükləmə xətası:', err);
  }
};

// Tarix formatlaması (ISO formatından DD.MM.YYYY formatına çevirmək)
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
};

// Müəllifin tam adını almaq
const getAuthorFullName = (article) => {
  if (!article || !article.doctor) return 'Bilinməyən müəllif';
  
  const doctorTitle = article.doctor.degree_az || article.doctor.degree || '';
  const doctorFirstName = article.doctor.first_name_az || article.doctor.first_name || '';
  const doctorLastName = article.doctor.last_name_az || article.doctor.last_name || '';
  
  return `${doctorTitle} ${doctorFirstName} ${doctorLastName}`.trim();
};

// Məqalə mətnini formatlayırıq (linkləri aktivləşdirmək və s.)
const formatArticleContent = (content) => {
  if (!content) return '';
  
  // Boş məqalə məzmunu halında
  if (content.trim() === '') {
      return '<p class="text-gray-500 italic">Bu məqalədə mətn məzmunu yoxdur.</p>';
  }
  
  // Mətni HTML-ə çeviririk (artıq HTML formatında gəlirsə bu addım lazım olmaya bilər)
  return content;
};

// Şəkil yüklənmə xətası halında defolt şəkillə əvəzləyirik
const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};

// Məqalələr səhifəsinə qayıtmaq
const goBack = () => {
  router.push({ name: 'doctor-articles' });
};

// Digər məqaləyə keçid
const goToArticle = (article) => {
  router.push({ 
    name: 'article-detail', 
    params: { slug: article.slug }
  });
};

// Həkim səhifəsinə keçid
const goToDoctor = (doctor) => {
  router.push({ 
    name: 'doctor', 
    params: { id: doctor.slug }
  });
};

// Səhifə yükləndikdə məqaləni gətiririk
onMounted(() => {
  const { slug } = route.params;
  if (slug) {
    fetchArticle(slug);
  } else {
    error.value = 'Məqalə identifikatoru tapılmadı';
    loading.value = false;
  }
});

// SEO meta məlumatları
const pageTitle = computed(() => {
  if (article.value) {
      return `${article.value.title_az || article.value.title} | Leyla Medical Center`;
  }
  return 'Tibbi Məqalə | Leyla Medical Center';
});

const pageDescription = computed(() => {
  if (article.value) {
      if (article.value.text_az || article.value.text) {
          // Məqalə mətninə əsasən qısa təsvir yaradırıq
          const content = article.value.text_az || article.value.text;
          const textOnly = content.replace(/<[^>]*>?/gm, ''); // HTML etiketlərini silir
          return textOnly.substring(0, 160) + '...';
      }
      return `${article.value.title_az || article.value.title} - Leyla Medical Center həkimləri tərəfindən yazılmış tibbi məqalə.`;
  }
  return 'Leyla Medical Center həkimləri tərəfindən yazılmış tibbi məqalələr və sağlamlıq haqqında yazılar.';
});

// useHead hooku ilə meta etiketlərini əlavə et
useHead({
  title: pageTitle,
  meta: [
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
  ],
});
</script>

<style scoped>
.prose {
  max-width: 100%;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.prose ol {
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose a {
  color: #6bb52b;
  text-decoration: underline;
}

.prose a:hover {
  color: #508421;
}
</style>