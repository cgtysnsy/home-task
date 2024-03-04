<template>
  <main>
    <AuthService v-if="!isAuthenticated" />
    <UserInformation v-else />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import AuthService from "@/components/AuthService.vue";
import UserInformation from "@/components/UserInformation.vue";

const store = useStore();

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
</script>
