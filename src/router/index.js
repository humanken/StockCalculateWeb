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
            component: () => import('../views/home.vue')
        },
        {
            path: '/result',
            name: "Result",
            component: () => import('../views/result.vue')
        },
        {
            path: '/error',
            name: "Error",
            component: () => import('../views/error.vue')
        }
    ]
})

export default router