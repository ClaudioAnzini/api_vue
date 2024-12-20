<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { info } from '@/plugins/axios';
import defaultUser from '@/assets/icons/default_user.svg';

import { useFavStore } from '@/stores/favorites';

const favStore = useFavStore();

const authStore = useAuthStore();

const isUserMenuOpen = ref(false);
const isFavoritesMenuOpen = ref(false);

const userMenuRef = ref(null);
const favoritesMenuRef = ref(null);

const loginProcess = ref(false);

function toggleUserMenu() {
    isUserMenuOpen.value = !isUserMenuOpen.value;
    if (isUserMenuOpen.value) closeFavoritesMenu();
}

function toggleFavoritesMenu() {
    isFavoritesMenuOpen.value = !isFavoritesMenuOpen.value;
    if (isFavoritesMenuOpen.value) closeUserMenu();
}

function closeUserMenu() {
    isUserMenuOpen.value = false;
}

function closeFavoritesMenu() {
    isFavoritesMenuOpen.value = false;
}

function handleLogout() {
    authStore.mutations.logout();
    closeUserMenu();
}

function handleLogin() {
    authStore.actions.login();
    loginProcess.value = true;
}

function handleClickOutside(event) {
    if (
        userMenuRef.value &&
        !userMenuRef.value.contains(event.target) &&
        favoritesMenuRef.value &&
        !favoritesMenuRef.value.contains(event.target)
    ) {
        closeUserMenu();
        closeFavoritesMenu();
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    if (localStorage.getItem('user')) {
        favStore.mutations.updateMovies(JSON.parse(localStorage.getItem('user')).id, localStorage.getItem('token'));
        favStore.mutations.updateSeries(JSON.parse(localStorage.getItem('user')).id, localStorage.getItem('token'));
    }
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <header>
        <nav class="dp-rm">
            <div>
                <RouterLink class="logo" to="/">
                </RouterLink>
            </div>
        </nav>
        <nav class="akd-ds-nav">
            <div class="user-things">
                <RouterLink class="user-things-a" href="/cart">
                    <span class="icon">
                        <p>Filmes</p>
                    </span>
                </RouterLink>
                <RouterLink class="user-things-a" href="/cart">
                    <span class="icon">
                        <p>Séries</p>
                    </span>
                </RouterLink>
            </div>
        </nav>
        <nav class="search-nav">
            <div class="search-div">
                <input class="search-input" type="text" placeholder="Procure filmes e series">
                <span class="vr"></span>
                <div class="search-icon-div">
                    <img src="@/assets/icons/search.svg">
                </div>
            </div>
        </nav>
        <nav class="button-nav sort-buttons" ref="userMenuRef">
            <div class="user-things">
                <div class="user-things" ref="favoritesMenuRef">
                    <div class="user-things-a" @click="toggleFavoritesMenu">
                        <span class="icon material-symbols-outlined">favorite</span>
                    </div>
                    <div v-if="isFavoritesMenuOpen" class="user-menu">
                        <div v-if="authStore.getters.isAuthenticated">
                            <h2>Favoritos</h2>
                            <ul class="fav-ul">
                                <li v-for="movie in favStore.state.movies.results" :key="movie.id">
                                    <RouterLink class="fav-item" :to="`/movie/${movie.id}`">
                                        <img :src="`${info.apiAvatar}/t/p/w500${movie.poster_path}`" alt="Movie poster">
                                        <p>{{ movie.title }}</p>
                                        <button @click="favStore.actions.removeMovie(authStore.getters.user.id, authStore.state.token, movie.id)">
                                            <span class="material-symbols-outlined">delete</span>
                                        </button>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            <p>Faça login para ver seus favoritos.</p>
                        </div>
                    </div>
                </div>
                <div v-if="isUserMenuOpen" class="user-menu">
                    <div class="user" v-if="authStore.getters.isAuthenticated">
                        <div class="ur-pi">
                            <img :src="(authStore.getters.user.avatar.tmdb.avatar_path) ? `${info.apiAvatar}/t/p/w500${authStore.getters.user.avatar.tmdb.avatar_path}` : defaultUser"
                                alt="User picture">
                            <h2>Olá, {{ authStore.getters.user.username }}</h2>
                            <div class="ur-dsh-c">
                                <RouterLink class="ur-dsh-c-a" to="/">
                                    <p>Gerenciar meu perfil</p>
                                </RouterLink>
                            </div>
                        </div>
                        <div class="ur-ac">
                            <div class="ur-dsh-b">
                                <button @click="toggleFavoritesMenu" class="ur-dsh-b-a">
                                    <span class="icon material-symbols-outlined">favorite</span>
                                    <p>Favoritos</p>
                                </button>
                                <button @click="handleLogout" class="ur-dsh-b-a">
                                    <p>Sair</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="user" v-else>
                        <div class="ur-dsh-c">
                            <div>
                                <button @click="handleLogin" class="ur-dsh-c-a" :disabled="loginProcess">
                                    <span v-if="loginProcess" class="loading"></span>
                                    <p v-if="!loginProcess">Fazer login</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="user-picture" @click="toggleUserMenu">
                    <img v-if="true"
                        :src="(authStore.getters.user.avatar && authStore.getters.user.avatar.tmdb.avatar_path) ? `${info.apiAvatar}/t/p/w500${authStore.getters.user.avatar.tmdb.avatar_path}` : defaultUser"
                        alt="User picture">
                    <span v-else class="default-icon material-symbols-outlined">person</span>
                </div>
            </div>
        </nav>
    </header>
</template>
<style scoped>

.fav-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
}

.fav-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-decoration: none;
    color: black;
}

