<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Təcili tibbi yardım</h1>
                <p class="text-base sm:text-lg">Təcili və Təxirəsalmaz Tibbi yardım xidməti üzrə briqadamız 7 gün 24 saat ərzində əhaliyə yüksək səviyyədə diaqnostik-müalicəvi xidmək göstərmək istiqamətində çalışmaqdadır. Təcrübəli və dinamik tibbi heyətimiz hadisə yerində və ya xəstəxana şəraitində operativ olaraq xidmət göstərir. Ambulans maşınları ən müasir tibbi avadanlıqlarla təchiz olunmaqla ilkin tibbi yardımın daha effektiv olmasını təmin edir. Ev və ya mobil telefonlardan *0101 nömrəsinə zəng etməklə ambulans çağırışı həyata keçirmək mümkündür. Beynəlxalq standartlara uyğun olaraq Təcili və Təxirəsalmaz Tibbi yardım maşını 3 dəqiqə ərzində klinika ərazisini tərk edir. Bakı və Bakı ətrafı bölgələrdən olan çağırışlara 1 həkim, 2 tibb bacısı, sürücü və 2 porterdən ibarət heyətimiz ən qısa zamanda özünü çatdırmağa çalışır. Xüsusi reanimobil vasitəsiylə ən ağır xəstələrin evakuasiyası və klinikaya çatdırılması təmin olunur. Zərurət yarandığında xəstələrin bir sıra xarici ölkələrə təxliyyəsinə dair bütün tədbirlər klinikamız tərəfindən həyata keçirilir.</p>

                <div>
                    <a target="_blank" href="https://www.instagram.com/p/CeX12HQND_0/?utm_source=ig_web_copy_link"></a>
                    <a target="_blank" href="https://www.instagram.com/tv/CV2FkiFA9Bi/?utm_source=ig_web_copy_link"></a>
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