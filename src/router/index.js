import Vue from 'vue'
import router from 'vue-router'


import Home from '@/components/Home'
import Services from '@/components/Service/Services'
import CreateService from '@/components/Service/CreateService'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Profil from '@/components/User/Profil'
import Service from '@/components/Service/Service'
import AuthGuard from '@/router/auth-guard'

Vue.use(router)

export default new router({
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/profil',
            name: 'Profil',
            component: Profil,
            beforeEnter: AuthGuard
        },
        {
            path: '/services',
            name: 'Services',
            component: Services,
            beforeEnter: AuthGuard
        },
        {   
            props:true,
            path: '/services/:id',
            name: 'Service',
            component: Service
        },
        {
            path: '/service/new',
            name: 'CreateService',
            component: CreateService,
            beforeEnter: AuthGuard
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        { path: '*', redirect: '/' }
    ],
    mode: 'history'
})