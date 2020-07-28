<template>
  <div>
    <div class="nav-buttons">
          <b-button variant="success" class="fav-btn"
     @click="onClickBack"
     ><b-icon icon="arrow-left-short
"></b-icon>Back</b-button>
<span>found: {{totalResults}}</span>
          <b-button variant="success" class="fav-btn"
     @click="onClickFav"
     ><b-icon icon="arrow-right-short
"></b-icon>Favorites</b-button>
    </div>
    <Shows/>
  </div>
</template>

<script>
import Shows from '@/components/Shows.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'SearchTorrent',
  components: {
    Shows,
  },
  computed: {
    ...mapGetters('eztv', ['totalResults']),
  },
  methods: {
    onClickBack() {
      this.$router.push({ name: 'Main' });
    },
    onClickFav() {
      this.$router.push({ name: 'Favs' });
    },
  },
};
</script>

<style scoped>
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.fav-btn {
   background-color: #1e1e1e;
border-color: #10dd98;
}
span {
  color:#ffff;
}
</style>
