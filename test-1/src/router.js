import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import commonFn from './utils'
import MySubscript from './views/dingyue/MySubscript'
import DingYue from './views/dingyue'
import axios from 'axios'
import qs from 'qs'
import api from './api/api'
import {Toast} from 'mint-ui'
import VConsole from 'vconsole'

// let isTest = true; 
let isTest = false; 

// 首页
const index =[
  
  // {
  //   path: '/shangLian',
  //   name: 'shangLian',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "shangLian" */ './views/shangLian/ShangLian.vue'),
  //   meta: {
  //     keepAlive: true, //需要被缓存
  //     remark:'shangLian',
  //     main:'首页',

  //   }
  // },
  
  {
    path: '/',
    name: 'shangLianTest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "shangLian" */ './views/shangLian/ShangLianTest.vue'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'首页',
      main:'首页',
    },
    children:[
      {
        path:'searchTest',
        name:'searchTest',
        component: () => import( /* webpackChunkName: "Company" */ './views/shangLian/SearchPage/Company.vue'),
        meta: {
          keepAlive: true, //需要被缓存
          remark:'搜索企业',
          main:'首页',
        },
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "shangLian" */ './views/shangLian/Search.vue'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'首页搜索',
      main:'首页',
    },
    redirect:'/search/company',
    children:[
      {
        path: 'company',
        name: 'searchCompany',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "Company" */ './views/shangLian/SearchPage/Company.vue'),
        meta: {
          keepAlive: true, //需要被缓存
          remark:'企业搜索',
          main:'首页',
        },
      },
      {
        path: 'global',
        name: 'searchGlobal',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "Global" */ './views/shangLian/SearchPage/Global.vue'),
        meta: {
          keepAlive: true, //需要被缓存
          remark:'全网搜索',
          main:'首页',
        },
      },
    ]
  },
  {
    path: '/tipssl',
    name: 'tips',
    component: () => import('@/components/tips/TipsSL'),
    meta:{
      keepAlive:false,
      remark:'新手提示--上链',
      main:'首页',
    }
  },
  {
    path: '/oauth/users',
    name: 'testAuto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/TestAuto.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'授权页',
      main:'首页',
    }
  },
  {
    path: '/poster',
    name: 'poster',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/shangLian/Poster.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'海报页',
      main:'首页',
    }
  }
]

// 订阅
const dingYue = [
  {
    path: '/dingyue',
    name: 'dingyue',
    component: DingYue,
    // redirect: '/mySubscript',
    children: [{
        path: '/mySubscript',
        name: 'mySubscript',
        component: MySubscript,
        meta: {
          keepAlive: false, //需要被缓存
          remark:'我的订阅',
          main:'订阅',
        },
      },
      {
        path: '/lookAround',
        name: 'lookAround',
        component: () => import('./views/dingyue/LookAround.vue'),
        meta: {
          keepAlive: true, //需要被缓存
          remark:'订阅',
          main:'订阅',
        },
      },
      {
        path: '/recommand',
        name: 'recommand',
        component: () => import('./views/dingyue/Recommand'),
        meta: {
          keepAlive: false, //需要被缓存
          remark:'采招推荐',
          main:'订阅',
        },
      },
    ],
    meta: {
      keepAlive: false, //需要被缓存
      remark:'订阅父页面',
      main:'订阅',
    }
  },
  {
    path: '/04_searchHistory',
    name: '04_searchHistory',
    component: () => import('./views/dingyue/pages/04_searchHistory'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'搜索历史',
      main:'订阅',
    },
  },
  {
    path: '/03_quickSearch',
    name: 'quickSearch',
    component: () => import('./views/dingyue/pages/03_quickSearch'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'快速搜索',
      main:'订阅',
    },
  },
  {
    path: '/noSubscript',
    name: 'noSubscript',
    component: () => import('./views/dingyue/pages/01_noSubscript'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'无关键词',
      main:'订阅',
    }
  },
  {
    path: '/setSub',
    name:'setSub',
    component: () => import('./views/dingyue/pages/02_setSubscript'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'设置订阅关键词',
      main:'订阅',
    }
  },
  {
    path: '/moreResult',
    name: 'moreResult',
    component: () => import('./views/dingyue/pages/05-MoreResult'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'更多关键词搜索内容',
      main:'订阅',
    }
  },
  {
    path: '/searchCompany',
    name: '06_searchCompany',
    component: () => import('./views/dingyue/pages/06_searchCompany'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'订阅下的搜索企业',
      main:'订阅',
    }
  },
  {
    path: '/tipsdy',
    name: 'tips',
    component: () => import('@/components/tips/TipsDY'),
    meta:{
      keepAlive:false,
      remark:'新手提示--订阅',
      main:'订阅',
    }
  },

];

