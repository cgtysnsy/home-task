<template>
  <ChartLoader v-if="isLoading" />
  <div v-else class="my-2 w-full">
    <select v-model="selectedDay" class="text-xs">
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
import ChartLoader from "@/components/ChartLoader.vue";

const store = useStore();

const { handleColumnClick } = useSelectionHandling();

const clickedColumns = computed(() => store.getters["sales/clickedColumns"]);

const selectedDay = computed({
  get: () => store.state.sales.selectedDay,
  set: (value) => store.dispatch("sales/updateSelectedDay", value),
});

const onClickCallback = (category: any) => {
  if (!category) return;
  handleColumnClick(category, fetchTableData);
};
const { fetchTableData } = useTableData(clickedColumns);
const { chartOptions, isLoading } = useChartData(onClickCallback);
</script>
