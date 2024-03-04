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
      path: "/user-info",
      name: "user-info",
      component: () => import("../components/UserInformation.vue"),
      meta: {
        requiresAuth: true,
      },
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

  if (requiresAuth && !isAuthenticated) {
    next({ name: "home" }); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router;
