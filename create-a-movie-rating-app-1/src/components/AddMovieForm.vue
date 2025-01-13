<script setup>
import {ref} from 'vue'
const emit = defineEmits(['submit-adding', 'close'])

const name = ref('')
const description = ref('')
const image = ref('')
const genres = ref([])
const inTheaters = ref(false)

const cleanForm = () => {
    name.value = '';
    description.value = '';
    image.value = '';
    genres.value = [];
    inTheaters.value = false;
    emit('close')
}

const submitForm = () => {
    const newMovie = {
        name: name.value,
        description: description.value,
        image: image.value,
        genres: genres.value,
        inTheaters: inTheaters.value,
    }
    emit('submit-adding', newMovie)
    cleanForm();
}
</script>

<template>
<div class="bg-gray-950/50 w-full fixed flex flex-col gap-5 justify-center p-4 overflow-y-scroll overflow-x-hidden min-h-screen top-0">
    <form @submit.prevent="submitForm" class="flex flex-col gap-3 bg-gray-400 w-96 self-center p-4 rounded" >
        <h2>Add a movie</h2>
        <input v-model="name" class="p-2 rounded" type="text" required placeholder="Name">
        <textarea v-model="description" class="p-2 rounded" type="text" placeholder="Description"></textarea>
        <input v-model="image" class="p-2 rounded" type="text" placeholder="Image">
        <select v-model="genres" class="p-2 rounded" required multiple>
            <option disabled value="">Select genres</option>
            <option  value="Crime">Crime</option>
            <option  value="Drama">Drama</option>
            <option  value="Action">Action</option>
            <option  value="Biography">Biography</option>
        </select>
        <label class="p-2 rounded">
            <input v-model="inTheaters" type="checkbox">
            Is in theaters
        </label>
       <div class="flex gap-3 justify-center">
         <button @click="cleanForm" type="button" class="bg-fuchsia-200 w-max self-center px-5 py-2 rounded text-gray-800 hover:bg-fuchsia-800">Cancel</button>
         <button type="submit" class="bg-fuchsia-600 w-max self-center px-5 py-2 rounded text-white hover:bg-fuchsia-800">Add</button>
       </div>
    </form>
</div>
</template>