<template>
  <div>
    <div class="nav-buttons">
      <span>found: {{totalResults}}</span>
    </div>
    <Shows />
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
  },
};
</script>

<style scoped>
.nav-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.fav-btn {
  background-color: #1e1e1e;
  border-color: #10dd98;
  margin-top: 10px;
margin-left: 5px;
margin-right: 5px;
}
span {
  color: #ffff;
}
</style>
