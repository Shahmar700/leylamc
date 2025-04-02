import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoctorsView from '@/views/DoctorsView.vue'
import DrView from '@/views/DrView.vue'
import OurVisionView from '@/views/OurVisionView.vue'
import OurHistoryView from '@/views/OurHistoryView.vue'
import OurMissionView from '@/views/OurMissionView.vue'
import OurRelations from '@/views/OurRelations.vue'
import KivWritesView from '@/views/KivWritesView.vue'
import PhotosView from '@/views/PhotosView.vue'
import VideosView from '@/views/VideosView.vue'
import HealthKioskView from '@/views/HealthKioskView.vue'
import VacanciesView from '@/views/VacanciesView.vue'
import LatestUpdatesView from '@/views/LatestUpdatesView.vue'
import DirectorOfficeView from '@/views/DirectorOfficeView.vue'
import SatisfactionFormView from '@/views/SatisfactionFormView.vue'
import QualityPolicyView from '@/views/QualityPolicyView.vue'
import QualityControlView from '@/views/QualityControlView.vue'
import CertificatesView from '@/views/CertificatesView.vue'
import TrainingCenterView from '@/views/TrainingCenterView.vue'
import GeneralSurgeryView from '@/views/departments/surgery/GeneralSurgeryView.vue'
import PlasticSurgeryView from '@/views/departments/surgery/PlasticSurgeryView.vue'
import PediatricSurgeryView from '@/views/departments/surgery/PediatricSurgeryView.vue'
import ThoracicSurgeryView from '@/views/departments/surgery/ThoracicSurgeryView.vue'
import PhlebologyView from '@/views/departments/PhlebologyView.vue'
import GynecologyView from '@/views/departments/GynecologyView.vue'
import LaboratoryView from '@/views/departments/LaboratoryView.vue'
import TraumatologyView from '@/views/departments/TraumatologyView.vue'
import OphthalmologyView from '@/views/departments/OphthalmologyView.vue'
import OtorhinolaryngologyView from '@/views/departments/OtorhinolaryngologyView.vue'
import NeonatologyView from '@/views/departments/NeonatologyView.vue'
import GastroenterologyView from '@/views/departments/GastroenterologyView.vue'
import InstrumentalView from '@/views/departments/InstrumentalView.vue'
import TherapyView from '@/views/departments/TherapyView.vue'
import UroAndrologyView from '@/views/departments/UroAndrologyView.vue'
import CardiologyView from '@/views/departments/CardiologyView.vue'
import NeurologyView from '@/views/departments/NeurologyView.vue'
import EndocrinologyView from '@/views/departments/EndocrinologyView.vue'
import AllergologyView from '@/views/departments/AllergologyView.vue'
import DermatocosmetologyView from '@/views/departments/DermatocosmetologyView.vue'
import PulmonologyView from '@/views/departments/PulmonologyView.vue'
import DepartmentView from '@/views/departments/DepartmentView.vue'
import AmbulanceView from '@/views/medical_services/AmbulanceView.vue'
import HomeBasedExaminationView from '@/views/medical_services/HomeBasedExaminationView.vue'
import ChildrenHealthCenterView from '@/views/medical_services/ChildrenHealthCenterView.vue'
import MaleFemaleInfertilityView from '@/views/medical_services/MaleFemaleInfertilityView.vue'
import CorporateCooperationView from '@/views/medical_services/CorporateCooperationView.vue'
import MedicalInsuranceView from '@/views/medical_services/MedicalInsuranceView.vue'
import IndustrialMedicineView from '@/views/medical_services/IndustrialMedicineView.vue'
import OutpatientExaminationView from '@/views/medical_services/OutpatientExaminationView.vue'
import CheckUpView from '@/views/medical_services/CheckUpView.vue'
import ActionsView from '@/views/medical_services/ActionsView.vue'
import VaccView from '@/views/medical_services/VaccView.vue'
import DoctorArticles from '@/views/DoctorArticles.vue'
import CheckUpInnerView from '@/views/medical_services/CheckUpInnerView.vue'
import DoctorArticlesInner from '@/views/DoctorArticlesInner.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import E_appointmentView from '@/views/online_services/E_appointmentView.vue'
import E_resultView from '@/views/online_services/E_resultView.vue'
import E_paymentView from '@/views/online_services/E_paymentView.vue'
import E_commerceView from '@/views/online_services/E_commerceView.vue'
import E_consultationView from '@/views/online_services/E_consultationView.vue'
import OffersView from '@/views/OffersView.vue'
import ContactView from '@/views/ContactView.vue'
import NewsContentView from '@/views/NewsContentView.vue'
import axios from 'axios'
import AllNewsView from '@/views/AllNewsView.vue'
import CartView from '@/views/CartView.vue'