.fav-item img {
    height: 50px;
    width: 35px;
    object-fit: cover;
}

.fav-item p {
    font-size: 14px;
    font-weight: 500;
}

.fav-item button {
    background-color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
}

.fav-item button:hover {
    background-color: #E7E7E7;
}

.default-icon {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    color: black;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user {
    min-width: 260px;
}

.ur-dsh-c {
    width: 100%;
}

.ur-dsh-c-a {
    background-color: #1B91BF;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 14px;
    cursor: pointer;
    border: none;
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
    margin-bottom: 0.5rem;
}

.ur-dsh-c-a:hover {
    background-color: #0F6C9D;
}

.ur-dsh-c-a:active {
    background-color: #0A4A6E;
}

.ur-dsh-b-a {
    background-color: white;
    color: black;
    text-decoration: none;
    border: 1px solid #E7E7E7;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    font-size: 14px;
}

.ur-dsh-b-a:hover {
    background-color: #E7E7E7;
}

.ur-dsh-b-a:active {
    background-color: #D9D9D9;
}

.ur-dsh-b-a:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.ur-dsh-b-a:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.ur-dsh-b {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
}

.ur-acc {
    display: flex;
    gap: 0.25rem;
}

.ur-acc button,
.ur-acc a {
    flex: 1;
    border: 1px solid #E7E7E7;
    background-color: white;
    text-align: center;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: black;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

.ur-acc button {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
}

.ur-acc a {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ur-acc-a:hover {
    background-color: #E7E7E7;
}

.ur-acc-a:active {
    background-color: #D9D9D9;
}

.material-symbols-outlined {
    user-select: none;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

header {
    background: none;
    color: #fff;
    padding: 0.75rem 1.25rem;
    display: flex;
    gap: 5rem;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter', sans-serif;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
}

.logo {
    display: block;
    height: 52px;
    width: 104px;
    background-image: url('@/assets/icons/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    margin-left: 1rem;
}

.user-things {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-things-a {
    text-decoration: none;
}

.user-things-a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 7px;
}

.user-picture {
    height: 38px;
    width: 38px;
    border-radius: 50%;
    overflow: hidden;
    background-color: white;
    display: flex;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-picture img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.user-picture:hover {
    opacity: 0.8;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    cursor: pointer;
    gap: 3px;
    text-decoration: none;
    height: 45px;
}

.icon img {
    height: 28px;
    width: 28px;
}

.search-nav {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.akd-ds-nav {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
}

.icon p {
    font-size: 14px;
    font-weight: 500;
    color: white;
}

.search-div {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 7px;
    height: 40px;
    overflow: hidden;
    max-width: 800px;
}

.search-div:hover {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.search-div:has(.search-input:focus) {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.search-input:active.search-div {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.search-input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding-left: 1.5rem;
    font-family: 'Inter', sans-serif;
}

.vr {
    height: 75%;
    width: 1px;
    background-color: #BEBEBE;
}

.search-icon-div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    cursor: pointer;
    padding: 10px;
}

.search-icon-div:hover {
    background-color: #0000000e;
}

.user-menu {
    position: absolute;
    top: 60px;
    right: 1rem;
    background-color: #E7E7E7;
    border-radius: 7px;
    box-shadow: 0px 2px 4px 3px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    color: black;
    z-index: 100;
}

.ur-pi {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ur-pi img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    background-color: white;
    display: flex;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    object-fit: cover;
}

.ur-pi p {
    font-size: 14px;
    font-weight: 500;
}

.ur-pi h2 {
    font-size: 20px;
    font-weight: 500;
}

.loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@media screen and (max-width: 1200px) {
    .icon p {
        display: none;
    }

    header {
        gap: 1rem;
    }
}

@media screen and (max-width: 768px) {
    .logo {
        background-image: url('@/assets/icons/logo-min.svg');
        width: 38px;
        height: 38px;
        margin-left: 0;
    }

    .search-nav .user-things,
    .user-things-a {
        display: none;
    }
}
</style>