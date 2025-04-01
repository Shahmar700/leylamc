<template>
    <div class="container mt-16" >
      <!-- <SkeletonLoader v-if="showSkeleton" :contentLines="12" :showLink="true" /> -->
      <!-- Yüklənmə göstəricisi -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

      <!-- Xəta göstəricisi (əgər varsa) -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6">
        <div class="flex items-center">
          <svg class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <p>{{ error }}</p>
        </div>
      </div>
      
      <div v-else>
      <button @click="goBack" class="flex items-center text-gray-600 mb-6 hover:text-green-600   transition-colors">
        <i class="fa-solid fa-arrow-left mr-2"></i> Geriyə
      </button>
      <div class="flex flex-col lg:flex-row">
         <!-- Geri butonu -->
        <LoginModal v-if="showModal" @close="toggleModal" @login-success="checkAuthStatus" />
        <div class="p-1 rounded-3xl border border-[#c7c7c7] w-full lg:w-[30%] h-[340px] lg:h-[420px] overflow-hidden" style="aspect-ratio: 3/4;">
          <!-- Skeleton loader -->
          <div v-if="!imageLoaded || showSkeleton" class="absolute inset-0 bg-gray-200 rounded-3xl animate-pulse"></div>
          <img 
            v-lazy="doctor.photo" 
            alt="Doktor şəkli" 
            class="rounded-3xl w-full h-full object-cover transition-opacity duration-300"
            :class="{'opacity-0': !imageLoaded, 'opacity-100': imageLoaded}" 
            @load="onImageLoad"
          />
        </div>
        <div class="w-full lg:w-[59%] mt-3 lg:mt-0 lg:ml-14 flex flex-col lg:justify-between">
          <div class="w-full mt-4">
            <h1 class="text-xl md:text-2xl lg:text-3xl text-primary tracking-wider mb-1 font-bold">{{ doctor.degree }} {{ doctor.first_name }} {{ doctor.last_name }}</h1>
            <p class="text-base screen-400:text-lg md:text-xl lg:text-2xl text-main-text tracking-wider">{{ doctor.position }}</p>
          </div>
          <div class="w-full flex flex-col md:flex-row border mt-5 lg:mt-0 py-3 md:py-5 justify-evenly border-[#c7c7c7] rounded-3xl">
          <!-- Doctor experience -->
          <div class="flex flex-col px-4 sm:px-8 xl:px-10 py-3 xl:py-6 items-center tracking-wider">
            <div class="flex md:flex-col md:items-center xl:flex-row">
              <img :src="expIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <div class="flex items-center">
                <span class="text-base sm:text-xl xl:text-2xl font-bold text-main-text ml-2 md:ml-0 xl:ml-2">{{doctor.experience_year}}</span>
                <span class="text-base sm:text-xl xl:text-2xl font-bold text-main-text ml-1 xl:ml-1">il</span>
              </div>
            </div>
            <span class="mt-1">Təcrübə</span>
          </div>
          
          <!-- Doctor institution -->
          <div class="flex flex-col px-4 sm:px-8 xl:px-10 py-3 xl:py-6 items-center tracking-wider border-0 md:border md:border-l-[#c7c7c7] md:border-r-[#c7c7c7] md:border-t-0 md:border-b-0 border-t border-b border-[#c7c7c7] my-3 md:my-0">
            <div class="flex md:flex-col md:items-center xl:flex-row">
              <img :src="locaIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-base sm:text-xl xl:text-2xl font-bold text-main-text ml-2 md:ml-0 xl:ml-2">
                {{ doctor.institution || 'Filial qeyd olunmayıb' }}
              </span>
            </div>
            <span class="mt-1">Filial</span>
          </div>
          
          <!-- Doctor comments -->
          <div class="flex flex-col px-4 sm:px-8 xl:px-10 py-3 xl:py-6 items-center tracking-wider">
            <div class="flex md:flex-col md:items-center xl:flex-row">
              <img :src="opiIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-base sm:text-xl xl:text-2xl font-bold text-main-text ml-2 md:ml-0 xl:ml-2">{{ comments.length }}</span>
            </div>
            <span class="mt-1">Rəylər</span>
          </div>
        </div>
        </div>
      </div>



      <!-- Doctor İnformations -->
      <div class="w-full mt-20">
      <div class="flex justify-around relative">
        <h1 class="pb-4 cursor-pointer text-sm screen-400:text-base lg:text-xl xl:text-2xl text-main-text font-bold" @click="selectTab('info')">Məlumat</h1>
        <h1 class="pb-4 cursor-pointer text-sm screen-400:text-base lg:text-xl xl:text-2xl text-main-text font-bold" @click="selectTab('articles')">Həkimin məqalələri</h1>
        <h1 class="pb-4 cursor-pointer text-sm screen-400:text-base lg:text-xl xl:text-2xl text-main-text font-bold" @click="selectTab('reviews')">Rəylər</h1>
        <div class="absolute w-full h-[4px] left-0 bottom-[-5px] bg-[#c7c7c7]" :style="tabStyle"></div>
      </div>

      <div class="infoContent w-full mt-14">
        <div v-if="selectedTab === 'info'">
          <!-- Məlumat kontenti -->
          <table class="w-full tracking-wider text-main-text">
            <tbody>
              <tr class="bg-[#f6fbf2]">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">Vəzifə</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">{{ doctor.position }}</td>
              </tr>
              <tr class="bg-white">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">Şöbə</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">{{ doctor.category }}</td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">Təhsil</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">
                  <div class="flex items-start">
                    <p v-html="formattedEducation"></p>
                  </div>
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">Kurslar, Konfranslar</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">
                  <div class="flex items-start">
                    <p v-html="formattedCourses"></p>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">Müayinə və müalicə istiqamətləri</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">
                  <p v-html="formattedTreatment"></p>
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg lg:text-xl font-semibold">İş təcrübəsi</td>
                <td class="p-1 md:p-3 lg:p-4 text-sm md:text-lg">
                  <p v-html="formattedExperience"></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Həkimin məqalələri kontenti -->
        <div v-if="selectedTab === 'articles'" class="pt-2">
          <!-- Yüklənmə vəziyyəti -->
          <div v-if="isLoadingArticles" class="text-center py-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p class="mt-2 text-gray-600">Məqalələr yüklənir...</p>
          </div>
          
          <!-- Məqalələr siyahısı -->
          <div v-else-if="doctorArticles.length > 0" class="space-y-6">
            <div v-for="article in doctorArticles" :key="article.id" class="article-item border-b pb-6 mb-6">
              <h3 class="text-xl font-semibold mb-4">{{ article.title }}</h3>
              <div v-if="article.text && article.text.trim()" class="mt-2 text-sm md:text-lg">
                <p class="text-justify" v-html="formatText(article.text)"></p>
              </div>
              <div v-else-if="article.text_az && article.text_az.trim()" class="mt-2 text-sm md:text-lg">
                <p class="text-justify" v-html="formatText(article.text_az)"></p>
              </div>
              <div v-else class="mt-2 text-sm md:text-lg text-gray-600">
                <p>Məqalə mətni tezliklə əlavə olunacaq.</p>
              </div>
              <p class="text-sm text-gray-500 mt-4">{{ formatDate(article.created_at) }}</p>
            </div>
          </div>
          
          <!-- Əvvəlki məqalə məzmunu (əgər API məqalələri tapılmazsa) -->
          <div v-else-if="doctor.value?.articles && doctor.value.articles.trim()">
            <p class="text-sm md:text-lg" v-html="formattedArticles"></p>
          </div>
          
          <!-- Məqalə yoxdur mesajı -->
          <div v-else class="text-center py-6">
            <p class="text-gray-600">Bu həkimin hələ heç bir məqaləsi yoxdur.</p>
          </div>
        </div>

        <!-- Rəylər kontenti -->
          <div v-if="selectedTab === 'reviews'" class="pt-2">
            <div class="grid gap-8">
              <button v-if="!showCommentSection" @click="openCommentModal" class="greenBtn !w-[150px] text-center">
                <i class="fa-regular fa-comments mr-1"></i>
                <span>Rəy yazın</span>
              </button>

              <!-- Comment yazma bölümü -->
              <div v-if="showCommentSection" class="comment-section border rounded-xl p-4">
              <!-- Reytinq ulduzları -->
              <div class="mb-4">
                <p class="text-gray-700 mb-2">Reytinq:</p>
                <div class="flex">
                  <i v-for="star in 5" 
                    :key="star" 
                    :class="[
                      hoverRating >= star || (hoverRating === 0 && selectedRating >= star) 
                        ? 'fa-solid fa-star text-primary' 
                        : 'fa-regular fa-star text-gray-400',
                      'text-xl cursor-pointer mr-1'
                    ]"
                    @click="selectedRating = star"
                    @mouseenter="hoverRating = star"
                    @mouseleave="hoverRating = 0"
                  ></i>
                  <span class="ml-2 text-sm text-gray-600">{{ selectedRating }} / 5</span>
                </div>
              </div>
              
              <textarea 
                v-model="commentText" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Rəyinizi buraya yazın..."
              ></textarea>
              
              <div class="flex justify-end mt-2 space-x-2">
                <button @click="showCommentSection = false" class="px-4 py-2 rounded-xl transition-all duration-200 border !bg-[#ef7c00] hover:shadow-lg">
                  İmtina
                </button>
                <button 
                  @click="submitComment" 
                  class="px-4 py-2 rounded-xl bg-primary text-white transition-all duration-200 hover:shadow-lg"
                  :disabled="isSubmitting"
                >
                  <!-- Düymə mətnini dinamik olaraq dəyiş -->
                  <span v-if="isSubmitting">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Göndərilir...
                  </span>
                  <span v-else>Göndər</span>
                </button>
              </div>
            </div>

              <!-- Rəyləri yükləmə və boş vəziyyəti -->
              <div v-if="isLoadingComments" class="text-center py-6">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p class="mt-2 text-gray-600">Rəylər yüklənir...</p>
              </div>
              
              <div v-else-if="comments.length === 0" class="text-center py-6">
                <p class="text-gray-600">Bu həkimə hələ heç bir rəy yazılmayıb.</p>
              </div>

              <!-- Rəylərin siyahısı -->
              <DoctorRating 
                v-for="comment in displayedComments"
                :key="comment.id"
                :image="UserPhoto || 'https://via.placeholder.com/100'"
                :name="comment.user_full_name"
                :review="comment.comment"
                :date="formatDate(comment.created_at)"
                :star="comment.star || comment.rating || 0"
              />
            </div>
            <!-- Pagination -->
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
    </div>
  </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, onUnmounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useHead } from '@vueuse/head';
