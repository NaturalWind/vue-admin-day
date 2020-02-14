<template>
  <div class="day-base-container" :class="{'day-base-container-full': full}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'day-base-container',
  props: {
    full: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.day-base-container {
  position: relative;
  box-sizing: border-box;
  padding: 7px 10px;
  border-radius: 10px;
  background: #fff;
}
.day-base-container-full {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.day-base-container-full::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
.day-base-container-full::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent;
}
.day-base-container-full::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: hsla(220, 4%, 58%, .3);
}
</style>
