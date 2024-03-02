import { createStore } from "vuex";
import { auth } from "./modules/auth";
import type { AuthState } from "./modules/auth";

export interface RootState {
  auth: AuthState;
}

const store = createStore<RootState>({
  modules: {
    auth,
  },
});

export default store;
