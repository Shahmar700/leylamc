<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Uşaq sağlamlıq mərkəzi</h1>
                <p class="text-base sm:text-lg">Leyla Medical Center Uşaq sağlamlıq mərkəzi, 7/24 sizə xidmət edən mükəmməl Pediatr heyəti və ən müasir standartlara cavab verən avadanlıqlarla təchiz edilmiş, stasionar, ambulator, reanimasiya, neanotologiya və poliklinik şöbələrdən ibarətdir. Mərkəzimizin xarici ölkələrdən ixtisaslaşmış həkimləri, bütün növ pediatrik xəstəliklərin beynəlxalq protokollara uyğun, müayinə, diaqnostika və müalicəsini həyata keçirir. Mərkəzimizin stasionar şöbəsinin gecə və gündüz növbəsində çalışan peşəkar həkim və tibb bacısı heyəti xəstəxanada yataraq müalicə alan pasientlərə maksimum qayğı və diqqət göstərməkdədir. Pediatrik poliklinikamızda Azərbaycan Respublikası Səhiyyə nazirliyi tərəfindən təyin edilmiş dövlət vaksinasiya programına uyğun bütün növ planlı peyvəndlər, evdə müayinə, patronajlar, sağlam uşaqların aylıq müayinəsi, ən münasib və geniş pediatrik “check up“ paketlərinə daxil olan bütün növ labarator və instrumental müayinələr həyata keçirilir.</p>
                <br>
                <p class="text-base sm:text-lg">Ən dəyərlilərinizi bizə etibar etdiyiniz üçün sizə mərkəzimiz adından təşəkkür edirik!</p>
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