import axios from 'axios';
import auth from '@/services/auth'; 
import DoctorRating from '@/components/DoctorRating.vue';
import Modal from '@/components/Modal.vue';
import LoginModal from '@/components/LoginModal.vue';
import Swal from 'sweetalert2';
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";
import api from '@/services/api';
const isSubmitting = ref(false);
import { watch } from 'vue';
import { watchEffect } from 'vue';

// Schema.org üçün JSON məlumatlarını saxlamaq üçün ref dəyişəni
const schemaOrgData = ref('');

const route = useRoute();   


// Məqalələr üçün əlavə dəyişənlər
const doctorArticles = ref([]);
const isLoadingArticles = ref(false);

// Həkimin məqalələrini APİ-dən çəkmək funksiyası
const fetchDoctorArticles = async () => {
  try {
    isLoadingArticles.value = true;
    const doctorId = doctor.value?.id;
    
    if (!doctorId) {
      console.warn('Həkim ID-si əlçatan deyil');
      return;
    }
    
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/article-list/');
    
    // Cari həkimin ID-sinə uyğun məqalələri filterlə
    const filteredArticles = response.data.results.filter(article => 
      article.doctor === doctorId
    );
    
    doctorArticles.value = filteredArticles;
    console.log(`Həkim ID=${doctorId} üçün ${doctorArticles.value.length} məqalə tapıldı`);
  } catch (error) {
    console.error('Həkim məqalələrini yükləmə xətası:', error);
  } finally {
    isLoadingArticles.value = false;
  }
};

