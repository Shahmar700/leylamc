<template>
   <div>
    <header-top ref="headerTop" />
    <header-main ref="headerMain" />
    <LoginModal v-if="showModal" @close="toggleModal" @login-success="checkAuthStatus" />

    <!-- <breadcrumb v-if="$route.path !== '/registration' && $route.path !== '/'" /> -->
    <RouterView />
    <footer-main />
    <!-- <img src="@/assets/icons/scroll-up.svg"
      v-if="showScrollUp"
      alt="Scroll Up"
      class="scroll-up-icon w-8 h-8 md:w-10 md:h-10"
      @click="scrollToTop"
    /> -->
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
.scroll-up-icon {
  position: fixed;
  bottom: 200px;
  right: 40px;
  cursor: pointer;
  z-index: 1000;
}
</style>