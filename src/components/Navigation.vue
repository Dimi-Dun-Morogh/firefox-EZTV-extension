!<template>
  <div>
    <b-nav tabs align="center" fill class="navigation" justified>
      <b-nav-item @click="goHome" :active="Home"
        ><b-icon icon="house-fill" />Home</b-nav-item
      >
      <b-nav-item @click="Favs" :active="Favorites"
        ><b-icon icon="heart-fill" />Favorites</b-nav-item
      >
      <b-nav-item @click="HistoryGo" :active="History"
        ><b-icon icon="clock-fill" />History</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navigation',
  data: () => ({
    Home: true,
    Favorites: false,
    History: false,
  }),
  methods: {
    ...mapActions('favorites', ['fetchFavs']),
    goHome() {
      this.$router.push({ name: 'Main' });
      this.Favorites = false;
      this.History = false;
      this.Home = true;
    },
    Favs() {
      this.fetchFavs();
      this.$router.push({ name: 'Favs' });
      this.Favorites = true;
      this.History = false;
      this.Home = false;
    },
    HistoryGo() {
      this.$router.push({ name: 'History' });
      this.Favorites = false;
      this.History = true;
      this.Home = false;
    },
  },
};
</script>

<style css-scoped>
.nav-link {
  width: 100%;
}

.nav-link .b-icon {
  margin-right: 10px;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  background-color: #28a745 !important;
  color: #ffff !important;
  border-color: #10dd98 !important;
  border-right-color: transparent !important;
  border-left-color: transparent !important;
  border-radius: 0%;
}
.navigation {
  border-bottom: 2px solid #10dd98 !important;
}
.navigation .nav-item {
  background-color: #1e1e1e;
}
.nav-item {
  display: flex;
  text-align-last: justify;
}
.nav-item a {
  color: #ffff;
  font-weight: bold;
}
.nav-tabs .nav-link {
  border: 0px !important;
}
.nav-item a:hover {
  color: #ffff;
  border-color: #10dd98 !important;
  border-radius: 0%;
}
</style>
