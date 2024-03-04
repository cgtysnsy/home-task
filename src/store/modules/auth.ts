export interface AuthState {
  accessToken: string | null;
}

const state: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
};

const mutations = {
  setAccessToken(state: AuthState, token: string) {
    state.accessToken = token;
  },
  clearAccessToken(state: AuthState) {
    state.accessToken = null;
  },
};
const getters = {
  isAuthenticated: (state: AuthState) => !!state.accessToken,
};

const actions = {
  updateAccessToken({ commit }: any, token: string) {
    commit("setAccessToken", token);
  },
  logout({ commit }: any) {
    commit("clearAccessToken");
  },
};

export const auth = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
