<template>
  <div class="container mx-auto py-8 mt-32">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <div v-if="isLoading" class="text-center">
        <p>Yüklənir...</p>
      </div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <h1 class="text-2xl font-bold mb-6 text-center text-primary">İstifadəçi Profili</h1>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">İstifadəçi adı:</label>
          <p class="border p-2 rounded">{{ userProfile.username || username }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Ad:</label>
          <p class="border p-2 rounded">{{ userProfile.first_name || 'Yüklənir...' }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Soyad:</label>
          <p class="border p-2 rounded">{{ userProfile.last_name || 'Yüklənir...' }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">E-poçt:</label>
          <p class="border p-2 rounded">{{ userProfile.email || 'Yüklənir...' }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Telefon:</label>
          <p class="border p-2 rounded">{{ userProfile.phone_number || 'Yüklənir...' }}</p>
        </div>
        
        <button @click="logout" class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Çıxış et
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/services/api';
  import authService from '@/services/auth';
  
  const router = useRouter();
  const userProfile = ref({});
  const isLoading = ref(true);
  const error = ref(null);
  const username = authService.getUsername();
  
  const fetchUserProfile = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Token-dən istifadəçi ID-sini əldə edirik
    const token = authService.getToken();
    const decodedToken = authService.decodeToken(token);
    const userId = decodedToken.user_id;
    
    // Düzgün endpoint-i istifadə edərək sorğu göndəririk
    const response = await api.get(`http://bytexerp.online/api/leyla/v1/user-me/`);
    console.log('Profil məlumatları:', response.data); // Profil məlumatlarını konsolda göstərin
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
    authService.logout();
    router.push('/');
  };
  
  onMounted(() => {
     // Token-i decode edirik və məlumatları konsola çıxarırıq
    const token = authService.getToken();
    const decodedToken = authService.decodeToken(token);
    console.log('Decoded Token:', decodedToken);
    
    fetchUserProfile();
  });
  </script>