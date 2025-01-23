<script setup>
import { ref, computed } from "vue";

const player = ref("X");
const switchPlayer = () => {
  return player.value === "X" ? (player.value = "O") : (player.value = "X");
};

const startValue = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};
const casesToWin = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const values = ref({ ...startValue });

const isWinner = computed(() => {
  for (const combination of casesToWin) {
    const [a, b, c] = combination;

    if (
      values.value[a] &&
      values.value[a] === values.value[b] &&
      values.value[a] === values.value[c]
    )
      return values.value[a];
  }
  return null;
});

const isFinished = computed(() => {
  return isWinner.value || Object.values(values.value).every((v) => v !== null);
});

const handleClick = (n) => {
  // check the choice is availible
  if (values.value[n] || isWinner.value) return;

  values.value[n] = player.value;
  if (!isWinner.value) switchPlayer();
};

const restart = () => {
  isWinner.value = null;
  player.value = "X";
  values.value = { ...startValue };
};
</script>

<template>
  <div class="flex flex-col gap-2 justify-center ml-auto mr-auto mt-60 w-60">
    <h1 class="text-center">Tic-tac-toe</h1>
    <p v-if="isWinner || isFinished" class="text-center font-bold">
      {{ `${isWinner ? `Player ${player} won!` : "No winner this time"}` }}
    </p>
    <p v-else class="text-center">Player {{ player }}'s turn</p>
    <div class="tick-grid">
      <button
        v-for="n in 9"
        :key="n"
        class="w-10 h-10 border-2 border-green-900"
        @click="handleClick(n)"
      >
        {{ values[n] || "" }}
      </button>
    </div>
    <button
      v-if="isFinished"
      class="border-2 border-green-900 p-1 inline"
      @click="restart"
    >
      Start new game
    </button>
  </div>
</template>

<style>
.tick-grid {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  align-self: center;
}
</style>
