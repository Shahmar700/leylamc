<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="font-[sans-serif] bg-white md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-8 h-full">
        <div class="max-md:order-1 p-3 h-full rounded-xl bg-[#f6fafd]"  data-aos="fade-right">
          <img src="@/assets/images/Leyla_Building.png" class="w-full h-full aspect-square object-contain block mx-auto rounded-xl" alt="login-image" />
        </div>

        <div class="flex items-center p-6 h-full w-full shadow-md rounded-md" data-aos="fade-left">
          <form class="max-w-lg w-full mx-auto">
            <div class="mb-8">
              <h3 class="text-primary text-2xl font-bold max-md:text-center">Yeni hesab yaradın</h3>
            </div>

            <!-- Ad sahəsindən əvvəl əlavə edin -->
            <div class="mt-6">
              <label :class="{'text-red-500': !isUsernameValid && formSubmitted}" class="text-gray-800 text-xs md:text-base block mb-1">İstifadəçi adı</label>
              <span v-if="formSubmitted && !isUsernameValid" class="text-lightgray text-xs">Minimal 3 simvol</span>
              <div class="relative flex items-center">
                <input v-model="username" name="username" type="text" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-primary pl-2 pr-8 py-1 outline-none" placeholder="İstifadəçi adı daxil edin" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="mt-6">
              <label :class="{'text-red-500': !isNameValid && formSubmitted}" class="text-gray-800 text-xs md:text-base  block mb-1">Ad</label>
              <span v-if="formSubmitted && !isNameValid" class="text-lightgray text-xs">Minimal 2 simvol</span>
              <div class="relative flex items-center">
                <input v-model="name" name="name" type="text" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-primary pl-2 pr-8 py-1 outline-none" placeholder="Adınızı daxil edin" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
              
            </div>
            <!-- Surname  -->
            <div class="mt-6">
              <label :class="{'text-red-500': !isSurnameValid && formSubmitted}" class="text-gray-800 text-xs md:text-base  block mb-1">Soyad</label>
              <span v-if="formSubmitted && !isSurnameValid" class="text-lightgray text-xs">Minimal 2 simvol</span>
              <div class="relative flex items-center">
                <input v-model="surname" name="surname" type="text" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-primary pl-2 pr-8 py-1 outline-none" placeholder="Soyadınızı daxil edin" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <!-- Tel Number  -->
            <div class="mt-6">
              <label :class="{'text-red-500': !isPhoneValid && formSubmitted}" class="text-gray-800 text-xs md:text-base block mb-1">Mobil nömrə</label>
              <span v-if="formSubmitted && !isPhoneValid" class="text-lightgray text-xs">Düzgün mobil nömrə daxil edin</span>
              <div class="relative flex flex-col w-full">
                <!-- Ölkə kodu seçimi (absolute) -->
                <select
                v-model="selectedCountry"
                class="absolute inset-y-0 left-0 pl-2 pr-6 border-r border-gray-300 bg-transparent focus:outline-none appearance-none"
                >
                <option
                    v-for="country in countries"
                    :key="country.code"
                    :value="country"
                >
                    {{ country.flag }} {{ country.dial_code }}
                </option>
                </select>

                <!-- Telefon nömrəsi üçün input -->
                <input
                type="text"
                v-model="phone"
                @input="validatePhone"
                class="w-full pl-24 pr-2 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="Telefon nömrəsi"
                />
              </div>
            </div>

            
            <!-- E-mail  -->
            <div class="mt-6">
              <label :class="{'text-red-500': !isEmailValid && formSubmitted}" class="text-gray-800 text-xs md:text-base  block mb-1">E-poçt</label>
              <span v-if="formSubmitted && !isEmailValid" class="text-lightgray text-xs">E-poçt düzgün formada daxil edin</span>
              <div class="relative flex items-center">
                <input v-model="email" name="email" type="email" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-primary pl-2 pr-8 py-1 outline-none" placeholder="Elektron adresinizi daxil edin" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              
            </div>

            <!-- Password  -->
            <div class="mt-6">
              <label :class="{'text-red-500': !isPasswordValid && formSubmitted}" class="text-gray-800 text-xs md:text-base  block mb-1">Şifrə</label>
              <span v-if="formSubmitted && !isPasswordValid" class="text-lightgray text-xs">Minimal 6 simvol daxil edin</span>
              <div class="relative flex items-center">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-1 outline-none" placeholder="Şifrənizi daxil edin" />
                <svg class="w-[18px] h-[18px] absolute right-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" fill="#bbb" stroke="#bbb">
                  <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
                </svg>
              </div>
            </div>

            <!-- Password Confirm -->
            <div class="mt-6">
                <label :class="{'text-red-500': !isConfirmPasswordValid && formSubmitted}" class="text-gray-800 text-xs md:text-base  block mb-1">Şifrə təsdiq</label>
                <span v-if="formSubmitted && !isConfirmPasswordValid" class="text-lightgray text-xs">Şifrəni düzgün daxil edin</span>
                <div class="relative flex items-center">
                  <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" name="confirmPassword" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-1 outline-none" placeholder="Şifrənizi təkrar daxil edin" />
                  <svg class="w-[18px] h-[18px] absolute right-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" fill="#bbb" stroke="#bbb">
                    <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
                  </svg>
                </div>
              </div>


            <!-- Button  -->
            <div class="mt-8">
              <button  @click="validateForm" type="button" class="w-full py-2.5 px-4 text-sm tracking-wider rounded-md border border-primary bg-transparent hover:bg-primary text-primary hover:text-white focus:outline-none transition-all duration-200 font-bold">
                Hesab yaradın
              </button>
              <p class="text-sm md:text-base mt-6 text-gray-800">Artıq qeydiyyatdan keçmisiz? <a href="javascript:void(0);" @click="toggleModal"  class="text-primary font-semibold hover:underline ml-1">Daxil olun</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
        </div>
        <LoginModal v-if="showModal" @close="toggleModal" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import LoginModal from '@/components/LoginModal.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Swal from 'sweetalert2';

