<template>
 <div>
   <div  class="movieItemsWrap">
    <div v-for="(movie,index) in paginatedMovies"
    :key="index"
    >
      <MovieItem :movie="movie"
      @addfav="addFav"/>

  </div>

 </div>
   <!-- <button @click="onClick">click</button> -->
   <MoviesPagination
    :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @onPageChanged="onPageChange"
   />
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MovieItem from './MovieItem.vue';
import MoviesPagination from './MoviesPagination.vue';

export default {
  name: 'Movies',
  components: {
    MovieItem,
    MoviesPagination,
  },
  computed: {
    ...mapGetters('movies', ['movies', 'paginatedMovies', 'currentPage', 'moviesPerPage', 'moviesLength']),
  },
  mounted() {
    this.initLastSearch();
  },
  methods: {
    ...mapActions('movies', ['changePage', 'initLastSearch']),
    ...mapActions('favorites', ['addMovieIdToFav']),
    onClick() {
      // this.initLastSearch();
      this.$emit('emitting', 'hello');
    },
    onPageChange(page) {
      this.changePage(page);
    },
    addFav(val) {
      this.addMovieIdToFav(val);
    },
  },
};
</script>

<style scoped>
.movieItemsWrap {
  display: flex;
  justify-content: space-around;
padding-left: 5px;
padding-right: 5px;
}
</style>
