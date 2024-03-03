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
import { useSelectionHandling } from "@/composables/useSelectionHandling";
import { useTableData } from "@/composables/useTableData";
import { useChartData } from "@/composables/useChartData";
import { Chart } from "highcharts-vue";

const { clickedColumns, handleColumnClick } = useSelectionHandling();
const { fetchTableData } = useTableData(clickedColumns);

const onClickCallback = (category: any) => {
  handleColumnClick(category, fetchTableData);
};

const { chartOptions, selectedDay } = useChartData(onClickCallback);

// Define the chartOptions and selectedDay refs
// const chartOptions = ref({});
// const selectedDay = ref<number>(30); // Default to 30 days
// const clickedColumns = reactive({ salesDate: null, salesDate2: null });
// Reactive reference for the sales data
// const dailySalesData = ref<DailySalesOverviewData | null>(null);
// const tableData = ref([]);
// const pageSize = ref(30);
// const currentPage = ref(1);
// const pageNumber = ref(1);
// const isComparing = ref(false);
// Fetches the sales overview data and updates the chart
// const loadChartData = async (days: number) => {
//   const params: DailySalesOverviewParams = {
//     marketplace: "Amazon.com",
//     sellerId: "A3N2GBLFIDRYSH",
//     requestStatus: 0,
//     day: days,
//     excludeYoYData: true,
//   };

//   try {
//     const response = await fetchDailySalesOverview(params);
//     if (response.ApiStatus) {
//       dailySalesData.value = response.Data;
//       updateChartOptions(); // Call a function to update the chart
//     } else {
//       console.error("API Error:", response.ApiStatusMessage);
//     }
//   } catch (error) {
//     console.error("Error fetching daily sales overview:", error);
//   }
// };

// Updates chartOptions based on the fetched data
// const updateChartOptions = () => {
//   if (dailySalesData.value?.item) {
//     chartOptions.value = {
//       chart: { type: "column" },
//       title: { text: "Daily Sales" },
//       xAxis: {
//         categories: dailySalesData.value.item.map((item) => item.date),
//       },
//       yAxis: { min: 0, title: { text: "Amount ($)" } },
//       legend: {
//         shadow: false,
//       },
//       tooltip: {
//         formatter: function () {
//           let tooltipHtml: any = `<b>${this.x}</b><br/>`; // The x value is the category (date in this case)

//           // Loop over each series and point
//           this.points.forEach((point) => {
//             // Access the additional properties from the point's options
//             const pointOptions = point.point.options;
//             tooltipHtml += `<br/><span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b>`;
//             tooltipHtml += `<br/>Total Sales: <b>${
//               pointOptions.fbaAmount + pointOptions.fbmAmount
//             }</b>`;
//             tooltipHtml += `<br/>Shipping: <b>${pointOptions.fbaShippingAmount}</b>`;
//             // Add other fields as needed
//           });

//           // Since you want to show fbaAmount and fbmAmount even if they are not in the series, you could access them like this:
//           const pointOptions = this.points[0].point.options; // Assuming all points have the same data structure
//           tooltipHtml += `<br/>FBA Sales: <b>${pointOptions.fbaAmount}</b>`;
//           tooltipHtml += `<br/>FBM Sales: <b>${pointOptions.fbmAmount}</b>`;

//           return tooltipHtml;
//         },
//         shared: true,
//       },
//       plotOptions: {
//         column: {
//           grouping: false,
//           shadow: false,
//           borderWidth: 0,
//         },
//         series: {
//           cursor: "pointer",
//           point: {
//             events: {
//               click: function () {
//                 handleColumnClick(this.category);
//               },
//             },
//           },
//         },
//       },
//       series: [
//         {
//           name: "Profit",
//           data: dailySalesData.value.item.map((item) => ({
//             y: item.profit,
//             fbaAmount: item.fbaAmount,
//             fbmAmount: item.fbmAmount,
//             fbaShippingAmount: item.fbaShippingAmount,
//           })),
//           pointPadding: 0.3,
//           pointPlacement: -0.2,
//         },
//         {
//           name: "FBA Sales",
//           data: dailySalesData.value.item.map((item) => item.fbaAmount),
//           pointPadding: 0.4,
//           pointPlacement: -0.2,
//         },
//         {
//           name: "FBM Sales",
//           data: dailySalesData.value.item.map((item) => item.fbmAmount),
//         },
//       ],
//     };
//   }
// };

// Watch for changes on the selectedDay and reload the chart data
// watch(selectedDay, (newDay) => {
//   loadChartData(newDay);
// });

// const handleColumnClick = async (category: any) => {
//   // Check if this is the first or second column clicked
//   if (!clickedColumns.salesDate) {
//     clickedColumns.salesDate = category;
//     clickedColumns.salesDate2 = null; // Reset the second date
//   } else if (!clickedColumns.salesDate2) {
//     clickedColumns.salesDate2 = category;
//   } else {
//     // Reset if two columns are already selected
//     clickedColumns.salesDate = category;
//     clickedColumns.salesDate2 = null;
//   }

//   // Fetch data for the table
//   await fetchTableData();
// };

// const fetchTableData = async () => {
//   const isDaysCompare =
//     clickedColumns.salesDate && clickedColumns.salesDate2 ? 1 : 0;

//   const response = await fetchSalesSkuList({
//     marketplace: "Amazon.com",
//     sellerId: "A3N2GBLFIDRYSH",
//     salesDate: clickedColumns.salesDate,
//     salesDate2: clickedColumns.salesDate2 || "",
//     pageSize: pageSize.value,
//     pageNumber: currentPage.value,
//     isDaysCompare: isDaysCompare,
//   });

//   // Handle response to populate tableData
//   if (response.ApiStatus) {
//     tableData.value = response.Data.item.skuList;
//     console.log(tableData.value.length, "tabledata length?");
//   } else {
//     console.error("Error fetching table data:", response.ApiStatusMessage);
//   }
// };

// const paginatedTableData = computed(() => {
//   const start = (currentPage.value - 1) * pageSize.value;
//   const end = start + pageSize.value;
//   return tableData.value.slice(start, end);
// });

// const changePage = (offset: number) => {
//   const newPage = pageNumber.value + offset;
//   console.log(newPage, "newPage", Math.ceil(tableData.value.length / 10));
//   if (newPage > 0 && newPage <= Math.ceil(tableData.value.length / 10)) {
//     console.log(`Changing to page ${newPage}`);
//     pageNumber.value = newPage;
//   } else {
//     console.log(`Page ${newPage} is out of bounds`);
//   }
// };

// const isLastPage = computed(() => {
//   console.log(pageNumber.value, "pagenumber value");
//   console.log(Math.ceil(paginatedTableData.value.length / 10), "second value");
//   return pageNumber.value == Math.ceil(paginatedTableData.value.length / 10);
// });
// console.log(isLastPage.value, "last page?");
// const displayData = computed(() => {
//   // Assuming currentPage is based on the displayed data, not the fetched data
//   const start = (pageNumber.value - 1) * 10; // 10 items per page for display
//   const end = start + 10;
//   console.log(`Displaying data from index ${start} to ${end} (not inclusive)`);
//   console.log(paginatedTableData.value, "paginated data");
//   return paginatedTableData.value.slice(
//     start,
//     Math.min(end, paginatedTableData.value.length)
//   );
// });
</script>
