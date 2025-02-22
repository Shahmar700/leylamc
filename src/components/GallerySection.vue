<template>
    <div>
        <button class="greenBtn cursor-pointer mb-4">Qalereya</button>
        <div class="w-full grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <img 
            v-for="(image, index) in images"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            class="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-101 rounded-xl w-full h-[245px] object-cover"
            @click="openModal(image.src)"
            >
        </div>
        <Modal v-if="isOpenModal" :isOpen="isOpenModal" :srcImg="currentImgSrc" @close="closeModal" />
    </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue";

// Open Images in Modal 
import { ref, defineProps } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const isOpenModal = ref(false);
const currentImgSrc = ref('');

const openModal = (src) => {
  currentImgSrc.value = src;
  isOpenModal.value = true;
};

const closeModal = () => {
  isOpenModal.value = false;
};
</script>

<style scoped>
</style>