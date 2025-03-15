<template>
  <div :style="{ marginTop: headerHeight + 'px' }">
    <div class="relative ">
      <div class="max-w-[2400px] mx-auto" data-aos="zoom-out-right">
        <Slider :images="homeImages" />
      </div>
      <!-- ** SERVICES ** ----  -->
      <div
        class="bg-white border border-b-0 rounded-t-[60px] w-full"
      >
        <div
          class="container pt-[30px] screen-500:pt-[40px] lg:pt-[90px] pb-[70px] screen-500:pb-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200"
            :backgroundImage="service1"
            :icon="serviceIcon1"
            title="Ünvanda Xidmət"
            description="Ünvanda müayinə rahat, komfortlu və operativ tibbi xidmətin ən optimal üsuludur."
            @click="goToService('/medical-services/unvanda-xidmt')"
          />
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200"
            :backgroundImage="service2"
            :icon="serviceIcon2"
            title="Təcili Tibbi Yardım"
            description="Təcili və Təxirə salmaz Tibbi yardım xidməti üzrə 
            briqadamız 7/24 sizə yüksək səviyyədə diaqnostik-müalicəvi xidmət göstərir. "
            @click="goToService('/medical-services/tcili-tibbi-yardm')"
          />
          <Service
            class="cursor-pointer hover:shadow-lg hover:scale-101 transition-all duration-200"
            :backgroundImage="service3"
            :icon="serviceIcon3"
            title="Çağrı Mərkəzimiz"
            description="*0101 çağrı mərkəzi dinləmədədir. Suallarınızı cavablandırmağa hazırıq!"
            @click="goToService('contact')"
          />
        </div>
      </div>
    </div>
    <!-- ** E-SERVİCES ** ----   -->
    <div class="bg-secondary pt-[72px] pb-24">
      <div>
        <h1
          class="text-xl screen-500::text-2xl lg:text-3xl text-center text-primary font-semibold tracking-wide"
        >
          Elektron xidmətlərimizlə bir addım daha yaxınıq
        </h1>
        <p
          class="text-[#505050] text-xl screen-500::text-2xl lg:text-3xl text-center mt-4 mb-[72px]"
        >
          Hər an, hər yerdə sizinləyik
        </p>
      </div>
      <div
        class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
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
        <!-- <Eservice 
          :eService="eService4" 
          title="E - satış"
          description="Xidmətlərimizi online sifariş edin"
          link="/online-services/e-commerce"
          /> -->
        <Eservice
          :eService="eService5"
          title="E - məsləhət"
          description="Xidmətlərimizi online sifariş edin"
          link="/online-services/e-consultation"
        />
      </div>
    </div>

    <!-- ** ABOUT **  -->
    <div class="container grid grid-cols-1 lg:grid-cols-2 items-center gap-6 xl:gap-10 pt-36 pb-32">
      <div class="flex justify-center flex-col">
        <div class="w-full">
          <img
            src="@/assets/images/logo-mini.svg"
            alt="Logo"
            class="float-left mr-4 mb-4 w-h-16 h-16 screen-400:w-24 screen-400:h-24"
          />
          <div>
            <p
              class="text-base screen-400:text-lg md:text-xl lg:text-2xl font-normal text-justify"
            >
              1999-cu ildə ulu öndərimiz Heydər Əliyev tərəfindən açılışı baş
              tutan Leyla Medical Center fəaliyyətinin 22-ci ilində Referans
              Medical Group şəbəkəsinə daxil olaraq yeni ad, daha geniş xidmət
              çeşidi, daha da peşəkar həkimlər ilə sizlər üçün xidmət göstərməyə
              başladı. Mərkəzimiz tək Azərbaycanda deyil, eyni zamanda Qafqazda
              ilk Mamalıq və Ginekologiya üzrə ixtisaslaşdırılmış özəl tibb
              müəssisəsi kimi uğurla fəaliyyətə başlamışdır.
            </p>
            <h4
              class="text-base screen-400:text-lg md:text-xl lg:text-2xl font-bold text-justify"
            >
              Bizlərə göstərilən inamı doğrultmaq və Səhiyyə sisteminin,
              xüsusilə özəl tibb sektorunun inkişaf etdirilməsi məqsədilə
              müəssisəmiz dayanmadan sizlər üçün xidmət göstərməkdədir. Leyla
              Medical Center olaraq yeni personal, yeni həkimlər, yeni
              avadanlıqlar və ən dəqiq laborator xidmətlər ilə "Sizin
              sağlamlığınız-bizim dəyərimizdir" şüarı altında fəaliyyətimizi
              sizlər üçün davam etdiririk.
            </h4>
          </div>
        </div>
      </div>
      <!-- Right Side  -->
      <div class="">
        <div
          class="w-full h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] relative"
        >
          <img
            class="rounded-2xl w-full h-full rounded-bl-3xl object-cover"
            src="@/assets/images/leyla-building.jpg"
            alt=""
          />
          <div
            class="pt-2 pr-2 bg-white absolute left-0 bottom-0 rounded-2xl transition-all duration-150 cursor-pointer hover:scale-101"
          >
            <router-link
              :to="{ name: 'our-history' }"
              class="!w-36 text-white pt-4 pb-3 px-4 rounded-2xl bg-primary flex flex-col hover:shadow-lg"
            >
              <span
                class="font-semibold text-base screen-400:text-xl screen-500:text-2xl lg:text-3xl"
                >Daha ətraflı</span
              >
              <img
                class="object-cover"
                src="@/assets/icons/long-arrow.svg"
                alt=""
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ** Our Youtube Channel ** -->
    <div class="bg-secondary py-16">
      <div class="container">
        <div class="flex flex-col screen-500:flex-row justify-between mb-10">
          <div>
            <p class="text-2xl text-[#505050] font-normal tracking-wide">
              Youtube kanalımız
            </p>
            <h1
              class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wide"
            >
              Faydalı məlumatlar
            </h1>
          </div>
          <div class="mt-4 sm:mt-0">
            <a href="https://www.youtube.com/channel/UCgdhd5HG-RDd58_Dmch5NJw" target="_blank" class="greenBtn">Kanalımıza keçid et</a>
          </div>
        </div>
        <!-- videos  -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Ytvideo
            v-for="video in youtubeVideos"
            :key="video.id"
            class="px-2 py-4 hover:shadow-md rounded-3xl transition-all duration-300 hover:scale-101 will-change-transform"
            :videoUrl="video.videoUrl"
            :name="video.name"
            @click="openModal(video.videoUrl)"
          />
          <!-- Əgər video sayı 3-dən azdırsa placeholder göstər -->
          <div 
            v-for="index in Math.max(0, 3 - youtubeVideos.length)" 
            :key="`placeholder-${index}`"
            class="px-2 py-4 bg-gray-100 rounded-3xl">
            <div class="w-full h-[200px] bg-gray-200 rounded-md flex items-center justify-center">
              <span class="text-gray-400">Video yüklənir...</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        :isOpen="isModalOpen"
        :videoUrl="currentVideoUrl"
        @close="closeModal"
      />
    </div>

    <!-- ** News **  -->
    <div class="bg-secondary py-16 my-32">
      <div class="container">
        <div class="flex flex-col screen-500:flex-row justify-between mb-10">
          <div>
            <h1
              class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wide"
            >
              Xəbərlər
            </h1>
          </div>
          <div class="mt-4 sm:mt-0">
            <router-link :to="{ name: 'all-news' }" class="greenBtn"
              >Bütün xəbərlər</router-link
            >
          </div>
        </div>
        <!-- News Boxs -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          <News
            v-for="item in news.slice(0, 3)"
            :key="item.id"
            class="cursor-pointer px-2 py-4 hover:shadow-md hover:rounded-3xl transition-all duration-200 hover:scale-101 will-change-transform"
            :newsImg="item.main_photo"
            :newsDate="formatDate(item.created_at)"
            :newsName="item.title"
            @click="goToNews(item.slug)"
          />
        </div>
      </div>
    </div>

    <!-- ** Departments ** -->
    <div
        class="py-16 bg-cover bg-center"
        :style="{ backgroundImage: `url(${departmentsBg})` }"
      >
        <div class="container relative">
          <div class="flex justify-between mb-16">
            <h1
              class="text-white text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wide"
            >
              Şöbələrimiz
            </h1>
            
            <!-- Navigasiya düymələri üçün konteyner -->
            <div class="flex gap-2">
              <div class="swiper-button-prev !static !text-primary !bg-white !w-10 !h-10 !rounded-md !m-0"></div>
              <div class="swiper-button-next !static !text-primary !bg-white !w-10 !h-10 !rounded-md !m-0"></div>
            </div>
          </div>

          <!-- Swiper Carousel -->
          <swiper
            :modules="[Navigation, FreeMode]"
            :slides-per-view="slidesPerView"
            :space-between="20"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :grab-cursor="true"
            :free-mode="true"
            :resistance="true"
            :resistance-ratio="0.85"
            @swiper="onSwiper"
            class="departments-swiper"
          >
            <swiper-slide v-for="(department, index) in departments" :key="index">
              <Departament
                :depIcon="department.icon"
                :name="department.name"
                :subtitle="department.text"
                :slug="department.slug"
                class="cursor-pointer h-full"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

    <!-- ** OUR TEAM (Doctors) ** -->
    <div class="mt-48">
      <div class="container">
        <div class="flex flex-col screen-500:flex-row justify-between mb-10">
          <div>
            <h1
              class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wide"
            >
              Peşəkar komandamız
            </h1>
          </div>
          <div class="mt-4 sm:mt-0">
            <router-link
              to="/doctors"
              class="greenBtn tracking-wide text-base screen-500:text-lg lg:text-xl"
              >Həkimlərimiz</router-link
            >
          </div>
        </div>
        <!-- Doctors Imgs  -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12"
        >
          <DoctorCard
            v-for="doctor in doctors.slice(0, 3)"
            :key="doctor.id"
            :image="doctor.photo"
            :name="`${doctor.degree} ${doctor.first_name} ${doctor.last_name}`"
            :position="doctor.specialty.name"
            @click="goToDoctor(doctor)"
          />
        </div>
      </div>
    </div>

    <!-- ** Ratings ** -->
    <!-- <div class="mt-24 sm:mt-32 md:mt-40 lg:mt-48">
      <div class="container">
        <div class="flex justify-between mb-32 md:mb-24 lg:mb-16">
          <div>
            <h1 class="text-primary text-4xl font-semibold tracking-wide">Bizi seçirlər</h1>
          </div>
          <div>
            <a href="" class="greenBtn tracking-wide">Pasiyent məmnunluqları</a>
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
            <h1
              class="text-primary text-xl screen-500::text-2xl lg:text-3xl font-semibold tracking-wide"
            >
              Xəritədə bax
            </h1>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { shuffle } from "lodash";
