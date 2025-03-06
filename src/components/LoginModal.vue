<template>
  <div class="modal-overlay">
    <div class="modal-content relative">
        <i @click="closeModal" class="fa-solid fa-xmark absolute top-7 right-7 cursor-pointer"></i>
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Hesabınıza daxil olun</h2>
           <p class="text-base font-light text-gray-700 dark:text-gray-400">
            Hələ qeydiyyatınız yoxdur? <router-link :to="{name: 'registration'}" class="font-medium text-primary-600 text-[#ef7c00] underline hover:underline dark:text-primary-500" @click="closeModal">Qeydiyyat</router-link>
            </p>
        </div>
    
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="login">
            <!-- Error message -->
            <div v-if="loginError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline">{{ loginError }}</span>
            </div>

            <div>
              <label for="username" class="block text-sm/6 font-medium text-gray-900">İstifadəçi adı</label>
              <div class="mt-2">
                <input v-model="username" type="text" name="username" id="username" autocomplete="username" placeholder="İstifadəçi adınızı daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" />
              </div>
            </div>
    
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Şifrə</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-primary">Şifrəni unutmusunuz?</a>
                </div>
              </div>
              <div class="mt-2">
                <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" placeholder="Şifrənizi daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" />
              </div>
            </div>
    
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :disabled="isLoading">
                {{ isLoading ? 'Giriş edilir...' : 'Daxil ol' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/services/auth'; // auth servisini import edirik

const router = useRouter();
const emit = defineEmits(['close', 'login-success']); // login-success eventi əlavə edildi

// Form inputs
const username = ref('');
const password = ref('');
const loginError = ref('');
const isLoading = ref(false);

const closeModal = () => {
    emit('close');
}

const login = async () => {
    // Reset error message
    loginError.value = '';
    
    // Validate inputs
    if (!username.value || !password.value) {
        loginError.value = 'İstifadəçi adı və şifrə daxil edin';
        return;
    }
    
    try {
        isLoading.value = true;
        
        // auth servisi vasitəsilə login edirik
        await authService.login(username.value, password.value);
        
        // Uğurlu giriş emiti göndəririk - BU SƏTRİ ƏLAVƏ EDİN
        emit('login-success');
        
        // Uğurlu login mesajı göstəririk
        alert('Uğurla daxil oldunuz!');
        
        // Modalı bağlayırıq
        closeModal();
        
        // Əsas səhifəyə yönləndirilir
        router.push('/'); // və ya istədiyiniz digər bir səhifə
        
    } catch (error) {
        console.error('Login xətası:', error);
        
        if (error.response && error.response.data) {
            // API-dən gələn xüsusi xəta mesajlarını göstəririk
            if (error.response.data.detail) {
                loginError.value = error.response.data.detail;
            } else {
                loginError.value = 'Giriş zamanı xəta baş verdi. Məlumatları yoxlayın.';
            }
        } else {
            loginError.value = 'Server ilə əlaqə yaratmaq mümkün olmadı. İnternet bağlantınızı yoxlayın.';
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  z-index: 1001;
}

</style>