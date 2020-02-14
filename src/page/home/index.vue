<template>
  <div class="day-home">
    <day-base-container :full="true">
      <!-- x -->
    </day-base-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.initData();
  },
  methods: {
    initData () {}
  }
}
</script>

<style lang="scss" scoped>
.day-home {
  position: relative;
  padding: 10px 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}
</style>
