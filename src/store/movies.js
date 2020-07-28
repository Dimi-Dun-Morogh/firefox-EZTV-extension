import { movieDbAxios } from '@/plugins/axios';
import mutations from './mutations';

const { MOVIES, PAGINATED_MOVIES, CURRENT_PAGE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    movies: [],
    moviesPerPage: 3,
    currentPage: 1,
    paginatedMovies: [],
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
  },
};

export default moviesStore;
