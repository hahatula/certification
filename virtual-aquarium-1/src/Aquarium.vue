<script setup>
import Fish from '@/Fish.vue';
defineProps(['fishes'])
</script>

<template>
    <div class="aqua">{{ fishes }}
        <Fish v-for="fish in fishes" :fish="fish"/>
    </div>
</template>

<style scoped>
    .aqua {
        background-image: url(../../public/bg.jpg);
        position: relative;
    }
</style>
