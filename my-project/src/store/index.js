import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appName: '简单Blog管理后台'
    },
    modules: {
        app
    }
})