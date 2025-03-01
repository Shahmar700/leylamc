import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoctorsView from '@/views/DoctorsView.vue'
import DrView from '@/views/DrView.vue'
import OurVisionView from '@/views/OurVisionView.vue'
import OurHistoryView from '@/views/OurHistoryView.vue'
import OurMissionView from '@/views/OurMissionView.vue'
import OurRelations from '@/views/OurRelations.vue'
import NewsView from '@/views/NewsView.vue'
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

  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/news/:slug',
      name: 'news-content',
      component: NewsContentView
    },
    {
      path: '/all-news',
      name: 'all-news',
      component: AllNewsView
    },
    {
      path: '/about',
      redirect: '/about/our-history',
      meta: { breadcrumb: 'Haqqımızda' },
      children: [
        {
          path: '/about/our-history',
          name: 'our-history',
          component: OurHistoryView,
          meta: { breadcrumb: 'Tariximiz' },
        },
        {
          path: '/about/our-vision',
          name: 'our-vision',
          component: OurVisionView,
          meta: { breadcrumb: 'Vizyonumuz' },
        },
        {
          path: '/about/our-mission',
          name: 'our-mission',
          component: OurMissionView,
          meta: { breadcrumb: 'Missiyazmız' },
        },
        {
          path: '/about/our-relations',
          name: 'our-relations',
          component: OurRelations,
          meta: { breadcrumb: 'Beynəlxalq əlaqələrimiz' },
        },
        {
          path: '/our-in-media',
          redirect: '/about/our-in-media/news',
          meta: { breadcrumb: 'Mediada Biz' },
          children: [
            {
              path: '/about/our-in-media/news',
              name: 'news',
              component: NewsView,
              meta: { breadcrumb: 'Xəbərlər' },
            },
            {
              path: '/about/our-in-media/kiv-writes',
              name: 'kiv-writes',
              component: KivWritesView,
              meta: { breadcrumb: 'KİV yazanlar' },
            },
            {
              path: '/about/our-in-media/gallery',
              redirect: '/about/our-in-media/gallery/photos-view',
              meta: { breadcrumb: 'Qalereya' },
              children: [
                {
                  path: '/about/our-in-media/gallery/photos-view',
                  name: 'photos-view',
                  component: PhotosView,
                  meta: { breadcrumb: 'Foto' },
                },
                {
                  path: '/about/our-in-media/gallery/videos-view',
                  name: 'videos-view',
                  component: VideosView,
                  meta: { breadcrumb: 'Video' },
                }
              ],
            },
            {
              path: '/about/our-in-media/health-kiosk',
              name: 'health-kiosk',
              component: HealthKioskView,
              meta: { breadcrumb: 'Sağlıq köşkü' },
            },
            {
              path: '/about/our-in-media/vacancies',
              name: 'vacancies',
              component: VacanciesView,
              meta: { breadcrumb: 'Vakansiya' },
            },
            {
              path: '/about/our-in-media/latest-updates',
              name: 'latest-updates',
              component: LatestUpdatesView,
              meta: { breadcrumb: 'Son yeniliklər' },
            }
          ],
        },
        {
          path: '/about/director-office',
          name: 'director-office',
          component: DirectorOfficeView,
          meta: { breadcrumb: 'Direktor kabineti' },
        },
        {
          path: '/about/satisfaction-form',
          name: 'satisfaction-form',
          component: SatisfactionFormView,
          meta: { breadcrumb: 'Məmnunluq anketi' },
        },
        {
          path: '/about/quality-policy',
          name: 'quality-policy',
          component: QualityPolicyView,
          meta: { breadcrumb: 'Keyfiyyət siyasəti' },
        },
        {
          path: '/about/quality-control',
          name: 'quality-control',
          component: QualityControlView,
          meta: { breadcrumb: 'Keyfiyyətə nəzarət' },
        },
        {
          path: '/about/certificates',
          name: 'certificates',
          component: CertificatesView,
          meta: { breadcrumb: 'Sertifikatlar' },
        },
        {
          path: '/about/training-center',
          name: 'training-center',
          component: TrainingCenterView,
          meta: { breadcrumb: 'Təllim Mərkəzi' },
        }
      ],
    },
    {
      path: '/doctors',
      redirect: '/doctors/list',
      meta: { breadcrumb: 'Həkimlər' },
      children: [
        {
          path: 'list',
          name: 'doctors',
          component: DoctorsView,
          meta: { breadcrumb: 'Həkimlərimiz' },
        },
        {
          path: 'articles',
          name: 'doctor-articles',
          component: DoctorArticles,
          meta: { breadcrumb: 'Həkim məqalələri' },
        },
        {
          path: '/articles/:id',
          name: 'article-detail',
          component: DoctorArticlesInner,
          props: true,
          meta: { breadcrumb: 'Məqalə Detalları' },
        }
      ]
    },
    {
      path: '/doctor/:id',
      name: 'doctor',
      component: () => import('@/views/DrView.vue'),
      props: true
    },
    {
      path: '/departments',
      redirect: '/departments/surgery/general-surgery',
      meta: { breadcrumb: 'Bölmələr' },
      children: [
        {
          path: '/departments/surgery',
          redirect: '/departments/surgery/general-surgery',
          children:[
            {
              path: '/departments/surgery/general-surgery',
              name: 'general-surgery',
              component: GeneralSurgeryView,
              meta: { breadcrumb: 'Ümumi cərrahiyyə' },
            },
            {
              path: '/departments/surgery/plastic-surgery',
              name: 'plastic-surgery',
              component: PlasticSurgeryView,
              meta: { breadcrumb: 'Plastik cərrahiyyə' },
            },
            {
              path: '/departments/surgery/pediatric-surgery',
              name: 'pediatric-surgery',
              component: PediatricSurgeryView,
              meta: { breadcrumb: 'Uşaq cərrahiyyəsi' },
            },
            {
              path: '/departments/surgery/thoracic-surgery',
              name: 'thoracic-surgery',
              component: ThoracicSurgeryView,
              meta: { breadcrumb: 'Torakal cərrahiyyə' },
            },
          ],
        },
       // Statik department yollarını silirik
      ]
    },
    {
      path: '/medical-services',
      redirect: '/medical-services/ambulance',
      meta: { breadcrumb: 'Tibbi xidmətlər' },
      children: [
        {
          path: 'ambulance',
          name: 'ambulance',
          component: AmbulanceView,
          meta: { breadcrumb: 'Təcili Tibbi yardım' },
        },
        {
          path: 'home-examination',
          name: 'home-examination',
          component: HomeBasedExaminationView,
          meta: { breadcrumb: 'Ünvanda müayinə' },
        },
        {
          path: 'children-center',
          name: 'children-center',
          component: ChildrenHealthCenterView,
          meta: { breadcrumb: 'Uşaq sağlamlıq mərkəzi' },
        },
        {
          path: 'male-female-infertility',
          name: 'male-female-infertility',
          component: MaleFemaleInfertilityView,
          meta: { breadcrumb: 'Kişi və qadın sonsuzluğu mərkəzi' },
        },
        {
          path: 'corporate-cooperation',
          name: 'corporate-cooperation',
          component: CorporateCooperationView,
          meta: { breadcrumb: 'Korporativ əməkdaşlıq' },
        },
        {
          path: 'medical-insurance',
          name: 'medical-insurance',
          component: MedicalInsuranceView,
          meta: { breadcrumb: 'Tibbi sığorta' },
        },
        { 
          path: 'industrial-medicine',
          name: 'industrial-medicine',
          component: IndustrialMedicineView,
          meta: { breadcrumb: 'Sənaye təbabəti' },
        },
        {
          path: 'outpatient-examination',
          name: 'outpatient-examination',
          component: OutpatientExaminationView,
          meta: { breadcrumb: 'Ambulator müayinə' },
        },
        {
          path: 'check-up',
          name: 'check-up',
          component: CheckUpView,
          meta: { breadcrumb: 'Check-up' },
        },
        {
          path: 'check-up/:id',
          name: 'check-up-inner',
          component: CheckUpInnerView,
          props: true,
          meta: { breadcrumb: 'Check-up Detalları' },
        },
        {
          path: 'actions',
          name: 'actions',
          component: ActionsView,
          meta: { breadcrumb: 'Aksiyalar' },
        },
        {
          path: 'vacc',
          name: 'vacc',
          component: VaccView,
          meta: { breadcrumb: 'Pulmonologiya' },
        }
      ],
    },
    {
      path: '/online-services',
      redirect: '/online-services/e-appointment',
      meta: { breadcrumb: 'Onlayn xidmətlər' },
      children: [
        {
          path: 'e-appointment',
          name: 'e-appointment',
          component: E_appointmentView,
          meta: { breadcrumb: 'E-növbə' }
        },
        {
          path: 'e-result',
          name: 'e-result',
          component: E_resultView,
          meta: { breadcrumb: 'E-nəticə' }
        },
        {
          path: 'e-payment',
          name: 'e-payment',
          component: E_paymentView,
          meta: { breadcrumb: 'E-ödəmə' }
        },
        {
          path: 'e-commerce',
          name: 'e-commerce',
          component: E_commerceView,
          meta: { breadcrumb: 'E-satış' }
        },
        {
          path: 'e-consultation',
          name: 'e-consultation',
          component: E_consultationView,
          meta: { breadcrumb: 'E-məsləhət' }
        },
      ]
    },
    {
    path: '/cart',
    name: 'CartView',
    component: CartView,
    meta: { breadcrumb: 'Səbət' }
    },
    {
      path: '/health-kiosk',
      name: 'health-kiosk',
      component: HealthKioskView,
      meta: { breadcrumb: 'Sağlıq köşkü' }
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: VacanciesView,
      meta: { breadcrumb: 'Vakansiyalar' }
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView,
      meta: { breadcrumb: 'Aksiyalar' }
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersView,
      meta: { breadcrumb: 'Aksiyalar' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { breadcrumb: 'Əlaqə' }
    },
  ]

 

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { top: 0 } 
    }
  })


// Dinamik olaraq department-ları yükləmək
const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://192.168.2.242:8000/api/leyla/v1/department-list/')
    const departments = response.data.results
    departments.forEach(department => {
      router.addRoute({
        // path: `/departments/${department.slug}`,
        path: `/departments/:slug`, // :slug parametrini istifadə edirik
        name: department.slug,
        component: DepartmentView,
        props: true, // props olaraq ötürülməsini təmin edirik
        meta: { breadcrumb: department.name }
      })
    })
  } catch (error) {
    console.error('API çağırışında xəta:', error)
  }
}

fetchDepartments()

export default router
