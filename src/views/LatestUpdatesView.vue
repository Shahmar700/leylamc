<template>
  <div class="container mt-16 text-main-text">
      <div class="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <div class="w-full sm:w-3/4" data-aos="zoom-out-right">
              <h1 class="text-3xl font-semibold mb-10">Son Yeniliklər</h1>
              <div>
                  <div class="flex mb-4 headingBtns border-b">
                      <button @click="activeTab = 'med_center'" :class="{ 'font-bold': activeTab === 'med_center' }">Leyla Medical Center</button>
                      <button @click="activeTab = 'info_lab'" :class="{ 'font-bold': activeTab === 'info_lab' }">İnfo Lab</button>
                  </div>
                  <table class="min-w-full bg-white">
                      <thead>
                          <tr>
                              <th class="py-2 px-4 border-b text-start">Ad</th>
                              <th class="py-2 px-4 border-b text-start"><i class="fa-solid fa-link"></i> PDF</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in paginatedContent" :key="item.id" @click="openPdf(item.pdf)" class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary hover:border">
                              <td class="py-2 px-4 border-b">{{ item.name }}</td>
                              <td class="py-2 px-4 border-b">
                                      <i class="fa-regular fa-file-pdf"></i>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div v-if="totalPages > 1" class="pagination mt-4 flex justify-start">
                      <button @click="goToFirstPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angles-left"></i></button>
                      <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button"><i class="fa-solid fa-angle-left"></i></button>
                      <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'font-bold': currentPage === page, 'active-page': currentPage === page, 'inactive-page': currentPage !== page }">{{ page }}</span>
                      <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angle-right"></i></button>
                      <button @click="goToLastPage" :disabled="currentPage === totalPages" class="pagination-button"><i class="fa-solid fa-angles-right"></i></button>
                  </div>
              </div>
          </div>
          <div class="w-[290px] mt-10 md:mt-0 md:ml-4 2xl:ml-0" data-aos="zoom-in-left">
              <SideBanners class="mb-4" /> 
          </div>
      </div>
      <Maps class="mt-14 sm:mt-24" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SideBanners from "@/components/SideBanners.vue";
import Maps from "@/components/Maps.vue";

const activeTab = ref('med_center');

