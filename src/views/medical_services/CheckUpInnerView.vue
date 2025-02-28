<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ checkup.checkupName }}</h1>
                <img :src="checkup.img" :alt="checkup.checkupName" class="w-full h-auto rounded-md mb-4">
                <p class="text-base sm:text-lg mt-2">Başlanğıc tarixi: {{ checkup.startDate }}</p>
                <p class="text-base sm:text-lg mt-2">Bitmə tarixi: {{ checkup.finish_date }}</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Həkim konsultasiyası
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Sidiyin ümumi analizi 
                    </li>
                </ul>
                <br>
                <p class="text-base sm:text-lg">-Öncədən qeydiyyat mütləqdir!</p>
                <div>
                    <a target="_blank" href="https://www.instagram.com/p/CeaarG4IOul/?utm_source=ig_web_copy_link"></a>
                </div>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

import checkup1 from "@/assets/images/checkups/checkup1.jpg";
import checkup2 from "@/assets/images/checkups/checkup2.jpg";
import checkup3 from "@/assets/images/checkups/checkup3.jpg";

const checkups = [
    { id: 1, img: checkup1, checkupName: 'Terapevtik check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 2, img: checkup2, checkupName: 'Kardioloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 3, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '20.02.2025', },
    { id: 4, img: checkup3, checkupName: 'Terapevtik check up', startDate: '15.02.2025', finish_date: '20.02.2025', },
    { id: 5, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 6, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 7, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 8, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 9, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 10, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 11, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 12, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 13, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
    { id: 14, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', finish_date: '28.02.2025', },
];

const route = useRoute();

const checkup = computed(() => {
    return checkups.find(checkup => checkup.id === parseInt(route.params.id));
});
</script>

<style scoped>
ul{
    list-style: disc;
}
</style>