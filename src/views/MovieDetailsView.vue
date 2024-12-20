<script setup>
import { computed, defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
import { useAuthStore } from '@/stores/auth';
import { useFavStore } from '@/stores/favorites';

const movieStore = useMovieStore();

const auth = useAuthStore();

const favStore = useFavStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
});



const hasMovie = computed(() => {
  return favStore.state.movies?.results?.some((movie) => movie.id == props.movieId);
});

const budget = computed(() => {
  if (movieStore.currentMovie.budget) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(movieStore.currentMovie.budget);
  }
  return 'Não informado';
});

const revenue = computed(() => {
  if (movieStore.currentMovie.revenue) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(movieStore.currentMovie.revenue);
  }
  return 'Não informado';
});

const progressStyle = computed(() => {
  const percentage = Math.round(movieStore.currentMovie.vote_average * 10);
  return {
    background: `conic-gradient(#21d07a 0% ${percentage}%, #204529 ${percentage}% 100%)`,
  };
});

</script>

<template>
  <div v-if="movieStore.currentMovie?.title" class="main">
    <div class="content">
      <div class="bg"
        :style="(movieStore.currentMovie.images)? `background-image: url('https://image.tmdb.org/t/p/original/${movieStore.currentMovie.images.backdrops[0].file_path}')` : ''">
        <div class="wt-fw">
          <img :src="`https://image.tmdb.org/t/p/original/${movieStore.currentMovie.poster_path}`"
            :alt="movieStore.currentMovie.title" />

          <div class="details">
            <h1>{{ movieStore.currentMovie.title }} <span class="year">({{
              movieStore.currentMovie.release_date.split("-")[0] }})</span></h1>

            <div class="progress-container">
              <div class="progress-circle" :style="progressStyle">
                <div class="progress-text">{{ Math.round(movieStore.currentMovie.vote_average * 10) }}<sup>%</sup></div>
              </div>
              <span>Avaliação média dos usuarios</span>
            </div>
            <div class="actions">
              <button @click="(hasMovie)? favStore.actions.removeMovie(auth.getters.user.id, auth.state.token, props.movieId) : favStore.actions.addMovie(auth.getters.user.id, auth.state.token, props.movieId)" class="btn-action"><span
                  class="material-symbols-outlined" :style="{ color: hasMovie ? 'red' : 'white' }">
                  favorite
                </span>{{ (hasMovie)? 'Desfavoritar' : 'Favoritar'}}</button>
              <button @click="movieStore.addWatchlist(movieStore.currentMovie)" class="btn-action">
                <span class="material-symbols-outlined">
                  playlist_add
                </span>
                Adicionar à uma
                lista</button>
            </div>
            <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
            <div class="genre-container">
              <span v-for="genre, index in movieStore.currentMovie.genres" :key="index" class="genre">{{ genre.name
                }}</span>
            </div>
            <h2>Sinopse</h2>
            <p class="re-it">{{ movieStore.currentMovie.overview }}</p>
            <h3>Orçamento: {{ budget }}</h3>
            <h3>Receita: {{ revenue }}</h3>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="additional">
    <h2>Elenco</h2>
    <div class="ti-da">
      <div v-if="movieStore.currentMovie?.credits" class="ti-da-ct" v-for="i, index in movieStore.currentMovie.credits.cast" :key="index">
        <img v-if="i.profile_path" :src="`https://image.tmdb.org/t/p/w92${i.profile_path}`" :alt="i.name" />
        <img v-else :src="`https://via.placeholder.com/92x46.png?text=${i.name}`" :alt="i.name" />

        <div class="text-side">
          <p class="char">{{ i.character }}</p>
          <p>{{ i.name }}</p>
        </div>  
      </div>
    </div>
    <h2>Elenco</h2>
    <div class="ti-da">
      <div v-if="movieStore.currentMovie?.production_companies" class="ti-da-ct"  v-for="i, index in movieStore.currentMovie.production_companies" :key="index">
        <img v-if="i.logo_path" :src="`https://image.tmdb.org/t/p/w92${i.logo_path}`" :alt="i.name" />
        <img v-else :src="`https://via.placeholder.com/92x46.png?text=${i.name}`" :alt="i.name" />

        <div class="text-side">
          <p class="char">{{ i.character }}</p>
          <p>{{ i.name }}</p>
        </div>  
      </div>
    </div>
  </div>

</template>

<style scoped>

.char {
  font-weight: bold;
  font-size: 2.75rem;
  margin: 0;
}

.additional h2 {
  margin: 0;
}

.ti-da {
  display: flex;
  gap: 1rem;
  max-width: 100%;
  overflow: auto;
  padding: 1rem;
}

.ti-da-ct {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
  max-width: 100%;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.ti-da-ct img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.ti-da-ct p {
  margin: 0;
  font-size: 0.75rem;
  font-weight: bold;
  color: #000000;
  text-transform: uppercase;
  max-width: 100%;
  text-align: center;
}



.additional {
  padding: 0 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.btn-action {
  padding: 0.5rem 1rem;
  background-color: rgb(3, 37, 65);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.genre-container {
  display: flex;
  margin-bottom: 1rem;
}

.genre {
  background-color: rgb(3, 37, 65);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.details h2 {
  font-size: 1.25rem;
  margin: 0;
}

.re-it {
  margin: 0;
  margin-left: 0.5rem;
}

.tagline {
  font-style: italic;
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 0.5rem !important;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  font-family: Arial, sans-serif;
}

.progress-circle {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: conic-gradient(#21d07a 0% 70%, #204529 70% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #081C22;
  font-family: "Poppins", serif;
  font-weight: 600;
  font-style: normal;
}

.progress-text {
  position: relative;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
}

.progress-circle sup {
  font-size: 9px;
  font-weight: 300;
}

.progress-circle::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #081C22;
}

.progress-text {
  position: relative;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
}

.text-side {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.2;
}

.year {
  font-weight: 300;
  color: #ccc;
}

.companies {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
}

.bg {
  background-position: left calc((50vw - 170px) - 340px) top;
  background-size: cover;
  background-repeat: no-repeat;
}

.wt-fw {
  color: white;
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background-image: linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%);
  justify-content: center;
  padding-top: 7rem;
}

.wt-fw img {
  width: 300px;
  height: 450px;
  border-radius: 10px;
}

.details {
  max-width: 650px;
}

.details h1 {
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
}
</style>
