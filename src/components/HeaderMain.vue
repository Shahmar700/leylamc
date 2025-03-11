<template>
  <div :class="headerClass" class="sticky top-0 z-[99999] shadow-sm">
      <div class="container flex justify-between py-3 sm:py-4 lg:py-3 xl:py-5 sm:items-center font-bold text-lg sm:text-2xl">
          
          <router-link to="/" id="headerLogo" class="flex items-center">
            <svg class="absolute screen-500:static w-[80px] h-[30px] md:w-[130px] md:h-[45px] lg:w-[210px] lg:h-[60px]" viewBox="0 0 251 93" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M33.3704 74.1032C37.857 67.7021 52.1825 65.4213 48.8904 60.3937C35.5929 66.9363 10.6627 66.9696 8.01569 92.9028C22.9655 81.8153 51.1004 99.6119 75.9599 53.7845C63.27 63.2904 41.3489 77.5826 33.3663 74.1032" fill="#6E6E6E"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M37.986 35.0223C56.9729 12.9097 94.7803 33.345 66.1251 59.27C78.4779 37.4612 64.5061 22.8485 37.986 35.0223Z" fill="#6BB52B"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8799 70.037C-25.0596 5.07274 29.3374 -7.94592 38.5271 29.5868C25.8206 14.92 -7.27961 8.24 13.8799 70.037Z" fill="#EF7C00"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M25.2504 0.615262C26.8236 -0.749865 29.916 0.232361 32.1468 2.81278C34.3818 5.39321 34.9145 8.5896 33.3371 9.95473C31.7597 11.3199 28.6716 10.3376 26.4407 7.75721C24.2058 5.17678 23.673 1.98039 25.2504 0.615262Z" fill="#EF7C00"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M45.6399 23.9015C45.1488 22.3907 46.7511 20.5137 49.2233 19.7104C51.6956 18.903 54.097 19.4773 54.5881 20.984C55.0792 22.4948 53.4769 24.3718 51.0047 25.1751C48.5325 25.9825 46.131 25.4081 45.6399 23.9015Z" fill="#6BB52B"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6529 63.4985C-3.13845 19.1985 26.5905 15.1572 34.0571 33.5656C27.0234 25.4414 11.5283 30.7646 15.6529 63.4985Z" fill="#6BB52B"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M40.3708 40.6076C53.6725 25.1168 80.1552 39.434 60.082 57.5968C68.7347 42.3182 58.9499 32.0798 40.3708 40.6076Z" fill="#EF7C00"/>
              <path d="M245.935 80.9205H248.607V74.9107C248.607 74.3072 248.565 71.9973 251 72.0139V69.421C249.935 69.3211 248.948 69.8247 248.428 70.7861H248.386V69.7831H245.935V80.9205ZM235.422 74.1657C235.863 72.838 237.049 71.9557 238.518 71.9557C239.883 71.9557 241.07 72.7589 241.452 74.1657H235.422ZM244.187 76.538C244.245 76.1343 244.245 75.7555 244.245 75.3518C244.245 72.0347 241.914 69.421 238.514 69.421C234.494 69.421 232.583 72.8796 232.583 75.4309C232.583 77.9822 234.473 81.2826 238.472 81.2826C238.997 81.2826 242.393 81.241 243.879 77.7033H240.861C240.2 78.5066 239.234 78.748 238.368 78.748C236.941 78.748 235.796 77.9031 235.455 76.538H244.179H244.187ZM227.439 80.9205H230.111V72.1554H231.718V69.7831H230.111V66.0457H227.439V69.7831H226.132V72.1554H227.439V80.9205ZM214.974 80.9205H217.646V75.0105C217.646 74.0242 217.787 71.9557 219.956 71.9557C221 71.9557 222.187 72.5175 222.187 75.0105V80.9205H224.859V74.4071C224.859 71.2689 223.09 69.421 220.518 69.421C218.707 69.421 217.825 70.345 217.463 70.807H217.421V69.7831H214.97V80.9205H214.974ZM204.461 74.1657C204.902 72.838 206.088 71.9557 207.557 71.9557C208.922 71.9557 210.109 72.7589 210.492 74.1657H204.461ZM213.226 76.538C213.284 76.1343 213.284 75.7555 213.284 75.3518C213.284 72.0347 210.953 69.421 207.553 69.421C203.533 69.421 201.622 72.8796 201.622 75.4309C201.622 77.9822 203.512 81.2826 207.512 81.2826C208.036 81.2826 211.432 81.241 212.918 77.7033H209.9C209.239 78.5066 208.273 78.748 207.407 78.748C205.98 78.748 204.835 77.9031 204.494 76.538H213.218H213.226ZM200.623 70.3075C199.375 67.4524 196.803 65.7834 193.727 65.7834C188.462 65.7834 185.948 70.166 185.948 73.4831C185.948 76.8002 188.483 81.2826 193.69 81.2826C196.928 81.2826 199.317 79.493 200.544 76.8793H197.348C196.424 78.0862 195.096 78.6065 193.769 78.6065C190.914 78.6065 188.704 76.2758 188.704 73.4789C188.704 70.8652 190.776 68.4513 193.748 68.4513C195.517 68.4513 196.745 69.3544 197.485 70.2992H200.619L200.623 70.3075ZM176.921 80.9205H179.593V66.0457H176.921V80.9205ZM169.042 71.9557C170.974 71.9557 172.239 73.404 172.239 75.331C172.239 77.3621 170.953 78.748 169.042 78.748C167.132 78.748 165.767 77.3412 165.767 75.4517C165.767 73.4415 167.115 71.9557 169.042 71.9557ZM174.753 69.7831H172.301V71.3522H172.26C171.456 70.0869 170.208 69.421 168.622 69.421C165.546 69.421 163.095 71.9557 163.095 75.4517C163.095 78.9478 165.709 81.2826 168.543 81.2826C169.126 81.2826 170.974 81.1827 172.264 79.4139H172.305V80.9205H174.757V69.7831H174.753ZM158.954 77.2996C158.209 78.6648 156.781 78.748 156.319 78.748C154.267 78.748 152.981 77.2205 152.981 75.3102C152.981 73.5206 154.188 71.9515 156.319 71.9515C157.485 71.9515 158.429 72.4551 158.954 73.4789H161.971C161.226 71.065 159.179 69.4168 156.361 69.4168C152.199 69.4168 150.309 72.6757 150.309 75.2686C150.309 78.0446 152.278 81.2785 156.461 81.2785C159.237 81.2785 161.143 79.6511 161.967 77.2996H158.95H158.954ZM145.968 68.4929H148.64V66.0415H145.968V68.4929ZM145.968 80.9164H148.64V69.7789H145.968V80.9164ZM138.027 71.9515C139.896 71.9515 141.282 73.379 141.282 75.3477C141.282 77.3163 139.917 78.7438 138.027 78.7438C136.138 78.7438 134.81 77.2747 134.81 75.3477C134.81 73.3166 136.217 71.9515 138.027 71.9515ZM143.796 66.0415H141.124V70.9276H141.082C140.762 70.5447 139.775 69.421 137.724 69.421C134.669 69.421 132.134 71.8932 132.134 75.3934C132.134 78.8937 134.669 81.2826 137.64 81.2826C139.43 81.2826 140.595 80.3961 141.299 79.4139H141.34V80.9205H143.792V66.0457L143.796 66.0415ZM122.187 74.1615C122.628 72.8338 123.814 71.9515 125.283 71.9515C126.649 71.9515 127.835 72.7548 128.218 74.1615H122.187ZM130.952 76.5338C131.01 76.1301 131.01 75.7514 131.01 75.3477C131.01 72.0306 128.68 69.4168 125.279 69.4168C121.259 69.4168 119.348 72.8754 119.348 75.4267C119.348 77.978 121.238 81.2785 125.238 81.2785C125.762 81.2785 129.158 81.2369 130.644 77.6992H127.627C126.965 78.5024 125.999 78.7438 125.134 78.7438C123.706 78.7438 122.561 77.899 122.22 76.5338H130.944H130.952ZM102.022 80.9164H104.777V69.7789L108.536 80.9164H110.866L114.625 69.7789V80.9164H117.38V66.0415H113.642L109.701 77.4203L105.76 66.0415H102.022V80.9164Z" fill="#6E6E6E"/>
              <path d="M228.497 48.9698V31.6393C228.497 27.8311 229.512 24.797 231.543 22.5371C233.578 20.2771 236.284 19.1451 239.655 19.1451C243.026 19.1451 245.735 20.2771 247.787 22.5413C249.835 24.8054 250.855 27.8394 250.855 31.6352V48.9656H243.596V38.1029H237.054V31.2231H243.596V30.8735C243.596 29.4668 243.238 28.3514 242.527 27.519C241.815 26.6866 240.858 26.2745 239.655 26.2745C238.381 26.2745 237.411 26.6991 236.746 27.5523C236.08 28.4055 235.755 29.6416 235.755 31.2647V48.9656H228.497V48.9698ZM198.534 19.6487H205.835V39.1184C205.835 40.1173 206.093 40.8664 206.605 41.3783C207.116 41.8819 207.878 42.1317 208.889 42.1317H214.558V48.9698H208.765C205.302 48.9698 202.73 48.1665 201.052 46.5642C199.375 44.9618 198.534 42.4938 198.534 39.16V19.6487ZM169.842 19.6487V28.8425C169.842 30.0453 170.1 30.9692 170.616 31.606C171.132 32.2511 171.873 32.5716 172.826 32.5716C173.779 32.5716 174.491 32.2511 174.999 31.606C175.502 30.9692 175.752 30.0453 175.752 28.8425V19.6487H183.01V28.0434C183.01 30.782 182.465 33.0502 181.366 34.8399C180.276 36.6295 178.628 37.953 176.422 38.8104V48.9698H169.163V38.7688C166.953 37.8948 165.309 36.5796 164.236 34.8107C163.158 33.0419 162.621 30.782 162.621 28.0434V19.6487H169.838H169.842ZM147.267 48.9698H146.514C143.963 48.9698 141.724 48.7658 139.817 48.3538C137.907 47.9501 136.292 47.3258 134.985 46.4934C132.838 45.1075 131.181 43.3678 130.016 41.2493C128.846 39.1309 128.268 36.8085 128.268 34.2863C128.268 31.7642 128.846 29.4501 130.008 27.3442C131.169 25.2382 132.825 23.5068 134.985 22.1209C136.292 21.2885 137.907 20.6684 139.817 20.2605C141.728 19.8485 143.963 19.6445 146.514 19.6445H147.267V26.312C147.08 26.2995 146.876 26.2829 146.668 26.2787C146.452 26.2704 146.152 26.2704 145.752 26.2704C143.189 26.2704 141.153 26.6491 139.634 27.3941C138.115 28.1474 137.033 29.3086 136.384 30.8818H147.267V37.4245H136.234C136.725 39.0393 137.778 40.2546 139.389 41.0662C140.995 41.8819 143.172 42.2898 145.898 42.2898C146.268 42.2898 146.547 42.2898 146.743 42.2815C146.947 42.2732 147.122 42.269 147.267 42.269V48.9615V48.9698ZM99.055 19.6487H106.355V39.1184C106.355 40.1173 106.613 40.8664 107.125 41.3783C107.637 41.8819 108.399 42.1317 109.41 42.1317H115.079V48.9698H109.285C105.827 48.9698 103.25 48.1665 101.573 46.5642C99.8957 44.9618 99.055 42.4938 99.055 39.16V19.6487Z" fill="#6BB52B"/>
              <path d="M250.962 56.9809H101.206V58.6582H250.962V56.9809Z" fill="#6BB52B"/>
            </svg>
          </router-link>  

          
          <!-- Main Header Links  -->
          <ul class="flex items-center space-x-3 md:space-x-5 lg:space-x-8 text-main-text">
              <li class="">
                  <router-link to="/" class="hidden md:inline-block text-base sm:text-lg lg:text-xl">Əsas Səhifə</router-link>
              </li>
              <!-- ---------- ABOUT US ----------  -->
              <li class="headerParent relative group">
                <router-link to="/about" active-class="router-link-active" class="hidden md:inline-block  cursor-pointer text-base sm:text-lg lg:text-xl">Haqqımızda</router-link>
                  <ul class="headerDropdown absolute top-8 -right-0 lg:-right-32 z-30 bg-white min-w-[320px] py-3 xl:py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible border border-t-primary">
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'our-history'}" class="block w-full h-full">Tariximiz</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'our-vision'}" class="block w-full h-full">Vizyonumuz</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'our-mission'}" class="block w-full h-full">Missiyamız</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'our-relations'}" class="block w-full h-full">Beynəlxalq əlaqələrimiz</router-link>
                    </li>
                      <!-- MEDİADA BİZ  -->
                        <li class="mb-2 px-6 mediaParent">
                          <router-link to="/our-in-media" class="cursor-pointer flex w-full h-full justify-between">
                            <span>Mediada Biz</span>
                            <span><i class="mediaFa fa-solid fa-angle-down"></i></span>
                          </router-link>
                          <ul class="mediaDropdown shadow-xl rounded-xl border border-t-primary hidden md:block">
                            <li class="mb-2 px-6">
                              <router-link :to="{name: 'all-news'}" class="block w-full h-full">Xəbərlər</router-link>
                            </li>
                            <li class="mb-2 px-6">
                              <router-link :to="{ name: 'kiv-writes' }" class="block w-full h-full">KİV Yazanlar</router-link>
                            </li>
                            <!-- GALLERY  -->
                            <li class="mb-2 px-6 galleryParent">
                              <router-link to="/about/our-in-media/gallery" class="cursor-pointer flex w-full h-full justify-between">
                                <span>Qalereya</span>
                                <span><i class="galleryFa fa-solid fa-angle-down"></i></span>
                              </router-link>
                              <ul class="galleryDropdown shadow-xl rounded-xl border border-t-primary">
                                <li class="mb-2 px-6">
                                  <router-link :to="{name: 'photos-view'}" class="block w-full h-full">Foto</router-link>
                                </li>
                                <li class="mb-2 px-6">
                                  <router-link :to="{name: 'videos-view'}" class="block w-full h-full">Video</router-link>
                                </li>
                              </ul>
                            </li>
                            <!-- GALLERY END  -->
                            <li class="mb-2 px-6">
                              <router-link :to="{ name: 'health-kiosk' }" class="block w-full h-full">Sağlıq köşkü</router-link>
                            </li>
                            <li class="mb-2 px-6">
                              <router-link :to="{ name: 'vacancies' }" class="block w-full h-full">Vakansiya</router-link>
                            </li>
                            <li class="mb-2 px-6">
                              <router-link :to="{ name: 'latest-updates' }" class="block w-full h-full">Son yeniliklər</router-link>
                            </li>
                          </ul>
                        </li>
                        <!-- MEDİADA BİZ END-->
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'director-office'}" class="block w-full h-full">Direktor Kabineti</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'satisfaction-form'}" class="block w-full h-full">Məmnunluq anketi</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'quality-policy'}" class="block w-full h-full">Keyfiyyət siyasəti</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'quality-control'}" class="block w-full h-full">Keyfiyyətə nəzarət</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'certificates'}" class="block w-full h-full">Sertifikatlar</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'training-center'}" class="block w-full h-full">Təlim Mərkəzi</router-link>
                    </li>
                  </ul>
              </li>
              <!-- ---------- ABOUT US END ----------  -->
              <li class="headerParent relative group">
                  <router-link to="/doctors" active-class="router-link-active" class="hidden md:inline-block  cursor-pointer text-base sm:text-lg lg:text-xl">Həkimlər</router-link>
                  <ul class="headerDropdown absolute top-8 -right-52 z-30 bg-white min-w-[320px] py-3 xl:py-5 shadow-xl rounded-xl  opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible border border-t-primary">
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'doctors'}"  class="block w-full h-full">Həkimlərimiz</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link :to="{name: 'doctor-articles'}" class="block w-full h-full">Həkim məqalələri</router-link>
                    </li>
                  </ul>
              </li>

               <!-- Department  -->
               <li class="headerParent relative group">
                  <div :class="{'text-primary': isDepartmentRoute}" class="hidden lg:inline-block cursor-pointer text-base sm:text-lg lg:text-xl">Bölmələr</div>
                  <ul class="headerDropdown absolute top-8 -right-14 xl:-right-40 z-30 bg-white py-3 xl:py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible border border-t-primary">
                    <!-- Surgery -->
                    <li class="mb-2 px-6 surgeryParent relative hidden lg:block">
                      <div :class="{'text-primary': isSurgeryRoute}" class="flex w-full h-full cursor-pointer">
                        <span>Cərrahiyyə</span>
                        <span><i class="surgeryFa fa-solid fa-angle-down"></i></span>
                      </div>
                      <!-- Dinamik Cərrahiyə -->
                        <ul class="surgeryDropdown shadow-xl rounded-xl z-10">
                          <li v-for="surgery in surgeries" :key="surgery.id" class="mb-2 px-6">
                            <router-link 
                              :to="{
                                name: 'surgery-detail', 
                                params: { slug: surgery.slug }
                              }" 
                              class="block">
                              {{ surgery.name }}
                            </router-link>
                          </li>
                        </ul>
                    </li>
                    <!-- Surgery END -->
                    <!-- DEPARTMENT (HEADER)  -->
                    <ul class="max-h-[620px] overflow-y-scroll overflow-x-hidden">
                      <li v-for="department in departments" :key="department.id" class="mb-2 px-6">
                        <router-link 
                          :to="{
                            name: 'department-detail', 
                            params: { slug: department.slug }
                          }" 
                          :class="{'text-primary': isDepartmentRoute && route.params.slug === department.slug}"
                          class="block w-full h-full">
                          {{ department.name }}
                        </router-link>
                      </li>
                    </ul>
                    <!-- DEPARTMENT (HEADER) END  -->
                  </ul>
              </li>
              <!-- -------------------------- Department END -->
               
              <!-- MEDİCAL SERVİCES  -->
              <li class="headerParent relative group">
                  <div :class="{'text-primary': isMedServiceRoute}" class="hidden xl:inline-block text-base sm:text-lg lg:text-xl cursor-pointer">Tibbi xidmətlər</div>
                  <!-- MEDİCAL SERVİCES (HEADER)  -->
                  <ul class="headerDropdown absolute top-8 -right-44 z-30 bg-white min-w-[320px] py-3 xl:py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible border border-t-primary">
                  <li v-if="medicalServices.length === 0" class="mb-2 px-6">
                    <span class="block w-full h-full">Yüklənir...</span>
                  </li>
                  <li v-for="service in medicalServices" :key="service.id" class="mb-2 px-6">
                    <router-link 
                      :to="{
                        name: 'medical-service-detail',  // Burada name-i dəqiq yazırıq
                        params: { slug: service.slug }
                      }"
                      class="block w-full h-full">
                      {{ service.title }}
                    </router-link>
                  </li>
                  <!-- Peyvəndlər linki statik olaraq qalsın -->
                  <li class="mb-2 px-6">
                    <a href="#" @click.prevent="openPdf" class="block w-full h-full">Peyvəndlər</a>
                  </li>
                </ul>
              </li>
          </ul>

          <!-- SEARCH AND BURGER MENU  -->
          <div class="flex items-center">
              
              <div class="search-box ">
                  <button class="btn-search z-[9999]">
                      <img :src="searchIcon" alt="search" class="w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] cursor-pointer ml-7 md:mb-1 lg:mb-0 lg:ml-0">
                  </button>
                  <input type="text" class="input-search" placeholder="Type to Search...">
              </div>
              
              <div class="headerParent relative group flex items-center justify-center">
                <!-- Burger icon-ə @click əlavə olunur -->
                <div @click="toggleBurger" class="ml-3 w-[30px] h-[20px] md:w-[40px] md:h-[30px] lg:w-[42px] lg:h-[32px] flex flex-col justify-around items-end cursor-pointer">
                  <span class="w-10/12 h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                  <span class="w-full h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                  <span class="w-10/12 h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                </div>
                <!-- Bu dropdown yalnız böyük ekranlarda göstərilsin -->
                <ul class="headerDropdown hidden md:block absolute top-8 right-0 z-30 bg-white min-w-[300px] py-3 xl:py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible cursor-pointer text-main-text">
                  <!-- Əvvəlki mobil elementlər (burger içindəki) -->
                  <li class="lg:hidden mb-2 px-6">
                    <router-link :to="{name: 'doctors'}" class="sm:hidden text-base sm:text-lg lg:text-xl">Həkimlər</router-link>
                  </li>
                  <li class="lg:hidden mb-2 px-6">
                    <a href="#" class="w-full h-full text-base sm:text-lg lg:text-xl">Bölmələr</a>
                  </li>
                  <!-- <li class="xl:hidden mb-2 px-6">
                    <a href="#" class="w-full h-full text-base sm:text-lg lg:text-xl">Check Up</a>
                  </li> -->
                  <li class="mb-2 px-6">
                    <router-link to="/medical-services" class="block xl:hidden w-full h-full text-base sm:text-lg lg:text-xl">Tibbi Xidmətlər</router-link>
                  </li>
                  <li class="mb-2 px-6">
                    <router-link :to="{name: 'check-up'}" class="block w-full h-full text-base sm:text-lg lg:text-xl">Check Up</router-link>
                  </li>
                  <!-- Digər elementlər (Onlayn Xidmətlər, Sağlıq köşkü, Vakansiyalar, Aksiyalar, Əlaqə) -->
                  <li class="mb-2 px-6 onlineParent relative">
                    <router-link to="/online-services" class="block w-full h-full text-base sm:text-lg lg:text-xl">
                      <span>Onlayn Xidmətlər</span>
                      <span><i class="onlineFa fa-solid fa-angle-down"></i></span>
                    </router-link>
                    <ul class="onlineDropdown shadow-xl rounded-xl z-10">
                        <li class="mb-2 px-6">
                          <router-link :to="{name: 'e-appointment'}" class="block w-full h-full">E-növbə</router-link>
                        </li>
                        <li class="mb-2 px-6">
                          <router-link :to="{name: 'e-result'}" class="block w-full h-full">E-nəticə</router-link>
                        </li>
                        <li class="mb-2 px-6">
                          <router-link :to="{name: 'e-payment'}" class="block w-full h-full" @click.native="openInNewTab">E-ödəmə</router-link>
                        </li>
                        <!-- <li class="mb-2 px-6">
                          <router-link :to="{name: 'e-commerce'}" class="block w-full h-full">E-satış</router-link>
                        </li> -->
                        <li class="mb-2 px-6">
                          <router-link :to="{name: 'e-consultation'}" class="block w-full h-full">E-məsləhət</router-link>
                        </li>
                    </ul>
                  </li>
                  <li class="mb-2 px-6">
                    <router-link :to="{name: 'health-kiosk'}" class="block w-full h-full text-base sm:text-lg lg:text-xl">Sağlıq köşkü</router-link>
                  </li>
                  <li class="mb-2 px-6">
                    <router-link :to="{name: 'vacancies'}" class="block w-full h-full text-base sm:text-lg lg:text-xl">Vakansiyalar</router-link>
                  </li>
                  <li class="mb-2 px-6">
                    <router-link :to="{name: 'offers'}" class="block w-full h-full text-base sm:text-lg lg:text-xl">Aksiyalar</router-link>
                  </li>
                  <li class="mb-2 px-6">
                    <router-link :to="{name: 'contact'}" class="block w-full h-full text-base sm:text-lg lg:text-xl">Əlaqə</router-link>
                  </li>
                </ul>
              </div>
              <!-- İstifadəçi girişi / profil ikonu -->
                <div class="relative ml-3">
                  <!-- İstifadəçi daxil olmadıqda login ikonu -->
                  <template v-if="!authStore.isLoggedIn">
                     <i class="fa-solid fa-right-to-bracket text-2xl md:text-3xl text-[#ef7c00] cursor-pointer" @click="toggleModal"></i>
                  </template>
                  
                  <!-- İstifadəçi daxil olduqda profil ikonu və dropdown -->
                  <template v-else>
                    <div class="headerParent relative group">
                      <div class="flex items-center cursor-pointer">
                        <i class="fa-solid fa-user-circle text-2xl md:text-3xl text-[#ef7c00]"></i>
                        <span class="ml-2 hidden md:inline text-sm text-primary">{{ authStore.username }}</span>
                      </div>
                      
                      <ul class="headerDropdown absolute top-8 right-0 z-30 bg-white w-48 py-3 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:!top-9 group-hover:opacity-100 group-hover:visible border border-t-primary">
                        <li class="mb-2 px-4">
                          <router-link to="/profile" class="block py-1 w-full">
                            <i class="fa-solid fa-user mr-2"></i> Profilim
                          </router-link>
                        </li>
                        <li class="px-4">
                          <button @click="logout" class="flex w-full items-center py-1 text-red-500">
                            <i class="fa-solid fa-sign-out-alt mr-2"></i> Çıxış
                          </button>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
          </div>
      </div>

      <!-- ------------------------------- BURGER MENU START ------------------------------- -->
      <transition name="fade">
        <div 
          v-if="burgerOpen" 
          class="fixed inset-0 bg-white/70 backdrop-blur-md z-[9999] overflow-auto md:w-1/3 md:left-auto md:right-0 md:inset-y-auto md:top-10 md:h-full"
        >
          <div class="container mx-auto py-3 xl:py-5 px-4">
            <div class="flex justify-between items-center mb-5">
              <router-link to="/" class="text-2xl font-bold" @click="toggleBurger">
                <!-- LOGO və ya Başlıq -->
              </router-link>
              <button @click="toggleBurger" class="text-2xl font-bold">&times;</button>
            </div>
            <ul class="space-y-4">
              <!-- Əsas Səhifə -->
              <li class="md:hidden">
                <router-link to="/" class="block text-lg sm:text-xl" @click="toggleBurger">Əsas Səhifə</router-link>
              </li>
              <!-- Haqqımızda -->
              <li class="md:hidden">
                <div @click="toggleBurgerDropdown('haqqimizda_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                  <span>Haqqımızda</span>
                  <i class="fa-solid fa-angle-down transition-transform duration-300" 
                    :class="{'rotate-180': burgerDropdowns.haqqimizda_mobile}"></i>
                </div>
                <ul v-if="burgerDropdowns.haqqimizda_mobile" class="mt-2 pl-4 space-y-2">
                  <li>
                    <router-link :to="{name: 'our-history'}" class="block text-base" @click="toggleBurger">Tariximiz</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'our-vision'}" class="block text-base" @click="toggleBurger">Vizyonumuz</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'our-mission'}" class="block text-base" @click="toggleBurger">Missiyamız</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'our-relations'}" class="block text-base" @click="toggleBurger">Beynəlxalq əlaqələrimiz</router-link>
                  </li>
                  <!-- Mediada Biz -->
                  <li>
                    <div @click="toggleBurgerDropdown('mediadaBiz_mobile')" class="flex justify-between items-center cursor-pointer text-xl">
                      <span>Mediada Biz</span>
                      <i class="fa-solid fa-angle-down transition-transform duration-300" 
                        :class="{'rotate-180': burgerDropdowns.mediadaBiz_mobile}"></i>
                    </div>
                    <ul v-if="burgerDropdowns.mediadaBiz_mobile" class="mt-2 pl-4 space-y-2">
                      <li>
                        <router-link :to="{name: 'all-news'}" class="block text-base" @click="toggleBurger">Xəbərlər</router-link>
                      </li>
                      <li>
                        <router-link :to="{name: 'kiv-writes'}" class="block text-base" @click="toggleBurger">KİV Yazanlar</router-link>
                      </li>
                      <!-- Qalereya -->
                      <li>
                        <div @click="toggleBurgerDropdown('gallery_mobile')" class="flex justify-between items-center cursor-pointer text-xl">
                          <span>Qalereya</span>
                          <i class="fa-solid fa-angle-down transition-transform duration-300" 
                            :class="{'rotate-180': burgerDropdowns.gallery_mobile}"></i>
                        </div>
                        <ul v-if="burgerDropdowns.gallery_mobile" class="mt-2 pl-4 space-y-2">
                          <li>
                            <router-link :to="{name: 'photos-view'}" class="block text-base" @click="toggleBurger">Foto</router-link>
                          </li>
                          <li>
                            <router-link :to="{name: 'videos-view'}" class="block text-base" @click="toggleBurger">Video</router-link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <router-link :to="{name: 'health-kiosk'}" class="block text-lg sm:text-xl" @click="toggleBurger">Sağlıq köşkü</router-link>
                      </li>
                      <li>
                        <router-link :to="{name: 'vacancies'}" class="block text-lg sm:text-xl" @click="toggleBurger">Vakansiyalar</router-link>
                      </li>
                      <li>
                        <router-link :to="{name: 'latest-updates'}" class="block text-lg sm:text-xl" @click="toggleBurger">Son yeniliklər</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link :to="{name: 'director-office'}" class="block text-base" @click="toggleBurger">Direktor Kabineti</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'satisfaction-form'}" class="block text-base" @click="toggleBurger">Məmnunluq anketi</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'quality-policy'}" class="block text-base" @click="toggleBurger">Keyfiyyət siyasəti</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'quality-control'}" class="block text-base" @click="toggleBurger">Keyfiyyətə nəzarət</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'certificates'}" class="block text-base" @click="toggleBurger">Sertifikatlar</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'training-center'}" class="block text-lg sm:text-xl" @click="toggleBurger">Təlim Mərkəzi</router-link>
                  </li>
                </ul>
              </li>
              <!-- Həkimlər -->
              <li class="md:hidden">
                <div @click="toggleBurgerDropdown('hekimler_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                  <span>Həkimlər</span>
                  <i class="fa-solid fa-angle-down transition-transform duration-300" 
                    :class="{'rotate-180': burgerDropdowns.hekimler_mobile}"></i>
                </div>
                <ul v-if="burgerDropdowns.hekimler_mobile" class="mt-2 pl-4 space-y-2">
                  <li>
                    <router-link :to="{name: 'doctors'}" class="block text-lg sm:text-xl" @click="toggleBurger">Həkimlərimiz</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'doctor-articles'}" class="block text-lg sm:text-xl" @click="toggleBurger">Həkim məqalələri</router-link>
                  </li>
                </ul>
              </li>
              <!-- Bölmələr (SIDEBAR) -->
              <li class="lg:hidden">
                <div :class="{'text-primary': isDepartmentRoute}" @click="toggleBurgerDropdown('bolmeler_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                  <span>Bölmələr</span>
                  <i class="fa-solid fa-angle-down transition-transform duration-300" 
                    :class="{'rotate-180': burgerDropdowns.bolmeler_mobile}"></i>
                </div>
                <ul v-if="burgerDropdowns.bolmeler_mobile" class="mt-2 pl-4 space-y-2">
                  <!-- "Cərrahiyyə" dropdownu -->
                  <li class="md:hidden">
                    <div :class="{'text-primary': isSurgeryRoute}" @click="toggleBurgerDropdown('cerrahiyye_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                      <span>Cərrahiyyə</span>
                      <i class="fa-solid fa-angle-down transition-transform duration-300" 
                        :class="{'rotate-180': burgerDropdowns.cerrahiyye_mobile}"></i>
                    </div>
                    <!-- Dinamik Cərrahiyə -->
                    <ul v-if="burgerDropdowns.cerrahiyye_mobile" class="mt-2 pl-4 space-y-2">
                      <li v-for="surgery in surgeries" :key="surgery.id" class="mb-2 px-6">
                        <router-link 
                          @click="toggleBurger"
                          :to="{
                            name: 'surgery-detail', 
                            params: { slug: surgery.slug }
                          }" 
                          class="block text-lg sm:text-xl">
                          {{ surgery.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <!-- "Cərrahiyyə" END -->
                  <!-- Department (SİDEBAR)  -->
                  <ul class="max-h-[620px] overflow-y-scroll overflow-x-hidden">
                    <li v-for="department in departments" :key="department.id" class="mb-2 px-6">
                      <router-link 
                        :to="{
                          name: 'department-detail', 
                          params: { slug: department.slug }
                        }" 
                        class="block text-lg sm:text-xl" 
                        @click="toggleBurger">
                        {{ department.name }}
                      </router-link>
                    </li>
                  </ul>
                  <!-- Department (Sidebar) END -->
                </ul>
              </li>
              <!-- CheckUP (SİDEBAR)  -->
              <!-- <li>
                <router-link :to="{ name: 'health-kiosk' }" @click="toggleBurger" class="block w-full h-full text-lg sm:text-xl">Sağlıq köşkü</router-link>
              </li> -->
              <li>
                <router-link :to="{name: 'check-up'}" @click="toggleBurger" class="block w-full h-full text-lg sm:text-xl">Check Up</router-link>
              </li>
              <!-- CheckUP (SİDEBAR) END -->
              <!-- Tibbi xidmətlər (SIDEBAR) -->
              <li class="lg:hidden">
                <div :class="{'text-primary': isMedServiceRoute}"  @click="toggleBurgerDropdown('tibbiXidmetler_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                  <span>Tibbi xidmətlər</span>
                  <i class="fa-solid fa-angle-down transition-transform duration-300" 
                    :class="{'rotate-180': burgerDropdowns.tibbiXidmetler_mobile}"></i>
                </div>
                <ul v-if="burgerDropdowns.tibbiXidmetler_mobile" class="mt-2 pl-4 space-y-2">
                  <!-- Yüklənmə göstəricisi -->
                  <li v-if="medicalServices.length === 0" class="mb-2">
                    <span class="block text-lg sm:text-xl">Yüklənir...</span>
                  </li>
                  <!-- Dinamik tibbi xidmətlər -->
                  <li v-for="service in medicalServices" :key="service.id" class="mb-2">
                    <router-link 
                      :to="{
                        name: 'medical-service-detail',
                        params: { slug: service.slug }
                      }"
                      class="block text-lg sm:text-xl" 
                      @click="toggleBurger">
                      {{ service.title }}
                    </router-link>
                  </li>
                  <!-- Peyvəndlər linki statik olaraq qalsın -->
                  <li class="mb-2">
                    <a href="#" @click.prevent="openPdf; toggleBurger" class="block text-lg sm:text-xl">Peyvəndlər</a>
                  </li>
                </ul>
              </li>

              <!-- Onlayn Xidmətlər SİDEBAR  -->
            <li>
              <div @click="toggleBurgerDropdown('onlaynXidmetler_mobile')" class="flex justify-between items-center cursor-pointer text-lg sm:text-xl">
                  <span>Onlayn Xidmətlər</span>
                  <i class="fa-solid fa-angle-down transition-transform duration-300" 
                    :class="{'rotate-180': burgerDropdowns.onlaynXidmetler_mobile}"></i>
              </div>
                  <ul v-if="burgerDropdowns.onlaynXidmetler_mobile" class="mt-2 pl-4 space-y-2">
                      <li @click="toggleBurger">
                        <router-link :to="{name: 'e-appointment'}" class="block w-full h-full text-lg sm:text-xl">E-növbə</router-link>
                      </li>
                      <li @click="toggleBurger">
                        <router-link :to="{name: 'e-result'}" class="block w-full h-full text-lg sm:text-xl">E-nəticə</router-link>
                      </li>
                      <li @click="toggleBurger">
                        <router-link :to="{name: 'e-payment'}" class="block w-full h-full text-lg sm:text-xl" @click.native="openInNewTab">E-ödəmə</router-link>
                      </li>
                      <!-- <li @click="toggleBurger">
                        <router-link :to="{name: 'e-commerce'}" class="block w-full h-full text-lg sm:text-xl">E-satış</router-link>
                      </li> -->
                      <li @click="toggleBurger">
                        <router-link :to="{name: 'e-consultation'}" class="block w-full h-full text-lg sm:text-xl">E-məsləhət</router-link>
                      </li>
                  </ul>
                </li>
                <!-- Sağlıq Köşkü SİDEBAR  -->
                <li>
                  <router-link :to="{ name: 'health-kiosk' }" @click="toggleBurger" class="block w-full h-full text-lg sm:text-xl">Sağlıq köşkü</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'vacancies'}" @click="toggleBurger" class="block w-full h-full text-lg sm:text-xl">Vakansiyalar</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'offers'}" @click="toggleBurger" class="block w-full h-full text-lg sm:text-xl">Aksiyalar</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'contact'}" @click="toggleBurger" class="block w-full h-full text-lg  sm:text-xl">Əlaqə</router-link>
                </li>
            </ul>
          </div>
        </div>
