<template>
    <div class="container mt-10 md:mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <!-- LEFT SIDE  -->
            <div class="w-full sm:w-3/4 flex" data-aos="zoom-out-right">
                  <!-- CATEGORIES  -->
                  <div class="flex flex-col">
                    <h1 class="text-2xl font-semibold mb-10">Kateqoriyalar</h1>
                    <ul>
                      <span v-for="category in mainCategories" :key="category.id" @click="selectCategory(category)" class="font-semibold text-primary border-b border-primary cursor-pointer">{{ category.name }}</span>
                      <li v-for="subcategory in subCategories.filter(sub => sub.main_cat.id === selectedCategory?.id)" :key="subcategory.id" @click="selectSubcategory(subcategory)" class="cursor-pointer">{{ subcategory.name }}</li>
                    </ul>
                    <p class="mt-4 text-xl font-thin text-justify"></p>
                  </div>
                  <!-- CATEGORIES END  --- -->

                     <!-- SERVICE TABLE  -->
                      <div class="w-full ml-2">
                        <div>
                          <div class="flex w-full mb-4 ">
                            <input type="text" v-model="searchQuery" placeholder="Axtar" class="border px-3 py-2 rounded-md">
                            <button class="bg-primary text-white py-1 px-2 rounded-sm mx-4">Axtar</button>
                            <button class="bg-[#d7e4cc] text-main-text py-1 px-2 rounded-sm">Yenilə</button>
                          </div>
                          <table class="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th class="py-2 px-4 border-b">Xidmət adı</th>
                                <th class="py-2 px-4 border-b">Qiymət</th>
                                <th class="py-2 px-4 border-b">Say</th>
                                <th class="py-2 px-4 border-b">Səbətə at</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="service in paginatedServices" :key="service.id">
                                <td class="py-2 px-4 border-b">{{ service.name }}</td>
                                <td class="py-2 px-4 border-b">{{ service.price }}</td>
                                <td class="py-2 px-4 border-b">
                                  <input type="number" v-model.number="service.quantity" min="1" class="border px-2 py-1 rounded-md" @input="validateQuantity(service)">
                                </td>
                                <td class="py-2 px-4 border-b">
                                  <button @click="addToCart(service)" class="bg-primary text-white py-1 px-2 rounded-sm">Səbətə at</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <div v-if="totalPages > 1" class="pagination mt-8 flex justify-center">
                <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
                <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <span 
                    v-for="page in pages" 
                    :key="page" 
                    @click="goToPage(page)" 
                    :class="{ 
                        'font-bold !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                        'active-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage === page, 
                        'inactive-page !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': currentPage !== page && page !== '...',
                        'pagination-dots !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base': page === '...'
                    }"
                >
                    {{ page }}
                </span>
                <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angle-right"></i>
                </button>
                <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button !m-[2px] screen-500:!m-1 text-xs screen-400:text-sm md:text-base">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
                        </div>
                      </div>
                      <!-- SERVICE TABLE END  --- -->
            </div>

            <!-- LEFT SIDE END -->

            <!-- RIGHT SIDE  -->
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <!-- CART SIDE  -->
                  <div class="border flex flex-col items-center justify-center rounded-lg mb-5 hover:shadow-md transition-all duration-200">
                    <div class="flex items-center text-xl text-white bg-[#ef7c00] py-4 w-full justify-center">
                      <i class="fa-solid fa-cart-shopping mr-1"></i>
                      <h3>Səbət</h3>
                    </div>
                    <div class="bg-orange-100 w-full text-center py-5">
                      <p class="mb-3" v-if="cart.length === 0">Səbət boşdur</p>
                      <p class="mb-3" v-else>{{ cart.length }} xidmət - {{ totalCartPrice }} AZN</p>
                      <button @click="goToCart" class="bg-[#ef7c00] text-white px-3 py-1 rounded-lg">Səbətə bax</button>
                    </div>
                  </div>
                  <!-- CART SIDE END  -->
                <SideBanners class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

const mainCategories = ref([]);
const subCategories = ref([]);
const services = ref([]);
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
const selectedCategory = ref(null);
const selectedSubcategory = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const router = useRouter();

