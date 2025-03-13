<template>
    <div class="bg-[#f8f8f8] mt-44">
        <div class="container py-10">
            <div class="flex flex-col md:flex-row justify-between">
                <div class="w-full md:w-[50%] 2xl:w-[40%]">
                    <h1 class="text-primary text-center screen-400:text-start text-lg screen-400:text-xl sm:text-2xl mb-5">Yeniliklərdən ilk sən xəbərdar ol!</h1>
                    <label class="flex flex-col screen-400:flex-row w-full">
                        <input type="text" class="w-full screen-400:w-[60%] xl:w-[70%] rounded-xl sm:rounded-2xl outline-none p-2 sm:p-3 mb-4 screen-400:mb-0">
                        <button class="greenBtn !rounded-lg screen-400:ml-3">Abunə ol</button>
                    </label>
                    <div class="mt-7 flex items-center">
                      <p class="text-main-text flex items-center">
                          <img src="@/assets/icons/phone-black.svg" alt="phone" class="icon w-5 h-5" />
                          <a href="tel:*0101" class="ml-1 font-bold text-lg sm:text-xl text-main-text hover:text-primary transition-colors">*0101</a>
                      </p>
                      <p class="text-main-text flex items-center ml-10">
                          <img src="@/assets/icons/mail-black.svg" alt="phone" class="icon w-5 h-5" />
                          <a href="mailto:info@leylamc.az" class="ml-1 font-bold text-lg sm:text-xl text-main-text hover:text-primary transition-colors">info@leylamc.az</a>
                      </p>
                  </div>
                </div>
                <!-- Right Side  -->
                <div class="w-full mt-7 md:w-[45%] md:mt-0 text-center lg:text-start">
                    <h1 class="text-main-text text-xl sm:text-2xl mb-2 md:mb-5">Bizimlə əlaqə:</h1>
                    <div class="flex flex-col screen-500px:flex-row md:flex-col lg:flex-row justify-between">
                        <div>
                            <p class="text-main-text flex items-center justify-center">
                                <img src="@/assets/icons/phone-black.svg" alt="phone" class="icon w-5 h-5" />
                                <a href="tel:+994124901858" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 12 490 18 58</a>
                            </p>
                            <p class="text-main-text flex items-center justify-center">
                                <img src="@/assets/icons/phone-black.svg" alt="phone" class="icon w-5 h-5" />
                                <a href="tel:+994124905105" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 12 490 51 05</a>
                            </p>
                            <p class="text-main-text flex items-center justify-center">
                                <img src="@/assets/icons/phone-black.svg" alt="phone" class="icon w-5 h-5" />
                                <a href="tel:+994124905106" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 12 490 51 06</a>
                            </p>
                            <p class="text-main-text flex items-center justify-center">
                                <img src="@/assets/icons/phone-black.svg" alt="phone" class="icon w-5 h-5" />
                                <a href="tel:+994124902131" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 12 490 21 31</a>
                            </p>
                        </div>
                        <div>
                            <p class="text-main-text flex items-center justify-center">
                                <i class="fa fa-mobile-alt text-[#B7AEAE] text-xl" aria-hidden="true"></i>
                                <a href="tel:+994502254454" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 50 225 44 54</a>
                            </p>
                            <p class="text-main-text flex items-center justify-center">
                                <i class="fa fa-mobile-alt text-[#B7AEAE] text-xl" aria-hidden="true"></i>
                                <a href="tel:+994502257330" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-primary transition-colors">+994 50 225 73 30</a>
                            </p>
                            <p class="text-main-text flex items-center justify-center">
                                    <i class="fa-brands fa-whatsapp text-[#B7AEAE] text-xl"></i>
                                    <a href="https://wa.me/994554550111" class="ml-2 text-lg sm:text-xl text-main-text mb-1 hover:text-[#25d366] transition-colors">+994 55 455 01 11</a>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="flex flex-wrap justify-between">
                <div class="w-full mt-6 text-center md:text-left">
                <p class="text-main-text text-lg md:text-2xl mb-2 md:mb-3 lg:mb-4">Bizi sosial mediada izləyin:</p>
                <div class="flex justify-center space-x-3 md:justify-start">
                    <a href="https://www.facebook.com/LeylaMedicalCenter/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f text-[#B7AEAE] text-2xl duration-200 hover:text-[#1877F2]"></i></a>
                    <a href="https://t.me/referansmg" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-telegram text-[#B7AEAE] text-2xl duration-200 hover:text-[#24A1DE]"></i></a>
                    <a href="https://www.youtube.com/channel/UCgdhd5HG-RDd58_Dmch5NJw" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube text-[#B7AEAE] text-2xl duration-200 hover:text-[#ff0000]"></i></a>
                    <a href="https://www.instagram.com/leylamedicalcenter/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram text-[#B7AEAE] text-2xl duration-200 instagram-gradient"></i></a>
                    <a href="https://wa.me/994554550111" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp text-[#B7AEAE] text-2xl duration-200 whatsapp-gradient"></i></a>
                </div>
            </div>
            <hr class="custom-hr">
            <div class="flex justify-between items-center pt-10 pb-1 flex-col flex-auto md:flex-row">
                <img src="@/assets/images/footer-logo.svg" alt="" class="w-[270px] sm:w-[300px] h-[30px] sm:h-[34px] lg:w-[356px] lg:h-[42px]">
                <p class="text-main-text mt-6 md:mt-0 text-sm md:text-xl">Bütün Hüquqlar Qorunur 2025 © <span class="text-yellow-400">RMG</span> Development</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, provide } from 'vue';

// Footer-in strukturlu məlumatları
const contactInfo = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Leyla Medical Center",
  "url": "https://leylamc.com",
  "logo": "https://leylamc.com/images/footer-logo.svg",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+994-12-490-18-58",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-12-490-51-05",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-12-490-51-06",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-12-490-21-31",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-50-225-44-54",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-50-225-73-30",
      "contactType": "customer service"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+994-55-455-01-11",
      "contactType": "customer service",
      "contactOption": "WhatsApp"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/leylamc",
    "https://twitter.com/leylamc",
    "https://www.youtube.com/leylamc",
    "https://www.instagram.com/leylamc",
    "https://wa.me/994554550111"
  ]
};

// Bu məlumatları parent komponentlərə provide etmək
const provideContactInfo = inject('provideContactInfo', null);
if (provideContactInfo) {
  provideContactInfo(contactInfo);
}
// Bu məlumatları global provide etmək
provide('contactInfo', contactInfo);
</script>

<style scoped>
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
.custom-hr {
  margin-top: 40px;
  border: 0;
  height: 3px; /* Qalınlığı artırmaq üçün */
  background-color: #D9D9D9; /* Rəngini dəyişmək üçün */
}
</style>