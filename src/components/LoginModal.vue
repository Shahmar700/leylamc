<template>
  <div class="modal-overlay">
    <div class="modal-content relative w-[85%] md:w-[50%] lg:w-[45%] xl:w-[40%] max-w-[500px]">
      <i @click="closeModal" class="fa-solid fa-xmark absolute top-7 right-7 cursor-pointer"></i>
      
      <!-- Əsas login formu -->
      <div v-if="!showResetForm" class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="my-5 text-center text-xl md:text-2xl font-bold tracking-tight text-gray-900">Hesabınıza daxil olun</h2>
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
                  <a href="#" class="font-semibold text-primary hover:text-green-600 transition-colors" @click.prevent="toggleResetForm">Şifrəni unutmusunuz?</a>
                </div>
              </div>
              <div class="mt-2">
                <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" placeholder="Şifrənizi daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" />
              </div>
            </div>
    
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-primary border border-transparent px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-white hover:border-primary hover:text-primary transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :disabled="isLoading">
                {{ isLoading ? 'Giriş edilir...' : 'Daxil ol' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Şifrə sıfırlama formu -->
      <div v-else class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="my-5 text-center text-xl md:text-2xl font-bold tracking-tight text-gray-900">Şifrəni Sıfırla</h2>
          <p class="text-base text-gray-700 text-center">
            E-poçt ünvanınızı daxil edin, şifrənizi sıfırlamaq üçün sizə təlimat göndərəcəyik.
          </p>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="sendResetLink">
            <!-- Error/Success message -->
            <div v-if="resetError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline">{{ resetError }}</span>
            </div>
            
            <div v-if="resetSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline">{{ resetSuccess }}</span>
            </div>

            <div>
              <label for="email" class="block text-sm/6 font-medium text-gray-900">E-poçt ünvanı</label>
              <div class="mt-2">
                <input v-model="resetEmail" type="email" name="email" id="email" autocomplete="email" placeholder="E-poçt ünvanınızı daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" required />
              </div>
            </div>
    
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :disabled="isResetting">
                {{ isResetting ? 'Göndərilir...' : 'Sıfırlama linki göndər' }}
              </button>
            </div>
            
            <div class="text-center">
              <a href="#" class="text-sm font-medium text-[#ef7c00] hover:text-[#d26a00]" @click.prevent="toggleResetForm">Giriş səhifəsinə qayıt</a>
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
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://bytexerp.online/api';

const router = useRouter();
const emit = defineEmits(['close', 'login-success']);
const authStore = useAuthStore();

// Form inputs
const username = ref('');
const password = ref('');
const loginError = ref('');
const isLoading = ref(false);

// Şifrə sıfırlama üçün
const showResetForm = ref(false);
const resetEmail = ref('');
const resetError = ref('');
const resetSuccess = ref('');
const isResetting = ref(false);

const closeModal = () => {
    emit('close');
}

// Login və Reset form arasında keçid
const toggleResetForm = () => {
    showResetForm.value = !showResetForm.value;
    resetError.value = '';
    resetSuccess.value = '';
    loginError.value = '';
}

// Xətalı sahələri vurğulamaq üçün funksiya
const highlightField = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('border-red-500', 'bg-red-50');
        
        // Focus və keydown eventlərində vurğunu təmizlə
        field.addEventListener('focus', function onFocus() {
            field.classList.remove('border-red-500', 'bg-red-50');
            field.removeEventListener('focus', onFocus);
        });
    }
};

const login = async () => {
    // Xəta mesajını sıfırla
    loginError.value = '';
    
    // Giriş sahələrini yoxla
    if (!username.value) {
        loginError.value = 'İstifadəçi adı daxil edilməlidir';
        highlightField('username');
        return;
    }
    
    if (!password.value) {
        loginError.value = 'Şifrə daxil edilməlidir';
        highlightField('password');
        return;
    }
    
    try {
        isLoading.value = true;
        
        // AuthStore vasitəsilə login
        await authStore.login(username.value, password.value);
        
        // Uğurlu giriş bildirişi
        Swal.fire({
            icon: 'success',
            title: 'Uğurla daxil oldunuz!',
            showConfirmButton: false,
            timer: 1500
        });
        
        // Modalı bağla və uğurlu giriş eventini emit et
        emit('login-success');
        closeModal();
        
    } catch (error) {
        console.error('Login xətası:', error);
        
        // Xəta mesajını göstər
        if (error.response) {
            // API-dən gələn xəta
            if (error.response.status === 401) {
                loginError.value = 'İstifadəçi adı və ya şifrə yanlışdır';
                highlightField('username');
                highlightField('password');
            } else if (error.response.data && error.response.data.detail) {
                loginError.value = error.response.data.detail;
            } else {
                loginError.value = 'Giriş zamanı xəta baş verdi. Zəhmət olmasa daha sonra yenidən cəhd edin.';
            }
        } else {
            loginError.value = 'Server ilə əlaqə yaratmaq mümkün olmadı. İnternet bağlantınızı yoxlayın.';
        }
        
        // Xəta baş verdikdə SweetAlert ilə bildiriş
        Swal.fire({
            icon: 'error',
            title: 'Giriş uğursuz oldu',
            text: loginError.value,
            confirmButtonText: 'Yenidən cəhd et'
        });
    } finally {
        isLoading.value = false;
    }
};

// Şifrə sıfırlama linki göndər
const sendResetLink = async () => {
    resetError.value = '';
    resetSuccess.value = '';
    
    if (!resetEmail.value) {
        resetError.value = 'Zəhmət olmasa e-poçt ünvanınızı daxil edin';
        return;
    }
    
    try {
        isResetting.value = true;
        
        // API çağırışı
        await axios.post(`${API_URL}/password-reset/`, {
            email: resetEmail.value
        });
        
        // Uğurlu mesaj
        resetSuccess.value = 'Şifrə sıfırlama təlimatları e-poçtunuza göndərildi';
        
        // SweetAlert ilə bildiriş
        Swal.fire({
            icon: 'success',
            title: 'Uğurla göndərildi!',
            text: 'Şifrəni sıfırlama təlimatları e-poçt ünvanınıza göndərildi.',
            confirmButtonText: 'Anladım'
        });
        
        resetEmail.value = ''; // Formu təmizləyirik
        
    } catch (error) {
        console.error('Şifrə sıfırlama xətası:', error);
        
        if (error.response && error.response.data) {
            // API-dən gələn xüsusi xəta mesajları
            if (error.response.data.email) {
                resetError.value = error.response.data.email[0];
            } else if (error.response.data.detail) {
                resetError.value = error.response.data.detail;
            } else {
                resetError.value = 'Şifrə sıfırlama tələbini göndərərkən xəta baş verdi';
            }
        } else {
            resetError.value = 'Server ilə əlaqə yaratmaq mümkün olmadı';
        }
        
        // Xəta mesajı
        Swal.fire({
            icon: 'error',
            title: 'Xəta baş verdi',
            text: resetError.value,
            confirmButtonText: 'Bağla'
        });
    } finally {
        isResetting.value = false;
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
  z-index: 1001;
}

</style>