<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchUserInformation } from "@/api/userService";
import type { UserInformationResponse } from "@/types"; // Assuming you have defined this type

const userInformation = ref<UserInformationResponse | null>(null);

onMounted(async () => {
  try {
    const response = await fetchUserInformation();
    userInformation.value = response;
  } catch (error) {
    console.error("Failed to fetch user information:", error);
    // Handle error
  }
});
</script>
