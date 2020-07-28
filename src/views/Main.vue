<template>
  <div>Hello World
    <searchForm/>
    <button @click="onClick">go to fav</button>
    <Movies/>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import Movies from '@/components/Movies.vue';

export default {
  name: 'Main',
  components: {
    SearchForm,
    Movies,
  },
  methods: {
    onClick() {
      console.log(this.$router);
      this.$router.push({ name: 'Favs' });
    },
  },
};
</script>
