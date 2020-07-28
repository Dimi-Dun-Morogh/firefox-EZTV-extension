<template>
 <div>
   <div  class="movieItemsWrap">
    <div v-for="(movie,index) in paginatedMovies"
    :key="index"
    >
      <MovieItem :movie="movie"/>

  </div>

 </div>
   <button @click="onClick">click</button>
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
  methods: {
    ...mapActions('movies', ['changePage']),
    onClick() {
      console.log(this.movies);
    },
    onPageChange(page) {
      this.changePage(page);
    },
  },
};
</script>

<style scoped>
.movieItemsWrap {
  display: flex;
}
</style>
