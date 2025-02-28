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
                <span class="text-4xl font-bold text-main-text ml-2">{{doctor.experience_year}}</span>
              </div>
              <span class="mt-1">Təcrübə</span>
            </div>
            <!-- Doctor experience -->
            <div class="flex flex-col px-12 py-6 items-center tracking-wider border border-l-[#c7c7c7] border-r-[#c7c7c7] border-t-0 border-b-0">
              <div class="flex">
                <img :src="patientIcon" alt="" class="w-[45px] h-[45px] object-cover">
                <span class="text-4xl font-bold text-main-text ml-2">9845</span>
              </div>
              <span class="mt-1">Pasiyent sayı</span>
            </div>
            <!-- Doctor experience -->
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
                <td class="p-2">Həkim ginekoloq</td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">Şöbə</td>
                <td class="p-2">Ginekologiya</td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-2">Təhsil</td>
                <td class="p-2">
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>1994-2000-ci illərdə Azərbaycan Tibb Universitetində. 
                    Müalicə işi fakultəsində təhsil almışdır.</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="" class="w-[17px] h-[17px]">
                    <p>1994-2000-ci illərdə Azərbaycan Tibb Universitetində. 
                    Müalicə işi fakultəsində təhsil almışdır.</p>
                  </div>

                    <!-- for  -->
                    <!-- <div v-for="(education, index) in doctor.education" :key="index" class="flex items-start mb-2">
                      <img :src="tick" alt="tick" class="w-[17px] h-[17px] mr-2">
                      <p>{{ education }}</p>
                    </div> -->

                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">Kurslar, Konfranslar</td>
                <td class="p-2">
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>2011-ci ildə Rusiya Federasiyasında “Uşaqlıq boynu xəstəlikləri müyinəsi və müalicəsi. Kolposkopiya üzrə təlim” keçmişdir.</p>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#f6fbf2]">
                <td class="p-2">Müayinə və müalicə istiqamətləri</td>
                <td class="p-2">
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Bütün ginekoloji xəstəliklər</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Hamiləliyin təqibi</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Ginekoloji əməliyyatlar</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Uşaqlıq boynunun xəstəlikləri</p>
                  </div> 
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Təbii doğuş</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Qeysəriyyə əməliyyatı</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="tick" alt="">
                    <p>Qadınlarda menstrual sikl problemləri</p>
                  </div>
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-2">İş təcrübəsi</td>
                <td class="p-2">09.04.2019-cu illərdə indiyədək “Leyla Medical Center” MMC</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="selectedTab === 'articles'">
          <!-- Həkimin məqalələri kontenti -->
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores sunt sint rerum deserunt eum commodi aliquam alias, excepturi temporibus consectetur eaque? Possimus illo voluptatum eaque ipsum tempore enim vero, magnam mollitia atque nihil, perferendis consectetur hic dicta earum porro at incidunt unde quas quis nulla molestias temporibus modi iure reprehenderit? Veritatis minima ut tempora laudantium iste quod officia similique nemo alias sapiente harum ipsum, culpa sequi. Temporibus odio minus ut pariatur ratione odit fuga dicta. Sint eius rem doloremque a nostrum saepe natus quos, nesciunt vel. Possimus ipsum tempore quaerat hic veniam nemo doloremque minima esse, et itaque fuga exercitationem.
        </div>
        <div v-if="selectedTab === 'reviews'" class="pt-2">
          <!-- Rəylər kontenti -->
          <div class="grid gap-8">
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

// import Dr1 from "@/assets/images/Dr1.jpg";
// import Dr2 from "@/assets/images/Dr2.jpg";
// import Dr3 from "@/assets/images/Dr3.jpg";

import tick from '@/assets/icons/tick.svg'

// const doctors = ref([
//   { id: '1', name: 'Op.Dr. Aynurə Abdullayeva', position: 'Cərrah Mama-Ginekoloq', image: Dr1 },
//   { id: '2', name: 'Op.Dr. Natiq Məhərrəmov', position: 'Cərrah Mama-Ginekoloq', image: Dr2 },
//   { id: '3', name: 'T.Ü.F.D. Op.Dr. Nigar Əlizadə', position: 'Cərrah Mama-Ginekoloq', image: Dr3 },
// ]);

const route = useRoute();   
const doctor = ref(null);

const fetchDoctor = async () => {
  try{
    const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/doctor-list/${route.params.id}/`);
    doctor.value = response.data;
  }catch(error){
    console.error('API çağırışında xəta:', error)
  }
}

onMounted(() => {
  fetchDoctor();
})

// const doctor = computed(() => {
//   return doctors.value.find(doc => doc.id === route.params.id);
// });


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
import UserPhoto from '@/assets/images/rating-user.jpg'

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
  font-size: 20px;
  font-weight: bold;
}
table tr div{
  margin-bottom: 7px;
}
</style>