import request from '@api/request'

/** 问题反馈*/

/** 分页查询小微园问题 */

export function getParkQuestionByPage(params) {
  return request({
    url: '/parkQuestion/getParkQuestionByPage',
    method: 'get',
    params
  })
}

/** 处理问题 */

export function executeQuestion(data) {
  return request({
    url: '/parkQuestion/executeQuestion',
    method: 'post',
    data
  })
}