// Route parametrlərindəki dəyişiklikləri izləyin
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      console.log(`Həkim ID/slug dəyişdi: ${oldId} -> ${newId}`);
      await fetchDoctor();
      await fetchDoctorArticles(); // Məqalələri yenilə
    }
  }
);

// Alternativ: onBeforeRouteUpdate istifadə edə bilərsiniz
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    console.log(`Marşrut yenilənir: ${from.params.id} -> ${to.params.id}`);
    await fetchDoctor(to.params.id);
    await fetchDoctorArticles(); // Məqalələri yenilə
  }
});

import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => {
  // Əvvəlcə saxlanan pagination səhifəsini yoxlayaq
  let savedState = null;
  try {
    const stateJson = localStorage.getItem('doctorsFilterState');
    if (stateJson) {
      savedState = JSON.parse(stateJson);
    }
  } catch (e) {
    console.error('Error parsing saved state', e);
  }
  
  // Geri qayıdaraq və əmin olaq ki, vəziyyət qorunur
  router.push({ 
    name: 'doctors',
    // Əgər sorğu parametrləri istifadə edirsinizsə
    // query: { page: savedState?.page || 1 } 
  });
};

// LoginModal komponenti ilə əlaqə qurmaq üçün:
// login-success hadisəsini dinləyək və istifadəçi məlumatlarını yeniləyək
const checkAuthStatus = async () => {
  if (auth.isLoggedIn()) {
    await fetchCurrentUser();  // İstifadəçi məlumatlarını təzələ
    showCommentSection.value = true;  // Rəy yazma bölməsini göstər
  }
};


