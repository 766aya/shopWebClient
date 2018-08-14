import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/main_page/Home'
import User from '@/main_page/User'
import GoodsList from '@/main_page/GoodsList'
import Details from '@/main_page/Details'
import Counter from '@/components/Counter'
import Shopcar from '@/main_page/Shopcar'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	  	{
			path: '/',
			name: '首页',
			component: HomePage,
			children: [
				{
					path: '/',
					name: '商品列表',
					component: GoodsList,
				}, {
					path: '/Goods/:parductId',
					name: '商品详情',
					component: Details
				},
				{
					path: '/shopcar',
					name: '购物车',
					component: Shopcar
				}
			]
		},
		{
			path: '/user',
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
