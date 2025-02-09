<script setup>
import MovieItem from "@/MovieItem.vue";
import { items } from "./movies.json";
import { computed, ref, defineAsyncComponent } from "vue";

// async components
const AppModal = defineAsyncComponent(() => import("@/AppModal.vue"));
const MovieForm = defineAsyncComponent(() => import("@/MovieForm.vue"));

const movies = ref(items);
const currentMovie = ref();
function updateRating(id, rating) {
  movies.value = movies.value.map((movie) => {
    if (movie.id === id) {
      movie.rating = rating;
    }
    return movie;
  });
}
function removeMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id);
}
function editMovie(id) {
  currentMovie.value = movies.value.find((movie) => movie.id === id);
  showForm();
}
function saveMovie(data) {
  const isNew = !movies.value.find((movie) => movie.id === data.id);
  if (isNew) {
    addMovie(data);
  } else {
    updateMovie(data);
  }
}
function updateMovie(data) {
  movies.value = movies.value.map((m) => {
    if (m.id === data.id) {
      data.rating = m.rating;
      return data;
    }
    return m;
  });
  hideForm();
}
function addMovie(data) {
  movies.value.push(data);
  hideForm();
}

// movie form
const showMovieForm = ref(false);
function hideForm() {
  showMovieForm.value = false;
  currentMovie.value = null;
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
    movie.rating = null;
    return movie;
  });
}
</script>

<template>
  <div class="app bg-gray-900">
    <!-- <Transition> -->
      <AppModal
      :show="showMovieForm"
      :title="currentMovie?.id ? 'Edit Movie' : 'Add Movie'"
      @close="hideForm()"
      >
        <MovieForm
        v-if="showMovieForm"
        @update:modelValue="saveMovie"
        :modelValue="currentMovie"
        @cancel="hideForm"
        />
    </AppModal>
  <!-- </Transition> -->
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
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @remove="removeMovie"
        @update:rating="updateRating"
      />
    </div>
  </div>
</template>

<!-- <style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active .modal-wrapper-inner {
  transition: all 0.3s ease-out;
  transition-delay: 0.5s;
}

.v-leave-active .modal-wrapper-inner {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from .modal-wrapper-inner,
.v-leave-to .modal-wrapper-inner {
  transform: translateX(30px);
  opacity: 0;
}
</style> -->