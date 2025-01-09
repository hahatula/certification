<script setup>
const props = defineProps({
  movie: Object,
})

const {name, description, image, rating, genres, inTheaters} = props.movie;
</script>

<template>
    <div class="bg-white flex flex-col gap-2 max-w-80 rounded-2xl overflow-hidden border ">
        <div class="h-96 relative">
            <img :src="image" :alt="name" class="h-full w-full object-cover">
        </div>
        <div class="p-4 flex flex-col justify-between h-full gap-2">
            <div>
                <h2 class="font-bold mb-2">{{ name }}</h2>
                <p class="mb-4">{{ description }}</p>
            </div>
            <div>
                <span class="inline mr-2 bg-indigo-500 py-1 px-2 rounded-2xl text-white" v-for="g in genres" :key="g">{{ g }}</span>
                <div class="mt-2">
                    Raiting: ({{ rating }}/5) <span v-for="n in rating">⭐️</span>
                </div>
            </div>
        </div>
    </div>
</template>