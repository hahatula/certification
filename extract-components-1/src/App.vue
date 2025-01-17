<script setup>
import { computed, reactive, ref } from "vue";
import { items } from "./movies.json";
import MovieItem from '@/MovieItem.vue'
import MovieForm from '@/MovieForm.vue'

const movies = ref(items);
const modelValue = ref();

function updateRating(movieId, rating) {
  const movie = movies.value.find((movie) => movie.id === movieId);
  movie.rating = rating;
}
function removeMovie(movieId) {
  movies.value = movies.value.filter((movie) => movie.id !== movieId);
}
function editMovie(movieId) {
  const movie = movies.value.find((movie) => movie.id === movieId);
  modelValue.value = movie;
  console.log(modelValue.value)
  showForm();
}

function saveMovie(movie) {
  const isNew = !movies.value.find((m) => m.id === movie.id);
  if (!isNew) {
    updateMovie(movie);
  } else {
    addMovie(movie);
  }
}

function updateMovie(movie) {
    movies.value = movies.value.map((m) => {
      if (m.id === movie.id) {
        movie.rating = m.rating;
        return movie;
      }
      return m;
    });

    hideForm();
}

function addMovie(movie) {
    movies.value.push(movie);
    hideForm();
}

const showMovieForm = ref(false);
function hideForm() {
  modelValue.value = null
  showMovieForm.value = false; 
}

function showForm() {
  showMovieForm.value = true;
}

const averageRating = computed(() => {
  const avg = movies.value
    .map((movie) => parseInt(movie.rating || 0))
    .reduce((a, b) => a + b, 0);

  return Number(avg / movies.value.length).toFixed(1);
});

const totalMovies = computed(() => {
  return movies.value.length;
});

function removeRatings() {
  movies.value = movies.value.map((movie) => {
    movie.rating = 0;
    return movie;
  });
}
</script>

<template>
  <div class="app bg-gray-900">
    <div v-if="showMovieForm" class="modal-wrapper">
      <MovieForm
        :modelValue="modelValue"
        @update:modelValue="saveMovie"
        @cancel="hideForm"
      />
      
    </div>
    <div class="movie-actions-list-wrapper">
      <div class="movie-actions-list-info">
        <span>Total Movies: {{ totalMovies }}</span>
        <span> / </span>
        <span>Average Rating: {{ averageRating }}</span>
      </div>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="self-end movie-actions-list-action-button button-primary justify-self-end"
          @click="removeRatings"
        >
          Remove Ratings
        </button>
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
        v-for="(movie, movieIndex) in movies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @remove="removeMovie"
        @update:rating="updateRating"/>  
    </div>
  </div>
</template>
