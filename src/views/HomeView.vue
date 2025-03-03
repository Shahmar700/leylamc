<template>
  <div :style="{ marginTop: headerHeight + 'px' }">
    <div class="relative pb-[550px]" >
      <div class="max-w-[2400px] mx-auto">
        <Slider :images="homeImages" />
      </div>
    <!-- ** SERVICES ** ----  -->
      <div class="bg-white border rounded-t-[60px] absolute bottom-32 screen-375:bottom-44 screen-400:bottom-20 screen-500:-bottom-20 sm:-bottom-60 md:-bottom-40 lg:bottom-60 xl:-bottom-1 left-2/4 -translate-x-2/4 w-full">
        <div class="container pt-[30px] screen-500:pt-[50px] lg:pt-[90px] pb-[70px] screen-500:pb-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200" 
            :backgroundImage="service1"
            :icon="serviceIcon1"
            title="Ünvanda xidmət"
            description="Ünvanda müayinə rahat, komfortlu və operativ tibbi xidmətin ən optimal üsuludur."
            @click="goToService('home-examination')"
          />
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200" 
            :backgroundImage="service2"
            :icon="serviceIcon2"
            title="TƏCİLİ TİBBİ yardım"
            description="Təcili və Təxirə salmaz Tibbi yardım xidməti üzrə 
            briqadamız 7/24 sizə yüksək səviyyədə diaqnostik-müalicəvi xidmət göstərir. "
            @click="goToService('ambulance')"
          />
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200"
            :backgroundImage="service3"
            :icon="serviceIcon3"
            title="Çağrı mərkəzimiz"
            description="*0101 çağrı mərkəzi dinləmədədir. Suallarınızı cavablandırmağa hazırıq!"
            @click="goToService('contact')"
          />
        </div>
        </div>
      
      </div>
    <!-- ** E-SERVİCES ** ----   -->
     <div class="bg-secondary pt-[72px] pb-24">
      <div>
        <h1 class="text-xl screen-500::text-2xl lg:text-3xl text-center text-primary font-semibold tracking-wide">Elektron xidmətlərimizlə bir addım daha yaxınıq</h1>
        <p class="text-[#505050] text-xl screen-500::text-2xl lg:text-3xl text-center mt-4 mb-[72px]">Hər an, hər yerdə sizinləyik</p>
      </div>
      <div class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Eservice 
          :eService="eService1"
          title="E - növbə"
          description="Online qəbula e - növbəyə yazılın"
          link="/online-services/e-appointment"
          />
          <Eservice
          :eService="eService2"
          title="E - nəticə"
          description="Analizlərin nəticələrini əldə edin" 
          link="/online-services/e-result"
          />
          <Eservice 
          :eService="eService3" 
          title="E - ödəmə"
          description="Ödənişləri e-ödəmə vasitəsiylə edin"
          link="/online-services/e-payment"
          />
          <Eservice 
          :eService="eService4" 
          title="E - satış"
          description="Xidmətlərimizi online sifariş edin"
          link="/online-services/e-commerce"
          />
          <Eservice 
          :eService="eService5" 
          title="E - məsləhət"
          description="Xidmətlərimizi online sifariş edin"
          link="/online-services/e-consultation"
          />
      </div>
     </div>

     <!-- ** ABOUT **  -->
      <div class="container grid grid-cols-1 lg:grid-cols-2 gap-6 pt-36 pb-32">
        <div class="flex justify-center flex-col">
          <div class="w-full">
            <img src="@/assets/images/logo-mini.svg" alt="Logo" class="float-left mr-4 mb-4 w-h-16 h-16 screen-400:w-24 screen-400:h-24">
          <div>
            <p class="text-base screen-400:text-lg md:text-2xl font-thin">
            1999-cu ildə ulu öndərimiz Heydər Əliyev tərəfindən açılışı baş tutan Leyla Medical Center fəaliyyətinin 22-ci ilində Referans Medical Group şəbəkəsinə daxil olaraq yeni ad, daha geniş xidmət çeşidi, daha da peşəkar həkimlər ilə sizlər üçün xidmət göstərməyə başladı. Mərkəzimiz tək Azərbaycanda deyil, eyni zamanda Qafqazda ilk Mamalıq və Ginekologiya üzrə ixtisaslaşdırılmış özəl tibb müəssisəsi kimi uğurla fəaliyyətə başlamışdır.
          </p>
          <h4 class="text-base screen-400:text-lg md:text-2xl font-bold">
            Bizlərə göstərilən inamı doğrultmaq və Səhiyyə sisteminin, xüsusilə özəl tibb sektorunun inkişaf etdirilməsi məqsədilə müəssisəmiz dayanmadan sizlər üçün xidmət göstərməkdədir. Leyla Medical Center olaraq yeni personal, yeni həkimlər, yeni avadanlıqlar və ən dəqiq laborator xidmətlər ilə "Sizin sağlamlığınız-bizim dəyərimizdir" şüarı altında fəaliyyətimizi sizlər üçün davam etdiririk.
          </h4>
          </div>
        </div>
        </div>
        <!-- Right Side  -->
        <div class="">
          <div class="w-full h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]  relative">
            <img class="rounded-2xl w-full h-full rounded-bl-3xl object-cover" src="@/assets/images/leyla-building.jpg" alt="">
              <div class="pt-2 pr-2 bg-white absolute left-0 bottom-0 rounded-2xl transition-all duration-150 cursor-pointer hover:scale-101">
                <router-link :to="{name: 'our-history'}" class="!w-36 text-white pt-4 pb-3 px-4 rounded-2xl bg-primary flex flex-col hover:shadow-lg">
                  <span class="font-semibold text-base screen-400:text-xl screen-500:text-2xl lg:text-3xl">Daha ətraflı</span>
                  <img class="object-cover" src="@/assets/icons/long-arrow.svg" alt="">
                </router-link>
              </div>
          </div>
        </div>
      </div>

      <!-- ** Our Youtube Channel ** -->
      <div class="bg-secondary py-16">
      <div class="container ">
        <div class=" flex flex-col screen-500:flex-row justify-between mb-10">
          <div>
            <p class="text-2xl text-[#505050] font-thin tracking-wider">Youtube kanalımız</p>
            <h1 class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wider">Faydalı məlumatlar</h1>
          </div>
          <div class="mt-4 sm:mt-0">
            <a href="" class="greenBtn">Kanalımıza keçid et</a>
          </div>
        </div>
        <!-- videos  -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Ytvideo
            class="px-2 py-4 hover:shadow-md rounded-3xl transition-all duration-300 hover:scale-101 will-change-transform"
            videoUrl="https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7"
            name="Leyla Medical Centerin Radiologiya şöbəsi"
             @click="openModal('https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7')"
            />
            <Ytvideo
            class="px-2 py-4 hover:shadow-md rounded-3xl transition-all duration-300 hover:scale-101 will-change-transform"
            videoUrl="https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7"
            name="Leyla Medical Centerin Radiologiya şöbəsi"
             @click="openModal('https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7')"
            />
            <Ytvideo
            class="px-2 py-4 hover:shadow-md rounded-3xl transition-all duration-300 hover:scale-101 will-change-transform"
            videoUrl="https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7"
            name="Leyla Medical Centerin Radiologiya şöbəsi"
             @click="openModal('https://www.youtube.com/embed/Ae6bfpTJ6gc?si=mBDYzKem1zpKvRz7')"
            />
         </div>
      </div>
        <Modal :isOpen="isModalOpen" :videoUrl="currentVideoUrl" @close="closeModal" />
      </div>

      <!-- ** News **  -->
      <div class="bg-secondary py-16 my-32">
      <div class="container">
        <div class=" flex flex-col screen-500:flex-row justify-between mb-10">
          <div>
            <h1 class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wider">Xəbərlər</h1>
          </div>
          <div class="mt-4 sm:mt-0">
            <router-link :to="{name: 'all-news'}" class="greenBtn">Bütün xəbərlər</router-link>
          </div>
        </div>
        <!-- News Boxs -->
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <News 
            v-for="item in news.slice(0, 3)" 
            :key="item.id"
            class="cursor-pointer px-2 py-4 hover:shadow-md hover:rounded-3xl transition-all duration-200 hover:scale-101 will-change-transform"
            :newsImg="item.main_photo" 
            :newsDate="new Date(item.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })"
            :newsName="item.title"
            @click="goToNews(item.slug)"
        />
         </div>
      </div>
      </div>

      <!-- ** Departments ** -->
    <div class="py-16 bg-cover bg-center" :style="{ backgroundImage: `url(${departmentsBg})` }">
      <div class="container">
        <div class="flex justify-between mb-16">
          <h1 class="text-white text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wider">Şöbələrimiz</h1>
          <div class="flex">
            <button id="depSpinLeft" @click="prevSlide" :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }" class="w-10 bg-white flex items-center justify-center rounded-md mr-2">
              <img class="w-3" :src="vectorLeft" alt="">
            </button>
            <button id="depSpinRight" @click="nextSlide" :class="{ 'opacity-50 cursor-not-allowed': currentIndex === maxIndex }" class="w-10 bg-white flex items-center justify-center rounded-md">
              <img class="w-3" :src="vectorRight" alt="">
            </button>
          </div>
        </div>
        <!-- Departament Carousel  -->
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 gap-5" :style="{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }">
            <Departament
              v-for="(department, index) in departments"
              :key="index"
              :depIcon="department.icon"
              :name="department.name"
              :subtitle="department.text"
              :slug="department.slug"
              class="w-[30%] flex-shrink-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ** OUR TEAM (Doctors) ** -->
    <div class="mt-48">
      <div class="container">
        <div class="flex justify-between mb-16">
          <div>
            <h1 class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wider">Peşəkar komandamız</h1>
          </div>
          <div>
            <router-link to="/doctors" class="greenBtn tracking-wider">Həkimlərimiz</router-link>
          </div>
        </div>
        <!-- Doctors Imgs  -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16">
          <DoctorCard
            v-for="doctor in doctors"
            :key="doctor.id"
            :image="doctor.photo"
            :name="`${doctor.degree} ${doctor.first_name} ${doctor.last_name}`"
            :position="doctor.specialty.name"
            @click="goToDoctor(doctor.id)"
        />
        </div>
      </div>
    </div>

    <!-- ** Ratings ** -->
    <!-- <div class="mt-24 sm:mt-32 md:mt-40 lg:mt-48">
      <div class="container">
        <div class="flex justify-between mb-32 md:mb-24 lg:mb-16">
          <div>
            <h1 class="text-primary text-4xl font-semibold tracking-wider">Bizi seçirlər</h1>
          </div>
          <div>
            <a href="" class="greenBtn tracking-wider">Pasiyent məmnunluqları</a>
          </div>
        </div>
       
        <div class="grid grid-cols-1 screen-500px:grid-cols-2 lg:grid-cols-3 gap-6">
          <Rating
        :image="user1"
        star="5"  
        name="Tomris Həsənzadə"
        review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
        />
        <Rating
        :image="user2"
        star="4"  
        name="İsmayıl Bayramlı"
        review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
        />
        <Rating
        :image="user3"
        star="3"  
        name="Günəş Muxtarova"
        review="Uşaqlara öz övladı kimi davranan, her bir xirdaliga diqqet yetirərək xidmət göstərən"
        />
        </div>
      </div>
    </div> -->

    <!-- ** MAP **  -->
    <div class="mt-48">
      <div class="container">
        <div class="flex justify-between mb-16">
          <div>
            <h1 class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wider">Xəritədə bax</h1>
          </div>
        </div>
        <!-- Maps  -->
         <div class="w-full rounded-3xl overflow-hidden relative">
            <Maps />
         </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import { shuffle } from 'lodash';
