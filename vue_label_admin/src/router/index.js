import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils.js'
import store from '../store/index'

// import Layout from '@/views/layout/index'
// // 用户管理
// import ProjectManageMent from '@/views/usermanagement/projectmanagement'
// import LabelManageMent from '@/views/usermanagement/labelmanagement'
// import AdminManageMent from '@/views/usermanagement/adminmanagement'

// // 项目管理
// import ProjectHallManageMent from '@/views/projectmanagement/index'
// import ProjectHallProjectDetail from '@/views/projectmanagement/projectdetail'
// import ProjectEdit from '@/views/projectmanagement/projectedit/index'
// import ProjectEditApplication1 from '@/views/projectmanagement/projectedit/application1'
// import ProjectEditApplication2 from '@/views/projectmanagement/projectedit/application2'
// import ProjectEditApplication3 from '@/views/projectmanagement/projectedit/application3'
// import ProjectEditApplication4 from '@/views/projectmanagement/projectedit/application4'
// import ProjectEditApplication5 from '@/views/projectmanagement/projectedit/application5'
// import ProjectEditApplication6 from '@/views/projectmanagement/projectedit/application6'
// import ProjectEditApplication7 from '@/views/projectmanagement/projectedit/application7'

// // 疑难杂症
// import SouthDisease from '@/views/southdisease/index'

// // 资金管理
// import PresentManagement from '@/views/fundmanagement/presentmanagement'
// import RevenueExpenditureStatistics from '@/views/fundmanagement/revenueexpenditurestatistics'

// // 标注工具管理
// import SystemAnnotationTool from '@/views/annotationtool/systemannotationtool'
// import UserDefinedTool from '@/views/annotationtool/userdefinedtool'

// // 项目问题管理
// import SystemDefaultProblem from '@/views/problemmanagement/systemdefaultproblem'
// import UserDefinedProblem from '@/views/problemmanagement/userdefinedproblem'

