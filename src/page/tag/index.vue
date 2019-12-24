<template>
  <div class="day-tag-content">
    <div class="day-tag">
      <div class="day-tag-prev" @click="clickPrev" v-show="prevNextShow">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="day-tag-div" ref="dayTag">
        <el-tag
          class="day-tag-style"
          v-for="(tag, index) in tagHistory"
          :key="index"
          :type="'success'"
          closable
          @click="clickTagBtn(index)"
          @close="clickCloseTagBtn(index)">{{ tag.name }}
        </el-tag>
      </div>
      <div class="day-tag-next" @click="clickNext" v-show="prevNextShow">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="day-tag-options">
      <el-dropdown @command="clickOptions">
        <el-button type="primary" size="small">更多选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">关闭其他</el-dropdown-item>
          <el-dropdown-item command="1">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      tagDom: null
    }
  },
  computed: {
    ...mapGetters([
      'tagHistory'
    ]),
    prevNextShow () {
      if (this.tagDom === null) {
        return false;
      }
      return this.tagDom.scrollWidth > this.tagDom.clientWidth ? true : false;
    }
  },
  mounted () {
    this.tagDom = this.$refs.dayTag;
  },
  methods: {
    clickPrev () {
      if (this.tagDom.scrollLeft > 20) {
        this.tagDom.scrollLeft -= 20;
      }
      if (this.tagDom.scrollLeft <= 20) {
        this.tagDom.scrollLeft = 0;
      }
    },
    clickNext () {
      let max = this.tagDom.scrollWidth - this.tagDom.clientWidth;
      if (this.tagDom.scrollLeft < max) {
        let left = this.tagDom.scrollLeft += 20;
        if (left < max) {
          this.tagDom.scrollLeft = left;
        }
      }
    },
    clickTagBtn (val) {
      this.$router.push({ path: this.tagHistory[val].path }).catch(() => {});
    },
    clickCloseTagBtn (val) {
      this.$store.commit('DEL_TAG', this.tagHistory[val]);
      if (val !== 0) {
        this.$router.push({ path: this.tagHistory[val - 1].path }).catch(() => {});
      }
    },
    clickOptions (val) {
      switch (Number(val)) {
        case 0:
          this.$store.commit('CLOSE_OTHER_TAG');
          break;
        case 1:
          this.$store.commit('CLOSE_ALL_TAG');
          this.$router.push({ path: '/' }).catch(() => {});
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.day-tag-content {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 20px);
  height: 100%;
  .day-tag {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 5px;
    width: calc(100% - 101px - 5px);
    height: 100%;
    .day-tag-prev, .day-tag-next {
      position: absolute;
      z-index: 30;
      width: 30px;
      height: 30px;
      i {
        text-align: center;
        font-size: 25px;
      }
    }
    .day-tag-prev {
      left: 0;
    }
    .day-tag-next {
      right: 0;
    }
    .day-tag-div {
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 100%;
      .day-tag-style {
        margin-right: 5px;
      }
    }
  }
  .day-tag-options {
    display: flex;
    align-items: center;
    width: 101px;
    height: 100%;
  }
}
</style>
