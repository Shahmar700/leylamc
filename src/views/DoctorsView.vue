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
              <multiselect v-model="selectedSpecializations" :options="filteredSpecializations" :multiple="true" placeholder="İxtisas seçin" label="specialty" track-by="specialty" class="rounded-md !h-[47px]"></multiselect>
          </div>
          <!-- Select a department  -->
          <div class="flex flex-col w-full ">
              <label for="department" class="mb-1 !text-main-text">Şöbə seçin</label>
              <multiselect v-model="selectedDepartments" :options="filteredDepartments" :multiple="true" placeholder="Şöbə seçin" label="name" track-by="name" class="rounded-md !h-[47px]"></multiselect>
          </div>
          <div class="w-full">
              <button type="submit" class="greenBtn mt-8 !py-2 !px-6 !rounded-lg">Axtar</button>
          </div>
        </form>
    </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DoctorCard
              v-for="doctor in paginatedDoctors"
              :key="doctor.id"
              :image="doctor.photo"
              :name="`${doctor.degree} ${doctor.first_name} ${doctor.last_name}`"
              :position="doctor.position"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter();

const goToDoctor = (id) => {
  router.push({ name: 'doctor', params: { id } });
};

import DoctorCard from '@/components/DoctorCard.vue'

// State variables
const name = ref('');
const selectedSpecializations = ref([]);
const selectedDepartments = ref([]);

const specializations = ref([]);
const departments = ref([]);
const doctors = ref([]);

// API çağırışı ilə həkim məlumatlarını yükləmək
const fetchDoctors = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/doctor-list/');
    console.log(response.data); // Məlumatları konsolda göstərmək
    doctors.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// API çağırışı ilə ixtisasları yükləmək
const fetchSpecializations = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/doctor-list/');
    const uniqueSpecializations = [...new Set(response.data.results.map(doctor => doctor.specialty))];
    specializations.value = uniqueSpecializations.map(specialty => ({ specialty }));
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// API çağırışı ilə şöbələri yükləmək
const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/department-list/');
    departments.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

onMounted(() => {
  fetchDoctors();
  fetchSpecializations();
  fetchDepartments();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

let pollingInterval;

const startPolling = () => {
  pollingInterval = setInterval(fetchDoctors, 5000); // Hər 5 saniyədən bir API çağırışı
};

const stopPolling = () => {
  clearInterval(pollingInterval);
};

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesName = name.value ? `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(name.value.toLowerCase()) : true;
    const matchesSpecializations = selectedSpecializations.value.length ? selectedSpecializations.value.some(spec => doctor.specialty.includes(spec.specialty)) : true;
    const matchesDepartments = selectedDepartments.value.length ? selectedDepartments.value.some(dep => doctor.department.name === dep.name) : true;

    return matchesName && matchesSpecializations && matchesDepartments;
  });
});

// Dinamik olaraq ekranda göstərilən həkimlərin ixtisaslarını və şöbələrini əldə etmək
const filteredSpecializations = computed(() => {
  const uniqueSpecializations = [...new Set(filteredDoctors.value.map(doctor => doctor.specialty))];
  return uniqueSpecializations.map(specialty => ({ specialty }));
});

const filteredDepartments = computed(() => {
  const uniqueDepartments = [...new Set(filteredDoctors.value.map(doctor => doctor.department.name))];
  return uniqueDepartments.map(name => ({ name }));
});

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