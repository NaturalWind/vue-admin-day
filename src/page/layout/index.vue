<template>
  <div class="day-main-frame" :class="{'day-main-frame-collapse': isCollapse}">
    <div class="day-nav-wrapper">
      <navs></navs>
    </div>
    <div class="day-bar-wrapper">
      <bar></bar>
    </div>
    <div class="day-tag-wrapper">
      <tags></tags>
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
import Tags from '../tag/index';

export default {
  components: {
    Bar,
    Navs,
    Tags
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
  .day-nav-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1024;
    width: 240px;
    height: 100%;
    background: #fff;
    box-shadow: 2px 0 6px rgba(0, 21, 41, .15);
  }
  .day-bar-wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 240px;
    width: calc(100% - 240px);
    height: 64px;
    background: $mainBgColor;
  }
  .day-tag-wrapper {
    position: absolute;
    top: 64px;
    left: 240px;
    width: calc(100% - 240px);
    height: 40px;
    background: $conventionalBgColor;
  }
  .day-view-wrapper {
    position: absolute;
    top: 64px + 40px;
    left: 240px;
    width: calc(100% - 240px);
    height: calc(100% - (64px + 40px));
    background: $pageBgColor;
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
  .day-tag-wrapper {
    left: 64px;
    width: calc(100% - 64px);
  }
  .day-view-wrapper {
    left: 64px;
    width: calc(100% - 64px);
  }
}
</style>
