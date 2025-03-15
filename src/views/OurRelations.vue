<template>
    <div class="container mt-14 md:mt-16 text-main-text">
        <!-- Yüklənmə göstəricisi -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>

        <!-- Xəta göstəricisi (əgər varsa) -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
            <div class="flex items-center">
                <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <p>{{ error }}</p>
            </div>
        </div>

        <div v-else>
            <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
                <div class="w-[90%] md:w-3/4" data-aos="zoom-out-right">
                    <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ relationsTitle }}</h1>
                    <p v-if="formattedRelationsText" class="mt-4 text-xl font-thin text-justify" v-html="formattedRelationsText"></p>
                    <p v-else class="mt-4 text-xl font-thin text-justify">Məlumat hazırlanır...</p>
                </div>
                <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                    <SideBanners class="mb-4" /> 
                    <SideBanners2 class="mb-4" /> 
                </div>
            </div>

            <!-- GALLERY SIDE  -->
            <div class="mt-10">
                <!-- <h2 class="text-xl md:text-2xl font-semibold mb-6">Qalereya</h2> -->
                <div v-if="galleryImages.length > 0">
                    <GallerySection :images="galleryImages" />
                </div>
                <div v-else class="text-center py-10 bg-gray-100 rounded-lg">
                    <p class="text-gray-600 text-xl">Qalereya mövcud deyil</p>
                </div>
            </div>

            <Maps class="mt-24"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useHead } from '@vueuse/head'

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";


const relationsTitle = ref('');
const relationsText = ref('');
const galleryImages = ref([]);

// Yüklənmə və xəta dəyişənləri
const isLoading = ref(true);
const error = ref(null);

// API-dən məlumatları almaq
const fetchRelations = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        
        const response = await axios.get('http://bytexerp.online/api/leyla/v1/internationalrelation-list/');
        const relationsData = response.data.results[0];
        
        if (relationsData) {
            relationsTitle.value = relationsData.title;
            relationsText.value = relationsData.text;
            
            // Əgər şəkil mövcuddursa, onu qalereya siyahısına əlavə et
            if (relationsData.photo) {
                galleryImages.value.push({
                    src: relationsData.photo,
                    alt: 'Beynəlxalq əlaqələr şəkli'
                });
            }
        } else {
            error.value = 'Məlumat tapılmadı';
        }

        // Qalereya şəkillərini almaq üçün ikinci API sorğusu
        await fetchGalleryImages();
        
    } catch(err) {
        console.error('API çağırışında xəta:', err);
        error.value = 'Məlumatları yükləmək mümkün olmadı';
    } finally {
        isLoading.value = false;
    }
}

// Qalereya şəkillərini almaq üçün yeni və təkmilləşdirilmiş funksiya
const fetchGalleryImages = async () => {
    try {
        const response = await axios.get('http://bytexerp.online/api/leyla/v1/ir-photo-list/');
        
        if (response.data && response.data.results && response.data.results.length > 0) {
            // API-dən gələn şəkilləri işləyirik
            response.data.results.forEach(item => {
                galleryImages.value.push({
                    src: item.images,
                    alt: `Beynəlxalq əlaqələr şəkli ${item.id}`
                });
            });
            
            console.log(`${galleryImages.value.length} ədəd şəkil yükləndi`);
        } else {
            console.log('Qalereya üçün şəkil tapılmadı.');
        }
    } catch (err) {
        console.error('Qalereya şəkillərini yükləmə xətası:', err);
        // Qalereya xətası ümumi məlumatlara təsir etməsin deyə burada error dəyişəninə mənimsətmirik
    }
}

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedRelationsText = computed(() => {
    return relationsText.value ? relationsText.value.replace(/\n/g, '<br>') : '';
})

// HTML təqləri olmayan təmiz mətn (meta açıqlamalar üçün)
const plainRelationsText = computed(() => {
    return relationsText.value ? relationsText.value.replace(/<[^>]*>/g, '').replace(/\n/g, ' ') : '';
});

// Səhifə yüklənəndə məlumatları al
onMounted(() => {
    fetchRelations();
})

// SEO meta məlumatları - reaktiv olaraq məlumatlar dəyişdikdə yenilənəcək
watch([relationsTitle, relationsText], () => {
    if (relationsTitle.value && relationsText.value) {
        updateSEO();
    }
});

// SEO məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
    // İlk şəkil URL-ni təyin edirik (əgər varsa)
    const firstImageUrl = galleryImages.value.length > 0 ? galleryImages.value[0].src : 'https://leylamc.com/images/international-relations.jpg';
    
    useHead({
        title: `Leyla Medical Center | ${relationsTitle.value}`,
        meta: [
            { 
                name: 'description', 
                content: `Leyla Medical Center-in beynəlxalq əlaqələri: ${plainRelationsText.value.substring(0, 150)}...` 
            },
            { 
                name: 'keywords', 
                content: 'leyla medical center, beynəlxalq əlaqələr, tibbi əməkdaşlıq, beynəlxalq tibbi əlaqələr, xarici klinikalarla əməkdaşlıq, tibb sahəsində beynəlxalq əməkdaşlıq, Azərbaycan tibb mərkəzi, tibbi partnyorluq' 
            },
            { 
                property: 'og:title', 
                content: `Leyla Medical Center | ${relationsTitle.value}` 
            },
            { 
                property: 'og:description', 
                content: `${relationsTitle.value} - Leyla Medical Center-in beynəlxalq əməkdaşlıq və əlaqələri. ${plainRelationsText.value.substring(0, 150)}...`
            },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: 'https://leylamc.com/our-relations' },
            { property: 'og:image', content: firstImageUrl },
            { property: 'og:site_name', content: 'Leyla Medical Center' },
            { property: 'og:locale', content: 'az_AZ' },
            
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: `Leyla Medical Center | ${relationsTitle.value}` },
            { 
                name: 'twitter:description', 
                content: `${relationsTitle.value} - Leyla Medical Center-in beynəlxalq əməkdaşlıqları. ${plainRelationsText.value.substring(0, 150)}...`
            },
            { name: 'twitter:image', content: firstImageUrl },
            
            // Strukturlu məlumatları əlavə etmək (Schema.org)
            {
                name: 'script',
                type: 'application/ld+json',
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": relationsTitle.value,
                    "description": plainRelationsText.value.substring(0, 150),
                    "url": "https://leylamc.com/our-relations",
                    "image": galleryImages.value.map(img => img.src),
                    "publisher": {
                        "@type": "MedicalOrganization",
                        "name": "Leyla Medical Center",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://leylamc.com/images/logo.png"
                        }
                    },
                    "mainEntity": {
                        "@type": "Article",
                        "headline": relationsTitle.value,
                        "description": plainRelationsText.value.substring(0, 150),
                        "image": galleryImages.value.map(img => img.src),
                        "publisher": {
                            "@type": "MedicalOrganization",
                            "name": "Leyla Medical Center",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://leylamc.com/images/logo.png"
                            }
                        }
                    }
                })
            }
        ],
        link: [
            { rel: 'canonical', href: 'https://leylamc.com/our-relations' }
        ]
    });
};
</script>

<style scoped>
p{
    text-align: justify;
}
</style>