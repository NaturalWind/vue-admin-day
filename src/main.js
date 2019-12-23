import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { iconfontUrl, iconfontVersion } from '@/config/env'
// 工具
import { loadStyle } from './util/util'
// 数据模拟
import './mock'
// 权限设定
import './permission'

iconfontVersion.forEach(item => {
  loadStyle(iconfontUrl.replace('$key', item))
})

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
