<template>
    <a class="p-2 rounded-3xl border hover:border-2 hover:border-primary transition-shadow duration-300 cursor-pointer">
        <div class="w-full  rounded-3xl overflow-hidden">
            <img :src="image" alt="doctor" class="rounded-3xl object-cover">
        </div>
        <div class="mt-6">
            <h1 class="text-primary text-2xl font-bold">{{ name }}</h1>
            <p class="text-main-text text-sm font-light pb-2">{{ position }}</p>
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


</style>