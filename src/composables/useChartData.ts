import { ref, watch, onMounted, computed } from "vue";
import { fetchDailySalesOverview } from "@/api/salesService";
import { useStore } from "vuex";
import type { DailySalesOverviewData, DailySalesOverviewParams } from "@/types";

interface ChartPoint {
  y: number;
  fbaAmount: number;
  fbmAmount: number;
  fbaShippingAmount: number;
}

interface HighchartsPoint {
  category: string;
  series: {
    color: string;
    name: string;
  };
  point: {
    options: ChartPoint;
  };
}

export function useChartData(onClickCallback: Function) {
  const store = useStore();
  const selectedDay = computed(() => store.state.sales.selectedDay);
  const dailySalesData = ref<DailySalesOverviewData | null>(null);
  const chartOptions = ref({});

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
      console.log(
        "🚀 ~ updateChartOptions ~ dailySalesData.value?.item:",
        JSON.parse(JSON.stringify(dailySalesData.value?.item[0]))
      );
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
          formatter: function (this: any) {
            let tooltipHtml = `<b>${this.x}</b><br/>`;

            const pointOptions = this.points[0].point.options;
            tooltipHtml += `<br/>Total Sales: <b>${
              pointOptions.fbaAmount + pointOptions.fbmAmount
            }</b>`;
            tooltipHtml += `<br/>Shipping: <b>${pointOptions.fbaShippingAmount}</b>`;
            tooltipHtml += `<br/>Profit: <b>${pointOptions.y}</b>`;
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

  onMounted(() => {
    loadChartData(selectedDay.value);
  });

  return {
    chartOptions,
    updateChartOptions,
    loadChartData,

    dailySalesData,
    isLoading,
  };
}
