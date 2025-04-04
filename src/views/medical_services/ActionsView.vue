<template>
    <div class="container mt-5 md:mt-10 lg:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="(checkup, index) in paginatedCheckups" :key="index" class="mb-4">
                        <img :src="checkup.img" :alt="checkup.checkupName" class="w-full h-auto rounded-md">
                        <p class="text-base sm:text-lg mt-2">{{ checkup.checkupName }}</p>
                    </div>
                </div>
                <div v-if="totalPages > 1" class="pagination mt-8 flex justify-center">
                <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
                <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <span 
                    v-for="page in pages" 
                    :key="page" 
                    @click="goToPage(page)" 
                    :class="{ 
                        'font-bold !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                        'active-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                        'inactive-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage !== page && page !== '...',
                        'pagination-dots !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': page === '...'
                    }"
                >
                    {{ page }}
                </span>
                <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angle-right"></i>
                </button>
                <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0 flex flex-col items-center" data-aos="zoom-in-left">
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


/* Pagination CSS */
.pagination {
    margin-top: 2rem;
    user-select: none;
    padding: 10px 0;
    z-index: 999999;
}

.pagination > * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination-button {
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
}

.pagination-button:hover:not(:disabled) {
    background-color: #e5e7eb;
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.active-page {
    background-color: #6ab42b;
    color: white;
    font-weight: bold;
    padding: 0 0.75rem;
}

.inactive-page {
    padding: 0 0.75rem;
    background-color: #f3f4f6;
    color: #374151;
}

.inactive-page:hover {
    background-color: #e5e7eb;
}

.pagination-dots {
    cursor: default;
    color: #6b7280;
}
</style>
