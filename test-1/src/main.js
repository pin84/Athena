
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import axios from 'axios'
import qs from 'qs' //用于post请求
import * as d3 from 'd3'
import BScroll from 'better-scroll'
import commonFn from './utils' //公共方法
import api from './api/api' // api管理
import ajax from './api/ajax' // api管理
import weui from 'weui.js'
import 'weui'
import wx from 'weixin-jsapi'

import html2canvas from 'html2canvas';
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview);


// import Mint from 'mint-ui';
// Vue.use(Mint);


// import MintUI from 'mint-ui'
import {Toast,Indicator,MessageBox ,Picker,Cell, Popup,Navbar, TabItem ,InfiniteScroll,} from 'mint-ui'
Vue.component(Picker.name, Picker);
Vue.component(Cell.name, Cell);
Vue.component(Popup.name, Popup);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(InfiniteScroll);

import 'mint-ui/lib/style.css'
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator  = Indicator ;
Vue.prototype.$messageBox = MessageBox;
import myAxios from './api/axios'

Vue.prototype.$h2c = html2canvas;

import '@/assets/css/reset.css';
import '@/assets/css/index.css';
import '@/assets/css/search-index.css';
import '@/assets/css/search-resetUi.css';
// import VConsole from 'vconsole'
// var vConsole = new VConsole();

Vue.config.productionTip = false;
Vue.prototype.$axios = myAxios;
Vue.prototype.$qs = qs;
Vue.prototype.$d3 = d3;
Vue.prototype.$BScroll = BScroll;
Vue.prototype.$commonFn = commonFn;
Vue.prototype.$api = api;
Vue.prototype.$ajax = ajax;
Vue.prototype.bus = new Vue();  // Event Bus
Vue.prototype.$weui = weui;
Vue.prototype.$wx = wx;

// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// window.addEventListener("resize",function(){
//   document.body.scrollTop = 0;
//   console.log('top')
// })

window.testVue = new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')
