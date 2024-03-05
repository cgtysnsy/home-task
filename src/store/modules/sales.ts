import type { Module } from "vuex";
import type { RootState } from "../index"; // Import your RootState type

export interface SalesState {
  clickedColumns: { salesDate: string | null; salesDate2: string | null };
  selectedDay: number;
}

export const sales: Module<SalesState, RootState> = {
  namespaced: true,
  state: (): SalesState => ({
    clickedColumns: { salesDate: null, salesDate2: null },
    selectedDay: 30,
  }),

  mutations: {
    SET_CLICKED_COLUMNS(state, payload) {
      state.clickedColumns = payload;
    },
    SET_SELECTED_DAY(state, payload) {
      state.selectedDay = payload;
    },
  },
  actions: {
    updateClickedColumns(
      { commit },
      payload: { salesDate: string; salesDate2: string | null }
    ) {
      commit("SET_CLICKED_COLUMNS", payload);
    },
    updateSelectedDay({ commit }, day) {
      commit("SET_SELECTED_DAY", day);
    },
  },
  getters: {
    clickedColumns: (
      state
    ): { salesDate: string | null; salesDate2: string | null } =>
      state.clickedColumns,
    selectedDay: (state) => state.selectedDay,
  },
};
