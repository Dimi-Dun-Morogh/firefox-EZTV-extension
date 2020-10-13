<template>
  <div class="movies-pagination d-flex justify-content-center">
    <BPagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
      last-number
    />
    <div class="manual-page">
      <b-form-input
        class="manual-input"
        size="sm"
        v-model="text"
        placeholder="page"
        @keyup.enter="manualPage"
      ></b-form-input>
      <b-button size="sm" class="manual-button shadow-none" @click="manualPage">
        <b-icon icon="arrow-right"></b-icon
      ></b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoviesPagination',
  data: () => ({
    text: '',
  }),
  props: {
    currentPage: {
      Type: Number,
      default: 1,
    },
    total: {
      Type: Number,
      default: 1,
    },
    perPage: {
      Type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('onPageChanged', value);
      },
    },
  },
  methods: {
    manualPage() {
      this.$emit('onPageChanged', this.text);
    },
  },
};
</script>
<style scoped>
.movies-pagination {
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
}
.movies-pagination >>> .pagination {
  margin-bottom: 7px;
}
.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  background-color: #000;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}
.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: rgb(144, 156, 147);
}
.manual-page {
  display: flex;
  height: 30px;
  margin-bottom: 5px;
}
.manual-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 30px;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
  border-right: 0px;
  margin-left: 10px;
  width: 40px;
  padding: 0px;
  padding-left: 1px;
}
.manual-input:focus {
  box-shadow: none;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.7);
}
.manual-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: transparent;
  background-color: rgba(6, 5, 5, 0.31);
  border-color: rgba(255, 255, 255, 0.7);
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}
.manual-button:hover,.manual-button:focus  {
  border-color: rgba(255, 255, 255, 0.7);
}
</style>
