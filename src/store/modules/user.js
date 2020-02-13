import { loginApi } from '@/api/login'
import { getUserInfoApi } from '@/api/user/userInfo'
import { getAllMenuApi } from '@/api/user/menu'
import { getStorage, setStorage } from '@/util/storage'
import { getTreeArr } from '@/util/util'

const stateCode = 200

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
        account: userInfo.username,
        password: userInfo.password
      }
      return new Promise(resolve => {
        loginApi(parameter).then(res => {
          commit('SET_TOKEN', res.content.token || '')
          resolve(res)
        })
      })
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoApi().then(res => {
          if (res.code === stateCode) {
            commit('SET_USER_INFO', res.content)
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
        getAllMenuApi().then(res => {
          if (res.code === stateCode) {
            res.content.forEach(item => {
              item.keepAlive = Boolean(item.keepAlive)
              item.showParentMenu = Boolean(item.showParentMenu)
              item.isJump = Boolean(item.isJump)
            })
            let tree = getTreeArr({key: 'id', pKey: 'parentId', data: res.content})
            resolve(tree)
            commit('SET_USER_MENU', tree)
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
