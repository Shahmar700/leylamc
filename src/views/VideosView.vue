<template>
    <div class="container mt-16 text-main-text">
        <!-- Yüklənmə göstəricisi -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
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

        <div v-else class="flex flex-col md:flex-row items-start justify-between">
            <div class="w-full md:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-6">Video Qalereya</h1>
                
                <!-- Video yoxdursa -->
                <div v-if="videos.length === 0" class="text-center py-10 bg-gray-100 rounded-lg">
                    <p class="text-gray-600 text-xl">Video qalereya mövcud deyil</p>
                </div>
                
                <!-- Video qalereyası -->
                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div 
                            v-for="video in displayedVideos" 
                            :key="video.id" 
                            class="video-container overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div class="relative aspect-video w-full">
                                <iframe 
                                    :src="getEmbedUrl(video.link)"
                                    class="absolute top-0 left-0 w-full h-full"
                                    title="YouTube video"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div class="p-3 bg-white">
                                <p class="text-sm text-gray-500">{{ formatDate(video.created_at) }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="pagination mt-8 flex justify-center">
                        <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button">
                            <i class="fa-solid fa-angles-left"></i>
                        </button>
                        <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">
                            <i class="fa-solid fa-angle-left"></i>
                        </button>
                        <span 
                            v-for="page in pages" 
                            :key="page" 
                            @click="goToPage(page)" 
                            :class="{ 
                                'font-bold': currentPage === page, 
                                'active-page': currentPage === page, 
                                'inactive-page': currentPage !== page && page !== '...',
                                'pagination-dots': page === '...'
                            }"
                        >
                            {{ page }}
                        </span>
                        <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button">
                            <i class="fa-solid fa-angle-right"></i>
                        </button>
                        <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button">
                            <i class="fa-solid fa-angles-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import { useHead } from '@vueuse/head';

// Əsas dəyişənlər
const videos = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Pagination dəyişənləri
const currentPage = ref(1);
const videosPerPage = ref(4); // Hər səhifədə göstəriləcək video sayı
const totalItems = ref(0);

// Hesablanmış pagination dəyişənləri
const totalPages = computed(() => {
    return Math.ceil(totalItems.value / videosPerPage.value);
});

// Göstəriləcək səhifələrin siyahısı
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

// Cari səhifədə göstəriləcək videolar
const displayedVideos = computed(() => {
    const startIndex = (currentPage.value - 1) * videosPerPage.value;
    const endIndex = startIndex + videosPerPage.value;
    return videos.value.slice(startIndex, endIndex);
});

// YouTube linkindən embed URL yaratmaq üçün təkmilləşdirilmiş funksiya
const getEmbedUrl = (url) => {
    // Əgər URL dəyəri boşdursa
    if (!url) {
        console.warn('Video URL tapılmadı');
        return '';
    }
    
    // YouTube URL formatları üçün videoId çıxarma
    let videoId = '';
    
    try {
        if (url.includes('youtube.com/watch')) {
            // youtube.com/watch?v=VIDEO_ID formatı
            const urlParams = new URLSearchParams(url.split('?')[1]);
            videoId = urlParams.get('v');
        } else if (url.includes('youtu.be/')) {
            // youtu.be/VIDEO_ID formatı
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
            // Birbaşa video ID daxil edilibsə
            videoId = url;
        } else {
            console.warn('Tanınmayan YouTube URL formatı:', url);
            return '';
        }
        
        // Zaman parametrini (əgər varsa) əlavə etmək
        let timeParam = '';
        if (url.includes('t=')) {
            const timeMatch = url.match(/[&?]t=(\d+)/);
            if (timeMatch && timeMatch[1]) {
                timeParam = `?start=${timeMatch[1]}`;
            }
        }
        
        return videoId ? `https://www.youtube.com/embed/${videoId}${timeParam}` : '';
    } catch (error) {
        console.error('Video URL-i işlənərkən xəta baş verdi:', error, 'URL:', url);
        return '';
    }
};

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

// API-dən videoları almaq
const fetchVideos = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        
        const response = await axios.get('https://bytexerp.online/api/leyla/v1/video-gallery-list/');
        
        if (response.data && response.data.results) {
            // Sadəcə validli linkləri saxlayırıq
            videos.value = response.data.results.filter(video => {
                if (!video.link) {
                    console.warn(`ID: ${video.id} olan videoda link yoxdur`);
                    return false;
                }
                
                // YouTube linkini yoxlayırıq
                const embedUrl = getEmbedUrl(video.link);
                return embedUrl !== '';
            });
            
            totalItems.value = videos.value.length;
            console.log(`${videos.value.length} ədəd video yükləndi`);
        } else {
            console.log('Video qalereya üçün məlumat tapılmadı.');
            videos.value = [];
        }
    } catch (err) {
        console.error('Videoları yükləmə xətası:', err);
        error.value = 'Video qalereya məlumatlarını yükləmək mümkün olmadı';
    } finally {
        isLoading.value = false;
    }
};

// Pagination funksiyaları
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
    if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const goToLastPage = () => {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Səhifə dəyişdikdə yuxarı scroll etmək üçün watch
watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Səhifə yükləndikdə videoları çəkək
onMounted(() => {
    fetchVideos();
});

// SEO meta məlumatları
useHead({
    title: 'Video Qalereya - Leyla Medical Center',
    meta: [
        { name: 'description', content: 'Leyla Medical Center-in fəaliyyətindən video qalereya.' },
        { property: 'og:title', content: 'Video Qalereya - Leyla Medical Center' },
        { property: 'og:description', content: 'Leyla Medical Center-in fəaliyyətindən video qalereya.' },
        { property: 'og:type', content: 'website' },
    ],
});
</script>

<style scoped>
.grid {
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .grid {
        gap: 1rem;
    }
}

.video-container {
    transition: all 0.3s ease;
}

.video-container:hover {
    transform: translateY(-5px);
}

/* Aspect ratio qarışıqlığını həll edən CSS klas */
.aspect-video {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}

/* YouTube iframeləri üçün lazy loading göstəricisi */
iframe {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="%23fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18" stroke="%236ab42b"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>') center center no-repeat;
    background-color: #222;
}

/* Pagination CSS */
.pagination {
    margin-top: 2rem;
    user-select: none;
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