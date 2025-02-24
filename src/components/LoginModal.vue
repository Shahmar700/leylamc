
<template>
  <div class="modal-overlay">
    <div class="modal-content relative">
        <i @click="closeModal" class="fa-solid fa-xmark absolute top-7 right-7 cursor-pointer"></i>
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
          <h2 class="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Hesabınıza daxil olun</h2>
           <p class="text-base font-light text-gray-700 dark:text-gray-400">
            Hələ qeydiyyatınız yoxdur? <router-link :to="{name: 'registration'}" class="font-medium text-primary-600 text-[#ef7c00] underline hover:underline dark:text-primary-500" @click="closeModal">Qeydiyyat</router-link>
            </p>
        </div>
    
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm/6 font-medium text-gray-900">E-poçt</label>
              <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" placeholder="E-poçt adresini daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" />
              </div>
            </div>
    
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Şifrə</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-primary">Forgot password?</a>
                </div>
              </div>
              <div class="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password" placeholder="Şifrənizi daxil edin" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 border-gray-200 border" />
              </div>
            </div>
    
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
    
        
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close')
}

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