import http from '../utils/request';
/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */

const apis = {
    getTelCode() {
        return http.get({
            url: 'user/getcode',
        })
    },
    register(tel, pwd, code) {
        return http.post({
            url: 'user/register',
            data: {
                tel: tel,
                pwd: pwd,
                code: code
            }
        })
    },
    login(tel, pwd) {
        return http.post({
            url: 'pc/user/login',
            data: {
                userName: tel,
                password: pwd,
            }
        })
    },
    getUserInfo() {
        return http.get({
            url: 'user/info',
        })
    },
    checkLogin() {
        return http.get({
            url: 'user/checklogin',
        })
    },
}
export default apis