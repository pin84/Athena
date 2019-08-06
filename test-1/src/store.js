import Vue from 'vue'
import Vuex from 'vuex'
import commonFn from './utils'

Vue.use(Vuex)

// 修改状态方法 _this.$store.commit('userId',121);
// 引用方法 _this.$store.state.loginInfo.userId
// 路由控制
const INITHEIGHT = document.body.style.height;
const pageControl = {
  state: {
    isGo: true, //是否要跳转到
    INITHEIGHT,
  },
  mutations: {
    // 
    isGoTargetState(state, params) {
      state.isGo = params;
    },

  }
}

// 登录模块的状态
const loginInfo = {
  state: {
    userInfo: {
      // ID: "",
      // hidBidsCompanyID: "",
      // hidWfEnterpriseID: ""
    }, //用户信息
    showingCId: "", //正在显示的企业ID
    loadFirstUrl: '',
    Administrator:null, //用户权限
  },

  mutations: {
    // userInfo 用户信息
    /**
     * 包含
     * userInfo.ID //用户ID
     * userInfo.chbIsDefaultPage //
     * userInfo.hidBidsCompanyID //当前访问的企业ID
     */
    userInfo(state, params) {
      state.userInfo = params;
    },
    userId(state, params) {
      state.userId = params
    },
    showingCId(state, params) {
      state.showingCId = params
    },

    removeUserInfo(state) {
      state.userInfo = null;
    },

    loadFirstUrl(state, params) {
      state.loadFirstUrl = params;
    },

    setAdministrator(state,params){
      state.Administrator = params;
    },

  },
  actions: {

  }

}

// 保存现显示企业的信息
const company = {
  state: {
    info: null, //不太确定这个字段有没有用到。
    indexInfo: null,//首页面拿到的公司信息，有公司的id、名字、行业的id等
    detailInfo: null,//保存企业详细信息，需要用indexInfo中的公司id和行业id从后台取
    saveComTags: [], //保存企业的标签
    savePersonTags: [], //保存个人的标签
    authComInfo: null,//已认证或正在认证的企业信息
  },

  mutations: {
    saveInfo(state, parms) {
      state.info = parms
    },
    indexInfo(state, params) {
      state.indexInfo = params
    },
    detailInfo(state, params) {
      state.detailInfo = params
    },
    savePersonTags(state, params) {
      state.savePersonTags = params
    },
    saveComTags(state, params) {
      state.saveComTags = params
    },
    authComInfo(state, params) {
      state.authComInfo = params
    }
  }
}

// 订阅模块信息
const dingyue = {
  state: {
    hotOrHistory: false,//显示历史搜索或是热门搜索
    historySearch: [],//历史搜索
    subScript: {},//个人的订阅设置


  },
  mutations: {
    hotOrHistory(state, flag) {
      state.hotOrHistory = flag
    },
    setHistorySearch(state, params) {
      state.historySearch.push(params)
    },
    addKeyword(state, keyword) {
      // state.historySearch[keyword] = keyword
    },
    setSub(state, sub) {
      state.subScript = sub
    }
  }
}

//tips功能。测试用，
const tips = {
  state: {
    isShowTips: { content: '', type: false }
  },
  mutations: {
    isShowTips(state, params) {
      state.isShowTips = params
    }
  }
}

// 弹窗功能模块
const pop = {
  state: {
    showing: "",
    oldShow: "",
    componentList: {}, //组件注册列表 0为隐藏 1为显示
    zIndex: 999,

    call: 0,
    config: {
      confirm() { },
      cancel() { },
      confirmText: '确认',
      text: '非合法操作'
    },//弹窗配置
    params: {}, // 参数
  },
  mutations: {
    // userInfo 用户信息
    /**
     * 包含
     * userInfo.ID //用户ID
     * userInfo.chbIsDefaultPage //
     * userInfo.hidBidsCompanyID //当前访问的企业ID
     */
    /** 
     * 当弹窗之间传参时 可通过
     * 用法 子组件 com-pop 传递state中params
     * 对应的父组件弹窗 监听 params @params 获取弹窗参数
     * 
    */

    showPop(state, params) {
      let popName = "";
      state.oldShow = state.showing
      if (params.constructor.name == "Object") {
        if (state.params.saveParams == true) {
          state.params.saveParams = false;
        } else {
          state.params = {
            saveParams: false
          };
        }
        popName = params.popName || '';
        state.params = params.params || {};
        params.config ? state.config = params.config : null;
      }
      if (typeof params == 'string') {
        popName = params;
      }
      console.log(state.componentList[popName])
      Vue.set(state.componentList, popName, {
        showState: 1,
      })
      // state.componentList = Object.assign({},state.componentList)
      // console.clear()
      // console.log(popName,state.componentList[popName])
      state.showing = popName;
      state.call++;

    },

    untilRegister(state, params) {
      let popName = params;

      // console.log(Vue.set)
      // Vue.set(state,'componentList',popName)
      Vue.set(state.componentList, popName, {
        showState: 0,
      })
      // state.componentList[popName] = {
      //   showState:0,
      // };
      // console.clear()
      // console.log(state.componentList)

    },

    popClose(state, params) {
      let popName = params
      Vue.set(state.componentList, popName, {
        showState: 0,
      })
    },

  },
  actions: {
  }

}

