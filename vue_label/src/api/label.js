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
    getLabelProjectList(pageNum, pageSize, keyWord, itemType, type) { //获取项目列表
        return http.post({
            url: 'pc/project/getLabelProjectList',
            data: {
                keyWord: keyWord,
                pageNum: pageNum,
                pageSize: pageSize,
                itemType: itemType,
                type: type
            }
        })
    },
    applyBatchTaskAmount(id) { //申请批次任务数量
        return http.get({
            url: 'pc/projectBatch/applyBatchTaskAmount',
            data: {
                id: id,
            }
        })
    },
    applyProjectBatch(id) { //申请项目批次
        return http.get({
            url: 'pc/projectBatch/applyProjectBatch',
            data: {
                id: id,
            }
        })
    },
    getUserLabelTaskList(pageNum, pageSize, keyWord, status) { //我的标注任务
        return http.post({
            url: 'pc/projectBatch/getUserLabelTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyWord: keyWord,
                status: status
            }
        })
    },
    abandonLabelBatchTask(id) { //放弃标注
        return http.post({
            url: 'pc/projectBatch/abandonLabelBatchTask',
            data: {
                id: id,
            }
        })
    },
    submitBatchTask(id) { //提交批次标注
        return http.post({
            url: 'pc/projectBatch/submitBatchTask',
            data: {
                id: id,
            }
        })
    },
    secondReviewBatchTask(id) { //发起复审
        return http.post({
            url: 'pc/projectBatch/secondReviewBatchTask',
            data: {
                id: id,
            }
        })
    },
    abandonSecondReview(id) { //放弃复审
        return http.post({
            url: 'pc/projectBatch/abandonSecondReview',
            data: {
                id: id,
            }
        })
    },
    arbitrationBatchTask(id) { //发起仲裁
        return http.post({
            url: 'pc/projectBatch/arbitrationBatchTask',
            data: {
                id: id,
            }
        })
    },
    abandonArbitrationBatch(id) { //批次放弃发起仲裁
        return http.post({
            url: 'pc/projectBatch/abandonArbitrationBatch',
            data: {
                id: id,
            }
        })
    },
    getLabelBatchTaskList(pageNum, pageSize, batchId, status) { //批次任务列表
        return http.post({
            url: 'pc/projectBatch/getLabelBatchTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                batchId: batchId,
                status: status
            }
        })
    },
    getUserReviewTaskList(pageNum, pageSize, keyWord, status) { //我的审核任务
        return http.post({
            url: 'pc/projectTask/getUserReviewTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyWord: keyWord,
                status: status
            }
        })
    },
    abandonReviewTask(taskReviewId, type) { //放弃审核任务
        return http.post({
            url: 'pc/projectTask/abandonReviewTask',
            data: {
                taskReviewId: taskReviewId,
                type: type //（1：初审，2：复审）
            }
        })
    },
    getUserPuzzleTaskList(pageNum, pageSize, keyWord, status) { //获取疑难杂症任务列表
        return http.post({
            url: 'pc/projectTask/getUserPuzzleTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyWord: keyWord,
                status: status
            }
        })
    },
    arbitrationPuzzleTask(id) { //疑难杂症仲裁
        return http.post({
            url: '/pc/projectTask/arbitrationPuzzleTask',
            data: {
                id: id,
            }
        })
    },
    getApplyWithdrawalList(pageNum, pageSize, sn, status, beginDate, endDate) { //获取提现申请列表
        return http.post({
            url: 'pc/incomeExpense/getApplyWithdrawalList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                sn: sn,
                status: status,
                beginDate: beginDate,
                endDate: endDate
            }
        })
    },
    updateUserAccount(data) { //账户管理
        return http.post({
            url: 'pc/user/updateUserAccount',
            data: data
        })
    },
    applyWithdrawal(amount, type) { //申请提现
        return http.post({
            url: 'pc/incomeExpense/applyWithdrawal',
            data: {
                amount: amount,
                type: type
            }
        })
    },
    getLabelTaskStatistics(beginDate, endDate) { //标注中任务统计
        return http.post({
            url: 'pc/projectTask/getLabelTaskStatistics',
            data: {
                beginDate: beginDate,
                endDate: endDate
            }
        })
    },
    getReviewTaskStatistics(beginDate, endDate) { //审核中任务统计
        return http.post({
            url: 'pc/projectTask/getReviewTaskStatistics',
            data: {
                beginDate: beginDate,
                endDate: endDate
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
}
export default apis