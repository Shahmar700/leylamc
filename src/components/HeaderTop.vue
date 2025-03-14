<template>
    <div class="bg-primary">
        <header class="container w-full py-2 sm:py-2 flex flex-wrap md:flex-nowrap justify-between">
        <!-- left side  -->
        <div class="flex flex-row w-full justify-between screen-500:justify-start screen-500:flex-row items-start sm:flex-row sm:items-center text-xs md:text-sm lg:text-base">
            
            <div class="flex mb-2 sm:mb-0">
                <!-- lang  -->
                <div class="lang-selector pr-2 relative z-[999999] text-sm flex items-center justify-center">
                      <div class="relative inline-block">
                          <div @click="toggleDropdown" class="language-button flex items-center justify-between px-3 cursor-pointer rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <span class="font-medium">{{ selectedLanguage }}</span>
                              <svg class="w-3 h-3 ml-1 transform transition-transform duration-300" :class="{'rotate-180': isOpen}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                              </svg>
                          </div>
                          <transition name="dropdown">
                              <ul v-if="isOpen" class="language-dropdown absolute mt-1 w-full bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden">
                                  <li v-for="language in filteredLanguages" :key="language" @click="selectLanguage(language)" class="px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                      {{ language }}
                                  </li>
                              </ul>
                          </transition>
                      </div>
                  </div>
                <!-- lang END -->
                
                <!-- Phone  -->
                <span class="text-white hidden screen-500:block">|</span>
                    <div class="flex items-center px-2 text-sm">
                    <div class="mr-1 relative">
                        <a href="tel:*0101" class="flex items-center emergency-number">
                        <div class="emergency-light-container flex justify-evenly">
                            <div class="emergency-light blue"></div>
                            <div class="emergency-light red"></div>
                        </div>
                        <div class="relative z-10">
                            <img src="@/assets/icons/phone.svg" alt="phone" class="icon" />
                        </div>
                        <span class="text-white pl-1 font-bold z-10">*0101</span>
                        </a>
                    </div>
                    </div>
                <span class="text-white hidden screen-500:block">|</span>
                
            </div>

            <div class="flex flex-col screen-500:flex-row text-sm">
                <div class="flex items-center px-2">
                    <a href="tel:+994502257330" class="flex items-center">
                        <img src="@/assets/icons/mob.svg" alt="mob" class="icon" />
                        <span class="text-white pl-1">+994 50 225 73 30</span>
                    </a>
                </div>
                <span class="text-white hidden screen-500:block">|</span>
                <div class="flex items-center px-2">
                    <a href="mailto:info@leylamc.az" class="flex items-center">
                    <img src="@/assets/icons/mail.svg" alt="mail" class="icon" />
                    <span class="text-white pl-1">info@leylamc.az</span>
                    </a>
                </div>
            </div>
            
        </div>
        <!-- right side  -->
            <div class="socialsIcons flex space-x-2 sm:space-x-3 w-full md:w-auto justify-start items-center screen-500:justify-end mt-1 sm:mt-0">

                <a href="https://www.facebook.com/LeylaMedicalCenter/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f text-white text-sm md:text-base lg:text-lg hover:text-[#1877F2] duration-200"></i></a>

                <a href="https://t.me/referansmg" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-telegram  text-white text-sm md:text-base lg:text-lgl hover:text-[#24A1DE] duration-200"></i></a>

                <a href="https://www.youtube.com/channel/UCgdhd5HG-RDd58_Dmch5NJw" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube text-white text-sm md:text-base lg:text-lg hover:text-[#ff0000] duration-200"></i></a>

                <a href="https://www.instagram.com/leylamedicalcenter/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram text-white text-sm md:text-base lg:text-lg duration-200 instagram-gradient"></i></a>

                <a href="https://wa.me/994554550111" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp text-white text-sm md:text-base lg:text-lg duration-200 whatsapp-gradient"></i></a>
            </div>
        </header>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const languages = ref(['Az', 'Ru', 'Eng']);
const selectedLanguage = ref('Az');
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (language) => {
  selectedLanguage.value = language;
  isOpen.value = false;
};

const filteredLanguages = computed(() => {
  return languages.value.filter(language => language !== selectedLanguage.value);
});


</script>

<style>

.arrowIcon{
    width: 10px;
    height: 10px;
}
.icon{
    width: 15px;
    height: 15px;
}


@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

.instagram-gradient:hover {
  background: linear-gradient(45deg, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s;
}

.whatsapp-gradient:hover {
  background: linear-gradient(45deg, #075e54, #128c7e, #25d366, #abee79, #34b7f1, #d2e3c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s;
}

/* Təcili Yardım Zəng Animasiyası */
.emergency-number {
  position: relative;
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}

.emergency-number:hover {
  transform: scale(1.05);
}

.emergency-light-container {
  position: absolute;
  top: 5px;
  left: 20px;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.emergency-light {
  width: 10px;
  height: 2px;
  /* border-radius: 50%; */
  margin: 0 2px;
}

.emergency-light.blue {
  background-color: #1e90ff;
  box-shadow: 0 0 10px 3px #1e90ff;
  animation: blueLight 1s infinite alternate;
}

.emergency-light.red {
  background-color: #ff3333;
  box-shadow: 0 0 10px 3px #ff3333;
  animation: redLight 1s infinite alternate;
}

@keyframes blueLight {
  0%, 100% {
    opacity: 1;
    transform: scale(1.2);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

@keyframes redLight {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Qısa zəng nömrəsi vurğulaması */
.emergency-number span {
  font-weight: bold;
  letter-spacing: 0.5px;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
}

/* Nömrə ətrafında parlaq pulsasiya dairəsi */
.emergency-number::after {
  content: '';
  position: absolute;
  inset: 0;
  /* border-radius: 20px; */
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  animation: pulse-border 2s infinite;
  z-index: 0;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.language-button {
    min-width: 55px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
}

.language-button:hover {
    background-color: #ffffff;
    border-color: rgba(255, 255, 255, 0.5);
}

.language-dropdown {
    transform-origin: top center;
    z-index: 50;
}

/* Dropdown animasiyası */
.dropdown-enter-active, 
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

/* Dil seçilmiş və hover effektləri */
.language-dropdown li {
    border-bottom: 1px solid #f0f0f0;
}

.language-dropdown li:last-child {
    border-bottom: none;
}

.language-dropdown li:hover {
    font-weight: 500;
    color: #6ab42b;
}
</style>
