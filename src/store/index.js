import Vue from 'vue'
import Vuex from 'vuex'
import log from './modules/log'
import user from './modules/user'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    log,
    user,
    common
  },
  getters
})

export default store
