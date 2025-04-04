<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Laboratoriya</h1>
                <p class="text-base sm:text-lg">“LEYLA MEDİCAL CENTER”-in Laboratoriyası müasir texnologiyaları özündə cəmləşdirən, Almaniya, Yaponiya, ABŞ və Avropanın istehsalı olan referans cihazlarla təchiz olunmuşdur. Bu cihazlar vasitəsilə laboratoriyamızda yüzlərlə analizlər, o cümlədən müxtəlif biokimyəvi testlər, hormonlar, onkoloji markerlər və s. yerinə yetirilir. Müayinələr müasir biokimyəvi analiz metodlarını özündə cəmləşdirən rəhbərliklər və CLSI (Clinical Laboratory Standarts Institute) standartları əsasında icra olunur. Qurulduğu gündən etibarən dünya laboratoriya sektorundakı yenilikləri təqib və təşkil etmək üçün bütün vasitələrdən istifadə olunur.</p>
                <br>
                <p class="text-base sm:text-lg">Daim inkişaf edən özəl müəssisə kimi “LEYLA MEDİCAL CENTER”- in tam avtomatlaşdırılmış Klinik Diaqnostik Laboratoriyasının istər orta tibb personalı, istərsə ali tibb mütəxəssisləri yüksək peşəkarlıq və bacarıqları ilə hər zaman nümunə olmağa davam edəcək.</p>
                <br>
                <p class="text-base sm:text-lg">Laboratoriyamızda aşağıdakı bölmələr fəaliyyət göstərir:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        KLİNİK BİOKİMYA
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        İMMUNOLOGİYA
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        HEMATOLOGİYA
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        MOLEKULYAR GENETİKA
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        PZR
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Molekulyar identifikasiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        KLİNİK MİKROBİOLOGİYA
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Bakteriologiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Mikologiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Virusologiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Parazitologiya
                    </li>
                </ul>
                <br>
                <p class="text-base sm:text-lg">Sizin sağlamlığınız- bizim dəyərimizdir!</p>
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
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>