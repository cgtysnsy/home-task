<script setup lang="ts">
import DailySalesChart from "@/components/DailySalesChart.vue";
import UserInformation from "@/components/UserInformation.vue";
import SalesComparisonTable from "@/components/SalesComparisonTable.vue";
</script>
<template>
  <div class="about">
    <UserInformation />
    <DailySalesChart />
    <SalesComparisonTable />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
