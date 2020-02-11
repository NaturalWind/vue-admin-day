<template>
  <el-form v-model="formData.model" v-bind="formData.props">
    <el-form-item
      v-for="(item, index) in formData.column"
      :key="index"
      v-bind="mergeObj(formData.formItemProps, item.formItemProps)">
      <component
        v-if="item.component && !filterComponent.includes(item.component)"
        :is="item.component"
        v-model="formData.model[item.model]"
        v-bind="item.props"
        v-on="item.events">
      </component>
      <slot
        v-if="item.slot"
        :name="`form-${item.slot}`"
        v-bind="item.props"
        v-on="item.events">
      </slot>
      <render
        v-if="item.render"
        :render="item.render"
        :data="item">
      </render>
      <!-- 选择器 -->
      <el-select
        v-if="item.component && item.component === 'el-select'"
        v-model="formData.model[item.model]"
        v-bind="item.props"
        v-on="item.events">
        <el-option
          v-for="(optionItem, optionIndex) in item.data || []"
          :key="optionIndex"
          :label="optionItem[item.dataProps.key]"
          :value="optionItem[item.dataProps.value]">
        </el-option>
      </el-select>
      <!-- x -->
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
      filterComponent: ['el-select', 'el-radio-group', 'el-checkbox-group'],
      formData1: {
        model: {
          select: 2
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
              label: '选择器',
              prop: 'select'
            },
            component: 'el-select',
            model: 'select',
            data: [
              { label: '选项一', value: 1 },
              { label: '选项二', value: 2 }
            ],
            dataProps: {
              key: 'label',
              value: 'value'
            },
            props: {
              placeholder: '请选择'
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
