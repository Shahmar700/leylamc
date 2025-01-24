<template>
    <a class="flex flex-col items-center p-2 pb-7 mt-28 md:mt-36 lg:mt-24 shadow-2xl rounded-3xl transition-shadow duration-300 cursor-pointer pt-32 relative">
        <div class="w-[160px] h-[160px] rounded-full overflow-hidden absolute -top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
            <img :src="image" alt="user" class="w-full h-full object-cover">
        </div>
        <!-- Rating (Stars) -->
        <div class="flex justify-center">
            <i v-for="n in 5" :key="n" :class="n <= Math.round(star) ? 'fa-solid fa-star text-yellow-500' : 'fa-regular fa-star text-gray-400'" class="mx-1"></i>
        </div>
        <!-- Name and review  -->
        <div class="mt-4">
            <h2 class="font-bold text-2xl text-main-text text-center">{{ name }}</h2>
            <div class="flex justify-center">
                <img :src="quotation" alt="quotation-mark" class="w-[30px] h-[30px] my-3">
            </div>
            <p class="text-main-text text-center">{{ review }}</p>
        </div>
    </a>
</template>

<script setup>
import quotation from '@/assets/icons/quotation-mark.svg'

import { defineProps } from 'vue';
const props = defineProps({
    image:{
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

</script>

<style scoped>


</style>