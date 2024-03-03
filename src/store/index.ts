import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { sales, type SalesState } from "./modules/sales";
import type { AuthState } from "./modules/auth";

export interface RootState {
  auth: AuthState;
  sales: SalesState;
}

const store = createStore<RootState>({
  modules: {
    auth,
    sales,
  },
});

export default store;
