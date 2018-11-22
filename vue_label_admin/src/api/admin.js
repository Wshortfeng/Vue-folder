import http from '@/utils/request';
import utils from '@/utils/utils.js'
/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */

const apis = {
    getUserList(pageNum, pageSize, phone, roleId) { //获取平台方用户列表
        return http.post({
            url: 'pc/user/getUserList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                phone: phone,
                roleId: roleId
            }
        })
    },
    getRoleList(pageNum, pageSize, roleName) { //查询所有角色分组列表
        return http.post({
            url: 'pc/role/getRoleList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                roleName: roleName
            }
        })
    },
    getAllRole() { //查询所有角色分组下拉框
        return http.post({
            url: 'pc/role/getAllRole'
        })
    },
    getRole(id) { //查询色分组详情
        return http.get({
            url: 'pc/role/getRole',
            data: {
                id: id
            }
        })
    },
    addRole(roleName) { //新增角色分组
        return http.post({
            url: 'pc/role/addRole',
            data: {
                roleName: roleName,
            }
        })
    },
    updateRole(roleId, roleName, permission) { //编辑角色分组
        return http.post({
            url: 'pc/role/updateRole',
            data: {
                roleId: roleId,
                roleName: roleName,
                permission: permission
            }
        })
    },
    addUser(account, password, nickName, roleId) { //新增平台用户
        return http.post({
            url: 'pc/user/addUser',
            data: {
                account: account,
                password: password,
                nickName: nickName,
                roleId: roleId
            }
        })
    },
    updateUser(userId, account, password, nickName, roleId) { //编辑平台用户
        return http.post({
            url: 'pc/user/updateUser',
            data: {
                userId: userId,
                account: account,
                password: password,
                nickName: nickName,
                roleId: roleId
            }
        })
    },
    disableAndEnableUser(id) { //启用，禁用用户
        return http.post({
            url: 'pc/user/disableAndEnableUser',
            data: {
                id: id,
            }
        })
    },
    setUserReview(userId, type) { //审核用户
        return http.post({
            url: 'pc/user/setUserReview',
            data: {
                userId: userId,
                type: type, //1:通过，2.拒绝
            }
        })
    },
    getUserInfoById(id) { //根据id查询用户资料
        return http.get({
            url: 'pc/user/getUserInfoById',
            data: {
                id: id,
            }
        })
    },
    getNewUserApplyList(pageNum, pageSize, userType) { //获取平新用户申请列表
        return http.post({
            url: 'pc/user/getNewUserApplyList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                userType: userType,
            }
        })
    },
    getNowUserList(pageNum, pageSize, userType) { //获取平新用户申请列表
        return http.post({
            url: 'pc/user/getNowUserList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                userType: userType,
            }
        })
    },
    setUserQualification(ids, userId) { //评定标注方资质
        return http.post({
            url: 'pc/user/setUserQualification',
            data: {
                ids: ids,
                userId: userId,
            }
        })
    },
    getUserQualification(id) { //查询标注方资质
        return http.get({
            url: 'pc/user/getUserQualification',
            data: {
                id: id,
            }
        })
    },
    getPlatformProjectList(pageNum, pageSize, keyWord, status, userId) { //获取项目列表（平台方）
        return http.post({
            url: 'pc/project/getPlatformProjectList',
            data: {
                keyWord: keyWord,
                pageNum: pageNum,
                pageSize: pageSize,
                status: status,
                userId: userId
            }
        })
    },
    getLabelerUserProjectList(pageNum, pageSize, keyWord, status, userId) { //获取项目列表（标注方）
        return http.post({
            url: 'pc/project/getLabelerUserProjectList',
            data: {
                keyWord: keyWord,
                pageNum: pageNum,
                pageSize: pageSize,
                status: status,
                userId: userId
            }
        })
    },
    getUserProjectBatchList(userId, projectId) { //项目批次列表（标注方管理项目批次列表）
        return http.post({
            url: 'pc/project/getUserProjectBatchList',
            data: {
                userId: userId,
                projectId: projectId,
            }
        })
    },
    getProjectBatch(pageNum, pageSize, projectId, status) { //项目批次列表（项目方管理项目批次列表）
        return http.get({
            url: 'pc/projectBatch/getProjectBatch',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                projectId: projectId,
                status: status
            }
        })
    },
    setBatchStopOrOpen(batchId, type) { //批次开启暂停
        return http.post({
            url: 'pc/projectBatch/setBatchStopOrOpen',
            data: {
                batchId: batchId,
                type: type,
            }
        })
    },
    submitBatchAcceptance(id) { //批次提交验收
        return http.post({
            url: 'pc/projectBatch/submitBatchAcceptance',
            data: {
                id: id,
            }
        })
    },
    submitBatchAcceptance(id) { //批次提交验收
        return http.post({
            url: 'pc/projectBatch/submitBatchAcceptance',
            data: {
                id: id,
            }
        })
    },
    arbitrationBatchResult(id) { //批次仲裁结果
        return http.post({
            url: 'pc/projectBatch/arbitrationBatchResult',
            data: {
                id: id,
            }
        })
    },
    getBatchTaskList(pageNum, pageSize, batchId) { //批次任务列表
        return http.get({
            url: 'pc/projectTask/getBatchTaskList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                batchId: batchId,
            }
        })
    },
    setReviewTaskDelay(batchTaskId, endDate) { //审核任务延期
        return http.post({
            url: 'pc/projectTask/setReviewTaskDelay',
            data: {
                batchTaskId: batchTaskId,
                endDate: endDate
            }
        })
    },
    specialBatchTaskArbitrationResult(id) { //特殊批次任务仲裁结果
        return http.post({
            url: 'pc/projectTask/specialBatchTaskArbitrationResult',
            data: {
                id: id,
            }
        })
    },
    setProjectBatchDelay(batchId, endDate) { //延期
        return http.post({
            url: 'pc/projectBatch/setProjectBatchDelay',
            data: {
                batchId: batchId,
                endDate: endDate
            }
        })
    },
    reviewProject(projectId, type, remark) { //审核项目
        return http.post({
            url: 'pc/project/reviewProject',
            data: {
                projectId: projectId,
                type: type,
                remark: remark
            }
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
    getPuzzleList(pageNum, pageSize, keyWord, status) { //获取疑难杂症列表
        return http.post({
            url: 'pc/projectTask/getPuzzleList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyWord: keyWord,
                status: status
            }
        })
    },
    distributionReviewTask(batchTaskId, userId, type) { //人工分配
        return http.post({
            url: 'pc/projectTask/distributionReviewTask',
            data: {
                batchTaskId: batchTaskId,
                userId: userId,
                type: type //1：初审，2：复审，3：会诊
            }
        })
    },
    getAllAchieveQualificationUser(batchTaskId) { //获取所有满足资质的人
        return http.get({
            url: 'pc/user/getAllAchieveQualificationUser',
            data: {
                batchTaskId: batchTaskId,
            }
        })
    },
    puzzleArbitrationResult(id) { //疑难杂症仲裁结果
        return http.post({
            url: 'pc/projectTask/puzzleArbitrationResult',
            data: {
                id: id,
            }
        })
    },
    stopAndOpenPuzzleTask(batchTaskId, type) { //疑难杂症暂停开启
        return http.post({
            url: 'pc/projectTask/stopAndOpenPuzzleTask',
            data: {
                batchTaskId: batchTaskId,
                type: type
            }
        })
    },
    getLabelToolList(pageNum, pageSize, toolName, type) { //获取系统标注工具
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
    getQuestionList(pageNum, pageSize, subject, type) { //获取系统默认问题
        return http.get({
            url: 'pc/question/getQuestionList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                subject: subject,
                type: type
            }
        })
    },
    getQualificationTagTypeList(pageNum, pageSize, typeName) { //获取资质类别列表
        return http.post({
            url: 'pc/qualificationTag/getQualificationTagTypeList',
            data: {
                typeName: typeName,
                pageNum: pageNum,
                pageSize: pageSize,
            }
        })
    },
    addQualificationTagType(typeName) { //新增资质类别
        return http.post({
            url: 'pc/qualificationTag/addQualificationTagType',
            data: {
                typeName: typeName,
                createId: utils.getStorage('userId'),
            }
        })
    },
    updateQualificationTagType(id, typeName) { //修改资质类别
        return http.post({
            url: 'pc/qualificationTag/updateQualificationTagType',
            data: {
                id: id,
                typeName: typeName,
                createId: utils.getStorage('userId'),
            }
        })
    },
    getQualificationTagType(id) { //查看资质类别
        return http.get({
            url: 'pc/qualificationTag/getQualificationTagType',
            data: {
                id: id,
            }
        })
    },
    getAllQualificationTag() { //获取资质标签类别搜索使用
        return http.get({
            url: 'pc/qualificationTag/getAllQualificationTag',
        })
    },
    getQualificationTagList(pageNum, pageSize, tagTypeId, labelName) { //获取资质标签列表
        return http.post({
            url: 'pc/qualificationTag/getQualificationListTag',
            data: {
                labelName: labelName,
                pageNum: pageNum,
                tagTypeId: tagTypeId,
                pageSize: pageSize,
            }
        })
    },
    addQualificationTag(cateId, labelName) { //新增资质标签
        return http.post({
            url: 'pc/qualificationTag/addQualificationTag',
            data: {
                cateId: cateId,
                labelName: labelName,
                createId: utils.getStorage('userId'),
            }
        })
    },
    updateQualificationTag(tagTypeId, cateId, labelName) { //修改资质标签
        return http.post({
            url: 'pc/qualificationTag/updateQualificationTag',
            data: {
                tagTypeId: tagTypeId,
                cateId: cateId,
                labelName: labelName,
                createId: utils.getStorage('userId'),
            }
        })
    },
    getQualificationTag(id) { //查看资质标签
        return http.get({
            url: 'pc/qualificationTag/getQualificationTag',
            data: {
                id: id,
            }
        })
    },
    getSystemLog(pageNum, pageSize, title, startDate, endDate) { //获取资质标签列表
        return http.post({
            url: 'pc/systemLog/getSystemLog',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                title: title,
                startDate: startDate,
                endDate: endDate
            }
        })
    },
    getQualificationTag(id) { //获取系统设置
        return http.get({
            url: 'pc/systemSetting/getSystemSetting',
        })
    },
    setSystemSetting(data) { //修改系统设置
        return http.post({
            url: 'pc/systemSetting/setSystemSetting',
            data: data
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