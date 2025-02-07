<script setup>
import { onMounted, ref } from "vue";
import { fishMenu } from "./fishMenu";
const props = defineProps(['fish'])

const imageSrc = fishMenu.find(item => item.type === props.fish.fishType)?.src;

const startCoordinates = ref({ 
    x: Math.floor(Math.random()*80) + 10,
    y: Math.floor(Math.random()*80) + 10,
})

let verticalDirection = "up";
let horizontalDirection = ref("left");
let intervalId = null;

const moveFish = () => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (verticalDirection === "up") {
      startCoordinates.value.y--;
      if (startCoordinates.value.y <= 10) verticalDirection = "down";
    } else {
      startCoordinates.value.y++;
      if (startCoordinates.value.y >= 90) verticalDirection = "up";
    }

    if (horizontalDirection.value === "left") {
      startCoordinates.value.x--;
      if (startCoordinates.value.x <= 10) horizontalDirection.value = "right";
    } else {
      startCoordinates.value.x++;
      if (startCoordinates.value.x >= 90) horizontalDirection.value = "left";
    }
  }, 100);
};

onMounted(() => {
        console.log(startCoordinates.value)
        moveFish()
})

</script>

<template>
    <div>
        <button 
            class="fish"
            :class="{'left': horizontalDirection === 'left' }"
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
    .left {
        transform: scaleX(-1);
    }
    .fish:hover {
        border: 2px, solid, yellowgreen;
    }
</style>
