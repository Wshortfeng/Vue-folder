import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils.js'
import store from '../store/index'

//标注方
// import LabelLayout from '@/views/labelViews/layout'
// import ProjectHall from '@/views/labelViews/projecthall/index'
// import ProjectHallList from '@/views/labelViews/projecthall/projecthalllist'
// import ProjectHallDetail from '@/views/labelViews/projecthall/projectdetail'
// import MyTask from '@/views/labelViews/mytask/index'
// import MyLabelTask from '@/views/labelViews/mytask/mylabeltask'
// import MyLabelTaskBatchDetail from '@/views/labelViews/mytask/batchdetail'
// import MyReviewTask from '@/views/labelViews/mytask/myreviewtask'
// import WorkBench from '@/views/labelViews/workbench/index'
// import SouthDisease from '@/views/labelViews/southdisease/index'
// import SouthDiseaseList from '@/views/labelViews/southdisease/southdisease'
// import StateStatistics from '@/views/labelViews/statestatistics/index'
// import myIndex from '@/views/labelViews/user/index'
// import userInfo from '@/views/labelViews/user/userinfo'
// import myMessage from '@/views/labelViews/user/mymessage'
// import capitalAccount from '@/views/labelViews/user/capitalaccount'

// //项目方
// import projectLayout from '@/views/projectViews/layout'
// import MarkingToolManagement from '@/views/projectViews/markingtoolmanagement/index'
// import MyProject from '@/views/projectViews/myproject/index'
// import ProjectList from '@/views/projectViews/myproject/projectlist'
// import ProjectDetail from '@/views/projectViews/myproject/projectdetail'
// import BatchDetail from '@/views/projectViews/myproject/batchdetail'
// import ProjectEdit from '@/views/projectViews/myproject/projectedit'
// import AddProjectData from '@/views/projectViews/myproject/addprojectdata'
// import ProjectApplication from '@/views/projectViews/projectapplication/index'
// import Application1 from '@/views/projectViews/projectapplication/application1'
// import Application2 from '@/views/projectViews/projectapplication/application2'
// import Application3 from '@/views/projectViews/projectapplication/application3'
// import Application4 from '@/views/projectViews/projectapplication/application4'
// import Application5 from '@/views/projectViews/projectapplication/application5'
// import Application6 from '@/views/projectViews/projectapplication/application6'
// import Application7 from '@/views/projectViews/projectapplication/application7'
// import ProjectSouthDisease from '@/views/projectViews/projectsouthdisease/southdisease'
// import ProjectSouthDiseaseindex from '@/views/projectViews/projectsouthdisease/index'
// import ProjectStateStatistics from '@/views/projectViews/projectstatestatistics/index'
// import ProjectUserInfo from '@/views/projectViews/projectuser/projectuserinfo'
// import ProjectCapitalAccount from '@/views/projectViews/projectuser/projectcapitalaccount'
// import MyMessageList from '@/views/projectViews/projectuser/mymessagelist'
// import ProjectMyMessage from '@/views/projectViews/projectuser/projectmymessage'
// import ProjectCapitalaccountList from '@/views/projectViews/projectuser/projectcapitalaccountlist'


// //用户
// import Login from '@/views/user/login'
// import Register from '@/views/user/register'
// import Forget from '@/views/user/forget'
// import ApplicaProject from '@/views/user/applicaproject'
// import ApplicaLabel from '@/views/user/applicalabel'
// import UserProtocol from '@/views/user/userprotocol'

// // 平台首页
// import Home from '@/views/home'

// // 工具台
// import LabelViewsMarkingTool from '@/views/labelViews/toolTable/markingtool'
// import ProjectViewsMarkingTool from '@/views/projectViews/toolTable/markingtool'
// import { resolve } from 'url';
Vue.use(Router)


