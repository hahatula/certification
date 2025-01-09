<script setup>
import { ref } from 'vue'
import { items } from "./movies.json";
import MovieCard from "@/components/MovieCard.vue"
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
// import { StarIcon } from "@heroicons/vue/24/solid";

const movies = ref(items)
</script>

<template>
  <!-- This is where your template goes	-->
  <div class="bg-gray-950 w-full flex flex-col gap-5 justify-center p-4 overflow-y-scroll overflow-x-hidden min-h-screen">
    <h1 class="text-white text-center text-5xl py-4">Movies</h1>
    <ul class="flex flex-wrap gap-4 content-start justify-center">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </ul>
  </div>
</template>