// 触客
const chuKe = [
  {
    path: '/chuke',
    name: 'chuke',
    component: () => import('./views/chuke'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'触客',
      main:'触客',
    }
  },
  {
    path: '/chuke-msg',
    name: 'chuck-msg',
    component: () => import('./views/chuke/Chuke-msg.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'短信触客',
      main:'触客',
    }
  },
  {
    path: '/chuke-msg2',
    name: 'chuck-msg',
    component: () => import('./views/chuke/Chuke-msg2.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'短信触客',
      main:'触客',
    }
  },
];

// 链圈
const liqnQuan = [
  {
    path: '/lianquan',
    name: 'lianQuan',
    component: () => import( /* webpackChunkName: "lianQuan" */ './views/lianQuan/LianQuan.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'链圈',
      main:'链圈',
    }
  },

];

// 用户中心
const userCenter = [
  {
    path: '/autConfig',
    name: 'autConfig',
    component: () => import('./components/shangLian/autPop/AutConfig'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'企业认证',
      main:'用户中心',
    },
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('./views/userCenter/'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'用户中心',
      main:'用户中心',
    }
  },
  {
    path: '/selfPic',
    name: 'selfPic',
    component: () => import('./views/userCenter/pop/SelfPic'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'个人标签',
      main:'用户中心',
    }
  },
  {
    path: '/chongzhi',
    name: 'chongzhi',
    component: () => import('./components/pop/chongzhi/chongzhi'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'充值',
      main:'用户中心',
    }
  },
  {
    path: '/authcomInfo',
    name: 'authcomInfo',
    component: () => import('./views/userCenter/AuthCom'),
    meta: {
      keepAlive: true, //需要被缓存
      remark:'企业认证信息',
      main:'用户中心',
    }
  },

  {
    path: '/myscore',
    name: 'myscore',
    component: () => import('./views/userCenter/MyScore'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'查看受邀明细',
      main:'用户中心',
    }
  },

  

]

// 用户反馈
const userFeedBack = [
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/components/common/feedback'),
    meta:{
      keepAlive:false,
      remark:'反馈首页',
      main:'用户反馈',
    }
  },
  {
    path: '/fd-history',
    name: 'fd-history',
    component: () => import('@/components/common/feedback/FeedbackHistory'),
    meta:{
      keepAlive:false,
      remark:'反馈历史',
      main:'用户反馈',
    }
  },
  {
    path: '/fdBak',
    name: 'fdBak',
    component: () => import('@/components/common/feedback/FdBak'),
    meta:{
      keepAlive:false,
      remark:'反馈后台',
      main:'用户反馈',
    }
  },

]


// 审核界面
const auditPage = [
  {
    path: '/ng',
    name: 'ng',
    component: () => import( /* webpackChunkName: "Operator" */ './views/operator/Operator'),

    meta:{
      remark:'运营商审核未通过界面',
      main:'审核界面',
    }
  },
  {
    path: '/operator',
    name: 'operator',
    component: () => import( /* webpackChunkName: "Operator" */ './views/operator/Ng'),

    meta:{
      remark:'运营商审核通过界面',
      main:'审核界面',
    }
  },
  {
    path: '/company-cert',
    name: 'company-cert',
    component: () => import( /* webpackChunkName: "Operator" */ './views/CompanyCert'),
    meta:{
      remark:'审核认证企业',
      main:'审核界面',
    }
  },
  {
    path: '/refund',
    name: 'refund',
    component: () => import( /* webpackChunkName: "Operator" */ './views/auditPage/Refund.vue'),
    meta:{
      remark:'短信退款审核',
      main:'审核界面',
    }
  },
]

