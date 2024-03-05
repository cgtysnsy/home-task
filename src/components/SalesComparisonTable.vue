<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table
      v-if="tableData.length"
      class="min-w-full text-sm text-left text-gray-500"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="">
          <th
            scope="col"
            class="border-b-2 border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            SKU
          </th>
          <th
            scope="col"
            class="border-b-2 border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Product Name
          </th>
          <th
            v-if="clickedColumns.salesDate"
            scope="col"
            class="border-b-2 border-gray-200 px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center"
          >
            <p>{{ clickedColumns.salesDate }}</p>
            <p>Sales/ Units</p>
            <p>Avg.Selling Price</p>
          </th>
          <th
            v-if="clickedColumns.salesDate2"
            scope="col"
            class="border-b-2 border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {{ clickedColumns.salesDate2 }}
          </th>

          <th
            scope="col"
            class="border-b-2 border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            <p>SKU Refund Rate</p>
            <p class="text-[9px]">(Last {{ selectedDay }} Days)</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in displayData"
          :key="index"
          class="bg-white border-b"
        >
          <td class="border-b border-gray-200 px-4 py-3 text-sm">
            {{ row.sku }}
          </td>
          <td class="border-b border-gray-200 px-4 py-3 text-sm">
            {{ row.productName }}
          </td>
          <td
            v-if="clickedColumns.salesDate"
            class="border-b border-gray-200 px-4 py-3 text-xs text-green-600 text-center"
          >
            <p>$ {{ row.amount }} / {{ row.qty }}</p>
            <p>${{ (row.amount / row.qty).toFixed(2) }}</p>
          </td>
          <td
            v-if="clickedColumns.salesDate && clickedColumns.salesDate2"
            class="border-b border-gray-200 px-4 py-3 text-sm"
          >
            {{ row.comparisonData }}
          </td>
          <td class="border-b border-gray-200 px-4 py-3 text-sm text-right">
            {{ row.refundRate }}%
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="tableData.length > 0"
      class="flex justify-center items-center p-4 bg-white"
    >
      <button @click="changePage(-1)" :disabled="pageNumber <= 1" class="btn">
        Previous
      </button>
      <button @click="changePage(1)" :disabled="isLastPage" class="btn">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useTableData } from "@/composables/useTableData";
import { useChartData } from "@/composables/useChartData";

const store = useStore();
const selectedDay = computed(() => store.state.sales.selectedDay);

const clickedColumns = computed(() => store.getters["sales/clickedColumns"]);

const { tableData, pageNumber, displayData, isLastPage, changePage } =
  useTableData(clickedColumns.value);
</script>
