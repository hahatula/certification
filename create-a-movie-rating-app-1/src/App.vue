<script setup>
import { ref } from 'vue'
import { items } from "./movies.json";
import MovieCard from "@/components/MovieCard.vue"
import AddMovieForm from "@/components/AddMovieForm.vue"

const movies = ref(items)
const isFormOpened = ref(false)

const openAddMoviesForm = () => {
  isFormOpened.value = true;
}

const closeAddMoviesForm = () => {
  isFormOpened.value = false;
}

const addMovie = (movie) => {
  console.log(movie)
  movies.value.push(movie)
}
</script>

<template>
  <div class="bg-gray-950 w-full flex flex-col gap-5 justify-center p-4 overflow-y-scroll overflow-x-hidden min-h-screen">
    <h1 class="text-white text-center text-5xl py-4">Movies</h1>
    <button @click="openAddMoviesForm" class="bg-fuchsia-600 w-max self-center px-5 py-2 rounded text-white hover:bg-fuchsia-800">Add movie</button>
    <ul class="flex flex-wrap gap-4 content-start justify-center">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </ul>
  </div>
  <AddMovieForm v-if="isFormOpened" @submit-adding="addMovie" @close="closeAddMoviesForm"/>
</template>
