<template>
  <div class="slider-container">
    <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide h-[300px] screen-400:h-[300px] screen-500:h-[350px] sm:h-[450px] lg:h-[500px] 2xl:h-[750px]"
      >
        <!-- İki qatlı arxa fon həlli - həm arxa fonu doldurur, həm də şəkili tam göstərir -->
        <div class="slide-background" :style="{ backgroundImage: `url(${image.url || image})` }"></div>
        
        <!-- Əsas şəkil - link varsa -->
        <a 
          v-if="image.source" 
          :href="image.source" 
          class="slide-content"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            :src="image.url || image" 
            class="slide-image"
          />
        </a>
        
        <!-- Əsas şəkil - link yoxdursa -->
        <div v-else class="slide-content">
          <img 
            :src="image.url || image" 
            class="slide-image"
          />
        </div>
      </div>
    </div>
    
    <!-- Naviqasiya düymələri və nöqtələr dəyişmədən qalır -->
    <button class="nav-button left top-[50%] -translate-y-1/2 md:top-[42%] xl:top-[45%] lg:top-1/3 w-[20px] h-[20px] md:w-[35px] md:h-[35px]" @click="prevSlide"><span>‹</span></button>
    <button class="nav-button right top-[50%] -translate-y-1/2 md:top-[42%] xl:top-[45%] lg:top-1/3 w-[20px] h-[20px] md:w-[35px] md:h-[35px]" @click="nextSlide"><span>›</span></button>
    <div class="dots absolute bottom-[10px] screen-375:bottom-[10px] screen-500:bottom-[20px] z-[99999] sm:bottom-[30px] xl:bottom-14">
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
  import car from "@/assets/images/bmw.jpg"
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

  // Xüsusi naviqasiya funksiyası - lakin əsasən a tag-dən istifadə edəcəyik
const navigateToSource = (source) => {
  if (source && source.trim() !== "") {
    window.open(source, '_blank', 'noopener,noreferrer');
  }
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
  overflow: hidden;
  background: linear-gradient(to right, #f3f3f3, #e0e0e0, #f3f3f3); /* Şəkil ətrafına uyğun arxa fon */
}

.slide {
  min-width: 100%;
  position: relative;
  overflow: hidden;
}
/* Arxa fon təbəqəsi - genişlənmiş blur şəkil effekti ilə dolduracaq */
.slide-background {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  opacity: 0.4;
  z-index: 1;
}

/* Əsas görüntü təbəqəsi */
.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* Əsas şəkil - heç vaxt kəsilmir, bütün banneri göstərir */
.slide-image {
  max-width: 98%;
  max-height: 98%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.1));
}

/* Hover effekti */
.slide-content:hover .slide-image {
  transform: scale(1.01);
  transition: transform 0.3s ease;
}
  .slide a {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.slide a:hover {
  opacity: 0.95; /* Hover zamanı kiçik bir effekt */
}
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