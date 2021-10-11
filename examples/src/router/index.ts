import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/login.vue'),
		meta: {
			title: '登录',
			logout: true,
		},
	},
	// {
	// 	path: '*',
	// 	name: 'not_found',
	// 	component: () => import(/* webpackChunkName: "not_found" */ '@/views/Home.vue'),
	// 	meta: {
	// 		title: '404',
	// 	},
	// },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
