<template>
  <div class="container mt-14 md:mt-16 text-main-text">
      <div class="flex flex-col md:flex-row sm:justify-between">
          <div class=" w-full sm:w-3/4">
              <h1 class="text-main-text text-2xl md:text-3xl my-6">{{ pageTitle }}</h1>
              <div v-if="certificates.length === 0" class="text-center text-lg">
                  Heç bir məlumat tapılmadı
              </div>
              <div v-else class="p-4 border cursor-pointer">
                <div 
                  v-for="certificate in certificates" 
                  :key="certificate.id" 
                  class="relative mb-6 p-4 transition-all duration-200 certificate-card rounded-lg hover:bg-gray-50"
                  @click="openImageModal(certificate.photo)"
              >
                  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img 
                          :src="certificate.photo" 
                          class="w-[250px] h-[150px] object-contain rounded-md flex-shrink-0" 
                          :alt="certificate.title || 'Sertifikat şəkli'"
                      >
                      <h2 class="text-lg font-semibold">{{ certificate.title }}</h2>
                  </div>
              </div>
              </div>
          </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
              <SideBanners class="mb-4" /> 
              <SideBanners2 class="mb-4" /> 
          </div>
      </div>
      <Maps class="mt-14 sm:mt-24"/>

      <!-- Modal komponenti -->
      <Modal 
          :is-open="isModalOpen" 
          :src-img="selectedImage" 
          @close="closeModal"
      />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import Modal from "@/components/Modal.vue"; // Modal komponentini import edirik

const pageTitle = ref('Sertifikatlar');
const certificates = ref([]);
const isModalOpen = ref(false); // Modal açıq olub-olmamasını izləyən dəyişən
const selectedImage = ref(''); // Seçilmiş şəkil url-ni saxlayan dəyişən
const isLoading = ref(true);

// Sertifikatların adlarını birləşdirib string yaratmaq üçün computed property
const certificateTitles = computed(() => {
  return certificates.value
    .map(cert => cert.title)
    .filter(title => title)
    .join(', ');
});

const fetchCertificates = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/certificate-list/');
    certificates.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  } finally {
    isLoading.value = false;
  }
};

// Şəkil modalını açan funksiya
const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  isModalOpen.value = true;
};

// Modalı bağlayan funksiya
const closeModal = () => {
  isModalOpen.value = false;
};

// SEO meta məlumatları
const updateSEO = () => {
  const imageUrls = certificates.value.map(cert => cert.photo).filter(url => url);
  const firstImage = imageUrls.length > 0 ? imageUrls[0] : 'https://leylamc.com/images/certificates.jpg';
  
  useHead({
    title: `Leyla Medical Center | ${pageTitle.value}`,
    meta: [
      { 
        name: 'description', 
        content: `Leyla Medical Center-in aldığı sertifikatlar və mükafatlar. ${certificateTitles.value}. Keyfiyyətli tibbi xidmət üçün beynəlxalq standartlara cavab verən tibb mərkəzi.` 
      },
      { 
        name: 'keywords', 
        content: 'leyla medical center, tibb mərkəzi sertifikatları, tibbi sertifikatlar, beynəlxalq standartlar, ISO sertifikatı, keyfiyyət sertifikatları, akkreditasiya, tibbi xidmət standartları' 
      },
      { 
        property: 'og:title', 
        content: `Leyla Medical Center | ${pageTitle.value}` 
      },
      { 
        property: 'og:description', 
        content: `Leyla Medical Center-in aldığı sertifikatlar və mükafatlar. Keyfiyyətli tibbi xidmət üçün beynəlxalq standartlara cavab verən tibb mərkəzi.`
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/sertifikatlar' },
      { property: 'og:image', content: firstImage },
      { property: 'og:site_name', content: 'Leyla Medical Center' },
      { property: 'og:locale', content: 'az_AZ' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
      { 
        name: 'twitter:description', 
        content: `Leyla Medical Center-in aldığı sertifikatlar və mükafatlar. Keyfiyyətli tibbi xidmət üçün beynəlxalq standartlara cavab verən tibb mərkəzi.`
      },
      { name: 'twitter:image', content: firstImage },
      
      // Strukturlu məlumatları əlavə etmək (Schema.org)
      {
        name: 'script',
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pageTitle.value,
          "description": "Leyla Medical Center-in aldığı sertifikatlar və mükafatlar",
          "url": "https://leylamc.com/certificates",
          "publisher": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "logo": {
              "@type": "ImageObject",
              "url": "https://leylamc.com/images/logo.png"
            }
          },
          "itemListElement": certificates.value.map((cert, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "CreativeWork",
              "name": cert.title || "Sertifikat",
              "image": cert.photo
            }
          }))
        })
      }
    ],
    link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/sertifikatlar' }
    ]
  });
};

// Sertifikatlar dəyişdikdə SEO məlumatlarını yenilə
watch(certificates, () => {
  if (!isLoading.value) {
    updateSEO();
  }
}, { deep: true });

onMounted(() => {
  fetchCertificates().then(() => {
    updateSEO();
  });
});
</script>

<style scoped>
.certificate-card:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>