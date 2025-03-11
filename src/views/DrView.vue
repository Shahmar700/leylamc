<template>
    <div class="container mt-16" >
      <SkeletonLoader v-if="showSkeleton" :contentLines="12" :showLink="true" />
    
      <div v-else-if="!doctor" class="text-center py-10">
        <p class="text-red-500">Həkim məlumatları tapılmadı.</p>
      </div>
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
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-main-text ml-2">{{doctor.experience_year}}il</span>
            </div>
            <span class="mt-1">Təcrübə</span>
          </div>
          
          <!-- Doctor Number of patients -->
          <div class="flex flex-col px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 items-center tracking-wider border-0 md:border md:border-l-[#c7c7c7] md:border-r-[#c7c7c7] md:border-t-0 md:border-b-0 border-t border-b border-[#c7c7c7] my-3 md:my-0">
            <div class="flex">
              <img :src="patientIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-main-text ml-2">{{ patientCount }}</span>
            </div>
            <span class="mt-1">Pasiyent sayı</span>
          </div>
          
          <!-- Doctor comments -->
          <div class="flex flex-col px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 items-center tracking-wider">
            <div class="flex">
              <img :src="opiIcon" alt="" class="w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] md:w-[45px] md:h-[45px] object-cover">
              <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-main-text ml-2">687</span>
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
         <p class="text-sm md:text-lg" v-html="formattedArticles"></p>
        </div>
        <div v-if="selectedTab === 'reviews'" class="pt-2">
          <!-- Rəylər kontenti -->
          <div class="grid gap-8">
            <button v-if="!showCommentSection" @click="openCommentModal" class="greenBtn !w-[150px] text-center">
          <i class="fa-regular fa-comments mr-1"></i>
          <span>Rəy yazın</span>
        </button>

        <!-- commentmodal -->
        <div v-if="showCommentSection" class="comment-section border rounded-xl p-4">
          <textarea v-model="commentText" class="outline-none" placeholder="Şərhinizi buraya yazın..."></textarea>
          <button class="rounded-xl" @click="submitComment">Göndər</button>
        </div>
      <!-- commentmodal -->
            <DoctorRating 
              :image="UserPhoto"
              name='İsmayıl Bayramlı'
              review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
              date="24.06.2023"
              star="5"
            />
            <DoctorRating 
              :image="UserPhoto"
              name='İsmayıl Bayramlı'
              review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
              date="24.06.2023"
              star="2"
            />
            <DoctorRating 
              :image="UserPhoto"
              name='İsmayıl Bayramlı'
              review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
              date="24.06.2023"
              star="4"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import axios from 'axios';
import auth from '@/services/auth'; 
import DoctorRating from '@/components/DoctorRating.vue';
import Modal from '@/components/Modal.vue';
import LoginModal from '@/components/LoginModal.vue';
import Swal from 'sweetalert2';
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { useSkeleton } from "@/composables/useSkeleton";

const route = useRoute();   

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

const doctor = ref({});
const showCommentSection = ref(false);
const commentText = ref('');

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


const openCommentModal = () => {
    if (auth.isLoggedIn()){
        showCommentSection.value = true;
    }
    else {
      toggleModal();
    }
}
const submitComment = async () => {
  try {
    // Submit the comment to the server
    await axios.post('http://bytexerp.online/api/leyla/v1/comment-api', { comment: commentText.value });
    // Clear the comment text and hide the comment section
    commentText.value = '';
    showCommentSection.value = false;
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Comment submitted',
      text: 'Your comment has been submitted successfully!',
    });
  } catch (error) {
    // Show error message
    Swal.fire({
      icon: 'error',
      title: 'Error submitting comment',
      text: error.message,
    });
  }
}

const fetchDoctor = async () => {
  try {
    startLoading();
    console.log(`Həkim məlumatı çağırılır: ${route.params.id}`);
    // Burada artıq slug parametri ilə çağırış edirik
    const response = await axios.get(`http://bytexerp.online/api/leyla/v1/doctor-list/${route.params.id}/`);
    doctor.value = response.data;

     // Şəkli öncədən yükləyək
     if (doctor.value.photo) {
      preloadImage(doctor.value.photo);
    }
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    
    // Alternativ olaraq bütün həkimləri yükləyib, slug-a görə filtrlə
    try {
      console.log('Bütün həkimlər çağırılır və filtrlənir');
      const allResponse = await axios.get('http://bytexerp.online/api/leyla/v1/doctor-list/');
      const doctorFound = allResponse.data.results.find(d => d.slug === route.params.id);
      
      if (doctorFound) {
        doctor.value = doctorFound;
      } else {
        console.error('Həkim tapılmadı');
      }
    } catch (fallbackError) {
      console.error('Alternativ API çağırışında xəta:', fallbackError);
    }
  } finally {
    stopLoading(); 
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

onMounted(() => {
  fetchDoctor();
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
import patientIcon from '@/assets/icons/dr-patient.svg'
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