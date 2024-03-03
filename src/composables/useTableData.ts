// src/composables/useTableData.ts
import { ref, computed, watch } from "vue";
import { fetchSalesSkuList } from "@/api/salesService";

interface ClickedColumns {
  salesDate?: string | null;
  salesDate2?: string | null;
}

export function useTableData(clickedColumns: ClickedColumns) {
  const tableData = ref([]);
  const pageSize = ref(30);
  const currentPage = ref(1);
  const pageNumber = ref(1);

  // watch(clickedColumns, (newVal, oldVal) => {
  //   if (newVal !== oldVal) {
  //     fetchTableData();
  //   }
  // });

  const fetchTableData = async (
    clickedColumns: ClickedColumns,
    marketplace: string,
    sellerId: string
  ) => {
    const isDaysCompare =
      clickedColumns.salesDate && clickedColumns.salesDate2 ? 1 : 0;

    const response = await fetchSalesSkuList({
      marketplace: "Amazon.com",
      sellerId: "A3N2GBLFIDRYSH",
      salesDate: clickedColumns.salesDate,
      salesDate2: clickedColumns.salesDate2 || "",
      pageSize: pageSize.value,
      pageNumber: currentPage.value,
      isDaysCompare: isDaysCompare,
    });

    if (response.ApiStatus) {
      tableData.value = response.Data.item.skuList;
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
    console.log(newPage, "newPage", Math.ceil(tableData.value.length / 10));
    if (newPage > 0 && newPage <= Math.ceil(tableData.value.length / 10)) {
      console.log(`Changing to page ${newPage}`);
      pageNumber.value = newPage;
    } else {
      console.log(`Page ${newPage} is out of bounds`);
    }
  };

  const isLastPage = computed(() => {
    console.log(pageNumber.value, "pagenumber value");
    console.log(
      Math.ceil(paginatedTableData.value.length / 10),
      "second value"
    );
    return pageNumber.value == Math.ceil(paginatedTableData.value.length / 10);
  });
  const displayData = computed(() => {
    // Assuming currentPage is based on the displayed data, not the fetched data
    const start = (pageNumber.value - 1) * 10; // 10 items per page for display
    const end = start + 10;
    console.log(
      `Displaying data from index ${start} to ${end} (not inclusive)`
    );
    console.log(paginatedTableData.value, "paginated data");
    return paginatedTableData.value.slice(
      start,
      Math.min(end, paginatedTableData.value.length)
    );
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
