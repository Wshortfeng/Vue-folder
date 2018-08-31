import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/utils'

import Main from '@/view/main/index'
import Login from '@/view/login/index'

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
            path: 'cat', // 在子路由拼接的时候不加斜杠
            name: 'HelloCat',
            component: {
                template: `<h1>我是cat子路由</h1>`
            }
        }, {
            path: 'dog',
            name: 'HelloDog',
            component: {
                template: `<h1>我是dog子路由</h1>`
            }
        }],
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