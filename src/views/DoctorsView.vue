<template>
  <div class="container mt-17">
    <!-- Filters Section - Conditional -->
    <div v-if="!isLoading && !error"> 
      <!-- Doctor Filters  -->
      <form @submit.prevent="filterDoctors" class="flex flex-col md:flex-row gap-4 mt-5 items-center text-base lg:text-lg">
        <!-- Form content remains the same -->
        <div class="flex flex-col w-full ">
            <label for="name" class="mb-1 !text-main-text">Həkimin Adı, Soyadı</label>
            <input type="text" id="name" v-model="name" class="border border-gray-300 p-2 rounded-md !h-[47px] outline-primary" placeholder="Həkimin Adı, Soyadı">
        </div>
        <!-- Specializations -->
        <div class="flex flex-col w-full ">
            <label for="specializations" class="mb-1 !text-main-text">İxtisas seçin</label>
            <multiselect 
            v-model="selectedSpecializations" 
              :options="filteredSpecializations" 
              :multiple="true" 
              placeholder="İxtisas seçin" 
              label="specialty" 
              track-by="specialty" 
              class="rounded-md !h-[47px]"
              selectLabel="Seçmək üçün Enter düyməsini basın"
              selectedLabel="Seçildi"
              deselectLabel="Çıxarmaq üçün Enter basın"
              :customLabel="specialtyCustomLabel"
            ></multiselect>
        </div>
        <!-- Select a department  -->
        <div class="flex flex-col w-full ">
            <label for="department" class="mb-1 !text-main-text">Şöbə seçin</label>
            <multiselect v-model="selectedDepartments" 
              :options="filteredDepartments" 
              :multiple="true" 
              placeholder="Şöbə seçin" 
              label="name" 
              track-by="name" 
              class="rounded-md !h-[47px]"
              selectLabel="Seçmək üçün Enter düyməsini basın"
              selectedLabel="Seçildi"
              deselectLabel="Çıxarmaq üçün Enter basın"
              :customLabel="customLabel">
            </multiselect>
        </div>
      </form>
    </div>

    <!-- Error Indicator Section - Conditional -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
      <div class="flex items-center">
        <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- Content Container - Fixed Min Height -->
    <div class="doctors-content-container" style="min-height: 600px">
      <!-- Loading State -->
      <div v-if="isLoading">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonDoctorCard v-for="n in 8" :key="n" class="mt-6" />
        </div>
      </div>
      
      <!-- Loaded Content -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DoctorCard
            v-for="doctor in paginatedDoctors"
            :key="doctor.id"
            :image="doctor.photo"
            :name="`${doctor.degree} ${doctor.first_name} ${doctor.last_name}`"
            :position="doctor.position"
            @click="goToDoctor(doctor)"
            class="mt-6"
          />
        </div>
      </div>
    </div>

    <!-- Pagination - ALWAYS VISIBLE when needed, regardless of loading state -->
    <div v-if="totalPages > 1" class="pagination mt-8 flex justify-center sticky bottom-0 bg-white py-2 shadow-md z-10">
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
    <Maps class="mt-14 sm:mt-24" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from 'axios';
import { useHead } from '@vueuse/head'; // Əlavə et
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";
import SkeletonDoctorCard from '@/components/SkeletonDoctorCard.vue';
import Maps from "@/components/Maps.vue"; // Yeni komponenti import edirik


// Skeleton loading hookunu 400ms gecikdirmə ilə çağırırıq
const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(1000);

// Yüklənmə vəziyyəti üçün əlavə dəyişən
const isLoading = ref(true);
const error = ref(null);

import { useRouter } from 'vue-router';
const router = useRouter();


const goToDoctor = (doctor) => {
  // Sadəcə slug istifadə edək, query parametrlərini ləğv edək
  router.push({ 
    name: 'doctor', 
    params: { id: doctor.slug }
    // query parametri silindi
  });
};

import DoctorCard from '@/components/DoctorCard.vue'

// State variables
const name = ref('');
const selectedSpecializations = ref([]);
const selectedDepartments = ref([]);

