<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Oftalmologiya</h1>
                <p class="text-base sm:text-lg">Otorinolarinqologiya şöbəmiz qulaq, boğaz və burun xəstəliklərinin düzgün müayinə və müalicələri ilə xidmətinizdədir. Şöbəmizin ən son tibbi avadanlıqlarla təchiz olunmuşdur.</p>
                <br>
                <p class="text-base sm:text-lg">Qulaq Burun Boğaz şöbəsində müalicə edilən xəstəliklər:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Yenidoğulmuşlarda eşitmə screening testi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qulaq infeksiyaları
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Baş gicəllənməsi (VERTİGO)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qulaqda küy və xoşagəlməz səslər
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Sinusit
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Rinitlər (allergik, vazomator, mövsümi, atrofik və s)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qoxu alma qüsurları
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Nazal polipoz
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Burun qanamaları
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Burun tıxanıqlığı
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Kəskin və Xroniki tonzillit
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Xroniki və kəskin faringit
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Xroniki və kəskin laringit 
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Səs qüsurları
                    </li>
                </ul>
                <br>
                <p class="text-base sm:text-lg">Qulaq Burun Boğaz şöbəsində həyata keçirilən cərrahi xidmətlər:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Burun çəpəri əyriliyi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Burun balıqqulaqlarında aparılan əməliyyatlar
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Adenoidektomiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        FESC (Funksional Endoskopik sinus cərrahiyyəsi)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Tonzillektomiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Xoruldama cərrahiyyəsi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Gözyaşı kanalı tıxanıqlığı
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Timpanoplastika (Qulaq pərdəsi təmiri)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Təpil pərdəsinə ventilyasyon tüpün taxılması (orta qulaqda maye toplanması və adheziv otitlərdə)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Otoplastika
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qulaq seyvanından xoşxasssəli törəmələrin götürülməsi (keloid, lipoma və s)
                    </li>
                </ul>
                <br>
                <div>
                    <a class="text-primary" target="_blank" href="https://www.instagram.com/tv/CcVmEOcq7eD/?utm_source=ig_web_copy_link">https://www.instagram.com/tv/CcVmEOcq7eD/?utm_source=ig_web_copy_link</a>
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