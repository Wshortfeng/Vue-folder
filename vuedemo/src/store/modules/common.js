import utils from '@/utils/utils.js'
export default {
    namespaced: true, //在module中企业命名空间
    state: {
        projectnavVal: utils.getStorage("projectnavVal") || '1_1', //项目方
        labelnavVal: utils.getStorage("labelnavVal") || '1-1', //标注方
    },
    mutations: {
        changeLabelNav(state, val) { ////标注方改变导航当前的值
            state.labelnavVal = val
            utils.setStorage("labelnavVal", val);
        },
        changeProjectNav(state, val) { //项目方改变导航当前的值
            state.projectnavVal = val
            utils.setStorage("projectnavVal", val);
        },
    },
    actions: {}
}