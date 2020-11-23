<template>
  <div>
    <Input  :showButton="false" class="d-flex justify-content-center"
    @inputEventType="filterTorrents"/>
    <transition-group v-if="paginatedShows.length" name="fadeUp" tag="div" class="wrap-eztv">
<div v-for="(show) in paginatedShows" :key="show.id">
      <FoundShows :show="show"
    />
</div>
    </transition-group>
    <span v-else class="text-center">nothing has been found by current query</span>
<MoviesPagination
 :current-page="currentPage"
      :per-page="showsPerPage"
      :total="totalResults"
      @onPageChanged="onPageChange"
/>
  </div>
</template>
<script>
import FoundShows from '@/components/FoundShows.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';
import Input from '@/components/Input.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Shows',
  data: () => ({
    query: '',
  }),
  components: {
    FoundShows,
    MoviesPagination,
    Input,
  },
  computed: {
    ...mapGetters('eztv', ['paginatedShows', 'showsPerPage', 'totalResults', 'currentPage']),
  },
  methods: {
    ...mapActions('eztv', ['changePage', 'paginateMovies', 'resetPage']),
    onPageChange(val) {
      this.changePage({ page: val, query: this.query });
    },
    async filterTorrents(val) {
      this.query = val;
      // set page to 1
      this.resetPage();
      this.paginateMovies(val);
      // console.log('query', val);
      // this.changePage({ page: 1, query: val });
    },
  },
};
</script>
<style scoped>
.wrap-eztv {
  height: 255px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
span {
  font-weight: bold;
  color: #fff;
  display: block;
  margin-bottom: 5px;
}
</style>
