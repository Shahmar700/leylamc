<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
      <div v-if="loading" class="py-10 flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else class="flex flex-col lg:flex-row lg:items-start gap-6">
        
        <!-- Əsas məzmun -->
        <div class="w-full lg:w-3/4" data-aos="zoom-out-right">
        <!-- Geri butonu - CheckUpInnerView səhifəsindəki kimi -->
        <button @click="goBack" class="flex items-center text-gray-600 mb-6 hover:text-green-600 transition-colors">
          <i class="fa-solid fa-arrow-left mr-2"></i> Geriyə
        </button>
          <h1 class="text-2xl md:text-3xl font-semibold mb-6">{{ offer.title }}</h1>
          
          <!-- Aksiya şəkili -->
          <div class="mb-6 aspect-video relative">
            <img 
              :src="offer.photo" 
              :alt="offer.title" 
              class="w-full h-auto rounded-md object-cover max-h-[600px]"
              :class="{ 'filter grayscale opacity-90': isExpired(offer.finish_date) }"
            >
            <div v-if="isExpired(offer.finish_date)" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
              <span class="-rotate-[30deg] tracking-widest">VAXTI BİTİB</span>
            </div>
          </div>
          
          <!-- Aksiya məlumatları -->
          <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <div class="bg-gray-100 px-3 py-2 rounded-full">
              <span class="font-medium">Başlama:</span> {{ formatDate(offer.start_date) }}
            </div>
            <div class="bg-gray-100 px-3 py-2 rounded-full">
              <span class="font-medium">Bitmə:</span> {{ formatDate(offer.finish_date) }}
            </div>
          </div>
          
          <!-- Mətn məzmunu -->
          <div class="prose prose-lg max-w-none" v-if="offer.text && offer.text.trim()">
            <div v-html="formatText(offer.text)"></div>
          </div>
          <div class="prose prose-lg max-w-none" v-else-if="offer.text_az && offer.text_az.trim()">
            <div v-html="formatText(offer.text_az)"></div>
          </div>
          <div v-else class="text-gray-600 italic">
            Bu aksiya haqqında ətraflı məlumat tezliklə əlavə olunacaq.
          </div>
          
        </div>
        
        <!-- Yan panel -->
        <div class="w-full lg:w-1/4 mt-8 lg:mt-0" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useHead } from '@vueuse/head';
  import SideBanners from "@/components/SideBanners.vue";
  import SideBanners2 from "@/components/SideBanners2.vue";
  import Maps from "@/components/Maps.vue";
  
  const route = useRoute();
  const router = useRouter();
  const offer = ref({});
  const loading = ref(true);
  const error = ref(null);
  
  const today = new Date().toISOString().split('T')[0]; // Bugünkü tarixi əldə edirik
  // Tarixi yoxlama funksiyası
  const isExpired = (finish_date) => {
    return finish_date < today;
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
  
  // Mətn formatlaması
  const formatText = (text) => {
    if (!text) return '';
    // Şəbəkə tərəfindən qaytarılan xam HTML-i təmizləmək və formatlamaq üçün
    // Burada sadə formatlamadan istifadə edirik, daha təhlükəsiz həll üçün
    // DOMPurify kimi kitabxanalardan istifadə etmək olar
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };
  
  const updateSEO = () => {
    let title = offer.value.title || 'Aksiya detalları';
    let description = offer.value.text?.substring(0, 160) || 'Leyla Medical Center-dən xüsusi aksiya təklifi';
  
    useHead({
      title: `Leyla Medical Center | ${title}`,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          property: 'og:title',
          content: `Leyla Medical Center | ${title}`
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:image',
          content: offer.value.photo || ''
        },
        {
          name: 'keywords',
          content: 'tibbi aksiyalar, endirimlər, sağlamlıq təklifləri, tibbi xidmətlərdə endirim, Leyla Medical Center aksiyaları'
        }
      ]
    });
  };
  
  // API-dən məlumatları çəkmək funksiyası
  const fetchOfferData = async () => {
    try {
      loading.value = true;
      const slug = route.params.slug;
      const response = await axios.get(`https://bytexerp.online/api/leyla/v1/offer-list/${slug}/`);
      offer.value = response.data;
      
      // Məlumatlar yükləndikdən sonra SEO məlumatlarını yeniləyirik
      updateSEO();
      
    } catch (err) {
      error.value = "Aksiya məlumatlarını yükləmək mümkün olmadı.";
      console.error("API xətası:", err);
    } finally {
      loading.value = false;
    }
  };
  
  // Geri düyməsi funksionallığı
  const goBack = () => {
  // Əvvəlki səhifəyə qayıt
  router.go(-1);
  
  // Əgər spesifik olaraq "offers" səhifəsinə qayıtmaq istəyirsinizsə, bu kodu istifadə edə bilərsiniz:
  // router.push({ name: 'offers' });
  };
  
  // Komponent yükləndikdə API çağırışı
  onMounted(() => {
    fetchOfferData();
  });
  </script>
  
  <style scoped>
  .prose {
    @apply text-main-text;
  }
  
  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    @apply text-primary font-semibold;
  }
  
  .prose a {
    @apply text-primary hover:underline;
  }
  
  .prose ul {
    @apply list-disc pl-6;
  }
  
  .prose ol {
    @apply list-decimal pl-6;
  }
  </style>