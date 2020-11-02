import request from '@api/request'
/** 企业数据管理*/

/** 模板下载*/

export function downloadTemplate(params) {
  return request.downLoad('/parkManagement/downloadTemplate', params)
}

/** 分页查询小微园企业数据 */

export function getParkEntDataByPage(params) {
  return request({
    url: '/parkManagement/getParkEntDataByPage',
    method: 'get',
    params
  })
}

/** 小微园企业数据导出 */

export function exportParkEntData(params) {
  return request.downLoad('/parkManagement/exportParkEntData', params)
}

/** 编辑企业管理数据 */

export function modifyParkEntData(data) {
  return request({
    url: '/parkManagement/modifyParkEntData',
    method: 'post',
    data
  })
}

/** 小微园企业数据导入 */

export function parkEntDataImport(data) {
  return request({
    url: '/parkManagement/parkEntDataImport',
    method: 'post',
    data
  })
}
