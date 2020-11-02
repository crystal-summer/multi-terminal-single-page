import request from '@api/request'
/** 1.1企业数据管理 -列表 */

/** 获取此用户权限的镇街列表 */
export function getTownListByUser(params) {
  return request({
    url: '/dataImport/getTownListByUser',
    method: 'get',
    params
  })
}

/** 获取模糊查询企业列表 */

export function getEntDataLikeName(params) {
  return request({
    url: '/common/getEntDataLikeName',
    method: 'get',
    params
  })
}

/** 查询企业列表 */

export function getEntDataByPage(params) {
  return request({
    url: '/entData/getEntDataByPage',
    method: 'get',
    params
  })
}

/** 删除企业基本信息 */

export function deleteEntData(data) {
  return request({
    url: '/entData/deleteEntData',
    method: 'post',
    data
  })
}

/** 1.2企业数据管理 -详情 */

/** 单个查询企业基本信息 */

export function getSimpleEntData(params) {
  return request({
    url: '/entData/getSimpleEntData',
    method: 'get',
    params
  })
}
/** 单个修改企业基本信息 */

export function updateSimpleEntData(data) {
  return request({
    url: '/entData/updateSimpleEntData',
    method: 'post',
    data
  })
}

/** 查询税务，排污，经信，科技数据 */

export function getEntOtherData(params) {
  return request({
    url: '/entData/getEntOtherData',
    method: 'get',
    params
  })
}

/** 1.修改税务数据 */
export function updateTaxData(data) {
  return request({
    url: "/taxData/updateOrCreateTaxData",
    method: "post",
    data
  });
}

/** 2.修改经信数据 */
export function updateTheLetterData(data) {
  return request({
    url: '/dataStatistics/updateTheLetterData',
    method: 'post',
    data
  })
}
/** 3.修改科技数据 */
export function updateTechnologyData(data) {
  return request({
    url: '/dataStatistics/updateTechnologyData',
    method: 'post',
    data
  })
}

/** 4. 修改排污数据 */
export function updatePolutionData(data) {
  return request({
    url: '/environmentData/updatePolutionData',
    method: 'post',
    data
  })
}

/** 用电   查询企业用电数据 */
export function getElectricUsed(params) {
  return request({
    url: '/electric/getElectricUsed',
    method: 'get',
    params
  })
}

/** 用电   删除企业用电数据 */
export function deleteElectricUsed(data) {
  return request({
    url: '/electric/deleteElectricUsed',
    method: 'post',
    data
  })
}

/** 用电   修改企业用电数据 */
export function updateElectricUsed(data) {
  return request({
    url: '/electric/updateElectricUsed',
    method: 'post',
    data
  })
}

/** 用电   添加企业用电数据 */
export function insertElectricUsed(data) {
  return request({
    url: '/electric/insertElectricUsed',
    method: 'post',
    data
  })
}

/** 用地   查询企业用地数据 */
export function getLandData(params) {
  return request({
    url: '/landData/getLandData',
    method: 'get',
    params
  })
}

/** 用地   删除企业用地数据 */
export function deleteRegisterLand(data) {
  return request({
    url: '/landData/deleteRegisterLand',
    method: 'post',
    data
  })
}

/** 用地   修改企业用地数据 */
export function updateRegisterLand(data) {
  return request({
    url: '/landData/updateRegisterLand',
    method: 'post',
    data
  })
}

/** 用地   添加企业用地数据 */
export function insertRegisterLand(data) {
  return request({
    url: '/landData/insertRegisterLand',
    method: 'post',
    data
  })
}

/** 承租   删除企业承租地数据 */
export function deleteRentInLand(data) {
  return request({
    url: '/landData/deleteRentInLand',
    method: 'post',
    data
  })
}

/** 承租   修改企业承租地数据 */
export function updateRentInLand(data) {
  return request({
    url: '/landData/updateRentInLand',
    method: 'post',
    data
  })
}

/** 承租   添加企业承租地数据 */
export function insertRentInLand(data) {
  return request({
    url: '/landData/insertRentInLand',
    method: 'post',
    data
  })
}

/**  出租   删除企业出租地数据 */
export function deleteRentOutLand(data) {
  return request({
    url: '/landData/deleteRentOutLand',
    method: 'post',
    data
  })
}

/** 出租   修改企业出租地数据 */
export function updateRentOutLand(data) {
  return request({
    url: '/landData/updateRentOutLand',
    method: 'post',
    data
  })
}

/** 出租   添加企业出租地数据 */
export function insertRentOutLand(data) {
  return request({
    url: '/landData/insertRentOutLand',
    method: 'post',
    data
  })
}

// ===================企业数据管理============================
/** 获取数据申诉列表*/

export function getComplaintDataByPage(params) {
  return request({
    url: '/entDataComplain/getComplaintDataByPage',
    method: 'get',
    params
  })
}

/** 获取数据申诉详情 */

export function getComplaintDetail(params) {
  return request({
    url: '/entDataComplain/getComplaintDetail',
    method: 'get',
    params
  })
}

/** 数据申诉审核 */

export function complainAudit(data) {
  return request({
    url: '/entDataComplain/complainAudit',
    method: 'post',
    data
  })
}

// ========================修改记录=====================
/** 获取修改记录日志列表*/

export function getSysLogByPage(params) {
  return request({
    url: '/sysLog/getSysLogByPage',
    method: 'get',
    params
  })
}

/** 获取修改记录详情 */

export function getSysLogDetail(params) {
  return request({
    url: '/sysLog/getSysLogDetail',
    method: 'get',
    params
  })
}
export function updateDataStatisticsData(data) {
  return request({
    url: "/dataStatistics/updateOrCreateDataStatisticsData",
    method: "post",
    data
  });
}