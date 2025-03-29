<template>
   <div>
    <header-top ref="headerTop" />
    <header-main ref="headerMain" />
    <LoginModal v-if="showModal" @close="toggleModal" @login-success="checkAuthStatus" />

    <!-- <breadcrumb v-if="$route.path !== '/registration' && $route.path !== '/'" /> -->
    <RouterView />
    <footer-main />
    <img src="@/assets/icons/scroll-up.svg"
      v-if="showScrollUp"
      alt="Scroll Up"
      class="scroll-up-icon w-8 h-8 md:w-10 md:h-10 fixed bottom-[160px] md:bottom-[190px] right-[26px] md:right-[48px] cursor-pointer z-[1000] hover:scale-110 transition-all duration-300"
      @click="scrollToTop"
    />
    <!-- WhatsApp Icon - always visible -->
    <div 
      class="whatsapp-icon w-11 h-11 md:w-14 md:h-14 fixed bottom-[100px] md:bottom-[120px] right-[20px] md:right-[40px] cursor-pointer z-[1000] bg-green-500 rounded-full flex items-center justify-center"
      @click="openWhatsApp"
    >
      <span class="ripple-effect whatsapp-ripple"></span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 md:w-6 md:h-6 text-white relative z-10">
        <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </div>
    <!-- Phone Icon - always visible -->
    <div 
      class="phone-icon w-11 h-11 md:w-14 md:h-14 fixed bottom-[40px] right-[20px] md:right-[40px] cursor-pointer z-[1000] bg-orange-500 rounded-full flex items-center justify-center"
      @click="callPhone"
    >
      <span class="ripple-effect phone-ripple"></span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.314 28.323" class="w-5 h-5 md:w-6 md:h-6 text-white relative z-10">
     <path fill="currentColor" d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z"/>
  </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import HeaderTop from './components/HeaderTop.vue'
import HeaderMain from './components/HeaderMain.vue'
import FooterMain from './components/FooterMain.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import LoginModal from './components/LoginModal.vue';
import authService from '@/services/auth'; // Auth service import
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const checkAuthStatus = () => {
  return authService.isLoggedIn();
};

// Provide the toggleModal function to be used in any component
provide('toggleModal', toggleModal);
const showScrollUp = ref(false)
// get header height 
const headerTop = ref(null)
const headerMain = ref(null)
const headerHeight = ref(0)


const handleScroll = () => {
  showScrollUp.value = window.scrollY > 700;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// WhatsApp and Phone functions
const openWhatsApp = () => {
  window.open('https://wa.me/994554550111', '_blank');
}

const callPhone = () => {
  window.location.href = 'tel:*0101';
}

// get header height 
const updateHeaderHeight = () => {
  headerHeight.value = (headerTop.value?.offsetHeight || 0) + (headerMain.value?.offsetHeight || 0)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateHeaderHeight)
})

provide('headerHeight', headerHeight)
</script>

<style scoped>
.whatsapp-icon, .phone-icon {
  transition: transform 0.3s ease;
  /* position: relative; - Bu sətri silin */
}

.whatsapp-icon:hover, .phone-icon:hover {
  transform: scale(1.1);
}

/* Ripple effect element */
.ripple-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

/* Create two ripple waves using the same element */
.whatsapp-ripple::before, .whatsapp-ripple::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  animation: rippleGreen 2s infinite ease-out;
}

.whatsapp-ripple::after {
  animation-delay: 1s; /* Delay for second wave */
}

.phone-ripple::before, .phone-ripple::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  animation: rippleOrange 2s infinite ease-out;
}

.phone-ripple::after {
  animation-delay: 1s; /* Delay for second wave */
}

/* Specific ripple animations for each color */
@keyframes rippleGreen {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
}

@keyframes rippleOrange {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
    box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
  }
}
</style>