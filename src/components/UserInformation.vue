<template>
  <div>
    <h1>Wellcome {{ userInformation?.Data.user.firstName }}</h1>
    <button @click="logout" class="btn">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchUserInformation } from "@/api/userService";
import type { UserInformationResponse } from "@/types";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const userInformation = ref<UserInformationResponse | null>(null);

onMounted(async () => {
  try {
    const response = await fetchUserInformation();
    userInformation.value = response;
  } catch (error) {
    console.error("Failed to fetch user information:", error);
  }
});

const logout = async () => {
  localStorage.removeItem("accessToken");
  store.dispatch("auth/logout");
  router.push({ name: "home" });
};
</script>
