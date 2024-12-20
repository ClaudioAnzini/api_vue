import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
  });

  const currentMovie = computed(() => state.currentMovie);

  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}?language=pt-BR`);
    state.currentMovie = response.data;

    const images = await api.get(`movie/${movieId}/images`);
    state.currentMovie.images = images.data;

    const credits = await api.get(`movie/${movieId}/credits?language=pt-BR`);
    state.currentMovie.credits = credits.data;
  };

  return { currentMovie, getMovieDetail };
});
