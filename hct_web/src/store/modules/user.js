import api from '@/api'
import utils from '@/utils/utils.js'


export default {
    namespaced: true, //在module中企业命名空间
    state: {
        token: utils.getToken(),
        onlineDevice: utils.getSession('ONLINE_DEVICE'),
        controlDevice: utils.getSession('CONTROL_DEVICE'),
        username: utils.getSession('USER_NAME'),
		permission:utils.getSession('PERMISSION'),
		groupId:utils.getSession('GROUPID'),
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            utils.setSession("TOKEN", token);
        },
        SET_USER_NAME: (state, username) => {
            state.username = username
            utils.setSession("USER_NAME", username);
        },
		SET_PERMISSION:(state, permission) => {
            state.permission = permission
            utils.setSession("PERMISSION", permission);
        },
		SET_GROUPID:(state, groupId) => {
            state.groupId = groupId
            utils.setSession("GROUPID", groupId);
        },
    },
    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.userName.trim()
            return new Promise((resolve, reject) => {
                api.loginByUsername(username, userInfo.password).then(response => {
                    const data = response.data
                    commit('setToken', data.token)
                    setToken(response.data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取平台用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.user.getUserInfo(state.token).then(response => {
                    if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                        reject('error')
                    }
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户未读消息
        getNotReadMessageCount({ commit, state }) {
            var timer = setInterval(function() {
                if (utils.getToken()) {
                    return new Promise((resolve, reject) => {
                        api.user.getNotReadMessageCount().then(response => {
                            const data = response.data
                            commit("setNotReadMessage", data)
                            resolve(response)
                        }).catch(error => {
                            reject(error)
                        })
                    })
                } else {
                    clearInterval(timer)
                    return false
                }
            }, 300000)
        },

        // 获取账户余额
        getUserAccountBalance({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.user.getUserAccountBalance().then(response => {
                    const data = response.data
                    commit("useraccountBalance", data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 检测token
        checkToken({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.user.checkToken().then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}