export interface AuthState {
  accessToken: string | null;
}

const state: AuthState = {
  accessToken: null,
};

const mutations = {
  setAccessToken(state: AuthState, token: string) {
    state.accessToken = token;
  },
};

const actions = {
  updateAccessToken({ commit }, token: string) {
    commit("setAccessToken", token);
  },
};

export const auth = {
  namespaced: true,
  state,
  mutations,
  actions,
};
