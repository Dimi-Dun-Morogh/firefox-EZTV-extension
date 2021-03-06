import { movieDbAxios } from '@/plugins/axios';
import mutations from './mutations';

const {
  FAV_MOVIE_IDS, FAV_MOVIES, FAV_MOVIE_IDS_DELETE, PAGINATED_MOVIES, CURRENT_PAGE,
  FAV_MOVIES_DELETE_BY_ID, FAV_MOVIE_IDS_ARR,
  FAV_MOVIES_FILTERED_LENGTH,
} = mutations;
const FavoritesStore = {
  namespaced: true,
  state: {
    favMovieIds: [],
    favMovies: [],
    moviesPerPage: 3,
    currentPage: 1,
    paginatedMovies: [],
    moviesLength: 0,
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
    [FAV_MOVIE_IDS_ARR](state, value) {
      state.favMovieIds = value;
    },
    [FAV_MOVIES_FILTERED_LENGTH](state, value) {
      state.moviesLength = value;
    },
  },
  getters: {
    favMovies: ({ favMovies }) => favMovies,
    favMovieIds: ({ favMovieIds }) => favMovieIds,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    currentPage: ({ currentPage }) => currentPage,
    paginatedMovies: ({ paginatedMovies }) => paginatedMovies,
    moviesLength: ({ moviesLength }) => moviesLength,
  },
  actions: {
    filterFavsLastSearch({ getters, dispatch }, id) {
      // last searched for torrents will be added to index 0
      console.log(`filterfavsLastSearch, id${id}`);
      const { favMovieIds } = getters;
      if (favMovieIds.indexOf(id) === -1) return; // break if id is not in favs;
      const filtered = favMovieIds.filter((item) => item !== id);
      filtered.unshift(id);
      /* commit(FAV_MOVIE_IDS_ARR, filtered); maybe it's not really needed
      ( this line  will re-render favs)
      and last searched will be on page 1 imidiatly after search; rather then on next app launch */
      dispatch('updateLocalStorage', filtered);
      dispatch('fetchFavs');
    },
    addMovieIdToFav({ commit, getters, dispatch }, id) {
      const { favMovieIds } = getters;
      const index = favMovieIds.indexOf(id);
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
      console.log(response);
      dispatch('paginateMovies');
    },
    paginateMovies({ commit, getters }, query = '') {
      const { favMovies, moviesPerPage, currentPage } = getters;
      if (query.length) commit(CURRENT_PAGE, 1);
      const from = currentPage * moviesPerPage - moviesPerPage;
      const to = currentPage * moviesPerPage;
      const filtered = favMovies.filter(({ Title }) => Title.toLowerCase()
        .includes(query.toLowerCase()));
      const paginated = filtered.slice(from, to);
      commit(FAV_MOVIES_FILTERED_LENGTH, filtered.length);
      console.log(paginated.length, paginated);
      commit(PAGINATED_MOVIES, paginated);
    },
    changePage({ commit, dispatch }, { page, query }) {
      commit(CURRENT_PAGE, page);
      console.log('current page', page);
      dispatch('paginateMovies', query);
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
