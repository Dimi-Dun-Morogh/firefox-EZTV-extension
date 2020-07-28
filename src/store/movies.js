import { movieDbAxios } from '@/plugins/axios';
import mutations from './mutations';

const {
  MOVIES, PAGINATED_MOVIES, CURRENT_PAGE, LAST_SEARCH,
} = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    movies: [],
    moviesPerPage: 3,
    currentPage: 1,
    paginatedMovies: [],
    lastSearch: '',
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [PAGINATED_MOVIES](state, value) {
      state.paginatedMovies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [LAST_SEARCH](state, value) {
      state.lastSearch = value;
    },
  },
  getters: {
    movies: ({ movies }) => movies,
    paginatedMovies: ({ paginatedMovies }) => paginatedMovies,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    currentPage: ({ currentPage }) => currentPage,
    moviesLength: ({ movies }) => movies.length,
  },
  actions: {
    async  searchMovies({ commit, dispatch }, query) {
      try {
        const response = await movieDbAxios.get(`/?s=${query}`);
        if (response.Error) {
          throw Error(response.Error);
        }
        dispatch('setLastSearch', query);
        commit(MOVIES, response.Search);
        dispatch('paginateMovies');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    paginateMovies({ commit, getters }) {
      const { movies, moviesPerPage, currentPage } = getters;
      const from = currentPage * moviesPerPage - moviesPerPage;
      const to = currentPage * moviesPerPage;
      const paginated = movies.slice(from, to);
      commit(PAGINATED_MOVIES, paginated);
    },
    changePage({ commit, dispatch }, value) {
      commit(CURRENT_PAGE, value);
      dispatch('paginateMovies');
    },
    setLastSearch({ commit }, value) {
      commit(LAST_SEARCH, value);
      localStorage.setItem('lastSearch', value);
    },
    initLastSearch({ dispatch }) {
      const lastSearch = localStorage.getItem('lastSearch');
      if (lastSearch != null) {
        dispatch('searchMovies', lastSearch);
      }
    },
  },
};
// moviesStore.dispatch('initLastSearch');

export default moviesStore;
