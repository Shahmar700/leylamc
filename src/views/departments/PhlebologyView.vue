<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Flebologiya</h1>
                <p class="text-base sm:text-lg">Flebologiya şöbəmiz peşəkar həkim kollektivi ilə xidmətinizdədir.</p>
                <br>
                <p class="text-base sm:text-lg">Şöbənin müalicə və müayinə istiqamətləri:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Aşağı ətraf venalarının varikoz xəstəliyi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Tromboflebit, Posttromboflebitik sindrom
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Diabetik ayaq sindromu
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Xroniki yaralar (diabetik yaralar, arterial və venoz yaralar, yataq yaralar və s.)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Endovenoz lazer abblasiya, skleroterapiya, miniflebektomiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Podiatriya və s.
                    </li>
                </ul>
                <br>
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
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>