// 分享给朋友 
const shareInfo = {
  state: {
    title: '#上下链#  让营销者先行', // 分享标题
    desc: '#上下链#  采购招标商机自动推送平台-机会创造价值', // 分享描述
    // link : window.location.href, // 分享链接
    // imgUrl = `https://c-ssl.duitang.com/uploads/blog/201512/01/20151201131252_XHtis.jpeg`, // 分享图标
    imgUrl: `http://www.shangxialian.net${process.env.NODE_ENV === 'production' ? '/js/' : ''}${require('./assets/icon/lian200.jpg')}`, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '',
    success: function () {
      // 用户确认分享后执行的回调函数
      // alert("分享成功");
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      // alert("分享失败");
    }
  },

  mutations: {

    // 改变分享信息
    setShareInfo(state, params = {}) {
      commonFn.forEachObj(params, (key, val) => {
        if (key == 'success' || key == 'cancel') {
          if (typeof val !== 'function') {
            console.error(`setShareInfo params's property "${key}" must be function!`);
            return
          }
        }
        if (typeof key !== 'string') {
          console.error(`setShareInfo params's property "${key}" must be string!`);
          return
        }
        state[key] = val;
      });

    },

    // 重设分享信息
    resetShareInfo(state, $route) {

      // this.commit('setShareInfo')

      let main = $route.meta.main,
        title,
        desc,
        mainShow = [
          {
            main: '订阅',
            title: '#上下链#  采购招标商机自动推送平台-机会创造价值',
            desc: '#上下链#  采购招标商机自动推送平台-机会创造价值'
          },
        ],
        defaultText = '#上下链#  让营销者先行',
        defaultShow = {
          title: defaultText,
          desc: defaultText
        },
        showIndex = mainShow.findIndex(ele => {
          return main == ele.main
        });

      if (showIndex !== -1) {
        title = mainShow[showIndex].title;
        desc = mainShow[showIndex].desc;
      } else {
        title = defaultShow.title;
        desc = defaultShow.desc;
      }

      this.commit('setShareInfo', {
        title,
        desc
      })

    }

  },

}

// 分享朋友圈
const friendNetInfo = {
  state: {
    title: '#上下链#  让营销者先行', // 分享标题
    imgUrl: `http://www.shangxialian.net${process.env.NODE_ENV === 'production' ? '/js/' : ''}${require('./assets/icon/lian200.jpg')}`, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      // alert("分享成功");
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      // alert("分享失败");
    },
  },

  mutations: {

    // 改变分享信息
    setFriendNetInfo(state, params = {}) {
      commonFn.forEachObj(params, (key, val) => {
        if (key == 'success' || key == 'cancel') {
          if (typeof val !== 'function') {
            console.error(`setFriendNetInfo params's property "${key}" must be function!`);
            return
          }
        }
        if (typeof key !== 'string') {
          console.error(`setFriendNetInfo params's property "${key}" must be string!`);
          return
        }
        state[key] = val;
      });

    },

    // 重设分享信息
    resetFriendNetInfo(state, $route) {

      // this.commit('setShareInfo')

      let main = $route.meta.main,
        title,
        mainShow = [
          {
            main: '订阅',
            title: '#上下链#  采购招标商机自动推送平台-机会创造价值',
          },
        ],
        defaultText = '#上下链#  让营销者先行',
        defaultShow = {
          title: defaultText,
        },
        showIndex = mainShow.findIndex(ele => {
          return main == ele.main
        });

      if (showIndex !== -1) {
        title = mainShow[showIndex].title;
      } else {
        title = defaultShow.title;
      }

      this.commit('setFriendNetInfo', {
        title,
      })

    }

  },
}

export default new Vuex.Store({
  // state: {
  //   // 企业id状态
  //   cId:""

  // },
  // mutations: {

  // },
  // actions: {

  // }

  modules: {
    pageControl, //页面控制
    loginInfo, //登录模块的状态
    pop,//弹窗模块
    dingyue,  //订阅模块
    company, //企业信息
    shareInfo, //分享朋友的信息
    friendNetInfo, //分享朋友圈的信息
    tips, //tips
  }

})
