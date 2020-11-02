import request from '@api/request'
export function insertParkData(data) {
  return request({
    url: '/parkData/insertParkData',
    method: 'post',
    data
  })
}
export function getParkDataByPage(params) {
  return request({
    url: '/parkData/getParkDataByPage',
    method: 'get',
    params
  })
}
export function deleteParkData(data) {
  return request({
    url: '/parkData/deleteParkData',
    method: 'post',
    data
  })
}
export function getParkBasicData(params) {
  return request({
    url: '/parkData/getParkBasicData',
    method: 'get',
    params
  })
}
export function modifyParkBasicData(data) {
  return request({
    url: '/parkData/modifyParkBasicData',
    method: 'post',
    data
  })
}
export function getParkOperateData(params) {
  return request({
    url: '/parkData/getParkOperateData',
    method: 'get',
    params
  })
}
export function modifyParkOperateData(data) {
  return request({
    url: '/parkData/modifyParkOperateData',
    method: 'post',
    data
  })
}
export function getParkBuildData(params) {
  return request({
    url: '/parkData/getParkBuildData',
    method: 'get',
    params
  })
}
export function modifyParkBuildData(data) {
  return request({
    url: '/parkData/modifyParkBuildData',
    method: 'post',
    data
  })
}
