import request from '@api/request'
/** 问题反馈 */

/** 查询问题反馈列表 */

export function queryBesQuestionByPage(params) {
  return request({
    url: '/entQuestion/queryBesQuestionByPage',
    method: 'get',
    params
  })
}

/** 处理问题反馈 */

export function handleBesQuestion(data) {
  return request({
    url: '/entQuestion/handleBesQuestion',
    method: 'post',
    data
  })
}
