<template>
  <div class="sys-menu">
    <el-button-group class="menu-btn">
      <el-button
        v-for="(item, index) in btnGroup"
        :key="index"
        v-bind="item.props"
        v-on="item.events">{{ item.base.name }}
      </el-button>
    </el-button-group>
    <div class="menu-panel">
      <el-tree
        class="menu-tree"
        :data="menuData.data"
        :props="menuData.defaultProps"
        @node-click="clickMenuNode">
      </el-tree>
      <day-form class="menu-info" :formData="formData"></day-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTreeArr, switchTime } from '@/util/util';
import { getAllMenuApi, getCurrentMenuApi, addMenuApi, editMenuApi, delMenuApi } from '@/api/user/menu';

export default {
  data () {
    return {
      btnGroup: [
        {
          base: {
            name: '新增'
          },
          props: {
            size: 'medium',
            type: 'primary',
            icon: 'el-icon-plus',
          },
          events: {
            click: () => {
              this.clickAddMenuBtn();
            }
          }
        },
        {
          base: {
            name: '更新'
          },
          props: {
            size: 'medium',
            type: 'primary',
            icon: 'el-icon-edit',
          },
          events: {
            click: () => {
              this.clickEditMenuBtn();
            }
          }
        },
        {
          base: {
            name: '删除'
          },
          props: {
            size: 'medium',
            type: 'danger',
            icon: 'el-icon-delete',
          },
          events: {
            click: () => {
              this.clickDeleteMenuBtn();
            }
          }
        }
      ],
      currentMenuNode: undefined,
      menuData: {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      formData: {
        model: {
          id: undefined,
          parentId: 0,
          sort: 0, // 菜单排序
          icon: undefined, // 菜单图标
          name: undefined, // 菜单名称
          path: undefined, // 菜单路径：如果为 http、https 开头则采用ifrom is_jump字段判断是否跳转出去
          component: undefined, // 页面组件
          keepAlive: false, // 是否缓存页面
          showParentMenu: false, // 是否显示父菜单
          isJump: false, // 外链是否跳转
          createUser: undefined,
          createTime: undefined,
          updateUser: undefined,
          updateTime: undefined
        },
        props: {
          ref: 'menuForm'
        },
        formItemProps: {
          labelWidth: '100px'
        },
        column: [
          {
            formItemProps: {
              label: '节点ID',
              prop: 'id'
            },
            component: 'el-input',
            model: 'id',
            props: {
              readonly: true,
              placeholder: '节点ID'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '父级节点',
              prop: 'parentId'
            },
            component: 'el-input',
            model: 'parentId',
            props: {
              readonly: true,
              placeholder: '父级节点'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '排序',
              prop: 'sort'
            },
            component: 'el-input-number',
            model: 'sort',
            props: {
              min: 0,
              max: 99999,
              placeholder: '排序'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '名称',
              prop: 'name'
            },
            component: 'el-input',
            model: 'name',
            props: {
              placeholder: '名称'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '图标',
              prop: 'icon'
            },
            component: 'day-icon-select',
            model: 'icon',
            props: {
              placeholder: '图标',
              iconData: [
                {
                  label: '阿里云图标',
                  value: 'aliyun',
                  list: [
                    'el-icon-search',
                    'el-icon-search',
                    'el-icon-search'
                  ]
                }
              ]
            },
            events: {}
          },
          {
            formItemProps: {
              label: '路径',
              prop: 'path'
            },
            component: 'el-input',
            model: 'path',
            props: {
              placeholder: '支持http、https'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '组件',
              prop: 'component'
            },
            component: 'el-input',
            model: 'component',
            props: {
              placeholder: '组件'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '缓存页面',
              prop: 'keepAlive'
            },
            component: 'el-switch',
            model: 'keepAlive',
            props: {
              activeText: '是',
              inactiveText: '否'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '显示父菜单',
              prop: 'showParentMenu'
            },
            component: 'el-switch',
            model: 'showParentMenu',
            props: {
              activeText: '是',
              inactiveText: '否'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '外链是否跳转',
              prop: 'isJump'
            },
            component: 'el-switch',
            model: 'isJump',
            props: {
              activeText: '是',
              inactiveText: '否'
            },
            events: {}
          },
          {
            render: (h, data) => {
              return (
                <div>
                  <el-button props={data.props} onClick={data.events.clickSaveBtn}>保存</el-button>
                  <el-button disabled={data.props.disabled} onClick={data.events.clickCancelBtn}>取消</el-button>
                </div>
              )
            },
            props: {
              type: 'primary'
            },
            events: {
              clickSaveBtn: () => {
                this.clickSaveBtn();
              },
              clickCancelBtn: () => {
                this.clickCancelBtn();
              }
            }
          }
        ]
      }
    }
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
    initData () {
      this.disabledFormItem(true);
      this.getMenuData();
    },
    getMenuData () {
      getAllMenuApi().then(res => {
        if (res.success) {
          this.menuData.data = getTreeArr({key: 'id', pKey: 'parentId', data: res.content});
        } else {
          this.$message.error(res.message);
        }
      })
    },
    disabledFormItem (val = true) {
      let copyArr = [...this.formData.column];
      copyArr.forEach(item => {
        if (item.model !== 'id' && item.model !== 'parentId') {
          item.props.disabled = val;
        }
      })
      this.formData.column = copyArr;
    },
    resetFormModel () {
      this.formData.model = {
        id: undefined,
        parentId: 0,
        sort: 0, // 菜单排序
        icon: undefined, // 菜单图标
        name: undefined, // 菜单名称
        path: undefined, // 菜单路径：如果为 http、https 开头则采用ifrom is_jump字段判断是否跳转出去
        component: undefined, // 页面组件
        keepAlive: false, // 是否缓存页面
        showParentMenu: false, // 是否显示父菜单
        isJump: false, // 外链是否跳转
        createUser: undefined,
        createTime: undefined,
        updateUser: undefined,
        updateTime: undefined
      };
    },
    clickAddMenuBtn () {
      this.resetFormModel();
      this.formData.model.parentId = this.currentMenuNode || 0;
      this.disabledFormItem(false);
    },
    clickEditMenuBtn () {
      if (!this.formData.model.id) {
        this.$message.error('请选择菜单');
        return;
      }
      this.disabledFormItem(false);
    },
    clickDeleteMenuBtn () {
      if (!this.formData.model.id) {
        this.$message.error('请选择菜单');
        return;
      }
      delMenuApi(this.formData.model.id).then(res => {
        if (res.success) {
          this.currentMenuNode = undefined;
          this.resetFormModel();
          this.getMenuData();
          this.$message({
            type: 'success',
            message: '成功'
          })
        } else {
          this.$message.error(res.message);
        }
      })
    },
    clickMenuNode (data) {
      this.disabledFormItem(true);
      getCurrentMenuApi(data.id).then(res => {
        if (res.success) {
          this.formData.model = res.content;
          this.formData.model.keepAlive = Boolean(this.formData.model.keepAlive);
          this.formData.model.showParentMenu = Boolean(this.formData.model.showParentMenu);
          this.formData.model.isJump = Boolean(this.formData.model.isJump);
          this.currentMenuNode = this.formData.model.id;
        } else {
          this.$message.error(res.message);
        }
      })
    },
    clickSaveBtn () {
      let api = null;
      let data = JSON.parse(JSON.stringify(this.formData.model));
      if (data.id) {
        api = editMenuApi;
        data.updateUser = this.userInfo.id;
        data.updateTime = switchTime(new Date(), 'YYYY-MM-DD hh:mm:ss');
        delete data.createTime;
      } else {
        api = addMenuApi;
        data.createUser = this.userInfo.id;
        data.createTime = switchTime(new Date(), 'YYYY-MM-DD hh:mm:ss');
      }
      api(data).then(res => {
        if (res.success) {
          this.disabledFormItem(true);
          this.getMenuData();
          this.$message({
            type: 'success',
            message: '成功'
          })
        } else {
          this.$message.error(res.message);
        }
      })
    },
    clickCancelBtn () {
      this.disabledFormItem(true);
    }
  }
}
</script>

<style lang="scss" scoped>
.sys-menu {
  position: relative;
  padding: 10px 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  .menu-btn {
    position: relative;
    width: 100%;
    height: 36px;
  }
  .menu-panel {
    position: relative;
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 10px - 36px);
    .menu-tree {
      overflow-y: scroll;
      padding-right: 5px;
      width: calc(50% - 5px);
      height: 100%;
    }
    .menu-info {
      padding-left: 5px;
      width: calc(50% - 5px);
      height: 100%;
    }
  }
}
</style>
