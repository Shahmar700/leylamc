<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div class="w-3/4" data-aos="zoom-out-right">
                <!-- Directors  -->
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="zoom-out-left">
                    <div class="flex flex-col items-center">
                        <img src="@/assets/images/elnur-vahabov.jpeg" alt="" class="mb-3 rounded-2xl">
                        <h5 class="font-extrabold text-main-text text-lg md:text-xl">Direktor</h5>
                        <h5 class="font-extrabold text-main-text text-lg md:text-xl">Dr.Elnur Vahabov</h5>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="@/assets/images/sevda-ceferova.jpeg" alt="" class="mb-3 rounded-2xl">
                        <h5 class="font-extrabold text-main-text text-lg md:text-xl">Tibbi Direktor</h5>
                        <h5 class="font-extrabold text-main-text text-lg md:text-xl">MD., PhD., MBA., MSc HM., UN Physician</h5>
                        <h5 class="font-extrabold text-main-text text-lg md:text-xl">Dr.Sevda Cəfərova</h5>
                    </div>
                    <div></div>
                 </div>
                <h1 class="text-main-text text-2xl my-4">Leyla Medical Center-in Direktor Kabineti ilə əlaqə forması</h1>
                <p class="text-main-text text-base">Biz daima inkişafdayıq. Bizim üçün sizin rahatlığınız və bizdən razılığınız çox vacibdir. Sizi narahat edən bir şey olduğu halda biz onu mütləq aradan qaldırmağa hazırıq. Öz təklifinizi və ya şikayətinizi aşağıdakı formanı doldurmağla Leyla Medical Center-in direktoruna məruzə edə bilərsiniz.</p>
                <div class="mt-5">
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(012) 490 21 31</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(012) 490 18 58</span>
                    </div>
                    <div class="flex items-center mb-2">
                        <i class="fa-solid fa-phone mr-2"></i>
                        <span>(+994 50) 225 73 30</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-location-dot mr-2"></i>
                        <span>Xətai rayonu, Yusif Səfərov küç.19</span>
                    </div>
                </div>

                <form action="" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2">Ad və Soyad</label>
                        <input type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="phone" class="mb-2">Əlaqə Nömrəsi</label>
                        <input type="number" id="phone" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="email" class="mb-2">Elektron Ünvan</label>
                        <input type="email" id="email" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="message" class="mb-2">Təklif və Şikayət</label>
                        <textarea id="message" rows="4" class="border border-gray-300 p-2 rounded-md" required></textarea>
                    </div>
                    <div class="w-full">
                        <button type="submit" class="greenBtn mt-4">Göndər</button>
                    </div>
                </form>
            </div>
            <div class="w-[310px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>

        <Maps class="mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";

import phoneIcon from "@/assets/icons/phone-black.svg"
</script>

<style scoped>
p{
    text-align: justify;
}

</style>