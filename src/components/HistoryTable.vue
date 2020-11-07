/* eslint-disable vue/no-unused-vars */
<template>
  <div class="table-wrap">
    history table
    <b-table
      striped
      small
      :items="items"
      :fields="fields"
      :per-page="5"
      :current-page="pagination.currentPage"
      head-variant="dark"
      class="table-history"
    >
      <template #cell(file)="data">
        <a :href="data.value.link">
          <img
            :src="
              require(`../assets/${data.value.torrent ? 'dl' : 'magnet'}.png`)
            "
            alt="download"
          />
        </a>
      </template>
      <template #cell(del)>
        <b-button variant="outline-danger"
        squared
        class="del-btn shadow-none" size="sm"
        :pressed="false"
          ><b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </template>
    </b-table>
    <MoviesPagination
    :current-page="pagination.currentPage"
      :per-page="5"
      :total="3"
      :manual="false"
      @onPageChanged="onPageChange"/>
  </div>
</template>

<script>
import MoviesPagination from '@/components/MoviesPagination.vue';

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
      items: [{
        name: 'The walking dead s04e05',
        file: { torrent: true, link: '#' },
        date: '20.12.2020',
      },
      {
        name: 'The walking dead s04e05',
        file: { torrent: true, link: '#' },
        date: '20.12.2020',
      },
      {
        name: 'The walking dead s04e05',
        file: { torrent: true, link: '#' },
        date: '20.12.2020',
      }],
    };
  },
  methods: {
    onPageChange(page) {
      this.pagination.currentPage = page;
    },
  },
};
</script>

<style scoped>
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
