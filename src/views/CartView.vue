<template>
    <div class="container mt-16 text-main-text">
      <div class="flex items-center text-primary cursor-pointer lg:text-lg mb-4" @click="goBack">
        <i class="fa-solid fa-arrow-left mr-1"></i>
        <p>Geri</p>
      </div>
      <div v-if="cart.length === 0" class="text-center text-xl">
        Səbətdə heç bir məhsul yoxdur.
      </div>
      <table v-else class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Xidmət</th>
            <th class="py-2 px-4 border-b text-left">Miqdar</th>
            <th class="py-2 px-4 border-b text-left">Cəmi</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in cart" :key="item.id">
            <td class="py-2 px-4 border-b">{{ item.name }}</td>
            <td class="py-2 px-4 border-b w-32">
                <input type="number" v-model="item.quantity" min="1" class="border px-2 py-1 rounded-md w-16">
                <i class="fa-solid fa-trash cursor-pointer ml-2 text-red-500" @click="removeFromCart(item)"></i>
            </td>
            <td class="py-2 px-4 border-b w-32">{{ (parseFloat(item.price.replace(' AZN', '')) * item.quantity).toFixed(2) }} AZN</td>
            </tr>
        </tbody>
      </table>
      <!-- SUMMARY  -->
      <div v-if="cart.length > 0" class="flex justify-end mt-4">
            <div class="text-right">
                <p class="text-xl font-semibold">Yekun: {{ totalCartPrice }} AZN</p>
                <button class="bg-primary text-white py-2 px-4 rounded mt-2 greenBtn">Ödəməni tamamla</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
  
  const removeFromCart = (item) => {
    cart.value = cart.value.filter(cartItem => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };
  
  const goBack = () => {
    window.history.back();
  };
  
  const totalCartPrice = computed(() => {
    return cart.value.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' AZN', ''));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  });
  
  const router = useRouter();
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>