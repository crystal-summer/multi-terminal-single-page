import request from '@api/request.js'
import qs from 'qs'
// 调档申诉

/** 获取可调档申诉记录 */

export function getNowEntType(params) {
  return request({
    url: '/selfCheck/getNowEntType',
    method: 'get',
    params
  })
}

/** 获取调档申诉列表 */

export function showTransfer(params) {
  return request({
    url: '/selfCheck/showTransfer',
    method: 'get',
    params
  })
}

/** 发起调档申诉 */

export function addTransferComplain(data) {
  return request({
    url: '/selfCheck/addTransferComplain',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: qs.stringify(data)
  })
}

/**  获取调档申诉详情*/

export function getTransferbyId(params) {
  return request({
    url: '/selfCheck/getTransferbyId',
    method: 'get',
    params
  })
}
