import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/itemCat/list',
    method: 'post',
    data: query
  })
}

export function deleteItemCat(id) {
  return request({
    url: '/itemCat/delete/' + id,
    method: 'get'
  })
}

export function fetchItemCat(id) {
  return request({
    url: '/itemCat/find/' + id,
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

export function createItemCat(data) {
  return request({
    url: '/itemCat/add',
    method: 'post',
    data
  })
}

export function updateItemCat(data) {
  return request({
    url: '/itemCat/update',
    method: 'post',
    data
  })
}
