import { ref, watch, onMounted } from "vue";
import { fetchDailySalesOverview } from "@/api/salesService";

import type {
  DailySalesOverviewData,
  DailySalesOverviewParams,
  DailySalesOverviewItem,
} from "@/types";

export function useChartData(onClickCallback: Function) {
  const dailySalesData = ref<DailySalesOverviewData | null>(null);
  const chartOptions = ref({});
  const selectedDay = ref<number>(30);
  const isLoading = ref(false);
  const loadChartData = async (days: number) => {
    isLoading.value = true;
    const params: DailySalesOverviewParams = {
      marketplace: "Amazon.com",
      sellerId: "A3N2GBLFIDRYSH",
      requestStatus: 0,
      day: days,
      excludeYoYData: true,
    };

    try {
      const response = await fetchDailySalesOverview(params);
      if (response.ApiStatus) {
        dailySalesData.value = response.Data;
        updateChartOptions();
      } else {
        console.error("API Error:", response.ApiStatusMessage);
      }
    } catch (error) {
      console.error("Error fetching daily sales overview:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const updateChartOptions = () => {
    if (dailySalesData.value?.item) {
      chartOptions.value = {
        chart: { type: "column" },
        title: { text: "Daily Sales" },
        xAxis: {
          categories: dailySalesData.value.item.map((item) => item.date),
        },
        yAxis: { min: 0, title: { text: "Amount ($)" } },
        legend: {
          shadow: false,
        },
        tooltip: {
          formatter: function () {
            let tooltipHtml: any = `<b>${this.x}</b><br/>`; // The x value is the category (date in this case)

            // Loop over each series and point
            this.points.forEach((point: any) => {
              // Access the additional properties from the point's options
              const pointOptions = point.point.options;
              tooltipHtml += `<br/><span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b>`;
              tooltipHtml += `<br/>Total Sales: <b>${
                pointOptions.fbaAmount + pointOptions.fbmAmount
              }</b>`;
              tooltipHtml += `<br/>Shipping: <b>${pointOptions.fbaShippingAmount}</b>`;
              // Add other fields as needed
            });

            // Since you want to show fbaAmount and fbmAmount even if they are not in the series, you could access them like this:
            const pointOptions = this.points[0].point.options; // Assuming all points have the same data structure
            tooltipHtml += `<br/>FBA Sales: <b>${pointOptions.fbaAmount}</b>`;
            tooltipHtml += `<br/>FBM Sales: <b>${pointOptions.fbmAmount}</b>`;

            return tooltipHtml;
          },
          shared: true,
        },
        plotOptions: {
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0,
          },
          series: {
            cursor: "pointer",
            point: {
              events: {
                click: function () {
                  onClickCallback(this.category);
                },
              },
            },
          },
        },
        series: [
          {
            name: "Profit",
            data: dailySalesData.value.item.map((item) => ({
              y: item.profit,
              fbaAmount: item.fbaAmount,
              fbmAmount: item.fbmAmount,
              fbaShippingAmount: item.fbaShippingAmount,
            })),
            pointPadding: 0.3,
            pointPlacement: -0.2,
          },
          {
            name: "FBA Sales",
            data: dailySalesData.value.item.map((item) => item.fbaAmount),
            pointPadding: 0.4,
            pointPlacement: -0.2,
          },
          {
            name: "FBM Sales",
            data: dailySalesData.value.item.map((item) => item.fbmAmount),
          },
        ],
      };
    }
  };
  watch(selectedDay, (newDay) => {
    loadChartData(newDay);
  });

  // Load the chart data initially
  onMounted(() => {
    loadChartData(selectedDay.value);
  });

  return {
    chartOptions,
    updateChartOptions,
    loadChartData,
    selectedDay,
    dailySalesData,
    isLoading,
  };
}
