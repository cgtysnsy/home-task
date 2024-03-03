import { reactive } from "vue";

export function useSelectionHandling() {
  const clickedColumns = reactive({ salesDate: null, salesDate2: null });

  const handleColumnClick = async (category: any, callback: Function) => {
    // Check if this is the first or second column clicked
    if (!clickedColumns.salesDate) {
      clickedColumns.salesDate = category;
      clickedColumns.salesDate2 = null; // Reset the second date
    } else if (!clickedColumns.salesDate2) {
      clickedColumns.salesDate2 = category;
    } else {
      // Reset if two columns are already selected
      clickedColumns.salesDate = category;
      clickedColumns.salesDate2 = null;
    }

    if (callback) {
      callback(clickedColumns);
    }
  };

  return { clickedColumns, handleColumnClick };
}
