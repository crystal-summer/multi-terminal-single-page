/**
 * @description 问卷调查
 * @author xiaomeng
*/
import request from '@api/request'

const BaseURL = '/jeecg-boot'
// 分页查询当前用户创建的表单
export function queryMyDesignFormByPage(params) {
  return request.get(BaseURL + '/desform/queryMyDesignFormByPage', { params })
}

// 分页查询当前用户需要填写的表单
export function queryMyFillDesignFormByPage(params) {
  return request.get(BaseURL + '/desform/queryMyFillDesignFormByPage', { params })
}

// 新建问卷
export function addDesignForm(data) {
  return request.post(BaseURL + '/desform/add', data)
}

// 修改问卷
export function editDesignForm(data) {
  return request.post(BaseURL + '/desform/edit', data)
}

// 发布问卷
export function issueDesignForm(params) {
  return request.get(BaseURL + '/desform/issue', { params })
}

// 删除问卷
export function deleteDesignForm(params) {
  return request.get(BaseURL + '/desform/delete', { params })
}

export function addQuestion(data) {
  return request.post(BaseURL + '/desform/data/add', data)
}

// 查看该表单填写情况
export function detailsList(params) {
  return request.get(BaseURL + '/desform/data/detailsList', { params })
}
