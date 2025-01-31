<script setup>
import {ref} from "vue";
import { fishMenu } from "./fishMenu";
// defineProps(['fishMenu'])
const emit = defineEmits(['addFish'])
    
const createdFish = ref({
    fishType: "",
    fishName: "",
})

const handleFishClick = (fish) => {
    createdFish.value.fishType = fish.type;
}

const addFish = () => {
    const {fishName, fishType} = createdFish.value;
    if (!fishName || !fishType) return;

    emit('addFish', {fishName, fishType});
    createdFish.value = {
    fishType: "",
    fishName: "",
}
}

</script>

<template>
    <form @submit.prevent="addFish">
        <label for="fish-type">Fish type:</label>
        <ul class="fish-list">
            <button 
                v-for="fish in fishMenu"
                :key="fish.src"
                class="fish" 
                :class="fish.type === createdFish.fishType ? 'chosen' : ''"
                @click.prevent="handleFishClick(fish)"
                type="button"
                >
                <img :src="fish.src"/>
            </button>
        </ul>
        <label for="fish-type">Fish name:</label>
        <input type="text" v-model="createdFish.fishName">
        <button type="submit">Add new fish</button>
    </form>
</template>

<style scoped>
    .fish-list {
        margin: 20px;
        display: flex;
        gap: 30px;
    }
    .fish {
        max-width: 100px;
    }
    .fish:hover {
        border: 2px, solid, yellowgreen;
    }
    .fish.chosen {
        border: 2px, solid, red;
    }
</style>
