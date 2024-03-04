// src/composables/useTableData.ts
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { fetchSalesSkuList, fetchSkuRefund } from "@/api/salesService";

export function useTableData() {
  const store = useStore();
  const tableData = ref([]);
  const pageSize = ref(30);
  const currentPage = ref(1);
  const pageNumber = ref(1);
  const tableDataWithDate = ref([]);

  const clickedColumns = computed(() => store.getters["sales/clickedColumns"]);

  watch(
    clickedColumns,
    () => {
      fetchTableData("Amazon.com", "A3N2GBLFIDRYSH"); // Replace with dynamic values if necessary
    },
    { deep: true }
  );

  const fetchTableData = async (marketplace: string, sellerId: string) => {
    const clickedColumns = store.getters["sales/clickedColumns"];

    const isDaysCompare =
      clickedColumns.salesDate && clickedColumns.salesDate2 ? 1 : 0;

    const response = await fetchSalesSkuList({
      marketplace,
      sellerId,
      salesDate: clickedColumns.salesDate || "",
      salesDate2: clickedColumns.salesDate2 || "",
      pageSize: pageSize.value,
      pageNumber: currentPage.value,
      isDaysCompare,
    });

    if (response.ApiStatus) {
      tableData.value = response.Data.item.skuList;
      //-----Do it Later: mapping all data for sku, should do it for just selected columns ---
      // const skuList = response.Data.item.skuList.map((item) => item.sku);
      // const refundResponse = await fetchSkuRefund({
      //   marketplace,
      //   sellerId,
      //   skuList,
      //   requestedDay: 0,
      // });

      // if (refundResponse.ApiStatus) {
      //   const updatedTableData = tableData.value.map((salesItem) => {
      //     const refundItem = refundResponse?.Data.find(
      //       (refund) => refund.sku === salesItem?.sku
      //     );
      //     return {
      //       ...salesItem,
      //       refundRate: refundItem ? refundItem.refundRate : null,
      //       date: clickedColumns.salesDate || "",
      //     };
      //   });

      //   tableData.value = updatedTableData;
      // } else {
      //   console.error(
      //     "Error fetching refund data:",
      //     refundResponse.ApiStatusMessage
      //   );
      // }
    } else {
      console.error("Error fetching table data:", response.ApiStatusMessage);
    }
  };

  // const fetchRefundData = async () => {
  //   try {
  //     const response = await fetchSkuRefund({
  //       marketplace: "Amazon.com",
  //       sellerId: "A3N2GBLFIDRYSH",
  //       skuList: ["string"],
  //       requestedDay: 0,
  //     });
  //     if (response.ApiStatus) {
  //       // Assuming you want to merge or replace this data
  //       // Merge or replace logic here...
  //       console.log("Refund data fetched", response);
  //     } else {
  //       console.error("Error fetching refund data:", response.ApiStatusMessage);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching refund data:", error);
  //   }
  // };

  const paginatedTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value.slice(start, end);
  });

  const changePage = (offset: number) => {
    const newPage = pageNumber.value + offset;

    if (newPage > 0 && newPage <= Math.ceil(tableData.value.length / 10)) {
      pageNumber.value = newPage;
    } else {
      console.log(`Page ${newPage} is out of bounds`);
    }
  };

  const isLastPage = computed(() => {
    return pageNumber.value == Math.ceil(paginatedTableData.value.length / 10);
  });
  const displayData = computed(() => {
    let dataToShow = paginatedTableData.value;

    // const { salesDate, salesDate2 } = clickedColumns.value;
    // if (salesDate && salesDate2 && dataToShow.length > 0) {
    //   // Filter or transform data based on the selected dates
    //   // For example, if you want to show only the items related to the selected dates:

    //   const borek = dataToShow.filter((item) => {

    //   });

    // }

    const start = (pageNumber.value - 1) * 10;
    const end = start + 10;
    return dataToShow.slice(start, Math.min(end, dataToShow.length));
  });

  return {
    tableData,
    pageSize,
    currentPage,
    fetchTableData,
    pageNumber,
    displayData,
    isLastPage,
    changePage,
    paginatedTableData,
  };
}
