<template>
  <div>
    <!-- Your template here, e.g., display sales data in a table -->
    <h1>SalesDataTable</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchDailySalesOverview } from "@/api/salesService";

export default defineComponent({
  setup() {
    console.log("am I?");
    const salesData = ref(null);

    const loadSalesData = async () => {
      try {
        const params = {
          /* your parameters here */
        };
        salesData.value = await fetchDailySalesOverview(params);
        console.log(salesData, "sales data");
      } catch (error) {
        console.error("Failed to load sales data:", error);
      }
    };

    onMounted(() => {
      loadSalesData();
    });

    return {
      salesData,
    };
  },
});
</script>
