<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class=" w-full sm:w-3/4">
                <CertificateImg :qualityCertImg="quality_certificate" />
                <h1 class="text-main-text text-2xl lg:text-3xl my-6 font-medium">Keyfiyyətə Nəzarət</h1>
                <p class="font-normal text-base sm:text-lg mt-4">"İntertek Azeri LTD" MMC tərəfindən Mərkəzimizdə keçirilən Beynəlxalq Standarta uyğunluq üzrə audit nəticəsində ISO 9001:2015 sertifikatına layiq görüldük❗</p>
                <p class="font-normal text-base sm:text-lg mt-4">22 illik fəaliyyətimiz çərçivəsində əsas məqsədimiz əhalinin sağlamlığının yaxşılaşdırılmaq, səhiyyə sisteminin inkişafına və bu sahəyə olan etimadın daha da gücləndirilməsinə dəstək olmaqdır. Eyni zamanda, reproduktiv sağlamlıq strateqiyasını yaxşılaşdırmaqla yanaşı, Azərbaycan səhiyyəsində prioritet sahələr üzrə yeni innovasiyaları və müalicə metodlarını tətbiq etmək, ən son tibbi texnologiyalardan istifadə etməklə sağlamlıq sektorunda marka yaratmaq, qazandığımız uğurları dünya səhiyyə sisteminə inteqrasiya etmək, yerli və xarici vətəndaşlara yüksək səviyyədə diaqnostik və müalicə xidmətləri göstərməkdir.</p>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import CertificateImg from "@/components/CertificateImg.vue";
import quality_certificate from "@/assets/images/quality-certificate.jpg"

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>
