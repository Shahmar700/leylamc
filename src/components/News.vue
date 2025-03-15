<template>
    <div class="">
        <!-- News frame  -->
        <div class="w-full rounded-3xl aspect-video overflow-hidden">
            <img class="w-full h-full rounded-3xl object-cover" :src="newsImg" alt="news-image"> 
        </div>
        <div class="mt-5 md:mt-7">
            <p class="text-main-text text-sm md:text-base">{{ newsDate }}</p>
            <h1 class="text-main-text text-lg xl:text-xl font-bold">{{ newsName }}</h1>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    newsImg: {
        type: String,
        required: true
    },
    newsDate: {
        type: String,
        required: true
    },
    newsName: {
        type: String,
        required: true
    }
})
</script>

<style scoped>

</style>
