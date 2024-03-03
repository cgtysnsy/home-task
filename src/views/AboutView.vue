<script setup lang="ts">
import SalesDataTable from "@/components/SalesDataTable.vue";
import UserInformation from "@/components/UserInformation.vue";
</script>
<template>
  <div class="about">
    <SalesDataTable />
    <UserInformation />
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
