<template>
    <div>
        <img v-if="qualityCertImg" :src="qualityCertImg" alt="Quality Certificate" class="w-full h-full object-cover">
        <img v-else-if="certificates_Img" :src="certificates_Img" alt="Certificate" class="w-full h-full object-cover">
        <p v-else>No image available</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    qualityCertImg:{
        type: String,
        required: false
    },
    certificates_Img: {
        type: String,
        required: false
    }
})
</script>

<style scoped>


</style>