const doctor = ref({});
// Rəylər üçün state
const comments = ref([]);
const isLoadingComments = ref(false);
const currentUser = ref(null);
const showCommentSection = ref(false);
const commentText = ref('');
const selectedRating = ref(5); // Defolt olaraq 5 ulduz
const hoverRating = ref(0); // Hover edilən ulduz
const isLoading = ref(true);
const error = ref(null);

const { loading, showSkeleton, startLoading, stopLoading, cleanupSkeleton } = useSkeleton(500);

const imageLoaded = ref(false);

const onImageLoad = () => {
  // Şəkil tam yükləndikdə
  setTimeout(() => {
    imageLoaded.value = true;
  }, 100); // Kiçik bir gecikmə ilə animasiyanı daha yumşaq edə bilərsiniz
};

// SEO metadata computed properties
const pageTitle = computed(() => {
  if (!doctor.value) return 'Doctor Profile | Leyla Medical Center';
  return `${doctor.value.degree} ${doctor.value.first_name} ${doctor.value.last_name} | ${doctor.value.position} | Leyla Medical Center`;
});

const pageDescription = computed(() => {
  if (!doctor.value) return 'View doctor profiles and information at Leyla Medical Center.';
  return `${doctor.value.degree} ${doctor.value.first_name} ${doctor.value.last_name} - ${doctor.value.position} Leyla Medical Center-də. ${doctor.value.experience_year} il təcrübə.`;
});

// -------- Komment üçün APİ lər ---------

// İstifadəçi məlumatlarını əldə edən funksiya
const fetchCurrentUser = async () => {
  try {
    // Yalnız istifadəçi giriş etdiyi halda
    if (auth.isLoggedIn()) {
      const response = await api.get('https://bytexerp.online/api/leyla/v1/user-me/');
      currentUser.value = response.data;
      console.log('İstifadəçi məlumatları:', currentUser.value);
    }
  } catch (error) {
    console.error('İstifadəçi məlumatlarını əldə etmə xətası:', error);
  }
};

