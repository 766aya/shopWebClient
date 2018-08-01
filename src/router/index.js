import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/main_page/Home'
import User from '@/main_page/User'
import GoodsList from '@/main_page/GoodsList'
import Details from '@/main_page/Details'
import Counter from '@/components/Counter'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	  	{
			path: '/',
			name: 'HomePage',
			component: HomePage,
			children: [
				{
					path: '',
					name: 'GoodsList',
					component: GoodsList,
				}, {
					path: '/Goods/:parductId',
					name: 'Details',
					component: Details
				}
			]
		},
		{
			path: '/user',
			name: 'User',
			component: User,
			redirect: '/user/login',
			children: [
				{
					path: ':type',
					name: 'User',
					component: User
				}
			]
		}
	]
})
