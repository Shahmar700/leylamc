<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ relationsTitle }}</h1>
                <p class="mt-4 text-xl font-thin text-justify" v-html="formattedRelationsText"></p>
                <!-- <p class="text-base md:text-xl font-thin">Mərkəzimiz geniş profilli klinika olmaqla, həm ölkə daxilində, həm də xarici ölkələrlə qarşılıqlı əlaqədə çalışır.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Beynəlxalq miqyasda, qabaqcıl tibbi xidmət verən xəstəxanalarla korporativ əlaqələri çərçivəsində Leyla Medical Center mütəmadi olaraq xarici həkimlərlə pasiyentlərinin həm birbaşa, həm də onlayn konsultasiyasını təmin edir. Müraciətlərdən asılı olaraq Türkiyə, Belarus, Almaniya, Baltikyanı və s. ölkələrlə əlaqə yaradır, klinikanın həkimləri müraciət edən xəstə ilə birlikdə dünya səviyyəli mütəxəssislərdən müalicənin istiqamətləndirilməsi və təşkili ilə bağlı məsləhət alırlar. Xarici mütəxəssis və yerli peşəkarların birgə əməkdaşlığı çərçivəsində əldə edilən təcrübə vətəndaşlara yüksək səviyyədə tibbi xidmət göstərməyə imkan verir. Ölkəmizdə xüsusi ixtisaslar üzrə müalicə ala bilməyib, xarici ölkələrə müalicə üçün gedən pasiyentlərə dəstək olmaq məqsədilə “Referans Medical Group”la, Türkiyənin ''Anadolu Sağlık Merkezi” və Rusiyanın Sankt Peteburq şəhərində yerləşən «Институт мозга человека им. Н.П.Бехтеревой» arasında memorandum imzalandı.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Memoranduma əsasən, həmin klinikaların mütəxəssisləri mütəmadi olaraq Azərbaycana dəvət olunaraq “Referans Medical Group” daxilində fəaliyyət göstərən klinikalarda pasiyent qəbulları həyata keçirəcəklər.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Covid-19 virusunun yayılmağa başladığı ilk andan görülən preventiv tədbirlər siyahısında istər yerli, istərsə də xarici həkimlərin onlayn konsultasiya xidmətinə keçməsi də ən uğurlu tibbi qəbul metodlardan hesab olunur. Referans Medical Group tərkibindəki klinikalar şəbəkəsi (LEYLA Medical Center, Referans Laboratoriya Mərkəzi, Referans Poliklinikası, LOR Hospital, Səyyar Tibbi Xidmət Qatarı) vasitəsilə bu xidməti həyata keçirir.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Ətraflı məlumat üçün *0101 çağrı mərkəzi və +994775930033 əlaqə nömrəsi xidmətinizdədir.</p> -->
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <!-- GALLERY SIDE  -->
        <div class="mt-10">
           <!-- <GallerySection :images="images" /> -->
         </div>

        <Maps class="mt-24"/>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";


const relationsTitle = ref('');
const relationsText = ref('');

const fetchRelations = async () => {
    try{
        const response = await axios.get('http://bytexerp.online/api/leyla/v1/internationalrelation-list/');
        const relationsData = response.data.results[0];
        relationsTitle.value = relationsData.title;
        relationsText.value = relationsData.text;
    }catch(error){
        console.error('API çağırışında xəta:', error);
    }
}

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedRelationsText = computed(() => {
    return relationsText.value.replace(/\n/g, '<br>');
})

onMounted(() => {
    fetchRelations();
})



// import GallerySection from "@/components/GallerySection.vue";



// Gallery Images
// import gallery1 from "@/assets/images/gallery/gallery1.jpeg";
// import gallery2 from "@/assets/images/gallery/gallery2.jpg";
// import gallery3 from "@/assets/images/gallery/gallery3.jpg";
// import gallery4 from "@/assets/images/gallery/gallery4.jpg";

// const images = [
//   { src: gallery1, alt: 'Image 1' },
//   { src: gallery2, alt: 'Image 2' },
//   { src: gallery3, alt: 'Image 3' },
//   { src: gallery4, alt: 'Image 4' },
// ];
</script>

<style scoped>
p{
    text-align: justify;
}

</style>