import authService from '@/services/auth';
import ProfileView from '@/views/ProfileView.vue'

  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/az/şəxsi-kabinet/profil',
      name: 'profile',
      component: ProfileView,
      meta: {
        breadcrumb: 'Profil',
        requiresAuth: true  // Bu səhifəyə daxil olmaq üçün autentifikasiya tələb olunur
      }
    },
    {
      path: '/şəxsi-kabinet/qeydiyyat',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/az/haqqımızda/',
      redirect: '/az/haqqımızda/tariximiz',
      meta: { breadcrumb: 'Haqqımızda' },
      children: [
        {
          path: '/az/haqqımızda/tariximiz',
          name: 'our-history',
          component: OurHistoryView,
          meta: { breadcrumb: 'Tariximiz' },
        },
        {
          path: '/az/haqqımızda/vizyonumuz',
          name: 'our-vision',
          component: OurVisionView,
          meta: { breadcrumb: 'Vizyonumuz' },
        },
        {
          path: '/az/haqqımızda/missiyamız',
          name: 'our-mission',
          component: OurMissionView,
          meta: { breadcrumb: 'Missiyazmız' },
        },
        {
          path: '/az/haqqımızda/beynəlxalq-əlaqələrimiz',
          name: 'our-relations',
          component: OurRelations,
          meta: { breadcrumb: 'Beynəlxalq əlaqələrimiz' },
        },

        {
          path: '/az/haqqımızda/mediada-biz',
          redirect: '/az/haqqımızda/mediada-biz/xəbərlər',
          meta: { breadcrumb: 'Mediada Biz' },
          children: [
            {
              path: '/az/haqqımızda/mediada-biz/xəbərlər',
              name: 'all-news',
              component: AllNewsView
            },
            {
              path: '/az/haqqımızda/mediada-biz/xəbərlər/:slug',
              name: 'news-content',
              component: NewsContentView
            },
            {
              path: '/az/haqqımızda/mediada-biz/ki̇v-yazanlar',
              name: 'kiv-writes',
              component: KivWritesView,
              meta: { breadcrumb: 'KİV yazanlar' },
            },
            {
              path: '/az/haqqımızda/mediada-biz/qalereya',
              redirect: '/az/haqqımızda/mediada-biz/qalereya/foto',
              meta: { breadcrumb: 'Qalereya' },
              children: [
                {
                  path: '/az/haqqımızda/mediada-biz/qalereya/foto',
                  name: 'photos-view',
                  component: PhotosView,
                  meta: { breadcrumb: 'Foto' },
                },
                {
                  path: '/az/haqqımızda/mediada-biz/qalereya/video',
                  name: 'videos-view',
                  component: VideosView,
                  meta: { breadcrumb: 'Video' },
                }
              ],
            },
            {
              path: '/az/haqqımızda/mediada-biz/sağlıq-köşkü',
              name: 'health-kiosk',
              component: HealthKioskView,
              meta: { breadcrumb: 'Sağlıq köşkü' }
            },
            {
              path: '/az/haqqımızda/mediada-biz/sağlıq-köşkü/:id',
              name: 'health-kiosk-detail',
              component: () => import('../views/HealthKioskInnerView.vue'),
              meta: {
                title: 'Sağlıq köşkü'
              }
            },
            {
              path: '/az/haqqımızda/mediada-biz/vakansiya',
              name: 'vacancies',
              component: VacanciesView,
              meta: { breadcrumb: 'Vakansiya' },
            },
            {
              path: '/az/haqqımızda/mediada-biz/vakansiya/:slug',
              name: 'vacancy-detail',
              component: () => import('@/views/VacancyInner.vue'),
              props: true,
              meta: { breadcrumb: 'Vakansiya Detalları' },
            },
            {
              path: '/az/haqqımızda/mediada-biz/son-yeniliklər',
              name: 'latest-updates',
              component: LatestUpdatesView,
              meta: { breadcrumb: 'Son yeniliklər' },
            }
          ],
        },
        {
          path: '/about/az/haqqımızda/direktor-kabineti',
          name: 'director-office',
          component: DirectorOfficeView,
          meta: { breadcrumb: 'Direktor kabineti' },
        },
        {
          path: '/az/haqqımızda/məmnunluq-anketi',
          name: 'satisfaction-form',
          component: SatisfactionFormView,
          meta: { breadcrumb: 'Məmnunluq anketi' },
        },
        {
          path: '/az/haqqımızda/keyfiyyət-siyasəti',
          name: 'quality-policy',
          component: QualityPolicyView,
          meta: { breadcrumb: 'Keyfiyyət siyasəti' },
        },
        {
          path: '/az/haqqımızda/keyfiyyətə-nəzarət',
          name: 'quality-control',
          component: QualityControlView,
          meta: { breadcrumb: 'Keyfiyyətə nəzarət' },
        },
        {
          path: '/az/haqqımızda/sertifikatlar',
          name: 'certificates',
          component: CertificatesView,
          meta: { breadcrumb: 'Sertifikatlar' },
        },
        {
          path: '/az/haqqımızda/təlim-mərkəzi',
          name: 'training-center',
          component: TrainingCenterView,
          meta: { breadcrumb: 'Təllim Mərkəzi' },
        }
      ],
    },

    {
      path: '/az/həkimlər/',
      redirect: '/az/həkimlər/',
      meta: { breadcrumb: 'Həkimlər' },
      children: [
        {
          path: 'həkimlərimiz',
          name: 'doctors',
          component: DoctorsView,
          meta: { breadcrumb: 'Həkimlərimiz' },
        },
        {
          path: '/az/profil/:id',
          name: 'doctor',
          component: () => import('@/views/DrView.vue'),
          props: true
        },
        {
          path: '/az/həkimlər/həkim-məqalələri',
          name: 'doctor-articles',
          component: DoctorArticles,
          meta: { breadcrumb: 'Həkim məqalələri' },
        },
        {
          path: '/az/həkimlər/həkim-məqalələri/:slug', 
          name: 'article-detail',
          component: DoctorArticlesInner,
          props: true,
          meta: { breadcrumb: 'Məqalə Detalları' },
        }
      ]
    },
    // Əsas departments (bölmələr) marşrutu
    {
      path: '/az/bölmələr',
      name: 'departments',
      component: () => import('@/views/departments/DepartmentsLayout.vue'), // Ümumi layout
      meta: { breadcrumb: 'Bölmələr' },
      children: [] // Dinamik child routelar buradan çıxaraq ana səviyyəyə keçəcək
    },
    // Dinamik slug parametri ilə department alt marşrutu
    {
      path: '/az/bölmələr/:slug',
      name: 'department-detail',
      component: () => import('@/views/departments/DepartmentView.vue'), 
      props: true,
      // meta: { breadcrumb: route => `${route.params.slug}` }
    },
    // Surgery bölməsi üçün əsas marşrut
    {
      path: '/az/bölmələr/cərrahiyyə',
      name: 'surgery',
      component: () => import('@/views/departments/surgery/SurgeryLayout.vue'), // Ana səhifə üçün
      meta: { breadcrumb: 'Cərrahiyyə' }
    },
    // Dinamik slug parametri ilə surgery alt marşrutu
    {
      path: '/az/bölmələr/cərrahiyyə/:slug',
      name: 'surgery-detail',
      component: () => import('@/views/departments/surgery/SurgeryView.vue'),
      props: true
    },
    // Pediatriya bölməsi üçün əsas marşrut - import blokundan sonra və routes massivinin içərisinə əlavə edin
    {
      path: '/az/bölmələr/pediatriya',
      name: 'pediatrics',
      component: () => import('@/views/departments/pediatrics/PediatricsLayout.vue'), // Ana səhifə üçün
      meta: { breadcrumb: 'Pediatriya' }
    },
    // Dinamik slug parametri ilə pediatriya alt marşrutu
    {
      path: '/az/bölmələr/pediatriya/:slug',
      name: 'pediatrics-detail',
      component: () => import('@/views/departments/pediatrics/PediatricsView.vue'),
      props: true
    },
    // Əsas medical-services marşrutunu əlavə et
    {
      path: '/az/tibbi-xidmətlər',
      name: 'medical-services',
      component: () => import('@/views/medical_services/MedicalServiceView.vue'),
      meta: { breadcrumb: 'Tibbi xidmətlər' },
      // Problem: Eyni komponenti həm ana səhifə, həm də detallı səhifə üçün istifadə ediriksə,
      // komponentin hansında olduğunu bilməsi lazımdır
    },
    {
      path: '/az/tibbi-xidmətlər/:slug',
      name: 'medical-service-detail',
      component: () => import('@/views/medical_services/MedicalServiceView.vue'),
      meta: { breadcrumb: '' },
      props: true  // Bu çox vacibdir - component-ə slug parametrini ötürür
    },
    // {
    //   path: '/medical-services',
    //   redirect: '/medical-services/ambulance',
    //   meta: { breadcrumb: 'Tibbi xidmətlər' },
    //   children: [
    //     {
    //       path: 'ambulance',
    //       name: 'ambulance',
    //       component: AmbulanceView,
    //       meta: { breadcrumb: 'Təcili Tibbi yardım' },
    //     },
    //     {
    //       path: 'home-examination',
    //       name: 'home-examination',
    //       component: HomeBasedExaminationView,
    //       meta: { breadcrumb: 'Ünvanda müayinə' },
    //     },
    //     {
    //       path: 'children-center',
    //       name: 'children-center',
    //       component: ChildrenHealthCenterView,
    //       meta: { breadcrumb: 'Uşaq sağlamlıq mərkəzi' },
    //     },
    //     {
    //       path: 'male-female-infertility',
    //       name: 'male-female-infertility',
    //       component: MaleFemaleInfertilityView,
    //       meta: { breadcrumb: 'Kişi və qadın sonsuzluğu mərkəzi' },
    //     },
    //     {
    //       path: 'corporate-cooperation',
    //       name: 'corporate-cooperation',
    //       component: CorporateCooperationView,
    //       meta: { breadcrumb: 'Korporativ əməkdaşlıq' },
    //     },
    //     {
    //       path: 'medical-insurance',
    //       name: 'medical-insurance',
    //       component: MedicalInsuranceView,
    //       meta: { breadcrumb: 'Tibbi sığorta' },
    //     },
    //     { 
    //       path: 'industrial-medicine',
    //       name: 'industrial-medicine',
    //       component: IndustrialMedicineView,
    //       meta: { breadcrumb: 'Sənaye təbabəti' },
    //     },
    //     {
    //       path: 'outpatient-examination',
    //       name: 'outpatient-examination',
    //       component: OutpatientExaminationView,
    //       meta: { breadcrumb: 'Ambulator müayinə' },
    //     },
    //     {
    //       path: 'check-up',
    //       name: 'check-up',
    //       component: CheckUpView,
    //       meta: { breadcrumb: 'Check-up' },
    //     },
    //     {
    //       path: 'check-up/:id',
    //       name: 'check-up-inner',
    //       component: CheckUpInnerView,
    //       props: true,
    //       meta: { breadcrumb: 'Check-up Detalları' },
    //     },
    //     {
    //       path: 'actions',
    //       name: 'actions',
    //       component: ActionsView,
    //       meta: { breadcrumb: 'Aksiyalar' },
    //     },
    //     {
    //       path: 'vacc',
    //       name: 'vacc',
    //       component: VaccView,
    //       meta: { breadcrumb: 'Pulmonologiya' },
    //     }
    //   ],
    // },
    {
      path: '/az/tibbi-xidmətlər/check-uplar',
      name: 'check-up',
      component: CheckUpView,
      meta: { breadcrumb: 'Check-up' },
    },
    {
      path: '/az/tibbi-xidmətlər/check-uplar/:slug',
      name: 'check-up-inner',
      component: () => import('@/views/medical_services/CheckUpInnerView.vue'),
      props: true
    },
      {
      path: '/az/online-xidmətlər',
      redirect: '/az/online-xidmətlər/e-randevu',
      meta: { breadcrumb: 'Onlayn xidmətlər' },
      children: [
        {
          path: 'e-appointment',
          name: 'e-appointment',
          component: E_appointmentView,
          meta: { breadcrumb: 'E-növbə' }
        },
        {
          path: 'e-nəticə',
          name: 'e-result',
          component: E_resultView,
          meta: { breadcrumb: 'E-nəticə' }
        },
        {
          path: '/az/online-xidmətlər/e-payment',
          name: 'e-payment',
          beforeEnter() {
            window.location.href = 'https://referans.io/services/onlayn-odenis/';
          }
        },
        // {
        //   path: 'e-commerce',
        //   name: 'e-commerce',
        //   component: E_commerceView,
        //   meta: { breadcrumb: 'E-satış' }
        // },
        {
          path: 'e-məsləhət',
          name: 'e-consultation',
          component: E_consultationView,
          meta: { breadcrumb: 'E-məsləhət' }
        },
      ]
    },
    // {
    // path: '/cart',
    // name: 'CartView',
    // component: CartView,
    // meta: { breadcrumb: 'Səbət' }
    // },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView,
      meta: { breadcrumb: 'Aksiyalar' }
    },
    {
      path: '/offers/:slug',
      name: 'offer-detail',
      component: () => import('@/views/OffersInnerView.vue'),
      props: true,
      meta: { breadcrumb: 'Aksiya Detalları' }
    },
    {
      path: '/az/əlaqə',
      name: 'contact',
      component: ContactView,
      meta: { breadcrumb: 'Əlaqə' }
    },
    
  ]

 
  const scrollPositions = new Map()

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
        const position = scrollPositions.get(from.fullPath)
        if (position) {
          return position
        }
      }
      return { top: 0 }
    }
  })

  router.beforeEach((to, from, next) => {
    // URL enkodlaşdırılmış simvollarını normallaşdır
    const normalizedPath = decodeURIComponent(to.path);
    
    if (normalizedPath !== to.path) {
      next({ path: normalizedPath, query: to.query, hash: to.hash });
    } else {
      next();
    }
  });

  router.beforeEach((to, from, next) => {
    if (from.meta.saveScrollPosition) {
      scrollPositions.set(from.fullPath, { left: window.pageXOffset, top: window.pageYOffset })
    }
    next()
  })

  // Autentifikasiya guard-ı
    router.beforeEach((to, from, next) => {
      // Rota üçün auth tələb olunub-olmadığını yoxlayırıq
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      
      // İstifadəçinin daxil olub-olmadığını yoxlayırıq
      const isAuthenticated = authService.isLoggedIn();
      
      if (requiresAuth && !isAuthenticated) {
        // Auth tələb olunur, amma istifadəçi daxil olmayıb: Login səhifəsinə yönləndirilir
        next('/login');
      } else if (to.path === '/login' && isAuthenticated) {
        // İstifadəçi artıq daxil olub və login səhifəsinə getmək istəyir: Ana səhifəyə yönləndirilir
        next('/');
      } else {
        // Bütün digər hallarda: normal naviqasiya
        next();
      }
    });


