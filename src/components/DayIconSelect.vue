<template>
  <div :style="{pointerEvents: disabled ? 'none' : 'auto'}">
    <div @click="dialogVisible = true">
      <el-input
        v-model="currentIcon"
        readonly
        :disabled="disabled"
        placeholder="请选择图标">
        <el-button slot="append" :icon="currentIcon"></el-button>
      </el-input>
    </div>
    <el-dialog
      width="50%"
      :visible.sync="dialogVisible">
      <el-tabs v-model="currentTab">
        <el-tab-pane
          v-for="(item, index) in iconData"
          :key="index"
          :label="item.label"
          :name="item.value">
          <i
            v-for="(iconItem, iconIndex) in item.list"
            :key="iconIndex"
            class="icon-style"
            :class="iconItem"
            @click="clickIcon(iconItem)">
          </i>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentIcon: null,
      dialogVisible: false,
      currentTab: null,
      iconData1: [
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
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    iconData: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    iconData: {
      handler (val) {
        if (val.length) {
          this.currentTab = val[0].value ? val[0].value : null;
        }
      },
      deep: true,
      immediate: true
    },
    value (val) {
      this.currentIcon = val;
    }
  },
  methods: {
    clickIcon (icon) {
      this.$emit('input', icon);
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-style {
  margin: 10px 10px;
  transition: all 0.6s;
  font-size: 30px;
  width: 30px;
  height: 30px;
}
.icon-style:hover {
  transform: scale(1.4);
}
</style>
