import utils from '@/utils/utils.js'
export default {
    namespaced: true, //在module中企业命名空间
    state: {
        navVal: utils.getCookie("navVal") || '1-1',
        headerNavVal: '1'
    },
    mutations: {
        changeNav(state, val) { //改变导航当前的值
            state.navVal = val
            utils.setCookie("navVal", val, 1);
        }
    }
}