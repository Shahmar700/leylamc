<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center sm:justify-between">
            <div class="w-full sm:w-3/4">
                <h1 class="text-main-text text-2xl lg:text-3xl my-6">Təlim Mərkəzi</h1>
                <p class="font-normal text-base sm:text-lg mt-4">Referans Medical Group daxilində fəaliyyət göstərən Leyla Medical Center yeni bir uğura imza atdı.</p>
                <p class="font-normal text-base sm:text-lg mt-4">Amerika Ürək Assosiasiyasının (AHA) akkreditasiyasını rəsmi olaraq 2022-ci ilin 3 iyun tarixindən almış olduq və bu barədə ikitərəfli müqaviləyə imza atdıq. Bu işin ərsəyə gəlməsi sistematik auditlərdən sonra baş vermişdir.</p>
                <p class="font-normal text-base sm:text-lg mt-4">Biz cəmiyyətdə səhiyyə işcilərinə və səhiyyədən kənar insanlara Amerika Ürək Assosiasiyasının (AHA) Beynəlxalq sertifikatlaşdırılmış İlk Yardım, CPR, Əsas Həyat Dəstəyi (BLS) təlim kurslarınə təmin edirik və AHA rəsmi Beynaxalq sertifikatını veririk.</p>
                <p class="font-normal text-base sm:text-lg mt-4">Həmçinin mərkəzimiz müxtəlif təlim proqramları, seminarlar, simpoziumlar, görüşlər və digər əlaqəli tədbirlər keçirmək, Azərbaycan ictimaiyyətində müxtəlif səhiyyə işçilərinin peşə və təhsil bacarıqlarını davamlı təkmilləşdirmək üçün təşkil edilmişdir.</p>
                <h4 class="font-bold text-base sm:text-lg my-4">Təcrübəli İnstruktorlar:</h4>
                <p class="font-normal text-base sm:text-lg mt-4">Bizim instruktorlar keyfiyyətli İlk Yardım/CPR/BLS təhsilini keçirən təcrübəli, sertifikatlı İlk Yardım təlimi mütəxəssisləridir.</p>
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
