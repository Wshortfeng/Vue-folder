import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        name: 'Login',
        component: resolve => require(['@/views/user/login'], resolve),
    },
    {
        path: '/forget',
        name: 'Forget',
        component: resolve => require(['@/views/user/forget'], resolve),
    },
    {
        path: '/',
        name: 'Layout',
        component: resolve => require(['@/views/layout/layout'], resolve),
        redirect: {
            path: '/home'
        }, //路由重定向
        children: [{
                path: '/addadministrator', //添加管理员
                name: 'AddAdministrator',
                component: resolve => require(['@/views/systemsetup/addadministrator'], resolve),
            }, {
                path: '/systemlog', //系统日志
                name: 'SysTemLog',
                component: resolve => require(['@/views/systemsetup/systemlog'], resolve),
            }, {
                path: '/timeserver', //时间服务器
                name: 'TimeServer',
                component: resolve => require(['@/views/systemsetup/timeserver'], resolve),
            }, {
                path: '/emailserver', //邮箱服务器
                name: 'EmailServer',
                component: resolve => require(['@/views/systemsetup/emailserver'], resolve),
            }, {
                path: '/alarmslist', //告警列表
                name: 'AlarmsList',
                component: resolve => require(['@/views/statequery/alarmslist'], resolve),
            }, {
                path: '/controlstate', //布控状态
                name: 'ControlState',
                component: resolve => require(['@/views/statequery/controlstate'], resolve),
            }, {
                path: '/camerastatus', //摄像机状态
                name: 'CameraStatus',
                component: resolve => require(['@/views/statequery/camerastatus'], resolve),
            }, {
                path: '/alarmsetting', //报警设置
                name: 'AlarmSetting',
                component: resolve => require(['@/views/alarmsetting/alarmsetting'], resolve),
            },
            {
                path: '/alarmsetting/addeditalarm', //报警设置 告警模板修改新增
                name: 'AddEditAlarm',
                component: resolve => require(['@/views/alarmsetting/addeditalarm'], resolve),
            },
            {
                path: '/clothcontrolsetting', //布控设置
                name: 'ClothControlSetting',
                component: resolve => require(['@/views/clothcontrolsetting/clothcontrolsetting'], resolve),
            },
            {
                path: '/clothcontrolsetting/addclothcontrol', //添加布控
                name: 'AddClothControl',
                component: resolve => require(['@/views/clothcontrolsetting/addclothcontrol'], resolve),
            },


            {
                path: '/dvrsetting', //DVR设置
                name: 'AddDvr',
                component: resolve => require(['@/views/camerasettings/dvrsetting'], resolve),
            },
            {
                path: '/addcamera', //添加摄像机
                name: 'AddCamera',
                component: resolve => require(['@/views/camerasettings/addcamera'], resolve),
            },
            {
                path: '/addcamera/addeditdigitalvideocamera', //数码摄像机新增修改
                name: 'AddEditdigitalVideoCamera',
                component: resolve => require(['@/views/camerasettings/addeditdigitalvideocamera'], resolve),
            },
            {
                path: '/removecamera', //移除摄像机
                name: 'RemoveCamera',
                component: resolve => require(['@/views/camerasettings/removecamera'], resolve),
            },
        ]
    },
    {
        path: '/home', //首页
        name: 'Home',
        component: resolve => require(['@/views/home'], resolve),
    },

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    base: '/safe_product_web/',
    routes: constantRouterMap
})