<template>
  <div>
    <table v-if="tableData.length">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th v-if="clickedColumns.salesDate">
            {{ clickedColumns.salesDate }}
          </th>
          <th v-if="clickedColumns.salesDate2">
            {{ clickedColumns.salesDate2 }}
          </th>
          <th v-if="clickedColumns.salesDate && clickedColumns.salesDate2">
            Comparison
          </th>
          <th>SKU Refund Rate Last {{ selectedDay }} Days</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayData" :key="index">
          <td>{{ row.sku }}</td>
          <td>{{ row.productName }}</td>
          <td v-if="clickedColumns.salesDate">{{ row.salesDateData }}</td>
          <td v-if="clickedColumns.salesDate2">{{ row.salesDate2Data }}</td>
          <td v-if="clickedColumns.salesDate && clickedColumns.salesDate2">
            {{ row.comparisonData }}
          </td>
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
import { computed } from "vue";
import { useStore } from "vuex";
import { useTableData } from "@/composables/useTableData";
import { useChartData } from "@/composables/useChartData";

const store = useStore();

const clickedColumns = computed(() => store.getters["sales/clickedColumns"]);

const { tableData, pageNumber, displayData, isLastPage, changePage } =
  useTableData(clickedColumns.value);

const { selectedDay } = useChartData();
</script>
