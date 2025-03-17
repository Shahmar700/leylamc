<template>
  <div class="slider-container">
    <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide h-[150px] screen-400:h-[200px] sm:h-[450px] md:h-[450px] lg:h-[600] 2xl:h-[800px]"
      >
        <!-- Düzəliş: "slide" əvəzinə "image" dəyişəni istifadə olunmalıdır -->
        <img :src="image.url || image" :alt="image.title || 'Slider image'" class="slide-image object-contain md:object-fill 2xl:object-fill" />
      </div>
    </div>
    <button class="nav-button left top-[8%] screen-400:top-[11%] md:top-[42%] xl:top-[45%] lg:top-1/3 w-[20px] h-[20px] md:w-[35px] md:h-[35px]" @click="prevSlide"><span>‹</span></button>
    <button class="nav-button right top-[8%] screen-400:top-[11%] md:top-[42%] xl:top-[45%] lg:top-1/3 w-[20px] h-[20px] md:w-[35px] md:h-[35px]" @click="nextSlide"><span>›</span></button>
    <div class="dots absolute bottom-[675px] screen-400:bottom-[640px] screen-375:bottom-[460] screen-500:bottom-[620px] z-[99999] sm:bottom-[430px] md:bottom-[30px] xl:bottom-14">
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
    /* height: 800px; Adjust as needed */
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
  @media screen and (min-width: 320px) {
    .dot {
    width: 8px;
    height: 8px;
  }
}
@media screen and (min-width: 375px) {
    .dot {
    width: 10px;
    height: 10px;
  }
}
  
  .dot.active {
    background: green;
  }
  </style>