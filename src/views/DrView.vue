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
          <div class="flex flex-col px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 items-center tracking-wider">
            <div class="flex">
              <img :src="expIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-main-text ml-2">{{doctor.experience_year}} il</span>
            </div>
            <span class="mt-1">Təcrübə</span>
          </div>
          
          <!-- Doctor Number of patients -->
          <div class="flex flex-col px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 items-center tracking-wider border-0 md:border md:border-l-[#c7c7c7] md:border-r-[#c7c7c7] md:border-t-0 md:border-b-0 border-t border-b border-[#c7c7c7] my-3 md:my-0">
            <div class="flex">
              <img :src="locaIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-xl sm:text-2xl md:text-3xl font-bold text-main-text ml-2">
                {{ doctor.institution || 'Filial qeyd olunmayıb' }}
              </span>
            </div>
            <span class="mt-1">Filial</span>
          </div>
          
          <!-- Doctor comments -->
          <div class="flex flex-col px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 items-center tracking-wider">
            <div class="flex">
              <img :src="opiIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-main-text ml-2">{{ comments.length }}</span>
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
        <div v-if="selectedTab === 'articles'">
          <!-- Həkimin məqalələri kontenti -->
          <div v-if="doctor.value?.articles && doctor.value.articles.trim()">
            <p class="text-sm md:text-lg" v-html="formattedArticles"></p>
          </div>
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
                v-for="comment in comments"
                :key="comment.id"
                :image="UserPhoto || 'https://via.placeholder.com/100'"
                :name="comment.user_full_name"
                :review="comment.comment"
                :date="formatDate(comment.created_at)"
                :star="comment.star || comment.rating || 0"
              />
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


const route = useRoute();   

// Route parametrlərindəki dəyişiklikləri izləyin
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      console.log(`Həkim ID/slug dəyişdi: ${oldId} -> ${newId}`);
      // Yeni həkimin məlumatlarını yüklə
      await fetchDoctor();
    }
  }
);

// Alternativ: onBeforeRouteUpdate istifadə edə bilərsiniz
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    console.log(`Marşrut yenilənir: ${from.params.id} -> ${to.params.id}`);
    // Həkim məlumatlarını yenilə
    await fetchDoctor(to.params.id);
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
  return `${doctor.value.degree} ${doctor.value.first_name} ${doctor.value.last_name} - ${doctor.value.position} at Leyla Medical Center. ${doctor.value.experience_year} years of experience.`;
});

// -------- Komment üçün APİ lər ---------

// İstifadəçi məlumatlarını əldə edən funksiya
const fetchCurrentUser = async () => {
  try {
    // Yalnız istifadəçi giriş etdiyi halda
    if (auth.isLoggedIn()) {
      const response = await api.get('http://bytexerp.online/api/leyla/v1/user-me/');
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
    const response = await api.get(`http://bytexerp.online/api/leyla/v1/comment-list/${doctorId}/`);
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

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => `https://yourwebsite.com/doctor/${route.params.id}`) },
    { property: 'og:image', content: computed(() => doctor.value?.photo || 'https://yourwebsite.com/default-doctor-image.jpg') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: computed(() => doctor.value?.photo || 'https://yourwebsite.com/default-doctor-image.jpg') },
    { name: 'keywords', content: computed(() => `doctor, healthcare, ${doctor.value?.category || ''}, ${doctor.value?.position || ''}, medical center`) },
  ],
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
    const response = await api.post('http://bytexerp.online/api/leyla/v1/comment-create/', payload);
    
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
    
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/doctor-list/${encodedSlug}/`);
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
      const allResponse = await axios.get('http://bytexerp.online/api/leyla/v1/doctor-list/');
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


// Həkimin təcrübə ilinə və ID-sinə görə sabit pasiyent sayını hesablayan funksiya
const calculatePatients = (experienceYear, doctorSlug) => {
  // Slug əsasında sabit seed yaratmaq
  let seed = 0;
  for (let i = 0; i < doctorSlug.length; i++) {
    seed += doctorSlug.charCodeAt(i);
  }
  
  // İlkin aralıqları təyin etmək
  let min, max;
  let dailyIncrease; // Gündəlik artım
  
  // Təcrübə ilinə əsasən aralığı və gündəlik artımı müəyyən et
  if (!experienceYear || experienceYear <= 1) {
    min = 1800;
    max = 2000;
    dailyIncrease = 5;
  } else if (experienceYear <= 3) {
    min = 3600;
    max = 4000;
    dailyIncrease = 5;
  } else if (experienceYear <= 5) {
    min = 5400;
    max = 6000;
    dailyIncrease = 7;
  } else if (experienceYear <= 10) {
    min = 9000;
    max = 10000; // Buradakı dəyər düzəldildi (1000 deyil, 10000)
    dailyIncrease = 12;
  } else {
    min = 15000;
    max = 20000;
    dailyIncrease = 17;
  }
  
  // Seed əsasında başlanğıc dəyərini hesablamaq
  const range = max - min;
  const randomOffset = seed % range;
  let baseNumber = min + randomOffset;
  
  // İndiki tarixdən asılı olaraq gündəlik artımı hesablamaq
  const startDate = new Date('2023-01-01'); // Başlanğıc tarixi (sabit)
  const today = new Date();
  const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  
  // Ümumi pasiyent sayını hesabla
  const totalPatients = baseNumber + (daysDiff * dailyIncrease);
  
  return totalPatients;
};

// Hesablanmış pasiyent sayı üçün computed xüsusiyyəti
const patientCount = computed(() => {
  if (!doctor.value || !doctor.value.slug) return 0;
  return calculatePatients(doctor.value.experience_year, doctor.value.slug);
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

</style>