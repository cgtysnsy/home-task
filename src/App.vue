<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="flex justify-center m-4">
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="m-4">Home</RouterLink>
        <RouterLink to="/dashboard" class="m-4">Dashboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
