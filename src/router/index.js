import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './page'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...Page]
})

export default router
