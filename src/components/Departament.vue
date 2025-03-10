<template>
    <div class="w-[100%] h-[220px] bg-white py-16 px-8 flex items-center rounded-3xl text-main-text cursor-pointer" @click="goToDepartment">
        <img :src="depIcon" alt="icon" class="w-[55px] h-[55px] object-contain mr-5">
        <div class="">
            <h1 class="font-bold text-base md:text-lg lg:text-xl">{{name}}</h1>
            <p class="text-sm mt-2">{{ truncatedSubtitle }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    depIcon: {
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
    },
    slug: {
        type: String,
        required: true
    }
});

const router = useRouter();

const truncatedSubtitle = computed(() => {
    return props.subtitle.length > 25 ? props.subtitle.substring(0, 25) + '...' : props.subtitle;
});

const goToDepartment = () => {
    // HeaderMain ilə eyni məntiq ilə düzgün yönləndirmə
    router.push({ 
        name: 'department-detail', 
        params: { slug: props.slug }
    });
};
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>