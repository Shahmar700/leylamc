<template>
    <div :style="backgroundStyle"
     class="service-container h-fit sm:h-[330px] md:h-[420px] rounded-[70px] py-[40px] screen-500:py-[60px] px-[30px]">
        <img :src="icon" alt="service icon" class="mb-6">
        <h2 class="text-white text-4xl">{{ title }}</h2>
        <p class="text-white mt-3">{{ description }}</p>
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
  border-radius: 70px;
  /* padding: 80px 35px; */
}
img{
    width: 80px;
    height: 80px;
    object-fit: contain;
}

</style>