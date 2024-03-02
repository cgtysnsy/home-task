<template>
  <div>
    <!-- Your template here, e.g., display sales data in a table -->
    <h1>SalesDataTable</h1>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchDailySalesOverview } from "@/api/salesService";
import type {
  DailySalesOverviewData,
  DailySalesOverviewItem,
  DailySalesOverviewParams,
} from "@/types";
// Define a ref to hold the daily sales data
const dailySalesData = ref<DailySalesOverviewData | null>(null);

// Create an object for the request parameters
const overviewParams: DailySalesOverviewParams = {
  marketplace: "Amazon",
  sellerId: "your-seller-id", // This should be dynamically obtained, perhaps from user information
  requestStatus: 0,
  day: 30, // This could be set by the user or some other logic in your application
  excludeYoYData: true,
};

// Make the API call in the onMounted lifecycle hook
onMounted(async () => {
  try {
    // Fetch the daily sales overview data
    const response = await fetchDailySalesOverview(overviewParams);
    if (response.ApiStatus) {
      // If the API call was successful, store the data in your ref
      dailySalesData.value = response.Data;
      console.log(dailySalesData.value, "is that ok");
    } else {
      // If the API call failed, log the error message
      console.error("API Error:", response.ApiStatusMessage);
    }
  } catch (error) {
    // If there was an error making the request, log the error
    console.error("Error fetching daily sales overview:", error);
  }
});
</script>
