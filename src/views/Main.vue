<template>
  <div>
    <div class="wrap-form">
<searchForm class="srch-frm"/>
     <b-button variant="success" class="fav-btn"
     @click="onClick"
     ><b-icon icon="arrow-right-short
"></b-icon>Favorites</b-button>
    </div>

    <Movies
    />
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import Movies from '@/components/Movies.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Main',
  components: {
    SearchForm,
    Movies,
  },
  methods: {
    ...mapActions('favorites', ['fetchFavs']),
    onClick() {
      this.fetchFavs();
      this.$router.push({ name: 'Favs' });
    },
  },
};
</script>
<style scoped>
.wrap-form {
  display: flex;
align-items: self-start;
margin-top: 10px;
margin-bottom: 10px;
padding-right:5px ;
}
.srch-frm {
  margin-left: 83px;
}
.fav-btn {
  margin-left: auto;
  background-color: #1e1e1e;
border-color: #10dd98;
}
</style>
