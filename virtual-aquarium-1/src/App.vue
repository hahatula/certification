<script setup>
import {ref} from 'vue';
import Aquarium from "@/Aquarium.vue";
import FishForm from "@/FishForm.vue";

const fishes = ref([]);

const addFish = (fish) => {
    console.log(fish)
    fishes.value.push(fish)
}
</script>
<template>
    <div class="app-grid">
        <Aquarium :fishes/>
        <FishForm @addFish="addFish"/>
    </div>
</template>

<style scoped>
    .app-grid {
     display: grid;
     grid-template-rows: 1fr 300px;
     min-height: 100vh;
     min-width: 100vw;
    }
</style>
