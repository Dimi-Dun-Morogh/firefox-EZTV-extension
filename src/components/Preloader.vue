<template>
  <b-overlay
      :show="preloader"
      variant="dark"
      rounded="sm"
      spinner-variant="primary"
      spinner-type="grow"
      class="preloaderOverlay"
    >
    <!-- <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner> -->
    <slot name="wrapComponent"> </slot>
  </b-overlay>
</template>

<script>
export default {
  name: 'Preloader',
  props: ['preloader'],
};
</script>

<style scoped>
.preloaderOverlay >>> .spinner-grow {
  width: 6rem;
  height: 6rem;
}
/* .preloaderOverlay >>> span {
  width: 440px;
  height: 4rem;
} */
</style>
