<template>
  <div class="container mt-16 text-main-text">
    <!-- Yüklənmə göstəricisi -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <p class="ml-4 text-lg">Vakansiya məlumatları yüklənir...</p>
    </div>

    <!-- Xəta göstəricisi -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
      <div class="flex items-center">
        <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- Vakansiya məlumatları -->
    <div v-else-if="vacancy" class="flex flex-col md:flex-row items-start justify-between">
      <div class="w-full md:w-3/4" data-aos="zoom-out-right">
        <!-- Geriyə qayıtma düyməsi -->
        <div class="mb-6">
          <button @click="goBack" class="flex items-center text-primary hover:text-primary-dark transition-colors">
            <i class="fas fa-arrow-left mr-2"></i> Vakansiyalar siyahısına qayıt
          </button>
        </div>
        
        <!-- Vakansiya şəkli -->
        <img 
          :src="vacancy.image || 'https://leylamc.com/images/vacancy-default.jpg'" 
          :alt="vacancy.title" 
          class="w-full h-auto rounded-lg shadow-md max-h-[400px] object-cover mb-6"
          @error="handleImageError"
          loading="lazy"
        >
        
        <!-- Vakansiya başlığı və məlumatları -->
        <div class="vacancy-info">
          <h1 class="text-2xl md:text-3xl font-semibold mb-4">{{ vacancy.title }}</h1>
          
          <!-- Status göstəricisi -->
          <div v-if="vacancy.valid_until" class="mb-4">
            <span 
              class="inline-block px-3 py-1 rounded-full text-sm" 
              :class="isExpired(vacancy.valid_until) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
            >
              <i class="fas" :class="isExpired(vacancy.valid_until) ? 'fa-clock mr-1' : 'fa-check-circle mr-1'"></i>
              {{ isExpired(vacancy.valid_until) ? 'Vaxtı bitib' : 'Aktiv vakansiya' }}
            </span>
          </div>
          
          <h3 class="text-lg mb-6">Leyla Medical Center aşağıda qeyd edilən ixtisaslar üzrə vakant yerlər elan edir:</h3>
          
          <!-- Vakansiya detalları -->
          <div class="vacancy-details mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <h2 class="text-lg font-semibold mb-2 text-primary">Vəzifə</h2>
              <p>{{ vacancy.job_position }}</p>
            </div>
            
            <div>
              <h2 class="text-lg font-semibold mb-2 text-primary">Əmək haqqı</h2>
              <p>{{ vacancy.job_salary }} AZN</p>
            </div>
            
            <!-- Tarixi məlumatlar -->
            <div>
              <h2 class="text-lg font-semibold mb-2 text-primary">Vakansiya tarixləri</h2>
              <p v-if="vacancy.created_at" class="mb-1">
                <span class="text-gray-600">Dərc edilmə tarixi:</span> {{ formatDate(vacancy.created_at) }}
              </p>
              <p v-if="vacancy.valid_until" class="mb-1" :class="{'text-red-600 font-medium': isExpired(vacancy.valid_until)}">
                <span class="text-gray-600">Son müraciət tarixi:</span> {{ formatDate(vacancy.valid_until) }}
                <span v-if="isExpired(vacancy.valid_until)" class="ml-2 text-red-600">(Vaxtı bitib)</span>
              </p>
            </div>
            
            <!-- Əlaqə məlumatları (əgər API-dən gəlirsə) -->
            <div v-if="vacancy.contact_info">
              <h2 class="text-lg font-semibold mb-2 text-primary">Əlaqə</h2>
              <p>{{ vacancy.contact_info }}</p>
            </div>
          </div>
          
          <!-- Tələb olunan bacarıqlar -->
          <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4 text-primary border-b pb-2">Tələb olunan bacarıqlar</h2>
            <div class="vacancy-content prose max-w-none" v-html="formatText(vacancy.skills_demand)"></div>
          </div>
          
          <!-- Əlavə məlumatlar (əgər varsa) -->
          <div v-if="vacancy.additional_info" class="mt-8">
            <h2 class="text-xl font-semibold mb-4 text-primary border-b pb-2">Əlavə məlumatlar</h2>
            <div class="vacancy-content prose max-w-none" v-html="formatText(vacancy.additional_info)"></div>
          </div>
          
          <!-- Müraciət et düyməsi -->
          <div class="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:info@leylamc.com" 
              class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors w-full sm:w-auto text-center"
            >
              <i class="fas fa-envelope mr-2"></i> Vakansiyaya müraciət et
            </a>
            
            <button
              @click="goBack"
              class="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
            >
              <i class="fas fa-list mr-2"></i> Digər vakansiyalara bax
            </button>
          </div>
          
          <!-- Paylaşma imkanları -->
          <!-- <div class="mt-8 border-t pt-4">
            <h3 class="text-lg mb-3">Bu vakansiyanı paylaş:</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-blue-600 hover:text-blue-800">
                <i class="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" class="text-blue-400 hover:text-blue-600">
                <i class="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" class="text-green-600 hover:text-green-800">
                <i class="fab fa-whatsapp text-xl"></i>
              </a>
              <a href="#" class="text-blue-500 hover:text-blue-700">
                <i class="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" class="text-blue-700 hover:text-blue-900">
                <i class="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div> -->
        </div>
      </div>
      
      <!-- Yan panel -->
      <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
        <SideBanners class="mb-4" /> 
        <SideBanners2 class="mb-4" /> 
      </div>
    </div>
    
    <!-- Şəkil yoxdursa göstəriləcək -->
    <div v-else class="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
      <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
      <p class="text-xl text-gray-600">Vakansiya tapılmadı.</p>
      <button 
        @click="goBack" 
        class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        Vakansiyalar siyahısına qayıt
      </button>
    </div>
    
    <!-- Xəritə komponenti -->
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
  const vacancy = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchVacancyDetail = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/vacancy-list/${route.params.slug}/`);
    vacancy.value = response.data;
    
    // Məlumatlar uğurla yükləndikdən sonra SEO meta taglarını əlavə edirik
    updateSEO();
  } catch (err) {
    error.value = "Vakansiya məlumatlarını yükləmək mümkün olmadı.";
    console.error("API xətası:", err);
  } finally {
    loading.value = false;
  }
};


// Formdatted tarix funksiyası - Azərbaycan dilində ayları düzgün göstərmək üçün yenilənib
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Tarixi valid olub-olmadığını yoxlayırıq
    if (isNaN(date.getTime())) {
      return 'Qeyri-müəyyən tarix';
    }
    
    // Azərbaycan dilində ayların adları
    const azMonths = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 
      'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ];
    
    const day = date.getDate();
    const month = azMonths[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
    
    // Alternativ rəqəmli format
    // return `${day.toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${year}`;
  } catch (error) {
    console.error('Tarix formatlaşdırma xətası:', error);
    return 'Qeyri-müəyyən tarix';
  }
};


// Vaxtın keçib-keçmədiyini yoxlayır
const isExpired = (dateString) => {
  if (!dateString) return false;
  
  const expiryDate = new Date(dateString);
  const today = new Date();
  return expiryDate < today;
};

// Şəkil yükləmə xətasını tutmaq üçün funksiya
const handleImageError = (e) => {
  e.target.src = 'https://leylamc.com/images/vacancy-default.jpg';
};

// Meta və SEO məlumatlarını əlavə etmək üçün funksiya
const updateSEO = () => {
  if (!vacancy.value) return;
  
  // Vakansiya tələblərinin mətnə çevrilmiş versiyası (HTML olmadan)
  const plainSkills = vacancy.value.skills_demand ? 
    vacancy.value.skills_demand.replace(/<[^>]*>/g, ' ').substring(0, 160) : '';
  
  // Meta description üçün mətn
  const metaDescription = `${vacancy.value.job_position} vakansiyası: ${vacancy.value.job_salary} AZN maaş. ${plainSkills}`;
  
  useHead({
    // Title düzəlişi: vacancy.value -> vacancy.value.title
    title: `Leyla Medical Center Vakansiyaları | ${vacancy.value.title}`,
    meta: [
      { 
        name: 'description', 
        content: metaDescription
      },
      { 
        name: 'keywords', 
        content: `${vacancy.value.title}, vakansiya, iş, ${vacancy.value.job_position}, tibb sahəsi, Leyla Medical Center, karyera` 
      },
      // Open Graph meta tagları - URL yolunu yeniləyirik
      { property: 'og:title', content: `${vacancy.value.title} | Leyla Medical Center` },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      // Yeni URL strukturu
      { property: 'og:url', content: `https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya/${route.params.slug}` },
      { property: 'og:image', content: vacancy.value.image || 'https://leylamc.com/images/vacancy-default.jpg' },
      { property: 'og:locale', content: 'az_AZ' },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${vacancy.value.title} | Leyla Medical Center` },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: vacancy.value.image || 'https://leylamc.com/images/vacancy-default.jpg' },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": vacancy.value.title,
          "description": vacancy.value.skills_demand || "",
          "datePosted": vacancy.value.created_at || new Date().toISOString(),
          "validThrough": vacancy.value.valid_until || null,
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Leyla Medical Center",
            "sameAs": "https://leylamc.com",
            "logo": "https://leylamc.com/images/logo.png"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bakı",
              "addressRegion": "Bakı",
              "addressCountry": "Azərbaycan"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "AZN",
            "value": {
              "@type": "QuantitativeValue",
              "value": vacancy.value.job_salary,
              "unitText": "MONTH"
            }
          },
          "skills": plainSkills,
          // URL-i yeniləyirik
          "url": `https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya/${route.params.slug}`
        })
      }
    ],
    link: [
      // Canonical linki yeniləyirik
      { rel: 'canonical', href: `https://leylamc.com/az/haqqımızda/mediada-biz/vakansiya/${route.params.slug}` }
    ]
  });
};
  
  onMounted(() => {
    fetchVacancyDetail();
  });
  
  const goBack = () => {
  // name ilə yönləndirmə əvəzinə yeni URL strukturu ilə yönləndirək
  router.push('/az/haqqımızda/mediada-biz/vakansiya');
  
  // Alternative: route name ilə
  // router.push({ name: 'vacancies' });
  };
  
  const formatText = (text) => {
    if (!text) return '';
    return text.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
  };
  </script>
  
  <style scoped>
  .vacancy-content :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  .vacancy-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
  
  .vacancy-content :deep(li) {
    margin-bottom: 0.5rem;
  }
  </style>