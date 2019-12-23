<template>
  <div class="day-main-frame" :class="{'day-main-frame-collapse': isCollapse}">
    <div class="day-nav-wrapper">
      <navs></navs>
    </div>
    <div class="day-bar-wrapper">
      <bar></bar>
    </div>
    <div class="day-view-wrapper">
      <el-scrollbar style="height: 100%">
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Bar from '../bar/index';
import Navs from '../nav/index';

export default {
  components: {
    Bar,
    Navs
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.day-main-frame {
  position: relative;
  width: 100%;
  height: 100%;
  background: cadetblue;
  .day-nav-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1024;
    width: 240px;
    height: 100%;
    background: chocolate;
  }
  .day-bar-wrapper {
    position: absolute;
    top: 0;
    left: 240px;
    width: calc(100% - 240px);
    height: 64px;
    background: cornflowerblue;
  }
  .day-view-wrapper {
    position: absolute;
    top: 64px;
    left: 240px;
    width: calc(100% - 240px);
    height: calc(100% - 64px);
    background: rebeccapurple;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
.day-main-frame-collapse {
  .day-nav-wrapper {
    width: 64px;
  }
  .day-bar-wrapper {
    left: 64px;
    width: calc(100% - 64px);
  }
  .day-view-wrapper {
    left: 64px;
    width: calc(100% - 64px);
  }
}
</style>
