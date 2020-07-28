import { movieDbAxios } from '@/plugins/axios';
import mutations from './mutations';

const {
  FAV_MOVIE_IDS, FAV_MOVIES, FAV_MOVIE_IDS_DELETE, PAGINATED_MOVIES, CURRENT_PAGE,
  FAV_MOVIES_DELETE_BY_ID,
} = mutations;
const FavoritesStore = {
  namespaced: true,
  state: {
    favMovieIds: [],
    favMovies: [],
    moviesPerPage: 3,
    currentPage: 1,
    paginatedMovies: [],
  },
  mutations: {
    [FAV_MOVIE_IDS](state, value) {
      state.favMovieIds.push(value);
    },
    [FAV_MOVIES](state, value) {
      state.favMovies = value;
    },
    [FAV_MOVIE_IDS_DELETE](state, value) {
      state.favMovieIds.splice(value, 1);
    },
    [PAGINATED_MOVIES](state, value) {
      state.paginatedMovies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [FAV_MOVIES_DELETE_BY_ID](state, value) {
      state.favMovies.splice(value, 1);
    },

  },
  getters: {
    favMovies: ({ favMovies }) => favMovies,
    favMovieIds: ({ favMovieIds }) => favMovieIds,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    currentPage: ({ currentPage }) => currentPage,
    paginatedMovies: ({ paginatedMovies }) => paginatedMovies,
    moviesLength: ({ favMovies }) => favMovies.length,
  },
  actions: {
    addMovieIdToFav({ commit, getters, dispatch }, id) {
      const { favMovieIds } = getters;
      const index = favMovieIds.indexOf(id);
      console.log('fav movie ids', favMovieIds);
      if (index === -1) {
        commit(FAV_MOVIE_IDS, id);
        dispatch('updateLocalStorage', favMovieIds);
        return;
      }
      if (index !== -1) {
        commit(FAV_MOVIE_IDS_DELETE, index);
        dispatch('updateLocalStorage', favMovieIds);
      }
    },
    async fetchFavs({ commit, getters, dispatch }) {
      const { favMovieIds } = getters;
      const requests = favMovieIds.map((id) => movieDbAxios.get(`/?i=${id}`));
      const response = await Promise.all(requests);
      commit(FAV_MOVIES, response);
      dispatch('paginateMovies');
    },
    paginateMovies({ commit, getters }) {
      const { favMovies, moviesPerPage, currentPage } = getters;
      const from = currentPage * moviesPerPage - moviesPerPage;
      const to = currentPage * moviesPerPage;
      const paginated = favMovies.slice(from, to);
      commit(PAGINATED_MOVIES, paginated);
    },
    changePage({ commit, dispatch }, value) {
      commit(CURRENT_PAGE, value);
      dispatch('paginateMovies');
    },

    updateLocalStorage(context, val) {
      localStorage.setItem('fav-history', JSON.stringify(val));
    },
    initLocalStorage({ commit, dispatch }) {
      const history = JSON.parse(localStorage.getItem('fav-history'));
      if (history != null && history.length !== 0) {
        history.forEach((id) => commit(FAV_MOVIE_IDS, id));
        dispatch('fetchFavs');
      }
    },
  },
};

export default FavoritesStore;
