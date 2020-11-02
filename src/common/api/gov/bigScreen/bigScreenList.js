import request from '@api/request'
export function getTopTenCorporateTax(params) {
  return request({
    url: '/parkBrain/getTopTenCorporateTax',
    method: 'get',
    params
  })
}
export function getTopFiveParkTax(params) {
  return request({
    url: '/parkBrain/getTopFiveParkTax',
    method: 'get',
    params
  })
}
export function getTopSixEntIndustries(params) {
  return request({
    url: '/parkBrain/getTopSixEntIndustries',
    method: 'get',
    params
  })
}
export function getEntTaxTrend(params) {
  return request({
    url: '/parkBrain/getEntTaxTrend',
    method: 'get',
    params
  })
}
export function getEntRevenueTrend(params) {
  return request({
    url: '/parkBrain/getEntRevenueTrend',
    method: 'get',
    params
  })
}
export function getEntOutputValueTrend(params) {
  return request({
    url: '/parkBrain/getEntOutputValueTrend',
    method: 'get',
    params
  })
}
export function getTotalIndex(params) {
  return request({
    url: '/parkBrain/getTotalIndex',
    method: 'get',
    params
  })
}
export function getParkOccupancyRate(params) {
  return request({
    url: '/parkBrain/getParkOccupancyRate',
    method: 'get',
    params
  })
}
export function getParkOperateExamine(params) {
  return request({
    url: '/parkBrain/getParkOperateExamine',
    method: 'get',
    params
  })
}

export function getParkEntPosition(params) {
  return request({
    url: '/parkBrain/getParkEntPosition',
    method: 'get',
    params
  })
}
