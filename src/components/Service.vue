<template>
    <div :style="backgroundStyle"
     class="service-container h-fit sm:h-[330px] md:h-[370px] rounded-[40px] screen-375:rounded-[60px] md:rounded-[60px] py-[40px] screen-500:py-[60px] px-[30px]">
        <img :src="icon" alt="service icon" class="mb-4 md:mb-6 w-[50px] h-[50px] screen-400:w-[60px] screen-400:h-[60px] sm:w-[70px] sm:h-[70px] xl:w-[80px] xl:h-[80px] object-contain">
        <h2 class="text-white text-2xl screen-400:text-3xl xl:text-4xl">{{ title }}</h2>
        <p class="text-white mt-2 md:mb-3 text-sm screen-400:text-base">{{ description }}</p>
    </div>
</template>

<script setup>
import { defineProps, computed  } from 'vue';

const props = defineProps({
  backgroundImage: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${props.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));
</script>

<style scoped>
.service-container {
  background-size: cover;
  background-position: center;
  /* border-radius: 70px; */
  /* padding: 80px 35px; */
}


</style>