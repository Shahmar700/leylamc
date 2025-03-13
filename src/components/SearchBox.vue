<template>
  <div class="search-box">
    <button class="btn-search z-[9999]" @click="focusSearchInput">
      <img :src="searchIcon" alt="search" class="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] cursor-pointer ml-7 md:mb-1 lg:mb-0 lg:ml-0">
    </button>
    <input 
      ref="searchInput"
      v-model="searchQuery" 
      type="text" 
      class="input-search" 
      placeholder="Axtarmaq üçün yazın..."
      @input="onSearch"
      @keyup.enter="search"
    >
    
    <!-- Axtarış nəticələri dropdown -->
    <div 
      v-if="showResults && searchResults.length > 0" 
      class="search-results absolute right-0 mt-1 w-full max-w-[300px] bg-white border rounded-md shadow-lg z-[9999] max-h-[300px] overflow-y-auto">
      <div 
        v-for="doctor in searchResults" 
        :key="doctor.id" 
        class="result-item flex items-center p-2 hover:bg-gray-100 cursor-pointer"
        @click="selectDoctor(doctor)">
        <img 
          :src="doctor.photo" 
          :alt="doctor.first_name + ' ' + doctor.last_name"
          class="w-12 h-12 rounded-full object-cover"
          onerror="this.src='https://via.placeholder.com/48?text=Şəkil+yoxdur'"
        >
        <div class="ml-3">
          <p class="font-medium">{{ doctor.degree }} {{ doctor.first_name }} {{ doctor.last_name }}</p>
          <p class="text-sm text-gray-600">{{ doctor.position }}</p>
        </div>
      </div>
    </div>
    
    <!-- Axtarış nəticəsi yoxdursa -->
    <div 
      v-if="showResults && searchQuery.length > 2 && searchResults.length === 0 && !isLoading" 
      class="search-results absolute right-0 mt-1 w-full max-w-[300px] bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center text-gray-600">
        Axtarışa uyğun nəticə tapılmadı
      </div>
    </div>
    
    <!-- Yüklənir indikatoru -->
    <div 
      v-if="isLoading && searchQuery.length > 2" 
      class="search-results absolute right-0 mt-1 w-full max-w-[300px] bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center text-gray-600 flex items-center justify-center">
        <div class="animate-spin mr-2 h-5 w-5 border-t-2 border-primary rounded-full"></div>
        Axtarılır...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  searchIcon: {
    type: String,
    required: true
  },
  searchResults: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['search', 'select-doctor']);

const router = useRouter();
const searchInput = ref(null);
const searchQuery = ref('');
const showResults = ref(false);

// Axtarış sorğusu dəyişdikdə həmin məlumatı parent'ə göndər
const onSearch = () => {
  emit('search', searchQuery.value);
  
  // Axtarış sorğusu boş deyilsə, nəticələri göstər
  if (searchQuery.value.trim().length > 2) {
    showResults.value = true;
  } else {
    showResults.value = false;
  }
};

// Enter düyməsinə basdıqda axtarış et
const search = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
    // Lazım olarsa: inputu təmizlə
    // searchQuery.value = '';
  }
};

// Axtarış inputuna fokuslanma
const focusSearchInput = () => {
  searchInput.value.focus();
  if (searchQuery.value.trim().length > 2) {
    showResults.value = true;
  }
};

// Həkim seçildikdə onun səhifəsinə yönləndir
const selectDoctor = (doctor) => {
  emit('select-doctor', doctor);
  searchQuery.value = ''; // İnputu təmizlə
  showResults.value = false; // Dropdown'u gizlət
};

// Axtarış qutusu xaricində klik edildikdə dropdown'u bağla
const closeDropdown = (event) => {
  if (!event.target.closest('.search-box')) {
    showResults.value = false;
  }
};

// Komponent mount olunanda klik dinləyicisi əlavə et
onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

// Komponent unmount olunanda dinləyicini təmizlə
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
/* Mövcud search-box stillərini buraya köçürün */
.search-box {
width: fit-content;
height: fit-content;
position: relative;
}

.input-search {
height: 45px;
width: 0px;
/* border: 1px solid rgba(255, 255, 255, 0.5); */
padding: 12px;
font-size: 18px;
letter-spacing: 2px;
outline: none;
border-radius: 20px;
transition: all 0.5s ease-in-out;
/* background-color: #22a6b3; */
background-color: transparent;
/* background-color: #fff; */
padding-right: 40px;
color: #000;
position: absolute;
top: -5px;
right: 0;
z-index: 999;
}

.input-search::placeholder {
color: #505050;
font-size: 18px;
letter-spacing: 2px;
font-weight: 400;
}

.btn-search {
width: 36px;
height: 36px;
display: flex;
justify-content: center;
align-items: center;
border-style: none;
font-size: 20px;
font-weight: bold;
outline: none;
cursor: pointer;
/* border-radius: 50%; */
/* position: absolute; */
right: 0px;
/* color: #ffffff; */
/* background-color: #22a6b3; */
pointer-events: painted;
background: none;
padding: 0;
z-index: 9999;
}

.btn-search:focus ~ .input-search,
.input-search:focus {
width: 300px;
border-radius: 20px;
background-color: #fff;
border-bottom-right-radius: 10px;
border-bottom: 1px solid lightgray;
transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
position: absolute;
top: -5px;
right: 0;
}

@media screen and (max-width: 500px) {
  .btn-search:focus ~ .input-search,
  .input-search:focus {
    width: 180px;
  }
  .input-search::placeholder {
  font-size: 14px;
  letter-spacing: 1px;
  }
  .input-search {
    right: -10px !important;
  }
}
@media screen and (min-width: 500px) {
  .btn-search:focus ~ .input-search,
  .input-search:focus {
    width: 250px;
  }
  .input-search::placeholder {
  font-size: 14px;
  letter-spacing: 1px;
  }
  .input-search {
    right: -10px !important;
  }
}

.input-search:focus ~ .btn-search {
background-color: green;
color: white;
}

/* Axtarış nəticələri üçün əlavə CSS */
.search-results {
  right: 0;
  z-index: 9999;
}

.result-item {
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #f1fff0;
}

/* Hover zamanı axtarış qutusu genişlənəndə nəticələri də həmin genişliyə uyğunlaşdır */
.btn-search:focus ~ .search-results,
.input-search:focus ~ .search-results {
  width: 300px;
}

@media screen and (max-width: 500px) {
  .btn-search:focus ~ .search-results,
  .input-search:focus ~ .search-results {
    width: 180px;
  }
}
@media screen and (min-width: 500px) {
  .btn-search:focus ~ .search-results,
  .input-search:focus ~ .search-results {
    width: 250px;
  }
}
</style>