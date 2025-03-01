<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Online nəticəni necə əldə etmək olar?
                </h1>
                <p class="mt-4 text-xl font-thin text-justify">Referans Medical Group olaraq daim pasiyent rahatlığını öz əsas prinsiplərimizdən biri hesab edirik. Pasiyentlərimizə təqdim etdiyimiz xüsusi xidmətlərdin biridə ONLİNE NƏTİCƏ xidmətidir, bununla nəticələrini əldə etmək üçün klinikaya üz tutmaya bilərsiz.</p>
                <br>
                <p class="mt-4 text-xl font-thin text-justify">Online Nəticə bölümündən necə faydalanmaq olar?</p>
                <br>
                <ol class="list-decimal">
                    <li class="ml-6 mt-4 text-xl font-thin text-justify">leylamc.az saytına daxil olursuz və online nəticə bölümünə keçir edirsiniz.</li>
                    <li class="ml-6 mt-4 text-xl font-thin text-justify">Daha sonra müraciət zamanı sizə təqdim olunan qəbz üzərində qeyd olunan SƏNƏD NÖMRƏSİNİ “Sənəd nömrəsi” hissəsinə daxil edirsiniz.</li>
                    <li class="ml-6 mt-4 text-xl font-thin text-justify">Doğum ilinizi (Gün və ay qeyd olunmadan) aidiyyattı xanaya daxil edin.</li>
                    <li class="ml-6 mt-4 text-xl font-thin text-justify">“Daxil olun” düyməsini basın.</li>
                </ol>
                <br>
                <img src="/assets/eResult.jpg" alt="">
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";
</script>

<style scoped>


</style>