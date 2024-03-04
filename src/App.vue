<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

import store from "@/store";

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
</script>

<template>
  <header class="flex justify-center m-4">
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="m-4" v-if="!isAuthenticated">Home</RouterLink>
        <RouterLink to="/user-info" class="m-4" v-else>User</RouterLink>
        <RouterLink to="/dashboard" class="m-4">Dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
