import { useStore } from "vuex";

export function useSelectionHandling() {
  const store = useStore();

  const handleColumnClick = (category: string, callback?: Function) => {
    if (!store) {
      console.error("Vuex store is not available");
      return;
    }

    let newClickedColumns = {
      salesDate: category,
      salesDate2: null,
    };

    const currentClickedColumns = store.getters["sales/clickedColumns"];

    if (currentClickedColumns.salesDate && !currentClickedColumns.salesDate2) {
      newClickedColumns.salesDate2 = category;
    }

    store.dispatch("sales/updateClickedColumns", newClickedColumns);

    if (callback) {
      callback(newClickedColumns);
    }
  };

  return { handleColumnClick };
}