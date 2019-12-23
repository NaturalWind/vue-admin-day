<template>
  <div class="day-sidebarItem-wrapper">
    <template v-for="item in menu">
      <!-- 一层 -->
      <!-- 1、如果路由中有 指定 父路由不显示 有 取子路由路径 没有 取当前路由路径 -->
      <!-- 2、路由名称 加 路由路径 -->
      <!-- 3、是否显示 如果路由中有 指定 父路由不显示 为true 或者 没有子路由 为true 并且 不是外链 为true 条件都成立则显示 -->
      <el-menu-item
        :index="getRouterPath(item)"
        :key="item.name + getRouterPath(item)"
        v-if="(isShowParentMenu(item) || !item.children.length) && !isURL(item.path)"
        @click="clickMenuIten(item)">
        <!-- iconfont 后面有空格 -->
        <i :class="'iconfont ' + item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

      <!-- 外链 -->
      <el-menu-item
        :index="item.path"
        :key="item.name + item.path"
        v-if="isURL(item.path)"
        @click="clickMenuIten(item)">
        <!-- iconfont 后面有空格 -->
        <i :class="'iconfont ' + item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

      <!-- 多层 -->
      <!-- 1、取当前路由路径 -->
      <!-- 2、路由名称 加 路由路径 -->
      <!-- 3、是否显示 如果有子路由 为true 并且 没有指定父路由不显示 为true 条件都成立则显示 -->
      <el-submenu
        :index="item.path"
        :key="item.name + item.path"
        v-if="item.children.length && !isShowParentMenu(item)">
        <template slot="title">
          <!-- iconfont 后面有空格 -->
          <i :class="'iconfont ' + item.icon"></i>
          <span slot="title" :class="{'el-menu--display': collapse}">{{ item.name }}</span>
        </template>
        <sidebar-item
          :menu="item.children"
          :collapse="collapse"
          :menuDisplayKey="menuDisplayKey"
          :linkJumpKey="linkJumpKey"
          :iframeComponents="iframeComponents">
        </sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  name: 'SidebarItem',
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    collapse: {
      type: Boolean
    },
    menuDisplayKey: {
      type: String,
      default: 'showParentMenu'
    },
    linkJumpKey: {
      type: String,
      default: 'isJump'
    },
    iframeComponents: {
      type: String
    }
  },
  data () {
    return {
      aLabel: null
    }
  },
  methods: {
    isURL (path) {
      return /^http[s]?:\/\/.*/.test(path);
    },
    isShowParentMenu (item) {
      if (item.children.length && !item.children[0][this.menuDisplayKey]) {
        return true;
      }
      return false;
    },
    getRouterPath (item) {
      if (item.children.length && !item.children[0][this.menuDisplayKey]) {
        return item.children[0].path;
      }
      return item.path;
    },
    clickMenuIten (item) {
      // 外链跳出窗口
      if (item[this.linkJumpKey]) {
        if (this.aLabel === null) {
          this.aLabel = document.createElement('a');
          this.aLabel.setAttribute('href', item.path);
          this.aLabel.setAttribute('target' , '_blank');
          this.aLabel.click();
        } else {
          this.aLabel.href = item.path;
          this.aLabel.click();
        }
        return;
      }
      // 判断是否是外链 是 使用iframe（定义一个公共iframe组件并且加入到路由中，这里就是使用加入路由后的路径） 不是 使用路由路径
      let routerPath = this.isURL(item.path) ? this.iframeComponents : item.path;
      // 判断是否是外链 是 使用iframe（传入外链地址，iframe组件中监听路由参数，传入src中） 不是 路由参数置空不传
      let routerQuery = this.isURL(item.path) ? {url: item.path} : undefined;
      // 如果路由中 有指定 父路由 不显示 则取 子路由
      if (item.children.length && !item.children[0][this.menuDisplayKey]) {
        routerPath = this.isURL(item.children[0].path) ? this.iframeComponents : item.children[0].path;
        routerQuery = this.isURL(item.children[0].path) ? {url: item.children[0].path} : undefined;
      }
      // 组装路由数据
      let parameter = {
        menu: item,
        router: {
          routerPath,
          routerQuery
        }
      };
      bus.$emit('clickMenuItem', parameter);
    }
  }
}
</script>

<style lang="scss">
.day-sidebarItem-wrapper {
  .el-menu--display, .el-menu--display + .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
