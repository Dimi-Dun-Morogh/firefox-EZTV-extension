import { ezTvAxios } from '@/plugins/axios';
import mutations from './mutations';

const {
  FETCHED_SHOWS, CURRENT_PAGE, TOTAL_FOUND, CURRENT_QUERY,
} = mutations;

const eztvStore = {
  namespaced: true,
  state: {
    fetchedShows: [],
    showsPerPage: 5,
    currentPage: 1,
    totalResults: 0,
    currentQuery: '',
  },
  mutations: {
    [FETCHED_SHOWS](state, value) {
      state.fetchedShows = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [TOTAL_FOUND](state, value) {
      state.totalResults = value;
    },
    [CURRENT_QUERY](state, value) {
      state.currentQuery = value;
    },
  },
  getters: {
    currentPage: ({ currentPage }) => currentPage,
    showsPerPage: ({ showsPerPage }) => showsPerPage,
    fetchedShows: ({ fetchedShows }) => fetchedShows,
    totalResults: ({ totalResults }) => totalResults,
    currentQuery: ({ currentQuery }) => currentQuery,
  },
  actions: {
    async fetchShows({ commit, getters }, query) {
      try {
        const { currentPage, showsPerPage } = getters;
        commit(CURRENT_QUERY, query);
        const id = query.slice(2);
        const response = await ezTvAxios.get(`get-torrents?imdb_id=${id}&limit=${showsPerPage}&page=${currentPage}`);
        commit(FETCHED_SHOWS, response.data.torrents);
        commit(TOTAL_FOUND, response.data.torrents_count);
      } catch (error) {
        console.log(error);
      }
    },
    changePage({ commit, dispatch, getters }, page) {
      const { currentQuery } = getters;
      commit(CURRENT_PAGE, page);
      dispatch('fetchShows', currentQuery);
    },
  },
};

export default eztvStore;
