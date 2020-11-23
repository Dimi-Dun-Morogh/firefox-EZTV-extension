import { ezTvAxios } from '@/plugins/axios';
import mutations from './mutations';

const {
  FETCHED_SHOWS, CURRENT_PAGE, TOTAL_FOUND, CURRENT_QUERY, PAGINATED_SHOWS,
} = mutations;

const eztvStore = {
  namespaced: true,
  state: {
    fetchedShows: [],
    showsPerPage: 5,
    currentPage: 1,
    totalResults: 0,
    currentQuery: '',
    paginatedShows: [],
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
    [PAGINATED_SHOWS](state, value) {
      state.paginatedShows = value;
    },
  },
  getters: {
    currentPage: ({ currentPage }) => currentPage,
    showsPerPage: ({ showsPerPage }) => showsPerPage,
    fetchedShows: ({ fetchedShows }) => fetchedShows,
    totalResults: ({ totalResults }) => totalResults,
    currentQuery: ({ currentQuery }) => currentQuery,
    paginatedShows: ({ paginatedShows }) => paginatedShows,
  },
  actions: {
    async fetchShows({ commit, dispatch }, query) {
      try {
        dispatch('setLoader', true, { root: true });
        const id = query.slice(2);
        const response = await ezTvAxios.get(`get-torrents?imdb_id=${id}&limit=5&page=1`);
        const torrentsCount = response.data.torrents_count;
        const totalPages = Math.ceil(torrentsCount / 100);
        const allTorrents = [];
        for (let i = 1; i <= totalPages; i += 1) {
          allTorrents.push(ezTvAxios.get(`get-torrents?imdb_id=${id}&limit=100&page=${i}`));
        }
        const final = await Promise.all(allTorrents);
        const serialize = final.map((item) => item.data.torrents).flat();
        commit(FETCHED_SHOWS, serialize);
        commit(TOTAL_FOUND, serialize.length);
        dispatch('paginateMovies');
        return true;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        dispatch('setLoader', false, { root: true });
      }
    },
    paginateMovies({ commit, getters }, query = '') {
      const { fetchedShows, showsPerPage, currentPage } = getters;
      if (!query.length) {
        console.log('committing page  1');
        commit(CURRENT_PAGE, 1);
      }
      const from = currentPage * showsPerPage - showsPerPage;
      const to = currentPage * showsPerPage;
      const filtered = fetchedShows.filter(({ filename }) => filename.toLowerCase()
        .includes(query.toLowerCase()));
      console.log(query);
      const paginated = filtered.slice(from, to);
      commit(TOTAL_FOUND, filtered.length);
      console.log(paginated.length, paginated);
      commit(PAGINATED_SHOWS, paginated);
    },
    changePage({ commit, dispatch }, { page, query }) {
      commit(CURRENT_PAGE, page);
      dispatch('paginateMovies', query);
    },
    resetPage({ commit }) {
      commit(CURRENT_PAGE, '1');
    },
  },
};

export default eztvStore;