</transition>
  </div>

  
</template>

<script setup>
import { ref, computed, inject, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { useAuthStore } from '@/store/auth'; // AuthService-i AuthStore ilə əvəz edirik

const router = useRouter();
const route = useRoute();
const toggleModal = inject('toggleModal'); // Inject the toggleModal function
const authStore = useAuthStore(); // Auth store instance'ı yaradırıq

const isDepartmentRoute = computed(() => {
  return route.name === 'departments' || 
         route.name === 'department-detail' || 
         route.path.includes('/departments');
});
const isSurgeryRoute = computed(() => {
  return route.name === 'surgery' || 
         route.name === 'surgery-detail' || 
         route.path.includes('/surgery');
});
const isMedServiceRoute = computed(() => {
  return route.name === 'medical-services' || 
         route.name === 'medical-servicesl' || 
         route.path.includes('/medical-services');
});
const departments = ref([]); // Yeni ref
const surgeries = ref([]);
const isLoggedIn = computed(() => authStore.isLoggedIn);
const username = computed(() => authStore.username);

const headerClass = computed(() => {
return route.path === '/' ? 'header-white' : 'header-gray';
});

// Komponenti yükləyərkən və route dəyişdiyində auth statusunu yoxlayırıq
const checkAuthStatus = () => {
  authStore.checkAuthState(); // Store-dakı vəziyyəti yeniləyirik
};

// İstifadəçi çıxış funksiyası
const logout = () => {
  authStore.logout();
  router.push('/');
};

// Search Icons
import searchIconHome from '../assets/icons/search.svg';
import searchIconOther from '../assets/icons/search2.svg';

const searchIcon = computed(() => {
return route.path === '/' ? searchIconHome : searchIconOther;
});

// OPEN VACCINES PDF
const openPdf = () => {
window.open('/src/assets/peyvend/peyvend-kitabcasi.pdf', '_blank');
};


// API çağırışı
const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/department-list/');
    departments.value = response.data.results.filter(department => department.category !== 'Surgery');
  } catch (error) {
    console.error("Department API çağırışında xəta:", error);
  }
};

