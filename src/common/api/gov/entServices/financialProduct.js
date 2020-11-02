import request from '@api/request'
/** 金融产品管理 */

/** 查询金融产品分页列表 */

export function queryBesFinanceProByPage(params) {
  return request({
    url: '/financePro/queryBesFinanceProByPage',
    method: 'get',
    params
  })
}

/** 删除金融产品 */

export function delBesFinancePro(data) {
  return request({
    url: '/financePro/delBesFinancePro',
    method: 'post',
    data
  })
}

/** 查询单个金融产品 */

export function queryBesFinanceProById(params) {
  return request({
    url: '/financePro/queryBesFinanceProById',
    method: 'get',
    params
  })
}

/** 添加金融产品 */

export function insertBesFinancePro(data) {
  return request({
    url: '/financePro/insertBesFinancePro',
    method: 'post',
    data
  })
}

/** 编辑金融产品 */

export function updateBesFinancePro(data) {
  return request({
    url: '/financePro/updateBesFinancePro',
    method: 'post',
    data
  })
}
