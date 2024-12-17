import { computed, ref } from 'vue'
import auth from '../services/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const state = {
        token: ref(localStorage.getItem('token') || ''),
        user: ref({}),
    }
    const mutations = {
        setToken: async (token) => {
            state.token.value = token
            localStorage.setItem('token', token)
        },
        logout: async () => {
            state.token.value = ''
            state.user.value = {}
            localStorage.removeItem('token')
        },
        updateUser: async () => {
            try {
                state.user.value = await auth.getUser(state.token.value)
            } catch (error) {
                alert('Não foi possível atualizar o usuário: ' + error)
                await mutations.logout()
            }
        },
    }
    const actions = {
        login: async () => {
            await auth.createRequestToken()
        },
        storeLogin: async (requestToken) => {
            try {
                const a = await auth.createSession(requestToken)
                if(a) {
                    await mutations.setToken(a)
                    await mutations.updateUser()
                }
            } catch (error) {
                alert('Não foi possível criar a sessão:' + error)
            }
        },
    }
    const getters = {
        isAuthenticated: computed(() => {
            return state.token.value !== ''
        }),
        user: computed(() => state.user.value),
    }

    if (state.token) {
        mutations.updateUser()
    }

    return { state, mutations, actions, getters }
})
