<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xls font-semibold mb-10">Online nəticəni necə əldə etmək olar?
                </h1>
                <p class="mt-4 text-base md:text-xl font-normal text-justify">Referans Medical Group olaraq daim pasiyent rahatlığını öz əsas prinsiplərimizdən biri hesab edirik. Pasiyentlərimizə təqdim etdiyimiz xüsusi xidmətlərdin biridə ONLİNE NƏTİCƏ xidmətidir, bununla nəticələrini əldə etmək üçün klinikaya üz tutmaya bilərsiz.</p>
                <br>
                <p class="mt-4 text-base md:text-xl font-normal text-justify">Online Nəticə bölümündən necə faydalanmaq olar?</p>
                <br>
                <ol class="list-decimal">
                    <li class="ml-6 mt-4 text-base md:text-xl font-normal text-justify">leylamc.az saytına daxil olursuz və online nəticə bölümünə keçir edirsiniz.</li>
                    <li class="ml-6 mt-4 text-base md:text-xl font-normal text-justify">Daha sonra müraciət zamanı sizə təqdim olunan qəbz üzərində qeyd olunan SƏNƏD NÖMRƏSİNİ “Sənəd nömrəsi” hissəsinə daxil edirsiniz.</li>
                    <li class="ml-6 mt-4 text-base md:text-xl font-normal text-justify">Doğum ilinizi (Gün və ay qeyd olunmadan) aidiyyattı xanaya daxil edin.</li>
                    <li class="ml-6 mt-4 text-base md:text-xl font-normal text-justify">“Daxil olun” düyməsini basın.</li>
                </ol>
                <br>
                <a href="http://31.171.110.19:8080/login.aspx?ReturnUrl=onlineislemler%2flabsonuc.aspx" target="_blank" class="greenBtn">Online nəticəni əldə edin</a>
                <img src="/assets/eResult.jpg" alt="" class="my-8">
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";
import { ref } from 'vue';
import { useHead } from '@vueuse/head';

// Səhifə başlığını tanımlayırıq
const pageTitle = ref('E-nəticə');

// SEO meta məlumatlarını əlavə edirik
useHead({
  title: `Leyla Medical Center | ${pageTitle.value}`,
  meta: [
    { 
      name: 'description', 
      content: 'Leyla Medical Center-də online laboratoriya nəticələrinizi rahatlıqla əldə edin. Sənəd nömrəsi və doğum iliylə klinikaya gəlmədən nəticələrinizə dərhal baxın.'
    },
    { 
      name: 'keywords', 
      content: 'online nəticə, lab test nəticələri, tibbi nəticələr, laboratoriya nəticələri, Leyla Medical Center, online tibbi xidmətlər, sənəd nömrəsi, lab nəticələri əldə etmək, Azərbaycanda laboratoriya' 
    },
    // Open Graph meta tagları
    { property: 'og:title', content: `Leyla Medical Center | ${pageTitle.value}` },
    { property: 'og:description', content: 'Klinikaya gəlmədən online olaraq laboratoriya nəticələrinizi əldə edin. Sadəcə sənəd nömrəsi və doğum ilinizi daxil edin.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/online-xidmətlər/e-nəticə' },
    { property: 'og:image', content: 'https://leylamc.com/assets/eResult.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    // Twitter meta tagları
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Leyla Medical Center | ${pageTitle.value}` },
    { name: 'twitter:description', content: 'Klinikaya gəlmədən online olaraq laboratoriya nəticələrinizi əldə edin. Sadəcə sənəd nömrəsi və doğum ilinizi daxil edin.' },
    { name: 'twitter:image', content: 'https://leylamc.com/assets/eResult.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `Online Nəticə | Leyla Medical Center`,
        "description": "Laboratoriya nəticələrinizi online əldə etmək üçün addım-addım təlimatlar",
        "url": "https://leylamc.com/az/online-xidmətlər/e-nəticə",
        "provider": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": "https://leylamc.com/images/leyla-mc-logo.png"
        },
        "mainEntity": {
          "@type": "HowTo", 
          "name": "Online nəticəni necə əldə etmək olar?",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Sayta daxil olun",
              "text": "leylamc.az saytına daxil olursuz və online nəticə bölümünə keçir edirsiniz."
            },
            {
              "@type": "HowToStep",
              "name": "Sənəd nömrəsini daxil edin",
              "text": "Daha sonra müraciət zamanı sizə təqdim olunan qəbz üzərində qeyd olunan SƏNƏD NÖMRƏSİNİ 'Sənəd nömrəsi' hissəsinə daxil edirsiniz."
            },
            {
              "@type": "HowToStep",
              "name": "Doğum ilini daxil edin",
              "text": "Doğum ilinizi (Gün və ay qeyd olunmadan) aidiyyattı xanaya daxil edin."
            },
            {
              "@type": "HowToStep",
              "name": "Daxil olun",
              "text": "'Daxil olun' düyməsini basın."
            }
          ]
        }
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/online-xidmətlər/e-nəticə' }
  ]
});
</script>

<style scoped>


</style>