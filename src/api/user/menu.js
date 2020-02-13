import request from '@/http/axios'

export function getAllMenuApi() {
  return request({
    url: '/api/menu/all',
    method: 'get'
  })
}

export function getCurrentMenuApi(id) {
  return request({
    url: '/api/menu/item/' + id,
    method: 'get'
  })
}

export function addMenuApi(parameter) {
  return request({
    url: '/api/menu/create',
    method: 'post',
    data: parameter
  })
}

export function editMenuApi(parameter) {
  return request({
    url: '/api/menu/update',
    method: 'put',
    data: parameter
  })
}

export function delMenuApi(id) {
  return request({
    url: '/api/menu/delete/' + id,
    method: 'delete'
  })
}