const router = new Router({
    // mode: 'history',
    base: '/labelcloud1/',
    routes: [{
            path: '/',
            name: 'Home',
            component: resolve => require(['@/views/home'], resolve),
            // component: Home,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
                keepAlive: true, //需要缓存
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/views/user/login'], resolve),
            // component: Login,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
                keepAlive: false, //需要缓存
            },
        }, {
            path: '/register',
            name: 'Register',
            component: resolve => require(['@/views/user/register'], resolve),
            // component: Register,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
                keepAlive: true, //需要缓存
            },
        },
        {
            path: '/forget',
            name: 'Forget',
            component: resolve => require(['@/views/user/forget'], resolve),
            // component: Forget,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
                keepAlive: true, //需要缓存
            },
        },
        {
            path: '/applicaproject',
            name: 'ApplicaProject',
            component: resolve => require(['@/views/user/applicaproject'], resolve),
            // component: ApplicaProject,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: true, // 需要登陆
                keepAlive: false, //是否需要缓存
            },
        },
        {
            path: '/applicalabel',
            name: 'ApplicaLabel',
            component: resolve => require(['@/views/user/applicalabel'], resolve),
            // component: ApplicaLabel,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: true, // 需要登陆
                keepAlive: false, //是否需要缓存
            },
        },
        {
            path: '/userprotocol',
            name: 'UserProtocol',
            component: resolve => require(['@/views/user/userprotocol'], resolve),
            // component: UserProtocol,
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: false, // 需要登陆
                keepAlive: false, //是否需要缓存
            },
        },
        {
            path: '/label',
            name: 'LabelLayout',
            component: resolve => require(['@/views/labelViews/layout'], resolve),
            // component: LabelLayout,
            redirect: {
                path: '/label/projecthall'
            }, //路由重定向
            children: [{
                    path: 'projecthall',
                    name: 'ProjectHall',
                    component: resolve => require(['@/views/labelViews/projecthall/index'], resolve),
                    // component: ProjectHall,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'label', //标注方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/label/projecthall/projecthalllist'
                    }, //路由重定向
                    children: [{
                        path: 'projecthalllist',
                        name: '项目大厅',
                        component: resolve => require(['@/views/labelViews/projecthall/projecthalllist'], resolve),
                        // component: ProjectHallList,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'label', //标注方
                            keepAlive: true, //是否需要缓存
                        },
                    }, {
                        path: 'projecthalldetail',
                        name: 'ProjectHallDetail',
                        component: resolve => require(['@/views/labelViews/projecthall/projectdetail'], resolve),
                        // component: ProjectHallDetail,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'label', //标注方
                            keepAlive: false, //是否需要缓存
                        },
                    }]
                },
                {
                    path: 'markingtool',
                    name: '工作台 ',
                    component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                    // component: LabelViewsMarkingTool,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true,
                        role: 'label', //标注方
                        keepAlive: false, //是否需要缓存
                    },
                },
                {
                    path: 'mytask',
                    name: '我的任务',
                    component: resolve => require(['@/views/labelViews/mytask/index'], resolve),
                    // component: MyTask,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'label', //标注方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/label/mytask/mylabeltask'
                    }, //路由重定向
                    children: [{
                            path: 'mylabeltask',
                            name: '我的标注任务',
                            component: resolve => require(['@/views/labelViews/mytask/mylabeltask'], resolve),
                            // component: MyLabelTask,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        }, {
                            path: 'myreviewtask',
                            name: '我的审核任务',
                            component: resolve => require(['@/views/labelViews/mytask/myreviewtask'], resolve),
                            // component: MyReviewTask,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'mylabeltask/taskbatchdetail',
                            name: 'MyLabelTaskBatchDetail',
                            component: resolve => require(['@/views/labelViews/mytask/batchdetail'], resolve),
                            // component: MyLabelTaskBatchDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'myreviewtask/reviewmarkingtool',
                            name: 'ReviewMarkingTool',
                            component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'mylabeltask/labelmarkingtool',
                            name: 'LabelMarkingTool',
                            component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'mylabeltask/looklabelmarktool',
                            name: 'LookLabelMarkingTool',
                            component: resolve => require(['@/views/labelViews/toolTable/lookmarking'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'mylabeltask/projectdetail',
                            name: 'LabelProjectLableReviewDetail',
                            component: resolve => require(['@/views/labelViews/projecthall/projectdetail'], resolve),
                            // component: ProjectHallDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'myreviewtask/projectdetail',
                            name: 'ReviewProjectLableReviewDetail',
                            component: resolve => require(['@/views/labelViews/projecthall/projectdetail'], resolve),
                            // component: ProjectHallDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        }
                    ]
                },
                {
                    path: 'southdisease',
                    name: 'SouthDiseaseindex',
                    component: resolve => require(['@/views/labelViews/southdisease/index'], resolve),
                    // component: SouthDisease,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'label', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/label/southdisease/southdiseaselist'
                    }, //路由重定向
                    children: [{
                        path: 'southdiseaselist',
                        name: 'SouthDiseaseList',
                        component: resolve => require(['@/views/labelViews/southdisease/southdisease'], resolve),
                        // component: SouthDiseaseList,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'label', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'markingtool',
                        name: 'SouthDiseaseLabelViewsMarkingTool',
                        component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                        // component: LabelViewsMarkingTool,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'label', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, ]
                },
                {
                    path: 'statestatistics',
                    name: '状态统计 ',
                    component: resolve => require(['@/views/labelViews/statestatistics/index'], resolve),
                    // component: StateStatistics,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'label', //标注方
                        keepAlive: false, //是否需要缓存
                    },
                },
                {
                    path: 'my',
                    name: '我的',
                    component: resolve => require(['@/views/labelViews/user/index'], resolve),
                    // component: myIndex,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'label', //标注方
                        keepAlive: false, //是否需要缓存 //标注方
                    },
                    redirect: {
                        path: '/label/my/userinfo'
                    }, //路由重定向
                    children: [{
                            path: 'userinfo',
                            name: '我的资料',
                            component: resolve => require(['@/views/labelViews/user/userinfo'], resolve),
                            // component: userInfo,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存 //标注方
                            },
                        }, {
                            path: 'mymessage',
                            name: '我的消息',
                            component: resolve => require(['@/views/labelViews/user/mymessage'], resolve),
                            // component: myMessage,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存 //标注方
                            },
                        }, {
                            path: 'mymessageprojectdetail',
                            name: 'MymessageProjectDetail',
                            component: resolve => require(['@/views/labelViews/projecthall/projectdetail'], resolve),
                            // component: ProjectHallDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存 //标注方
                            },
                        },
                        {
                            path: 'mymessagemarktool',
                            name: 'MyMessageMarkTool',
                            component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'mymessagelookmarktool',
                            name: 'MyMessageLookMarkTool',
                            component: resolve => require(['@/views/labelViews/toolTable/lookmarking'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'capitalaccount',
                            name: '资金账户',
                            component: resolve => require(['@/views/labelViews/user/capitalaccount'], resolve),
                            // component: capitalAccount,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: true, //是否需要缓存 //标注方
                            },
                        }, {
                            path: 'capitalaccountprojectdetail',
                            name: 'CapitalAccountLabelProjectDetail',
                            component: resolve => require(['@/views/labelViews/projecthall/projectdetail'], resolve),
                            // component: ProjectHallDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存 //标注方
                            },
                        }, {
                            path: 'capitalaccountmarktool',
                            name: 'CapitalAccountMarkTool',
                            component: resolve => require(['@/views/labelViews/toolTable/markingtool'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'capitalaccountlookmarktool',
                            name: 'CapitalAccountLookMarkTool',
                            component: resolve => require(['@/views/labelViews/toolTable/lookmarking'], resolve),
                            // component: LabelViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true,
                                role: 'label', //标注方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                    ]
                },

            ],
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: true, // 需要登陆
                role: 'label', //标注方
                keepAlive: true, //是否需要缓存
            }
        },
        {
            path: '/project',
            name: 'projectLayout',
            component: resolve => require(['@/views/projectViews/layout'], resolve),
            // component: projectLayout,
            redirect: {
                path: '/project/myproject'
            }, //路由重定向
            children: [{
                    path: 'myproject',
                    name: '我的项目',
                    component: resolve => require(['@/views/projectViews/myproject/index'], resolve),
                    // component: MyProject,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: true, //是否需要缓存
                    },
                    redirect: {
                        path: '/project/myproject/projectlist'
                    }, //路由重定向
                    children: [{
                            path: 'projectlist',
                            name: '',
                            component: resolve => require(['@/views/projectViews/myproject/projectlist'], resolve),
                            // component: ProjectList,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            },
                        }, {
                            path: 'projectdetail',
                            name: '项目详情',
                            component: resolve => require(['@/views/projectViews/myproject/projectdetail'], resolve),
                            // component: ProjectDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            },
                        },
                        {
                            path: 'batchdetail',
                            name: '批次详情',
                            component: resolve => require(['@/views/projectViews/myproject/batchdetail'], resolve),
                            // component: BatchDetail,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            }
                        },
                        {
                            path: 'batchdeatilmarkingtool',
                            name: 'BatchDeatilMarkingTool',
                            component: resolve => require(['@/views/projectViews/toolTable/markingtool'], resolve),
                            // component: ProjectViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            }
                        },
                        {
                            path: '/project/markingtool',
                            name: '工作台',
                            component: resolve => require(['@/views/projectViews/toolTable/markingtool'], resolve),
                            // component: ProjectViewsMarkingTool,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            }
                        }, {
                            path: 'projectedit',
                            name: '项目编辑',
                            component: resolve => require(['@/views/projectViews/myproject/projectedit'], resolve),
                            // component: ProjectEdit,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            },
                            redirect: {
                                path: '/project/myproject/projectedit/application1/'
                            }, //路由重定向
                            children: [{
                                path: 'application1',
                                name: '项目描述 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application1'], resolve),
                                // component: Application1,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                },
                            }, {
                                path: 'application2',
                                name: '项目设置 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application2'], resolve),
                                // component: Application2,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                }
                            }, {
                                path: 'application3',
                                name: '标注资质 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application3'], resolve),
                                // component: Application3,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                }
                            }, {
                                path: 'application4',
                                name: '标注工具 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application4'], resolve),
                                // component: Application4,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                }
                            }, {
                                path: 'application5',
                                name: '报酬方案 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application5'], resolve),
                                // component: Application5,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                }
                            }, {
                                path: 'application6',
                                name: '审核验收 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application6'], resolve),
                                // component: Application6,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                }
                            }, {
                                path: 'application7',
                                name: '预览 ',
                                component: resolve => require(['@/views/projectViews/projectapplication/application7'], resolve),
                                // component: Application7,
                                meta: {
                                    // 路由元信息,可以用于页面的登陆验证
                                    needLogin: true, // 需要登陆
                                    role: 'project', //项目方
                                    keepAlive: false, //是否需要缓存
                                },
                            }]
                        }, {
                            path: 'addprojectdata',
                            name: '添加数据',
                            component: resolve => require(['@/views/projectViews/myproject/addprojectdata'], resolve),
                            // component: AddProjectData,
                            meta: {
                                // 路由元信息,可以用于页面的登陆验证
                                needLogin: true, // 需要登陆
                                role: 'project', //项目方
                                keepAlive: false, //是否需要缓存
                            },
                        }
                    ]
                },
                {
                    path: 'markingtoolmanagement',
                    name: '我的标注工具',
                    component: resolve => require(['@/views/projectViews/markingtoolmanagement/index'], resolve),
                    // component: MarkingToolManagement,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                },
                {
                    path: 'projectapplication',
                    name: '项目申请',
                    component: resolve => require(['@/views/projectViews/projectapplication/index'], resolve),
                    // component: ProjectApplication,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/project/projectapplication/application1'
                    }, //路由重定向
                    children: [{
                        path: 'application1',
                        name: '项目描述',
                        component: resolve => require(['@/views/projectViews/projectapplication/application1'], resolve),
                        // component: Application1,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'application2',
                        name: '项目设置',
                        component: resolve => require(['@/views/projectViews/projectapplication/application2'], resolve),
                        // component: Application2,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'application3',
                        name: '标注资质',
                        component: resolve => require(['@/views/projectViews/projectapplication/application3'], resolve),
                        // component: Application3,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'application4',
                        name: '标注工具',
                        component: resolve => require(['@/views/projectViews/projectapplication/application4'], resolve),
                        // component: Application4,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'application5',
                        name: '报酬方案',
                        component: resolve => require(['@/views/projectViews/projectapplication/application5'], resolve),
                        // component: Application5,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'application6',
                        name: '审核验收',
                        component: resolve => require(['@/views/projectViews/projectapplication/application6'], resolve),
                        // component: Application6,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'application7',
                        name: '预览',
                        component: resolve => require(['@/views/projectViews/projectapplication/application7'], resolve),
                        // component: Application7,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }]
                },
                {
                    path: 'diseaselist',
                    name: 'ProjectSouthDiseaseindex',
                    component: resolve => require(['@/views/projectViews/projectsouthdisease/index'], resolve),
                    // component: ProjectSouthDiseaseindex,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/project/diseaselist/projectsouthdisease'
                    }, //路由重定向
                    children: [{
                        path: 'projectsouthdisease',
                        name: 'ProjectSouthDisease',
                        component: resolve => require(['@/views/projectViews/projectsouthdisease/southdisease'], resolve),
                        // component: ProjectSouthDisease,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'markingtool',
                        name: 'DiseaseProjectViewsMarkingTool',
                        component: resolve => require(['@/views/projectViews/toolTable/markingtool'], resolve),
                        // component: ProjectViewsMarkingTool,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, ]
                },
                {
                    path: 'projectstatestatistics',
                    name: '状态统计',
                    component: resolve => require(['@/views/projectViews/projectstatestatistics/index'], resolve),
                    // component: ProjectStateStatistics,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                },
                {
                    path: 'projectuserinfo',
                    name: 'ProjectUserInfo',
                    component: resolve => require(['@/views/projectViews/projectuser/projectuserinfo'], resolve),
                    // component: ProjectUserInfo,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                },
                {
                    path: 'projectcapitalaccountlist',
                    name: 'ProjectCapitalaccountList',
                    component: resolve => require(['@/views/projectViews/projectuser/projectcapitalaccountlist'], resolve),
                    // component: ProjectCapitalaccountList,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: false, //是否需要缓存
                    },
                    redirect: {
                        path: '/project/projectcapitalaccountlist/projectcapitalaccount'
                    },
                    children: [{
                        path: 'projectcapitalaccount',
                        name: 'ProjectCapitalAccount',
                        component: resolve => require(['@/views/projectViews/projectuser/projectcapitalaccount'], resolve),
                        // component: ProjectCapitalAccount,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'markingtool',
                        name: 'CapitalAccountProjectViewsMarkingTool',
                        component: resolve => require(['@/views/projectViews/toolTable/markingtool'], resolve),
                        // component: ProjectViewsMarkingTool,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'projectdetail',
                        name: 'CapitalAccountProjectDetail',
                        component: resolve => require(['@/views/projectViews/myproject/projectdetail'], resolve),
                        // component: ProjectDetail,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'batchdetail',
                        name: 'CapitalAccountBatchDetail',
                        component: resolve => require(['@/views/projectViews/myproject/batchdetail'], resolve),
                        // component: BatchDetail,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, ]
                },
                {
                    path: 'mymessagelist',
                    name: 'MyMessageList',
                    component: resolve => require(['@/views/projectViews/projectuser/mymessagelist'], resolve),
                    // component: MyMessageList,
                    meta: {
                        // 路由元信息,可以用于页面的登陆验证
                        needLogin: true, // 需要登陆
                        role: 'project', //项目方
                        keepAlive: true, //是否需要缓存
                    },
                    redirect: {
                        path: '/project/mymessagelist/projectmymessage'
                    }, //路由重定向
                    children: [{
                        path: 'projectmymessage',
                        name: 'ProjectMyMessage',
                        component: resolve => require(['@/views/projectViews/projectuser/projectmymessage'], resolve),
                        // component: ProjectMyMessage,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'projectdetail',
                        name: 'ProjectMyMessageDetail',
                        component: resolve => require(['@/views/projectViews/myproject/projectdetail'], resolve),
                        // component: ProjectDetail,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        },
                    }, {
                        path: 'markingtool',
                        name: 'MessageProjectViewsMarkingTool',
                        component: resolve => require(['@/views/projectViews/toolTable/markingtool'], resolve),
                        // component: ProjectViewsMarkingTool,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, {
                        path: 'batchdetail',
                        name: 'MessageBatchDetail',
                        component: resolve => require(['@/views/projectViews/myproject/batchdetail'], resolve),
                        // component: BatchDetail,
                        meta: {
                            // 路由元信息,可以用于页面的登陆验证
                            needLogin: true, // 需要登陆
                            role: 'project', //项目方
                            keepAlive: false, //是否需要缓存
                        }
                    }, ]
                },

            ],
            meta: {
                // 路由元信息,可以用于页面的登陆验证
                needLogin: true, // 需要登陆
                role: 'project', //项目方
                keepAlive: false, //是否需要缓存
            }
        }
    ]
})
router.beforeEach((to, from, next) => { //导航守卫
    if (utils.getSession('rememberloginstatus') == null && (utils.getStorage('rememberloginstatus') == 'false' || utils.getStorage('rememberloginstatus') == null)) {
        utils.delAllStorage()
    }
    if (to.meta.needLogin) {
        if (utils.getToken() == undefined || utils.getToken() == '') {
            next('login')
        } else {
            store.dispatch('user/checkToken').then(res => {
                if (res.code == 200) {

                } else {
                    utils.delAllStorage()
                    next({ path: '/login' })
                }
            })
            if (to.meta.role == 'label') {
                if (utils.getStorage('userType') == 1) {
                    next('login')
                } else if (utils.getStorage('userType') == 2) {
                    next()
                } else {
                    next('login')
                }
            } else if (to.meta.role == 'project') {
                if (utils.getStorage('userType') == 1) {
                    next()
                } else if (utils.getStorage('userType') == 2) {
                    next('login')
                } else {
                    next('login')
                }
            }
            next()
        }
    } else {
        if (utils.getToken() == undefined || utils.getToken() == '') {
            next()
        } else {
            if (utils.getStorage('status') == 3) {
                if (utils.getStorage('userType') == 1) {
                    next('project')
                } else if (utils.getStorage('userType') == 2) {
                    next('label')
                } else {
                    next('login')
                }
            } else {
                next()
            }
        }
    }
    next()
})
export default router;