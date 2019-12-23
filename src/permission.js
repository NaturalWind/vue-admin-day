import router from './router'
import store from './store'
import { validateNull } from '@/util/validate'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 存在token即已经登陆
  if (!validateNull(store.getters.token)) {
    // 如果进入页面为登陆页，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果用户信息为空，获取用户信息
      if (validateNull(store.getters.userInfo)) {
        store.dispatch('GetUserInfo').then(() => {
          next({ ...to, replace: true })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        // let label = to.name
        // let path = to.fullPath
        // if (to.meta.isTab !== false &&
        //     !validateNull(label) &&
        //     !validateNull(path)) {
        //   store.commit('ADD_TAG', {
        //     label: label,
        //     path: path,
        //     params: to.params,
        //     query: to.query
        //   })
        // }
        next()
      }
    }
  } else {
    // 如果页面不需要权限，直接进入，否则进入登陆页
    if (to.meta.isAuth === false) {
      next()
    } else {
      next({ path: '/login'} )
    }

    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
