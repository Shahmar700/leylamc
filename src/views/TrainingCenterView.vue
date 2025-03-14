<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <!-- Yüklənmə göstəricisi -->
        <div v-if="loading" class="text-center py-10">
            <div class="flex justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            <p class="mt-4">Məlumatlar yüklənir...</p>
        </div>

        <!-- Xəta mesajı -->
        <div v-else-if="error" class="text-center py-10 text-red-500">
            {{ error }}
        </div>

        <!-- Əsas məzmun -->
        <div v-else class="flex flex-col items-center md:flex-row md:items-start sm:justify-between">
            <div class="w-full sm:w-3/4">
                <h1 class="text-3xl font-semibold mb-10">
                    {{ trainingCenterData[0]?.title || 'Təlim Mərkəzi' }}
                </h1>
                <p class="text-base sm:text-lg text-justify" v-html="trainingCenterText"></p>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <!-- <SideBanners2 class="mb-4" />  -->
            </div>
        </div>
         <!-- GALLERY SIDE  -->
         <div class="w-full mt-12">
            <div v-if="imagesLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
            
            <div v-else-if="!images.length" class="text-center py-8 bg-gray-50 rounded-lg">
              <p class="text-gray-500">Qalereya üçün şəkil tapılmadı</p>
            </div>
            
            <div v-else class="mt-4">
              <GallerySection :images="images" />
            </div>
          </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";

// Vəziyyət dəyişənləri
const trainingCenterData = ref([]);
const loading = ref(true);
const error = ref(null);
const trainingCenterText = ref('');
const images = ref([]);
const imagesLoading = ref(true);

// Təlim mərkəzi məlumatlarını çəkmək funksiyası
const fetchTrainingCenterData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/trainingcenter-list/');
    console.log("API cavabı:", response.data);
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      trainingCenterData.value = response.data.results;
      
      // İlk elementi götürün və məlumatları təyin edin
      const firstItem = response.data.results[0];
      
      // API-dan gələn mətn boşdursa, standart mətn göstərin
      trainingCenterText.value = firstItem.text || 
        'Təlim mərkəzimiz haqqında məlumatlar tezliklə əlavə olunacaq.';
    } else {
      error.value = "Məlumat tapılmadı";
    }
  } catch (err) {
    console.error("Təlim mərkəzi məlumatlarını yükləmə xətası:", err);
    error.value = "Məlumatları yükləmək mümkün olmadı: " + err.message;
  } finally {
    loading.value = false;
  }
};

// Qalereya şəkillərini çəkmək funksiyası 
const fetchGalleryImages = async () => {
  try {
    imagesLoading.value = true;
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/trcenter-photo-list/');
    
    if (response.data && response.data.results) {
      // API-dan gələn şəkilləri GallerySection üçün uyğun formata çevirir
      images.value = response.data.results.map(item => ({
        src: item.image,
        alt: `Təlim mərkəzi şəkil ${item.id}`,
        id: item.id
      }));
      console.log(`${images.value.length} ədəd şəkil qaleriyaya yükləndi`);
    } else {
      console.warn('Qalereya üçün şəkillər tapılmadı');
    }
  } catch (err) {
    console.error("Qalereya şəkillərini yükləmə xətası:", err);
    // Qalereya xətası kritik olmadığı üçün yalnız konsola çıxarırıq
  } finally {
    imagesLoading.value = false;
  }
};

// Komponent yüklənəndə məlumatları çəkin
onMounted(async () => {
  await fetchTrainingCenterData();
  await fetchGalleryImages();
});
</script>

<style scoped>
ul {
    list-style: disc;
}
</style>