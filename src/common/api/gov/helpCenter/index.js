import request from '@api/request'
/** 帮助中心 */

/** 1.分页查询文档 */

export function helpDocsByPage(params) {
  return request({
    url: '/api/helpDocs/findByPage',
    method: 'get',
    params
  })
}

/** 2.更新帮助文档*/

export function helpDocsUpdate(data) {
  return request({
    url: '/api/helpDocs/update',
    method: 'post',
    data
  })
}
/** 3.删除帮助文档 */
export function helpDocsDelete(data) {
  return request({
    url: '/api/helpDocs/delete',
    method: 'post',
    data
  })
}

/** 4.添加帮助文档 */

export function helpDocsAdd(data) {
  return request({
    url: '/api/helpDocs/add',
    method: 'post',
    data
  })
}
