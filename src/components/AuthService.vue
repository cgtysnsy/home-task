<template>
  <div
    class="w-full flex flex-col justify-start items-center h-screen text-center mt-[98px]"
  >
    <h class="chart-title mt-12">Log in with:</h>
    <h3>Email: homework@eva.guru</h3>
    <h3>Password: Homeworkeva1**</h3>
    <form
      @submit.prevent="handleLogin"
      class="text-center flex flex-col item-center border py-16 px-12 border-primary mt-6"
    >
      <input
        v-model="credentials.Email"
        type="email"
        placeholder="Email"
        class="border py-4 px-6 my-4"
      />
      <input
        v-model="credentials.Password"
        type="password"
        placeholder="Password"
        class="border py-4 px-6 my-4"
      />
      <button type="submit" class="bg-primary text-white py-4 px-6">
        Login
      </button>
    </form>
  </div>
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
