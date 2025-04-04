<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
      <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
        <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
          <h1 class="text-3xl font-semibold mb-10">{{ surgery?.name }}</h1>
          <p class="text-base sm:text-lg" v-html="surgeryText"></p>
          <br>
          <!-- <div>
            <a target="_blank" :href="surgery?.service_link">{{ surgery?.service_link }}</a>
          </div> -->
        </div>
        <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
          <SideBanners class="mb-4" /> 
          <SideBanners2 class="mb-4" /> 
        </div>
      </div>
  
      <!-- GALLERY SIDE  -->
      <div class="mt-10">
        <GallerySection :images="images" />
      </div>
  
      <Maps class="mt-14 sm:mt-24"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import SideBanners from "@/components/SideBanners.vue";
  import SideBanners2 from "@/components/SideBanners2.vue";
  import Maps from "@/components/Maps.vue";
  import GallerySection from "@/components/GallerySection.vue";
  import { useHead } from '@vueuse/head';
  
  const route = useRoute();
  const surgery = ref(null);
  const surgeryPhotos = ref([]);
  
// SEO üçün computed properties
const pageTitle = computed(() => 
  surgery.value?.name 
    ? `${surgery.value.name} | Cərrahiyyə | Leyla Medical Center` 
    : 'Cərrahiyyə Xidməti | Leyla Medical Center'
);

const pageDescription = computed(() => {
  if (surgery.value?.text) {
    // İlk 160 simvolu götürürük və cümlə ilə bitdiyinə əmin oluruq
    let description = surgery.value.text.substring(0, 160);
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
  return `Leyla Medical Center-də ${route.params.slug || 'cərrahi xidmət'} - müasir tibbi avadanlıqlar və təcrübəli cərrahlar ilə yüksək keyfiyyətli cərrahi xidmətlər. Ətraflı məlumat üçün səhifəmizi ziyarət edin.`;
});

const pageKeywords = computed(() => {
  const surgeryName = surgery.value?.name || route.params.slug || 'cərrahi əməliyyat';
  return `cərrahiyyə, ${surgeryName}, cərrahi müdaxilə, cərrahi əməliyyat, tibbi müdaxilə, leyla medical center, cərrah, tibbi xidmətlər, əməliyyat, müalicə`;
});

// Meta məlumatlarını yeniləyən funksiya
const updateSEO = () => {
  // Şəkil URL-ni əldə edirik
  const imageUrl = surgeryPhotos.value.length > 0 
    ? surgeryPhotos.value[0].src 
    : 'https://leylamc.com/images/surgery-department.jpg';
  
  // Dinamik slug
  const surgerySlug = route.params.slug;
  
  useHead({
    title: pageTitle.value,
    meta: [
      { name: 'description', content: pageDescription.value },
      { name: 'keywords', content: pageKeywords.value },
      
      // Open Graph meta tagları
      { property: 'og:title', content: pageTitle.value },
      { property: 'og:description', content: pageDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://leylamc.com/az/bölmələr/cərrahiyyə/${surgerySlug}` },
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
          "@type": "MedicalProcedure",
          "name": surgery.value?.name || `Cərrahi Əməliyyat - ${surgerySlug}`,
          "description": pageDescription.value,
          "image": imageUrl,
          "url": `https://leylamc.com/az/bölmələr/cərrahiyyə/${surgerySlug}`,
          "procedureType": "https://www.wikidata.org/wiki/Q848317",  // Cərrahiyyə
          "bodyLocation": surgery.value?.body_location || "Müxtəlif",
          "followup": "Həkiminizin tövsiyələrinə əsasən",
          "howPerformed": surgery.value?.text || "Müasir tibbi avadanlıq və təcrübəli həkimlər tərəfindən",
          "preparation": "Həkimlə əvvəlcədən məsləhətləşmə tələb olunur",
          "status": "https://schema.org/ActiveActionStatus",
          "performer": {
            "@type": "MedicalOrganization",
            "name": "Leyla Medical Center",
            "url": "https://leylamc.com"
          },
          "medicineSystem": "https://www.wikidata.org/wiki/Q35848", // Müasir tibb
          "recognizingAuthority": {
            "@type": "Organization",
            "name": "Azərbaycan Səhiyyə Nazirliyi"
          }
        })
      }
    ],
    // Canonical link əlavə edirik
    link: [
      { rel: 'canonical', href: `https://leylamc.com/az/bölmələr/cərrahiyyə/${surgerySlug}` }
    ]
  });
};

  const fetchSurgeryDetails = async () => {
    try {
      const response = await axios.get('https://bytexerp.online/api/leyla/v1/surgeondep-list/');
      const surgeries = response.data.results;
      surgery.value = surgeries.find(s => s.slug === route.params.slug);
      if (!surgery.value) {
        throw new Error('Surgery not found');
        // SEO meta məlumatlarını yeniləyirik
        updateSEO();
      }
    } catch (error) {
      console.error("Surgery details API çağırışında xəta:", error);
    }
  };
  
  const fetchSurgeryPhotos = async () => {
    try {
      const response = await axios.get('https://bytexerp.online/api/leyla/v1/surgeonphoto-list/');
      // Yalnız cari cərrahiyyəyə aid şəkilləri filterlə
      if (surgery.value) {
        const photos = response.data.results.filter(
          photo => photo.surgeon_cat.id === surgery.value.id
        );
        
        // Şəkilləri alt atributu ilə obyektlərə çevir
        surgeryPhotos.value = photos.map(photo => ({
          src: photo.image,
          alt: `${surgery.value.name} - ${photo.id}`
        }));

        // Şəkillər yükləndikdən sonra SEO məlumatlarını yeniləyirik (şəkil URL-ləri üçün)
        updateSEO();
      }
    } catch (error) {
      console.error("Surgery photos API çağırışında xəta:", error);
    }
  };
  
  onMounted(async () => {
    await fetchSurgeryDetails();
    await fetchSurgeryPhotos();
  });
  
  watch(() => route.params.slug, async () => {
    await fetchSurgeryDetails();
    await fetchSurgeryPhotos();
  });
  
  const surgeryText = computed(() => {
  return surgery.value?.text
    ? surgery.value.text.replace(/\n/g, "<br>").replace(/(.*?:)/g, "<b>$1</b>")
    : '';
});

  // Sadəcə API-dən gələn şəkilləri qaytarırıq
  const images = computed(() => {
    return surgeryPhotos.value;
  });
  </script>