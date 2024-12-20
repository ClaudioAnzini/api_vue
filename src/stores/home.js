import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useHomeStore = defineStore('home', () => {
    const state = {
        popularMovies: ref([]),
        topRatedMovies: ref([]),
        upcomingMovies: ref([]),
        nowPlayingMovies: ref([]),

        popularTv: ref([]),
        topRatedTv: ref([]),
        airingTodayTv: ref([]),
        onTheAirTv: ref([]),
    };
        
    const popularMovies = computed(() => state.popularMovies.value);

    const getPupularMovies = async () => {
        const response = await api.get('movie/popular?language=pt-BR');
        state.popularMovies.value = response.data;
    };

    const topRatedMovies = computed(() => state.topRatedMovies.value);

    const getTopRatedMovies = async () => {
        const response = await api.get('movie/top_rated?language=pt-BR');
        state.topRatedMovies.value = response.data;
    }

    const upcomingMovies = computed(() => state.upcomingMovies.value);  

    const getUpcomingMovies = async () => {
        const response = await api.get('movie/upcoming?language=pt-BR');
        state.upcomingMovies.value = response.data;
    }

    const nowPlayingMovies = computed(() => state.nowPlayingMovies.value);

    const getNowPlayingMovies = async () => {
        const response = await api.get('movie/now_playing?language=pt-BR');
        state.nowPlayingMovies.value = response.data;
    }
    
    const popularTv = computed(() => state.popularTv.value);

    const getPupularTv = async () => {
        const response = await api.get('tv/popular?language=pt-BR');
        state.popularTv.value = response.data;
    };

    const topRatedTv = computed(() => state.topRatedTv.value);

    const getTopRatedTv = async () => {
        const response = await api.get('tv/top_rated?language=pt-BR');
        state.topRatedTv.value = response.data;
    }

    const onTheAirTv = computed(() => state.onTheAirTv.value);

    const getOnTheAirTv = async () => {
        const response = await api.get('tv/on_the_air?language=pt-BR');
        state.onTheAirTv.value = response.data;
    }

    const airingTodayTv = computed(() => state.airingTodayTv.value);

    const getAiringTodayTv = async () => {
        const response = await api.get('tv/airing_today?language=pt-BR');
        state.airingTodayTv.value = response.data;
    }

    return { popularMovies, topRatedMovies, upcomingMovies, nowPlayingMovies, popularTv, topRatedTv, onTheAirTv, airingTodayTv, getPupularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies, getPupularTv, getTopRatedTv, getOnTheAirTv, getAiringTodayTv };

});
