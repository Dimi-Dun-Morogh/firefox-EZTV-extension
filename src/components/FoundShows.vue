<template>
  <div>
<div class="wrap">
  <span @click="Visibility"
  class="title"
  >{{show.title}} <span class="seeds">seeds:{{show.seeds}}</span> </span>
<div v-show="isVisible">
  <a :href="show.magnet_url"> <img src="../assets/magnet.png" alt=""> </a>
  <a :href="show.torrent_url"> <img src="../assets/dl.png"></a>
</div>
</div>
  </div>
</template>

<script>

export default {
  name: 'FoundShows',
  data: () => ({
    isVisible: false,
  }),
  props: ['show'],
  computed: {
  },
  methods: {
    Visibility() {
      const display = !this.isVisible;
      this.isVisible = display;
    },
  },
};
</script>
<style scoped>
.wrap {
  width: 450px;
  margin-left: auto;
margin-right: auto;
background-color: #0000004d;
border-radius: 10px;
margin-bottom: 5px;
padding: 5px 5px;
}
.title  {
  color: #ffff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
}
.seeds {
  color:green;
  align-self: center;
margin-left: auto;
}
</style>
