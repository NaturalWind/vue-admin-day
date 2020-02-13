import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './page'
import Store from '../store'
import { installRouters } from '../util/util'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...Page]
})

installRouters(router, Store.state.user.userMenu)

export default router
