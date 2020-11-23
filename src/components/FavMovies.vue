<template>
  <div>
    <div >
        <transition-group name="fadeLeft" class="movieItemsWrap">
         <div v-for="movie in paginatedMovies" :key="movie.imdbID">
        <MovieItem :movie="movie" @addfav="RemoveFav" />
      </div>
  </transition-group>
    </div>
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @onPageChanged="onPageChange"
    />
  </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FavMovies',
  components: {
    MovieItem,
    MoviesPagination,
  },
  computed: {
    ...mapGetters('favorites', ['paginatedMovies', 'currentPage', 'moviesPerPage', 'moviesLength']),
  },
  mounted() {
  },
  methods: {
    ...mapActions('favorites', ['changePage', 'addMovieIdToFav', 'fetchFavs']),
    onPageChange(page) {
      this.$emit('onPageChange', page);
    },
    RemoveFav(val) {
      this.addMovieIdToFav(val);
      this.fetchFavs();
      console.log(val);
    },
  },
};
</script>

<style scoped>
.movieItemsWrap {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
