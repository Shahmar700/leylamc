<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 backdrop-blur-sm p-4" @click="closeModal">
      <div class="bg-gradient-to-br from-green-100 to-green-150 rounded-lg shadow-2xl overflow-hidden w-[85%] sm:w-4/5 md:w-3/5 lg:w-2/5 max-w-3xl transform transition-all duration-300 scale-100" @click.stop>
        <div class="relative">
          <!-- Close button - köşəyə yerləşdirildi -->
          <button @click="closeModal" class="absolute top-2 right-2 md:top-2 md:right-5 z-10 bg-green-200 text-orange-600 hover:text-[#ef7c00] transition-colors duration-200 h-6 w-6 md:h-7 md:w-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-base">
            <i class="fa-solid fa-times"></i>
          </button>
          
          <!-- Video - boşluqsuz -->
          <iframe v-if="videoUrl" 
                 :src="videoUrl" 
                 class="w-full h-80 md:h-[400px] lg:h-[500px]" 
                 frameborder="0" 
                 allowfullscreen>
          </iframe>
          
          <!-- Şəkil - boşluqsuz -->
          <div v-else-if="srcImg" class="overflow-hidden">
            <img :src="srcImg" 
                 class="w-full h-auto max-h-[70vh] object-contain" 
                 alt="Modal content" />
          </div>
          
          <!-- Əlavə məzmun -->
          <div v-if="caption" class="py-2 px-3 bg-gradient-to-r from-gray-100 to-gray-200 text-center border-t border-gray-200">
            <p class="text-gray-700 font-medium">{{ caption }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
  },
  caption: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
*{
  user-select: none;
}

/* Modal açılış/bağlanış animasiyası */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}

/* Modal içərisindəki məzmunun animasiyası */
.modal-fade-enter-active .bg-gradient-to-br {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from .bg-gradient-to-br {
  transform: scale(0.95) translateY(10px);
}

.modal-fade-leave-to .bg-gradient-to-br {
  transform: scale(0.95) translateY(10px);
}

/* Kontentə fokuslandıqda şəkil böyüyüb kənarların görünməməsi üçün */
img {
  display: block;
}
</style>