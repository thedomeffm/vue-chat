import Vue from 'vue';
import Router from 'vue-router';
import Lobby from './views/Lobby.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'lobby',
            component: Lobby,
        },
        {
            path: '/room',
            name: 'room',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Room.vue'),
        },
        {
            path: '*',
            name: 'fuck_you',
            component: Lobby,
        },
    ],
});
