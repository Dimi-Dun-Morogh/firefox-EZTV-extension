<template>
  <div>
    <Navigation />
    <Preloader :preloader="showPreloader" class="preloader-wrap">
      <template v-slot:wrapComponent>
    <Notification />
    <router-view />
    <div class="wrap-bottom">
      <span class="apiCreds"><a href="https://eztv.re/api/">eztv-api</a></span>
    </div>
      </template>
    </Preloader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Notification from '../components/Notification.vue';
import Navigation from '../components/Navigation.vue';
import Preloader from '../components/Preloader.vue';

require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'App',
  components: { Notification, Navigation, Preloader },
  mounted() {
    this.initLocalStorage();
    this.initLocalStorageDwnlds();
  },
  computed: {
    ...mapGetters(['showPreloader']),
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
  overflow: hidden;
  width: 500px;
  /* height: 370px; */
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
  /* width: 100%; */
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
.preloader-wrap {
}
</style>
