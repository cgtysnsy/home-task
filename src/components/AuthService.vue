<template>
  <form @submit.prevent="handleLogin">
    <input v-model="credentials.Email" type="email" placeholder="Email" />
    <input
      v-model="credentials.Password"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { login } from "@/api/authService";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const credentials = ref({
  Email: "",
  Password: "",
  GrantType: "password",
  Scope: "amazon_data",
  ClientId: "C0001",
  ClientSecret: "SECRET0001",
  RedirectUri: "https://api.eva.guru",
});

const handleLogin = async () => {
  try {
    const response = await login(
      credentials.value.Email,
      credentials.value.Password
    );

    if (response) {
      store.dispatch("auth/updateAccessToken", response);
      router.push("/dashboard").catch((err) => {
        console.error(err);
      });
    } else {
      console.error("No access token received");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
