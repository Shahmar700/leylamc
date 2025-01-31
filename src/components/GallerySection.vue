<template>
    <div>
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
        <!-- <Modal v-if="isOpenModal" :isOpen="isOpenModal" :srcImg="currentImgSrc" @close="closeModal" /> -->
    </div>
</template>

<script setup>
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


</style>