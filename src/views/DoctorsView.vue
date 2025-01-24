<template>
    <div class="container mt-17">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Doctor
           class="mt-6"
           :image="Dr1"
           name="Op.Dr. Aynurə Abdullayeva"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('1')"
          />
          <Doctor
           class="mt-6"
           :image="Dr2"
           name="Op.Dr. Natiq Məhərrəmov"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('2')"
          />
          <Doctor
           class="mt-6"
           :image="Dr3"
           name="T.Ü.F.D. Op.Dr. Nigar Əlizadə"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('3')"
          />
          <Doctor
           class="mt-6"
           :image="Dr1"
           name="Op.Dr. Aynurə Abdullayeva"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('4')"
          />
          <Doctor
           class="mt-6"
           :image="Dr2"
           name="Op.Dr. Natiq Məhərrəmov"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('5')"
          />
          <Doctor
           class="mt-6"
           :image="Dr3"
           name="T.Ü.F.D. Op.Dr. Nigar Əlizadə"
           position="Cərrah Mama-Ginekoloq"
           @click="goToDoctor('6')"
          />
        </div>
    </div>
</template>

<script setup>
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
</script>

<style scoped>


</style>