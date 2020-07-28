import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/favs',
    name: 'Favs',
    component: () => import('../views/Favorites.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
