<template>
 <div>
   <div >
      <transition-group name="slideLeft" class="movieItemsWrap">
    <div v-for="movie in paginatedMovies"
    :key="movie.imdbID"  >
      <MovieItem :movie="movie"
      @addfav="addFav"
      class="movie"/>
  </div>
  </transition-group>
 </div>
   <!-- <button @click="onClick">click</button> -->
<div  v-show="moviesLength">
     <MoviesPagination
    :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @onPageChanged="onPageChange"
   />
</div>
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
  data: () => ({
  }),
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
      console.log(this.moviesLength);
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
.wrap-toast {
  width: 300px;
}

</style>
