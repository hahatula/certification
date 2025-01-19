<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";
defineProps({
  title: { type: String, default: null },
  show: { type: Boolean, default: false }
});

defineEmits(["close"]);
</script>

<template>
  <Transition name="modal">
  <div v-if="show" class="modal-wrapper">
      <div class="modal-wrapper-inner">
        <button class="modal-close-button" @click="$emit('close')">
          <XMarkIcon class="w-8 h-8" />
        </button>
        <h3 class="modal-title" v-if="title">{{ title }}</h3>
          <div class="modal-inner">
            <slot />
          </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-enter-active,
.modal-leave-active,
.modal-enter-active .modal-wrapper-inner,
.modal-leave-active .modal-wrapper-inner {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-wrapper-inner,
.modal-leave-to .modal-wrapper-inner {
  transform: translateY(30px);
}
</style>