const fetchSurgeries = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/surgeondep-list/');
    surgeries.value = response.data.results;
    console.log('Cerahiye' + surgeries )
  } catch (error) {
    console.error("HeaderView API çağırışında xəta:", error);
  }
};

// Tibbi xidmətlər üçün API-dən məlumatları alın
const medicalServices = ref([]);

const fetchMedicalServices = async () => {
  try {
    const response = await axios.get('http://bytexerp.online/api/leyla/v1/medical-service-list/');
    medicalServices.value = response.data.results;
  } catch (error) {
    console.error('Tibbi xidmət məlumatları yükləmə xətası:', error);
  }
};


onMounted(() => {
fetchDepartments();
fetchSurgeries();  // Cərrahiyə məlumatlarını yükləyir
fetchMedicalServices(); // Yeni əlavə edilən funksiya
checkAuthStatus(); // Auth statusunu yoxlayırıq
});

// Route dəyişdiyində auth statusunu yeniləyirik
watch(() => route.path, () => {
  checkAuthStatus();
});

// Burger menyu üçün reaktiv dəyər və toggle funksiyası
const burgerOpen = ref(false)
const toggleBurger = () => {
  burgerOpen.value = !burgerOpen.value
}
const burgerDropdowns = reactive({
  haqqimizda_mobile: false,
  hekimler_mobile: false,
  cerrahiyye_mobile: false,
  bolmeler_mobile: false,
  tibbiXidmetler_mobile: false,
  onlaynXidmetler_mobile: false,
  // digər açarlar...
})
const toggleBurgerDropdown = (key) => {
  burgerDropdowns[key] = !burgerDropdowns[key]
}


