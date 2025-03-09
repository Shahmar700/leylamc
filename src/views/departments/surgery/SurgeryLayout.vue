<template>
    <div class="container mt-16 text-main-text">
        <div v-if="loading" class="text-center py-10">
            <p>Yüklənir...</p>
        </div>
        <div v-else-if="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
        </div>
        <div v-else class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">{{ surgeryData?.name || 'Cərrahiyyə' }}</h1>
                <p class="text-base sm:text-lg">{{ surgeryData?.text_az || surgeryData?.text || '' }}</p>
                <br>

                <div class="flex flex-wrap gap-4 mt-4">
                    <a v-if="surgeryData?.service_link" target="_blank" :href="surgeryData.service_link" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
                        Video 1
                    </a>
                    <a v-if="surgeryData?.service_link1" target="_blank" :href="surgeryData.service_link1" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
                        Video 2
                    </a>
                    <a v-if="surgeryData?.service_link2" target="_blank" :href="surgeryData.service_link2" class="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark">
                        Video 3
                    </a>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <!-- GALLERY SIDE  -->
        <div v-if="images.length > 0" class="mt-10">
           <GallerySection :images="images" />
        </div>

        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";

// Route əldə edirik
const route = useRoute();

// Data state-ləri
const surgeryData = ref(null);
const loading = ref(true);
const error = ref(null);

// Cərrahiyyə məlumatlarını çəkmək
const fetchSurgeryDetails = async (slug) => {
  if (!slug) {
    console.error('Slug parametri tapılmadı');
    error.value = 'Səhifə tapılmadı';
    loading.value = false;
    return;
  }
  
  try {
    loading.value = true;
    error.value = null;
    
    // Əsas məlumatları əldə edirik
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/surgeonphoto-list/${slug}/`);
    
    if (response.data) {
      surgeryData.value = response.data;
    } else {
      throw new Error('Surgery not found');
    }
  } catch (err) {
    console.error("Surgery details API çağırışında xəta:", err);
    error.value = "Məlumatları yükləmək mümkün olmadı. Xahiş edirik daha sonra yenidən cəhd edin.";
  } finally {
    loading.value = false;
  }
};

// URL dəyişdiyində yeni məlumat çək - immediate: true əlavə edildi!
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    fetchSurgeryDetails(newSlug);
  }
}, { immediate: true }); // immediate: true əlavə edildi

// Component mount olduqda ilkin yükləmə
onMounted(() => {
  // URL-dən slug parametrini alırıq və əgər mövcuddursa çağırırıq
  const slug = route.params.slug;
  if (slug) {
    fetchSurgeryDetails(slug);
  }
});

// Gallery için var olan statik təsvirlər kodu referans üçün komment halında saxlandı
/*
// Gallery General Surgery 
import gs1 from "@/assets/images/general_surgery/gs1.jpg"
import gs2 from "@/assets/images/general_surgery/gs2.jpg"

const images = [
  { src: gs1, alt: 'Image 1' },
  { src: gs2, alt: 'Image 2' },
  { src: gs1, alt: 'Image 3' },
  { src: gs2, alt: 'Image 4' },
];
*/
</script>

<style scoped>
ul{
    list-style: disc;
}
</style>