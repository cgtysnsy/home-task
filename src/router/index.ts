import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import AuthService from "@/components/AuthService.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AuthService,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  console.log(requiresAuth, isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
