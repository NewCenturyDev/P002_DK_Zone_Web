import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Finder from '@/components/Finder'
import Main from '@/components/Main'
import Hotissue from '@/components/Hotissue'
import Hotplace from '@/components/Hotplace'
import Search from '@/components/Search'
import Profile from '@/components/Profile'
import Scrapbook from '@/components/Scrapbook'
import Messagebox from '@/components/Messagebox'
import Setting from '@/components/Setting'

Vue.use(Router)
export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'intro', component: Intro},
        {path: '/auth', name: 'login', component: Login},
        {path: '/auth/register', name: 'main', component: Register},
        {path: '/auth/finder', name: 'main', component: Finder},
        {path: '/lists', name: 'main', component: Main},
        {path: '/issue', name: 'issue', component: Hotissue},
        {path: '/place', name: 'place', component: Hotplace},
        {path: '/search', name: 'search', component: Search},
        {path: '/profile', name: 'profile', component: Profile},
        {path: '/scrap', name: 'scrap', component: Scrapbook},
        {path: '/msgbox', name: 'msgbox', component: Messagebox},
        {path: '/setting', name: 'setting', component: Setting}
    ]
})