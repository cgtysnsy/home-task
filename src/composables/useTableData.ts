// src/composables/useTableData.ts
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { fetchSalesSkuList } from "@/api/salesService";

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
      // tableData.value = response.Data.item.skuList.map((sku) => ({
      //   ...sku,
      //   skuDate: response.Data.item.selectedDate,
      // }));
      // console.log(tableDataWithDate.value[0].skuDate, "itemm");
    } else {
      console.error("Error fetching table data:", response.ApiStatusMessage);
    }
  };

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
    let dataToShow: any[] = paginatedTableData.value;

    if (clickedColumns.value.salesDate && clickedColumns.value.salesDate2) {
      // return prepareComparativeDisplayData(dataToShow);
      // dataToShow = dataToShow.map((item) => ({
      //   ...item,
      //   salesData: item[clickedColumns.value.salesDate],
      //   salesData2: item[clickedColumns.value.salesDate2],
      // }));
      // return dataToShow;
    }

    const start = (pageNumber.value - 1) * 10;
    const end = start + 10;
    return dataToShow.slice(start, Math.min(end, dataToShow.length));
  });

  // const prepareComparativeDisplayData = (dataFromColumn1, dataFromColumn2) => {
  //   // Assuming dataFromColumn1 and dataFromColumn2 are arrays of objects with the same length and structure
  //   return dataFromColumn1.map((item, index) => {
  //     const itemFromColumn2 = dataFromColumn2[index];

  //     // Here you can decide how to compare the two data points
  //     // For example, you might want to calculate the difference in sales
  //     const comparativeData = {
  //       sku: item.sku,
  //       productName: item.productName,
  //       salesDate1: item.sales,
  //       salesDate2: itemFromColumn2.sales,
  //       difference: item.sales - itemFromColumn2.sales,
  //       // Add any other comparative metrics or calculations here
  //     };

  //     return comparativeData;
  //   });
  // };

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
