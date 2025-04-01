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
                <h1 class="text-2xl md:text-3xl font-semibold mb-6">{{ pageHeading }}</h1>
                
                <!-- Şəkil yoxdursa -->
                <div v-if="photos.length === 0" class="text-center py-10 bg-gray-100 rounded-lg">
                    <p class="text-gray-600 text-xl">Qalereya mövcud deyil</p>
                </div>
                
                <!-- Şəkil qalereyası -->
                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div 
                            v-for="photo in displayedPhotos" 
                            :key="photo.id" 
                            class="overflow-hidden rounded-lg shadow-md hover:shadow-xl duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
                            @click="openModal(photo.photo)"
                        >
                            <img 
                                :src="photo.photo" 
                                :alt="`Qalereya şəkli ${photo.id}`" 
                                class="w-full h-64 object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    
                    <!-- Pagination -->
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
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        
        <Maps class="mt-14 sm:mt-24" />
        
        <!-- Şəkil modalı -->
        <Modal 
            :is-open="modalOpen" 
            :src-img="selectedImage" 
            @close="closeModal" 
        />
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import Modal from "@/components/Modal.vue";
import { useHead } from '@vueuse/head';

// Əsas dəyişənlər
const photos = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Modal dəyişənləri
const modalOpen = ref(false);
const selectedImage = ref('');

// Pagination dəyişənləri
const currentPage = ref(1);
const photosPerPage = ref(12); // Hər səhifədə göstəriləcək şəkil sayı
const totalItems = ref(0);

// Hesablanmış pagination dəyişənləri
const totalPages = computed(() => {
    return Math.ceil(totalItems.value / photosPerPage.value);
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

// Cari səhifədə göstəriləcək şəkillər
const displayedPhotos = computed(() => {
    const startIndex = (currentPage.value - 1) * photosPerPage.value;
    const endIndex = startIndex + photosPerPage.value;
    return photos.value.slice(startIndex, endIndex);
});

// API-dən şəkilləri almaq
const fetchPhotos = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        
        const response = await axios.get('https://bytexerp.online/api/leyla/v1/photo-gallery-list/');
        
        if (response.data && response.data.results) {
            photos.value = response.data.results;
            totalItems.value = response.data.count || photos.value.length;
            console.log(`${photos.value.length} ədəd şəkil yükləndi`);
        } else {
            console.log('Qalereya üçün şəkil tapılmadı.');
        }
    } catch (err) {
        console.error('Şəkilləri yükləmə xətası:', err);
        error.value = 'Qalereya şəkillərini yükləmək mümkün olmadı';
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

// Modal funksiyaları
const openModal = (imageUrl) => {
    selectedImage.value = imageUrl;
    modalOpen.value = true;
    document.body.style.overflow = 'hidden'; // Scroll-u blok et
};

const closeModal = () => {
    modalOpen.value = false;
    document.body.style.overflow = 'auto'; // Scroll-u bərpa et
};

// Səhifə yükləndikdə şəkilləri çəkək
onMounted(() => {
    fetchPhotos();
});

// Səhifə dəyişdikdə yüklənmə indikatorunu yenidən göstərək
watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const pageHeading = ref('Foto Qalereya')

// SEO meta məlumatları
useHead({
    // Başlıq - H1 ilə uyğunlaşdırılıb
    title: `Leyla Medical Center | ${pageHeading.value}`,
    meta: [
        // Əsas meta taglər
        { 
            name: 'description', 
            content: 'Leyla Medical Center-in fəaliyyəti və tibbi xidmətlərindən foto qalereya. Müasir tibbi avadanlıqlar, peşəkar həkim heyəti və klinika ilə bağlı şəkillər.' 
        },
        { 
            name: 'keywords', 
            content: 'foto qalereya, tibb mərkəzi şəkilləri, Leyla Medical Center, klinika fotoları, tibbi xidmətlər, Azərbaycan tibb mərkəzi, səhiyyə qalereya' 
        },
        
        // Canonical URL - yeni URL yolunu əks etdirir
        { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/mediada-biz/qalereya/foto' },
        
        // Open Graph meta tagları - sosial mediada paylaşım üçün
        { property: 'og:title', content: `${pageHeading.value} | Leyla Medical Center` },
        { property: 'og:description', content: 'Leyla Medical Center-in fəaliyyəti və tibbi xidmətlərindən foto qalereya. Müasir tibbi avadanlıqlar və peşəkar həkim heyəti.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/mediada-biz/qalereya/foto' },
        { property: 'og:image', content: photos.value.length > 0 ? photos.value[0].photo : 'https://leylamc.com/images/leyla-mc-logo.png' },
        { property: 'og:site_name', content: 'Leyla Medical Center' },
        { property: 'og:locale', content: 'az_AZ' },
        
        // Twitter meta tagları
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${pageHeading.value} | Leyla Medical Center` },
        { name: 'twitter:description', content: 'Leyla Medical Center-in fəaliyyəti və tibbi xidmətlərindən foto qalereya.' },
        { name: 'twitter:image', content: photos.value.length > 0 ? photos.value[0].photo : 'https://leylamc.com/images/leyla-mc-logo.png' },
        
        // Strukturlu məlumatları əlavə etmək (Schema.org)
        {
            name: 'script',
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "name": pageHeading.value,
                "description": "Leyla Medical Center-in fəaliyyəti və tibbi xidmətlərindən foto qalereya.",
                "url": "https://leylamc.com/az/haqqımızda/mediada-biz/qalereya/foto",
                "image": photos.value.slice(0, 10).map(photo => photo.photo), // İlk 10 şəkli əlavə edirik
                "numberOfItems": totalItems.value,
                "provider": {
                    "@type": "MedicalOrganization",
                    "name": "Leyla Medical Center",
                    "logo": "https://leylamc.com/images/leyla-mc-logo.png"
                }
            })
        }
    ],
    // Canonical link - meta taglər bölməsində də var, burada təkrarlamaq lazım deyil
    link: [
        { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/mediada-biz/qalereya/foto' }
    ]
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

/* Şəkil hover effektləri */
.grid > div:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.grid > div img {
    transition: transform 0.5s ease;
}

.grid > div:hover img {
    transform: scale(1.05);
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