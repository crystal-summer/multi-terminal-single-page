import request from '@api/request'
/** 金融机构管理 */

/** 查询金融机构分页列表 */

export function queryBesFinOrgByPage(params) {
  return request({
    url: '/besFinanceOrg/queryBesFinOrgByPage',
    method: 'get',
    params
  })
}

/** 删除金融机构 */

export function deleteBesFinanceOrg(params) {
  return request({
    url: '/besFinanceOrg/deleteBesFinanceOrg',
    method: 'get',
    params
  })
}

/** 查询单个金融机构 */

export function queryBesFinOrgById(params) {
  return request({
    url: '/besFinanceOrg/queryBesFinOrgById',
    method: 'get',
    params
  })
}

/** 添加金融机构 */

export function insertBesFinOrgById(data) {
  return request({
    url: '/besFinanceOrg/insertBesFinOrgById',
    method: 'post',
    data
  })
}

/** 编辑金融机构 */

export function updateBesFinanceOrg(data) {
  return request({
    url: '/besFinanceOrg/updateBesFinanceOrg',
    method: 'post',
    data
  })
}
