import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const  router = createRouter({
    history: import.meta.env.PROD ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(),
    routes: [
        {
            path: '/home',
            redirect: '/'
        },
        {
            path: '/',
            name: "Home",
            component: () => import('../views/home.vue'),
            meta: { index: 0, keepAlive: true }
        },
        {
            path: '/result',
            name: "Result",
            component: () => import('../views/result.vue'),
            meta: { index: 1, keepAlive: false }
        },
        {
            path: '/error',
            name: "Error",
            component: () => import('../views/error.vue'),
            meta: { index: -999, keepAlive: false }
        }
    ],
    scrollBehavior(to, from, savePosition) {
        if (to.name === "Home" ) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ el: to.hash})
                }, 1200)
            })
        }
    }
})

export default router