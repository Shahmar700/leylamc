<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Travmatologiya</h1>
                <p class="text-base sm:text-lg">Mərkəzimizin Travmatologiya və ortopediya bölməsində böyük və kiçik həcmli zədələnmələrin həm diaqnostika həm də müalicəsini təşkil edirik. Kiçik həcmli zədələnmələrə artıq və təkrarlı yüklənmə ilə əlaqəli meydana çıxan “karpal tunnel sindromu, tenisçi dirsəyi” kimi patologiyalar aiddir. Bununla yanaşı, yıxılma və fiziki aktivlik nəticəsində yaranan çiyin, dirsək, əl, çanaq, diz, topuq ətrafı vətər və bağların gərilməsi, dartılması, yırtılması və sadə sınıqlar da aid olunur.</p>
                <br>
                <p class="text-base sm:text-lg">Görüş zamanı:</p>
                <p class="text-base sm:text-lg">Siz travmatologiya və ortopediya bölməmizə müraciət etdiyinizdə mərkəzimizin ortopedik cərrahi sizi tam tibbi müayinədən keçirəcəkdir. Biz fizikal müayinə icra edəcəyik və sizə şikayətlərinizi tam ifadə etməyinizə şərait yaradacağıq. Bununla yanaşı dayaq hərəkət sisteminizlə əlaqəli olan hərəkətlərin amplitudası, əzələ gücü, periferik sinirlərin necə işləməsini ölçən testlər aparacağıq.</p>
                <br>
                <p class="text-base sm:text-lg">Diaqnostik müayinələr:</p>
                <br>
                <ol class="list-decimal">
                    <li class="ml-7 list-disc">X-RAY (Rentgenoqrafiya)</li>
                    <li class="ml-7 list-disc">USM (Ultrasəs Müayinəsi)</li>
                    <ul>
                        <li class="ml-7 list-disc">Ehtiyac yarandığı təqdirdə kt, mrt, emg (elektromioqrafiya), sümük densitometriyası (dexa scanner) kimi müayinə metodlarına baş vura bilərik. </li>
                    </ul>
                </ol>
                <br>
                <p class="text-base sm:text-lg">Müalicə Meyarları</p>
                <br>
                <ol class="list-decimal">
                    <li>Qeyri-cərrahi müalicə metodları</li>
                    <ul>
                        <li class="text-base sm:text-lg">zədələnmələrin bir çoxu cərrahi müdaxiləyə ehtiyac duymadan müalicə oluna bilir. Məsələn bəzən dizdə ağrı və tutulma ilə müşahidə olunan artrtik patologiyalarin ilkin müalicəsi çəki itirilməsi və fiziki aktivlik proqramıdır. Bundan əlavə lokal inyeksiyalar və sarğılar bir çox hallarda ağrını aradan götürə bilir.
                        </li>
                    </ul>
                    <li>Cərrahi müalicə metodları</li>
                    <ul>
                        <li class="text-base sm:text-lg">hər növ travma (sınıq) cərrahiyyəsi</li>
                        <li class="text-base sm:text-lg">əl cərrahiyyəsi</li>
                        <li class="text-base sm:text-lg">artroplastika (bud-çanaq və diz oynağı protezləşdirilməsi)</li>
                        <li class="text-base sm:text-lg">artroskopik müadxilələr (meniskektomiya, ön çarpaz bağ rekonstruksiyası)</li>
                        <li class="text-base sm:text-lg">pediatrik ortopedik qüsurlarin cərrahiyyəsi və.s</li>
                    </ul>
                </ol>
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