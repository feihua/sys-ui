import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/content/list',
    method: 'post',
    data: query
  })
}

export function deleteContent(id) {
  return request({
    url: '/content/delete/' + id,
    method: 'delete'
  })
}

export function fetchContent(id) {
  return request({
    url: '/content/find/' + id,
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

export function createContent(data) {
  return request({
    url: '/content/add',
    method: 'post',
    data
  })
}

export function updateContent(data) {
  return request({
    url: '/content/update',
    method: 'put',
    data
  })
}
