<script setup>
import {ref} from "vue";

const questions = ref([
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Earth", "Mars", "Venus", "Mercury"],
    answer: "Mercury",
  },
  // Add more questions as needed
]);

const picked = ref({})
questions.value.forEach(q => {
  picked.value[q.question] = '';
})

const qNumber = ref(0);
const answered = ref(false);
const result = ref('')
const correct = ref(0);

const submitAnswer = () => {
  console.log('check')
  if (picked.value[questions.value[qNumber.value].question] === questions.value[qNumber.value].answer) {
    correct.value++;
    result.value = 'Correct!'
  } else {
    result.value = 'Wrong!'
  }
  answered.value = true;
}

const nextStep = () => {
  console.log('next')
  qNumber.value++
  answered.value = false;
  result.value = ''
  console.log(qNumber.value)
}
</script>

<template>
  <div v-if="qNumber > questions.length - 1" class="self-center">Your final score: {{ correct }} out of {{ questions.length }}</div>
  <div v-for="(q, index) in questions" :key="q.question" v-show="index === qNumber" class="question-item">
    {{ q.question}}
    <div class="option-list">
      <label v-for="o in q.options" :for="o">
        <input type="radio" :id="o" :value="o" v-model="picked[q.question]" :disabled="answered"/>
        {{o}}
      </label>
    </div>
    <p v-if='result'>{{result}}</p>
    <button v-if="!answered" @click="submitAnswer" :disabled="!picked[q.question]">Submit</button>
    <button v-else @click="nextStep">Next</button>
  </div>
</template>

<style scoped>
.question-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: center;
}

 .option-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
 }
</style>
