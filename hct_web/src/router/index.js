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
        path: '/',
        name: 'Layout',
        component: resolve => require(['@/views/layout/layout'], resolve),
        redirect: {
            path: '/usermanagement'
        }, //路由重定向
        children: [{
                path: '/myinfo', //我的资料
                name: 'MyInfo',
                component: resolve => require(['@/views/user/myInfo'], resolve),
                meta: {
                    title: '我的资料'
                }
            },
            {
                path: '/home', //首页
                name: 'Home',
                component: resolve => require(['@/views/home'], resolve),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/commoditymanagement', //商品管理
                name: 'CommodityManagement',
                component: resolve => require(['@/views/commoditymanagement/index'], resolve),
                redirect: 'noredirect',
                meta: {
                    title: '商品管理'
                },
                children: [{
                        path: 'list', //商品管理
                        name: 'CommodityManagementList',
                        component: resolve => require(['@/views/commoditymanagement/commodityManagement'], resolve),
                        meta: {
                            title: '商品管理',
                        }
                    },
                    {
                        path: 'commodityiinfo/:type/:id', //商品信息(新增/编辑)
                        name: 'CommodityIinfo',
                        component: resolve => require(['@/views/commoditymanagement/commodityIinfo'], resolve),
                        meta: {
                            title: '新增商品'
                        }
                    },
                    {
                        path: 'spiketime', //秒杀时间
                        name: 'SpikeTime',
                        component: resolve => require(['@/views/commoditymanagement/spikeTime'], resolve),
                        meta: {
                            title: '秒杀时间'
                        }
                    },
                    {
                        path: 'commoditysubclass', //商品子类
                        name: 'CommoditySubclass',
                        component: resolve => require(['@/views/commoditymanagement/commoditySubclass'], resolve),
                        meta: {
                            title: '商品子类'
                        }
                    },
                    {
                        path: 'commoditycategory', //商品大类
                        name: 'CommodityCategory',
                        component: resolve => require(['@/views/commoditymanagement/commodityCategory'], resolve),
                        meta: {
                            title: '商品大类'
                        }
                    },
                ]
            },
            {
                path: '/ordermanagement', //订单管理
                name: 'OrderManagement',
                component: resolve => require(['@/views/ordermanagement/index'], resolve),
                redirect: 'noredirect',
                meta: {
                    title: '订单管理'
                },
                children: [{
                        path: 'positivesinglemanagement', //用户管理
                        name: 'PositivesingleManagement',
                        component: resolve => require(['@/views/ordermanagement/positivesingleManagement'], resolve),
                        meta: {
                            title: '正单管理',
                        },
                    },
                    {
                        path: 'supplementmanagement', //补单管理
                        name: 'SupplementManagement',
                        component: resolve => require(['@/views/ordermanagement/supplementManagement'], resolve),
                        meta: {
                            title: '补单管理'
                        }
                    },
                ]
            },
            {
                path: '/financialstatements', //财务报表
                name: 'FinancialStatements',
                component: resolve => require(['@/views/financialstatements/index'], resolve),
                redirect: 'noredirect',
                meta: {
                    title: '财务报表'
                },
                children: [{
                        path: 'storeordersummary', //门店订单汇总
                        name: 'StoreOrderSummary',
                        component: resolve => require(['@/views/financialstatements/storeOrderSummary'], resolve),
                        meta: {
                            title: '门店订单汇总',
                        },
                    },
                    {
                        path: 'monthlyanalysis', //月度分析
                        name: 'MonthlyAnalysis',
                        component: resolve => require(['@/views/financialstatements/monthlyAnalysis'], resolve),
                        meta: {
                            title: '月度分析'
                        }
                    },
                ]
            },
            {
                path: '/usermanagement', //用户管理
                name: 'UserManagement',
                component: resolve => require(['@/views/user/usermanagement/index'], resolve),
                redirect: 'noredirect',
                meta: {
                    title: '用户管理'
                },
                children: [{
                        path: 'list', //用户管理
                        name: 'UserManagementList',
                        component: resolve => require(['@/views/user/usermanagement/userManagement'], resolve),
                        meta: {
                            title: '用户管理',
                        },
                    }, {
                        path: 'userinfo/:userId', //修改用户（修改）
                        name: 'UserInfo',
                        component: resolve => require(['@/views/user/usermanagement/userInfo'], resolve),
                        meta: {
                            title: '修改用户',
                        }
                    },
                    {
                        path: 'groupmanagement', //组管理
                        name: 'GroupManagement',
                        component: resolve => require(['@/views/user/usermanagement/groupManagement'], resolve),
                        meta: {
                            title: '组管理'
                        }
                    },
										{
												path: 'jurisdiction/:groupId', //权限设置
												name: 'JurisDiction',
												component: resolve => require(['@/views/user/usermanagement/jurisDiction'], resolve),
												meta: {
														title: '权限设置',
												}
										},
                ]
            },
            {
                path: '/systemmanagement', //系统管理
                name: 'SysTemManagement',
                component: resolve => require(['@/views/systemmanagement/index'], resolve),
                redirect: 'noredirect',
                meta: {
                    title: '系统管理'
                },
                children: [{
                        path: 'storemanagement', //门店管理
                        name: 'StoreManagement',
                        component: resolve => require(['@/views/systemmanagement/storeManagement'], resolve),
                        meta: {
                            title: '门店管理'
                        }
                    },
                    {
                        path: 'merchantManagement', //商户管理
                        name: 'MerchantManagement',
                        component: resolve => require(['@/views/systemmanagement/merchantManagement'], resolve),
                        meta: {
                            title: '商户管理'
                        }
                    },
                    {
                        path: 'announcementmanagement', //公告管理
                        name: 'AnnounceMentmanagement',
                        component: resolve => require(['@/views/systemmanagement/announceMentmanagement'], resolve),
                        meta: {
                            title: '公告管理'
                        }
                    },
                    {
                        path: 'userfeedback', //用户反馈
                        name: 'UserFeedBack',
                        component: resolve => require(['@/views/systemmanagement/userFeedBack'], resolve),
                        meta: {
                            title: '用户反馈'
                        }
                    },
                    {
                        path: 'systemlog', //系统日志
                        name: 'SystemLog',
                        component: resolve => require(['@/views/systemmanagement/systemLog'], resolve),
                        meta: {
                            title: '系统日志'
                        }
                    },
                ]
            },
        ]
    },

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    base: '/hct_web/',
    routes: constantRouterMap
})