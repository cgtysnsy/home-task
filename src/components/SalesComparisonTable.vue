<template>
  <div>
    <table v-if="tableData.length">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>{{ clickedColumns.salesDate }}</th>
          <th>{{ clickedColumns.salesDate2 }}</th>
          <th>SKU Refund Rate Last {{ selectedDay }} Days</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayData" :key="index">
          <td>{{ row.sku }}</td>
          <td>{{ row.productName }}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="changePage(-1)" :disabled="pageNumber <= 1">
        Previous
      </button>
      <button @click="changePage(1)" :disabled="isLastPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSelectionHandling } from "@/composables/useSelectionHandling";
import { useTableData } from "@/composables/useTableData";
import { useChartData } from "@/composables/useChartData";

const { clickedColumns } = useSelectionHandling();
const {
  tableData,
  pageNumber,
  displayData,
  isLastPage,
  changePage,
  paginatedTableData,
} = useTableData(clickedColumns);

const { selectedDay } = useChartData();
</script>
