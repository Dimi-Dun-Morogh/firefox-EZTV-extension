<template>
  <div>
    Favorites
    <button @click="onClick">hello</button>
  </div>
</template>
<script>
export default {
  name: 'Favorites',
  methods: {
    onClick() {
      this.$router.push({ name: 'Main' });
    },
  },
};
</script>
