<template>
  <div>
    <b-button variant="success" class="fav-btn"
     @click="onClick"
     size="sm"
     ><b-icon icon="arrow-left-short
"></b-icon>Back</b-button>
    <FavMovies/>
  </div>
</template>
<script>
import FavMovies from '@/components/FavMovies.vue';

export default {
  name: 'Favorites',
  components: {
    FavMovies,
  },
  methods: {
    onClick() {
      this.$router.push({ name: 'Main' });
    },
  },
};
</script>
<style scoped>
.fav-btn {
  margin-bottom: 20px;
margin-top: 10px;
margin-left: 5px;
background-color: #1e1e1e;
border-color: #10dd98;
}
</style>
