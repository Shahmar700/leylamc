<template>
    <div @click="$emit('click', videoUrl)" class="cursor-pointer">
        <!-- Video frame  -->
        <div class="w-full rounded-3xl overflow-hidden">
      <iframe class="w-full h-[290px] sm:h-[350px]" :src="videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
        <!-- Video name  -->
        <div class="mt-5 screen-400:mt-8">
            <h1 class="text-lg screen-400:text-2xl text-main-text">{{name}} </h1>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    videoUrl: {
      type: String,
      required: true
    },
    name:{
        type: String,
        required: true
    }
})
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