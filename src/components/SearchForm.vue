<template>
  <div>
      <b-form inline class="form"
      >
    <!-- <label class="sr-only" for="inline-form-input-name">Name</label> -->
    <b-input
      id="inline-form-input-movie"
      class="mb-2 mr-sm-2 mb-sm-0"
      size="sm"
      placeholder="Search"
      v-model="searchValue"
       @keydown.enter="onClick"
    ></b-input>
    <b-button variant="success"
     id="button"
     @click="onClick"
     size="sm"
     ><b-icon icon="search"></b-icon></b-button>
  </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchForm',
  data: () => ({
    searchValue: '',
  }),
  methods: {
    ...mapActions('movies', ['searchMovies']),
    onClick(event) {
      event.preventDefault();
      this.searchMovies(this.searchValue);
    },
  },
};
</script>
<style scoped>
.form {
  margin-left: 10px;
}
#inline-form-input-movie {
  width: 200px;
  border-top-right-radius: 0;
border-bottom-right-radius: 0;
}
#button {
  align-self: flex-start;
  border-top-left-radius: 0;
border-bottom-left-radius: 0;
}
</style>
