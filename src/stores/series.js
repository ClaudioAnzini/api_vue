import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useSerieStore = defineStore('serie', () => {
  const state = reactive({
    currentSerie: {},
  });

  const currentSerie = computed(() => state.currentSerie);

  const getSerieDetail = async (serieId) => {
    const response = await api.get(`tv/${serieId}?language=pt-BR`);
    state.currentSerie = response.data;

    const images = await api.get(`tv/${serieId}/images`);
    state.currentSerie.images = images.data;

    const credits = await api.get(`tv/${serieId}/credits?language=pt-BR`);
    state.currentSerie.credits = credits.data;
  };

  return { currentSerie, getSerieDetail };
});
