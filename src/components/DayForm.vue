<template>
  <el-form :model="formData.model" v-bind="formData.props">
    <el-form-item
      v-for="(item, index) in formData.column"
      :key="index"
      v-bind="mergeObj(formData.formItemProps, item.formItemProps)">
      <component
        v-if="item.component"
        :is="item.component"
        v-model="formData.model[item.model]"
        v-bind="item.props"
        v-on="item.events">
      </component>
      <slot
        v-if="item.slot"
        :name="`form-${item.slot}`"
        :row="item">
      </slot>
      <render
        v-if="item.render"
        :render="item.render"
        :data="item">
      </render>
    </el-form-item>
  </el-form>
</template>

<script>
import Render from '@/components/Render';

export default {
  components: {
    Render
  },
  data () {
    return {
      formData1: {
        model: {
          test: 'test',
          slotTest: 'slotTest',
          renderTest: 'renderTest'
        },
        props: {
          ref: 'form'
        },
        formItemProps: {
          labelWidth: '100px'
        },
        column: [
          {
            formItemProps: {
              label: '测试',
              prop: 'test'
            },
            component: 'el-input',
            model: 'test',
            props: {
              placeholder: '请输入'
            },
            events: {}
          },
          {
            formItemProps: {
              label: '插槽',
              prop: 'slotTest'
            },
            slot: 'slot',
            props: {},
            events: {}
          },
          {
            formItemProps: {
              label: 'render',
              prop: 'renderTest'
            },
            render: (h, data) => {
              console.log('render', data);
              return (<i></i>)
            },
            props: {},
            events: {}
          }
        ]
      }
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        model: {},
        props: {},
        formItemProps: {},
        column: []
      })
    }
  },
  methods: {
    mergeObj (data1 = {}, data2 = {}) {
      let obj1 = JSON.parse(JSON.stringify(data1));
      let obj2 = JSON.parse(JSON.stringify(data2));
      return Object.assign(obj1, obj2);
    }
  }
}
</script>
