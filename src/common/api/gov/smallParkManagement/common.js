import request from '@api/request'

/** 问题反馈*/

/** 根据用户查询权限小微园列表 */

export function getParkDataByUser(params) {
  return request({
    url: '/common/getParkDataByUser',
    method: 'get',
    params
  })
}