const content = ref([
{ id: 1, name: 'Bəhruz Ağayev', pdf: '/assets/innovationsPdfs/Behruz_Agayev.pdf', type: 'med_center' },
{ id: 2, name: 'Leyla Süleymanova', pdf: '/assets/innovationsPdfs/Leyla_Suleymanova.pdf', type: 'med_center' },
{ id: 3, name: 'Mədinə Dilbazi', pdf: '/assets/innovationsPdfs/Medine_Dilbazi.pdf', type: 'med_center' },
{ id: 4, name: 'Möhsüm Əsgərov', pdf: '/assets/innovationsPdfs/Mohsum_Esgerov.pdf', type: 'med_center' },
{ id: 5, name: 'Nigar Muradova', pdf: '/assets/innovationsPdfs/Nigar_Muradova.pdf', type: 'med_center' },
{ id: 6, name: 'Pediatriya', pdf: '/assets/innovationsPdfs/Pediatriya.pdf', type: 'med_center' },
{ id: 7, name: 'Ultrasəs', pdf: '/assets/innovationsPdfs/Ultrases.pdf', type: 'med_center' },
{ id: 8, name: 'Yaşar Həsənov T.Ü.F.D', pdf: '/assets/innovationsPdfs/Yasar_Hesenov.pdf', type: 'med_center' },
{ id: 9, name: 'Adrenal Hormonlar Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Adrenal Hormonlar Paneli.pdf', type: 'info_lab' },
{ id: 10, name: 'AFS Sindromu', pdf: '/assets/innovationsPdfs/InfoLab/AFS-Sindromu.pdf', type: 'info_lab' },
{ id: 11, name: 'ANA Paneli', pdf: '/assets/innovationsPdfs/InfoLab/ANA-Paneli.pdf', type: 'info_lab' },
{ id: 12, name: 'Bakterial Vaginoz Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Bakterial-Vaginoz-Paneli.pdf', type: 'info_lab' },
{ id: 13, name: 'Blasto Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Blasto-Paneli.pdf', type: 'info_lab' },
{ id: 14, name: 'Dəri Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Deri-Paneli.pdf', type: 'info_lab' },
{ id: 15, name: 'Diabetik Monitorinq', pdf: '/assets/innovationsPdfs/InfoLab/Diabetik-Monitorinq.pdf', type: 'info_lab' },
{ id: 16, name: 'Diareya Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Diareya-Paneli.pdf', type: 'info_lab' },
{ id: 17, name: 'E.coli Paneli', pdf: '/assets/innovationsPdfs/InfoLab/E-coli-Paneli.pdf', type: 'info_lab' },
{ id: 18, name: 'EBV (EPŞTEYN BARR VİRUSU)', pdf: '/assets/innovationsPdfs/InfoLab/EBV.pdf', type: 'info_lab' },
{ id: 19, name: 'EPI PRO COLON', pdf: '/assets/innovationsPdfs/InfoLab/Epi-pro-colon.pdf', type: 'info_lab' },
{ id: 20, name: 'Əzələ Xəstəlikləri Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Ezele-xestelileri-paneli.pdf', type: 'info_lab' },
{ id: 21, name: 'FMF Paneli', pdf: '/assets/innovationsPdfs/InfoLab/FMF.pdf', type: 'info_lab' },
{ id: 22, name: 'Helicobacter Pylori Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Genital-Ulcer-Paneli.pdf', type: 'info_lab' },
{ id: 23, name: 'Genital Ulcer Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Genital-Ulcer-Paneli.pdf', type: 'info_lab' },
{ id: 24, name: 'Helicobacter Pylori Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Helicobacter-Pylori-Paneli.pdf', type: 'info_lab' },
{ id: 25, name: 'Helmint Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Helmint-Paneli.pdf', type: 'info_lab' },
{ id: 26, name: 'Hipertenziya Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Hipertenziya-Paneli.pdf', type: 'info_lab' },
{ id: 27, name: 'HLA Paneli', pdf: '/assets/innovationsPdfs/InfoLab/HLA-Paneli.pdf', type: 'info_lab' },
{ id: 28, name: 'Kardiovaskulyar Risk Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Kardiovaskulyar-Risk-Paneli.pdf', type: 'info_lab' },
{ id: 29, name: 'Kosmetoloji laborator müayinələr', pdf: '/assets/innovationsPdfs/InfoLab/Kosmetoloji-laborator-muayineler.pdf', type: 'info_lab' },
{ id: 30, name: 'KRON Xəstəliyi', pdf: '/assets/innovationsPdfs/InfoLab/KRON.pdf', type: 'info_lab' },
{ id: 31, name: 'LAYM-Borrelia', pdf: '/assets/innovationsPdfs/InfoLab/LAYM-Borrelia.pdf', type: 'info_lab' },
{ id: 32, name: 'Leptospiroz Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Leptospiroz-Paneli.pdf', type: 'info_lab' },
{ id: 33, name: 'Limfosit alt qrupları', pdf: '/assets/innovationsPdfs/InfoLab/Limfosit-alt-gruplari.pdf', type: 'info_lab' },
{ id: 34, name: 'MUKOVİSSİDOZ-CYSTİC FİBROSİS PANELİ', pdf: '/assets/innovationsPdfs/InfoLab/Mukovissidoz-cystic-fibrosis.pdf', type: 'info_lab' },
{ id: 35, name: 'NIPT PANELI', pdf: '/assets/innovationsPdfs/InfoLab/Nipt-paneli.pdf', type: 'info_lab' },
{ id: 36, name: 'Pankreatik Elastaza', pdf: '/assets/innovationsPdfs/InfoLab/Pankreatik-Elastaza.pdf', type: 'info_lab' },
{ id: 37, name: 'Parazit Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Parazit-Paneli.pdf', type: 'info_lab' },
{ id: 38, name: 'Prenatal Skrininq Testləri', pdf: '/assets/innovationsPdfs/InfoLab/Prenatal-skrining-testleri.pdf', type: 'info_lab' },
{ id: 39, name: 'Prenatal Skrininq Testləri', pdf: '/assets/innovationsPdfs/InfoLab/Prenatal-skrining-testleri.pdf', type: 'info_lab' },
{ id: 40, name: 'Qanqliozid Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Qanqliozid-Paneli.pdf', type: 'info_lab' },
{ id: 41, name: 'Qida Həssaslığı Testi', pdf: '/assets/innovationsPdfs/InfoLab/Qida-Hessasligi-Testi.pdf', type: 'info_lab' },
{ id: 42, name: 'REYNO Sindromu Paneli', pdf: '/assets/innovationsPdfs/InfoLab/REYNO-Sindromu.pdf', type: 'info_lab' },
{ id: 43, name: 'ROMA İndeksi', pdf: '/assets/innovationsPdfs/InfoLab/ROMA-Indeksi.pdf', type: 'info_lab' },
{ id: 44, name: 'SARILIQ PANELİ', pdf: '/assets/innovationsPdfs/InfoLab/Sariliq-paneli.pdf', type: 'info_lab' },
{ id: 45, name: 'Screening AYAQ PANELI', pdf: '/assets/innovationsPdfs/InfoLab/Screening-ayaq-paneli.pdf', type: 'info_lab' },
{ id: 46, name: 'Seliakiya Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Seliakiya-Paneli.pdf', type: 'info_lab' },
{ id: 47, name: 'Sepsis', pdf: '/assets/innovationsPdfs/InfoLab/Sepsis.pdf', type: 'info_lab' },
{ id: 48, name: 'Sinir Sistemi Xəstəlikləri Paneli', pdf: '/assets/innovationsPdfs/InfoLab/Sinir-sistemi-xestelileri-paneli.pdf', type: 'info_lab' },
{ id: 49, name: 'Sonsuzluğa son!', pdf: '/assets/innovationsPdfs/InfoLab/Sonsuzluga-son-1.pdf', type: 'info_lab' },
{ id: 50, name: 'Sonsuzluğa son', pdf: '/assets/innovationsPdfs/InfoLab/Sonsuzluga-son.pdf', type: 'info_lab' },
{ id: 51, name: 'Sürətli Respirator Panel', pdf: '/assets/innovationsPdfs/InfoLab/Suretli-Respirator-Panel.pdf', type: 'info_lab' },
{ id: 52, name: 'Trombofiliya 6-lı panel', pdf: '/assets/innovationsPdfs/InfoLab/Trombofiliya-6-li-panel.pdf', type: 'info_lab' },
{ id: 53, name: 'Urogenital İnfeksiyalar 7-li Panel', pdf: '/assets/innovationsPdfs/InfoLab/Urogenital-Infeksiyalar.pdf', type: 'info_lab' },
{ id: 54, name: 'PDG  Panel', pdf: '/assets/innovationsPdfs/InfoLab/PDG-PANELİ.pdf', type: 'info_lab' },
{ id: 55, name: 'Saç tökülməsi Paneli', pdf: '/assets/innovationsPdfs/InfoLab/SACH-TOKULME-PANELİ.pdf', type: 'info_lab' },
{ id: 56, name: 'AKNE Paneli', pdf: '/assets/innovationsPdfs/InfoLab/AKNE-PANELİ.pdf', type: 'info_lab' },
{ id: 57, name: 'COVİD-19 Diaqnostikası Panali', pdf: '/assets/innovationsPdfs/InfoLab/COVID-19-DIAQNOSTIKASI.pdf', type: 'info_lab' },
{ id: 58, name: 'COVİD izləmə Paneli', pdf: '/assets/innovationsPdfs/InfoLab/COVİD-IZLEME-PANELI.pdf', type: 'info_lab' },
]);

