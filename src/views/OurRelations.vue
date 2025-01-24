<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">Beynəlxalq əlaqələrimiz
                </h1>
                <p class="text-base md:text-xl font-thin">Mərkəzimiz geniş profilli klinika olmaqla, həm ölkə daxilində, həm də xarici ölkələrlə qarşılıqlı əlaqədə çalışır.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Beynəlxalq miqyasda, qabaqcıl tibbi xidmət verən xəstəxanalarla korporativ əlaqələri çərçivəsində Leyla Medical Center mütəmadi olaraq xarici həkimlərlə pasiyentlərinin həm birbaşa, həm də onlayn konsultasiyasını təmin edir. Müraciətlərdən asılı olaraq Türkiyə, Belarus, Almaniya, Baltikyanı və s. ölkələrlə əlaqə yaradır, klinikanın həkimləri müraciət edən xəstə ilə birlikdə dünya səviyyəli mütəxəssislərdən müalicənin istiqamətləndirilməsi və təşkili ilə bağlı məsləhət alırlar. Xarici mütəxəssis və yerli peşəkarların birgə əməkdaşlığı çərçivəsində əldə edilən təcrübə vətəndaşlara yüksək səviyyədə tibbi xidmət göstərməyə imkan verir. Ölkəmizdə xüsusi ixtisaslar üzrə müalicə ala bilməyib, xarici ölkələrə müalicə üçün gedən pasiyentlərə dəstək olmaq məqsədilə “Referans Medical Group”la, Türkiyənin ''Anadolu Sağlık Merkezi” və Rusiyanın Sankt Peteburq şəhərində yerləşən «Институт мозга человека им. Н.П.Бехтеревой» arasında memorandum imzalandı.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Memoranduma əsasən, həmin klinikaların mütəxəssisləri mütəmadi olaraq Azərbaycana dəvət olunaraq “Referans Medical Group” daxilində fəaliyyət göstərən klinikalarda pasiyent qəbulları həyata keçirəcəklər.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Covid-19 virusunun yayılmağa başladığı ilk andan görülən preventiv tədbirlər siyahısında istər yerli, istərsə də xarici həkimlərin onlayn konsultasiya xidmətinə keçməsi də ən uğurlu tibbi qəbul metodlardan hesab olunur. Referans Medical Group tərkibindəki klinikalar şəbəkəsi (LEYLA Medical Center, Referans Laboratoriya Mərkəzi, Referans Poliklinikası, LOR Hospital, Səyyar Tibbi Xidmət Qatarı) vasitəsilə bu xidməti həyata keçirir.</p>
                <br>
                <p class="text-base md:text-xl font-thin">Ətraflı məlumat üçün *0101 çağrı mərkəzi və +994775930033 əlaqə nömrəsi xidmətinizdədir.</p>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <!-- GALLERY SIDE  -->
         <div class="mt-10">
            <button class="greenBtn cursor-pointer mb-4">Qalereya</button>
            <div class="w-full grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               <img 
               v-for="(image, index) in images"
               :key="index"
               :src="image.src"
               :alt="image.alt"
               class="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-101 rounded-xl"
               @click="openModal(image.src)"
               >
            </div>
            <Modal v-if="isOpenModal" :isOpen="isOpenModal" :srcImg="currentImgSrc" @close="closeModal" />
         </div>

        <Maps class="mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import Modal from "@/components/Modal.vue";

// Open Images in Modal 
import { ref } from "vue";

const isOpenModal = ref(false);
const currentImgSrc = ref('');

const openModal = (src) => {
  currentImgSrc.value = src;
  isOpenModal.value = true;
};

const closeModal = () => {
  isOpenModal.value = false;
};

// Gallery Images
import gallery1 from "@/assets/images/gallery/gallery1.jpeg";
import gallery2 from "@/assets/images/gallery/gallery2.jpg";
import gallery3 from "@/assets/images/gallery/gallery3.jpg";
import gallery4 from "@/assets/images/gallery/gallery4.jpg";

const images = ref([
  { src: gallery1, alt: 'Image 1' },
  { src: gallery2, alt: 'Image 2' },
  { src: gallery3, alt: 'Image 3' },
  { src: gallery4, alt: 'Image 4' },
]);
</script>

<style scoped>
p{
    text-align: justify;
}

</style>