<template>
  <div class="search-box">
    <!-- Axtarış butonu -->
    <button class="btn-search z-[9999]" @click="toggleSearch">
      <img :src="searchIcon" alt="search" class="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] cursor-pointer ml-7 md:mb-1 lg:mb-0 lg:ml-0">
    </button>
    
    <!-- Axtarış inputu - stillərini isExpandedSearch-ə bağlayırıq -->
    <input 
      ref="searchInput"
      v-model="searchQuery" 
      type="text" 
      :class="['input-search', isExpandedSearch ? 'expanded' : '']"
      placeholder="Axtarmaq üçün yazın..."
      @input="onSearch"
      @keyup.enter="search"
      @focus="isExpandedSearch = true"
      @blur="handleBlur"
    >
    
    <!-- Axtarış nəticələri - isExpandedSearch-ə bağlayırıq -->
    <div 
      v-if="isExpandedSearch && searchQuery.length > 2 && searchResults.length > 0" 
      class="search-results absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-[9999]">
      
      <!-- Nəticə elementləri -->
      <div 
        v-for="doctor in searchResults" 
        :key="doctor.id" 
        class="result-item flex items-center p-2 hover:bg-gray-100"
        @mousedown.prevent="selectDoctor(doctor)">
        
        <div class="flex items-center w-full cursor-pointer">
          <img 
            :src="doctor.photo" 
            :alt="doctor.first_name + ' ' + doctor.last_name"
            class="w-12 h-12 rounded-full object-cover"
            onerror="this.src='https://via.placeholder.com/48?text=Şəkil+yoxdur'"
          >
          <div class="ml-3 flex-grow">
            <p class="font-medium text-sm">{{ doctor.degree }} {{ doctor.first_name }} {{ doctor.last_name }}</p>
            <p class="text-sm text-gray-600">{{ doctor.position }}</p>
          </div>
          <!-- <span class="text-primary text-sm ml-2">Keçid et</span> -->
        </div>
      </div>
    </div>
    
    <!-- Digər nəticə halları üçün də isExpandedSearch-ə bağlayırıq -->
    <div 
      v-if="isExpandedSearch && searchQuery.length > 2 && searchResults.length === 0 && !isLoading" 
      class="search-results absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center text-gray-600">
        Axtarışa uyğun nəticə tapılmadı
      </div>
    </div>
    
    <!-- Yüklənir paneli - max-w dəyişdirildi -->
    <div 
      v-if="isExpandedSearch && isLoading && searchQuery.length > 2" 
      class="search-results absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center text-gray-600 flex items-center justify-center">
        <div class="animate-spin mr-2 h-5 w-5 border-t-2 border-primary rounded-full"></div>
        Axtarılır...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
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
// Axtarış qutusu açıq/qapalı statusu
const isExpandedSearch = ref(false);

// Axtarışı açıb/bağlama
const toggleSearch = () => {
  isExpandedSearch.value = !isExpandedSearch.value;
  if (isExpandedSearch.value) {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100);
  }
};

const onSearch = () => {
  emit('search', searchQuery.value);
  
  // Axtarış sorğusu boş deyilsə, nəticələri göstər
  if (searchQuery.value.trim().length > 2) {
    showResults.value = true;
  } else {
    showResults.value = false;
  }
};

// Blur hadisəsini gecikdirmək üçün - bu, klikdən əvvəl blur olmasının qarşısını alır
const handleBlur = () => {
  setTimeout(() => {
    isExpandedSearch.value = false;
  }, 200);
};

const search = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};

// Həkimi seçmək
const selectDoctor = (doctor) => {
  console.log('Həkim seçildi:', doctor);
  
  // Parent komponentə seçilmiş həkimi bildir
  emit('select-doctor', doctor);
  
  // Input sahəsini təmizlə və dropdown'u gizlət
  searchQuery.value = '';
  isExpandedSearch.value = false;
  
  // Həkimin səhifəsinə yönləndir
  if (doctor.slug) {
    router.push(`/doctor/${doctor.slug}`);
  } else {
    router.push(`/doctor/${doctor.id}`);
  }
};

// Axtarış qutusu xaricində klik edildikdə dropdown'u bağla - buna ehtiyac yoxdur artıq
// const closeDropdown = (event) => {
//   if (!event.target.closest('.search-box')) {
//     showResults.value = false;
//   }
// };

// onMounted(() => {
//   document.addEventListener('click', closeDropdown);
// });

// onUnmounted(() => {
//   document.removeEventListener('click', closeDropdown);
// });
</script>

<style scoped>

/* Axtarış nəticələri paneli üçün CSS */
.search-box {
  position: relative; /* Əmin olaq ki, relative-dir */
}

.search-results {
  position: absolute;
  right: 0;
  top: 45px; /* Axtarış input-unun hündürlüyünə uyğun */
  z-index: 9999;
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
}

/* Scroll çubuğu stilləri */
.search-results::-webkit-scrollbar {
  width: 4px;
}

.search-results::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

.search-results::-webkit-scrollbar-thumb {
  background: #8dc63f;
  border-radius: 5px;
}

.search-results::-webkit-scrollbar-thumb:hover {
  background: #72a230;
}

.search-results {
  padding-bottom: 5px;
}

/* Input genişləndiyi zaman, search-results genişliyini ona uyğunlaşdırmaq üçün */
.input-search.expanded + .search-results,
.input-search.expanded ~ .search-results {
  width: 300px; /* Desktop-da input genişliyinə uyğun olsun */
}

.input-search {
  height: 45px;
  width: 0px;
  padding: 12px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 20px;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  padding-right: 40px;
  color: #000;
  position: absolute;
  top: -5px;
  right: 0;
  z-index: 999;
}

/* Expanded class ilə style-ı ayrı yazırıq */
.input-search.expanded {
  width: 300px;
  border-radius: 20px;
  background-color: #fff;
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid lightgray;
  position: absolute;
  top: -5px;
  right: 0;
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
  right: 0px;
  background: none;
  padding: 0;
  z-index: 9999;
}

/* Media query-lərə expanded class elavə edək */
@media screen and (max-width: 500px) {
  .input-search.expanded {
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

@media screen and (min-width: 500px) and (max-width: 768px) {
  .input-search.expanded {
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

/* Digər stiller eyni qalır */
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

/* Input genişləndiyi zaman, search-results genişliyini ona uyğunlaşdırmaq üçün */
.input-search.expanded + .search-results,
.input-search.expanded ~ .search-results {
  width: 300px; /* Desktop-da input genişliyinə uyğun olsun */
}

/* Media query-lərdə də bu dəyişiklikləri əlavə edək */
@media screen and (max-width: 500px) {
  .input-search.expanded + .search-results,
  .input-search.expanded ~ .search-results {
    width: 180px; /* Kiçik ekranlarda input genişliyinə uyğun olsun */
  }
}

@media screen and (min-width: 500px) and (max-width: 768px) {
  .input-search.expanded + .search-results,
  .input-search.expanded ~ .search-results {
    width: 250px; /* Orta ölçülü ekranlarda input genişliyinə uyğun olsun */
  }
}
</style>