const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);


const toggleModal = () => {
  showModal.value = !showModal.value;
};

// Input Validate 
const name = ref('');
const surname = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const formSubmitted = ref(false);

const isUsernameValid = computed(() => username.value.length >= 3);

const isNameValid = computed(() => name.value.length >= 2);
const isSurnameValid = computed(() => surname.value.length >= 2);
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isPhoneValid = computed(() => /^\d+$/.test(phone.value)); // Yalnız rəqəmləri yoxlayır
const isPasswordValid = computed(() => password.value.length >= 6);
const isConfirmPasswordValid = computed(() => confirmPassword.value === password.value);

const validatePhone = () => {
  phone.value = phone.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};



// Ölkə kodları üçün məlumatlar
const countries = ref([
  { name: 'Azərbaycan', dial_code: '+994', code: 'AZ', flag: '🇦🇿' },
  { name: 'Türkiye', dial_code: '+90', code: 'TR', flag: '🇹🇷' },
  { name: 'Rusiya', dial_code: '+7', code: 'RU', flag: '🇷🇺' },
  { name: 'ABŞ', dial_code: '+1', code: 'US', flag: '🇺🇸' },
  { name: 'Özbəkistan', dial_code: '+998', code: 'UZ', flag: '🇺🇿' },
  { name: 'Gürcüstan', dial_code: '+995', code: 'GE', flag: '🇬🇪' },
  { name: 'Türkmənistan', dial_code: '+993', code: 'TM', flag: '🇹🇲' },
]);

const selectedCountry = ref(countries.value[0]);

// AUTH 

import authService from '@/services/auth';
import api from '@/services/api';

const username = ref('');
const validateForm = async () => {
  formSubmitted.value = true;

  if (isNameValid.value && isSurnameValid.value && isEmailValid.value && 
      isPhoneValid.value && isPasswordValid.value && isConfirmPasswordValid.value && 
      isUsernameValid.value) {
    
    try {
      // 1. Əvvəlcə qeydiyyat API-nə sorğu
      const registerPayload = {
        username: username.value,
        first_name: name.value,
        last_name: surname.value,
        email: email.value,
        password: password.value,
        profile: {
          phone: selectedCountry.value.dial_code + phone.value // Düzgün format - nested obyekt içərisində
        }
      };
      
      console.log('Göndərilən qeydiyyat məlumatları:', registerPayload);
      console.log('Telefon nömrəsi:', selectedCountry.value.dial_code + phone.value);
      
      // İndi api servisini istifadə edirik
      const registerResponse = await api.post(
        '/leyla/v1/register-create/', 
        registerPayload
      );
      
      console.log('Qeydiyyat uğurlu:', registerResponse.data);
      
      // 2. Qeydiyyatdan sonra login üçün token alma
      await authService.login(username.value, password.value);
      
      // 3. Uğurlu qeydiyyat mesajı və ya yönləndirmə
      Swal.fire({
        icon: 'success',
        title: 'Qeydiyyat uğurlu!',
        text: 'Hesabınız uğurla yaradıldı.',
        confirmButtonText: 'Davam et'
      }).then((result) => {
        // İstifadəçini ana səhifəyə yönləndiririk
        router.push('/');
      });
      
    } catch (error) {
      console.error('Qeydiyyat xətası:', error);

      // Xəta mesajını daha ətraflı hazırlayaq
      let errorMessage = 'Qeydiyyat zamanı xəta baş verdi.';
      let errorDetails = '';
      
      // Xəta mesajını göstər
      if (error.response && error.response.data) {
        // Backend-dən gələn xətanı formatla
        const responseData = error.response.data;
        
        // Email və ya istifadəçi adı təkrarlanması
        if ((responseData.email && responseData.email.includes('already exists')) || 
            (responseData.username && responseData.username.includes('already exists'))) {
          
          if (responseData.email && responseData.email.includes('already exists')) {
            errorMessage = 'Hesab artıq mövcuddur';
            errorDetails = 'Bu e-poçt ünvanı ilə artıq qeydiyyatdan keçilib.';
          } else {
            errorMessage = 'Hesab artıq mövcuddur';
            errorDetails = 'Bu istifadəçi adı artıq istifadə olunur.';
          }
        }
        // Ümumi xəta mesajları
        else if (typeof responseData === 'string') {
          errorDetails = responseData;
        } 
        // Username ilə bağlı xəta
        else if (responseData.username) {
          errorMessage = 'İstifadəçi adı ilə bağlı xəta';
          errorDetails = Array.isArray(responseData.username) 
            ? responseData.username[0] 
            : responseData.username;
        } 
        // Email ilə bağlı xəta 
        else if (responseData.email) {
          errorMessage = 'E-poçt ünvanı ilə bağlı xəta';
          errorDetails = Array.isArray(responseData.email) 
            ? responseData.email[0] 
            : responseData.email;
        } 
        // Digər xətalar 
        else {
          errorDetails = JSON.stringify(responseData);
        }
      } else {
        errorDetails = 'Server ilə əlaqə yaratmaq mümkün olmadı.';
      }
      
      // SweetAlert ilə xətanı göstər
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        text: errorDetails,
        confirmButtonText: 'Bağla',
        confirmButtonColor: '#dc3545'
      });
    }
  }
};
</script>


<style scoped>


</style>