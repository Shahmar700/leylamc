<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Korporativ əməkdaşlıq</h1>
                <div class="flex flex-wrap gap-5">
                    <div v-for="(image, index) in corpImgs" :key="index" >
                    <img :src="image" alt="" class="w-[150px] h-[150px]">
                </div>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import { ref } from "vue";

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

import SeaPort from "@/assets/images/cooperation/SeaPort.png"
import STP from "@/assets/images/cooperation/STP.png"

const corpImgs = ref([SeaPort, STP]);
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>