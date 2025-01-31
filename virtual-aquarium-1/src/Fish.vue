<script setup>
import { fishMenu } from "./fishMenu";
const props = defineProps(['fish'])

const imageSrc = fishMenu.find(item => item.type === props.fish.fishType)?.src;

const startCoordinates = { 
    x: Math.floor(Math.random()*100),
    y: Math.floor(Math.random()*100),
}

</script>

<template>
    <div>
        <button 
            class="fish"
            :style="{'top': startCoordinates.y + '%', 'left': startCoordinates.x + '%'}"
            @click.prevent="handleFishClick(fish)">
            <img :src="imageSrc"/>
            {{ fish.fishName }}
        </button>
    </div>
    {{ startCoordinates }}
</template>

<style scoped>
    .fish {
        max-width: 100px;
        position: absolute;
    }
    .fish:hover {
        border: 2px, solid, yellowgreen;
    }
</style>