// Doktorun rəylərini əldə edən funksiya - düzəldilmiş
const fetchDoctorComments = async () => {
  try {
    isLoadingComments.value = true;
    
    const doctorId = route.query.doctorId || doctor.value?.id;
    
    if (!doctorId) {
      console.error('Doktor ID məlumatı mövcud deyil');
      return;
    }
    
    // Rəyləri əldə et
    const response = await api.get(`https://bytexerp.online/api/leyla/v1/comment-list/${doctorId}/`);
    const fetchedComments = response.data.results || response.data;
    
    console.log('API-dan gələn rəylər:', fetchedComments[0]); // Debug üçün
    
    // Rəyləri işləyək və ad soyadları əlavə edək
    const processedComments = fetchedComments.map(comment => {
      // Əgər author bir obyektdirsə və first_name və last_name varsa
      if (comment.author && typeof comment.author === 'object') {
        // API-dan gələn istifadəçi adını və soyadını əlavə et
        if (comment.author.first_name && comment.author.last_name) {
          comment.user_full_name = `${comment.author.first_name} ${comment.author.last_name}`;
        } else if (comment.author.username) {
          comment.user_full_name = comment.author.username;
        } else {
          comment.user_full_name = 'İstifadəçi';
        }
      } 
      // Əgər author sadəcə bir ID isə və cari istifadəçiyə bərabərdirsə
      else if (comment.author === currentUser.value?.id) {
        comment.user_full_name = `${currentUser.value.first_name} ${currentUser.value.last_name}`;
      }
      // Əgər heç bir şərt ödənmirsə
      else if (!comment.user_full_name) {
        comment.user_full_name = 'İstifadəçi';
      }
      
      return comment;
    });
    
    // Rəyləri tarixə görə sırala - ən yeni rəylər əvvəldə olsun
    processedComments.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    
    comments.value = processedComments;
    
  } catch (error) {
    console.error('Rəyləri əldə etmə xətası:', error);
    comments.value = [];
  } finally {
    isLoadingComments.value = false;
  }
};

// Tarix formatlaşdırmaq üçün funksiya - saat və dəqiqə əlavə edildi
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Tarix formatlaşdırmaq üçün funksiya - saat və dəqiqə əlavə edildi
// const formatDate = (dateString) => {
//   if (!dateString) return '';
  
//   const date = new Date(dateString);
//   return date.toLocaleDateString('az-AZ', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// watchEffect ilə sxema məlumatlarını dinamik şəkildə yeniləmək
watchEffect(() => {
  if (doctor.value) {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": `${doctor.value?.degree || ''} ${doctor.value?.first_name || ''} ${doctor.value?.last_name || ''}`,
      "description": pageDescription.value,
      "image": doctor.value?.photo || 'https://leylamc.com/images/doctor-placeholder.jpg',
      "url": `https://leylamc.com/az/profil/${route.params.id}`,
      "jobTitle": doctor.value?.position || '',
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Leyla Medical Center",
        "url": "https://leylamc.com"
      },
      "medicalSpecialty": doctor.value?.category || '',
      "workLocation": {
        "@type": "Hospital",
        "name": `Leyla Medical Center - ${doctor.value?.institution || 'Bakı'}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bakı",
          "addressCountry": "Azərbaycan"
        }
      }
    };
    
    // JSON-a çeviririk
    schemaOrgData.value = JSON.stringify(schemaData);
  }
});

// useHead funksiyasını yeniləyirik
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    // URL strukturu yeniləndi
    { property: 'og:url', content: computed(() => `https://leylamc.com/az/profil/${route.params.id}`) },
    { property: 'og:image', content: computed(() => doctor.value?.photo || 'https://leylamc.com/images/doctor-placeholder.jpg') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: computed(() => doctor.value?.photo || 'https://leylamc.com/images/doctor-placeholder.jpg') },
    { name: 'keywords', content: computed(() => `həkim, tibbi xidmət, ${doctor.value?.category || ''}, ${doctor.value?.position || ''}, Leyla Medical Center`) },
    // Schema.org məlumatlarını dinamik ref-dən istifadə edərək əlavə edirik
    {
      name: 'script',
      type: 'application/ld+json',
      children: schemaOrgData
    }
  ],
  // Canonical link əlavə edirik
  link: [
    { rel: 'canonical', href: computed(() => `https://leylamc.com/az/profil/${route.params.id}`) }
  ]
});

