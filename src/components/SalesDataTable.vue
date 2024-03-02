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
import apiClient from "@/api/apiClient";
// Define a ref to hold the daily sales data
const dailySalesData = ref<DailySalesOverviewData | null>(null);

// Create an object for the request parameters
const overviewParams: DailySalesOverviewParams = {
  marketplace: "Amazon.com",
  sellerId: "A3N2GBLFIDRYSH",
  requestStatus: 0,
  day: 30,
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
