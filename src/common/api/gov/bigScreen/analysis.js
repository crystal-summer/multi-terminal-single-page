import request from '@api/request'
import qs from 'qs'
/** 地图热更新 */

export function getHotMap(data) {
  return request({
    url: '/mutiAnalysis/getHotMap',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: qs.stringify(data)
  })
}

/** 不知道什么的单选 */

export function getRatio(params) {
  return request({
    url: '/mutiAnalysis/getRatio',
    method: 'get',
    params
  })
}

/** 总体概况 */

export function totalAnalysis(params) {
  return request({
    url: '/mutiAnalysis/totalAnalysis',
    method: 'get',
    params
  })
}

/** 行业分析 */

export function industryAnalysis(params) {
  return request({
    url: '/mutiAnalysis/industryAnalysis',
    method: 'get',
    params
  })
}

/** xxxx */

export function multipleScore(params) {
  return request({
    url: '/mutiAnalysis/multipleScore',
    method: 'get',
    params
  })
}

/**   区域分析*/

export function regionalAnalysis(params) {
  return request({
    url: '/mutiAnalysis/regionalAnalysis',
    method: 'get',
    params
  })
}

/**  */

export function townComparison(params) {
  return request({
    url: '/mutiAnalysis/townComparison',
    method: 'get',
    params
  })
}

/**  镇街榜*/

export function townRank(params) {
  return request({
    url: '/mutiAnalysis/townRank',
    method: 'get',
    params
  })
}
