<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const tasks = ref([
  { id: 1, name: "Task 1" },
  { id: 2, name: "Task 2" },
  { id: 3, name: "Task 3" },
]);

const lastId = ref(tasks.value.length);
const addTask = () => {
  const newTask = { id: Math.random(), name: `Task ${lastId.value + 1}` };
  tasks.value.push(newTask);
  lastId.value++;
};
const removeTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};
</script>
<template>
  <div class="wrapper">
    <h1>Task List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="text" v-model="task.name" />
        <button @click="removeTask(task.id)" data-test="button-remove">
          <XMarkIcon class="w-full h-full" />
        </button>
      </li>
    </ul>
    <button @click="addTask" data-test="button-add">Add Task</button>
  </div>
</template>
