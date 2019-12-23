<template>
  <div>home</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      aa: false
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  mounted () {
    // 给父级元素添加过渡效果
    // const parentNode = document.getElementsByClassName('pros')[0].parentNode;
    // parentNode.style.transition = 'width .3s';//this.menuConfig.base.transitionStyle;
  },
  methods: {
    clickDIV () {
      this.aa = !this.aa;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .item {
    position: relative;
    width: 240px;
    height: 300px;
    background: chocolate;
    .pros {
      position: relative;
      width: 100%;
      height: 100%;
      background: seagreen;
    }
  }
  .clickDiv {
    width: 500px;
    height: 500px;
    background: cornflowerblue;
  }
}
.home-md {
  .item {
    width: 64px;
  }
}
</style>
