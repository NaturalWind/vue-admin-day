<template>
  <div class="day-bar-content">
    <div class="day-bar-btn-wrapper">
      <div
        class="day-bar-btn-box"
        v-for="(item, index) in componentList" :key="index"
        :style="item.base.style">
        <component
          v-if="item.component"
          :is="item.component"
          v-model="item.model"
          v-bind="item.props"
          v-on="item.events">
        </component>
        <slot
          v-if="item.slot"
          :name="`component-${item.slot}`"
          v-bind="item.props"
          v-on="item.events">
        </slot>
        <render
          v-if="item.render"
          :render="item.render"
          :data="item">
        </render>
      </div>
    </div>
  </div>
</template>

<script>
import Render from '@/components/Render';

export default {
  components: {
    Render
  },
  props: {
    componentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.day-bar-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: saddlebrown;
  .day-bar-btn-wrapper {
    display: flex;
    position: relative;
    width: 100%;
    height: 45px;
    .day-bar-btn-box {
      position: absolute;
      background: cadetblue;
    }
  }
}
</style>
