<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Ginekologiya</h1>
                <p class="text-base sm:text-lg">Cənubi Qafqazın ilk Mamalıq və Ginekologiya Mərkəzi Leyla Medical Center- 2019- cu ildən etibarən fəaliyyətini daha mütəşəkkil əsaslarla - yeni ad, daha geniş xidmət çeşidi, daha peşəkar həkimlərlə davam etdirir. Ən müasir tibbi texnologiyalarla təchiz olunmuş Leyla Medical Center qabaqcıl dünya təcrübəsindən istifadə edərək, pasiyentlərinin məmnuniyyətini daha da artırmaq üçün dayanmadan, dinamik heyyətlə 24 saat fasiləsiz peşəkar tibbi xidmət göstərməkdədir. Leyla Medical Center-in Ginekologiya Şöbəsində təcrübəli, peşəkar həkimlər tərəfindən bütün ginekoloji əməliyyatlar icra edilir. Bura hər cür kiçik müdaxilələrdən tutmuş, total laparoskop, histerektomiya, vaginoplastika, labioplastika, arxa və ön kolporafiya, diaqnostik histereskopiya, laparoskopik miomektamiya, laparoktamiya, keysəriyyə və təbii doğuşa qədər bütün əməliyyatlar daxildir. Əlavə olaraq uro-ginekoloji, sidik qaçırma və s. əməliyyatlar aparılır.</p>
                <br>
                <p class="text-base sm:text-lg">Ginekologiya şöbəmizdə icra olunan müayinə, müalicə və əməliyyatlar:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Hamiləliyə nəzarət, yüksək riskli hamiləliyin izlənilməsi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Laparoskopik və histereskopik əməliyyatlar
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Uşaqlıq boynu patologiyaları müalicəsi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Sonsuzluğun diaqnostikası və müalicəsi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        İntim və vaginal plastika
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Obstetrik və Ginekoloji Ultrasəs müayinələr
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Abdominal əməliyyatların aparılması
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Təbii doğuş və keysəriyyə əməliyyatı
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qadınlarda menstrual tsikl problemləri, polikistik over sindromu, hormonal pozğunlugların diagnostikası
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Qadın sonsuzluğunun müayinə və müalicəsi, intrauterine inseminasiya(IUI), süni mayalanma (IVF)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Endometrium transplantologiyası və s.
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