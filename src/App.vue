<script setup>
import logo from '@/assets/img/logo.png'
</script>

<template>
  <header>
    <nav>
      <div id="logo">
        <img :src="logo" alt="Logo" />
      </div>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquise aqui..."
          @keyup.enter="handleSearch"
          class="search-input"
        />
      </div>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  height: 5rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}
#app img {
  display: flex;
  align-items: center;
  margin-right: 2rem;
  width: 10rem;
}
.search-input {
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  width: 20rem;
}
</style>