</script>

<style scoped>

/* Bu stil yalnız 768px və yuxarı ekranlarda hover effektlərini aktiv edir */
@media (min-width: 768px) {
  .headerDropdown {
    /* Mövcud hover stiliniz burda qalsın */
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
  }
  .headerParent:hover .headerDropdown {
    opacity: 1;
    visibility: visible;
    top: 11px;
  }
}

a {
position: relative;
color: inherit;
text-decoration: none;
}

a::after {
content: '';
position: absolute;
left: 0;
bottom: -2px; /* Adjust as needed */
width: 0;
height: 2px; /* Adjust as needed */
background-color: #6bb52b;
transition: width 0.2s;
}

a:hover::after {
width: 100%;
}
#headerLogo:hover::after {
width: 0 !important;
}
/* .headerDropdown li:hover a::after {
width: 100%;
} */
.search-box {
width: fit-content;
height: fit-content;
position: relative;
}

.input-search {
height: 45px;
width: 0px;
/* border: 1px solid rgba(255, 255, 255, 0.5); */
padding: 12px;
font-size: 18px;
letter-spacing: 2px;
outline: none;
border-radius: 20px;
transition: all 0.5s ease-in-out;
/* background-color: #22a6b3; */
background-color: transparent;
/* background-color: #fff; */
padding-right: 40px;
color: #000;
position: absolute;
top: -5px;
right: 0;
z-index: 999;
}

