<script setup>
defineProps({
    title: String | null,
    default: null
})

defineEmits(['close'])
</script>

<template>
    <div class="modal-wrapper">
        <div class="modal-wrapper-inner relative">
            <button @click="$emit('close')" class="absolute right-4 top-4">X</button>
            <h2 v-if="title" class="text-center text-lg font-semibold">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>