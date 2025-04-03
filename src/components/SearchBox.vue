<template>
  <div class="search-box">
    <!-- Axtarış butonu -->
    <button class="btn-search z-[9999]" @click="toggleSearch">
      <img :src="searchIcon" alt="search" class="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] cursor-pointer ml-7 md:mb-1 lg:mb-0 lg:ml-0">
    </button>
    
    <!-- Axtarış inputu - stillərini isExpandedSearch-ə bağlayırıq -->
    <input 
      ref="searchInput"
      v-model.trim="searchQuery" 
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
      class="search-results absolute right-0 mt-1 w-full max-h-[350px] screen-500:max-h-[400px] bg-white border rounded-md shadow-lg z-[9999]">
      
      <!-- Nəticə elementləri -->
      <div 
        v-for="result in searchResults" 
        :key="result.id" 
        class="result-item flex items-center p-2 hover:bg-gray-100"
        @mousedown.prevent="selectDoctor(result)">
        
        <div class="flex items-center w-full cursor-pointer">
          <!-- Şəkil varsa göstər, yoxdursa göstərmə -->
          <img 
            v-if="result.photo"
            :src="result.photo" 
            :alt="result.first_name + ' ' + result.last_name"
            class="w-12 h-12 rounded-full object-cover"
            onerror="this.src='https://via.placeholder.com/48?text=Şəkil+yoxdur'"
          >
          
          <!-- Şəkilsiz nəticələr üçün məlumat hissəsi (soldan boşluq olmadan) -->
          <div :class="[result.photo ? 'ml-3' : '', 'flex-grow']">
            <p class="font-medium text-sm">
              <!-- Tipi rəngli göstəririk -->
              <span v-if="result.degree" class="text-primary font-semibold">{{ result.degree }}</span>
              {{ result.first_name }} {{ result.last_name }}
              <!-- PDF icon - müəllif nəticələri üçün -->
              <i v-if="result.isAuthor" class="fas fa-file-pdf text-red-500 ml-2"></i>
            </p>
            <p class="text-sm text-gray-600">{{ result.position }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Digər nəticə halları üçün də isExpandedSearch-ə bağlayırıq -->
    <div 
      v-if="isExpandedSearch && searchQuery.length > 2 && searchResults.length === 0 && !isLoading" 
      class="search-results absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center font-normal text-sm md:text-base lg:text-lg text-gray-600">
        Axtarışa uyğun nəticə tapılmadı
      </div>
    </div>
    
    <!-- Yüklənir paneli - max-w dəyişdirildi -->
    <div 
      v-if="isExpandedSearch && isLoading && searchQuery.length > 2" 
      class="search-results absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-[9999]">
      <div class="p-3 text-center text-gray-600 flex items-center justify-center">
        <div class="animate-spin mr-2 h-5 w-5 border-t-2 border-primary rounded-full"></div>
        <span class="text-base">Axtarılır...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, nextTick } from 'vue';
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

// Həkimi seçmək - daha sadə yönləndirmə formatı ilə
const selectDoctor = async (doctor) => {
  console.log('Həkim seçildi:', doctor);
  
  try {
    // 1. İlk öncə axtarış mətni təmizlənir
    searchQuery.value = '';
    
    // 2. Göstərmə şərtlərini idarə edən vəziyyətləri dəyişir
    isExpandedSearch.value = false;
    showResults.value = false;
    
    // 3. Explicit blur/unfocus the search input
    if (searchInput.value) {
      searchInput.value.blur();
    }
    
    // 4. Vue-nun DOM yeniləməsini gözləyirik
    await nextTick();
    
    // 5. Əlavə tədbir kimi DOM elementini birbaşa gizlədirik
    const searchResults = document.querySelectorAll('.search-results');
    if (searchResults.length) {
      searchResults.forEach(el => {
        el.style.display = 'none';
      });
    }
    
    // 6. Parent komponentə seçilmiş həkimi bildiririk
    emit('select-doctor', doctor);
    
    // 7. ÇOX SADƏ: Həkimin səhifəsinə yönləndirmə - təmiz URL ilə
    if (doctor.slug) {
      router.push(`/doctor/${doctor.slug}`); // Ən sadə format
    } else {
      router.push(`/doctor/${doctor.id}`); // ID ilə
    }
  } catch (error) {
    console.error('Həkim seçimi xətası:', error);
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
  font-weight: lighter;
}

.search-results {
  position: absolute;
  right: -10px !important;
  top: 37px; /* Axtarış input-unun hündürlüyünə uyğun */
  z-index: 9999;
  width: 100%;
  overflow-y: scroll;
}
@media screen and (min-width: 768px) {
  .search-results {
    right: 0 !important;
  }
}

@media screen and (max-width: 400px) {
.search-results  {
    width: 270px !important;
  }
}
/* @media screen and (max-width: 768px) {
.search-results  {
    width: 300px !important;
  }
} */

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
  cursor: pointer;
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
  cursor: text;
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