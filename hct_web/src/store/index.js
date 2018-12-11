import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'
tagsView,
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        tagsView,
    },
    getters
})