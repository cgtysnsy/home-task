// src/composables/useTableData.ts
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { fetchSalesSkuList, fetchSkuRefund } from "@/api/salesService";

interface TableRowData {
  sku: string;
  productName: string;
  salesDateData?: string;
  salesDate2Data?: string;
  comparisonData?: string;
}

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
      const skuListArray = response.Data.item.skuList;
      const refundResponse = await fetchSkuRefund({
        marketplace,
        sellerId,
        skuList: skuListArray,
        requestedDay: 0,
      });

      if (response.ApiStatus && refundResponse.ApiStatus) {
        // Assuming refundResponse.Data is an array with the same length and corresponding order
        tableData.value = response.Data.item.skuList.map((item, index) => {
          const refundData = refundResponse.Data[index];
          // Merge based on some logic; this is just an example
          return {
            ...item,
            refundRate: refundData ? refundData.refundRate : null,
          };
        });
      }
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
    }
  };

  const isLastPage = computed(() => {
    return pageNumber.value == Math.ceil(paginatedTableData.value.length / 10);
  });
  const displayData = computed(() => {
    let dataToShow = paginatedTableData.value;

    // Assuming clickedColumns.salesDate and clickedColumns.salesDate2 are the identifiers for the selected columns
    if (clickedColumns.value.salesDate && clickedColumns.value.salesDate2) {
      // Filter the data based on some logic; this example filters by presence of sales data on selected dates
      dataToShow = dataToShow.filter((row) => {
        // Example logic: check if row has data for the selected dates
        // Adjust according to how your data is structured and what it means to "select" a column
        return row.salesDateData && row.salesDate2Data;
      });
    }

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
