import mutations from './mutations';

const { HISTORY, TABLE_BUSY } = mutations;

const downloadsHistory = {
  namespaced: true,
  state: {
    history: [],
    isTableBusy: false,
  },
  getters: {
    history: ({ history }) => history,
    isTableBusy: ({ isTableBusy }) => isTableBusy,
  },
  mutations: {
    [HISTORY](state, value) {
      state.history = value;
    },
    [TABLE_BUSY](state, bool) {
      state.isTableBusy = bool;
    },
  },
  actions: {
    addToHistory({ commit, getters, dispatch }, item) {
      const { history } = getters;
      const newHistory = [item, ...history];
      commit(HISTORY, newHistory);
      dispatch('refreshLocalStorage', newHistory);
    },
    removeFromHistory({ commit, getters, dispatch }, id) {
      const { history } = getters;
      const newHistory = history.filter((item) => item.id !== id);
      commit(HISTORY, newHistory);
      dispatch('refreshLocalStorage', newHistory);
    },
    refreshLocalStorage(context, payload) {
      localStorage.setItem('eztv-dwnld-history', JSON.stringify(payload));
    },
    initLocalStorageDwnlds({ commit }) {
      const history = JSON.parse(localStorage.getItem('eztv-dwnld-history'));
      if (history != null && history.length !== 0) {
        commit(HISTORY, history);
      }
    },
  },
};

export default downloadsHistory;