const toggleModal = inject('toggleModal'); 


// Rəy bölməsini açan funksiya düzəldin
const openCommentModal = async () => {
  // İstifadəçi giriş etmişsə rəy yazma bölməsini aç
  if (auth.isLoggedIn()) {
    // Əgər currentUser yoxdursa, əvvəlcə onu əldə edək
    if (!currentUser.value || !currentUser.value.id) {
      await fetchCurrentUser();
    }
    showCommentSection.value = true;
  } else {
    // Əks halda login modalu göstər
    toggleModal();
  }
};
// Rəy göndərmə funksiyasını düzəldək
const submitComment = async () => {
   // Əvvəlcə istifadəçinin varlığını yoxlayaq
   if (!currentUser.value || !currentUser.value.id) {
    console.error('İstifadəçi məlumatları yoxdur veya natamamdır');
    await fetchCurrentUser(); // Yenidən məlumatları əldə etməyi sınayaq
    
    // Hələ də istifadəçi məlumatları yoxdursa
    if (!currentUser.value || !currentUser.value.id) {
      Swal.fire({
        icon: 'error',
        title: 'Xəta',
        text: 'İstifadəçi məlumatları əldə edilə bilmədi. Zəhmət olmasa səhifəni yeniləyib yenidən cəhd edin.',
      });
      return;
    }
  }
   // Rəyin boş olub-olmadığını yoxla
   if (!commentText.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Diqqət',
      text: 'Zəhmət olmasa rəyinizi daxil edin.',
    });
    return;
  }
  
  try {
    // Göndərilir işarəsini aktiv et
    isSubmitting.value = true;
    // Doktor ID və slug alaq
    const doctorId = route.query.doctorId || doctor.value?.id;
    let doctorSlug = doctor.value?.slug || '';
    
    if (!doctorId) {
      console.error('Doktor ID məlumatı mövcud deyil');
      return;
    }
    
    // Slug formatını düzəlt - yalnız hərf, rəqəm, alt xətt və defis saxla
    // Azərbaycan əlifbası kimi xüsusi simvollar varsa onları təmizlə
    doctorSlug = doctorSlug.replace(/[^a-zA-Z0-9_-]/g, '');
    
    console.log('Təmizlənmiş slug:', doctorSlug);
    
    // API-nin gözlədiyi formatda məlumatlar hazırlayaq
    const payload = {
      doctor: Number(doctorId),
      author: currentUser.value.id,
      comment: commentText.value,
      star: selectedRating.value,
      doctor_slug: doctorSlug || `dr-${doctorId}` // Əgər slug boşdursa, fallback olaraq dr-[ID] formatını istifadə et
    };
    
    console.log('Rəy göndərilir:', payload);
    
    // API sorğusunu göndərək
    const response = await api.post('https://bytexerp.online/api/leyla/v1/comment-create/', payload);
    
    console.log('API cavabı:', response.data);
    
    // Rəyi sıfırla və seksiyini bağla
    commentText.value = '';
    selectedRating.value = 5; 
    showCommentSection.value = false;
    
    // Uğurlu mesaj
    Swal.fire({
      icon: 'success',
      title: 'Uğurlu əməliyyat',
      text: 'Rəyiniz əlavə edildi!',
    });
    
    // Yenidən rəyləri yükləyək
    await fetchDoctorComments();
    
  } catch (error) {
    console.error('Rəy göndərmə xətası:', error);
    
    // Xəta mesajını daha dəqiq göstərək
    let errorMessage = 'Rəyinizi göndərmək mümkün olmadı.';
    
    if (error.response && error.response.data) {
      console.log('API xəta detalları:', error.response.data);
      // Backend-dən gələn xəta mesajları varsa göstərək
      if (typeof error.response.data === 'object') {
        const firstError = Object.values(error.response.data)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Xəta baş verdi',
      text: errorMessage,
    });
  }
  finally {
    // Proses bitdi - yüklənmə göstəricisini söndür
    isSubmitting.value = false;
  }
};


