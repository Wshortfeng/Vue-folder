
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
    login(account, password) { // 登录
        return http.post({
            url: 'sysUser/login',
            data: {
                account: account,
                password: password,
            }
        })
    },
    getEmailCode(email) { //获取邮箱验证码
        return http.post({
            url: 'sysUser/getEmailCode',
            data: {
                email: email,
            }
        })
    },
    forgetPassword(email, verCode, password) { // 忘记密码
        return http.post({
            url: 'sysUser/forgetPassword',
            data: {
                email: email,
                verCode: verCode,
                password: password,
            }
        })
    },
    getUserList(pageNum, pageSize) { //获取用户列表
        return http.get({
            url: 'sysUser/getUserList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
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
    addUser(username, password, userType, phone, email) { //新增管理员
        return http.post({
            url: 'sysUser/addUser',
            data: {
                username: username,
                password: password,
                userType: userType,
                phone: phone,
                email: email
            }
        })
    },
    updateUser(id, password, phone, email) { //新增管理员
        return http.post({
            url: 'sysUser/updateUser',
            data: {
                id: id,
                password: password,
                phone: phone,
                email: email
            }
        })
    },
    delfun(url, id) { //公用删除
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