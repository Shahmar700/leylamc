<template>
    <div class="container mt-14 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ relationsTitle }}</h1>
                <p class="mt-4 text-xl font-thin text-justify" v-html="formattedRelationsText"></p>
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