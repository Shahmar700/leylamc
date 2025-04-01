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
import { useHead } from '@vueuse/head'; // useHead import edirik


// Route əldə edirik
const route = useRoute();

// Data state-ləri
const surgeryData = ref(null);
const loading = ref(true);
const error = ref(null);
const images = ref([]); 

// SEO üçün computed properties
const pageTitle = computed(() => 
  surgeryData.value?.name 
    ? `${surgeryData.value.name} | Leyla Medical Center` 
    : 'Cərrahiyyə Bölməsi | Leyla Medical Center'
);

const pageDescription = computed(() => {
  if (surgeryData.value?.text_az) {
    // İlk 160 simvolu götürürük və cümlə ilə bitdiyinə əmin oluruq
    let description = surgeryData.value.text_az.substring(0, 160);
    if (description.length === 160) {
      // Son nöqtəli vergül və ya nöqtə tapırıq
      const lastPeriod = Math.max(
        description.lastIndexOf('. '), 
        description.lastIndexOf('! '), 
        description.lastIndexOf('? ')
      );
      if (lastPeriod > 120) { // Ən azı 120 simvol olsun
        description = description.substring(0, lastPeriod + 1);
      } else {
        description += '...';
      }
    }
    return description;
  }
  return 'Leyla Medical Center-in Cərrahiyyə şöbəsi müasir tibbi avadanlıqlar və təcrübəli cərrahlar ilə yüksək keyfiyyətli cərrahi xidmətlər təklif edir. Cərrahi əməliyyatlar üçün müraciət edin.';
});

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
    const response = await axios.get(`https://bytexerp.online/api/leyla/v1/surgeonphoto-list/${slug}/`);
    
    if (response.data) {
      surgeryData.value = response.data;

      // Şəkilləri əlavə edirik (əgər API-dan gəlirsə)
      if (response.data.images && Array.isArray(response.data.images)) {
        images.value = response.data.images.map((img, index) => ({
          src: img.image_url || img,
          alt: `Cərrahiyyə şəkli ${index + 1}`
        }));
      }
      // SEO meta məlumatlarını yeniləyirik
      updateSEO();
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

// SEO meta məlumatlarını yeniləmək üçün funksiya
const updateSEO = () => {
  const imageUrl = images.value.length > 0 
    ? images.value[0].src 
    : 'https://leylamc.com/images/surgery-department.jpg';
  
  useHead({
    title: pageTitle.value,
    meta: [
      { 
        name: 'description', 
        content: pageDescription.value
      },
      { 
        name: 'keywords', 
        content: `cərrahiyyə, cərrahi əməliyyat, tibbi müdaxilə, ${surgeryData.value?.name || 'cərrahiyyə bölməsi'}, leyla medical center, cərrah, laparoskopik cərrahiyyə, tibbi xidmətlər, əməliyyat`
      },
      
      // Open Graph meta tagları
      { property: 'og:title', content: pageTitle.value },
      { property: 'og:description', content: pageDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://leylamc.com/az/bölmələr/cərrahiyyə' },
      { property: 'og:image', content: imageUrl },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      // Twitter meta tagları
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle.value },
      { name: 'twitter:description', content: pageDescription.value },
      { name: 'twitter:image', content: imageUrl },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": surgeryData.value?.name || "Cərrahiyyə Bölməsi",
          "description": pageDescription.value,
          "image": imageUrl,
          "url": "https://leylamc.com/az/bölmələr/cərrahiyyə",
          "medicalSpecialty": "Cərrahiyyə",
          "department": [
            {
              "@type": "MedicalSpecialty",
              "name": surgeryData.value?.name || "Cərrahiyyə Bölməsi"
            }
          ],
          "isPartOf": {
            "@type": "Hospital",
            "name": "Leyla Medical Center",
            "url": "https://leylamc.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Azərbaycan",
            "addressLocality": "Bakı",
            "streetAddress": "Yusif Səfərov küç.19, Xətai rayonu"
          },
          "telephone": "+994124902131"
        })
      }
    ],
    // Canonical link əlavə edirik
    link: [
      { rel: 'canonical', href: 'https://leylamc.com/az/bölmələr/cərrahiyyə' }
    ]
  });
};

// Route dəyişdiyində yeni məlumatları yükləyirik
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    fetchSurgeryDetails(newSlug);
  } else {
    // Əgər slug yoxdursa (əsas cərrahiyyə səhifəsidirsə)
    updateSEO();
  }
}, { immediate: true });

// Component mount olduqda ilkin yükləmə
onMounted(() => {
  const slug = route.params.slug;
  if (slug) {
    fetchSurgeryDetails(slug);
  } else {
    // Əgər slug yoxdursa (əsas cərrahiyyə səhifəsidirsə)
    updateSEO();
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