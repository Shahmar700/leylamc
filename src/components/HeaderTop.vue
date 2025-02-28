<template>
    <div class="bg-primary">
        <header class="container w-full py-2 sm:py-2 flex flex-wrap justify-between">
        <!-- left side  -->
        <div class="flex items-start sm:flex-row sm:items-center text-xs md:text-sm lg:text-base">
            
            <div class="flex mb-2 sm:mb-0">
                <!-- lang  -->
                <div class="pr-2 select-none relative z-[999999] text-sm">
                    <div class="relative inline-block w-[45px] md:w-[55px]">
                        <div @click="toggleDropdown" class="appearance-none px-2 cursor-pointer outline-0 rounded-md bg-white border border-gray-300">
                            {{ selectedLanguage }}
                        </div>
                        <ul v-if="isOpen" class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                            <li v-for="language in filteredLanguages" :key="language" @click="selectLanguage(language)" class="px-2 cursor-pointer hover:bg-gray-200">
                                {{ language }}
                            </li>
                        </ul>
                    </div>
                <img src="@/assets/icons/arrowdown.svg" alt="arrow" class="arrowIcon absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" style="pointer-events: none;" />
                </div>
                <!-- lang END -->
                
                <!-- Phone  -->
                <span class="text-white">|</span>
                <div class=" flex items-center px-2 text-sm">
                    <div class="mr-1">
                    <a href="tel:*0101" class="flex items-center">
                        <div class="relative">
                            <img src="@/assets/icons/phone.svg" alt="phone" class="icon" />
                            <!-- <div class="absolute inset-0 rounded-full border-2 border-white animate-pulse p-[10px] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"></div> -->
                        </div>
                        <span class="text-white pl-1">*0101</span>
                    </a>
                    </div>
                </div>
                <span class="text-white">|</span>
                
            </div>

            <div class="flex text-sm">
                <div class="flex items-center px-2">
                    <a href="tel:+994502257330" class="flex items-center">
                        <img src="@/assets/icons/mob.svg" alt="mob" class="icon" />
                        <span class="text-white pl-1">+994 50 225 73 30</span>
                    </a>
                </div>
                <span class="text-white">|</span>
                <div class="flex items-center px-2">
                    <a href="mailto:info@leylamc.az" class="flex items-center">
                    <img src="@/assets/icons/mail.svg" alt="mail" class="icon" />
                    <span class="text-white pl-1">info@leylamc.az</span>
                    </a>
                </div>
            </div>
            
        </div>
        <!-- right side  -->
        <div class="socialsIcons flex space-x-2 sm:space-x-3 lg:space-x-4 w-full md:w-auto justify-end mt-1 sm:mt-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/icons/fb.svg" alt="Facebook" class="w-[15px] h-[15px] md:w-[16px] md:h-[21px] " />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/icons/xcom.svg" alt="Facebook" class="w-[15px] h-[15px] md:w-[16px] md:h-[21px] " />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/icons/yt.svg" alt="Facebook" class="w-[15px] h-[15px] md:w-[16px] md:h-[21px] " />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/icons/ig.svg" alt="Instagram" class="w-[15px] h-[15px] md:w-[16px] md:h-[21px] " />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src="@/assets/icons/wp.svg" alt="WhatsApp" class="w-[15px] h-[15px] md:w-[16px] md:h-[21px] " />
            </a>
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

</style>
