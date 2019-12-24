<template>
  <sidebar :menuConfig="menuConfig" @clickMenu="clickMenu"></sidebar>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from './components/Sidebar';

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      menuConfig: {
        base: {
          data: [],
          iframeComponents: '/dayIframe',
          transitionStyle: 'width .3s',
          tipStr: '暂无数据！',
          tipClass: '',
          menuDisplayKey: 'showParentMenu',
          linkJumpKey: 'isJump'
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
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  created () {
    this.menuConfig.props.collapse = this.isCollapse;
    this.$store.dispatch('GetUserMenu').then(res => {
      this.menuConfig.base.data = res;
    })
  },
  watch: {
    isCollapse (val) {
      this.menuConfig.props.collapse = val;
    }
  },
  methods: {
    clickMenu (item) {
      let parameter = {
        path: item.router.routerPath,
        query: item.router.routerQuery
      };
      this.$router.push(parameter).catch(() => {});
    }
  }
}
</script>
