import request from '@/http/axios'

export function getUserInfoApi() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function updateUserPwdApi(parameter) {
  return request({
    url: '/api/user/pwd',
    method: 'post',
    data: parameter
  })
}

export function updateUserInfoApi(parameter) {
  return request({
    url: '/api/user/update',
    method: 'put',
    data: parameter
  })
}
