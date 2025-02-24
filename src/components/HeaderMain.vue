<template>
    <div :class="headerClass">
        <div class="container w-full flex justify-between py-3 sm:py-4 lg:py-6 xl:py-8 items-center font-bold text-lg sm:text-2xl">
            
            <router-link to="/" id="headerLogo">
              <svg class="absolute sm:relative w-[80px] h-[30px] md:w-[130px] md:h-[45px] lg:w-[210px] lg:h-[60px]" viewBox="0 0 251 93" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <router-link to="/" class="hidden md:inline-block text-base sm:text-lg lg:text-xl xl:text-2xl">Əsas Səhifə</router-link>
                </li>
                <!-- ---------- ABOUT US ----------  -->
                <li class="headerParent relative group">
                  <router-link to="/about" active-class="router-link-active" class="hidden md:inline-block  cursor-pointer text-base sm:text-lg lg:text-xl xl:text-2xl">Haqqımızda</router-link>
                    <ul class="headerDropdown absolute top-8 -right-5 z-30 bg-white min-w-[320px] py-5 shadow-xl rounded-xl  opacity-0 invisible transition-all duration-500 group-hover:top-11 group-hover:opacity-100 group-hover:visible border border-t-primary">
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
                            <ul class="mediaDropdown shadow-xl rounded-xl border border-t-primary">
                              <li class="mb-2 px-6">
                                <router-link :to="{name: 'news'}" class="block w-full h-full">Xəbərlər</router-link>
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
                    <router-link to="/doctors" active-class="router-link-active" class="hidden md:inline-block  cursor-pointer text-base sm:text-lg lg:text-xl xl:text-2xl">Həkimlər</router-link>
                    <ul class="headerDropdown absolute top-8 -right-5 z-30 bg-white min-w-[320px] py-5 shadow-xl rounded-xl  opacity-0 invisible transition-all duration-500 group-hover:top-11 group-hover:opacity-100 group-hover:visible border border-t-primary">
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'doctors'}"  class="block w-full h-full">Həkimlərimiz</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'doctor-articles'}" class="block w-full h-full">Həkim məqalələri</router-link>
                      </li>
                    </ul>
                </li>
                <li class="headerParent relative group">
                    <router-link to="/departments" class="hidden lg:inline-block cursor-pointer text-base sm:text-lg lg:text-xl xl:text-2xl">Bölmələr</router-link>
                    <ul class="headerDropdown absolute top-8 -right-5 z-30 bg-white py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:top-11 group-hover:opacity-100 group-hover:visible border border-t-primary">
                      <!-- Surgery -->
                      <li class="mb-2 px-6 surgeryParent relative">
                        <router-link to="/departments/surgery" class="block w-full h-full">
                          <span>Cərrahiyyə</span>
                          <span><i class="surgeryFa fa-solid fa-angle-down"></i></span>
                        </router-link>
                        <ul class="surgeryDropdown shadow-xl rounded-xl z-10">
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'general-surgery'}" class="block w-full h-full">Ümumi cərrahiyyə</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'plastic-surgery'}" class="block w-full h-full">Plastik cərrahiyyə</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'pediatric-surgery'}" class="block w-full h-full">Uşaq cərrahiyyəsi</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'thoracic-surgery'}" class="block w-full h-full">Torakal cərrahiyyə</router-link>
                          </li>
                        </ul>
                      </li>
                      <!-- Surgery END -->
                      <ul class="max-h-[620px] overflow-y-scroll overflow-x-hidden">
                            <li class="mb-2 px-6">
                            <router-link :to="{name: 'phlebology'}" class="block w-full h-full">Flebologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'gynecology'}" class="block w-full h-full">Ginekologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'laboratory'}" class="block w-full h-full">Laboratoriya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'traumatology'}" class="block w-full h-full">Travmotologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'ophthalmology'}" class="block w-full h-full">Oftalmologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'otorhinolaryngology'}" class="block w-full h-full">Otorinolarinqologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'neonatology-and-pediatrics'}" class="block w-full h-full">Neonatologiya və Pediatriya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'gastroenterology'}" class="block w-full h-full">Qastroenterologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'instrumental-diagnostics'}" class="block w-full h-full">İnstrumental diaqnostika</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'therapy'}" class="block w-full h-full">Terapiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'uro-andrology'}" class="block w-full h-full">Uro-andrologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'cardiology'}" class="block w-full h-full">Kardiologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'neurology'}" class="block w-full h-full">Nevrologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'endocrinology-and-dietology'}" class="block w-full h-full">Endokrinologiya və dietologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'allergology'}" class="block w-full h-full">Allerqologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'dermatocosmetology'}" class="block w-full h-full">Dermatokosmetologiya</router-link>
                          </li>
                          <li class="mb-2 px-6">
                            <router-link :to="{name: 'pulmonology'}" class="block w-full h-full">Pulmonologiya</router-link>
                          </li>
                      </ul>
                      
                    </ul>
                </li>
                <li class="headerParent relative group">
                    <router-link to="/medical-services" class="hidden xl:inline-block text-base sm:text-lg lg:text-xl xl:text-2xl">Tibbi xidmətlər</router-link>
                    <!-- MEDİCAL SERVİCES  -->
                    <ul class="headerDropdown absolute top-8 -right-5 z-30 bg-white min-w-[320px] py-5 shadow-xl rounded-xl  opacity-0 invisible transition-all duration-500 group-hover:top-11 group-hover:opacity-100 group-hover:visible border border-t-primary">
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'ambulance'}"  class="block w-full h-full">Təcili Tibbi yardım</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'home-examination'}" class="block w-full h-full">Ünvanda müayinə</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'children-center'}" class="block w-full h-full">Uşaq sağlamlıq mərkəzi</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'male-female-infertility'}" class="block w-full h-full">Kişi və qadın sonsuzluğu mərkəzi</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'corporate-cooperation'}" class="block w-full h-full">Korporativ əməkdaşlıq</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'medical-insurance'}" class="block w-full h-full">Tibbi sığorta</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'industrial-medicine'}" class="block w-full h-full">Sənaye təbabəti</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'outpatient-examination'}" class="block w-full h-full">Ambulator müayinə</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'check-up'}" class="block w-full h-full">Check-up</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <router-link :to="{name: 'actions'}" class="block w-full h-full">Aksiyalar</router-link>
                      </li>
                      <li class="mb-2 px-6">
                        <a href="#" @click.prevent="openPdf" class="block w-full h-full">Peyvəndlər</a>
                      </li>
                    </ul>
                </li>
            </ul>

            <!-- SEARCH AND BURGER MENU  -->
            <div class="flex">
                <!-- <div class="search-container">
                    <img src="../assets/icons/search.svg" alt="search" class="cursor-pointer" style="width: 37px; height: 37px;" @click="toggleSearch">
                    <input v-show="showSearch" type="text" class="search-input" :class="{ 'expanded': showSearch }">
                </div> -->
                <div class="search-box ">
                    <button class="btn-search">
                        <img :src="searchIcon" alt="search" class="w-[25px] h-[25px] md:w-[27px] md:h-[27px] lg:w-[32px] lg:h-[32px] cursor-pointer ml-7 md:mb-1 lg:mb-0 lg:ml-0">
                    </button>
                    <input type="text" class="input-search" placeholder="Type to Search...">
                </div>
                <div class="headerParent relative group">
                  <div class="ml-3 w-[30px] h-[20px] md:w-[40px] md:h-[30px] lg:w-[45px] lg:h-[35px] flex flex-col justify-around items-end cursor-pointer">
                    <span class="w-10/12 h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                    <span class="w-full h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                    <span class="w-10/12 h-[4px] md:h-[5px] lg:h-[6px] rounded-md bg-primary"></span>
                  </div>
                  <ul class="headerDropdown absolute top-8 right-0 z-30 bg-white min-w-[300px] py-5 shadow-xl rounded-xl opacity-0 invisible transition-all duration-500 group-hover:top-11 group-hover:opacity-100 group-hover:visible cursor-pointer text-main-text">
                    <li class="lg:hidden mb-2 px-6">
                      <router-link :to="{name: 'doctors'}" class="sm:hidden text-base sm:text-lg lg:text-xl xl:text-2xl">Həkimlər</router-link>
                    </li>
                    <li class="lg:hidden mb-2 px-6">
                      <a href="#" class="w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Bölmələr</a>
                    </li>
                    <li class="xl:hidden mb-2 px-6">
                      <a href="#" class="w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Check Up</a>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block xl:hidden w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Tibbi Xidmətlər</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Onlayn Xidmətlər</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Sağlıq köşkü</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Vakansiyalar</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Aksiyalar</router-link>
                    </li>
                    <li class="mb-2 px-6">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Əlaqə</router-link>
                    </li>
                    <!-- <li class=" px-8">
                      <router-link to="/linkk" class="block w-full h-full text-base sm:text-lg lg:text-xl xl:text-2xl">Çıxış</router-link>
                    </li> -->
                  </ul>
                </div>
                <i class="fa-solid fa-right-to-bracket text-3xl text-[#ef7c00] ml-3 cursor-pointer" @click="toggleModal"></i>
                <LoginModal v-if="showModal" @close="toggleModal" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import LoginModal from './LoginModal.vue';

const route = useRoute();
const showModal = ref(false)

const headerClass = computed(() => {
  return route.path === '/' ? 'header-white' : 'header-gray';
});

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

const toggleModal = () => {
    showModal.value = !showModal.value
}
</script>

<style scoped>
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
  font-weight: 100;
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
  position: absolute;
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

.input-search:focus ~ .btn-search {
  background-color: green;
  color: white;
}

.mediaParent, .galleryParent, .surgeryParent{
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

.fa-solid.fa-angle-down{
  transition: 0.4s;
}
.mediaParent:hover .mediaFa,
.galleryParent:hover .galleryFa,
.surgeryParent:hover .surgeryFa
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
</style>