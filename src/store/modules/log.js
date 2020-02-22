import { switchTime } from '@/util/util'
import { getStorage, setStorage } from '@/util/storage'

const log = {
  state: {
    logList: getStorage({ name: 'logList' }) || []
  },
  actions: {},
  mutations: {
    ADD_LOG: (state, { type, message, stack, info }) => {
      state.logList.push({
        url: window.location.href,
        time: switchTime(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        type,
        message,
        stack,
        info: info.toString()
      })
      setStorage({ name: 'logList', content: state.logList })
    },
    CLEAR_LOG: (state) => {
      state.logList = []
      setStorage({ name: 'logList', content: state.logList })
    }
  }
}

export default log
