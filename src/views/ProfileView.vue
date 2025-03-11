<template>
  <div class="container mx-auto py-8 mt-24 px-4">
    <div class="max-w-7xl mx-auto">
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
          <div class="bg-gradient-to-r from-primary to-blue-500 p-6 sm:p-8 text-white">
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
            <div class="flex flex-col md:flex-row gap-8">
              <!-- Sol panel - Şəxsi məlumatlar -->
              <div class="flex-1">
                <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  <!-- İstifadəçi adı -->
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex items-center mb-2">
                      <i class="fas fa-user text-primary mr-2"></i>
                      <span class="text-sm font-medium text-gray-500">İstifadəçi adı</span>
                    </div>
                    <p class="text-gray-800 font-medium">{{ userProfile.username || username }}</p>
                  </div>
                  
                  <!-- E-poçt -->
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex items-center mb-2">
                      <i class="fas fa-envelope text-primary mr-2"></i>
                      <span class="text-sm font-medium text-gray-500">E-poçt</span>
                    </div>
                    <p class="text-gray-800 font-medium">{{ userProfile.email || 'Qeyd edilməyib' }}</p>
                  </div>
                  
                  <!-- Ad -->
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex items-center mb-2">
                      <i class="fas fa-id-card text-primary mr-2"></i>
                      <span class="text-sm font-medium text-gray-500">Ad</span>
                    </div>
                    <p class="text-gray-800 font-medium">{{ userProfile.first_name || 'Qeyd edilməyib' }}</p>
                  </div>
                  
                  <!-- Soyad -->
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex items-center mb-2">
                      <i class="fas fa-id-card text-primary mr-2"></i>
                      <span class="text-sm font-medium text-gray-500">Soyad</span>
                    </div>
                    <p class="text-gray-800 font-medium">{{ userProfile.last_name || 'Qeyd edilməyib' }}</p>
                  </div>
                  
                  <!-- Telefon -->
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex items-center mb-2">
                      <i class="fas fa-phone text-primary mr-2"></i>
                      <span class="text-sm font-medium text-gray-500">Telefon</span>
                    </div>
                    <p class="text-gray-800 font-medium">{{ userProfile.phone_number || 'Qeyd edilməyib' }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Sağ panel - Şifrə dəyişdirmə bölməsi -->
              <div class="flex-1">
                <!-- Şifrə dəyişdirmə düyməsi -->
                <div v-if="!isPasswordFormVisible" class="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                  <i class="fas fa-lock text-primary text-4xl mb-4"></i>
                  <h3 class="text-lg font-medium text-gray-800 mb-4">Şifrənizi dəyişdirmək istəyirsiniz?</h3>
                  <button 
                    @click="togglePasswordForm" 
                    class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 focus:outline-none"
                  >
                    <i class="fas fa-key mr-2"></i>
                    Şifrəni dəyişdir
                  </button>
                </div>
                
                <!-- Şifrə dəyişdirmə formu -->
                <transition name="form-slide">
                  <div v-if="isPasswordFormVisible" class="bg-gray-50 border border-gray-100 rounded-lg shadow-sm">
                    <div class="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
                      <h2 class="text-xl font-semibold text-gray-800">Şifrə Dəyişdir</h2>
                      <button @click="togglePasswordForm" class="text-gray-500 hover:text-gray-700" title="Bağla">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <form @submit.prevent="changePassword" class="p-6">
                      <!-- Xəta/Uğur mesajları -->
                      <div v-if="passwordError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                        <p>{{ passwordError }}</p>
                      </div>
                      
                      <div v-if="passwordSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                        <p>{{ passwordSuccess }}</p>
                      </div>
                      
                      <!-- Cari şifrə -->
                      <div class="mb-4">
                        <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Cari şifrə</label>
                        <div class="relative">
                          <input 
                            :type="showCurrentPassword ? 'text' : 'password'"
                            v-model="currentPassword"
                            id="currentPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Cari şifrənizi daxil edin"
                          />
                          <button 
                            type="button" 
                            @click="showCurrentPassword = !showCurrentPassword" 
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                          >
                            <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Yeni şifrə -->
                      <div class="mb-4">
                        <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Yeni şifrə</label>
                        <div class="relative">
                          <input 
                            :type="showNewPassword ? 'text' : 'password'"
                            v-model="newPassword"
                            id="newPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Yeni şifrənizi daxil edin"
                          />
                          <button 
                            type="button" 
                            @click="showNewPassword = !showNewPassword" 
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                          >
                            <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Yeni şifrə təkrar -->
                      <div class="mb-6">
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Yeni şifrə (təkrar)</label>
                        <div class="relative">
                          <input 
                            :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="confirmPassword"
                            id="confirmPassword"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Yeni şifrənizi təkrar daxil edin"
                          />
                          <button 
                            type="button" 
                            @click="showConfirmPassword = !showConfirmPassword" 
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                          >
                            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Təsdiqlə düyməsi -->
                      <button 
                        type="submit" 
                        class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center"
                        :disabled="isChangingPassword"
                      >
                        <i v-if="isChangingPassword" class="fas fa-spinner fa-spin mr-2"></i>
                        {{ isChangingPassword ? 'Şifrə dəyişdirilir...' : 'Şifrəni dəyişdir' }}
                      </button>
                    </form>
                  </div>
                </transition>
              </div>
            </div>
            
            <!-- Əlavə imkanlar bölməsi -->
            <div class="mt-8 border-t pt-6">
              <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
                <button @click="toggleEditForm" class="btn-secondary flex items-center justify-center">
                  <i class="fas fa-edit mr-2"></i> Profili redaktə et
                </button>
                <button @click="logout" class="btn-danger flex items-center justify-center">
                  <i class="fas fa-sign-out-alt mr-2"></i> Çıxış et
                </button>
              </div>
            </div>

            <!-- Profil redaktə et modal -->
              <div v-if="isEditFormVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                  <div class="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
                    <h2 class="text-xl font-semibold text-gray-800">Profili Redaktə Et</h2>
                    <button @click="toggleEditForm" class="text-gray-500 hover:text-gray-700" title="Bağla">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <form @submit.prevent="updateProfile" class="p-6">
                    <!-- Xəta/Uğur mesajları -->
                    <div v-if="editError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                      <p>{{ editError }}</p>
                    </div>
                    
                    <div v-if="editSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                      <p>{{ editSuccess }}</p>
                    </div>
                    
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                      <!-- Ad -->
                      <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                        <input 
                          v-model="editForm.first_name"
                          type="text"
                          id="first_name"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Adınızı daxil edin"
                        />
                      </div>
                      
                      <!-- Soyad -->
                      <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                        <input 
                          v-model="editForm.last_name"
                          type="text"
                          id="last_name"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Soyadınızı daxil edin"
                        />
                      </div>
                    </div>
                    
                    <!-- Telefon -->
                    <div class="mb-6">
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input 
                        v-model="editForm.phone_number"
                        type="tel"
                        id="phone"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Telefon nömrənizi daxil edin"
                      />
                      <p class="text-xs text-gray-500 mt-1">Nümunə: +994501234567</p>
                    </div>
                    
                    <!-- Email (disabled, read-only) -->
                    <div class="mb-6">
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-poçt (dəyişdirilə bilməz)</label>
                      <input 
                        v-model="userProfile.email"
                        type="email"
                        id="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        disabled
                        readonly
                      />
                    </div>
                    
                    <!-- Təsdiq düyməsi -->
                    <div class="flex items-center justify-end mt-6">
                      <button 
                        type="button"
                        @click="toggleEditForm"
                        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-3"
                      >
                        Ləğv et
                      </button>
                      <button 
                        type="submit"
                        class="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all duration-300 flex items-center"
                        :disabled="isUpdating"
                      >
                        <i v-if="isUpdating" class="fas fa-spinner fa-spin mr-2"></i>
                        {{ isUpdating ? 'Yenilənir...' : 'Yadda saxla' }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { useAuthStore } from '@/store/auth'; 
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();
const userProfile = ref({});
const isLoading = ref(true);
const error = ref(null);
const username = authStore.username;

// Şifrə dəyişmək üçün
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const passwordSuccess = ref('');
const isChangingPassword = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Şifrə formunun görünmə vəziyyəti
const isPasswordFormVisible = ref(false);

// Form görünüşünü dəyişmək üçün funksiya
const togglePasswordForm = () => {
  // Form gizlədilirsə - bütün formu sıfırlamaq
  if (isPasswordFormVisible.value) {
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    passwordError.value = '';
    passwordSuccess.value = '';
  }
  
  isPasswordFormVisible.value = !isPasswordFormVisible.value;
};

// Profil redaktə etmək üçün
const isEditFormVisible = ref(false);
const isUpdating = ref(false);
const editError = ref('');
const editSuccess = ref('');


// Redaktə formu
const editForm = reactive({
  first_name: '',
  last_name: '',
  phone_number: ''
});

// Form görünüşünü dəyişmək üçün funksiya
const toggleEditForm = () => {
  if (!isEditFormVisible.value) {
    // Formu açırkən cari dəyərləri yükləyirik
    editForm.first_name = userProfile.value.first_name || '';
    editForm.last_name = userProfile.value.last_name || '';
    editForm.phone_number = userProfile.value.phone_number || '';
  }
  
  // Xəta və uğur mesajlarını sıfırlayırıq
  editError.value = '';
  editSuccess.value = '';
  
  isEditFormVisible.value = !isEditFormVisible.value;
};

// Profil məlumatlarını yeniləmək üçün funksiya
const updateProfile = async () => {
  editError.value = '';
  editSuccess.value = '';
  
  try {
    isUpdating.value = true;
    
    // API-yə sorğu göndəririk
    const response = await api.patch(`http://bytexerp.online/api/leyla/v1/user-update/`, {
      first_name: editForm.first_name,
      last_name: editForm.last_name,
      phone_number: editForm.phone_number
    });
    
    // Profil məlumatlarını yeniləyirik
    userProfile.value = {
      ...userProfile.value,
      first_name: editForm.first_name,
      last_name: editForm.last_name,
      phone_number: editForm.phone_number
    };
    
    // Uğurlu nəticə
    editSuccess.value = 'Profil məlumatlarınız uğurla yeniləndi';
    
    Swal.fire({
      icon: 'success',
      title: 'Profil yeniləndi!',
      text: 'Məlumatlarınız uğurla yeniləndi.',
      confirmButtonText: 'Anladım'
    });
    
    // Qısa müddətdən sonra formu bağlayırıq
    setTimeout(() => {
      isEditFormVisible.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Profil yeniləmə xətası:', err);
    
    if (err.response && err.response.data) {
      // Xəta mesajlarını emal edirik
      if (err.response.data.first_name) {
        editError.value = err.response.data.first_name[0];
      } else if (err.response.data.last_name) {
        editError.value = err.response.data.last_name[0];
      } else if (err.response.data.phone_number) {
        editError.value = err.response.data.phone_number[0];
      } else if (err.response.data.detail) {
        editError.value = err.response.data.detail;
      } else {
        editError.value = 'Profilinizi yeniləmək mümkün olmadı';
      }
    } else {
      editError.value = 'Server ilə əlaqə zamanı xəta baş verdi';
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Xəta baş verdi',
      text: editError.value,
      confirmButtonText: 'Bağla'
    });
  } finally {
    isUpdating.value = false;
  }
};


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
  authStore.logout();
  router.push('/');
};

const changePassword = async () => {
  passwordError.value = '';
  passwordSuccess.value = '';
  
  // Validation
  if (!currentPassword.value) {
    passwordError.value = 'Cari şifrənizi daxil edin';
    return;
  }
  
  if (!newPassword.value) {
    passwordError.value = 'Yeni şifrənizi daxil edin';
    return;
  }
  
  if (newPassword.value.length < 8) {
    passwordError.value = 'Şifrəniz ən az 8 simvol olmalıdır';
    return;
  }
  
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Yeni şifrələr üst-üstə düşmür';
    return;
  }
  
  try {
    isChangingPassword.value = true;
    
    await api.post('http://bytexerp.online/api/change-password/', {
      old_password: currentPassword.value,
      new_password: newPassword.value,
    });
    
    passwordSuccess.value = 'Şifrəniz uğurla dəyişdirildi';
    
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    
    Swal.fire({
      icon: 'success',
      title: 'Şifrə dəyişdirildi!',
      text: 'Şifrəniz uğurla yeniləndi.',
      confirmButtonText: 'Anladım'
    });
    
    // Əməliyyat uğurludursa, formu gizlədək
    setTimeout(() => {
      isPasswordFormVisible.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Şifrə dəyişdirmə xətası:', err);
    
    if (err.response && err.response.data) {
      if (err.response.data.old_password) {
        passwordError.value = err.response.data.old_password[0];
      } else if (err.response.data.new_password) {
        passwordError.value = err.response.data.new_password[0];
      } else if (err.response.data.detail) {
        passwordError.value = err.response.data.detail;
      } else {
        passwordError.value = 'Şifrənizi dəyişdirmək mümkün olmadı';
      }
    } else {
      passwordError.value = 'Server ilə əlaqə zamanı xəta baş verdi';
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Xəta baş verdi',
      text: passwordError.value,
      confirmButtonText: 'Bağla'
    });
    
  } finally {
    isChangingPassword.value = false;
  }
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

/* Şifrə giriş sahələri üçün ikonlar */
.fa-eye, .fa-eye-slash {
  cursor: pointer;
}

/* Form elementləri üçün animasiyalar */
input {
  transition: all 0.2s ease-in-out;
}

button {
  transition: all 0.2s ease-in-out;
}

/* Form keçid animasiyası */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s ease-out;
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
  overflow: hidden;
}

.form-slide-enter-from,
.form-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  overflow: hidden;
}

/* Responsive dizayn düzəlişləri */
@media (max-width: 768px) {
  .flex-1 {
    margin-top: 1.5rem;
  }
}

/* Modal üçün animasiya */
@keyframes modalFade {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fixed {
  animation: modalFade 0.2s ease-out;
}
</style>