import Slider from "@/components/Slider.vue";
import Service from "@/components/Service.vue";
import Eservice from "@/components/Eservice.vue";
import Ytvideo from "@/components/Ytvideo.vue";
import News from "@/components/News.vue";
import Departament from "@/components/Departament.vue";
import DoctorCard from "@/components/DoctorCard.vue";
import Rating from "@/components/Rating.vue";
import Maps from "@/components/Maps.vue";
import Modal from "@/components/Modal.vue";
import { useHead } from "@vueuse/head";

// Swiper import
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// Responsive state
const isMobile = ref(false);
const isTablet = ref(false);
const isDesktop = ref(false);

// Mövcud statik homeImages əvəzinə ref istifadə edəcəyik
const homeImages = ref([]);

// YouTube videoları əldə etmək üçün
const youtubeVideos = ref([]);

// YouTube URL-ləri embed formatına çevirmək üçün funksiya
const convertToEmbedUrl = (url) => {
  // YouTube video ID-sini çıxarmaq
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  
  if (videoId) {
    // Embed URL formatı yaratmaq
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Əgər düzgün format deyilsə, orijinal URL-i qaytarırıq
  return url;
};

// Videolar API-dən çəkilir və təsadüfi sıralama ilə 3 video seçilir
const fetchYoutubeVideos = async () => {
  try {
    const response = await axios.get("https://bytexerp.online/api/leyla/v1/video-gallery-list/");
    
    if (response.data?.results?.length > 0) {
      // API-dən gələn bütün videoları əldə edirik və embed URL formatına çeviririk
      const allVideos = response.data.results.map(video => ({
        id: video.id,
        videoUrl: convertToEmbedUrl(video.link),
        // Video adını API-dən almadığımız üçün bir standart ad təyin edirik
        name: `Leyla Medical Center Video ${video.id}`
      }));
      
      // Videoları təsadüfi sıralama və maksimum 3 video seçirik
      youtubeVideos.value = shuffle(allVideos).slice(0, 3);
    }
  } catch (error) {
    console.error("YouTube videoları yükləməkdə xəta:", error);
  }
};

// API çağırışı ilə banner şəkillərini yükləmək
const fetchBanners = async () => {
  try {
    const response = await axios.get(
      "https://bytexerp.online/api/leyla/v1/banner-list/"
    );
    
    if (response.data?.results?.length > 0) {
      // API-dan gələn şəkilləri array-a çevirək
      const bannerImages = response.data.results.map(banner => ({
        url: banner.photo,
        title: banner.title,
        source: banner.source
      }));
      
      // API-dan şəkillər varsa onları istifadə edək, 
      // yoxdursa default şəkilləri saxlayaq
      if (bannerImages.length > 0) {
        homeImages.value = bannerImages;
      } else {
        // Əgər API-dan şəkil gəlməzsə, default şəkillərdən istifadə edək
        homeImages.value = [
          { url: heroBanner, title: "", source: "" },
          { url: heroBanner3, title: "", source: "" },
          { url: heroBanner4, title: "", source: "" }
        ];
      }
    } else {
      // Əgər API-dan şəkil gəlməzsə, default şəkillərdən istifadə edək
      homeImages.value = [
        { url: heroBanner, title: "", source: "" },
        { url: heroBanner3, title: "", source: "" },
        { url: heroBanner4, title: "", source: "" }
      ];
    }
    console.log("Banner şəkilləri yükləndi:", homeImages.value);
  } catch (error) {
    console.error("Banner şəkilləri yükləmədə xəta:", error);
    // Xəta olduqda default şəkillərdən istifadə edək
    homeImages.value = [
      { url: heroBanner, title: "", source: "" },
      { url: heroBanner3, title: "", source: "" },
      { url: heroBanner4, title: "", source: "" }
    ];
  }
};

// onMounted funksiyasına bannerləri yükləmək əlavə edək
onMounted(() => {
  fetchDoctors();
  fetchNews();
  fetchDepartments();
  fetchBanners(); 
  fetchYoutubeVideos();
  startPolling();

  // Resize hadisəsini izləmək və ilkin ölçüləri hesablamaq
  window.addEventListener("resize", handleResize);
  handleResize();
});

// Ekran ölçülərini izləyən funksiya
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024;
  isDesktop.value = window.innerWidth >= 1024;
};