// Tarix formatlaşdırmaq üçün funksiya
// const formatDate = (dateString) => {
//   if (!dateString) return '';
  
//   const date = new Date(dateString);
//   return date.toLocaleDateString('az-AZ', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
//   });
// };


const fetchDoctor = async (id = null) => {
  try {
    startLoading();
    isLoading.value = true;
    error.value = null;
    
    // // İlk olaraq routerdən slug parametrini əldə et
    // const doctorSlug = route.params.id;
    // console.log(`Həkim məlumatları çağırılır: ${doctorSlug}`);

    // Slug parametrini düzgün kodlayaq
    const encodedSlug = encodeURIComponent(route.params.id);
    console.log(`Həkim məlumatı çağırılır (kodlanmış): ${encodedSlug}`);
    
    const response = await axios.get(`https://bytexerp.online/api/leyla/v1/doctor-list/${encodedSlug}/`);
    doctor.value = response.data;

    // Şəkli öncədən yükləyək
    if (doctor.value.photo) {
      preloadImage(doctor.value.photo);
    }
    
    await fetchDoctorComments();
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    console.error("Həkim məlumatlarını əldə etmək xətası:", error);
    error.value = "Həkim məlumatlarını yükləmək mümkün olmadı.";
    // Həkimi ID ilə tapmağı sınayaq
    try {
      const allResponse = await axios.get('https://bytexerp.online/api/leyla/v1/doctor-list/');
      const doctorFound = allResponse.data.results.find(d => 
        d.slug === route.params.id || 
        d.slug === decodeURIComponent(route.params.id)
      );
      
      if (doctorFound) {
        console.log('Həkim alternativ yolla tapıldı:', doctorFound.id);
        doctor.value = doctorFound;
        await fetchDoctorComments();
      } else {
        error.value = 'Həkim məlumatı tapılmadı';
        console.error('Həkim tapılmadı');
      }
    } catch (fallbackError) {
      error.value = 'Həkim məlumatlarını yükləmək mümkün olmadı';
      console.error('Alternativ API çağırışında xəta:', fallbackError);
    }
  } finally {
    stopLoading(); 
    isLoading.value = false;
  }
};

// Şəkli öncədən yükləmək üçün funksiya
const preloadImage = (src) => {
  const img = new Image();
  img.onload = () => {
    // Şəkil yükləndikdə göstərək
    setTimeout(() => {
      imageLoaded.value = true;
    }, 300);
  };
  img.src = src;
};

onMounted(async() => {
  isLoading.value = true;
  error.value = null;
  await fetchDoctor();
  await fetchDoctorArticles();
  fetchCurrentUser();
  // fetchDoctorComments();
})


onUnmounted(() => {
  cleanupSkeleton(); // Skeleton təmizləməsi 
});


const formatText = (text) => {
  if (!text) return '';
  return text.replace(/\r\n/g, '<br>');
};

const formattedEducation = computed(() => formatText(doctor.value?.education));
const formattedCourses = computed(() => formatText(doctor.value?.courses_and_conferences));
const formattedTreatment = computed(() => formatText(doctor.value?.examination_and_treatment));
const formattedExperience = computed(() => formatText(doctor.value?.experience_text));
const formattedArticles = computed(() => formatText(doctor.value?.articles));


