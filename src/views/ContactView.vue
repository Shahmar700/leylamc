<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Əlaqə</h1>
                <!-- CONTACTS -->
                <div class="contact-item mb-6">
                <h3 class="text-xl font-semibold mb-2">Leyla Medical Center (Əsas bina)</h3>
                <p><i class="fa-solid fa-location-dot"></i> <a href="https://maps.app.goo.gl/NXFG3HEEtR4GHnmV8" target="_blank" class="text-primary">Xətai rayonu, Yusif Səfərov küç.19</a></p>
                <p><i class="fa-solid fa-phone"></i> *0101 və ya (+994 12) 490 21 31 // (+994 12) 490 18 58</p>
                <p><i class="fa-solid fa-mobile-screen"></i> (+994 50) 225 73 30 // (+994 50) 225 44 54</p>
                <p><i class="fa-brands fa-whatsapp"></i> +994 55 455 01 11</p>
                <p><i class="fa-solid fa-envelope"></i> <a href="mailto:info@leylamc.az" class="text-primary">info@leylamc.az</a></p>
                <p><i class="fa-brands fa-instagram"></i> <a href="https://www.instagram.com/leylamedicalcenter/?igsh=MWt4eWdoODRwdzFmZA%3D%3D#" target="_blank" class="text-primary">leylamedicalcenter</a></p>
                </div>
                <div class="contact-item mb-6">
                <h3 class="text-xl font-semibold mb-2">Leyla Medical Center Pediatriya 1</h3>
                <p><i class="fa-solid fa-location-dot"></i> <a class="text-primary" href="https://maps.app.goo.gl/Lavv24ZaFcAFZBrY7" target="_blank">Xətai rayonu, Yusif Səfərov küç.19</a></p>
                <p><i class="fa-solid fa-phone"></i> *0101 və ya (+994 12) 490 21 31 // (+994 12) 490 18 58</p>
                <p><i class="fa-solid fa-mobile-screen"></i> (+994 50) 225 73 30 // (+994 50) 225 44 54</p>
                <p><i class="fa-brands fa-whatsapp"></i> +994 55 455 01 11</p>
                <p><i class="fa-solid fa-envelope"></i> <a class="text-primary" href="mailto:info@leylamc.az">info@leylamc.az</a></p>
                <p><i class="fa-brands fa-instagram"></i> <a href="https://www.instagram.com/pediatriya_leylamedicalcenter/?igsh=MTVpMm9kbHc4N2ptMQ%3D%3D#" target="_blank" class="text-primary">pediatriya_leylamedicalcenter</a></p>
                </div>
                <div class="contact-item mb-6">
                <h3 class="text-xl font-semibold mb-2">Leyla Medical Center Pediatriya 2</h3>
                <p><i class="fa-solid fa-location-dot"></i> <a class="text-primary" href="https://maps.app.goo.gl/fk5YXo2i6oMSwncu5" target="_blank" >Nərimanov rayonu, Məmməd Araz küç.47</a></p>
                <p><i class="fa-solid fa-phone"></i> *0101 və ya (+994 12) 490 21 31 // (+994 12) 490 18 58</p>
                <p><i class="fa-solid fa-mobile-screen"></i> (+994 50) 225 73 30 // (+994 50) 225 44 54</p>
                <p><i class="fa-brands fa-whatsapp"></i> +994 55 455 01 11</p>
                <p><i class="fa-solid fa-envelope"></i> <a class="text-primary" href="mailto:info@leylamc.az">info@leylamc.az</a></p>
                <p><i class="fa-brands fa-instagram"></i> <a class="text-primary" href="https://www.instagram.com/pediatriya_leylamedicalcenter/?igsh=MTVpMm9kbHc4N2ptMQ%3D%3D#" target="_blank">pediatriya_leylamedicalcenter</a></p>
                </div>
                <div class="contact-item mb-6">
                <h3 class="text-xl font-semibold mb-2">ReGen Baku Kök Hüceyrə mərkəzi</h3>
                <p><i class="fa-solid fa-location-dot"></i> <a class="text-primary" href="https://maps.app.goo.gl/NXFG3HEEtR4GHnmV8" target="_blank">Xətai rayonu, Yusif Səfərov küç.19</a></p>
                <p><i class="fa-solid fa-phone"></i> *0101 və ya (+994 12) 490 21 31 // (+994 12) 490 18 58</p>
                <p><i class="fa-solid fa-mobile-screen"></i> (+994 50) 225 73 30 // (+994 50) 225 44 54</p>
                <p><i class="fa-brands fa-whatsapp"></i> +994 55 455 01 11</p>
                <p><i class="fa-solid fa-envelope"></i> <a class="text-primary" href="mailto:info@leylamc.az">info@leylamc.az</a></p>
                <p><i class="fa-brands fa-instagram"></i> <a class="text-primary" href="https://www.instagram.com/regen_baku/?igsh=emFxYW5lZmcyd2Nr#" target="_blank">regen_baku</a></p>
                </div>
                <!-- CONTACTS END -->
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

