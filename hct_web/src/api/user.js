/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 * @Author:M.Lin
 * @Date: 2018-11-12 9:47:56
 * @Last Modified time: 2018-11-15 9:47:56
 */

import http from '@/utils/request';
import utils from '@/utils/utils.js'
const apis = {
    login(username, password) { // 登录
        return http.post({
            url: 'pc/authUser/login',
            data: {
                username: username,
                password: password,
            }
        })
    },
    updatePassword(oldPassword, newPassword) { //修改密码
        return http.post({
            url: 'pc/authUser/updatePassword',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
        })
    },
    getMyAuthUser() { //我的资料
        return http.get({
            url: 'pc/authUser/getMyAuthUser',
        })
    },
    getAuthGroups(name) { //获取组列表（不分页）
        return http.get({
            url: 'pc/authGroup/getAuthGroups',
            data: {
                name: name
            }
        })
    },
    getAuthGroupList(pageNum, pageSize, name) { //获取组列表（分页）
        return http.post({
            url: 'pc/authGroup/getAuthGroupList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                name: name
            }
        })
    },
    getAuthGroup(id) { //获取组详情
        return http.get({
            url: 'pc/authGroup/getAuthGroup',
            data: {
                id: id
            }
        })
    },
    addAuthGroup(name) { //新增组
        return http.post({
            url: 'pc/authGroup/addAuthGroup',
            data: {
                name: name,
            }
        })
    },
    updateAuthGroup(id, name) { //修改组
        return http.post({
            url: 'pc/authGroup/updateAuthGroup',
            data: {
                id: id,
                name: name,
            }
        })
    },
    addCityIdAndPermission(id, cityId, permission) { //修改权限
        return http.post({
            url: 'pc/authGroup/addCityIdAndPermission',
            data: {
                id: id,
                cityId: cityId,
                permission: permission
            }
        })
    },
    getAuthUserList(pageNum, pageSize, username, isStaff, isActive, groupId) { //获取用户列表(分页)
        return http.post({
            url: 'pc/authUser/getAuthUserList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                username: username,
                isStaff: isStaff,
                isActive: isActive,
                groupId: groupId
            }
        })
    },
    getUser(id) { //获取用户详情
        return http.get({
            url: 'sysUser/getUser',
            data: {
                id: id,
            }
        })
    },
    addAuthUser(username, password, groupIds) { //新增用户
        return http.post({
            url: 'pc/authUser/addAuthUser',
            data: {
                username: username,
                password: password,
                groupIds: groupIds
            }
        })
    },
    getAuthUser(id) { //获取用户详情
        return http.get({
            url: 'pc/authUser/getAuthUser',
            data: {
                id: id
            }
        })
    },
    updateAuthUser(id, firstName, lastName, username, password, email, isActive, isStaff, groupIds, lastLogin, createDate) { //编辑用户
        return http.post({
            url: 'pc/authUser/updateAuthUser',
            data: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                isActive: isActive,
                isStaff: isStaff,
                groupIds: groupIds,
                lastLogin: lastLogin,
                createDate: createDate,
            }
        })
    },
    delfun(url, id, date) { //公用删除
        return http.post({
            url: url,
            data: {
                id: id,
                date: date,
                _method: 'delete',
            }
        })
    }
}
export default apis