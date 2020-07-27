<template>
  <div>Hello World
    <searchForm/>
    <button @click="onClick">go to fav</button>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';

export default {
  name: 'Main',
  components: {
    SearchForm,
  },
  methods: {
    onClick() {
      console.log(this.$router);
      this.$router.push({ name: 'Favs' });
    },
  },
};
</script>
