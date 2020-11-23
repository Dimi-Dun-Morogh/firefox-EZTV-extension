<template>
  <div>
    <div class="wrap-top">
      <Input  :showButton="false"
      v-bind:style="{'margin-right':'5px'}"
      placeHolder="filter by title" @inputEventType="filterItems"/>
      </div>
    <FavMovies @onPageChange="PageChange"/>
  </div>
</template>
<script>
import Input from '@/components/Input.vue';
import FavMovies from '@/components/FavMovies.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Favorites',
  data: () => ({
    query: '',
  }),
  components: {
    FavMovies,
    Input,
  },
  methods: {
    ...mapActions('favorites', ['paginateMovies', 'changePage']),
    filterItems(inputValue) {
      console.log(inputValue, 'filter');
      this.query = inputValue;
      // reset page to page 1
      // this.paginateMovies(inputValue);
      this.changePage({ page: '1', query: this.query });
    },
    PageChange(val) {
      this.changePage({ page: val, query: this.query });
    },
  },
};
</script>
<style scoped>
.wrap-top {
    display: flex;
align-items: self-start;
justify-content: center;
margin-top: 10px;
margin-bottom: 10px;
padding-right:5px ;
}
.fav-btn {
margin-left: 5px;
margin-right: 60px;
background-color: #1e1e1e;
border-color: #10dd98;
}
</style>