const specializations = ref([]);
const departments = ref([]);
const doctors = ref([]);

// API çağırışı ilə həkim məlumatlarını yükləmək
const fetchDoctors = async () => {
  try {
    // startLoading();
    isLoading.value = true;
    error.value = null;
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/doctor-list/');
    doctors.value = response.data.results;
    // Şöbələri yükləmək
    const uniqueDepartments = [...new Set(doctors.value.map(doctor => doctor.category))];
    departments.value = uniqueDepartments.filter(name => name).map(name => ({ name }));

     // Yüklənmə bitdikdən sonra qısa gecikmə əlavə et ki, 
    // UI görünən skeleton-lar üçün daha təbii olsun
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    return response.data;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    error.value = 'Həkimlərin siyahısını yükləmək mümkün olmadı';
    throw error;
  } finally {
    stopLoading();
    isLoading.value = false;
  }
};

// API çağırışı ilə ixtisasları yükləmək
const fetchSpecializations = async () => {
  try {
    startLoading();
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/drspecialty-list/');
    specializations.value = response.data.results.map(specialty => ({ specialty: specialty.name }));
    return response.data;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    throw error;
  } finally {
    stopLoading();
  }
};

onUnmounted(() => {
  // stopPolling();
  cleanupSkeleton(); // Skeleton təmizləməsi əlavə edildi
});

// let pollingInterval;

// const startPolling = () => {
//   pollingInterval = setInterval(fetchDoctors, 5000); // Hər 5 saniyədən bir API çağırışı
// };

