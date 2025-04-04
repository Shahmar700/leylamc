<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Vizyonumuz</h1>
                <p class="mt-4 text-xl font-thin text-justify">Məqsədimiz Azərbaycan səhiyyəsində prioritet sahələr üzrə yeni innovasiyaları müalicə metodlarına tətbiq etmək, ən son tibbi texnologiyalardan istifadə etməklə sağlamlıq sektorunda marka yaratmaq, qazandığımız uğurları dünya səhiyyə sisteminə inteqrasiya etmək, yerli və xarici vətəndaşlara yüksək səviyyədə diaqnostik və müalicə xidmətləri göstərməkdir.</p>
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
</script>

<style scoped>


</style>