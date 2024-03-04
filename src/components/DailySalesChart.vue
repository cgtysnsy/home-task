<template>
  <div>
    <select v-model="selectedDay">
      <option value="60">Last 60 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="14">Last 14 Days</option>
      <option value="7">Last 7 Days</option>
    </select>
    <Chart :options="chartOptions"></Chart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useSelectionHandling } from "@/composables/useSelectionHandling";
import { useTableData } from "@/composables/useTableData";
import { useChartData } from "@/composables/useChartData";
import { Chart } from "highcharts-vue";

const store = useStore();

const { handleColumnClick } = useSelectionHandling();

const clickedColumns = computed(() => store.getters["sales/clickedColumns"]);

const onClickCallback = (category: any) => {
  if (!category) return;
  handleColumnClick(category, fetchTableData);
};
const { fetchTableData } = useTableData(clickedColumns);
const { chartOptions, selectedDay } = useChartData(onClickCallback);
</script>
