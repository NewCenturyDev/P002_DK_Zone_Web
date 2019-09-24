import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Finder from '@/components/Finder'
import Profile from '@/components/Profile'
import Search from '@/components/Search'

Vue.use(Router)
export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'intro', component: Intro},
        {path: '/auth', name: 'login', component: Login},
        {path: '/auth/register', name: 'main', component: Register},
        {path: '/auth/finder', name: 'main', component: Finder},
        {path: '/lists', name: 'main', component: Main},
        {path: '/profile', name: 'profile', component: Profile},
        {path: '/search', name: 'search', component: Search}
    ]
})