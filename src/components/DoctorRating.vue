<template>
    <div class="w-full flex rounded-2xl p-3 md:p-7 pb-10 mt-8 tracking-wider transition-shadow duration-500 custom-shadow hover:custom-shadow-hover">
        <div class="w-[70px] h-[70px] screen-500:w-[100px] screen-500:h-[100px] px-8 md:p-10 lg:p-14 mr-4 md:mr-7 bg-gray-100 rounded-full flex justify-center items-center">
            <template v-if="image && image !== 'https://via.placeholder.com/100'">
                <img :src="image" alt="" class="w-full h-full object-cover rounded-full">
            </template>
            <template v-else>
                <i class="fa-regular fa-user text-3xl screen-400:text-4xl md:text-5xl lg:text-6xl"></i>
            </template>
        </div>
        <div class="text-main-text w-full flex flex-col justify-evenly">
            <div class="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="mb-6">
                    <h1 class="text-lg lg:text-xl xl:text-2xl font-bold">{{ name }}</h1>
                    <p class="font-thin text-sm md:text-lg">{{ date }}</p>
                </div>
                <div class="flex items-center">
                    <i v-for="n in 5" :key="n" :class="n <= Math.round(star) ? 'fa-solid fa-star text-primary' : 'fa-regular fa-star text-gray-400'" class="mr-[1px]"></i>
                </div>
            </div>
            <div>
                <p class="text-base md:text-lg lg:text-xl xl:text-2xl mt-2 md:mt-0">{{ review }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
        image: {
        type: String,
        required: false,
        default: '' // və ya default olaraq placeholder şəkli
    },
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    }
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.hover\:custom-shadow-hover:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>