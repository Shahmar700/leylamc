<template>
    <div class="w-[30%] bg-white py-16 px-12 flex items-center rounded-3xl text-main-text">
        <img :src="depIcon" alt="icon" class="w-[55px] h-[55px] object-contain mr-5">
        <div class="">
            <h1 class="font-bold text-2xl">{{name}}</h1>
            <p class="text-sm mt-2">{{subtitle}}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    depIcon:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    }
})
</script>

<style  scoped>


</style>