import Slider from '@/components/Slider.vue'
import Service from '@/components/Service.vue'
import Eservice from '@/components/Eservice.vue'
import Ytvideo from '@/components/Ytvideo.vue'
import News from '@/components/News.vue'
import Departament from '@/components/Departament.vue'
import DoctorCard from '@/components/DoctorCard.vue'
import Rating from '@/components/Rating.vue'
import Maps from '@/components/Maps.vue'
import Modal from '@/components/Modal.vue';

// Modal
const isModalOpen = ref(false);
const currentVideoUrl = ref('');

const openModal = (url) => {
  currentVideoUrl.value = url;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Go To Services 
const goToService = (serviceName) => {
  router.push({ name: serviceName });
};

// GET APİ DOCTORS -------------------

const doctors = ref([]);

// API çağırışı ilə həkim məlumatlarını yükləmək
const fetchDoctors = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/doctor-list/');
    console.log(response.data); // Məlumatları konsolda göstərmək
    doctors.value = shuffle(response.data.results); // Doktorları təsadüfi olaraq qarışdırmaq
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// GET APİ NEWS -------------------

const news = ref([]);

// API çağırışı ilə xəbərləri yükləmək
const fetchNews = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/news-list/');
    console.log(response.data); // Məlumatları konsolda göstərmək
    news.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

// GET APİ DEPARTMENTS -------------------

const departments = ref([]);

// API çağırışı ilə departamentləri yükləmək
const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/department-list/');
    console.log(response.data); // Məlumatları konsolda göstərmək
    departments.value = response.data.results;
  } catch (error) {
    console.error('API çağırışında xəta:', error);
  }
};

