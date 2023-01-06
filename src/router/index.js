import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";
import HomeView from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import NotAllowed from "../views/NotAllowed.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/question/:id",
      name: "question",
      component: () => import("../views/Question.vue"),
    },
    {
      path: "/score",
      name: "score",
      component: () => import("../views/Score.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/error",
      name: "error",
      component: NotAllowed,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFound,
    }
  ],
});

export default router;
