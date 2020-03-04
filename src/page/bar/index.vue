<template>
  <div style="width: 100%;">
    <bar class="day-bar-content-scope" :componentList="componentList">
      <div class="user-wrapper" slot="component-user">
        <img
          class="user-icon"
          :src="userInfo.avatar ? userAvatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"
          alt="">
        <el-dropdown class="user-name" @command="clickUserOptions">
          <span class="el-dropdown-link" style="color: #fff;" :title="userInfo.name">{{ userInfo.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in userOptions"
              :key="index"
              :command="item.value">{{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </bar>
    <!-- log -->
    <log :visible.sync="logVisible"></log>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Log from '../log/index';
import Bar from './components/Bar';
import themeColor from '@/mixins/themeColor';
import { fileUrl } from '@/config/env';

export default {
  mixins: [themeColor()],
  components: {
    Log,
    Bar
  },
  computed: {
    userAvatar () {
      return `${fileUrl}${this.userInfo.avatar}`;
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      logVisible: false,
      userOptions: [
        {
          label: '个人信息',
          value: 0
        },
        {
          label: 'GitHub',
          value: 1
        },
        {
          label: '退出',
          value: 2
        }
      ],
      componentList: [
        {
          slot: 'user',
          base: {
            index: 0,
            direction: 'right',
            style: {
              width: 130,
              height: 30
            }
          },
          props: {},
          events: {}
        },
        {
          component: 'el-color-picker',
          base: {
            index: 1,
            direction: 'right',
            style: {
              width: 30,
              height: 30
            }
          },
          model: '#409EFF',
          props: {},
          events: {
            change: (val) => {
              this.themeVal = val;
            }
          }
        },
        {
          render: (h, data) => {
            return (
              <i
                style={data.props.style}
                class={data.props.class}
                title={data.props.title}
                onClick={data.events.click}>
              </i>
            )
          },
          base: {
            index: 2,
            direction: 'right',
            style: {
              width: 30,
              height: 30
            }
          },
          props: {
            style: { fontSize: '30px', color: '#fff' },
            class: 'iconfont iconbug',
            title: '错误日志'
          },
          events: {
            click: () => {
              this.logVisible = true;
            }
          }
        },
        {
          render: (h, data) => {
            return (
              <i
                style={data.props.style}
                class={data.props.class}
                title={data.props.title}
                onClick={data.events.click}>
              </i>
            )
          },
          base: {
            index: 0,
            direction: 'left',
            style: {
              width: 30,
              height: 30
            }
          },
          props: {
            style: { fontSize: '30px', color: '#fff' },
            class: 'iconfont iconzhankai',
            title: '展开/收起'
          },
          events: {
            click: () => {
              this.clickOpenOrCloseBtn(3);
            }
          }
        }
      ]
    }
  },
  created () {
    this.componentList.forEach(el => {
      el.base.style = this.getLeftOrRightNumber(this.componentList, el);
      // 主题颜色
      if (el.component === 'el-color-picker') {
        el.model = this.themeVal;
      }
    });
  },
  methods: {
    getLeftOrRightNumber (arr, item) {
      let directionObj = {
        left: arr.filter(el => { return el.base.direction === 'left'; }).sort((a, b) => a.base.index - b.base.index),
        right: arr.filter(el => { return el.base.direction === 'right'; }).sort((a, b) => a.base.index - b.base.index)
      };
      let obj = {
        // top: '10px',
        width: `${item.base.style.width}px`,
        height: `${item.base.style.height}px`
      };
      let num = 0;
      for (let i = 0; i < directionObj[item.base.direction].length; i++) {
        if (directionObj[item.base.direction][i].base.index !== item.base.index) {
          num += Number(directionObj[item.base.direction][i].base.style.width.replace(/px/, ''));
        } else {
          break;
        }
      }
      if (item.base.index === 0) {
        obj[item.base.direction] = '10px';
      } else {
        obj[item.base.direction] = `${10 * (item.base.index + 1) + num}px`;
      }
      return obj;
    },
    clickOpenOrCloseBtn (index) {
      this.$store.commit('SET_COLLAPSE');
      if (this.componentList[index].props.class === 'iconfont iconzhankai') {
        this.componentList[index].props.class = 'iconfont iconshouqi';
        return;
      }
      if (this.componentList[index].props.class === 'iconfont iconshouqi') {
        this.componentList[index].props.class = 'iconfont iconzhankai';
        return;
      }
    },
    clickUserOptions (val) {
      switch (val) {
        case 0:
          this.$router.push({ path: '/user/info' }).catch(() => {});
          break;
        case 1:
          window.open('https://github.com/NaturalWind/vue-admin-day');
          break;
        case 2:
          this.$store.dispatch('FedLogOut').then(() => {
            this.$router.push({ path: '/login' }).catch(() => {});
          })
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.day-bar-content-scope {
  height: 45px;
  .user-wrapper {
    display: flex;
    align-items: center;
    .user-icon {
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
    .user-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 10px;
      width: 90px;
    }
  }
  .el-color-picker {
    width: 30px;
    height: 30px;
  }
  .el-color-picker__trigger {
    width: 30px;
    height: 30px;
  }
}
</style>