// Dinamik olaraq department-ları yükləmək
const fetchDepartments = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/department-list/')
    const departments = response.data.results
    departments.forEach(department => {
      router.addRoute({
        path: `/departments/${department.slug}`, // Hər departament üçün unikal yol
        name: `department-${department.slug}`, // Unikal ad təyin edirik
        component: () => import('@/views/departments/DepartmentView.vue'), // Dinamik import
        props: true, // props olaraq ötürülməsini təmin edirik
        meta: { breadcrumb: department.name }
      })
    })
  } catch (error) {
    console.error('Department API çağırışında xəta:', error)
  }
}

// Dinamik pediatriya routelarını əlavə edən funksiya
const fetchPediatricDepartments = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/pediatricdep-list/')
    const pediatrics = response.data.results
    pediatrics.forEach(pediatric => {
      router.addRoute({
        path: `/departments/pediatrics/${pediatric.slug}`, // :slug parametrini istifadə edirik
        name: `pediatrics-${pediatric.slug}`,  
        component: () => import('@/views/departments/pediatrics/PediatricsView.vue'), // PediatricsView.vue səhifəsinə yönləndirilir
        props: true, // props olaraq ötürülməsini təmin edirik
        meta: { breadcrumb: pediatric.name }
      })
    })
  } catch (error) {
    console.error('Pediatriya API çağırışında xəta:', error)
  }
}

