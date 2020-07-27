<template>
  <div>
      <b-form inline class="form">
    <!-- <label class="sr-only" for="inline-form-input-name">Name</label> -->
    <b-input
      id="inline-form-input-movie"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Search"
    ></b-input>
    <b-button variant="primary" id="button"><b-icon icon="search"></b-icon></b-button>
  </b-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
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
