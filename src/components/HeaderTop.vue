<template>
    <div class="bg-primary">
        <header class="container w-full py-2 sm:py-2 flex flex-wrap md:flex-nowrap justify-between">
        <!-- left side  -->
        <div class="flex flex-row w-full justify-between screen-500:justify-start screen-500:flex-row items-start sm:flex-row sm:items-center text-xs md:text-sm lg:text-base">
            
            <div class="flex mb-2 sm:mb-0">
                <!-- lang  -->
                <div class="lang-selector pr-2 relative z-[999999] text-sm flex items-center justify-center">
                    <div class="relative inline-block">
                    <!-- Burada ref əlavə et -->
                    <div 
                        ref="dropdownButtonRef"
                        @click="toggleDropdown" 
                        class="language-button flex items-center justify-between px-3 cursor-pointer rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <span class="font-medium">{{ selectedLanguage }}</span>
                        <svg class="w-3 h-3 ml-1 transform transition-transform duration-300" :class="{'rotate-180': isOpen}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <transition name="dropdown">
                        <!-- Burada ref əlavə et -->
                        <ul 
                        v-if="isOpen" 
                        ref="dropdownRef"
                        class="language-dropdown absolute mt-1 w-full bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden"
                        >
                        <li 
                            v-for="language in filteredLanguages" 
                            :key="language" 
                            @click="selectLanguage(language)" 
                            class="px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                        >
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
                          <div class="relative z-10">
                              <img src="@/assets/icons/phone.svg" alt="phone" class="icon" />
                          </div>
                          <!-- Nömrəni iki hissəyə bölürük və hər birinə ayrı animasiya tətbiq edirik -->
                          <div class="pl-1 font-bold z-10 flex">
                              <span class="emergency-blue">*01</span><span class="emergency-red">01</span>
                          </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const languages = ref(['Az', 'Ru', 'Eng']);
const selectedLanguage = ref('Az');
const isOpen = ref(false);

// Referanslar əlavə edildi
const dropdownRef = ref(null);
const dropdownButtonRef = ref(null);

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


// Klik xaricində bağlanma funksiyası
const handleClickOutside = (event) => {
  // Əvvəlcə dropdown açıq olmalıdır
  if (!isOpen.value) return;
  
  // Sonra yoxlayırıq ki, klik dropdown və ya onun açma düyməsinin xaricindədir
  if (dropdownRef.value && dropdownButtonRef.value) {
    // Event target dropdown və ya düymə elementlərinin üstündədirsə, bağlama
    const clickedOnDropdown = dropdownRef.value.contains(event.target);
    const clickedOnButton = dropdownButtonRef.value.contains(event.target);
    
    if (!clickedOnDropdown && !clickedOnButton) {
      console.log('Kənara klik edildi, dropdown bağlanır');
      isOpen.value = false;
    }
  }
};

// Komponent yükləndikdə event listener əlavə et
onMounted(() => {
  // Qısa gecikmə ilə qeydiyyat et ki, refs-lər tam hazır olsun
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
    console.log('Click listener əlavə edildi');
  }, 100);
});

// Komponent silinəcək olduqda event listener'ı təmizlə
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  console.log('Click listener silindi');
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
/* Göy rəngli birinci hissə üçün animasiya */
.emergency-blue {
    color: #ffffff;
    text-shadow: 0 0 5px rgba(30, 144, 255, 0.8);
    animation: pulseBlueText 1s infinite;
}

/* Qırmızı rəngli ikinci hissə üçün animasiya */
.emergency-red {
    color: #ffffff;
    text-shadow: 0 0 5px rgba(255, 51, 51, 0.8);
    animation: pulseRedText 1s infinite;
    animation-delay: 0.5s; /* Qırmızı animasiyanı göydən yarım saniyə sonra başlat */
}

/* Göy mətn üçün yanıb-sönmə animasiyası */
@keyframes pulseBlueText {
    0%, 100% {
        color: #ffffff;
        text-shadow: 0 0 5px rgba(30, 144, 255, 0.8);
    }
    50% {
        color: #1e90ff;
        text-shadow: 0 0 15px rgba(30, 144, 255, 1), 0 0 20px rgba(30, 144, 255, 0.7);
    }
}

/* Qırmızı mətn üçün yanıb-sönmə animasiyası */
@keyframes pulseRedText {
    0%, 100% {
        color: #ffffff;
        text-shadow: 0 0 5px rgba(255, 51, 51, 0.8);
    }
    50% {
        color: #ff3333;
        text-shadow: 0 0 15px rgba(255, 51, 51, 1), 0 0 20px rgba(255, 51, 51, 0.7);
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
