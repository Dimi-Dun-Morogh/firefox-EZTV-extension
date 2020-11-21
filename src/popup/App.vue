<template>
  <div>
    <Navigation />
    <Notification />
    <router-view />
    <div class="wrap-bottom">
      <span class="apiCreds"><a href="https://eztv.io/api/">eztv-api</a></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Notification from '../components/Notification.vue';
import Navigation from '../components/Navigation.vue';

export default {
  name: 'App',
  components: { Notification, Navigation },
  mounted() {
    this.initLocalStorage();
    this.initLocalStorageDwnlds();
  },
  computed: {
  },
  methods: {
    ...mapActions('favorites', ['initLocalStorage']),
    ...mapActions('downloadsHistory', ['initLocalStorageDwnlds']),
  },
};
</script>

<style>
html {
  font-size: 13.5px;
}
body {
  width: 500px;
  /* height: 370px; */
  /* min-height: 200px; */
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
  background-color: indigo !important;
}
.wrap-bottom {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.apiCreds a {
  color: #fff;
  font-size: 13px;
  text-decoration: none;
}
.history-btn {
  background-color: #1e1e1e !important;
  border-color: #10dd98 !important;
}
.history-btn:hover {
  background-color: #28a745 !important;
}
</style>
