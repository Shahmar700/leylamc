<template>
    <a class="p-2 rounded-3xl border hover:border-2 hover:border-primary transition-shadow duration-300 cursor-pointer">
        <div class=" rounded-3xl overflow-hidden w-full h-[325px] xl:h-[350px] 2xl:h-[380px] xl:object-contain">
            <img :src="image" alt="doctor" class="rounded-3xl object-cover w-full h-[380px]">
        </div>
        <div class="mt-6">
            <h1 class="text-primary text-2xl font-bold">{{ name }}</h1>
            <p class="text-main-text text-sm md:text-base font-light mt-1 pb-2">{{ position }}</p>
        </div>
    </a>
</template>

<script setup>
import { defineProps } from 'vue'   

const props = defineProps({
    image: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    position: {
        type: String, 
        required: true
    },
})
</script>

<style scoped>
.doctor-card {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s;
}

.doctor-card:hover {
  transform: scale(1.05);
}

.doctor-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 8px;
}

.doctor-position {
  font-size: 1rem;
  color: #666;
}
</style>