<template>
  <div>
      <b-form inline class="form"
      >
    <b-input
      id="inline-form-input-movie"
      class="mb-2 mr-sm-2 mb-sm-0"
      size="sm"
      :placeholder="placeHolder"
      v-model="searchValue"
       @keydown.enter="onClick"
       @input="onInput"
    ></b-input>
    <b-button variant="success"
     id="button"
     @click="onClick"
     size="sm"
     v-show="showButton"
     ><b-icon icon="search"></b-icon></b-button>
  </b-form>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    showButton: {
      default: true,
    },
    placeHolder: {
      default: 'search',
    },
  },
  data: () => ({
    searchValue: '',
  }),
  methods: {
    onClick(event) {
      event.preventDefault();
      this.$emit('inputEvent', this.searchValue);
    },
    onInput() {
      this.$emit('inputEventType', this.searchValue);
    },
  },
};
</script>
<style scoped>
.form {
  margin-left: 10px;
}
#inline-form-input-movie {
  width: 160px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-radius: 0%;
  border-color: transparent;
  border-right: none;
}
#button {
  align-self: flex-start;
  border-top-left-radius: 0;
border-bottom-left-radius: 0;
}
</style>
