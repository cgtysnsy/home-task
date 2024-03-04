<script setup lang="ts">
import DailySalesChart from "@/components/DailySalesChart.vue";
import SalesComparisonTable from "@/components/SalesComparisonTable.vue";
</script>
<template>
  <div class="flex flex-col justify-center items-center py-4 px-2">
    <DailySalesChart />
    <SalesComparisonTable />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .dashboard {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
