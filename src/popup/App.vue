<template>
  <div>
     <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { },
  mounted() {
    this.initLocalStorage();
  },
  methods: {
    ...mapActions('favorites', ['initLocalStorage']),
  },
};
</script>

<style>
body {
  width: 500px;
  /* height: 370px; */
  /* min-height: 200px; */
  background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
  background-color: indigo!important;
}
</style>
