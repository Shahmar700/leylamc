<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">Ümumi cərrahiyyə</h1>
                <p class="text-base sm:text-lg">“Leyla Medical Center”-in əməliyyat bloku ən son və yüksək keyfiyyətə malik müasir avadanlıqlarla təmin olunmuş əməliyyat otaqlarından ibarətdir. Klinikamızın əməliyyat blokunda parallel olaraq 6 əməliyyat icra etmək mümkündür. Pasiyentlərimizə əməliyyatdan öncə və sonra peşəkar tibbi yardım göstərmək üçün geniş, tam təhciz olunmuş, təcrübəli heyətə malik olan reanimasiya və stasionar şöbə fəaliyyat göstərir. 24 saat ərzində pasiyentin bütün həyatı göstəriciləri daimi nəzarət altında saxlanılır. Əməliyyatxanada və cərrahiyyə şöbəsində fasiləsiz olaraq peşəkar mütəxəssislərdən ibarət heyət çalışır. Anesteziologiyada istifadə olunan avadanlıq və dərman preparatları ən müasir standartlara uyğundur. Klinikamızda ixtisaslaşmış həkimlər tərəfindən kiçik və iri həcmli müxtəlif növ əməliyyatlar icra olunmaqdadır. Ümumi cərrahiyyə şöbəsində uğurla öd kisə və öd yolları cərrahiyyəsi, mədə-bağırsaq cərrahiyyəsi, endokrin və bariatrik cərrahiyyə, yırtıqların bərpa olunması, mədəaltı vəz cərrahiyyəsi, fleboloji və çox sayda digər, o cümlədən ağır dərəcəli əməliyyatlar icra olunmaqdadır. Cərrahiyyə blokunun müasir avadanlığından və cərrahlarımızın peşəkarlığından yararlanaraq bütün əməliyyatlar ən yeni üsullarla, istər laparoskopik,lazer və mikroskopla, istərsə də açıq və klassik yollarla həyata keçirilir. Əməliyyatlar ən müasir yollarla aparıldıqından pasiyentlərin bərpası daha az vaxt çəkir. Əməliyyat texnika və üsullarının təkmilləşdirmək məqsədi ilə, həkimlərimiz və orta tibb personalı daima xarici ölkələrə səfər edir, dünyanın böyük tibbi mərkəzləri ilə təcrübə mübadiləsi aparır.</p>
                <br>
                
                
                <br>
                <div>
                    <a target="_blank" href="https://www.instagram.com/p/CeaarG4IOul/?utm_source=ig_web_copy_link"></a>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <!-- GALLERY SIDE  -->
        <div class="mt-10">
           <GallerySection :images="images" />
         </div>

        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";
import GallerySection from "@/components/GallerySection.vue";


// Gallery General Surgery 
import gs1 from "@/assets/images/general_surgery/gs1.jpg"
import gs2 from "@/assets/images/general_surgery/gs2.jpg"

const images = [
  { src: gs1, alt: 'Image 1' },
  { src: gs2, alt: 'Image 2' },
  { src: gs1, alt: 'Image 3' },
  { src: gs2, alt: 'Image 4' },
];
</script>

<style scoped>
ul{
    list-style: disc;
}

</style>