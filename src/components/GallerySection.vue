<template>
  <div>
      <button class="greenBtn cursor-pointer mb-4">Qalereya</button>
      <div v-if="normalizedImages.length > 0" class="w-full grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <img 
          v-for="(image, index) in normalizedImages"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          class="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-101 rounded-xl w-full h-[245px] object-cover"
          @click="openModal(image.src)"
          >
      </div>
      <div v-else class="text-center text-gray-500">Bu xəbərə aid şəkillər yoxdur</div>
      <Modal v-if="isOpenModal" :isOpen="isOpenModal" :srcImg="currentImgSrc" @close="closeModal" />
  </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { ref, defineProps, computed } from "vue";

const props = defineProps({
images: {
  type: Array,
  required: true
}
})

// Gələn şəkil datasını normallaşdıran computed property
const normalizedImages = computed(() => {
return props.images.map(image => {
  // Əgər image artıq bir obyektdirsə, olduğu kimi qaytarırıq
  if (typeof image === 'object' && image !== null && image.src) {
    return image;
  }
  
  // Əgər image bir string (URL) isə, obyektə çeviririk
  if (typeof image === 'string') {
    return {
      src: image,
      alt: 'Qalereya şəkli'
    };
  }
  
  // Digər hallar üçün default
  return {
    src: '',
    alt: 'Şəkil yüklənə bilmədi'
  };
});
});

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