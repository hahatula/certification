<script setup>
import { ref, computed, onUnmounted } from "vue";
import CountdownHeader from "@/components/CountdownHeader.vue";
import CountdownSegment from "@/components/CountdownSegment.vue";

const now = ref(new Date());
const timer = setInterval(() => (now.value = new Date()), 1000);
onUnmounted(() => clearInterval(timer));

const nextYear = computed(
  () => new Date(now.value.getFullYear() + 1, 0, 1, 0, 0, 0, 0),
);

const timeLeft = computed(() => nextYear.value - now.value);
const daysLeft = computed(() =>
  Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)),
);
const hoursLeft = computed(() =>
  Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
);
const minutesLeft = computed(() =>
  Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)),
);
const secondsLeft = computed(() =>
  Math.floor((timeLeft.value % (1000 * 60)) / 1000),
);
</script>
<template>
  <div class="app-wrapper">
    <div class="countdown-box">
      <CountdownHeader />
      <main class="flex justify-center">
        <CountdownSegment data-test="days" label="days" :number="daysLeft" />
        <CountdownSegment data-test="hours" label="hours" :number="hoursLeft" />
        <CountdownSegment
          data-test="minutes"
          label="minutes"
          :number="minutesLeft"
        />
        <CountdownSegment
          data-test="seconds"
          label="seconds"
          :number="secondsLeft"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  @apply flex items-center justify-center w-full h-full p-10;
}
.countdown-box {
  @apply shadow-md relative bg-white p-5 rounded-lg border-gray-100 border-[1px];
}
body {
  @apply bg-gray-100;
}
</style>