// Dinamik surgery routelarını əlavə edən funksiya
const fetchSurgeryDepartments = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/surgeondep-list/')
    const surgeries = response.data.results
    surgeries.forEach(surgery => {
      router.addRoute({
        path: `/departments/surgery/${surgery.slug}`, // :slug parametrini istifadə edirik
        // name: surgery.slug,
        name: `surgery-${surgery.slug}`,  
        component: () => import('@/views/departments/surgery/SurgeryView.vue'), // SurgeryView.vue səhifəsinə yönləndirilir
        props: true, // props olaraq ötürülməsini təmin edirik
        meta: { breadcrumb: surgery.name }
      })
    })
  } catch (error) {
    console.error('Surgery API çağırışında xəta:', error)
  }
}

// Dinamik tibbi xidmətlər marşrutlarını əlavə edən funksiya
const fetchMedicalServiceRoutes = async () => {
  try {
    const response = await axios.get('https://bytexerp.online/api/leyla/v1/medical-service-list/');
    const medicalServices = response.data.results;
    
    medicalServices.forEach(service => {
      router.addRoute({
        path: `/medical-services/${service.slug}`,
        name: `medical-service-details`, // Unikal ad 
        component: () => import('@/views/medical_services/MedicalServiceView.vue'),
        props: true,
        meta: { breadcrumb: service.title } // API-dən gələn başlıqla breadcrumb-u təyin edirik
      });
    });
  } catch (error) {
    console.error('Tibbi xidmətlər marşrutları əlavə edilərkən xəta:', error);
  }
};

fetchMedicalServiceRoutes();

fetchDepartments();
fetchPediatricDepartments();
fetchSurgeryDepartments();

// Google Analytics səhifə görüntülənmə izləmə
router.afterEach((to) => {
  // Əgər Google Analytics hazırdırsa
  if (window.gtag) {
    window.gtag('config', 'G-HYBSVNG1Q5', {
      page_path: to.path,
      page_title: to.meta.breadcrumb || to.name
    });
  }
});


export default router
