<template>
    <div class="slider-container">
      <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="slide h-[350px] screen-400:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600] xl:h-[800px]"
        >
          <img :src="image" alt="slideImage" class="slide-image object-cover md:object-fill" />
        </div>
      </div>
      <button class="nav-button left top-[20%] md:top-[30%] lg:top-1/3 w-[27px] h-[27px] md:w-[35px] md:h-[35px]" @click="prevSlide"><span>‹</span></button>
      <button class="nav-button right top-[20%] md:top-[30%] lg:top-1/3 w-[27px] h-[27px] md:w-[35px] md:h-[35px]" @click="nextSlide"><span>›</span></button>
      <div class="dots absolute bottom-[500px] md:bottom-[350px] xl:bottom-32">
        <span
          v-for="(image, index) in images"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    images: {
      type: Array,
      required: true
    }
  });
  
  const currentIndex = ref(0);
  let intervalId;
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  };
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  };
  
  const goToSlide = (index) => {
    currentIndex.value = index;
  };
  
  onMounted(() => {
    intervalId = setInterval(nextSlide, 7000);
  });
  
  onUnmounted(() => {
    clearInterval(intervalId);
  });
  </script>
  
  <style scoped>
  .slider-container {
    position: relative;
    width: 100%;
    height: 800px; /* Adjust as needed */
    overflow: hidden;
  }
  
  .slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide {
    min-width: 100%;
  }
  
  .slide-image {
    width: 100%;
    height: 100%;
  }
  
  .nav-button {
    position: absolute;
    background: white;
    opacity: 0.7;
    color: #EF7C00;
    /* padding: 5px; */
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-button span {
    font-size: 40px;
    padding-bottom: 7px;
    font-weight: bold;
  }
  .nav-button.left {
    left: 10px;
  }
  
  .nav-button.right {
    right: 10px;
  }
  
  .dots {
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border: 1px solid orange;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }
  
  .dot.active {
    background: green;
  }
  </style>