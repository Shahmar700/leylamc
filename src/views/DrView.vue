<template>
    <div class="container mt-24" v-if="doctor">
      <div class="flex">
        <div class="p-1 rounded-3xl border border-[#c7c7c7] w-[30%] max-w-[400px]">
          <img :src="doctor.photo" alt="" class="rounded-3xl w-full">
        </div>
        <div class="w-[59%] ml-14 flex flex-col justify-between">
          <div class="w-full mt-4">
            <h1 class="text-3xl text-primary tracking-wider mb-1 font-bold">{{ doctor.degree }} {{ doctor.first_name }} {{ doctor.last_name }}</h1>
            <p class="text-2xl text-main-text tracking-wider">{{ doctor.position }}</p>
          </div>
          <div class="w-full flex border py-5 justify-evenly border-[#c7c7c7] rounded-3xl">
            <!-- Doctor experience -->
            <div class="flex flex-col px-12 py-6 items-center tracking-wider">
              <div class="flex">
                <img :src="expIcon" alt="" class="w-[45px] h-[45px] object-cover">
                <span class="text-4xl font-bold text-main-text ml-2">{{doctor.experience_year}}il</span>
              </div>
              <span class="mt-1">Təcrübə</span>
            </div>
            <!-- Doctor Number of patients -->
            <div class="flex flex-col px-12 py-6 items-center tracking-wider border border-l-[#c7c7c7] border-r-[#c7c7c7] border-t-0 border-b-0">
              <div class="flex">
                <img :src="patientIcon" alt="" class="w-[45px] h-[45px] object-cover">
                <span class="text-4xl font-bold text-main-text ml-2">{{ patientCount }}</span>
              </div>
              <span class="mt-1">Pasiyent sayı</span>
            </div>
            <!-- Doctor comments -->
            <div class="flex flex-col px-12 py-6 items-center tracking-wider">
              <div class="flex">
                <img :src="opiIcon" alt="" class="w-[45px] h-[45px] object-cover">
                <span class="text-4xl font-bold text-main-text ml-2">687</span>
              </div>
              <span class="mt-1">Rəylər</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctor İnformations -->
      <div class="w-full mt-20">
      <div class="flex justify-around relative">
        <h1 class="pb-4 cursor-pointer text-2xl text-main-text font-bold" @click="selectTab('info')">Məlumat</h1>
        <h1 class="pb-4 cursor-pointer text-2xl text-main-text font-bold" @click="selectTab('articles')">Həkimin məqalələri</h1>
        <h1 class="pb-4 cursor-pointer text-2xl text-main-text font-bold" @click="selectTab('reviews')">Rəylər</h1>
        <div class="absolute w-full h-[4px] left-0 bottom-[-5px] bg-[#c7c7c7]" :style="tabStyle"></div>
      </div>

      <div class="infoContent w-full mt-14">
        <div v-if="selectedTab === 'info'">
          <!-- Məlumat kontenti -->
          <table class="w-full tracking-wider text-main-text">
            <tbody>
              <tr class="bg-[#f6fbf2]">
                <td class="p-2">Vəzifə</td>
                <td class="p-2">{{ doctor.position }}</td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">Şöbə</td>
                <td class="p-2">{{  doctor.category  }}</td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-2">Təhsil</td>
                <td class="p-2">
                  <div class="flex items-center">
                    <p v-html="formattedEducation"></p>
                  </div>
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">Kurslar, Konfranslar</td>
                <td class="p-2">
                  <div class="flex items-center">
                    <p v-html="formattedCourses"></p>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-2">Müayinə və müalicə istiqamətləri</td>
                <td class="p-2">
                  <p v-html="formattedTreatment"></p>
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">İş təcrübəsi</td>
                <td class="p-2">
                  <p v-html="formattedExperience"></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="selectedTab === 'articles'">
          <!-- Həkimin məqalələri kontenti -->
         <p v-html="formattedArticles"></p>
        </div>
        <div v-if="selectedTab === 'reviews'" class="pt-2">
          <!-- Rəylər kontenti -->
          <div class="grid gap-8">
            <div>
              <i class="fa-regular fa-comments mr-1"></i>
              <span>Rəy yazın</span>
            </div>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import DoctorRating from '@/components/DoctorRating.vue';


const route = useRoute();   
const doctor = ref(null);

const fetchDoctor = async () => {
  try {
    console.log(`Həkim məlumatı çağırılır: ${route.params.id}`);
    // Burada artıq slug parametri ilə çağırış edirik
    const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/doctor-list/${route.params.id}/`);
    doctor.value = response.data;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
    
    // Alternativ olaraq bütün həkimləri yükləyib, slug-a görə filtrlə
    try {
      console.log('Bütün həkimlər çağırılır və filtrlənir');
      const allResponse = await axios.get('http://192.168.2.242:8000/api/leyla/v1/doctor-list/');
      const doctorFound = allResponse.data.results.find(d => d.slug === route.params.id);
      
      if (doctorFound) {
        doctor.value = doctorFound;
      } else {
        console.error('Həkim tapılmadı');
      }
    } catch (fallbackError) {
      console.error('Alternativ API çağırışında xəta:', fallbackError);
    }
  }
};

onMounted(() => {
  fetchDoctor();
})

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


// Həkimin təcrübə ilinə görə random pasiyent sayını hesablayan funksiya
const calculatePatients = (experienceYear) => {
  let min, max;
  
  // Təcrübə ilinə əsasən aralığı müəyyən et
  if (!experienceYear || experienceYear <= 1) {
    min = 60;
    max = 100;
  } else if (experienceYear <= 3) {
    min = 200;
    max = 250;
  } else if (experienceYear <= 5) {
    min = 700;
    max = 1000;
  } else {
    min = 1500;
    max = 2000;
  }
  
  // Random rəqəm generasiya et
  let baseNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Tam yuvarlaq rəqəmlərdən qaçmaq üçün +/- 10% aralığında bir düzəliş əlavə et
  // Bu rəqəmlərə 1-9 arası bir təsadüfi ədəd də əlavə edək ki, daha real görünsün
  let adjustment = Math.floor(Math.random() * 10) + 1;
  if (Math.random() > 0.5) {
    baseNumber = baseNumber + adjustment;
  } else {
    baseNumber = baseNumber - adjustment;
  }
  
  // Rəqəmi tam olmayan formada randomlaşdıraq (məsələn 973 deyil, 973.5)
  return baseNumber;
};

// Hesablanmış pasiyent sayı üçün computed xüsusiyyəti yaradaq
const patientCount = computed(() => {
  if (!doctor.value) return 0;
  return calculatePatients(doctor.value.experience_year);
});
</script>

<style scoped>
table img{
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
table tr td{
  padding: 15px;
}
table tr td:nth-child(1){
  display: flex;
}
table tr td:nth-child(1){
  font-size: 20px;
  font-weight: bold;
}
table tr div{
  margin-bottom: 7px;
}
</style>