import type { Module } from "vuex";
import type { RootState } from "../index"; // Import your RootState type

export interface SalesState {
  clickedColumns: { salesDate: string | null; salesDate2: string | null };
}

export const sales: Module<SalesState, RootState> = {
  namespaced: true,
  state: (): SalesState => ({
    clickedColumns: { salesDate: null, salesDate2: null },
  }),

  mutations: {
    SET_CLICKED_COLUMNS(state, payload) {
      state.clickedColumns = payload;
    },
  },
  actions: {
    updateClickedColumns(
      { commit },
      payload: { salesDate: string; salesDate2: string | null }
    ) {
      commit("SET_CLICKED_COLUMNS", payload);
    },
  },
  getters: {
    clickedColumns: (
      state
    ): { salesDate: string | null; salesDate2: string | null } =>
      state.clickedColumns,
  },
};
console.log("state in vue", sales);
