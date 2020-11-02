import request from '@api/request'
export function incrementOrUpdateActivity(data) {
  return request({
    url: '/parkActivity/incrementOrUpdateActivity',
    method: 'post',
    data
  })
}
export function getActivityByPage(params) {
  return request({
    url: '/parkActivity/getActivityByPage',
    method: 'get',
    params
  })
}
export function deleteActivity(data) {
  return request({
    url: '/parkActivity/deleteActivity',
    method: 'post',
    data
  })
}
export function getParkActivityDetailById(params) {
  return request({
    url: '/parkActivity/getParkActivityDetailById',
    method: 'get',
    params
  })
}
export function publish(data) {
  return request({
    url: '/parkActivity/publish',
    method: 'post',
    data
  })
}
export function placedAtTheTop(data) {
  return request({
    url: '/parkActivity/placedAtTheTop',
    method: 'post',
    data
  })
}
export function insertOrUpdatePartyMember(data) {
  return request({
    url: '/parkPartyMember/insertOrUpdatePartyMember',
    method: 'post',
    data
  })
}
export function getParkPartyMemberByPage(params) {
  return request({
    url: '/parkPartyMember/getParkPartyMemberByPage',
    method: 'get',
    params
  })
}
export function deletePartyMember(data) {
  return request({
    url: '/parkPartyMember/deletePartyMember',
    method: 'post',
    data
  })
}
export function insertOrUpdateOperateExamine(data) {
  return request({
    url: '/parkOperateExamine/insertOrUpdateOperateExamine',
    method: 'post',
    data
  })
}
export function getOperateExamineByPage(params) {
  return request({
    url: '/parkOperateExamine/getOperateExamineByPage',
    method: 'get',
    params
  })
}
export function deleteOperateExamine(data) {
  return request({
    url: '/parkOperateExamine/deleteOperateExamine',
    method: 'post',
    data
  })
}