const fetchMainCategories = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/online-sales-main-cat-list/');
    mainCategories.value = response.data.results;
  } catch (error) {
    console.error('Error fetching main categories:', error);
  }
};

const fetchSubCategories = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/online-sales-cat-list/');
    subCategories.value = response.data.results;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
  }
};

const fetchServices = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/online-sales-product-list/');
    services.value = response.data.results;
    services.value.forEach(service => {
      if (!service.quantity) {
        service.quantity = 1;
      }
    });
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

onMounted(() => {
  fetchMainCategories();
  fetchSubCategories();
  fetchServices();
});

const filteredServices = computed(() => {
  let result = services.value;

  if (selectedSubcategory.value) {
    result = result.filter(service => service.cat === selectedSubcategory.value.id);
  } else if (selectedCategory.value) {
    result = result.filter(service => {
      const subCat = subCategories.value.find(sub => sub.main_cat.id === selectedCategory.value.id);
      return subCat && service.cat === subCat.id;
    });
  }

  if (searchQuery.value) {
    result = result.filter(service => 
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.price.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
});

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredServices.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredServices.value.length / itemsPerPage.value));

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  } else if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'];
  } else if (current >= total - 2) {
    return ['...', total - 4, total - 3, total - 2, total - 1, total];
  } else {
    return ['...', current - 1, current, current + 1, '...'];
  }
});

const selectCategory = (category) => {
  selectedCategory.value = category;
  selectedSubcategory.value = null;
  currentPage.value = 1;
};

const selectSubcategory = (subcategory) => {
  selectedSubcategory.value = subcategory;
  currentPage.value = 1;
};

const goToPage = (page) => {
  if (page === '...') return;
  currentPage.value = page;
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

const addToCart = (service) => {
  const existingItem = cart.value.find(item => item.id === service.id);
  const quantityToAdd = service.quantity || 1;
  if (existingItem) {
    existingItem.quantity += quantityToAdd;
  } else {
    cart.value.push({ ...service, quantity: quantityToAdd });
  }
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const validateQuantity = (service) => {
  if (service.quantity < 1) {
    service.quantity = 1;
  }
};

const goToCart = () => {
  router.push({ name: 'CartView' });
};

const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    const price = parseFloat(item.price.replace(' AZN', ''));
    return total + price * item.quantity;
  }, 0).toFixed(2);
});
</script>

<style scoped>
/* Pagination CSS */
.pagination {
    margin-top: 2rem;
    user-select: none;
    padding: 10px 0;
    z-index: 999999;
}

.pagination > * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination-button {
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
}

.pagination-button:hover:not(:disabled) {
    background-color: #e5e7eb;
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.active-page {
    background-color: #6ab42b;
    color: white;
    font-weight: bold;
    padding: 0 0.75rem;
}

.inactive-page {
    padding: 0 0.75rem;
    background-color: #f3f4f6;
    color: #374151;
}

.inactive-page:hover {
    background-color: #e5e7eb;
}

.pagination-dots {
    cursor: default;
    color: #6b7280;
}


/* Wrapper: input və SVG-nin valideyn konteyneri */
.input-animated-wrapper {
  position: relative;
  display: inline-block;
}

/* Input: normal görünüşü */
.input-animated-wrapper .custom-input {
  position: relative;
  z-index: 2;
  background: transparent;
  border-bottom: 1px solid lightgray;
  outline: none;
  padding: 10px 15px;
}

/* SVG: input ətrafında border effekti */
.input-animated-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #6ad649;
  stroke-width: 2;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  z-index: 1;
  pointer-events: none;
}

/* Effekt: inputa fokus olunduqda animasiya baş verir və final vəziyyət qalır */
.input-animated-wrapper .custom-input:focus + svg {
  animation: borderAnim 1.1s ease-in-out forwards;
}

/* Arzu olunarsa, inputa fokus olduqda arxa plan rəngi də verə bilərsiniz */
.input-animated-wrapper .custom-input:focus {
  background: #2bb54e11;
  transition: background 1s ease-in-out;
}

@keyframes borderAnim {
  from {
    stroke-dashoffset: 150;
  }
  to {
    stroke-dashoffset: -480;
  }
}

</style>