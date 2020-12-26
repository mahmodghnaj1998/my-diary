import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/components/Home'
import Meetup from '@/components/Meet/Meetsup'
import Ceratemeetup from '@/components/Meet/createmeetup'
import Signup from '@/components/User/signup'
import Signin from '@/components/User/signin'
import Profile from '@/components/User/profile'
import meetup from '@/components/Meet/Meetup'

import auth from '@/router/auth-guard'



Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/meet",
        name: "Meet",
        component: Meetup,
        beforeEnter: auth

    },
    {
        path: "/meet/new",
        name: "NewCreate",
        component: Ceratemeetup,
        beforeEnter: auth
    },
    {
        path: "/meet/:id",
        props: true,
        name: "meet",
        component: meetup,
        beforeEnter: auth
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        beforeEnter: auth
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup
    },
    {
        path: "/signin",
        name: "Signin",
        component: Signin
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;