<template>
  <el-dialog
    title="错误日志"
    fullscreen
    :visible.sync="visible"
    :before-close="closeDialog">
    <div class="log-btn-wrapper">
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="small"
        circle
        @click="clickClearLogBtn">
      </el-button>
    </div>
    <day-table :tableData="logList" :tableOption="tableOption"></day-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['logList'])
  },
  data () {
    return {
      tableOption: {
        props: {
          border: true
        },
        events: {},
        column: [
          {
            props: {
              type: 'expand',
              width: '110',
              prop: 'stack',
              label: '展开查看详情'
            },
            render: (h, data) => {
              return (
                <div>
                  <div>{ `地址：${data.scope.row.url}` }</div>
                  <div>{ `时间：${data.scope.row.time}` }</div>
                  <div>{ `消息：${data.scope.row.message}` }</div>
                  <div>{ `堆栈：${data.scope.row.stack}` }</div>
                  <div>{ `信息：${data.scope.row.info}` }</div>
                </div>
              )
            }
          },
          {
            props: {
              prop: 'url',
              label: '地址'
            }
          },
          {
            props: {
              prop: 'time',
              label: '时间'
            }
          }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false);
    },
    clickClearLogBtn () {
      this.$confirm('确定清空本地错误日志？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('CLEAR_LOG');
        this.closeDialog();
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.log-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
