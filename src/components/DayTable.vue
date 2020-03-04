<template>
  <div class="day-table">
    <el-table
      :data="tableData"
      v-bind="tableOption.props"
      v-on="tableOption.events">
      <el-table-column
        v-for="(columnItem, columnIndex) in tableOption.column"
        :key="columnIndex"
        v-bind="columnItem.props">
        <template slot-scope="scope">
          <slot
            v-if="columnItem.slot"
            :name="`table-${columnItem.slot}`"
            :row="scope.row">
          </slot>
          <render
            v-if="columnItem.render"
            :render="columnItem.render"
            :data="{item: columnItem, row: scope.row}">
          </render>
          <span
            v-if="!columnItem.slot && !columnItem.render">{{ scope.row[columnItem.props.prop] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-if="tableOption.page"
        v-bind="tableOption.page.props"
        v-on="tableOption.page.events">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Render from '@/components/Render';

export default {
  components: {
    Render
  },
  data () {
    return {
      tableData1: [
        { date: '2020', aaa: '测试' },
        { date: '2020', aaa: '测试' },
        { date: '2020', aaa: '测试' },
        { date: '2020', aaa: '测试' },
        { date: '2020', aaa: '测试' }
      ],
      tableOption1: {
        props: {},
        events: {},
        column: [
          {
            props: {
              prop: 'date',
              label: '日期'
            },
            slot: 'test'
          },
          {
            props: {
              prop: 'aaa',
              label: '测试'
            },
            // render: (h, data) => {
            //   console.log('render', data);
            //   return (<i></i>)
            // }
          }
        ],
        page: {
          props: {
            background: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [10, 20, 30],
            currentPage: 1,
            pageSize: 10,
            total: 12
          },
          events: {
            'size-change': (size) => {
              console.log('==' + size);
            },
            'current-change': (page) => {
              console.log('//' + page);
            }
          }
        }
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableOption: {
      type: Object,
      default: () => ({
        props: {},
        events: {},
        column: []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.day-table {
  position: relative;
  width: 100%;
  .pagination-wrapper {
    position: relative;
    margin-top: 10px;
    overflow-x: scroll;
  }
  .pagination-wrapper::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  .pagination-wrapper::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
  }
  .pagination-wrapper::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: hsla(220, 4%, 58%, .3);
  }
}
</style>