// const stopPolling = () => {
//   clearInterval(pollingInterval);
// };

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesName = name.value ? `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(name.value.toLowerCase()) : true;
    const matchesSpecializations = selectedSpecializations.value.length ? selectedSpecializations.value.some(spec => doctor.specialty && doctor.specialty.name === spec.specialty) : true;
    const matchesDepartments = selectedDepartments.value.length ? selectedDepartments.value.some(dep => doctor.category && doctor.category === dep.name) : true;

    return matchesName && matchesSpecializations && matchesDepartments;
  });
});


// Dinamik olaraq ekranda göstərilən həkimlərin ixtisaslarını və şöbələrini əldə etmək
const filteredSpecializations = computed(() => {
  const uniqueSpecializations = [...new Set(filteredDoctors.value.map(doctor => doctor.specialty && doctor.specialty.name))];
  return uniqueSpecializations.filter(specialty => specialty).map(specialty => ({ specialty }));
});

const filteredDepartments = computed(() => {
  const uniqueDepartments = [...new Set(doctors.value.map(doctor => doctor.category))];
  return uniqueDepartments.filter(name => name).map(name => ({ name }));
});

// **PAGINATION 
const itemsPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(filteredDoctors.value.length / itemsPerPage));

const paginatedDoctors = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredDoctors.value.slice(start, end);
});

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

// Pagination funksiyalarını yenilə
const goToPage = (page) => {
    if (page === '...') return;
    isLoading.value = true;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Qısa gecikdirmə ilə yükləməni tamamla ki, UI daha hamar görünsün
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
};

const goToFirstPage = () => {
    if (currentPage.value === 1) return;
    isLoading.value = true;
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
};


const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToLastPage = () => {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const filterDoctors = () => {
  currentPage.value = 1; // Filtrləmə zamanı ilk səhifəyə qayıt
};

// Geri döndükdə Pagintion saxlanılması 
// currentPage dəyişdikdə, dəyəri localStorage-də saxlayaq
watch(currentPage, (newPage) => {
  localStorage.setItem('doctorsCurrentPage', newPage);
});


// Həmçinin filteredDoctors watch edək və 
// totalPages dəyişdikdə currentPage-i yenidən yoxlayaq
watch(totalPages, (newTotalPages) => {
  // Əgər cari səhifə mövcud səhifə sayından çoxdursa, düzəliş et
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages > 0 ? newTotalPages : 1;
  }
});

// Geri döndükdə Filtr dəyərlərini saxlamaq üçün funksiya
const saveFilterState = () => {
  const filterState = {
    name: name.value,
    specializations: selectedSpecializations.value,
    departments: selectedDepartments.value,
    page: currentPage.value
  };
  localStorage.setItem('doctorsFilterState', JSON.stringify(filterState));
};

// Filtr dəyərlərinin hər biri dəyişdikdə state-i saxla
watch([name, selectedSpecializations, selectedDepartments, currentPage], () => {
  saveFilterState();
}, { deep: true });

// Filtr dəyərlərini yükləmək üçün funksiya
const loadFilterState = () => {
  const savedState = localStorage.getItem('doctorsFilterState');
  if (!savedState) return false;
  
  try {
    const filterState = JSON.parse(savedState);
    
    // Filtrləri təyin et
    name.value = filterState.name || '';
    
    // specializations və departments-ı yükləyək
    if (filterState.specializations?.length) {
      // Əmin olaq ki, specializations mövcuddur və seçilənlər mövcud variantlar arasındadır
      const validSpecs = filterState.specializations.filter(spec => 
        specializations.value.some(s => s.specialty === spec.specialty)
      );
      selectedSpecializations.value = validSpecs;
    }
    
    if (filterState.departments?.length) {
      // Əmin olaq ki, departments mövcuddur və seçilənlər mövcud variantlar arasındadır
      const validDepts = filterState.departments.filter(dept => 
        departments.value.some(d => d.name === dept.name)
      );
      selectedDepartments.value = validDepts;
    }
    
    // Səhifəni sonra yükləyirik (çünki totalPages-in hesablanması filteredDoctors-dan asılıdır)
    if (filterState.page && filterState.page <= totalPages.value) {
      currentPage.value = filterState.page;
    }
    
    return true;
  } catch (e) {
    console.error('Filter state parsing error:', e);
    return false;
  }
};



// Səhifə yükləndikdə saxlanılmış vəziyyətləri yükləyək (pagination və filtrlər)
onMounted(async () => {
  try {
    isLoading.value = true;
    // API çağırışlarını Promise.all ilə gözləyək
    await Promise.all([
      fetchDoctors(),
      fetchSpecializations()
    ]);

    // API çağırışları bitdikdən və data yüklədikdən sonra
    // məlumat alınıb və totalPages hesablanıb
    loadFilterState();

    // Əgər filterState-də pagination vəziyyəti olmadısa 
    // və ya filterState yüklənmədisə
    if (currentPage.value === 1) {
      const savedPage = parseInt(localStorage.getItem('doctorsCurrentPage'));
      if (!isNaN(savedPage) && savedPage > 0 && savedPage <= totalPages.value) {
        currentPage.value = savedPage;
      }
    }
  } catch (error) {
    console.error('Səhifə yükləmə xətası:', error);
  } finally {
    cleanupSkeleton();
  }
});

// SEO meta məlumatları
const pageTitle = computed(() => {
  if (selectedSpecializations.value.length > 0) {
    return `${selectedSpecializations.value[0].specialty} Həkimləri | Leyla Medical Center`;
  } else if (selectedDepartments.value.length > 0) {
    return `${selectedDepartments.value[0].name} Şöbəsi Həkimləri | Leyla Medical Center`;
  } else {
    return 'Leyla Medical Center | Həkimlərimiz';
  }
});

const pageDescription = computed(() => {
  if (selectedSpecializations.value.length > 0) {
    return `Leyla Medical Center-in ${selectedSpecializations.value[0].specialty} mütəxəssisləri. Təcrübəli həkimlərimiz haqqında məlumat əldə edin və onlayn qəbula yazılın.`;
  } else if (selectedDepartments.value.length > 0) {
    return `Leyla Medical Center-in ${selectedDepartments.value[0].name} şöbəsinin peşəkar həkim heyəti. Mütəxəssislərimiz haqqında məlumat əldə edin.`;
  } else {
    return 'Leyla Medical Center-in peşəkar həkim heyəti. Təcrübəli mütəxəssislərimiz haqqında məlumat əldə edin və onlayn qəbula yazılın.';
  }
});

const pageKeywords = computed(() => {
  let baseKeywords = 'həkimlər, mütəxəssislər, tibb işçiləri, qəbul, həkim məsləhəti';
  
  if (selectedSpecializations.value.length > 0) {
    return `${baseKeywords}, ${selectedSpecializations.value.map(s => s.specialty).join(', ')}`;
  } else if (selectedDepartments.value.length > 0) {
    return `${baseKeywords}, ${selectedDepartments.value.map(d => d.name).join(', ')}`;
  }
  
  return baseKeywords;
});

// Multiselect tərcümə funksiyaları
const customLabel = (option) => {
  return option.name;
};

const specialtyCustomLabel = (option) => {
  return option.specialty;
};

// SEO və meta tagların təkmilləşdirilmiş versiyası
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'keywords', content: pageKeywords },
    
    // Open Graph meta tagları - düzəltilmiş URL yolu
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://leylamc.com/az/həkimlər/' },
    { property: 'og:image', content: 'https://leylamc.com/images/leyla-doctors.jpg' },
    { property: 'og:site_name', content: 'Leyla Medical Center' },
    { property: 'og:locale', content: 'az_AZ' },
    
    // Twitter meta tagları
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: 'https://leylamc.com/images/leyla-doctors.jpg' },
    
    // Strukturlu məlumatları əlavə etmək (Schema.org)
    {
      name: 'script',
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle.value || "Həkimlərimiz",
        "description": pageDescription.value,
        "url": "https://leylamc.com/az/həkimlər/",
        "publisher": {
          "@type": "MedicalOrganization",
          "name": "Leyla Medical Center",
          "logo": {
            "@type": "ImageObject",
            "url": "https://leylamc.com/images/logo.png"
          }
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": paginatedDoctors.value.map((doctor, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Person",
              "name": `${doctor.degree} ${doctor.first_name} ${doctor.last_name}`,
              "image": doctor.photo || "https://leylamc.com/images/doctor-placeholder.jpg",
              "jobTitle": doctor.position,
              "url": `https://leylamc.com/az/həkimlər/${doctor.slug}`
            }
          }))
        }
      })
    }
  ],
  // Canonical link əlavə edirik
  link: [
    { rel: 'canonical', href: 'https://leylamc.com/az/həkimlər/' }
  ]
});
</script>

