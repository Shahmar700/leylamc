import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



import { createHead } from '@vueuse/head'


import AOS from 'aos'
import 'aos/dist/aos.css'

import HeaderTop from './components/HeaderTop.vue'
import HeaderMain from './components/HeaderMain.vue'
import FooterMain from './components/FooterMain.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const app = createApp(App)
app.component('header-top', HeaderTop)
app.component('header-main', HeaderMain)
app.component('footer-main', FooterMain)
app.component('breadcrumb', Breadcrumb)

const head = createHead()

app.use(router)
app.use(head)
app.mount('#app')

// AOS-u başlat
AOS.init()