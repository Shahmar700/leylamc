<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col items-center lg:flex-row md:items-start sm:justify-between">
            <div class="w-full lg:w-3/4" data-aos="flip-down">
                <!-- Yüklənmə göstəricisi -->
                <!-- <div v-if="isLoading" class="py-8 text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    <p class="mt-2">Məqalələr yüklənir...</p>
                </div>

                <div v-else-if="error" class="p-4 bg-red-50 text-red-600 rounded-md">
                    {{ error }}
                </div> -->

                <!-- Məqalə yoxdursa -->
                <!-- <div v-else-if="!articles.length" class="p-4 text-center">
                    <p>Məqalə tapılmadı.</p>
                </div> -->

                <!-- Məqalələr tapıldıqda -->
                <div>
                    <!-- Articles Filters  -->
                    <form @submit.prevent="filterArticles" class="flex flex-col md:flex-row gap-4 mt-5 items-center text-base lg:text-lg">
                        <div class="flex flex-col w-full">
                            <label for="author" class="mb-1 !text-main-text text-sm md:text-base ">Müəllif Adı</label>
                            <input type="text" id="author" v-model="authorFilter" class=" text-sm md:text-base border border-gray-300 p-2 rounded-md !h-[47px]" placeholder="Müəllif Adı">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="itemsPerPage" class="mb-1 !text-main-text text-sm md:text-base ">Göstəriləcək Məqalə Sayı</label>
                            <select id="itemsPerPage" v-model="itemsPerPage" class=" text-sm md:text-base border border-gray-300 p-2 rounded-md !h-[47px]">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="all">Hamısı</option>
                            </select>
                        </div>
                    </form>
                    
                    <div class="overflow-x-auto mt-4">
                        <table class="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr class="bg-gray-200 text-left">
                                    <th class="px-6 py-3 border-b border-gray-200">Başlıq</th>
                                    <th class="px-6 py-3 border-b border-gray-200">Nəşr tarixi</th>
                                    <th class="px-6 py-3 border-b border-gray-200">Müəllif</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(article, index) in paginatedArticles" :key="article.id" class="hover:bg-green-50 cursor-pointer" :class="{'bg-gray-50': index % 2 === 0, 'bg-white': index % 2 !== 0}">
                                    <td class="px-6 py-4 border-b border-gray-200" @click="goToArticle(article)">
                                        <span class="text-primary hover:underline cursor-pointer">{{ article.title_az || article.title }}</span>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200">{{ formatDate(article.created_at) }}</td>
                                    <td class="px-6 py-4 border-b border-gray-200">{{ getAuthorFullName(article) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
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
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4 mt-16 lg:mt-0" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useHead } from '@vueuse/head';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

// State
const articles = ref([]);
const isLoading = ref(true);
const error = ref(null);
const authorFilter = ref('');
const itemsPerPage = ref('5');
const currentPage = ref(1);

// API'dən məqalələri gətirmək
const fetchArticles = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        
        const response = await axios.get('https://bytexerp.online/api/leyla/v1/article-list/');
        articles.value = response.data.results || [];
        console.log('Yüklənən məqalələr:', articles.value);
    } catch (err) {
        console.error('Məqalə yükləmə xətası:', err);
        error.value = 'Məqalələri yükləmək mümkün olmadı. Zəhmət olmasa daha sonra yenidən cəhd edin.';
    } finally {
        isLoading.value = false;
    }
};

// Səhifə yükləndikdə məqalələri gətir
onMounted(() => {
    fetchArticles();
});

// Tarix formatlaması (YYYY-MM-DD formatından DD.MM.YYYY formatına çevirmək)
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
    if (!article.doctor) return 'Bilinməyən müəllif';
    
    const doctorFirstName = article.doctor.first_name_az || article.doctor.first_name || '';
    const doctorLastName = article.doctor.last_name_az || article.doctor.last_name || '';
    
    return `${doctorFirstName} ${doctorLastName}`.trim();
};