// Swiper instance
let swiperInstance = null;
const onSwiper = (swiper) => {
  swiperInstance = swiper;
};

// Responsive slidesPerView
const slidesPerView = computed(() => {
  if (isMobile.value) return 1;
  if (isTablet.value) return 2;
  return 3;
});

// Tarix formatlaması üçün funksiya
const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Azərbaycan dilində ayların adları
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

// Modal
const isModalOpen = ref(false);
const currentVideoUrl = ref("");

const openModal = (url) => {
  currentVideoUrl.value = url;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Go To Services
const goToService = (servicePath) => {
  // serviceName yerine servicePath
  if (servicePath.startsWith("/")) {
    // Path parametri ilə yönləndirmə
    router.push({ path: servicePath });
  } else {
    // İsim parametri ilə yönləndirmə
    router.push({ name: servicePath });
  }
};
// GET APİ DOCTORS -------------------

const doctors = ref([]);

// API çağırışı ilə həkim məlumatlarını yükləmək
const fetchDoctors = async () => {
  try {
    const response = await axios.get(
      "http://bytexerp.online/api/leyla/v1/doctor-list/"
    );
    console.log(response.data); // Məlumatları konsolda göstərmək
    doctors.value = shuffle(response.data.results); // Doktorları təsadüfi olaraq qarışdırmaq
  } catch (error) {
    console.error("API çağırışında xəta:", error);
  }
};

// GET APİ NEWS -------------------

const news = ref([]);

// API çağırışı ilə xəbərləri yükləmək
const fetchNews = async () => {
  try {
    const response = await axios.get(
      "http://bytexerp.online/api/leyla/v1/news-list/"
    );
    // console.log(response.data); // Məlumatları konsolda göstərmək
    news.value = response.data.results;
  } catch (error) {
    console.error("API çağırışında xəta:", error);
  }
};

// GET APİ DEPARTMENTS -------------------

const departments = ref([]);

// API çağırışı ilə departamentləri yükləmək
const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      "http://bytexerp.online/api/leyla/v1/department-list/"
    );
    // console.log(response.data); // Məlumatları konsolda göstərmək
    departments.value = response.data.results;
  } catch (error) {
    console.error("API çağırışında xəta:", error);
  }
};