onMounted(() => {
  fetchDoctors();
  fetchNews();
  fetchDepartments();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

let pollingInterval;

const startPolling = () => {
  pollingInterval = setInterval(fetchNews, 5000); // Hər 5 saniyədən bir API çağırışı
};

const stopPolling = () => {
  clearInterval(pollingInterval);
};

const router = useRouter();
const goToDoctor = (id) => {
  router.push({ name: 'doctor', params: { id } });
};

const goToNews = (slug) => {
  router.push({ name: 'news-content', params: { slug } });
}

// GET APİ DOCTORS END ________________________

// images for the slider component
import heroBanner from '@/assets/images/heroBanner.webp'
// import heroBanner2 from '@/assets/images/heroBanner2.webp'
import heroBanner3 from '@/assets/images/heroBanner3.webp'
import heroBanner4 from '@/assets/images/heroBanner4.webp'

const homeImages = [
  heroBanner,
  // heroBanner2,
  heroBanner3,
  heroBanner4,
]
// Services Images 
import service1 from "@/assets/images/Service1.jpg"
import service2 from "@/assets/images/Service2.jpg"
import service3 from "@/assets/images/Service3.jpg"
import serviceIcon1 from "@/assets/icons/serviceIcon1.png";
import serviceIcon2 from "@/assets/icons/serviceIcon2.svg";
import serviceIcon3 from "@/assets/icons/serviceIcon3.svg";

// E-services Icons 
import eService1 from "@/assets/icons/eService1.svg";
import eService2 from "@/assets/icons/eService2.svg";
import eService3 from "@/assets/icons/eService3.svg";
import eService4 from "@/assets/icons/eService4.svg";
import eService5 from "@/assets/icons/eService5.svg";

// News Images 
// import news1 from "@/assets/images/news1.jpg"
// import news2 from "@/assets/images/news2.jpg"
// import news3 from "@/assets/images/news3.jpg"

// Departments Images
import departmentsBg from "@/assets/images/departaments-bg.webp";
// import allergolog from "@/assets/images/departaments/allergolog.png";
// import dermatology from "@/assets/images/departaments/dermatology.png";
// import ambulance from "@/assets/images/departaments/ambulance.png";
import vectorLeft from "@/assets/icons/vector-left.svg";
import vectorRight from "@/assets/icons/vector-right.svg";

// const departaments = ref([
//   { icon: allergolog, name: 'Allerqologiya', subtitle: 'Allergiya orqanizmin hər hansı bir maddəyə yüksək reaksiyasıdır' },
//   { icon: dermatology, name: 'Dermatokosmetologiya', subtitle: 'Şöbədə həm dermatoloji həm kosmetoloji xidmətlər göstərilir' },
//   { icon: ambulance, name: 'Təcili tibbi yardım', subtitle: '7/24 fəaliyyət göstərir' },
//   { icon: ambulance, name: 'Təcili tibbi yardım', subtitle: '7/24 fəaliyyət göstərir' },
// ]);
const currentIndex = ref(0);
const maxIndex = computed(() => departments.value.length - 3);

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};


// Rating User Images
import user1 from "@/assets/images/user1.jpg"
import user2 from "@/assets/images/user2.jpg"
import user3 from "@/assets/images/user3.jpg"

// get header height 
const headerHeight = inject('headerHeight', ref(0))
</script>

<style scoped>
.hover\:shadow-lg:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.float-left {
  float: left;
}

.float-right {
  float: right;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}


/* Department Caroulse  */

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  flex: 0 0 30%;
  max-width: 30%;
  /* padding: 0 8px; */
  /* box-sizing: border-box; */
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>