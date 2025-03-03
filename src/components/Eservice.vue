<template>
     <router-link :to="link" class="bg-white  rounded-3xl py-9 px-6 cursor-pointer transition-all duration-300 hover:shadow-lg">
        <img :src="eService" alt="e-service" class="pb-2 sm:pb-4 w-[40px] h-[55px] screen-500:w-[55px] screen-500:h-[70px] md:w-[65px] md:h-[81px]">
        <h3 class="pb-2 screen-400:pb-3 md:pb-5 text-xl md:text-2xl font-bold">{{ title }}</h3>
        <p class="text-base md:text-lg">{{ description }}</p>
        <img  class="mt-3" src="@/assets/icons/e-service-btn.svg" alt="">
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    eService:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.hover\:shadow-lg:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

</style>