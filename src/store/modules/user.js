import router from '@/router'
import { loginApi } from '@/api/login'
import { getUserInfoApi } from '@/api/user/userInfo'
import { getUserMenuApi } from '@/api/user/menu'
import { getStorage, setStorage } from '@/util/storage'
import { jsonTreeTransformArray, getTreeArr } from '@/util/util'
import { isURL } from '@/util/validate'

const stateCode = 200

function formattingRouter(data) {
  let menu = [];
  jsonTreeTransformArray(data, []).forEach(item => {
    if (!isURL(item.path)) {
      let menuItem = {
        parentId: item.parentId,
        id: item.id,
        path: item.path || '',
        name: item.name || '',
        component: resolve => require([item.component === 'Layout' ? '@/page/layout/index.vue' : `@/${item.component}.vue`], resolve),
        meta: {
          keepAlive: item.keepAlive || false
        },
        children: []
      }
      menu.push(menuItem)
    }
  })
  let routerMenu = getTreeArr({key: 'id', pKey: 'parentId', data: menu})
  router.addRoutes(routerMenu)
}

const user = {
  state: {
    token: getStorage({
      name: 'token',
      type: 'session'
    }) || '',
    userInfo: getStorage({
      name: 'userInfo',
      type: 'session'
    }) || {},
    userMenu: getStorage({
      name: 'userMenu',
      type: 'session'
    }) || []
  },
  actions: {
    UserLogin({ commit }, userInfo) {
      const parameter = {
        username: userInfo.username,
        password: userInfo.password
      }
      return new Promise(resolve => {
        loginApi(parameter).then(res => {
          commit('SET_TOKEN', res.token)
          resolve()
        })
      })
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoApi().then(res => {
          if (res.code === stateCode) {
            commit('SET_USER_INFO', res.data.userInfo)
            resolve()
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    GetUserMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getUserMenuApi().then(res => {
          if (res.code === stateCode) {
            formattingRouter(res.data)
            resolve(res.data)
            commit('SET_USER_MENU', res.data)
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        commit('SET_USER_MENU', [])
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setStorage({
        type: 'session',
        name: 'token',
        content: token
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStorage({
        type: 'session',
        name: 'userInfo',
        content: userInfo
      })
    },
    SET_USER_MENU: (state, userMenu) => {
      state.userMenu = userMenu
      setStorage({
        type: 'session',
        name: 'userMenu',
        content: userMenu
      })
    }
  }
}

export default user
