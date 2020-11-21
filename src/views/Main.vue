<template>
  <div>
    <div class="wrap-form">
<Input @inputEvent="clickInput" class="srch-frm"/>
    </div>

    <Movies
    />
  </div>
</template>

<script>
import Input from '@/components/Input.vue';
import Movies from '@/components/Movies.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Main',
  components: {
    Input,
    Movies,
  },
  methods: {
    ...mapActions('favorites', ['fetchFavs']),
    ...mapActions('movies', ['searchMovies']),
    clickInput(searchVal) {
      this.searchMovies(searchVal);
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
  margin-left: 140px;
}
.fav-btn {
  margin-left: auto;
  background-color: #1e1e1e;
border-color: #10dd98;
}

</style>
