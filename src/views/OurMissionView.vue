<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Missiyamız</h1>
                <ul class="ml-7">
                    <li class="mb-2 text-base sm:text-lg">Əhalinin sağlamlığının yaxşılaşdırılmasına, səhiyyə sisteminin inkişafına və bu sahəyə olan etimadın daha da gücləndirilməsinə dəstək olmaq.</li>
                    <li class="mb-2 text-base sm:text-lg">Reproduktiv sağlamlıq strateqiyasını yaxşılaşdırmaq.</li>
                    <li class="mb-2 text-base sm:text-lg">Əsasən Cərrahiyə, Mama-ginekologiya, Pediatriya ve Neonatologiya sahələri üzrə yüksək səviyyədə referans müayinə və müalicə metodlarını araşdırılmaq və yeni tibbi texnologiyaları tətbiq etmək.</li>
                    <li class="mb-2 text-base sm:text-lg">Ölkə daxilində aparılmayan bütün laborator xidmətlərin yerli bir laboratoriyada aparılmasını təmin etmək.</li>
                    <li class="mb-2 text-base sm:text-lg">Səhiyyə xidmətlərinin keyfiyyətini dinamik şəkildə artırmaq.</li>
                    <li class="mb-2 text-base sm:text-lg">Pasiyentlərimizin ehtiyaclarına uyğun yüksək keyfiyyətli laborator və poliklinik xidmətlər göstərmək.</li>
                    <li class="mb-2 text-base sm:text-lg">Tibbi kadrların ixtisaslarının artırılması sahəsində islahatlar, onların sertifikasiyası və rezidenturanı tətbiq etmək</li>
                    <li class="mb-2 text-base sm:text-lg">Pasiyentlərimizin bizə olan inamını qorumaq və onların daimi məmnuniyyətini təmin etmək.</li>
                    <li class="mb-2 text-base sm:text-lg">Keyfiyyət sahəsində müəyyənləşdirilmiş məqsədlərin davamlı izlənilməsini təmin etmək və keyfiyyəti hər zaman ön planda tutmaqla, idarəetmə sisteminin effektivliyini artırmaq.</li>
                    <li class="mb-2 text-base sm:text-lg">Aparılan müasir testlər haqqında mütəmadi şəkildə həkimləri və geniş ictimaiyyəti məlumatlandırmaq.</li>
                    <li class="mb-2 text-base sm:text-lg">Beynəlxalq ictimaiyyətə tanınmaq istiqamətində fundamental addımlar atmaq.</li>
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
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>