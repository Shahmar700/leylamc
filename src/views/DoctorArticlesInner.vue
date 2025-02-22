<template>
    <div class="container mt-16 text-main-text">
        <h1 class="text-2xl md:text-3xl font-semibold mb-10">{{ article.articleHeader }}</h1>
        <p class="text-base sm:text-lg mt-2">Nəşr tarixi: {{ article.articleDate }}</p>
        <p class="text-base sm:text-lg mt-2">Müəllif: {{ article.articleAuthor }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tableArticles = [
    {id: 1, articleHeader: 'Hamiləliyin ilk üçaylığında ultrasəs müayinəsi', articleDate: '30-12-2020', articleAuthor: 'Yaqut Hüseyn'},
    {id: 2, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Samirə Nəsibova'},
    {id: 3, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Lalə Həsənova'},
    {id: 4, articleHeader: 'Miqren xəstəliyi', articleDate: '30-01-2020', articleAuthor: 'Xanoğlan Qəmbərov'},
    {id: 5, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-10-2020', articleAuthor: 'Leyla Ələkbərova'},
    {id: 6, articleHeader: 'Vertigo şikayəti olan xəstələrə otonevrolojı yanaşma', articleDate: '28-11-2020', articleAuthor: 'Nigar Muradova'},
    {id: 7, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Nübar İsmayılova'},
    {id: 8, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '20-12-2020', articleAuthor: 'Mədinə Dilbazi'},
    {id: 9, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '15-12-2020', articleAuthor: 'Leyla Süleymanova'},
    {id: 10, articleHeader: 'Erkən cinsi inkişafın zərərləri', articleDate: '30-12-2020', articleAuthor: 'Almaz Nəbiyeva'},
];

const article = computed(() => {
    return tableArticles.find(article => article.id === parseInt(route.params.id));
});
</script>

<style scoped>
</style>