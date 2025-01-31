<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Keyfiyyət siyasəti</h1>
                <p class="text-base sm:text-lg">Mərkəzimizin pasientlərinə, həmçinin korporativ müştərilərinə yüksək keyfiyyətli müxtəlif tibbi xidmətlərin göstərilməsinin təmin edilməsi və personalın əməyinin effektivliyinin yüksəldilməsinə doğru yönəlmişdir.</p>
                <ul class="ml-7">
                    <h4 class="text-lg lg:text-xl font-extrabold my-4">Mərkəzimizin siyasətinin əsas prinsipləri:</h4>
                    <li class="mb-2 text-base sm:text-lg font-extrabold">
                        Müştəri yönümlülük
                        <p class="font-normal text-base sm:text-lg">müştərilərlə aktiv qarşılıqlı əlaqə quraraq göstərilən tibbi xidmətlərin yüksək səviyyəli xidmətini təmin edərək müştərilərimizin tələb və gözləntilərini mümkün qədər təmin etməyə çalışırıq;</p>
                    </li>
                    <li class="mb-2 text-base sm:text-lg font-extrabold">
                        Rəhbərlik və cəlb olunmuş heyət
                        <p class="font-normal text-base sm:text-lg">ali rəhbərlik keyfiyyət sahəsində məqsədlərini və onların idarə olunmasını, eləcə də onlara nail olmaqda personalın cəlb olunmasını təmin edir;</p>
                    </li>
                    <li class="mb-2 text-base sm:text-lg font-extrabold">
                        Professionallıq
                        <p class="font-normal text-base sm:text-lg">ali rəhbərlik müntəzəm monitorinq əsasında işçilərin peşəkar səviyyəsinin davamlı olaraq yüksəldilməsini təmin edir;</p>
                    </li>
                    <li class="mb-2 text-base sm:text-lg font-extrabold">
                        Prosesli yanaşma
                        <p class="font-normal text-base sm:text-lg">göstərilən xidmətlərin keyfiyyətinin idarə edilməsi-xidmətlərin formalaşmasında iştirak edən hər bir biznes prosesinin effektivliyinin təmin edilməsinə və biznes proseslərinin müəyyən edilmiş meyarlara uyğunluğunun daimi monitorinqinə əsaslanır;</p>
                    </li>
                    <li class="mb-2 text-base sm:text-lg font-extrabold">
                        Daimi təkmilləşdirilmə
                        <p class="font-normal text-base sm:text-lg">proseslərin fasiləsiz təkmilləşdirilməsi, risklərin qiymətləndirilməsi, təqdim olunan xidmətlərin müəyyən edilmiş meyarlara uyğunluğunun qiymətləndirilməsi, korreksiya hərəkətlərinin işlənib hazırlanması, həmçinin müştərilərin cari və yeni yaranan tələbatlarının öyrənilməsinin nəticələrinə əsaslanaraq innovasiyaların tətbiqi ilə təmin edilir;</p>
                    </li>
                </ul>
                <p class="text-base sm:text-lg mt-4">Ali rəhbərlik yuxarıda sadalanan prinsiplərə əsaslanan keyfiyyət idarəetmə sisteminin daimi təkmilləşdirilməsini təmin edir və hər gün müştərilərin tələbatını ödəməyə çalışan həmfikirlərdən ibarət komandanı formalaşdırır, həmçinin keyfiyyət sahəsində siyasət və məqsədlərin aktual vəziyyətdə olmasını öhdəsinə götürür.</p>
                <p class="text-base sm:text-lg mt-4">Leyla Medical Center ISO 9001:2015 beynəlxalq standartına uyğun menecment sisteminin tətbiqi yolu ilə yuxarıda göstərilənlərə nail olmağa çalışır. Klinika həmçinin müştərilərimizin tələblərinə cavab vermək, müştəri rəylərini, eləcə də qanunvericilik və normativ aktlarını öyrənmək öhdəliyini əhatə edir.</p>
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