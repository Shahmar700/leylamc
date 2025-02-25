<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Əlaqə</h1>
                <!-- CONTACTS -->
                <div class="contact-item mb-6">
                <h3 class="text-xl font-semibold mb-2">Leyla Medical Center</h3>
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