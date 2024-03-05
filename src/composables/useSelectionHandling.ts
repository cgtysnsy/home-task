import { useStore } from "vuex";

interface ClickedColumns {
  salesDate: string | null;
  salesDate2: string | null;
}

export function useSelectionHandling() {
  const store = useStore();

  const handleColumnClick = (category: string, callback?: Function) => {
    if (!store) {
      console.error("Vuex store is not available");
      return;
    }

    const currentClickedColumns = store.getters["sales/clickedColumns"];

    let newClickedColumns: ClickedColumns = { ...currentClickedColumns };

    if (!currentClickedColumns.salesDate) {
      newClickedColumns.salesDate = category;
    } else if (
      currentClickedColumns.salesDate &&
      !currentClickedColumns.salesDate2
    ) {
      newClickedColumns.salesDate2 = category;
    } else {
      // Reset or set to new values based on your requirements
      // This example resets both if both are already set
      newClickedColumns.salesDate = category;
      newClickedColumns.salesDate2 = null;
    }

    store.dispatch("sales/updateClickedColumns", newClickedColumns);

    if (callback) {
      callback(newClickedColumns);
    }
  };

  return { handleColumnClick };
}
