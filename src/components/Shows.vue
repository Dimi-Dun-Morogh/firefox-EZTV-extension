<template>
  <div>
<div v-for="(show,index) in fetchedShows" :key="index">
      <FoundShows :show="show"
    />
</div>
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

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Shows',
  components: {
    FoundShows,
    MoviesPagination,
  },
  computed: {
    ...mapGetters('eztv', ['fetchedShows', 'showsPerPage', 'totalResults', 'currentPage']),
  },
  methods: {
    ...mapActions('eztv', ['changePage']),
    onPageChange(page) {
      this.changePage(page, this.currentQuery);
    },
  },
};
</script>
