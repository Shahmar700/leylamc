<template>
  <div>
    <header-top />
    <header-main />
    <breadcrumb />
    <RouterView />
    <footer-main />
      <img src="@/assets/icons/scroll-up.svg"
      v-if="showScrollUp"
      alt="Scroll Up"
      class="scroll-up-icon w-8 h-8 md:w-10 md:h-10"
      @click="scrollToTop"
      />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderTop from './components/HeaderTop.vue'
import HeaderMain from './components/HeaderMain.vue'
import FooterMain from './components/FooterMain.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const showScrollUp = ref(false)

const handleScroll = () => {
  showScrollUp.value = window.scrollY > 700;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})

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