const other = [
  {
    path: '/share',
    name: 'share',
    component: () => import( /* webpackChunkName: "Operator" */ './views/Share'),
    meta:{
      remark:'分享页',
      main:'分享页',
      keepAlive: false,
    }
  },
  {
    path: '/Test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "shangLian" */ './views/TestToPay.vue'),
    meta: {
      remark:'测试页',
      
    }
  },
  {
    path: '/test',
    name: 'test',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/Test.vue'),
    meta: {
      keepAlive: false, //需要被缓存
      remark:'test',
    }
  },
]


let routes = [];
routes = routes.concat(
  index,
  dingYue,
  chuKe,
  liqnQuan,
  userCenter,
  userFeedBack,
  auditPage,
  other,
)


Vue.use(Router)
const router = new Router({
  routes
})

// 检查本地设备时候含有用户信息
async function checkLocalUser() {
  
  let sxlUserInfo = commonFn.handleStroage.getLocalStorage('sxlUserInfo');

  if (!sxlUserInfo) return false;
  
  let createdTime = sxlUserInfo.createdTime;
  let oneDaySec = 86400 * 1000;
  let nowTime = Date.now();

  if (nowTime - createdTime > (oneDaySec * 2)) {
    localStorage.removeItem('sxlUserInfo');
    return false
  }

  if(store.state.loginInfo.Administrator == null){
    
    let Administrator = await axios.get(api.Administrator,{
      params:{
        token:sxlUserInfo.token
      }
    }).then(res=>res.data)
    .catch(rej=>{
      return rej;
    });
    
    let {token_state,message} = Administrator
    if(typeof message == 'number'){
      store.commit('setAdministrator',message);
    }
    if( token_state === false && token_state!==undefined ){
      return false
    }

  }
  
  return sxlUserInfo
}

// 将用户信息存储到vuex的 loginInfo.userInfo
function saveUserInfo2Vuex() {
  let sxlUserInfo = commonFn.handleStroage.getLocalStorage('sxlUserInfo');
  if (sxlUserInfo) {
    store.commit('userInfo', sxlUserInfo)
  } else {
    Toast({
      message:'sxlUserInfo is not exist'
    })
    // console.error('sxlUserInfo is not defined');
  }
}

// 安卓 ios 内核判断
function coreJudge() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 'android'
  } else if (isIOS) {
    return 'ios'
  }
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    console.log("微信");
  } else {
    console.log("非微信");
  }
}
// for wx sign 兼容 ios
function getFirstUrl() {
  let loadFirstUrl = store.state.loginInfo.loadFirstUrl;
  return loadFirstUrl
  // return sessionStorage.getItem('sxlFirstLink')
}

// 为兼容ios ios以首个url历史记录为签名
(function setFirstUrl() {
  let url = location.href
  // let getFirstUrl = sessionStorage.getItem('sxlFirstLink');
  let loadFirstUrl = getFirstUrl();
  if (loadFirstUrl == '') {
    store.commit('loadFirstUrl', url)
    // sessionStorage.setItem('sxlFirstLink',url);
  }
}())

