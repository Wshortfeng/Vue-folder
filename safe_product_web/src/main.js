// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

// 引入全局类
import utils from '@/utils/utils.js'
import api from '@/api/index.js'
import toaster from '@/utils/toaster'
Vue.prototype.$utils = utils;
Vue.prototype.$api = api;
Vue.prototype.$toaster = toaster;


import '@/styles/index.min.css';
import '@/assets/icon/iconfont.css';
import '@/permission.js' // permission control

//引入filter
import * as filters from '@/utils/filters.js'
// import 'babel-polyfill' //兼容IE11
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 全局配置
Vue.config.devtools = true; //打开调试vue模式
Vue.config.productionTip = false; //是否是生产模式
Vue.use(ElementUI);

// 视频组件
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})