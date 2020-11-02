import request from '@api/request'

/** 资产管理 1.布局管理*/

/** 获取小微园布局信息 */

export function getLayout(params) {
  return request({
    url: '/assetManagement/getLayout',
    method: 'get',
    params
  })
}

/** 添加小微园布局信息 */

export function createLayout(data) {
  return request({
    url: '/assetManagement/createLayout',
    method: 'post',
    data
  })
}

/** 修改小微园布局信息 */

export function updateLayout(data) {
  return request({
    url: '/assetManagement/updateLayout',
    method: 'post',
    data
  })
}
/** 删除小微园布局信息 */

export function deleteLayout(data) {
  return request({
    url: '/assetManagement/deleteLayout',
    method: 'post',
    data
  })
}

/** 资产管理 2.企业查询*/

/** 查询小微园企业信息 */

export function getParkEntData(params) {
  return request({
    url: '/assetManagement/getParkEntData',
    method: 'get',
    params
  })
}
/** 小微园企业信息导出 */

export function parkEntDataExport(params) {
  return request.downLoad('/assetManagement/parkEntDataExport', params)
}

/** 修改企业信息 */
export function updateParkEntData(data) {
  return request({
    url: '/assetManagement/updateParkEntData',
    method: 'post',
    data
  })
}

/** 资产管理 3.楼层管理*/

/** 获取幢详情信息 */
export function getFloor(params) {
  return request({
    url: '/assetManagement/getFloor',
    method: 'get',
    params
  })
}

/** 添加楼层 */

export function createFloor(data) {
  return request({
    url: '/assetManagement/createFloor',
    method: 'post',
    data
  })
}

/** 删除楼层 */

export function deleteFloor(data) {
  return request({
    url: '/assetManagement/deleteFloor',
    method: 'post',
    data
  })
}

/** 更新楼层 */

export function updateFloor(data) {
  return request({
    url: '/assetManagement/updateFloor',
    method: 'post',
    data
  })
}

/** 添加企业 */

export function createParkEntData(data) {
  return request({
    url: '/assetManagement/createParkEntData',
    method: 'post',
    data
  })
}

/** 删除企业 */

export function deleteParkEntData(data) {
  return request({
    url: '/assetManagement/deleteParkEntData',
    method: 'post',
    data
  })
}

/**  树形到楼层选择 */

export function getLayoutList(params) {
  return request({
    url: '/assetManagement/getLayoutList',
    method: 'get',
    params
  })
}
