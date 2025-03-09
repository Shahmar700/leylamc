<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col items-center md:flex-row md:items-start sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="flip-down">
                <!-- Articles Filters  -->
                <form @submit.prevent="filterArticles" class="flex gap-4 mt-5 items-center text-base lg:text-lg">
                    <div class="flex flex-col w-full">
                        <label for="author" class="mb-1 !text-main-text">Müəllif Adı</label>
                        <input type="text" id="author" v-model="author" class="border border-gray-300 p-2 rounded-md !h-[47px]" placeholder="Müəllif Adı">
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="itemsPerPage" class="mb-1 !text-main-text">Göstəriləcək Məqalə Sayı</label>
                        <select id="itemsPerPage" v-model="itemsPerPage" class="border border-gray-300 p-2 rounded-md !h-[47px]">
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
                            <tr v-for="(article, index) in paginatedArticles" :key="article.id" class="hover:bg-green-50" :class="{'bg-gray-50': index % 2 === 0, 'bg-white': index % 2 !== 0}">
                                <td class="px-6 py-4 border-b border-gray-200" @click="goToArticle(article)">
                                    <span class="text-primary hover:underline cursor-pointer">{{ article.articleHeader }}</span>
                                </td>
                                <td class="px-6 py-4 border-b border-gray-200">{{ article.articleDate }}</td>
                                <td class="px-6 py-4 border-b border-gray-200">{{ article.articleAuthor }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="totalPages > 1" class="pagination mt-4 flex justify-start">
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
import { ref, computed, onMounted  } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useHead } from '@vueuse/head'; // Əlavə et

const tableArticles = ref([
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
]);

// API inteqrasiyası - aktivləşdirmək üçün şərhləri silin
// API-dən məqalələri yükləmək üçün funksiya
/*
const fetchArticles = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/article-list/');
    console.log('API-dən gələn məqalə dataları:', response.data);
    
    // API response formatını yoxlayın və uyğunlaşdırın
    // Məsələn, API-nin data strukturu aşağıdakı kimi ola bilər:
    // { results: [ { id, title, publish_date, author, ... } ] }
    
    // tableArticles-i API-dən gələn datalarla əvəz edin
    // Burada API-nin data strukturuna uyğun olaraq məlumatı map etmək olar
    tableArticles.value = response.data.results.map(item => ({
      id: item.id,
      articleHeader: item.title, // API-nin field adı title ola bilər
      articleDate: item.publish_date, // API-nin field adı publish_date ola bilər
      articleAuthor: item.author, // API-nin field adı author ola bilər
      // Əlavə field-lər əlavə edilə bilər
    }));
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    // Xəta halında istifadəçiyə mesaj göstərmək olar
    // Bu halda statik data istifadə etməyə davam edə bilərsiniz
  }
};

// Component mount olduqda API-ni çağır
onMounted(() => {
  fetchArticles();
});
*/

const author = ref('');
const itemsPerPage = ref('5');
const currentPage = ref(1);

const filteredArticles = computed(() => {
    let filtered = tableArticles.value;

    if (author.value) {
        filtered = filtered.filter(article => article.articleAuthor.toLowerCase().includes(author.value.toLowerCase()));
    }

    return filtered;
});

const totalPages = computed(() => {
    if (itemsPerPage.value === 'all') {
        return 1;
    }
    return Math.ceil(filteredArticles.value.length / parseInt(itemsPerPage.value));
});

const paginatedArticles = computed(() => {
    if (itemsPerPage.value === 'all') {
        return filteredArticles.value;
    }
    const start = (currentPage.value - 1) * parseInt(itemsPerPage.value);
    const end = start + parseInt(itemsPerPage.value);
    return filteredArticles.value.slice(start, end);
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

const filterArticles = () => {
    currentPage.value = 1; // Filtrləmə zamanı ilk səhifəyə qayıt
};

const router = useRouter();

const goToArticle = (article) => {
    router.push({ name: 'article-detail', params: { id: article.id } });
};

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";


// SEO meta məlumatları
const pageTitle = computed(() => {
  if (author.value) {
    return `${author.value} Məqalələri | Həkim Yazıları | Leyla Medical Center`;
  }
  return 'Həkim Məqalələri və Tibb Yazıları | Leyla Medical Center';
});

const pageDescription = computed(() => {
  if (author.value) {
    return `${author.value} tərəfindən yazılmış tibbi məqalələr və sağlamlıq haqqında yazılar. Leyla Medical Center həkimlərindən peşəkar məsləhət və məlumatlar.`;
  }
  return 'Leyla Medical Center həkimləri tərəfindən yazılmış tibbi məqalələr və sağlamlıq haqqında yazılar. Xəstəliklər, diaqnostika və müalicə üsulları haqqında peşəkar məsləhətlər.';
});

const pageKeywords = computed(() => {
  let baseKeywords = 'tibbi məqalələr, həkim yazıları, sağlamlıq məsləhətləri, tibbi bloq, xəstəliklər haqqında məqalələr';
  
  if (author.value) {
    return `${baseKeywords}, ${author.value} məqalələri, ${author.value} yazıları`;
  }
  
  // Bütün müəlliflərə görə açar sözlər əlavə et
  const authorNames = [...new Set(tableArticles.value.map(article => article.articleAuthor))];
  if (authorNames.length > 0) {
    return `${baseKeywords}, ${authorNames.join(', ')}`;
  }
  
  return baseKeywords;
});

// useHead hooku ilə meta etiketlərini əlavə et
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/doctor-articles' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-articles.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'keywords', content: pageKeywords },
    { name: 'author', content: author.value || 'Leyla Medical Center Həkimləri' },
  ],
});
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>