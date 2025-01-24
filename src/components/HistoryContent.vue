<template>
    <div class="flex md:mt-20">
        <!-- LEFT  -->
        <div class="historyYear relative mr-[30px] md:mr-[80px] before:content-[''] before:absolute 
        before:hidden md:before:block
        before:rotate-0
        before:w-[3px] 
        before:h-[200%] 
        before:bg-[#83B52B] 
        before:top-[-50%] 
        before:right-[-50px]">
            <p class="font-extrabold text-[#6BB52B8F] text-2xl md:text-5xl">{{ year }}</p>
            <img :src="dotImg" alt="" class="w-[20px] h-[20px] absolute top-[10%] -right-[58px] hidden md:block">
        </div>
        <!-- RIGHT -->
        <div class="pt-2">   
            <h4 class="text-xl lg:text-2xl text-main-text font-bold mb-2">{{ heading }}</h4>
            <p v-if="info" class="text-lg lg:text-xl text-main-text font-thin">{{ info }}</p>
            <div class="flex mb-2 items-center">
                <img v-if="tickImg && prog1" :src="tickImg" alt="" class="w-[17px] h-[17px] mr-2">
                <p v-if="prog1" class="text-lg lg:text-xl text-main-text font-thin">{{ prog1 }}</p>
            </div>
            <div class="flex mb-2 items-center">
                <img v-if="tickImg && prog2" :src="tickImg" alt="" class="w-[17px] h-170px] mr-2">
                <p v-if="prog2" class="text-lg lg:text-xl text-main-text font-thin">{{ prog2 }}</p>
            </div>
            <div class="flex mb-2 items-center">
                <img v-if="tickImg && prog3" :src="tickImg" alt="" class="w-[17px] h-[17px] mr-2">
                <p v-if="prog3" class="text-lg lg:text-xl text-main-text font-thin">{{ prog3 }}</p>
            </div>
            <div class="flex items-center">
                <img v-if="tickImg && prog4" :src="tickImg" alt="" class="w-[17px] h-[17px] mr-2">
                <p v-if="prog4" class="text-lg lg:text-xl text-main-text font-thin">{{ prog4 }}</p>
            </div>
            <!-- INFO With Green Ticks  -->
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    dotImg:{
        type: String,
        required: true
    },
    tickImg: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    prog1: {
        type: String,
        required: false
    },
    prog2: {
        type: String,
        required: false
    },
    prog3: {
        type: String,
        required: false
    },
    prog4: {
        type: String,
        required: false
    },
})
</script>

<style scoped>


</style>