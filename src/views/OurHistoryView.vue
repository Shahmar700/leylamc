<template>
    <div class="container mt-16">
      <h1 class="text-3xl text-main-text">{{ pageHeading }}</h1>
        <div class="mt-14">
            <div class="">
                <HistoryContent 
                :dotImg="greenDot"
                year="1999"
                heading="1999 başlanğıc"
                info="Leyla Şıxlinskaya Klinikasının əsası ulu öndər Heydər Əliyev tərəfindən qoyuldu."
                data-aos="fade-up"
                data-aos-delay="100"
                />
                <HistoryContent 
                :dotImg="greenDot"
                year="2019"
                heading="Klinika yenidən quruldu"
                info="Klinika yenidən quruldu və Leyla Medical Center adı ilə fəaliyyətə başladı. Yeni ad, daha geniş xidmətlər və daha peşəkar həkimlər mərkəzin əsas tərkib hissəsi oldu."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="2019-2020-ci illər"
                prog1="Beynəlxalq keyfiyyətə nəzarət proqramları tətbiq olundu."
                prog2="Yeni şöbələr yaradıldı və müasir avadanlıqlar tətbiq edilməyə başlandı."
                prog3="Sənaye Tibbi Xidmətinin inkişafı üçün ciddi addımlar atıldı."
                prog4="Təcili Tibbi Yardım Xidmətləri beynəlxalq və yerli standartlara uyğun olaraq təşkil olundu."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="Mart 2020-ci il"
                prog1="Xüsusi karantin rejimi və pandemiya ilə əlaqədar olaraq virusun yayılma riskini azaltmaq üçün mühüm addımlar atıldı."
                prog2="Dövlət tərəfindən başladılan sosial aksiyalara dəstək verildi."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="Aprel 2020-ci il"
                prog1="Könüllü qanvermə aksiyası keçirildi."
                prog2="Aksiyada toplanan qanlar qan xəstəliklərindən əziyyət çəkən uşaqlara yardım etmək məqsədilə istifadə olundu."
                prog3="Bu aksiyaya görə AR Birinci Vitse-Prezidenti Mehriban Əliyeva tərəfindən təşəkkür alındı."
                data-aos="fade-up"
                data-aos-delay="200"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import greenDot from "@/assets/icons/green-dot.svg"
import greenTick from "@/assets/icons/green-tick.svg"
import HistoryContent from "@/components/HistoryContent.vue";
import { useHead } from '@vueuse/head';

// Səhifə başlığını bir dəyişəndə saxlayırıq
const pageHeading = ref('Tariximiz');

// SEO meta məlumatları
useHead({
  title: `Leyla Medical Center | ${pageHeading.value}`,
  meta: [
    { 
      name: 'description', 
      content: '1999-cu ildə Ulu Öndər Heydər Əliyev tərəfindən əsası qoyulan Leyla Medical Center-in inkişaf tarixi. 20 ildən çox fəaliyyət müddətində tibbi xidmətlərin inkişaf yolu və mühüm hadisələr.' 
    },
    { 
      name: 'keywords', 
      content: 'leyla medical center tarixi, leyla şıxlinskaya, tibb mərkəzi inkişaf, tibbi xidmət tarixi, azərbaycan tibb tarixi, 1999, heydər əliyev, tibb mərkəzi, könüllü qanvermə aksiyası' 
    },
    { 
      property: 'og:title', 
      content: 'Leyla Medical Center-in Tarixi | 1999-dan Günümüzə' 
    },
    { 
      property: 'og:description', 
      content: '1999-cu ildən başlayan inkişaf yolumuz - Leyla Medical Center-in fəaliyyət tarixi, əldə etdiyimiz nailiyyətlər və mühüm hadisələr.'
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: 'https://leylamc.com/az/haqqımızda/tariximiz' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-history.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    { property: 'article:published_time', content: '2020-05-01T00:00:00+04:00' },
    { property: 'article:modified_time', content: new Date().toISOString() },
    { property: 'article:section', content: 'Haqqımızda' },
    { property: 'article:tag', content: 'tarix,inkişaf,tibb mərkəzi,1999' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leyla Medical Center-in Tarixi | 1999-dan Günümüzə' },
    { 
      name: 'twitter:description', 
      content: '1999-cu ildən başlayan inkişaf yolumuz - Leyla Medical Center-in fəaliyyət tarixi, əldə etdiyimiz nailiyyətlər və mühüm hadisələr.'
    },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-history.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org Timeline)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Leyla Medical Center-in 1999-dan Günümüzə Olan Tarixi",
        "image": "https://leylamc.com/images/leyla-history.jpg",
        "publisher": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": {
            "@type": "ImageObject",
            "url": "https://leylamc.com/images/logo.png"
          }
        },
        "url": "https://leylamc.com/az/haqqımızda/tariximiz",
        "datePublished": "2020-05-01T00:00:00+04:00",
        "dateModified": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "Leyla Medical Center"
        },
        "description": "1999-cu ildən başlayan inkişaf yolumuz - Leyla Medical Center-in fəaliyyət tarixi, əldə etdiyimiz nailiyyətlər və mühüm hadisələr."
      })
    }
  ],
  link: [
  { rel: 'canonical', href: 'https://leylamc.com/az/haqqımızda/tariximiz' }
  ]
});
</script>

<style scoped>
.historyYear{
    position: relative;
}
/* .historyYear::before{
    content: '';
    position: absolute;
    width: 3px;
    height: 150%;
    background-color: #83B52B;
    top: -30%;
    right: -50px;
} */
</style>
