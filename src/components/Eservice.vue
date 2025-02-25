<template>
     <router-link :to="link" class="bg-white  rounded-3xl py-9 px-6 cursor-pointer transition-all duration-300 hover:shadow-lg">
        <img :src="eService" alt="e-service" class="pb-4">
        <h3 class="pb-5 text-2xl font-bold">{{ title }}</h3>
        <p class="text-lg">{{ description }}</p>
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