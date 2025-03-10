<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">Video Qalereya</h1>
                
                <div v-if="loading" class="flex justify-center items-center py-10">
                    <div class="loader"></div>
                </div>
                
                <div v-else-if="videos.length === 0" class="text-center py-10">
                    Video tapılmadı.
                </div>
                
                <div v-else class="grid grid-cols-1 gap-8">
                    <div v-for="video in videos" :key="video.id" class="video-container">
                        <div class="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                            <iframe 
                                :src="getEmbedUrl(video.url)" 
                                class="absolute top-0 left-0 w-full h-full"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <h3 class="text-lg md:text-xl font-medium mt-3">{{ video.title }}</h3>
                        <p v-if="video.description" class="mt-1 text-gray-600">{{ video.description }}</p>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

const videos = ref([]);
const loading = ref(true);

// YouTube linkindən embed URL yaratmaq üçün funksiya
const getEmbedUrl = (url) => {
    // Əgər URL dəyəri boşdursa və ya undefined-dirsə
    if (!url) {
        console.warn('Video URL tapılmadı');
        return '';
    }
    
    // YouTube URL formatları: 
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    let videoId = '';
    
    try {
        if (url.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            videoId = urlParams.get('v');
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else {
            // Digər formatlar və ya birbaşa ID daxil edilərsə
            videoId = url;
        }
    } catch (error) {
        console.error('Video URL-i işlənərkən xəta baş verdi:', error, 'URL:', url);
        return '';
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const fetchVideos = async () => {
    try {
        loading.value = true;
        const response = await axios.get('https://bytexerp.online/api/leyla/v1/video-gallery-list/');
        console.log('API-dən gələn video məlumatları:', response.data);
        
        // API-dən gələn məlumatların strukturunu yoxlayın
        if (response.data.results && Array.isArray(response.data.results)) {
            videos.value = response.data.results.map(video => {
                // URL-in varlığını yoxlayaraq düzgün formatda olub-olmadığını təmin edirik
                if (!video.url) {
                    console.warn('Video ID:', video.id, 'URL yoxdur');
                }
                return video;
            }).filter(video => video.url); // URL-i olmayan videoları filtərləyirik
        } else {
            console.error('Gözlənilən API formatı alınmadı:', response.data);
            videos.value = [];
        }
    } catch (error) {
        console.error('Video məlumatları yüklənərkən xəta baş verdi:', error);
        videos.value = [];
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchVideos();
});
</script>

<style scoped>
.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.video-container {
    transition: transform 0.3s ease;
}

.video-container:hover {
    transform: translateY(-5px);
}
</style>