import request from '@api/request'
/** 企业走访 */

/** 新增企业走访 */

export function addBesVisitData(data) {
  return request({
    url: '/besVisit/addBesVisitData',
    method: 'post',
    data
  })
}
/** 编辑企业走访 */

export function updateBesVisit(data) {
  return request({
    url: '/besVisit/updateBesVisit',
    method: 'post',
    data
  })
}

/** 删除企业走访 */
export function deleteBesVisitById(data) {
  return request({
    url: '/besVisit/deleteBesVisitById',
    method: 'post',
    data
  })
}
/** 走访镇街区域列表 */

export function getTownAndParkList(params) {
  return request({
    url: '/common/getTownAndParkList',
    method: 'get',
    params
  })
}

/** 分页查询走访列表 */

export function queryBesVisitByPage(params) {
  return request({
    url: '/besVisit/queryBesVisitByPage',
    method: 'get',
    params
  })
}

/** 根据 id 获取走访详情 */

export function queryBesVisitById(params) {
  return request({
    url: '/besVisit/queryBesVisitById',
    method: 'get',
    params
  })
}
/** 走访统计 */

export function besVisitStatistics(params) {
  return request({
    url: '/besVisit/besVisitStatistics',
    method: 'get',
    params
  })
}
/** 走访记录信息导出 */

export function besVisitExportData(params) {
  return request.downLoad('/besVisit/besVisitExportData', params)
}

/** 富文本内图片上传 */
export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}
