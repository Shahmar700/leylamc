<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Oftalmologiya</h1>
                <p class="text-base sm:text-lg">Oftalmalogiya şöbəmizdə göz və görmə ilə bağlı bütün xəstəliklərin müayinəsi və müalicəsi aparılır. Şöbəmiz ən müasir avadanlıqlarla təhciz olunmuşdur və yüksək ixtisaslı təcrübəyə malik həkimlərdən ibarətdir.</p>
                <br>
                <p class="text-base sm:text-lg">Fəaliyyət sahələri:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Diabetik retinopatiyanın müalicəsi.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qlaukomanın (Qara su) müalicəsi.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Üveitlərin diaqnostikası və müalicəsi.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Yaşa bağlı Makula Degenerasiyasının müalicəsi.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Torlu qişanın vaskulyar ve digər xəstəlikləri (arteriya və vena trombozu və.s).
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Tiroid Oftalmopatiyası.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Gözün infeksiyon xəstəliklərinin müalicəsi (konyuktivit, keratit və.s).
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Keratokonuslarda sərt ve yumşaq kontakt linzalar ilə korreksiya.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Buynuz qişa xəstəlikləri.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Lazer proseduraları (Argon, Yag, Diod).
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Uşaq və yetişkinlərdə refraksiya.
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Vaxtından əvvəl doğulmuş uşaqların ROP müayinəsi və müalicəsi
                    </li>
                </ul>
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