<script setup>
import {ref} from 'vue'
import { StarIcon } from "@heroicons/vue/24/solid"
const props = defineProps({
  movie: Object,
})

const {name, description, image, rating, genres, inTheaters} = props.movie;
const userRating = ref(rating)
const setUserRating = (n) => {
    return userRating.value = n;
}
</script>

<template>
    <div class="bg-white flex flex-col gap-2 max-w-80 rounded-2xl overflow-hidden border ">
        <div class="h-96 relative">
            <div class="h-11 w-11 right-1 top-1 absolute flex items-center">
                <StarIcon 
                class="h-full w-full absolute"
                :class="rating ? 'text-yellow-500' : 'text-gray-500'"
                />
                <p class="w-full z-10 text-center opacity-50">{{ rating || '-' }}</p>
            </div>
            <img :src="image" :alt="name" class="h-full w-full object-cover">
        </div>
        <div class="p-4 flex flex-col justify-between h-full gap-2">
            <div>
                <h2 class="font-bold mb-2">{{ name }}</h2>
                <p class="mb-4">{{ description }}</p>
            </div>
            <div>
                <span class="inline mr-2 bg-indigo-500 py-1 px-2 rounded-2xl text-white" v-for="g in genres" :key="g">{{ g }}</span>
                <div class="mt-2 flex items-center gap-1">
                    Raiting: ({{ userRating || '-' }}/5) 
                    <button 
                    v-for="n in 5" 
                    :key="`star-${n}`"
                    :disabled="userRating === n"
                    @click="setUserRating(n)"
                    >
                        <StarIcon  
                        class="h-5 w-5"
                        :class="n <= userRating ? 'text-yellow-500' : 'text-gray-500'"
                        />
                </button> 
                </div>
            </div>
        </div>
    </div>
</template>