import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import FavoritesService from '@/services/favorites'

export const useFavStore = defineStore('favorites', () => {
    const state = {
        movies: ref([]),
        series: ref([]),
    }
    const mutations = {
        updateMovies: async (accountId, sessionId) => {
            state.movies.value = await FavoritesService.getFavoriteMovies(accountId, sessionId)
        },
        updateSeries: async (accountId, sessionId) => {
            state.series.value = await FavoritesService.getFavoriteSeries(accountId, sessionId)
        },
    }

    const actions = {
        addMovie: async (accountId, sessionId, movieId) => {
            const response = await FavoritesService.addFavoriteMovie(accountId, sessionId, movieId)
            if (response) {
                mutations.updateMovies(accountId, sessionId)
            }
        },
        addSeries: async (accountId, sessionId, seriesId) => {
            const response = await FavoritesService.addFavoriteSeries(accountId, sessionId, seriesId)
            if (response) {
                mutations.updateSeries(accountId, sessionId)
            }
        },

        removeMovie: async (accountId, sessionId, movieId) => {
            const response = await FavoritesService.removeFavoriteMovie(accountId, sessionId, movieId)
            if (response) {
                mutations.updateMovies(accountId, sessionId)
            }
        },

        removeSeries: async (accountId, sessionId, seriesId) => {
            const response = await FavoritesService.removeFavoriteSeries(seriesId)
            if (response) {
                mutations.updateSeries(accountId, sessionId)
            }
        },
    }

    const getters = {
        movies: computed(() => state.movies.value),
        series: computed(() => state.series.value),
    }

    return { state, mutations, actions, getters }
})
