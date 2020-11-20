import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/itemParam/list',
    method: 'post',
    data: query
  })
}

export function deleteItemParam(id) {
  return request({
    url: '/itemParam/delete/' + id,
    method: 'get'
  })
}

export function fetchItemParam(id) {
  return request({
    url: '/itemParam/find/detail' + id,
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

export function createItemParam(data) {
  return request({
    url: '/itemParam/add',
    method: 'post',
    data
  })
}

export function updateItemParam(data) {
  return request({
    url: '/itemParam/update',
    method: 'post',
    data
  })
}
