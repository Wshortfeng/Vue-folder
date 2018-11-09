// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'font-awesome/css/font-awesome.min.css'
import store from './store'
//公用引入css
import '../src/assets/styles/common.css';
import '../src/assets/styles/main.css';
import '../src/assets/styles/labelzkm.css';
import '../src/assets/icon/iconfont.css';
//引入jquery
import jQuery from 'jquery'
import 'jquery.nicescroll'
// 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;
// 引入全局类

import utils from '@/utils/utils.js'
import api from '@/api/index.js'
import toaster from '@/utils/toaster'
Vue.prototype.$utils = utils;
Vue.prototype.$api = api;
Vue.prototype.$toaster = toaster;
Vue.prototype.$token = utils.getToken();
// 引入serverUrl
import serverUrl from '@/utils/server'
Vue.prototype.$serverUrl = serverUrl.apiurl;
//引入filter
import * as filters from '@/utils/filters.js'
import 'babel-polyfill' //兼容IE11
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(ElementUI);

Vue.config.devtools = true; //打开调试vue模式
Vue.config.productionTip = false; //是否是生产模式

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})