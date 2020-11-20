import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/item/list',
    method: 'post',
    data: query
  })
}

export function deleteItem(id) {
  return request({
    url: '/item/delete/' + id,
    method: 'delete'
  })
}

export function fetchItem(id) {
  return request({
    url: '/item/find/detail' + id,
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

export function createItem(data) {
  return request({
    url: '/item/add',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/item/update',
    method: 'post',
    data
  })
}
