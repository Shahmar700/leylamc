<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class=" w-full sm:w-3/4">
                <CertificateImg :certificates_Img="certificates_Img" />
                <h1 class="text-main-text text-2xl lg:text-3xl my-6">Sertifikatlar</h1>
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
import certificates_Img from "@/assets/images/certificates-img.jpg"
import CertificateImg from "@/components/CertificateImg.vue";


import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style  scoped>


</style>