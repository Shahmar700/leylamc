<template>
    <div class="container mt-17">
      <div>
         <!-- Doctor Filters  -->
         <form @submit.prevent="filterDoctors" class="flex gap-4 mt-5 items-center text-base lg:text-lg">
            <div class="flex flex-col w-full ">
                <label for="name" class="mb-1 !text-main-text">Həkimin Adı, Soyadı</label>
                <input type="text" id="name" v-model="name" class="border border-gray-300 p-2 rounded-md !h-[47px]" placeholder="Həkimin Adı, Soyadı">
            </div>
            <!-- Specializations -->
            <div class="flex flex-col w-full ">
                <label for="specializations" class="mb-1 !text-main-text">İxtisas seçin</label>
                <multiselect v-model="selectedSpecializations" :options="specializations" :multiple="true" placeholder="İxtisas seçin" label="name" track-by="name" class="rounded-md !h-[47px]"></multiselect>
            </div>
            <!-- Select a department  -->
            <div class="flex flex-col w-full ">
                <label for="department" class="mb-1 !text-main-text">Şöbə seçin</label>
                <multiselect v-model="selectedDepartments" :options="departments" :multiple="true" placeholder="Şöbə seçin" label="name" track-by="name" class="rounded-md !h-[47px]"></multiselect>
            </div>
            <div class="w-full">
                <button type="submit" class="greenBtn mt-8 !py-2 !px-6 !rounded-lg">Axtar</button>
            </div>
          </form>
      </div>
        <div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Doctor
                v-for="doctor in paginatedDoctors"
                :key="doctor.id"
                :image="doctor.image"
                :name="doctor.name"
                :position="doctor.specializations.join(', ')"
                @click="goToDoctor(doctor.id)"
                class="mt-6"
              />
        </div>
        <div v-if="totalPages > 1" class="pagination mt-4 flex justify-start">
          <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angles-left"></i></button>
          <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angle-left"></i></button>
          <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
          <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angle-right"></i></button>
          <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angles-right"></i></button>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import { useRouter } from 'vue-router';
const router = useRouter();

const goToDoctor = (id) => {
  router.push({ name: 'doctor', params: { id } });
};

import Doctor from '@/components/DoctorCard.vue'

// Doctors Images (Our Team) 
import Dr1 from "@/assets/images/Dr1.jpg"
import Dr2 from "@/assets/images/Dr2.jpg"
import Dr3 from "@/assets/images/Dr3.jpg"


// State variables
const name = ref('');
const selectedSpecializations = ref([]);
const selectedDepartments = ref([]);

const specializations = ref([
  { name: 'Cərrah' },
  { name: 'Allerqoloq' },
  { name: 'Endokrinoloq' },

]);

const departments = ref([
  { name: 'Cərrahiyyə' },
  { name: 'Allerqologiya' },
  { name: 'Endokrinologiya' },

]);

const doctors = ref([
  { id: 1, name: 'Op.Dr. Aynurə Abdullayeva', specializations: ['Cərrah'], department: 'Cərrahiyyə', image: Dr1 },
  { id: 2, name: 'Op.Dr. Natiq Məhərrəmov', specializations: ['Allerqoloq'], department: 'Allerqologiya', image: Dr2 },
  { id: 3, name: 'T.Ü.F.D. Op.Dr. Nigar Əlizadə', specializations: ['Endokrinoloq'], department: 'Endokrinologiya', image: Dr3 },
  { id: 4, name: 'Op.Dr. Aynurə Abdullayeva', specializations: ['Cərrah'], department: 'Cərrahiyyə', image: Dr1 },
  { id: 5, name: 'Op.Dr. Natiq Məhərrəmov', specializations: ['Allerqoloq'], department: 'Allerqologiya', image: Dr2 },
  { id: 6, name: 'T.Ü.F.D. Op.Dr. Nigar Əlizadə', specializations: ['Endokrinoloq'], department: 'Endokrinologiya', image: Dr3 },
  // Daha çox həkim əlavə edə bilərsiniz
]);

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesName = name.value ? doctor.name.toLowerCase().includes(name.value.toLowerCase()) : true;
    const matchesSpecializations = selectedSpecializations.value.length ? selectedSpecializations.value.some(spec => doctor.specializations.includes(spec.name)) : true;
    const matchesDepartments = selectedDepartments.value.length ? selectedDepartments.value.some(dep => doctor.department === dep.name) : true;

    return matchesName && matchesSpecializations && matchesDepartments;
  });
});


// const filterDoctors = () => {
//   // Bu funksiya form submit edildikdə filteredDoctors computed property-ni yeniləyəcək
// };



// **PAGINATION 
const itemsPerPage = 6;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(filteredDoctors.value.length / itemsPerPage));

const paginatedDoctors = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredDoctors.value.slice(start, end);
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

const filterDoctors = () => {
  currentPage.value = 1; // Filtrləmə zamanı ilk səhifəyə qayıt
};
</script>

<style scoped>


</style>