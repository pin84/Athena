import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/01-Face.vue')
    },
    {
      path: '/barchart',
      name: 'barchart',
      component: () => import( './views/02-BarChart.vue')
    },
    {
      path: '/03-barchart',
      name: '03-barchart',
      component: () => import( './views/03-BarChart_Custom.vue')
    },
    {
      path: '/04-circular-bar',
      name: '04-circular-bar',
      component: () => import( './views/04-circular-bar.vue')
    },
    {
      path: '/05-basic',
      name: '05-basic',
      component: () => import( './views/05-basic')
    },
    {
      path: '/05-basic-line',
      name: '05-basic-line',
      component: () => import( './views/05-basic-line')
    },
    {
      path: '/05-basic-area',
      name: '05-basic-area',
      component: () => import( './views/05-basic-area')
    },
    {
      path: '/05-basic-area-1',
      name: '05-basic-area-1',
      component: () => import( './views/05-basic-area-1')
    },
    {
      path: '/06-arc',
      name: '06-arc',
      component: () => import( './views/06-arc')
    },
    {
      path: '/06-clickEvent',
      name: '06-clickEvent',
      component: () => import( './views/06-clickEvent')
    },
    {
      path: '/06-clickEvent-1',
      name: '06-clickEvent-1',
      component: () => import( './views/06-clickEvent-1')
    },
    {
      path: '/07-worldMap',
      name: '07-worldMap',
      component: () => import( './views/07-worldMap')
    },
    {
      path: '/07-worldMap-1',
      name: '07-worldMap-1',
      component: () => import( './views/07-worldMap-1')
    },
    {
      path: '/100-test',
      name: '100-test',
      component: () => import( './views/100-test')
    },
  ]
})
