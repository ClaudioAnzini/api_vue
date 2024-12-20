<script setup>
import { computed, defineProps, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import listComponent from '@/components/listComponent.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore();

onMounted(async () => {
    await homeStore.getPupularMovies();
    await homeStore.getTopRatedMovies();
    await homeStore.getUpcomingMovies();
    await homeStore.getNowPlayingMovies();

    await homeStore.getPupularTv();
    await homeStore.getTopRatedTv();
    await homeStore.getOnTheAirTv();
    await homeStore.getAiringTodayTv();
});

const aaaaaaaaa = computed(() => {
    if (homeStore.popularMovies.results) {
        homeStore.popularMovies.results.forEach((movie) => { movie.to = `/movie/${movie.id}` })
    }
    if (homeStore.topRatedMovies?.results) {
        homeStore.topRatedMovies.results.forEach((movie) => { movie.to = `/movie/${movie.id}` })
    }
    if (homeStore.upcomingMovies?.results) {
        homeStore.upcomingMovies.results.forEach((movie) => { movie.to = `/movie/${movie.id}` })
    }
    if (homeStore.nowPlayingMovies?.results) {
        homeStore.nowPlayingMovies.results.forEach((movie) => { movie.to = `/movie/${movie.id}` })
    }

    if (homeStore.popularTv?.results) {
        homeStore.popularTv.results.forEach((movie) => { movie.to = `/tv/${movie.id}`, movie.title = movie.name, movie.poster_path = movie.backdrop_path })
    }
    if (homeStore.topRatedTv?.results) {
        homeStore.topRatedTv.results.forEach((movie) => { movie.to = `/tv/${movie.id}`, movie.title = movie.name, movie.poster_path = movie.backdrop_path })
    }
    if (homeStore.onTheAirTv?.results) {
        homeStore.onTheAirTv.results.forEach((movie) => { movie.to = `/tv/${movie.id}`, movie.title = movie.name, movie.poster_path = movie.backdrop_path })
    }
    if (homeStore.airingTodayTv?.results) {
        homeStore.airingTodayTv.results.forEach((movie) => { movie.to = `/tv/${movie.id}`, movie.title = movie.name, movie.poster_path = movie.backdrop_path })
    }

});
</script>

<template>
    {{ aaaaaaaaa }}
    <div class="main">
        <div v-if="homeStore.popularMovies.results" class="container">
            <listComponent title="Filmes Populares" :itens="homeStore.popularMovies.results" />
        </div>

        <div v-if="homeStore.topRatedMovies.results" class="container">
            <listComponent title="Filmes Mais Bem Avaliados" :itens="homeStore.topRatedMovies.results" />
        </div>

        <div v-if="homeStore.upcomingMovies.results" class="container">
            <listComponent title="Filmes que Estão Por Vir" :itens="homeStore.upcomingMovies.results" />
        </div>

        <div v-if="homeStore.nowPlayingMovies.results" class="container">
            <listComponent title="Filmes em Cartaz" :itens="homeStore.nowPlayingMovies.results" />
        </div>

        <div v-if="homeStore.popularTv.results" class="container">
            <listComponent title="Séries Populares" :itens="homeStore.popularTv.results" />
        </div>

        <div v-if="homeStore.topRatedTv.results" class="container">
            <listComponent title="Séries Mais Bem Avaliadas" :itens="homeStore.topRatedTv.results" />
        </div>

        <div v-if="homeStore.onTheAirTv.results" class="container">
            <listComponent title="Séries no Ar" :itens="homeStore.onTheAirTv.results" />
        </div>

        <div v-if="homeStore.airingTodayTv.results" class="container">
            <listComponent title="Séries que Estão Passando" :itens="homeStore.airingTodayTv.results" />
        </div>

    </div>


</template>

<style scoped>
.main {
    border-top: 76px solid #0d253f;
}

.container {
    display: flex;
    padding: 20px;
    gap: 1rem;
    justify-content: center;
    max-width: 100%;
    box-sizing: border-box;
}
</style>
