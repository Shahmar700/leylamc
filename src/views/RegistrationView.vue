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
              <div class="relative flex items-center">
                <span class="absolute left-2 text-gray-500">+</span>
                <input v-model="phone" @input="validatePhone" name="phone" type="tel" required class="w-full bg-transparent text-xs border-b border-gray-300 focus:border-primary pl-6 pr-8 py-1 outline-none" placeholder="994 77 123 45 67" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 004.52.91 1 1 0 011 1v3.5a1 1 0 01-1 1A19.92 19.92 0 012 4.5a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.91 4.52 1 1 0 01-.27 1.11l-2.2 2.2z"/>
                </svg>
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
import LoginModal from '@/components/LoginModal.vue';

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

const isNameValid = computed(() => name.value.length >= 2);
const isSurnameValid = computed(() => surname.value.length >= 2);
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isPhoneValid = computed(() => /^\d{10}$/.test(phone.value)); // 10 rəqəmli mobil nömrə üçün şərt
const isPasswordValid = computed(() => password.value.length >= 6);
const isConfirmPasswordValid = computed(() => confirmPassword.value === password.value);

const validatePhone = () => {
  phone.value = phone.value.replace(/\D/g, ''); // Yalnız rəqəmləri saxla
};

const validateForm = () => {
  formSubmitted.value = true;

  if (isNameValid.value && isSurnameValid.value && isEmailValid.value && isPhoneValid.value && isPasswordValid.value && isConfirmPasswordValid.value) {
    // Form is valid, proceed with submission
  } else {
    // Form is invalid, show error messages
  }
};



</script>


<style scoped>


</style>