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
            path: '/live',
            component: () =>
                import ('@/views/live/index'),
            children: [{
                path: "/live/*",
                component: () =>
                    import ("@/views/live/index"),
            }]
        },
        {
            path: '/viewlive',
            component: () =>
                import ('@/views/live/viewLive'),
            children: [{
                path: "/viewlive/*",
                component: () =>
                    import ("@/views/live/viewLive"),
            }]
        }
    ]
})
export default router