// Müəllif adına görə filtrələnmiş məqalələr
const filteredArticles = computed(() => {
    let filtered = articles.value;
    
    if (authorFilter.value) {
        filtered = filtered.filter(article => {
            const authorFullName = getAuthorFullName(article).toLowerCase();
            return authorFullName.includes(authorFilter.value.toLowerCase());
        });
    }
    
    return filtered;
});

// Səhifələrin ümumi sayı
const totalPages = computed(() => {
    if (itemsPerPage.value === 'all') {
        return 1;
    }
    return Math.ceil(filteredArticles.value.length / parseInt(itemsPerPage.value));
});

// Cari səhifədəki məqalələr
const paginatedArticles = computed(() => {
    if (itemsPerPage.value === 'all') {
        return filteredArticles.value;
    }
    const start = (currentPage.value - 1) * parseInt(itemsPerPage.value);
    const end = start + parseInt(itemsPerPage.value);
    return filteredArticles.value.slice(start, end);
});

// Səhifə nömrələri göstəricisi
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

// Səhifələnmə funksiyaları
const goToPage = (page) => {
    if (page === '...') return;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToFirstPage = () => {
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToPreviousPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToNextPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToLastPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    currentPage.value = totalPages.value;
};

const filterArticles = () => {
    currentPage.value = 1; // Filtrləmə zamanı ilk səhifəyə qayıt
};

const router = useRouter();

const goToArticle = (article) => {
    router.push({ name: 'article-detail', params: { slug: article.slug } });
};

// SEO meta məlumatları
const pageTitle = computed(() => {
  if (authorFilter.value) {
    return `${authorFilter.value} Məqalələri | Həkim Yazıları | Leyla Medical Center`;
  }
  return 'Həkim Məqalələri və Tibb Yazıları | Leyla Medical Center';
});

const pageDescription = computed(() => {
  if (authorFilter.value) {
    return `${authorFilter.value} tərəfindən yazılmış tibbi məqalələr və sağlamlıq haqqında yazılar. Leyla Medical Center həkimlərindən peşəkar məsləhət və məlumatlar.`;
  }
  return 'Leyla Medical Center həkimləri tərəfindən yazılmış tibbi məqalələr və sağlamlıq haqqında yazılar. Xəstəliklər, diaqnostika və müalicə üsulları haqqında peşəkar məsləhətlər.';
});

const pageKeywords = computed(() => {
  let baseKeywords = 'tibbi məqalələr, həkim yazıları, sağlamlıq məsləhətləri, tibbi bloq, xəstəliklər haqqında məqalələr';
  
  if (authorFilter.value) {
    return `${baseKeywords}, ${authorFilter.value} məqalələri, ${authorFilter.value} yazıları`;
  }
  
  // Bütün müəlliflərə görə açar sözlər əlavə et
  const authorNames = articles.value
    .map(article => getAuthorFullName(article))
    .filter(name => name !== 'Bilinməyən müəllif');
  
  if (authorNames.length > 0) {
    return `${baseKeywords}, ${[...new Set(authorNames)].join(', ')}`;
  }
  
  return baseKeywords;
});

// SEO meta məlumatları - təkmilləşdirilmiş versiya
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'keywords', content: pageKeywords },
    { name: 'author', content: authorFilter.value || 'Leyla Medical Center Həkimləri' },
    
    // Open Graph meta tagları - yeni URL strukturu
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/həkimlər/həkim-məqalələri' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-articles.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    // Twitter meta tagları
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-articles.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle.value,
        "description": pageDescription.value,
        "url": "https://leylamc.com/az/həkimlər/həkim-məqalələri",
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
          "itemListElement": paginatedArticles.value.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "MedicalWebPage",
              "name": article.title_az || article.title,
              "datePublished": article.created_at,
              "author": {
                "@type": "Person",
                "name": getAuthorFullName(article)
              },
              "url": `https://leylamc.com/az/həkimlər/həkim-məqalələri/${article.slug}`
            }
          }))
        }
      })
    }
  ],
  // Canonical link əlavə edirik
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/həkimlər/həkim-məqalələri' }
  ]
});
</script>

<style scoped>
ul {
  list-style: disc;
}

table tr{
    font-size: 13px;
}
@media screen and (min-width: 600px){
    table tr{
    font-size: 15px;
}
}

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