onMounted(() => {
  fetchDoctors();
  fetchNews();
  fetchDepartments();
  startPolling();

  // Resize hadisəsini izləmək və ilkin ölçüləri hesablamaq
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  stopPolling();
  window.removeEventListener("resize", handleResize);
});

let pollingInterval;

const startPolling = () => {
  pollingInterval = setInterval(fetchNews, 5000); // Hər 5 saniyədən bir API çağırışı
};

const stopPolling = () => {
  clearInterval(pollingInterval);
};

const router = useRouter();
const goToDoctor = (doctor) => {
  router.push({ name: "doctor", params: { id: doctor.slug } });
};

const goToNews = (slug) => {
  router.push({ name: "news-content", params: { slug } });
};

// GET APİ DOCTORS END ________________________

// images for the slider component
// import heroBanner from "@/assets/images/heroBanner.webp";
// import heroBanner3 from "@/assets/images/heroBanner3.webp";
// import heroBanner4 from "@/assets/images/heroBanner4.webp";

// const homeImages = [
//   heroBanner,
//   heroBanner3,
//   heroBanner4,
// ];
// Services Images
import service1 from "@/assets/images/Service1.jpg";
import service2 from "@/assets/images/Service2.jpg";
import service3 from "@/assets/images/Service3.jpg";
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
import user1 from "@/assets/images/user1.jpg";
import user2 from "@/assets/images/user2.jpg";
import user3 from "@/assets/images/user3.jpg";

