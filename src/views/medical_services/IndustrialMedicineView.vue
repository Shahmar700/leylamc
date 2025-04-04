<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Sənaye təbabəti</h1>
                <p class="text-base sm:text-lg">Leyla Medical Center, sənaye müəssisələrində işçilərə təcili və planlaşdırılan peşəkar xidmətlər, eyni zamanda əmədaşların tibbi təhlükəsizliyinin təminatı və istehsal risklərinin azaldılması üçün xüsusi proqramların tərtibi , mövcud vəziyyəti təhlil etmək və müvafiq tədbirlərin keçirilməsinə yönəlmiş geniş xidmətlər təklif edir. Sənaye Təbabəti şöbəsinin iş prinsipinin mühüm bir hissəsi iş prosesində baş verə biləcək xəsarətlərin qarşısının alınmasına yönəldilmişdir.</p>
                <br>
                <p class="text-base sm:text-lg">İş şəraitində sağlamlığın təminatı</p>
                <br>
                <p class="text-base sm:text-lg">Bizim əsas məqsədimiz peşə xəstəlikləri riskinin qarşısını almaq və əməkdaşlar üçün etibarlı iş mühitini təmin etməkdir. Bu səbəbdən Sənaye Təbabəti bölümümüz bu qaydaların həyata keçirilməsində çox vacib rol oynayır.</p>
                <br>
                <p class="text-base sm:text-lg">İşlə əlaqədar xəsarətlər</p>
                <br>
                <p class="text-base sm:text-lg">İş yerində xəsarət alan əməkdaşlara təcili və müntəzəm tibbi yardım göstərməyə hazırıq. Bunun üçün ayrılmış xüsusi Təcili Tibbi Yardım briqadamız planlı və təcili hallarda qeyd olunan ünvana zamanında gələrək,operativ şəkildə lazimi diaqnostik və müalicəvi tədbirləri müasir protokollara uyğun həyata keçirəcək.</p>
                <br>
                <p class="text-base sm:text-lg">Check-Up müayinələr.</p>
                <br>
                <p class="text-base sm:text-lg">İşə qəbuldan öncə, məzuniyyət , xəstəlik sonrası və periodik aparılan müxtəlif check-up müayinələrlə əməkdaşların sağlamlıqlarının müntəzəm olaraq dəyərləndirilməsi mümkündür.Müayinə sonrası pasiyentlərə sağlamlıq statusu haqqında arayış təqdim olunur.</p>
                <br>
                <p class="text-base sm:text-lg">
                    Narkotik və alkoqol testləri
                </p>
                <p class="text-base sm:text-lg">
                    Narkotik və alkoqol qəbulunun nə qədər təhlükəli olduğunu və iş keyfiyyətinə təsir etdiyini nəzərə alaraq, təhlükəsiz bir iş mühitininin təmin edilməsi məqsədi ilə müştərilərin istəyi əsasında işçilərin işə qəbulu öncəsi və mütəmadi olaraq narko- və alko testlərinin aparılması mümkündür.
                </p>
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