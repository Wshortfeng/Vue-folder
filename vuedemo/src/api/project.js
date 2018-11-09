/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 * @Author:M.Lin zkm
 * @Date: 2018-9-20 13:43:55
 * @Last Modified time: 2018-10-11 23:15:57
 */

import http from '@/utils/request';
import utils from '@/utils/utils.js'
const apis = {
    applyProject(dto) { //申请项目
        return http.post({
            url: 'pc/project/applyProject',
            typea: 1,
            data: dto
        })
    },
    applyUserProject(id) { //提交申请项目
        return http.post({
            url: 'pc/project/applyUserProject',
            data: {
                id: id
            }
        })
    },
    getUserProjectList(pageNum, pageSize, keyWord, status) { //获取项目列表
        return http.post({
            url: 'pc/project/getUserProjectList',
            data: {
                keyWord: keyWord,
                pageNum: pageNum,
                pageSize: pageSize,
                status: status
            }
        })
    },
    removeApplyProject(id) { //取消申请项目
        return http.post({
            url: 'pc/project/removeApplyProject',
            data: {
                id: id
            }
        })
    },
    upAndDownProject(id) { //项目上下架
        return http.post({
            url: 'pc/project/upAndDownProject',
            data: {
                id: id
            }
        })
    },
    getProject(id) { //查询项目详情
        return http.get({
            url: 'pc/project/getProject',
            data: {
                id: id
            }
        })
    },
    getProgressProjectList() { //获取进行中项目
        return http.get({
            url: 'pc/project/getProgressProjectList',
        })
    },
    getProjectTaskStatistics(id) { //获取进行中项目状态统计
        return http.get({
            url: 'pc/project/getProjectTaskStatistics',
            data: {
                id: id
            }
        })
    },
    addProjectData(data) { //项目添加数据
        return http.post({
            url: 'pc/project/addProjectData',
            typea: 2,
            data: data
        })
    },
    downloadProjectData(id) { //下载项目数据
        return http.post({
            url: 'pc/project/downloadProjectData',
            data: {
                id: id
            }
        })
    },
    getProjectTaskList(pageNum, pageSize, projectId) {
        return http.get({
            url: 'pc/projectTask/getProjectTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                projectId: projectId
            }
        })
    },
    getUserLableToolList(pageNum, pageSize) { //获取我的标注工具列表
        return http.get({
            url: 'pc/labelTool/getUserLabelToolList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        })
    },
    getLabelToolList(pageNum, pageSize, toolName, type) { //获取标注工具列表
        return http.get({
            url: 'pc/labelTool/getLabelToolList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                toolName: toolName,
                type: type
            }
        })
    },
    getLableTool(id) { //获取标注工具详情
        return http.get({
            url: 'pc/labelTool/getLabelTool',
            data: {
                id: id
            }
        })
    },
    applyUserLabelTool(id) { //申请标注工具
        return http.post({
            url: 'pc/labelTool/applyUserLabelTool',
            data: {
                id: id
            }
        })
    },
    applyLableTool(toolName, toolImage, type, toolOwner) { //标注工具添加
        return http.post({
            url: 'pc/labelTool/applyLabelTool',
            data: {
                toolName: toolName,
                toolImage: toolImage,
                type: type,
                toolOwner: toolOwner
            }
        })
    },
    updateLableTool(id, toolName, toolImage, type) { //标注工具编辑
        return http.post({
            url: 'pc/labelTool/updateLabelTool',
            data: {
                toolName: toolName,
                toolImage: toolImage,
                type: type,
                id: id
            }
        })
    },
    getQuestionList(pageNum, pageSize, subject, type, status) { //获取问题列表
        return http.get({
            url: 'pc/question/getQuestionList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                subject: subject,
                type: type,
                status: status
            }
        })
    },
    getUserQuestionList(pageNum, pageSize) { //获取我的问题列表
        return http.get({
            url: 'pc/question/getUserQuestionList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        })
    },
    applyQuestion(dto) { //新增问题
        return http.post({
            url: 'pc/question/applyQuestion',
            data: dto,
            typea: 1
        })
    },
    updateQuestion(dto) { //编辑问题
        return http.post({
            url: 'pc/question/updateQuestion',
            data: dto,
            typea: 1
        })
    },
    applyUserQuestion(id) { //申请问题
        return http.get({
            url: 'pc/question/applyUserQuestion',
            data: {
                id: id
            }
        })
    },
    getProblem(id) { //查询问题详情
        return http.get({
            url: 'pc/question/getProblem',
            data: {
                id: id
            }
        })
    },
    getAllQualificationTag() { //获取资质标签类别搜索使用
        return http.get({
            url: 'pc/qualificationTag/getAllQualificationTag',
            data: {}
        })
    },
    getQualificationTagTypeList(pageNum, pageSize, typeName) { //获取资质标签类别
        return http.get({
            url: 'pc/qualificationTag/getQualificationTagTypeList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                typeName: typeName,
            }
        })
    },
    getQualificationListTag(pageNum, pageSize, labelName, tagTypeId) { //获取资质标签名称
        return http.post({
            url: 'pc/qualificationTag/getQualificationListTag',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                labelName: labelName,
                tagTypeId: tagTypeId
            }
        })
    },
    getIncomeExpenseList(pageNum, pageSize, sn, billNo, transactionObject, transactionType, beginTime, endTime, noteTaker) { //获取项目方资金列表
        return http.post({
            url: 'pc/incomeExpense/getIncomeExpenseList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                sn: sn,
                billNo: billNo,
                transactionObject: transactionObject,
                transactionType: transactionType,
                beginTime: beginTime,
                endTime: endTime,
                noteTaker: noteTaker
            }
        })
    },
    getNotificationList(pageNum, pageSize, title, isRead, beginTime, endTime) { //获取项目方我的消息
        return http.post({
            url: 'pc/notification/getNotificationList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                title: title,
                isRead: isRead,
                beginTime: beginTime,
                endTime: endTime,
            }
        })
    },
    setAllNotificationRead() { //全部设为已读
        return http.post({
            url: 'pc/notification/setAllNotificationRead',
            data: {}
        })
    },
    setNotificationRead(id) { //单个设为已读
        return http.post({
            url: 'pc/notification/setNotificationRead',
            data: {
                id: id
            }
        })
    },
    getPuzzleTaskList(pageNum, pageSize, keyWord, status) { //获取疑难杂症任务列表
        return http.post({
            url: 'pc/projectTask/getPuzzleTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyWord: keyWord,
                status: status
            }
        })
    },
    getProjectBatchTask(id) { //查看任务详情
        return http.get({
            url: 'pc/projectTask/getProjectBatchTask',
            data: {
                id: id
            }
        })
    },
    acceptancePuzzleTask(id, status) { //验收疑难杂症任务
        return http.post({
            url: 'pc/projectTask/acceptancePuzzleTask',
            data: {
                id: id,
                status: status
            }
        })
    },
    getPuzzleTaskAmount(id) { //计算疑难杂症金额
        return http.post({
            url: 'pc/projectTask/getPuzzleTaskAmount',
            data: {
                id: id
            }
        })
    },
    settlePuzzleTask(id) { //结算疑难杂症
        return http.post({
            url: 'pc/projectTask/settlePuzzleTask',
            data: {
                id: id
            }
        })
    },
    getAcceptanceBatchTaskList(id) { //获取项目验收批次列表
        return http.post({
            url: 'pc/projectBatch/getAcceptanceBatchTaskList',
            data: {
                id: id
            }
        })
    },
    getProjectBatchList(pageNum, pageSize, projectId, status) { //获取项目批次列表
        return http.get({
            url: 'pc/projectBatch/getProjectBatchList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                projectId: projectId,
                status: status
            }
        })
    },
    getProjectBatchAmount(id) { //查询批次金额
        return http.get({
            url: 'pc/projectBatch/getProjectBatchAmount',
            data: {
                id: id,
            }
        })
    },
    settleProjectBatch(id) { //批次结算
        return http.post({
            url: 'pc/projectBatch/settleProjectBatch',
            data: {
                id: id,
            }
        })
    },
    acceptanceBatchTask(id, status) { //批次验收
        return http.post({
            url: 'pc/projectBatch/acceptanceBatchTask',
            data: {
                id: id,
                status: status
            }
        })
    },
    getProjectBatchTaskList(pageNum, pageSize, projectId, batchId, status) { //获取批次详情列表
        return http.get({
            url: 'pc/projectBatch/getProjectBatchTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                projectId: projectId,
                batchId: batchId,
                status: status
            }
        })
    },
    getSpecialBatchTaskAmount(id) { //计算特殊批次金额
        return http.post({
            url: 'pc/projectTask/getSpecialBatchTaskAmount',
            data: {
                id: id,
            }
        })
    },
    settleSpecialBatchTask(id) { //结算特殊批次金额
        return http.post({
            url: 'pc/projectTask/settleSpecialBatchTask',
            data: {
                id: id,
            }
        })
    },
    getQuestionAnswer(labelId, projectQuestionId) { //获取单个问题答案
        return http.post({
            url: 'pc/label/getQuestionAnswer',
            data: {
                labelId: labelId,
                projectQuestionId: projectQuestionId
            }
        })
    },
    getQuestionAnswerList(id) { //获取问题答案列表
        return http.post({
            url: 'pc/label/getQuestionAnswerList',
            data: {
                id: id
            }
        })
    },
    setProjectQuestion(options, projectId, taskId, labelId, projectQuestionId, type, content) { //修改提交问题
        return http.post({
            url: 'pc/label/setProjectQuestion',
            data: {
                options: options,
                projectId: projectId,
                taskId: taskId,
                labelId: labelId,
                projectQuestionId: projectQuestionId,
                type: type,
                content: content
            }
        })
    },
    getBatchTaskLabelList(pageNum, pageSize, batchId) { //标注工具里获取左侧任务列表
        return http.get({
            url: '/pc/projectTask/getBatchTaskLabelList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                batchId: batchId
            }
        })
    },
    getBatchLabelList(id) { //标注工具里获取左侧任务列表批次查看
        return http.post({
            url: 'pc/projectTask/getBatchLabelList',
            data: {
                id: id
            }
        })
    },
    updateLabel(labelId, image, labelData, status) { //修改保存完成标注数据
        return http.post({
            url: 'pc/label/updateLabel',
            data: {
                labelId: labelId,
                image: image,
                labelData: labelData,
                status: status
            }
        })
    },
    notPassTaskLabel(batchTaskId, type) { //审核任务不通过
        return http.post({
            url: 'pc/projectTask/notPassTaskLabel',
            data: {
                batchTaskId: batchTaskId,
                type: type
            }
        })
    },
    reviewTask(taskReviewId, labelId, reviewType, type) { //审核任务
        return http.post({
            url: 'pc/projectTask/reviewTask',
            data: {
                taskReviewId: taskReviewId,
                labelId: labelId,
                reviewType: reviewType,
                type: type
            }
        })
    },
    delfun(url, id) { //公用删除方法
        return http.post({
            url: url,
            data: {
                id: id,
                _method: 'delete'
            }
        })
    }
}
export default apis