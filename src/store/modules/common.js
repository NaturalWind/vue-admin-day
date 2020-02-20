import { getStorage, setStorage } from '@/util/storage'

const tagDefaultValue = {
  path: '/home/index',
  name: '首页'
}

const common = {
  state: {
    themeColor: getStorage({
      name: 'themeColor'
    }) || '#409EFF',
    isCollapse: false,
    tagHistory: getStorage({
      name: 'tagHistory',
      type: 'session'
    }) || [tagDefaultValue],
    currentTag: getStorage({
      name: 'currentTag',
      type: 'session'
    }) || tagDefaultValue
  },
  actions: {},
  mutations: {
    SET_THEME_COLOR: (state, color) => {
      state.themeColor = color
      setStorage({
        name: 'themeColor',
        content: state.themeColor
      })
    },
    SET_COLLAPSE: state => {
      state.isCollapse = !state.isCollapse
    },
    ADD_TAG: (state, tag) => {
      state.currentTag = tag
      setStorage({
        type: 'session',
        name: 'currentTag',
        content: state.currentTag
      })
      if (state.tagHistory.some(item => item.path === state.currentTag.path && item.name === state.currentTag.name)) {
        return
      }
      state.tagHistory.push(tag)
      setStorage({
        type: 'session',
        name: 'tagHistory',
        content: state.tagHistory
      })
    },
    DEL_TAG: (state, tag) => {
      if (tag.path === tagDefaultValue.path && tag.name === tagDefaultValue.name) {
        return
      }
      state.tagHistory = state.tagHistory.filter(item => item.path !== tag.path && item.name !== tag.name)
      setStorage({
        type: 'session',
        name: 'tagHistory',
        content: state.tagHistory
      })
    },
    CLOSE_OTHER_TAG: state => {
      if (state.currentTag.path === tagDefaultValue.path && state.currentTag.name === tagDefaultValue.name) {
        state.tagHistory = [tagDefaultValue]
      } else {
        state.tagHistory = [tagDefaultValue, state.currentTag]
      }
      setStorage({
        type: 'session',
        name: 'tagHistory',
        content: state.tagHistory
      })
    },
    CLOSE_ALL_TAG: state => {
      state.currentTag = tagDefaultValue
      setStorage({
        type: 'session',
        name: 'currentTag',
        content: state.currentTag
      })
      state.tagHistory = [state.currentTag]
      setStorage({
        type: 'session',
        name: 'tagHistory',
        content: state.tagHistory
      })
    }
  }
}

export default common
