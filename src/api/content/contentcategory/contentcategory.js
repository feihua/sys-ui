import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/contentCategory/list',
    method: 'post',
    data: query
  })
}

export function fetchTreeList(query) {
  return request({
    url: '/contentCategory/list',
    method: 'post',
    data: query
  })
}

export function deleteContentCategory(id) {
  return request({
    url: '/contentCategory/delete/' + id,
    method: 'get'
  })
}

export function fetchContentCategory(id) {
  return request({
    url: '/contentCategory/find/' + id,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createContentCategory(data) {
  return request({
    url: '/contentCategory/add',
    method: 'post',
    data
  })
}

export function updateContentCategory(data) {
  return request({
    url: '/contentCategory/update',
    method: 'post',
    data
  })
}
