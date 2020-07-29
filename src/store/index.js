import Vue from 'vue';
import Vuex from 'vuex';
import movies from './movies';
import favorites from './favorites';
import eztv from './eztv';
import notifications from './notification';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    favorites,
    eztv,
    notifications,
  },
});