import { useHead } from '@vueuse/head';
import { inject, ref, computed } from 'vue'; 

const contactInfo = inject('contactInfo', null);

// Əlaqə səhifəsi üçün SEO meta məlumatları
useHead({
  title: 'Əlaqə | Leyla Medical Center | Bütün filiallarımız',
  meta: [
    { 
      name: 'description', 
      content: 'Leyla Medical Center ilə əlaqə saxlayın. Bakıda yerləşən tibb mərkəzimizin ünvanları, telefon nömrələri və əlaqə vasitələri. Pediatriya filiallarımız və ReGen Baku Kök Hüceyrə mərkəzimizlə əlaqə məlumatları.' 
    },
    { 
      name: 'keywords', 
      content: 'leyla medical center əlaqə, tibb mərkəzi telefon, klinika ünvan, klinika xəritə, pediatriya mərkəzi, regen baku, kök hüceyrə mərkəzi' 
    },
    { 
      property: 'og:title', 
      content: 'Leyla Medical Center | Bizimlə Əlaqə Saxlayın' 
    },
    { 
      property: 'og:description', 
      content: 'Leyla Medical Center və bütün filiallarının əlaqə məlumatları, ünvanlar və telefon nömrələri. Bizə zəng edin, yazın və ya birbaşa ziyarət edin.' 
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/əlaqə' },
    { property: 'og:image', content: 'https://leylamc.com/images/contact-header.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Leyla Medical Center | Bizimlə Əlaqə Saxlayın' },
    { 
      name: 'twitter:description', 
      content: 'Leyla Medical Center və bütün filiallarının əlaqə məlumatları, ünvanlar və telefon nömrələri. Bizə zəng edin, yazın və ya birbaşa ziyarət edin.'
    },
    { name: 'twitter:image', content: 'https://leylamc.com/images/contact-header.jpg' },
    
    // Əlaqə səhifəsi üçün strukturlaşdırılmış məlumatlar
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        'name': 'Leyla Medical Center',
        'url': 'https://leylamc.com',
        'logo': 'https://leylamc.com/images/logo.png',
        'telephone': '+994-101',
        'email': 'info@leylamc.az',
        
        // Əsas filial
        'location': [
          {
            '@type': 'MedicalClinic',
            'name': 'Leyla Medical Center',
            'telephone': '+994-12-490-18-58',
            'image': 'https://leylamc.com/images/main-branch.jpg',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Yusif Səfərov küç. 19',
              'addressLocality': 'Bakı',
              'addressRegion': 'Xətai',
              'postalCode': 'AZ1025',
              'addressCountry': 'AZ'
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 40.3758,  // Bu koordinatları filialın dəqiq koordinatları ilə əvəz edin
              'longitude': 49.8347
            },
            'openingHoursSpecification': {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              'opens': '00:00',
              'closes': '24:00'
            },
          },
          {
            '@type': 'MedicalClinic',
            'name': 'Leyla Medical Center Pediatriya 1',
            'telephone': '+994-12-490-18-58',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Yusif Səfərov küç. 19',
              'addressLocality': 'Bakı',
              'addressRegion': 'Xətai',
              'postalCode': 'AZ1025',
              'addressCountry': 'AZ'
            }
          },
          {
            '@type': 'MedicalClinic',
            'name': 'Leyla Medical Center Pediatriya 2',
            'telephone': '+994-12-490-18-58',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Məmməd Araz küç. 47',
              'addressLocality': 'Bakı',
              'addressRegion': 'Nərimanov',
              'postalCode': 'AZ1025',
              'addressCountry': 'AZ'
            }
          },
          {
            '@type': 'MedicalClinic',
            'name': 'ReGen Baku Kök Hüceyrə mərkəzi',
            'telephone': '+994-12-490-18-58',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Yusif Səfərov küç. 19',
              'addressLocality': 'Bakı',
              'addressRegion': 'Xətai',
              'postalCode': 'AZ1025',
              'addressCountry': 'AZ'
            }
          }
        ],
        
        // Sosial media linkləri
        'sameAs': [
          'https://www.instagram.com/leylamedicalcenter/',
          'https://www.instagram.com/pediatriya_leylamedicalcenter/',
          'https://www.instagram.com/regen_baku/'
        ],
        
        // Əlaqə nöqtələri
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': '+994-101',
            'contactType': 'customer service',
            'availableLanguage': ['Azərbaycan dili', 'English', 'Русский']
          },
          {
            '@type': 'ContactPoint',
            'telephone': '+994-12-490-18-58',
            'contactType': 'customer service'
          },
          {
            '@type': 'ContactPoint',
            'telephone': '+994-50-225-73-30',
            'contactType': 'customer service'
          },
          {
            '@type': 'ContactPoint',
            'telephone': '+994-55-455-01-11',
            'contactType': 'customer service',
            'contactOption': 'WhatsApp'
          }
        ]
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/əlaqə' }
  ]
});
</script>

<style scoped>
.contact-item p {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}

.contact-item p i {
  margin-right: 0.5rem;
}
</style>