.input-search::placeholder {
color: #505050;
font-size: 18px;
letter-spacing: 2px;
font-weight: 400;
}

.btn-search {
width: 36px;
height: 36px;
display: flex;
justify-content: center;
align-items: center;
border-style: none;
font-size: 20px;
font-weight: bold;
outline: none;
cursor: pointer;
/* border-radius: 50%; */
/* position: absolute; */
right: 0px;
/* color: #ffffff; */
/* background-color: #22a6b3; */
pointer-events: painted;
background: none;
padding: 0;
z-index: 9999;
}

.btn-search:focus ~ .input-search,
.input-search:focus {
width: 300px;
border-radius: 20px;
background-color: #fff;
border-bottom-right-radius: 10px;
border-bottom: 1px solid lightgray;
transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
position: absolute;
top: -5px;
right: 0;
}

@media screen and (max-width: 500px) {
  .btn-search:focus ~ .input-search,
  .input-search:focus {
    width: 180px;
  }
  .input-search::placeholder {
  font-size: 14px;
  letter-spacing: 1px;
  }
  .input-search {
    right: -10px !important;
  }
}
@media screen and (min-width: 500px) {
  .btn-search:focus ~ .input-search,
  .input-search:focus {
    width: 250px;
  }
  .input-search::placeholder {
  font-size: 14px;
  letter-spacing: 1px;
  }
  .input-search {
    right: -10px !important;
  }
}

