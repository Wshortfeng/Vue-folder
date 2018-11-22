import api from '@/api'
import utils from '@/utils/utils.js'


export default {
    namespaced: true, //在module中企业命名空间
    state: {
        userType: utils.getStorage('userType'),
        loginStatus: utils.getStorage('loginStatus'),
        token: utils.getToken(),
        userId: utils.getStorage('userId'),
        nickName: utils.getStorage('nickName'),
        account: utils.getStorage('account'),
        applyCode: utils.getStorage('applyCode'),
        status: utils.getStorage('status'),
        notreadmessage: 0,
        rememberloginstatus: false,
        useraccountBalance: '0',
    },

    mutations: {
        setToken: (state, token) => {
            state.token = token
            utils.setStorage("TokenKey", token);
        },
        setRoleType: (state, userType) => {
            state.userType = userType
            utils.setStorage("userType", userType);
        },
        setLoginStatus: (state, loginStatus) => {
            state.loginStatus = loginStatus
            utils.setStorage("loginStatus", loginStatus);
        },
        setUserId: (state, userId) => {
            state.userId = userId
            utils.setStorage("userId", userId);
        },
        setNickName: (state, nickName) => {
            state.nickName = nickName
            utils.setStorage("nickName", nickName);
        },
        setStatus: (state, status) => {
            state.status = status
            utils.setStorage("status", status);
        },
        setAccount: (state, account) => {
            state.account = account
            utils.setStorage("account", account);
        },
        setApplyCode: (state, applyCode) => {
            state.applyCode = applyCode
            utils.setStorage("applyCode", applyCode);
        },
        setNotReadMessage: (state, notreadmessage) => {
            state.notreadmessage = notreadmessage
        },
        setRememberloginstatus: (state, rememberloginstatus) => {
            state.rememberloginstatus = rememberloginstatus
            utils.setStorage("rememberloginstatus", rememberloginstatus);
            utils.setSession("rememberloginstatus", rememberloginstatus);
        },
        setUserAccountBalance: (state, useraccountBalance) => {
            console.log(typeof useraccountBalance)
            state.useraccountBalance = useraccountBalance
        }
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

        // 获取用户信息
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
            api.user.getNotReadMessageCount().then(response => {
                const data = response.data
                commit("setNotReadMessage", data)
            }).catch(error => {})
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