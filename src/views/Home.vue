<script setup>
import { info } from '@/plugins/axios';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
</script>

<template>
  <h1>Home</h1>
  <p>Seja bem-vindo ao site de filmes e programas de TV!</p>

  <button v-if="!authStore.getters.isAuthenticated" @click="authStore.actions.login()">Fazer Login</button>

  <div v-if="authStore.getters.isAuthenticated">
    <button @click="authStore.mutations.logout()">Fazer Logout</button>
    <span>Olá, {{ authStore.getters.user.username }}</span>
    <img :src="`${info.apiAvatar}/t/p/w500${authStore.getters.user.avatar.tmdb.avatar_path}`" />
  </div>


</template>