// get header height
const headerHeight = inject("headerHeight", ref(0));

// SEO meta məlumatları
import { inject } from "vue";
// Footer-dən əlaqə məlumatlarını inject et
const contactInfo = inject("contactInfo", null);

useHead({
  title: "Leyla Medical Center | Əsas Səhifə ",
  meta: [
    {
      name: "description",
      content:
        "1999-cu ildən fəaliyyət göstərən Leyla Medical Center Azərbaycanda aparıcı tibb mərkəzidir. Qafqazda ilk Mamalıq və Ginekologiya üzrə ixtisaslaşdırılmış özəl tibb müəssisəsi. Təcili tibbi yardım, ünvana həkim xidməti və geniş şöbə şəbəkəsi.",
    },
    {
      name: "keywords",
      content:
        "leyla medical center, tibb mərkəzi, klinika, tibbi xidmət, həkim, ginekologiya, mamalıq, təcili tibbi yardım, ünvana həkim, azərbaycan, bakı",
    },
    {
      property: "og:title",
      content: "Leyla Medical Center | Azərbaycanın Aparıcı Tibb Mərkəzi",
    },
    {
      property: "og:description",
      content:
        "Leyla Medical Center - 1999-cu ildən etibarən yüksək keyfiyyətli tibbi xidmətlər təqdim edir. 7/24 təcili tibbi yardım, ünvana həkim və geniş şöbə şəbəkəsi.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://leylamc.com" },
    {
      property: "og:image",
      content: "https://leylamc.com/images/leyla-building.jpg",
    },
    { property: "og:site_name", content: "Leyla Medical Center" },
    { property: "og:locale", content: "az_AZ" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Leyla Medical Center | Azərbaycanın Aparıcı Tibb Mərkəzi",
    },
    {
      name: "twitter:description",
      content:
        "Leyla Medical Center - 1999-cu ildən etibarən yüksək keyfiyyətli tibbi xidmətlər təqdim edir. 7/24 təcili tibbi yardım, ünvana həkim və geniş şöbə şəbəkəsi.",
    },
    {
      name: "twitter:image",
      content: "https://leylamc.com/images/leyla-building.jpg",
    },

    // Strukturlu məlumatları əlavə etmək
    {
      name: "script",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        name: "Leyla Medical Center",
        url: "https://leylamc.com",
        logo: "https://leylamc.com/images/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+994-101",
          contactType: "customer service",
          availableLanguage: ["Azərbaycan dili", "English", "Русский"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Tbilisi prospekti 147",
          addressLocality: "Bakı",
          addressRegion: "Bakı",
          postalCode: "AZ1122",
          addressCountry: "AZ",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.4093,
          longitude: 49.8671,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "24:00",
        },
        department: departments.value.map((dept) => ({
          "@type": "MedicalSpecialty",
          name: dept.name,
        })),
      }),
    },
    contactInfo && {
      name: "script",
      type: "application/ld+json",
      children: JSON.stringify(contactInfo),
    },
  ],
  link: [{ rel: "canonical", href: "https://leylamc.com" }],
});
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
/* Navigasiya düymələri üçün stil */
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 16px !important;
}

/* Container-ı relative et ki, düymələri düzgün yerləşdirə bilək */
.container {
  position: relative;
}
/* 
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
} */

/* .nav-button {
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
} */


</style>