.input-search:focus ~ .btn-search {
background-color: green;
color: white;
}

.mediaParent, .galleryParent, .surgeryParent, .onlineParent{
position: relative;
}

.mediaDropdown, .galleryDropdown, .surgeryDropdown{
position: absolute;
right: -100px;
top: 0px;
background-color: #fff;
padding: 10px;
visibility: hidden;
opacity: 0;
transition: 0.3s;
border-radius: 15px;
}
.surgeryDropdown{
right: -200px;
}
.mediaParent:hover .mediaDropdown{
right: -200px;
top: 0px;
visibility: visible;
opacity: 1;
}

.galleryParent:hover .galleryDropdown{
right: -140px;
top: 0px;
visibility: visible;
opacity: 1;
}
.surgeryParent:hover .surgeryDropdown{
right: -170px;
top: 0px;
visibility: visible;
opacity: 1;
}

.onlineDropdown{
position: absolute;
left: -200px;
top: 0px;
background-color: #fff;
padding: 10px;
visibility: hidden;
opacity: 0;
transition: 0.3s;
border-radius: 15px;
}

.onlineParent:hover .onlineDropdown{
left: -160px;
top: 0px;
visibility: visible;
opacity: 1;
}

.fa-solid.fa-angle-down{
transition: 0.4s;
}
.mediaParent:hover .mediaFa,
.galleryParent:hover .galleryFa,
.surgeryParent:hover .surgeryFa,
.onlineParent:hover .onlineFa
{
transform: rotate(-90deg);
}


/* UL SCROLL BAR DESİGN  */

/* Custom scrollbar for the specific UL element */
.headerDropdown ul::-webkit-scrollbar {
width: 4px; /* Scrollbar width */
height: 8px; /* Scrollbar height */
}

.headerDropdown ul::-webkit-scrollbar-thumb {
background-color: #6ab42b; /* Scrollbar color */
border-radius: 10px; /* Scrollbar thumb rounded corners */
}

/* Move scrollbar to the left side */
.headerDropdown ul {
direction: rtl; /* Right-to-left direction to move scrollbar to the left */
}

.headerDropdown ul > * {
direction: ltr; /* Left-to-right direction for child elements */
}

ul li{
font-size: 22px;
}

@media (max-width: 1100px) {
  .headerDropdown li{
    font-size: 18px;
    margin-bottom: 1px;
  }
  .mediaDropdown, .galleryDropdown, .surgeryDropdown{
    position: absolute;
    right: -105px;
  }
  .mediaParent:hover .mediaDropdown{
    right: -90px;
    top: 0px;
    visibility: visible;
    opacity: 1;
  }
  .galleryParent:hover .galleryDropdown{
    right: -100px;
    top: 0px;
    visibility: visible;
    opacity: 1;
  }
}


</style>