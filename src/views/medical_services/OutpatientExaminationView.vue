<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Ambulator müayinə</h1>
                <ul v-for="(outpatient, index) in outpatients" :key="index" class="ml-7 list-decimal">
                    <li class="mb-1 text-base sm:text-lg">
                        {{ outpatient }}
                    </li>
                </ul>
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
import { ref } from "vue";

const outpatients = ref([
    'Terapevtik',
    'Oftalmotoloji',
    'Stomatoloji',
    'Fleboloji',
    'Travmotoloji',
    'Otolorinqoloji',
    'Dermatokosmetoloji',
    'Şua-diaqnostik',
    'Mammoloji',
    'Pediatrik',
    'Ginekoloji',
    'Uroloji-Androloji',
    'Dermatoloji',
    'Endokrinoloji',
    'Kardioloji',
    'Qastroenteroloji',
    'Nevroloji',
    'Allergik',
])

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>