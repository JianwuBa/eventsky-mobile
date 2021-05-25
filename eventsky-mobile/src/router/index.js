import Vue from 'vue'
import VueRouter from 'vue-router'

//路由重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/event',
            component: () =>
                import ('@/views/home/index'),
            children: [{
                path: "/event/*",
                component: () =>
                    import ("@/views/home/index"),
            }]
        },
        {
            path: '/signup',
            component: () =>
                import ('@/views/login/signup')
        },
        {
            path: '/login',
            component: () =>
                import ('@/views/login/login')
        },
        {
            path: '/payment',
            component: () =>
                import ('@/views/payment/payment')
        }

    ]
})
export default router