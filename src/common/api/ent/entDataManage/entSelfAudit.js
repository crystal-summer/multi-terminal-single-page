import request from '@api/request.js'

// 企业自核

export function getEntCheckDataTime(params) {
  return request({
    url: '/entDetail/getEntCheckDataTime',
    method: 'get',
    params
  })
}
export function findYear(params) {
  return request({
    url: "/common/getAllYear",
    method: "get",
    params
  });
}
export function getEntComplainData(params) {
  return request({
    url: '/selfCheck/getEntComplainData',
    method: 'get',
    params
  })
}
export function submitComplain(data) {
  return request({
    url: '/selfCheck/submitComplain',
    method: 'post',
    data
  })
}
export function getComplainDetail(params) {
  return request({
    url: '/selfCheck/getComplainDetail',
    method: 'get',
    params
  })
}
export function confirmComplainData(data) {
  return request({
    url: '/selfCheck/confirmComplainData',
    method: 'post',
    data
  })
}
export function getComplainDataConfirm(params) {
  return request({
    url: '/selfCheck/getComplainDataConfirm',
    method: 'get',
    params
  })
}
