import Vue from 'vue';
import App from './App.vue';
import router from '../router';
import store from '../store';
import '../plugins/bootstrap';
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App),
});
