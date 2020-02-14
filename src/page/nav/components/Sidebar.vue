<template>
  <div class="day-sidebar-wrapper">
    <el-scrollbar class="day-sidebar-content">
      <div
        class="tip"
        :class="config.base.tipClass"
        v-if="!config.base.data.length">{{ config.base.tipStr }}
      </div>
      <el-menu
        :collapse-transition="false"
        v-bind="config.props"
        v-on="config.events">
        <sidebar-item
          :menu="config.base.data"
          :collapse="config.props.collapse"
          :menuDisplayKey="config.base.menuDisplayKey"
          :linkJumpKey="config.base.linkJumpKey"
          :iframeComponents="config.base.iframeComponents">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import bus from '../bus';
import SidebarItem from './SidebarItem';

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    menuConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      config: {
        base: {
          data: [],
          iframeComponents: '/dayIframe',
          transitionStyle: 'width .3s',
          tipStr: '暂无数据！',
          tipClass: '',
        },
        props: {
          mode: 'vertical',
          uniqueOpened: true,
          defaultActive: '',
          collapse: false
        },
        events: {}
      }
    }
  },
  watch: {
    menuConfig: {
      handler (val) {
        if (val) {
          for (const key in this.config) {
            if (this.config.hasOwnProperty(key)) {
              if (val[key]) {
                if (typeof val[key] === 'object') {
                  Object.assign(this.config[key], val[key]);
                } else {
                  this.config[key] = val[key];
                }
              }
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // 给父级元素添加过渡效果
    const parentNode = document.getElementsByClassName('day-sidebar-wrapper')[0].parentNode;
    parentNode.style.transition = this.config.base.transitionStyle;
    // 监听事件
    bus.$on('clickMenuItem', (item) => {
      this.$emit('clickMenu', item);
    })
  },
  beforeDestroy () {
    // 移除监听事件
    bus.$off('clickMenuItem');
  }
}
</script>

<style lang="scss">
.day-sidebar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .day-sidebar-content {
    position: relative;
    width: 100%;
    height: 100%;
    .tip {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
