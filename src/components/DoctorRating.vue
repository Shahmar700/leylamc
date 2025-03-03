<template>
    <div class="w-full flex rounded-2xl p-7 pb-10 mt-8 tracking-wider transition-shadow duration-500 custom-shadow hover:custom-shadow-hover">
        <div class="w-[100px] h-[100px] p-14 mr-7 bg-gray-100 rounded-full flex justify-center items-center">
            <!-- <div class="w-[140px] h-[140px] rounded-full overflow-hidden absolute -top-20">
                <img :src="image" alt="" class="w-full h-full object-cover rounded-full">
            </div> -->
            <i class="fa-regular fa-user text-6xl"></i>
        </div>
        <div class="text-main-text w-full flex flex-col justify-evenly">
            <div class="w-full flex justify-between items-center">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold">{{ name }}</h1>
                    <p class="text-sm font-thin">{{ date }}</p>
                </div>
                <div class="flex items-center">
                    <i v-for="n in 5" :key="n" :class="n <= Math.round(star) ? 'fa-solid fa-star text-primary' : 'fa-regular fa-star text-gray-400'" class="mr-[1px]"></i>
                </div>
            </div>
            <div>
                <p class="text-2xl">{{ review }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    image: {
        type: String,
        required: true
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