// Doctor Experience Icons 
import expIcon from '@/assets/icons/dr-experience.svg'
// import patientIcon from '@/assets/icons/dr-patient.svg'
import locaIcon from '@/assets/icons/dr-location.png'
import opiIcon from '@/assets/icons/dr-opinion.svg'


// Tab seçimi üçün state
const selectedTab = ref('info');

const selectTab = (tab) => {
  selectedTab.value = tab;
};

// Tab stilini hesablamaq üçün computed xüsusiyyəti
const tabStyle = computed(() => {
  let background = '#c7c7c7';
  if (selectedTab.value === 'info') {
    background = 'linear-gradient(to right, #6bb52b 0%, #6bb52b 33%, #c7c7c7 33%, #c7c7c7 100%)';
  } else if (selectedTab.value === 'articles') {
    background = 'linear-gradient(to right, #c7c7c7 0%, #c7c7c7 33%, #6bb52b 33%, #6bb52b 66%, #c7c7c7 66%, #c7c7c7 100%)';
  } else if (selectedTab.value === 'reviews') {
    background = 'linear-gradient(to right, #c7c7c7 0%, #c7c7c7 66%, #6bb52b 66%, #6bb52b 100%)';
  }
  return {
    background,
  };
});

// Doctor Rating Users 

// import UserPhoto from '@/assets/images/rating-user.jpg'


// Rəylər üçün pagination dəyişənlərini script hissəsində əlavə edin
const currentPage = ref(1);
const commentsPerPage = ref(5); // Hər səhifədə 5 rəy göstəriləcək

// Cari səhifədə göstəriləcək rəylər üçün computed xüsusiyyəti
const displayedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * commentsPerPage.value;
  const endIndex = startIndex + commentsPerPage.value;
  return comments.value.slice(startIndex, endIndex);
});

// Ümumi səhifə sayını hesablamaq üçün computed xüsusiyyəti
const totalPages = computed(() => {
  return Math.ceil(comments.value.length / commentsPerPage.value);
});

// Göstəriləcək səhifə nömrələrinin siyahısı
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

// Pagination funksiyaları
const goToPage = (page) => {
  if (page === '...') return;
  currentPage.value = page;
  // Səhifə dəyişdikdə səlis scroll etmək
  scrollToReviewsArea();
};

const goToFirstPage = () => {
  currentPage.value = 1;
  scrollToReviewsArea();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToReviewsArea();
  }
};


const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToReviewsArea();
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
  scrollToReviewsArea();
};

// Rəylər bölməsinə scroll etmək üçün yardımçı funksiya
const scrollToReviewsArea = () => {
  // Rəylər bölməsinin yuxarısından təxminən 100px yuxarıya scroll et
  setTimeout(() => {
    const tabsElement = document.querySelector('.infoContent');
    if (tabsElement) {
      const yOffset = -100; // 100px yuxarıya
      const y = tabsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, 50); // Kiçik bir gecikmə ilə scroll etmək, DOM-un yenilənməsinə imkan verir
};

// Rəyləri yükləmə funksiyası tamamlandardan sonra əlavə edin:
watch(() => comments.value.length, () => {
  // Rəy sayı dəyişdikdə ilk səhifəyə qayıt
  currentPage.value = 1;
});
</script>

<style scoped>
table img{
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
/* table tr td{
  padding: 15px;
} */
table tr td:nth-child(1){
  display: flex;
}
table tr td:nth-child(1){
  /* font-size: 20px; */
  font-weight: bold;
}
table tr div{
  margin-bottom: 7px;
}
.comment-section {
  margin-top: 20px;
}
.comment-section textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
.comment-section button {
  background-color: #6bb52b;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

/* DOCTOR ARTİCLES  */
.article-item {
  transition: all 0.3s ease;
}

.article-item:hover {
  background-color: #f9fafb;
}

.article-item h3 {
  color: #6ab42b;
}

.article-item:last-child {
  border-bottom: none;
}


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

</style>