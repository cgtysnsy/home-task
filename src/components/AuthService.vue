<template>
  <form @submit.prevent="handleLogin">
    <!-- form fields for username and password -->
    <input v-model="credentials.Email" type="text" placeholder="Email" />
    <input
      v-model="credentials.Password"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { login } from "@/api/authService"; // Adjust the import path as needed

export default defineComponent({
  setup() {
    // The credentials ref now includes the static values directly
    const credentials = ref({
      Email: "",
      Password: "",
      GrantType: "password", // Static value for password grant type
      Scope: "amazon_data", // Scope as per your authentication requirements
      ClientId: "C0001", // Your client ID
      ClientSecret: "SECRET0001", // Your client secret
      RedirectUri: "https://api.eva.guru", // Redirect URI as per your setup
    });

    const handleLogin = async () => {
      console.log(credentials.value.Email, credentials.value.Password);
      try {
        // Call the login function with the credentials.value
        const response = await login(
          credentials.value.Email,
          credentials.value.Password
        );
        console.log("Logged in with token:", response);
        // Redirect or perform other actions upon successful login
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login failure
      }
    };

    return { credentials, handleLogin };
  },
});
</script>
