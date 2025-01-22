import { createApp } from "vue";
import App from "./App.vue";
import "../style.css";

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import MovieDetailPage from "@/pages/MovieDetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage },
    { path: "/:id", name: "Movie Details", component: MovieDetailPage },
  ],
});

createApp(App).use(router).mount("#app");
