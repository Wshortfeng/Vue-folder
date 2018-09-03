import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils'

import Main from '@/view/main/index'
import Login from '@/view/login/index'
import TypeList from '@/view/type_list/TypeList'
import TypeEditor from '@/view/type_list/TypeEditor'
import BlogList from '@/view/blog_list/BlogList'
import BlogEditor from '@/view/blog_list/BlogEditor'

Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,

    }, {
        path: '/',
        name: 'Main',
        component: Main,
        children: [{
                path: '',
                name: 'TypeList',
                component: TypeList,
            },
            {
                path: 'type_editor',
                name: 'TypeEditor',
                component: TypeEditor,
            },
            {
                path: 'blog_list',
                name: 'BlogList',
                component: BlogList,
            },
            {
                path: 'blog_editor',
                name: 'BlogEditor',
                component: BlogEditor,
            }
        ],
        meta: {
            // 路由元信息,可以用于页面的登陆验证
            needLogin: true, // 需要登陆
        }
    }]
})
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (utils.getkey() == undefined || utils.getkey() == '') {
            next('login')
        } else {
            next()
        }

    } else {

    }
    next()
})
export default router;