<template>
    <div class="container mt-16">
        <h1 class="text-3xl text-main-text">Tariximiz</h1>
        <div class="mt-14">
            <div class="">
                <HistoryContent 
                :dotImg="greenDot"
                year="1999"
                heading="1999 başlanğıc"
                info="Leyla Şıxlinskaya Klinikasının əsası ulu öndər Heydər Əliyev tərəfindən qoyuldu."
                data-aos="fade-up"
                data-aos-delay="100"
                />
                <HistoryContent 
                :dotImg="greenDot"
                year="2019"
                heading="Klinika yenidən quruldu"
                info="Klinika yenidən quruldu və Leyla Medical Center adı ilə fəaliyyətə başladı. Yeni ad, daha geniş xidmətlər və daha peşəkar həkimlər mərkəzin əsas tərkib hissəsi oldu."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="2019-2020-ci illər"
                prog1="Beynəlxalq keyfiyyətə nəzarət proqramları tətbiq olundu."
                prog2="Yeni şöbələr yaradıldı və müasir avadanlıqlar tətbiq edilməyə başlandı."
                prog3="Sənaye Tibbi Xidmətinin inkişafı üçün ciddi addımlar atıldı."
                prog4="Təcili Tibbi Yardım Xidmətləri beynəlxalq və yerli standartlara uyğun olaraq təşkil olundu."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="Mart 2020-ci il"
                prog1="Xüsusi karantin rejimi və pandemiya ilə əlaqədar olaraq virusun yayılma riskini azaltmaq üçün mühüm addımlar atıldı."
                prog2="Dövlət tərəfindən başladılan sosial aksiyalara dəstək verildi."
                data-aos="fade-up"
                data-aos-delay="200"
                />
                <HistoryContent 
                :dotImg="greenDot"
                :tickImg="greenTick"
                year="2020"
                heading="Aprel 2020-ci il"
                prog1="Könüllü qanvermə aksiyası keçirildi."
                prog2="Aksiyada toplanan qanlar qan xəstəliklərindən əziyyət çəkən uşaqlara yardım etmək məqsədilə istifadə olundu."
                prog3="Bu aksiyaya görə AR Birinci Vitse-Prezidenti Mehriban Əliyeva tərəfindən təşəkkür alındı."
                data-aos="fade-up"
                data-aos-delay="200"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import greenDot from "@/assets/icons/green-dot.svg"
import greenTick from "@/assets/icons/green-tick.svg"

import HistoryContent from "@/components/HistoryContent.vue";
</script>

<style scoped>
.historyYear{
    position: relative;
}
/* .historyYear::before{
    content: '';
    position: absolute;
    width: 3px;
    height: 150%;
    background-color: #83B52B;
    top: -30%;
    right: -50px;
} */
</style>