// 微信签名
async function wxSign(to) {

  let url = location.href;
  let queryString = qs.stringify(to.query);
  url = url.split('#')[0] + '#' + to.path + (queryString?`?${queryString}`:'');
  
  let core = coreJudge()
  if (core == 'ios') {
    url = getFirstUrl();

    store.commit('loadFirstUrl', url)
    // url = 'http://www.shangxialian.net/js/'
  }

  let {
    data
  } = await axios.get(api.wxConfig, {
    params: {
      // url:'http://www.shangxialian.net/js/?#/'
      url
    }
  })

  let {
    appId,
    timestamp,
    nonceStr,
    signature,
  } = data;

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名，见附录1
    jsApiList: [
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  // wx.checkJsApi({
  //   jsApiList: [
  //     'chooseImage',
  //     'previewImage',
  //     'uploadImage',
  //     'downloadImage',
  //     'onMenuShareAppMessage',
  //     'onMenuShareTimeline',
  //   ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //   success: function (res) {
  //     // 以键值对的形式返回，可用的api值true，不可用为false
  //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  //     // console.log(res)
  //     // alert(JSON.stringify(res))
  //   }

  // });
  
  /**
   *  忽视重设分享信息的地址 
   * （由于执行顺序的问题 当部分地址需要进去后立即更改参数时
      随后触发的自动变更分享将会使之前的更替失效 故假如该忽略list以自定义其忽略部分）
   * */ 
  let ignoreList = [
    '/',
    '/03_quickSearch',
    '/moreResult',
  ];

  if(ignoreList.indexOf(to.path) == -1 ){
    store.commit('resetShareInfo',to);
    store.commit('resetFriendNetInfo',to);
  }

}
wx.ready(function(){
  
  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口

  wx.onMenuShareAppMessage(store.state.shareInfo);

  // 分享到朋友圈
  wx.onMenuShareTimeline(store.state.friendNetInfo);

});

// 开始认证
sessionStorage.setItem('auth', 'false')

// 设置问号
function questionMarkSet(){
  let url = window.location.href;
  if (!url.match(/\?/)) {
    // sessionStorage.removeItem('sxlFirstLink')
    location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
  }
}

function isHasManageAuth(to){
  // 需要有相关权限才能进入的页面
  const autoPageList = [
    '/company-cert', //企业审核
    '/refund', //短信退款审核
  ];
  let userInfo = store.state.loginInfo.userInfo
  // if(userInfo.username=='伊谢尔伦的风') return true;
  let autoPage= autoPageList.indexOf(to.path);
  if(autoPage == -1) return true;
  store.state.loginInfo.Administrator
  
  return store.state.loginInfo.Administrator==0?true:false;

}

function pushHistory() {
  var state = {
    title: "title",  
    url: location.href.split(location.host)[1],
  };
  window.history.pushState(state, "title", location.href.split(location.host)[1]);
  
  
}

window.addEventListener("popstate", function(e) {
  if(!e.state){
      Toast({
        message:'再按一次退出程序',
      })
      setTimeout(()=>{
        pushHistory();  
      },4000)  
  }
  
}, false);


pushHistory();


// 用于用户授权登录验证
async function userAuth(to, form, next) {
  
  let userInfo = await checkLocalUser();
  
  // userInfo =false;
  if (userInfo) {
    // localStorage 含有用户信息
      questionMarkSet();
      
      saveUserInfo2Vuex(userInfo);
      // let token = userInfo.token;

      let userCheck = ()=>[189,211].indexOf(userInfo.user_id)

      if(userCheck() !== -1){
        
        var vConsole = new VConsole();
      }

      let hasAuto = isHasManageAuth(to);
      
      if(hasAuto){
        next();
      }else{
        next('/')
      }
      
      // 认证结束
      sessionStorage.setItem('auth', 'true')
      return true

    // axiosInterceptors(token);
  } else {

    let code = commonFn.getUrlParam('code');
    if (code) {
      axios.get(api.getUserInfo, {
        params: {
          code
        }
      }).then(res => {
        let getTokenTime = Date.now()
        let getUserInfoByCode = {
          createdTime: getTokenTime,
          ...res.data
        };

        store.commit('userInfo', getUserInfoByCode);
        commonFn.handleStroage.setLocalStorage('sxlUserInfo', getUserInfoByCode)
        if(!commonFn.handleStroage.getLocalStorage('firstLoginTime')){
          commonFn.handleStroage.setLocalStorage('firstLoginTime',getTokenTime)
        }

        let getSxlUserInfo = commonFn.handleStroage.getLocalStorage('sxlUserInfo')

        let host = window.location.href.split('?')[0];
        let path = window.location.href.split('#')[1];

        window.location.href = (host + '?#' + path);

      })
      .catch(rej=>{
        Toast({
          message:'token获取失败'+rej+' weChatCode:'+code,
        })
      })

    } else {

      const appid = 'wx326433af14961e48';

      let path = window.location.href.split('#')[1];
      let redirect_uri = encodeURIComponent(`http://www.shangxialian.net/js/#${path}`);

      let getCodeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`;
      window.location.href = getCodeUrl;

    }
    
  }
}

let endUrl, //获得用户最终的url(刷新仍会发送请求 后端判断时间间隔短则覆盖)
    endUrlName, //获得对应url命名描述
    mainEndUrlName; //对应url主要类别
router.beforeEach((to, form, next) => {

  // 用户授权登录验证
  if (isTest == false) {
    let userInfo = commonFn.handleStroage.getLocalStorage('sxlUserInfo')
    if(userInfo){
      let {username,user_id,headimgUrl} = userInfo;
   
      endUrl = 'www.shangxialian.net/?#'+to.path;
      endUrlName = to.meta.remark;
      mainEndUrlName = to.meta.main;
      let userData = JSON.stringify({
        username,
        user_id,
        headimgUrl,
        endUrl,
        endUrlName,
        mainEndUrlName,
      });
      localStorage.setItem('exitSave',userData);
    }

    userAuth(to, form, next);

  } else {
    next();
  }

});


router.afterEach((to, from) => {

  wxSign(to);

})
// let testExit = localStorage.getItem('testExit')
// alert('测试用弹窗 请忽略 '+testExit);
// setInterval(()=>{
// 上传用户离线链接

// window.onbeforeunload = function(){   
//   var n = window.event.screenX - window.screenLeft;   
//   var b = n > document.documentElement.scrollWidth-20;   
//   if(b && window.event.clientY<0 || window.event.altKey)   
//   {   
//       alert("是关闭而非刷新");   

//       window.event.returnValue = "是否关闭？";


//   }else{
//       alert("是刷新而非关闭");   
//   }   
// }

window.onunload = ()=>{
  
  let authState = sessionStorage.getItem('auth') // 当 auth == 'true' 认证结束 tips 此值类型 String
  
  // let userInfo = commonFn.handleStroage.getLocalStorage('sxlUserInfo')
  // 当存在用户信息 切认证完毕后 还支持 navigator.sendBeacon 方法
  
  let exitData = localStorage.getItem('exitSave')
  // localStorage.setItem('testExit','we go away before')
  
  if ( exitData && authState=='true' && navigator.sendBeacon) {
    // Beacon 代码
    /*let {username,user_id,headimgUrl} = userInfo;
    let {username,user_id,headimgUrl} = userInfo;
    let random = Math.random()
    let userData = JSON.stringify({
      username,
      user_id,
      headimgUrl,
      endUrl:random,
      endUrlName,
      mainEndUrlName,
      delUrl,
      url,
    })
   */
   localStorage.setItem('testExit','we run '+exitData);
   
   navigator.sendBeacon(api.leaveRecord,exitData);
  // //  navigator.sendBeacon(api.leaveRecord,userData);
  }
  
}

/*
let exitData = localStorage.getItem('exitSave')
const syncReport = (url, { data = {}, headers = {} } = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.withCredentials = true;
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.send(JSON.stringify(data));
};
let data = JSON.parse(exitData)

let testApi = 'http://127.0.0.1:7878'
syncReport(testApi,{
  data
})
*/
// },10000)

// window.onbeforeunload = function() {
  // var n = window.event.screenX - window.screenLeft;
  // var b = n > document.documentElement.scrollWidth-20;
  // if(b && window.event.clientY < 0 || window.event.altKey) {
  // alert("是关闭而非刷新");
  // }else{
  // alert("是刷新而非关闭");
  // }

// }
// let remarkList = routes.map((ele,index)=>{
  
//   return ele.meta.remark
// })
// let remarkList = {}
// routes.forEach(ele=>{

//   remarkList[ele.meta.main] = ele.meta.main
// })

// console.log(remarkList)

// Vue.prototype.$axios = axios;

export default router;