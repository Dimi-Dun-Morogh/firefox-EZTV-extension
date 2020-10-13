<template>
  <div>
     <router-view/>
     <span class="apiCreds"><a href="https://eztv.io/api/">eztv-api</a></span>
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
.apiCreds {
  position: absolute;
  bottom: 0;
  left:5px;
  color: #fff;
}
.apiCreds a {
  color: #fff;
  font-size: 13px;
  text-decoration: none;
}
</style>
