<template>
  <div>
    <Notification />
    <router-view />
    <div class="wrap-bottom">
      <span class="apiCreds"><a href="https://eztv.io/api/">eztv-api</a></span>
      <b-button variant="success" class="history-btn" @click="onClick" size="sm"
        ><b-icon :icon="historyBtn.icon"></b-icon>
        {{ historyBtn.text }}</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Notification from '../components/Notification.vue';

export default {
  name: 'App',
  components: { Notification },
  mounted() {
    this.initLocalStorage();
    this.initLocalStorageDwnlds();
  },
  computed: {
    historyBtn() {
      const { name: location } = this.$route;
      console.log(location, 'computed');
      switch (location) {
        case 'Main':
          return { text: 'history', icon: 'clock-history' };
        case 'History':
          return { text: 'home', icon: 'arrow-left-short' };
        default:
          return { text: 'history', icon: 'clock-history' };
      }
    },
  },
  methods: {
    ...mapActions('favorites', ['initLocalStorage']),
    ...mapActions('downloadsHistory', ['initLocalStorageDwnlds']),
    onClick() {
      const { name: location } = this.$router.history.current;
      console.log(location, 'onclick');
      switch (location) {
        case 'Main':
          this.$router.push({ name: 'History' });
          break;
        case 'History':
          this.$router.push({ name: 'Main' });
          break;
        default:
          this.$router.push({ name: 'History' });
      }
    },
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
