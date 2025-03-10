<template>
  <div class="container mx-auto py-8 mt-24 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Yükləmə və xəta göstəricisi -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
        <div class="flex items-center">
          <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <p>{{ error }}</p>
        </div>
      </div>
      
      <!-- Profil məzmunu -->
      <div v-else>
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          <!-- Profil başlığı -->
          <div class="bg-gradient-to-r from-primary to-blue-500 p-6 sm:p-10 text-white">
            <div class="flex flex-col sm:flex-row items-center">
              <!-- Profil şəkli -->
              <div class="relative">
                <div class="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-white/30 flex items-center justify-center text-white text-5xl overflow-hidden border-4 border-white/70">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              
              <!-- Ad-soyad və istifadəçi adı -->
              <div class="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 class="text-2xl sm:text-3xl font-bold">
                  {{ userProfile.first_name || '' }} {{ userProfile.last_name || '' }}
                </h1>
                <p class="text-white/80 mt-1">@{{ userProfile.username || username }}</p>
              </div>
            </div>
          </div>
          
          <!-- Profil məlumatları -->
          <div class="p-6 sm:p-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Şəxsi Məlumatlar</h2>
            
            <div class="grid gap-6 md:grid-cols-2">
              <!-- İstifadəçi adı -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <i class="fas fa-user text-primary mr-2"></i>
                  <span class="text-sm font-medium text-gray-500">İstifadəçi adı</span>
                </div>
                <p class="text-gray-800 font-medium">{{ userProfile.username || username }}</p>
              </div>
              
              <!-- E-poçt -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <i class="fas fa-envelope text-primary mr-2"></i>
                  <span class="text-sm font-medium text-gray-500">E-poçt</span>
                </div>
                <p class="text-gray-800 font-medium">{{ userProfile.email || 'Qeyd edilməyib' }}</p>
              </div>
              
              <!-- Ad -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <i class="fas fa-id-card text-primary mr-2"></i>
                  <span class="text-sm font-medium text-gray-500">Ad</span>
                </div>
                <p class="text-gray-800 font-medium">{{ userProfile.first_name || 'Qeyd edilməyib' }}</p>
              </div>
              
              <!-- Soyad -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <i class="fas fa-id-card text-primary mr-2"></i>
                  <span class="text-sm font-medium text-gray-500">Soyad</span>
                </div>
                <p class="text-gray-800 font-medium">{{ userProfile.last_name || 'Qeyd edilməyib' }}</p>
              </div>
              
              <!-- Telefon -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <i class="fas fa-phone text-primary mr-2"></i>
                  <span class="text-sm font-medium text-gray-500">Telefon</span>
                </div>
                <p class="text-gray-800 font-medium">{{ userProfile.phone_number || 'Qeyd edilməyib' }}</p>
              </div>
            </div>
            
            <!-- Əlavə imkanlar bölməsi -->
            <div class="mt-8 border-t pt-6">
              <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
                <button class="btn-secondary flex items-center justify-center">
                  <i class="fas fa-edit mr-2"></i> Profili redaktə et
                </button>
                <button @click="logout" class="btn-danger flex items-center justify-center">
                  <i class="fas fa-sign-out-alt mr-2"></i> Çıxış et
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { useAuthStore } from '@/store/auth'; // AuthStore istifadə edirik

const router = useRouter();
const authStore = useAuthStore();
const userProfile = ref({});
const isLoading = ref(true);
const error = ref(null);
const username = authStore.username; // AuthStore-dan istifadəçi adını alırıq

const fetchUserProfile = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Profil məlumatlarını əldə edirik
    const response = await api.get(`http://bytexerp.online/api/leyla/v1/user-me/`);
    console.log('Profil məlumatları:', response.data);
    userProfile.value = response.data;
  } catch (err) {
    console.error('Profil məlumatlarını almaq xətası:', err);
    if (err.response && err.response.status === 404) {
      error.value = 'İstifadəçi profili tapılmadı';
    } else {
      error.value = 'Profil məlumatlarını yükləmək mümkün olmadı';
    }
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  authStore.logout(); // AuthStore vasitəsilə çıxış edirik
  router.push('/');
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200;
}

.btn-danger {
  @apply bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200;
}
</style>