const openPdf = (pdfUrl) => {
  window.open(pdfUrl, '_blank');
};

const itemsPerPage = 10;
const currentPage = ref(1);

const filteredContent = computed(() => {
return content.value.filter(item => item.type === activeTab.value);
});

const totalPages = computed(() => Math.ceil(filteredContent.value.length / itemsPerPage));

const paginatedContent = computed(() => {
const start = (currentPage.value - 1) * itemsPerPage;
const end = start + itemsPerPage;
return filteredContent.value.slice(start, end);
});

const pages = computed(() => {
const total = totalPages.value;
const current = currentPage.value;
if (total <= 5) {
  return Array.from({ length: total }, (_, i) => i + 1);
} else if (current <= 3) {
  return [1, 2, 3, 4, 5, '...'];
} else if (current >= total - 2) {
  return ['...', total - 4, total - 3, total - 2, total - 1, total];
} else {
  return ['...', current - 1, current, current + 1, '...'];
}
});

const goToPage = (page) => {
if (page === '...') return;
currentPage.value = page;
};

const goToFirstPage = () => {
currentPage.value = 1;
};

const goToPreviousPage = () => {
if (currentPage.value > 1) {
  currentPage.value--;
}
};

const goToNextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value++;
}
};

const goToLastPage = () => {
currentPage.value = totalPages.value;
};
</script>

<style scoped>
.headingBtns button {
  padding: 8px 16px;
  border: 1px solid #6bb52b;
  background-color: transparent;
  cursor: pointer;
  color: #6bb52b;
  border-radius: 2px;
}

.headingBtns button.font-bold {
  font-weight: bold;
  border-bottom: 2px solid #6bb52b;
  background-color: #6bb52b;
  color: #fff;
}

tbody>tr:hover .fa-file-pdf{
  transform: scale(1.1);
}
</style>