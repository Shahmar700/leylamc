<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <!-- Satisfaction survey  -->
            <div>
                <div class="lg:w-3/4" data-aos="zoom-out-right">
               <div v-for="(question, index) in questions" :key="index" class="question flex flex-col mb-10 text-sm lg:text-lg">
                <p class="mb-2 lg:mr-7">{{ question.text }}</p>
                <div class="flex gap-2 md:first-letter:gap-5">
                    <label v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :for="'numInput-' + index + '-' + rating" :class="{ selected: question.selectedRating === rating }" class="mr-2 md:mr-5 text-sm md:text-base">
                    <div class="flex flex-col justify-center screen-500:flex-row">
                        <input class="cursor-pointer" :id="'numInput-' + index + '-' + rating" type="radio" :name="'question-' + index" :value="rating" v-model="question.selectedRating" />
                        <span class="ml-0 screen-375:ml-1 md:ml-2 mt-2 screen-500:mt-0 text-white bg-[#6bb42b7a] font-semibold py-1 px-[10px] rounded-full">{{ rating }}</span>
                    </div>
                    </label>
                </div>
               </div>
                    <div class="flex flex-col w-full lg:w-2/3 text-base lg:text-lg">
                        <label for="message" class="mb-2 !text-main-text">Təklif və iradınız</label>
                        <textarea id="message" rows="4" class="border border-gray-300 p-2 rounded-md" required></textarea>
                    </div>
                </div>
                <div class="mt-10">
                <form action="" class="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-5 text-base lg:text-lg">
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2 !text-main-text">Ad</label>
                        <input type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="name" class="mb-2 !text-main-text">Soyad</label>
                        <input type="text" id="name" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="flex flex-col w-full lg:w-1/2">
                        <label for="phone" class="mb-2 !text-main-text">Əlaqə Nömrəsi</label>
                        <input type="number" id="phone" class="border border-gray-300 p-2 rounded-md" required>
                    </div>
                    <div class="w-full">
                        <button type="submit" class="greenBtn mt-4">Göndər</button>
                    </div>
                </form>
         </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
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
import Maps from "@/components/Maps.vue";
import { ref, onMounted } from "vue";
import { useHead } from '@vueuse/head';

const questions =  ref([
  { text: "*0101 Çağrı Mərkəzinin operativliyi", selectedRating: null },
  { text: "Qeydiyyat şöbəsinin peşəkarlığı", selectedRating: null },
  { text: "Biomaterial qəbulu (Qanalma) şöbəsinin fəaliyyəti", selectedRating: null },
  { text: "Müayinə nəticələrinin təyin olunan vaxta uyğun olaraq təhvil verilməsi", selectedRating: null },
  { text: "Xidmətlərin qiyməti", selectedRating: null },
  { text: '"Ünvanda Xidmət" əməkdaşlarının operativliyi', selectedRating: null },
  { text: '"E-nəticə" xidməti daxilində nəticələrinin elektron emailinizə göndərilməsi/saytdan əldə olunması', selectedRating: null },
])


</script>

<style scoped>
p{
    text-align: justify;
}


label {
  cursor: pointer;
  color: lightgray;
  user-select: none;
}

label.selected {
  color: black;
}
.selected span{
    background-color: lightgreen;
    color: #fff;
}
label.selected span{
    background-color: #6ab42b;
}
/* input[type="radio"] {
  display: none;
} */
</style>