<template>
    <div class="container mt-16 text-main-text">
        <div class="flex flex-col md:flex-row md:items-start items-center sm:justify-between">
            <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
                <h1 class="text-3xl font-semibold mb-10">{{ department.name }}</h1>
                <div class="text-base sm:text-lg" v-html="formattedText"></div>
                <br>
                <!-- <p class="text-base sm:text-lg">Şöbənin müalicə və müayinə istiqamətləri:</p>
                <br>
                <ul class="ml-7 list-disc">
                    <li class="font-normal text-base sm:text-lg">
                        Aşağı ətraf venalarının varikoz xəstəliyi
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Tromboflebit, Posttromboflebitik sindrom
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Diabetik ayaq sindromu
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Xroniki yaralar (diabetik yaralar, arterial və venoz yaralar, yataq yaralar və s.)
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Endovenoz lazer abblasiya, skleroterapiya, miniflebektomiya
                    </li>
                    <li class="font-normal text-base sm:text-lg">
                        Podiatriya və s.
                    </li>
                </ul> -->
                <br>
                <div>
                    <a target="_blank" href="https://www.instagram.com/p/CeaarG4IOul/?utm_source=ig_web_copy_link"></a>
                </div>
            </div>
            <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
                <SideBanners class="mb-4" /> 
                <SideBanners2 class="mb-4" /> 
            </div>
        </div>
        <Maps class="mt-14 sm:mt-24"/>
    </div>
</template>

<script setup>
import SideBanners from "@/components/SideBanners.vue";
import SideBanners2 from "@/components/SideBanners2.vue";
import Maps from "@/components/Maps.vue";

import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const department = ref({})

const fetchDepartment = async () => {
  try {
    console.log(route.params.slug) // slug dəyərini konsolda göstərmək
    const response = await axios.get(`http://192.168.2.242:8000/api/leyla/v1/department-list/${route.params.slug}/`)
    department.value = response.data
  } catch (error) {
    console.error('API çağırışında xəta:', error)
  }
}

onMounted(() => {
  fetchDepartment()
  startPolling()
})

onUnmounted(() => {
  stopPolling()
})

let pollingInterval

const startPolling = () => {
  pollingInterval = setInterval(fetchDepartment, 5000) // Hər 5 saniyədən bir API çağırışı
}

const stopPolling = () => {
  clearInterval(pollingInterval)
}

// route.params.slug dəyərinin dəyişməsini izləyirik
watch(() => route.params.slug, () => {
  fetchDepartment()
})

// Computed xüsusiyyəti ilə mətnin formatlanması
const formattedText = computed(() => {
  return department.value.text ? department.value.text.replace(/\n/g, "<br>") : ''
})
</script>

<style scoped>
ul{
    list-style: disc;
}
ul {
  list-style: disc;
}

.text-base {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>