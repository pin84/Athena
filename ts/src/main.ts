import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './assets/reset.styl'

import theConfirm from '@/views/tips/confirm.js'
Vue.prototype.$confirm = theConfirm;

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
