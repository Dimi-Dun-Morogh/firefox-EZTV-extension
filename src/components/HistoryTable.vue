/* eslint-disable vue/no-unused-vars */
<template>
  <div class="table-wrap">
    <span v-if="!history.length">you haven't downloaded anything yet</span>
    <div v-else>
      <span>previously downloaded: {{ history.length }}</span>
      <b-form-input
        v-model="filter"
        type="search"
        id="filterInput"
        placeholder="filter by series name"
        size="sm"
        class="mx-auto"
      ></b-form-input>
      <b-table
        striped
        small
        :items="history"
        :fields="fields"
        :per-page="5"
        :current-page="pagination.currentPage"
        :busy="isTableBusy"
        :filter="filter"
        @filtered="onFiltered"
        head-variant="dark"
        class="table-history"
      >
        <template #cell(file)="history">
          <a :href="history.value.link">
            <img
              :src="
                require(`../assets/${
                  history.value.torrent ? 'dl' : 'magnet'
                }.png`)
              "
              alt="download"
            />
          </a>
        </template>
        <template #cell(del)="history">
          <b-button
            variant="outline-danger"
            squared
            class="del-btn shadow-none"
            size="sm"
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
        :total="pagination.totalRows"
        :manual="false"
        @onPageChanged="onPageChange"
      />
    </div>
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
      filter: null,
      pagination: {
        currentPage: 1,
        totalRows: 1,
      },
      fields: ['name', 'file', 'date', 'del'],
    };
  },
  mounted() {
    this.initLocalStorageDwnlds();
  },
  watch: {
    history() {
      this.pagination.totalRows = this.history.length;
    },
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.pagination.totalRows = filteredItems.length;
      this.pagination.currentPage = 1;
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
  min-height: 100px;
}
.table-wrap input {
  width: 50%;
  height: 25px;
  margin: 5px 0;
}
.table-history {
  background-color: azure;
}
.del-btn {
  /* border:none; */
  border: transparent;
  outline: none;
}
.del-btn:hover,
.del-btn:focus,
.del-btn:active {
  outline: none;
  border: transparent;
  /* background-color: transparent!important; */
  /* border-radius: 25%; */
}
</style>
