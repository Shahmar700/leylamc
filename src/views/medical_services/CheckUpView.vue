<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="(checkup, index) in paginatedCheckups" :key="index" class="relative mb-4" @click="goToCheckUp(checkup)">
                        <img :src="checkup.img" :alt="checkup.checkupName" class="w-full h-auto rounded-md">
                        <p class="text-base sm:text-lg mt-2">{{ checkup.checkupName }}</p>
                        <div v-if="isExpired(checkup.endDate)" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                            VAXTI BİTİB
                        </div>
                    </div>
                </div>
                <div v-if="totalPages > 1" class="pagination mt-4 flex justify-start">
                    <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angles-left"></i></button>
                    <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angle-left"></i></button>
                    <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
                    <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angle-right"></i></button>
                    <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angles-right"></i></button>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

import checkup1 from "@/assets/images/checkups/checkup1.jpg";
import checkup2 from "@/assets/images/checkups/checkup2.jpg";
import checkup3 from "@/assets/images/checkups/checkup3.jpg";

const checkups = ref([
    { id: 1, img: checkup1, checkupName: 'Terapevtik check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 2, img: checkup2, checkupName: 'Kardioloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 3, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '20.02.2025', },
    { id: 4, img: checkup3, checkupName: 'Terapevtik check up', startDate: '15.02.2025', endDate: '20.02.2025', },
    { id: 5, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 6, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 7, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 8, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 9, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 10, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 11, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 12, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 13, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
    { id: 14, img: checkup3, checkupName: 'Onkoloji check up', startDate: '15.02.2025', endDate: '28.02.2025', },
]);

const itemsPerPage = 9;
const currentPage = ref(1);

const today = new Date().toISOString().split('T')[0];

const filteredCheckups = computed(() => {
    return checkups.value.filter(checkup => {
        return checkup.startDate <= today;
    });
});

const totalPages = computed(() => Math.ceil(filteredCheckups.value.length / itemsPerPage));

const paginatedCheckups = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCheckups.value.slice(start, end);
});

const pages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    } else if (current <= 3) {
        return [1, 2, 3, 4, 5, '...'];
    } else if (current >= total - 2) {
        return ['...', total - 4, total - 3, total - 2, total - 1, total];
    } else {
        return ['...', current - 1, current, current + 1, '...'];
    }
});

const goToPage = (page) => {
    if (page === '...') return;
    currentPage.value = page;
};

const goToFirstPage = () => {
    currentPage.value = 1;
};

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToLastPage = () => {
    currentPage.value = totalPages.value;
};

const isExpired = (endDate) => {
    return endDate < today;
};

const router = useRouter();

const goToCheckUp  = (checkup) => {
    router.push({ name: 'check-up-inner', params: { id: checkup.id } });
};

</script>

<style scoped>
ul {
    list-style: disc;
}

</style>