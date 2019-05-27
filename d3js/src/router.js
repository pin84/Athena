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
      component: () => import( './views/03-BarChart.vue')
    },
    {
      path: '/04-ScatterBlot',
      name: '04-ScatterBlot',
      component: () => import( './views/04-ScatterBlot.vue')
    },
    {
      path: '/05-CartScatterBlot',
      name: '05-CartScatterBlot',
      component: () => import( './views/05-CartScatterBlot')
    },
    {
      path: '/06-arc',
      name: '06-arc',
      component: () => import( './views/06-arc')
    },
    {
      path: '/07-Radial',
      name: '07-Radial',
      component: () => import( './views/07-Radial')
    },
  ]
})
