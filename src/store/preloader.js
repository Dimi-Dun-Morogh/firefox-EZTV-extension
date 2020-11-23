import mutations from './mutations';

const { SET_PRELOADER } = mutations;

const preloader = {
  state: {
    showPreloader: false,
  },
  getters: {
    showPreloader: ({ showPreloader }) => showPreloader,
  },
  mutations: {
    [SET_PRELOADER](state, bool) {
      state.showPreloader = bool;
    },
  },
  actions: {
    setLoader({ commit }, val) {
      commit(SET_PRELOADER, val);
    },
  },
};

export default preloader;
