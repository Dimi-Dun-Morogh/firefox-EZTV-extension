/* eslint-disable vue/no-unused-vars */
<template>
  <div class="table-wrap">
    <span  v-if="!history.length">you haven't downloaded anything yet</span>
    <span v-else>previously downloaded: {{history.length}}</span>
    <b-table
      striped
      small
      :items="history"
      :fields="fields"
      :per-page="5"
      :current-page="pagination.currentPage"
      :busy="isTableBusy"
      head-variant="dark"
      class="table-history"
      v-show="history.length"
    >
      <template #cell(file)="history">
        <a :href="history.value.link">
          <img
            :src="
              require(`../assets/${history.value.torrent ? 'dl' : 'magnet'}.png`)
            "
            alt="download"
          />
        </a>
      </template>
      <template #cell(del)="history">
        <b-button variant="outline-danger"
        squared
        class="del-btn shadow-none" size="sm"
        :pressed="false"
        @click="onItemDelete(history.item.id)"
          ><b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </template>
    </b-table>
    <MoviesPagination
    v-show="paginationShow"
    :current-page="pagination.currentPage"
      :per-page="5"
      :total="history.length"
      :manual="false"
      @onPageChanged="onPageChange"/>
  </div>
</template>

<script>
import MoviesPagination from '@/components/MoviesPagination.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HistoryTable',
  components: {
    MoviesPagination,
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
      },
      fields: ['name', 'file', 'date', 'del'],
    };
  },
  mounted() {
    this.initLocalStorageDwnlds();
  },
  computed: {
    ...mapGetters('downloadsHistory', ['history', 'isTableBusy']),
    paginationShow() {
      return this.history.length > 5;
    },
  },
  methods: {
    ...mapActions('downloadsHistory', ['removeFromHistory', 'initLocalStorageDwnlds']),
    onPageChange(page) {
      this.pagination.currentPage = page;
    },
    onItemDelete(id) {
      console.log(id);
      this.removeFromHistory(id);
    },
  },
};
</script>

<style scoped>
span {
  display: block;
  text-align: center;
  color: #fff;
}
.table-wrap {
  padding: 0 20px;
}
.table-history {
  background-color: azure;
}
.del-btn {
  /* border:none; */
  border:transparent;
  outline: none;
}
.del-btn:hover, .del-btn:focus, .del-btn:active {
  outline: none;
  border:transparent;
  /* background-color: transparent!important; */
  /* border-radius: 25%; */
}
/* .del-btn svg:hover, .del-btn svg:focus,  .del-btn svg:active {
  color: #dc3545 !important;
} */
</style>
