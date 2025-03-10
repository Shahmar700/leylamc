<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="(checkup, index) in paginatedCheckups" :key="index" class="mb-4">
                        <img :src="checkup.img" :alt="checkup.checkupName" class="w-full h-auto rounded-md">
                        <p class="text-base sm:text-lg mt-2">{{ checkup.checkupName }}</p>
                    </div>
                </div>
                <div v-if="totalPages > 1" class="pagination mt-4 flex justify-center lg:justify-start">
                    <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button">First</button>
                    <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
                    <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
                    <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
                    <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button">Last</button>
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

import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

import checkup1 from "@/assets/images/checkups/checkup1.jpg";
import checkup2 from "@/assets/images/checkups/checkup2.jpg";
import checkup3 from "@/assets/images/checkups/checkup3.jpg";

const checkups = ref([
    { id: 1, img: checkup1, checkupName: 'Terapevtik check up' },
    { id: 2, img: checkup2, checkupName: 'Kardioloji check up' },
    { id: 3, img: checkup3, checkupName: 'Onkoloji check up' },
    { id: 4, img: checkup3, checkupName: 'Terapevtik check up' },
    { id: 5, img: checkup3, checkupName: 'Onkoloji check up' },
]);

const itemsPerPage = 9;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(checkups.value.length / itemsPerPage));

const paginatedCheckups = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return checkups.value.slice(start, end);
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
</script>

<style scoped>
ul {
    list-style: disc;
}
button {
    margin: 0 5px;
    background-color: #6bb52b;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
button:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}
span {
    margin: 0 5px;
    cursor: pointer;
}
.font-bold {
    font-weight: bold;
}
.active-page {
    background-color: #6bb52b;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}
.inactive-page {
    color: #a5d6a7;
    padding: 5px 10px;
    border-radius: 5px;
}
.pagination {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 5px 10px;
    width: 100%;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
