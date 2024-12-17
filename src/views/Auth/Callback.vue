<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const urlParams = new URLSearchParams(window.location.search);

const requestToken = urlParams.get('request_token');
const approved = urlParams.get('approved');

if (requestToken && approved) {
    authStore.actions.storeLogin(requestToken);
    router.push('/');
} else {
    alert('Você não autorizou o acesso ao site. Por favor, tente novamente.');
    router.push('/');
}

</script>
<template>
    <h1>Callback</h1>
    <p>Redirecionando...</p>
</template>