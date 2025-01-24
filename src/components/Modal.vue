<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3">
      <div class="px-8 py-14 border relative">
            <button @click="closeModal" class="text-main-text font-bold text-xl rounded absolute top-3 right-10"><i class="fa-solid fa-x"></i></button>
        <iframe v-if="videoUrl" :src="videoUrl" class="w-full h-80 rounded-3xl" frameborder="0" allowfullscreen></iframe>
        <img v-else-if="srcImg" :src="srcImg" class="w-full h-80 rounded-3xl object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['close'])
const closeModal = () => {
    emit('close')
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false
  },
  videoUrl: {
    type: String,
    required: false
  },

  srcImg: {
    type: String,
    required: false
  }
});

</script>

<style scoped></style>
