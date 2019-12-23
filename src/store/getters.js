const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userMenu: state => state.user.userMenu,
  isCollapse: state => state.common.isCollapse
}

export default getters
