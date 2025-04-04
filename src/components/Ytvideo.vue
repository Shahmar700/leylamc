<template>
  <div @click="$emit('click', videoUrl)" class="cursor-pointer">
      <!-- Video frame  -->
      <div class="w-full rounded-3xl aspect-video overflow-hidden">
    <iframe class="w-full h-full object-cover" :src="videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
      <!-- Video name  -->
      <div class="mt-5 screen-400:mt-8">
          <h1 class="text-xl text-main-text">{{ truncatedName }} </h1>
      </div>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
  videoUrl: {
    type: String,
    required: true
  },
  name:{
      type: String,
      required: true
  }
});

const emit = defineEmits(['click']);

const truncatedName = computed(() => {
if (props.name.length > 60) {
  return props.name.substring(0, 100) + '...';
}
return props.name;
});
</script>

<style scoped>
.iframe-container {
position: relative;
width: 100%;
padding-bottom: 56.25%; /* 16:9 aspect ratio */
/* height: 0; */
}

.iframe-container iframe {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}

</style>