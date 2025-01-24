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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      redirect: '/about/our-history',
      children: [
        {
          path: 'our-history',
          name: 'our-history',
          component: OurHistoryView,
        },
        {
          path: 'our-vision',
          name: 'our-vision',
          component: OurVisionView,
        },
        {
          path: 'our-mission',
          name: 'our-mission',
          component: OurMissionView,
        },
        {
          path: '/about/our-relations',
          name: 'our-relations',
          component: OurRelations,
        },
        {
          path: '/our-in-media',
          redirect: '/about/our-in-media/news',
          children: [
            {
              path: '/about/our-in-media/news',
              name: 'news',
              component: NewsView,
            },
            {
              path: '/about/our-in-media/kiv-writes',
              name: 'kiv-writes',
              component: KivWritesView,
            },
            {
              path: '/about/our-in-media/gallery',
              redirect: '/about/our-in-media/gallery/photos-view',
              children: [
                {
                  path: '/about/our-in-media/gallery/photos-view',
                  name: 'photos-view',
                  component: PhotosView,
                },
                {
                  path: '/about/our-in-media/gallery/videos-view',
                  name: 'videos-view',
                  component: VideosView,
                }
              ],
            },
            {
              path: '/about/our-in-media/health-kiosk',
              name: 'health-kiosk',
              component: HealthKioskView,
            },
            {
              path: '/about/our-in-media/vacancies',
              name: 'vacancies',
              component: VacanciesView,
            },
            {
              path: '/about/our-in-media/latest-updates',
              name: 'latest-updates',
              component: LatestUpdatesView,
            }
          ],
        },
        {
          path: '/about/director-office',
          name: 'director-office',
          component: DirectorOfficeView
        },
        {
          path: '/about/satisfaction-form',
          name: 'satisfaction-form',
          component: SatisfactionFormView,
        },
        {
          path: '/about/quality-policy',
          name: 'quality-policy',
          component: QualityPolicyView,
        },
        {
          path: '/about/quality-control',
          name: 'quality-control',
          component: QualityControlView,
        },
        {
          path: '/about/certificates',
          name: 'certificates',
          component: CertificatesView,
        },
        {
          path: '/about/training-center',
          name: 'training-center',
          component: TrainingCenterView,
        }
      ],
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: DoctorsView,
    },
    {
      path: '/doctor/:id',
      name: 'doctor',
      component: DrView,
      props: true,
    },
    {
      path: '/departments',
      redirect: '/departments/surgery/general-surgery',
      children: [
        {
          path: '/departments/surgery',
          redirect: '/departments/surgery/general-surgery',
          children:[
            {
              path: '/departments/surgery/general-surgery',
              name: 'general-surgery',
              component: GeneralSurgeryView,
            },
            {
              path: '/departments/surgery/plastic-surgery',
              name: 'plastic-surgery',
              component: PlasticSurgeryView,
            },
            {
              path: '/departments/surgery/pediatric-surgery',
              name: 'pediatric-surgery',
              component: PediatricSurgeryView,
            },
            {
              path: '/departments/surgery/thoracic-surgery',
              name: 'thoracic-surgery',
              component: ThoracicSurgeryView,
            },
          ],
        },
        {
          path: '/departments/phlebology',
          name: 'phlebology',
          component: PhlebologyView,
        },
        {
          path: '/departments/gynecology',
          name: 'gynecology',
          component: GynecologyView,
        },
        {
          path: '/departments/laboratory',
          name: 'laboratory',
          component: LaboratoryView,
        },
        {
          path: '/departments/traumatology',
          name: 'traumatology',
          component: TraumatologyView,
        },
        {
          path: '/departments/ophthalmology',
          name: 'ophthalmology',
          component: OphthalmologyView,
        },
        {
          path: '/departments/otorhinolaryngology',
          name: 'otorhinolaryngology',
          component: OtorhinolaryngologyView,
        },
        {
          path: '/departments/neonatology-and-pediatrics',
          name: 'neonatology-and-pediatrics',
          component: NeonatologyView,
        },
        {
          path: '/departments/gastroenterology',
          name: 'gastroenterology',
          component: GastroenterologyView,
        },
        {
          path: '/departments/instrumental-diagnostics',
          name: 'instrumental-diagnostics',
          component: InstrumentalView,
        },
        {
          path: '/departments/therapy',
          name: 'therapy',
          component: TherapyView,
        },
        {
          path: '/departments/uro-andrology',
          name: 'uro-andrology',
          component: UroAndrologyView,
        },
        {
          path: '/departments/cardiology',
          name: 'cardiology',
          component: CardiologyView,
        },
        {
          path: '/departments/neurology',
          name: 'neurology',
          component: NeurologyView,
        },
        {
          path: '/departments/endocrinology-and-dietology',
          name: 'endocrinology-and-dietology',
          component: EndocrinologyView,
        },
        {
          path: '/departments/allergology',
          name: 'allergology',
          component: AllergologyView,
        },
        {
          path: '/departments/dermatocosmetology',
          name: 'dermatocosmetology',
          component: DermatocosmetologyView,
        },
        {
          path: '/departments/pulmonology',
          name: 'pulmonology',
          component: PulmonologyView,
        },
      ]
    },
    {
      path: '/medical-services',
      redirect: '/medical-services/ambulance',
      children: [
        {
          path: '/medical-services/ambulance',
          name: 'ambulance',
          component: AmbulanceView,
        },
        {
          path: '/medical-services/home-examination',
          name: 'home-examination',
          component: HomeBasedExaminationView,
        },
        {
          path: '/medical-services/children-center',
          name: 'children-center',
          component: ChildrenHealthCenterView,
        },
        {
          path: '/medical-services/male-female-infertility',
          name: 'male-female-infertility',
          component: MaleFemaleInfertilityView,
        },
        {
          path: '/medical-services/corporate-cooperation',
          name: 'corporate-cooperation',
          component: CorporateCooperationView,
        },
        {
          path: '/medical-services/medical-insurance',
          name: 'medical-insurance',
          component: MedicalInsuranceView,
        },
        { 
          path: '/medical-services/industrial-medicine',
          name: 'industrial-medicine',
          component: IndustrialMedicineView,
        },
        {
          path: '/medical-services/outpatient-examination',
          name: 'outpatient-examination',
          component: OutpatientExaminationView,
        },
        {
          path: '/medical-services/check-up',
          name: 'check-up',
          component: CheckUpView,
        },
        {
          path: '/medical-services/actions',
          name: 'actions',
          component: ActionsView,
        },
        {
          path: '/medical-services/vacc',
          name: 'vacc',
          component: VaccView,
        }
      ],
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 } 
  }
})

export default router