<style scoped>
/* Multiselect hover stilləri */
::v-deep .multiselect__option--highlight {
  background: #6bb52b !important;
  color: white;
}

::v-deep .multiselect__option--selected.multiselect__option--highlight {
  background: #6bb52b !important;
  color: white;
}

/* Hover etdikdə tooltip/action bölməsinin arxa planı */
::v-deep .multiselect__option--highlight:after {
  background: #6bb52b !important;
  color: white;
}

/* Seçilmiş elementin hover vəziyyətində tooltip/action bölməsinin arxa planı */
::v-deep .multiselect__option--selected.multiselect__option--highlight:after {
  background: #6bb52b !important;
  color: white;
}

/* Multiselect fokus vəziyyəti üçün stilləri */
::v-deep .multiselect:focus-within,
::v-deep .multiselect--active {
  border-color: #6bb52b !important;
  box-shadow: 0 0 0 1px #6bb52b !important;
  outline: none !important;
}

/* Multiselect açıq olduğu zaman border stilləri */
::v-deep .multiselect--active {
  border-color: #6bb52b !important;
}

/* Multiselect hover vəziyyəti üçün */
::v-deep .multiselect:hover {
  border-color: #6bb52b !important;
}


/* Pagination CSS */
.pagination {
    margin-top: 2rem;
    user-select: none;
    position: sticky !important; /* !important əlavə edərək digər CSS qaydalarını override edir */
  bottom: 0 !important;
  z-index: 10;
  width: 100%;
  padding: 0.5rem 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
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
.doctors-content-container {
  position: relative;
  z-index: 1;
  min-height: 600px; /* Kartların ölçüsünə görə uyğunlaşdırın */
}

</style>