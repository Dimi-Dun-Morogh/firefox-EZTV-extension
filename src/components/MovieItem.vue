<template>
  <div class="movie-item  mb-3">
    <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-info-wrap">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year"> {{ movie.Year }} </span>
      </div>
      <div class="movie-item-controls column no-gutters">
        <div class="col ">
          <BButton size="md"
          block variant="outline-light"
          @click="addFav"
          > {{ AddOrDelete}}</BButton>
        </div>
        <div class="col ">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="searchTorr"
          >
            Search on EZTV</BButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MovieItem',
  data: () => ({
  }),
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('favorites', ['favMovieIds']),
    AddOrDelete() {
      return this.favMovieIds.indexOf(this.movie.imdbID) === -1
        ? 'Add to Fav' : 'Remove from Fav';
    },
    posterBg() {
      return {
        'background-image': this.movie.Poster !== 'N/A' ? `url(${this.movie.Poster})` : 'url(https://www.wwe.com/f/styles/wwe_large/public/2016/02/Yokozuna_bio--12cbb0873e1b83a7fa05ec45614fc134.jpg)',
      };
    },
  },
  methods: {
    ...mapActions('eztv', ['fetchShows']),
    addFav() {
      const id = this.movie.imdbID;
      console.log(this.favMovieIds.indexOf(this.movie.imdbID));
      this.$emit('addfav', id);
    },
    searchTorr() {
      this.fetchShows(this.movie.imdbID);
      this.$router.push({ name: 'Search' });
    },
  },
};
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 200px;
  width: 155px;
}
.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-info-wrap {
  padding: 20px 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.2s ease;
}
.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.movie-title {
  color: #fff;
  font-size: 15px;
color: #fff;
max-height: 40px;
overflow: hidden;
}
.movie-year {
  font-size: 14px;
  color: #fff;
}
</style>