// // 系统设置
// import QualificationLabelCategoryManagement from "@/views/systemsetup/qualificationlabelcategorymanagement";
// import QualificationLabelManagement from "@/views/systemsetup/qualificationlabelmanagement";
// import SystemSetup from "@/views/systemsetup/systemsetup";
// import SystemLog from "@/views/systemsetup/systemlog";
// //用户
// import Login from '@/views/user/login'
// import ProjectUserInfo from '@/views/user/projectuserinfo'
// import LabelUserInfo from '@/views/user/labeluserinfo'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: '/labelcloudadmin/',
    routes: [{
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/views/user/login'], resolve),
            // component: Login,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
            }
        }, {
            path: '/',
            name: 'Layout',
            component: resolve => require(['@/views/layout/index'], resolve),
            // component: Layout,
            redirect: {
                path: '/projecthallmanagement'
            }, //路由重定向
            children: [{
                    path: 'adminmanagement', //平台方管理
                    name: 'AdminManageMent',
                    component: resolve => require(['@/views/usermanagement/adminmanagement'], resolve),
                    // component: AdminManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement', //项目方管理
                    name: 'ProjectManageMent',
                    component: resolve => require(['@/views/usermanagement/projectmanagement'], resolve),
                    // component: ProjectManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement/projectuserinfo', //项目方用户资料
                    name: 'ProjectUserInfo',
                    component: resolve => require(['@/views/user/projectuserinfo'], resolve),
                    // component: ProjectUserInfo,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement/projectlist', //项目方项目列表
                    name: 'ProjectUserInfoProjectList',
                    component: resolve => require(['@/views/projectmanagement/index'], resolve),
                    // component: ProjectHallManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement/projectlist/projectdetail', //项目方项目详情
                    name: 'ProjectManagementProjectDetail',
                    component: resolve => require(['@/views/projectmanagement/projectdetail'], resolve),
                    // component: ProjectHallProjectDetail,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement/projectlist/projectdetail/batchdetail', //项目方项目批次详情
                    name: 'ProjectManagementBatchDetail',
                    component: resolve => require(['@/views/projectmanagement/batchdetail'], resolve),
                    // component: ProjectHallProjectDetail,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projectmanagement/projectlist/projectedit', //项目方项目编辑
                    name: 'ProjectManagementProjectEdit',
                    component: resolve => require(['@/views/projectmanagement/projectedit/index'], resolve),
                    // component: ProjectEdit,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    },
                    redirect: {
                        path: 'projectmanagement/projectlist/projectedit/projecteditapplication1'
                    }, //路由重定向
                    children: [{
                        path: 'projecteditapplication1',
                        name: 'ProjectManagementProjectEditApplication1',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application1'], resolve),
                        // component: ProjectEditApplication1,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication2',
                        name: 'ProjectManagementProjectEditApplication2',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application2'], resolve),
                        // component: ProjectEditApplication2,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication3',
                        name: 'ProjectManagementProjectEditApplication3',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application3'], resolve),
                        // component: ProjectEditApplication3,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication4',
                        name: 'ProjectManagementProjectEditApplication4',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application4'], resolve),
                        // component: ProjectEditApplication4,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication5',
                        name: 'ProjectManagementProjectEditApplication5',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application5'], resolve),
                        // component: ProjectEditApplication5,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication6',
                        name: 'ProjectManagementProjectEditApplication6',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application6'], resolve),
                        // component: ProjectEditApplication6,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication7',
                        name: 'ProjectManagementProjectEditApplication7',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application7'], resolve),
                        // component: ProjectEditApplication7,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, ]

                }, {
                    path: 'labelmanagement', //标注方管理
                    name: 'LabelManageMent',
                    component: resolve => require(['@/views/usermanagement/labelmanagement'], resolve),
                    // component: LabelManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'labelmanagement/labeluserinfo', //标注方用户资料
                    name: 'LabelUserInfo',
                    component: resolve => require(['@/views/user/labeluserinfo'], resolve),
                    // component: LabelUserInfo,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'labelmanagement/projectlist', //标注方项目列表
                    name: 'LabelUserInfoProjectList',
                    component: resolve => require(['@/views/projectmanagement/index'], resolve),
                    // component: ProjectHallManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'labelmanagement/projectlist/projectdetail', //标注方项目详情
                    name: 'LabelManagementProjectDetail',
                    component: resolve => require(['@/views/projectmanagement/projectdetail'], resolve),
                    // component: ProjectHallProjectDetail,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'labelmanagement/projectlist/projectdetail/batchdetail', //标注方项目批次详情
                    name: 'LabelManagementBatchDetail',
                    component: resolve => require(['@/views/projectmanagement/batchdetail'], resolve),
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'projecthallmanagement', //项目管理
                    name: 'ProjectHallManageMent',
                    component: resolve => require(['@/views/projectmanagement/index'], resolve),
                    // component: ProjectHallManageMent,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                }, {
                    path: 'projecthallmanagement/projectdetail', //项目详情
                    name: 'ProjectHallProjectDetail',
                    component: resolve => require(['@/views/projectmanagement/projectdetail'], resolve),
                    // component: ProjectHallProjectDetail,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'projecthallmanagement/projectlist/projectdetail/batchdetail', //项目管理项目批次详情
                    name: 'ProjectHallBatchDetail',
                    component: resolve => require(['@/views/projectmanagement/batchdetail'], resolve),
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'projecthallmanagement/projectedit', //项目编辑
                    name: 'ProjectEdit',
                    component: resolve => require(['@/views/projectmanagement/projectedit/index'], resolve),
                    // component: ProjectEdit,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    },
                    redirect: {
                        path: 'projecthallmanagement/projectedit/projecteditapplication1'
                    }, //路由重定向
                    children: [{
                        path: 'projecteditapplication1',
                        name: 'ProjectEditApplication1',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application1'], resolve),
                        // component: ProjectEditApplication1,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication2',
                        name: 'ProjectEditApplication2',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application2'], resolve),
                        // component: ProjectEditApplication2,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication3',
                        name: 'ProjectEditApplication3',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application3'], resolve),
                        // component: ProjectEditApplication3,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication4',
                        name: 'ProjectEditApplication4',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application4'], resolve),
                        // component: ProjectEditApplication4,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication5',
                        name: 'ProjectEditApplication5',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application5'], resolve),
                        // component: ProjectEditApplication5,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication6',
                        name: 'ProjectEditApplication6',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application6'], resolve),
                        // component: ProjectEditApplication6,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, {
                        path: 'projecteditapplication7',
                        name: 'ProjectEditApplication7',
                        component: resolve => require(['@/views/projectmanagement/projectedit/application7'], resolve),
                        // component: ProjectEditApplication7,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                        }
                    }, ]

                },
                {
                    path: 'southdisease', //疑难杂症
                    name: 'SouthDisease',
                    component: resolve => require(['@/views/southdisease/index'], resolve),
                    // component: SouthDisease,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'revenueexpenditurestatistics', //收支统计
                    name: 'RevenueExpenditureStatistics',
                    component: resolve => require(['@/views/fundmanagement/revenueexpenditurestatistics'], resolve),
                    // component: RevenueExpenditureStatistics,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'presentmanagement', //提现管理
                    name: 'PresentManagement',
                    component: resolve => require(['@/views/fundmanagement/presentmanagement'], resolve),
                    // component: PresentManagement,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'systemannotationtool', //系统标注工具
                    name: 'SystemAnnotationTool',
                    component: resolve => require(['@/views/annotationtool/systemannotationtool'], resolve),
                    // component: SystemAnnotationTool,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'userdefinedtool', //用户定义工具
                    name: 'UserDefinedTool',
                    component: resolve => require(['@/views/annotationtool/userdefinedtool'], resolve),
                    // component: UserDefinedTool,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'systemdefaultproblem', //系统默认问题
                    name: 'SystemDefaultProblem',
                    component: resolve => require(['@/views/problemmanagement/systemdefaultproblem'], resolve),
                    // component: SystemDefaultProblem,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'userdefinedproblem', //用户定义问题
                    name: 'UserDefinedProblem',
                    component: resolve => require(['@/views/problemmanagement/userdefinedproblem'], resolve),
                    // component: UserDefinedProblem,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'qualificationlabelcategorymanagement', //资质类别管理
                    name: 'QualificationLabelCategoryManagement',
                    component: resolve => require(['@/views/systemsetup/qualificationlabelcategorymanagement'], resolve),
                    // component: QualificationLabelCategoryManagement,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'qualificationlabelmanagement', //资质标签管理
                    name: 'QualificationLabelManagement',
                    component: resolve => require(['@/views/systemsetup/qualificationlabelmanagement'], resolve),
                    // component: QualificationLabelManagement,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'systemlog', //系统日志
                    name: 'SystemLog',
                    component: resolve => require(['@/views/systemsetup/systemlog'], resolve),
                    // component: SystemLog,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
                {
                    path: 'systemsetup', //系统设置
                    name: 'SystemSetup',
                    component: resolve => require(['@/views/systemsetup/systemsetup'], resolve),
                    // component: SystemSetup,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                    }
                },
            ],
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: true, // 需要登陆
            }
        },

    ]
})
router.beforeEach((to, from, next) => { //导航守卫
    if (utils.getSession('REMEMBERLOGOINSTATUS') == null && (utils.getStorage('REMEMBERLOGOINSTATUS') == 'false' || utils.getStorage('REMEMBERLOGOINSTATUS') == null)) {
        utils.delAllStorage()
    }
    if (to.meta.needLogin) {
        if (utils.getToken() == undefined || utils.getToken() == '' || utils.getToken() == null) {
            next('login')
        } else {
            store.dispatch('user/checkToken').then(res => {
                if (res.code == 200) {

                } else {
                    utils.delAllStorage()
                    next({ path: '/login' })
                }
            })
            next()
        }

    } else {
        if (utils.getToken() == undefined || utils.getToken() == '') {
            next()
        } else {
            next('projecthallmanagement')
        }
    }
    next()
})
export default router;