!<template>
  <div>
    <b-nav tabs align="center" fill class="navigation" justified>
      <b-nav-item @click="goHome" :active="activeHome"
        ><b-icon icon="house-fill" />Home</b-nav-item
      >
      <b-nav-item @click="Favs" :active="activeFav"
        ><b-icon icon="heart-fill" />Favorites</b-nav-item
      >
      <b-nav-item @click="HistoryGo" :active="activeHistory"
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
  }),
  computed: {
    activeFav() {
      const { name: location } = this.$route;
      return location === 'Favs';
    },
    activeHome() {
      const { name: location } = this.$route;
      return location === 'Main';
    },
    activeHistory() {
      const { name: location } = this.$route;
      return location === 'History';
    },
  },
  methods: {
    ...mapActions('favorites', ['fetchFavs']),
    goHome() {
      this.$router.push({ name: 'Main' });
    },
    Favs() {
      this.fetchFavs();
      this.$router.push({ name: 'Favs' });
    },
    HistoryGo() {
      this.$router.push({ name: 'History' });
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
