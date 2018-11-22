import utils from '@/utils/utils.js'
export default {
    namespaced: true, //在module中企业命名空间
    state: {
        adminnavVal: utils.getStorage("adminnavVal") || '2', //平台方
    },
    mutations: {
        changeAdminNav(state, val) { //项目方改变导航当前的值
            state.adminnavVal = val
            utils.setStorage("adminnavVal", val);
        }
    },
    actions: {}
}