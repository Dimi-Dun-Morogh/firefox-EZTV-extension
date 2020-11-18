<template>
  <div>
    <div class="wrap">
      <span @click="Visibility" class="title"
        >{{ show.title }} <span class="seeds">seeds:{{ show.seeds }}</span>
      </span>
      <div v-show="isVisible">
        <a :href="show.magnet_url"
        @click="onMagnetClick">
          <img src="../assets/magnet.png" alt="magnet" />
        </a>
        <a :href="show.torrent_url" @click="onTorrClick" :id="show.hash">
          <img src="../assets/dl.png"
        /></a>
        <span class="size">{{ formatBytes(show.size_bytes) }}</span>
        <span class="date-realeased">released: {{ dateReleased() }}</span>
      </div>
    </div>
    <b-tooltip
      ref="tooltip"
      :target="show.hash"
      :custom-class="`tooltip-bg`"
      :disabled="true"
    >
      <!--  -->
      downloaded
    </b-tooltip>
  </div>
</template>

<script>
/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
import { mapActions } from 'vuex';

export default {
  name: 'FoundShows',
  data: () => ({
    isVisible: false,
  }),
  props: ['show'],
  computed: {
  },
  methods: {
    ...mapActions('downloadsHistory', ['addToHistory']),
    Visibility() {
      const display = !this.isVisible;
      this.isVisible = display;
    },
    formatBytes(bytes, decimals) {
      if (bytes === 0) return '0 GB';
      if (isNaN(parseInt(bytes))) return bytes;
      // eslint-disable-next-line no-param-reassign
      if (typeof bytes === 'string') bytes = parseInt(bytes);
      if (bytes === 0) return '0';
      const k = 1000;
      const dm = decimals + 1 || 3;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
    },
    dateReleased() {
      let date = (new Date(this.show.date_released_unix * 1000)).toString();
      date = date.slice(4, 15);
      return date;
    },
    onMagnetClick() {
      this.composeHistoryItem(false);
    },
    onTorrClick(e) {
      this.composeHistoryItem(true);
      e.preventDefault();
      this.$refs.tooltip.$emit('open');
      const downloading = browser.downloads.download(
        {
          url: this.show.torrent_url,
        },
      );
      downloading.then(() => {
        setTimeout(() => {
          this.$refs.tooltip.$emit('close');
        }, 3000);
      });
    },
    composeHistoryItem(isTorrent) {
      const item = {
        name: this.show.title,
        date: new Date().toString().slice(4, 15),
        file: {
          torrent: isTorrent,
          link: isTorrent ? this.show.torrent_url
            : this.show.magnet_url,
        },
        id: Number(new Date()),
        imdbId: `tt${this.show.imdb_id}`,
      };
      this.addToHistory(item);
    },
  },
};
</script>
<style scoped>
.wrap {
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  background-color: #0000004d;
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 5px 5px;
}
.title {
  color: #ffff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
}
.seeds {
  color: #05f914;
  align-self: center;
  margin-left: auto;
}
.size {
  color: #ffff;
  margin-left: 5px;
  font-size: 14px;
}
.date-realeased {
  color: #05f914;
  font-size: 12px;
  margin-left: 10px;
}
.tooltip-bg >>> .tooltip-inner {
  border: 1px solid red;
  background-color: red;
  font-weight: bold;
}
</style>
