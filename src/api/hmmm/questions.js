/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
// <<
import { createAPI } from '@/utils/request'
// 获取基础题库列表
export const baseQuestionList = data => createAPI('/questions', 'get', data)

// 基础题库详情
export const baseDetailList = data => createAPI(`/questions/${data.id}`, 'get', data)

// 批量导入题
export const batchQuestion = data => createAPI('/questions/batch', 'post', data)

// 基础题库添加
export const addQuestionList = data => createAPI('/questions', 'post', data)

// 基础题库修改
export const updateQuestionList = data => createAPI(`/questions/${data.id}`, 'put', data)

// 基础题库删除
export const removeQuestionList = data => createAPI(`/questions/${data.id}`, 'delete', data)

// 精选题库加入取消
export const choiceAdd = data => createAPI(`/questions/choice/${data.id}/${data.choiceState}`, 'patch', data)

// 精选题库列表
export const choice = data => createAPI('/questions/choice', 'get', data)

// 精选题库上下架
export const choicePublish = data => createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)

// 试题审核
export const choiceCheck = data => createAPI(`/questions/check/${data.id}`, 'post', data)

// 试题审核意见列表
export const auditOpinions = data => createAPI(`/questions/${data.id}/auditOpinions`, 'get', data)

// 出题记录
export const setRecords = data => createAPI(`/questions/${data.id}/setRecords`, 'get', data)

// 组题列表
export const randoms = data => createAPI('/questions/randoms', 'get', data)

// 组题列表删除
export const removeRandoms = data => createAPI(`/questions/randoms/${data.id}`, 'delete', data)

// 获取组题列表
export const problemSets = data => createAPI('/questions/randoms', 'get', data)
// 删除
export const delData = data => createAPI(`/questions/randoms/${data.id}`, 'delete', data)
// =======
// >>>>>>> 556f2c1b5ed4ad0fcc0f537311841ad923858c86
