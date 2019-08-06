<template>
  <div id="app">
    <!-- <div id="nav">
<router-link :to="{name:'shangLian'}">Home</router-link> |
<router-link to="/about">About</router-link>
    </div>-->
    <!-- <transition
        :name="transitionName"
        mode="out-in"
      > -->
      <keep-alive :max="10">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      
    <!-- </transition> -->
    <lg-preview></lg-preview>
    <!-- 底部 -->
    <index-footer v-show="botHid" />

    <!-- 提示框 s -->
    <tips></tips>
    <!-- 提示框 e -->
    <share-mask></share-mask>
  </div>
</template>

<script>
import ShareMask from "@/components/common/ShareMask";
import CreateFooterItem from "./components/common/CreateFooterItem";
import Tips from "@/components/common/Tips";
import { setTimeout } from 'timers';

let vm = null;

export default {
  name: "app",
  components: {
    "index-footer": CreateFooterItem,
    Tips, //提示框
    ShareMask //分享蒙版
  },

  data() {
    return {
      // pos:0,
      transitionName: "", //保存路由动效名
      isTest: false, //测试账号

      // 用户信息
      userInfo: {
        //判断是否已经认证
        hidWfEnterpriseID: "",
        //是否设为首页
        chbIsDefaultPage: null,
        //用户ID
        ID: null
      },
      recommendPop: {
        isShow: false,
        text: ""
      }, //推荐弹窗
      //调试/线上
      isTest: true
    };
  },
  beforeCreate() {
    vm = this;
  },
  async created() {
    
    // 假如url不带问号则在#字符前加?
    let config = {};
    let url = window.location.href;
    // if(!url.match(/\?/)){
    //   location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
    //   return;
    // }
    // this.autoLogin();
    // await this.getUserCompany();
    const getUserCompanyWatch = this.$watch('$store.state.loginInfo.userInfo', (newVal, oldVal) => {
      this.$nextTick(()=>{
        this.getUserCompany();
        getUserCompanyWatch();
      })
    })

  },
  beforeMount(){
    
  },
  mounted(){
    
    let core = this.$commonFn.coreJudge()
    if(core == 'ios'){
      /*
      let resizeFunc = ()=>{
        let nowPageHeight = document.body.style.height;
        let INITHEIGHT = this.$store.state.pageControl.INITHEIGHT;
        if( INITHEIGHT > nowPageHeight ){
          document.body.style.height  = window.innerHeight+"px";
          window.removeEventListener('resize',resizeFunc);
        }
      }
      window.addEventListener("resize",resizeFunc);
      */
    }else{
      document.body.style.height  = window.innerHeight+"px";
    }
  },
  methods: {
    // 获取用户企业
    async getUserCompany() {
      
      let userInfo = this.$store.state.loginInfo.userInfo,
        token = userInfo.token;

      let companyInfo = await this.$axios
        .get(this.$api.companyInfo, {
          params: {
            token: this.$store.state.loginInfo.userInfo.token
          }
        })
        .then(res => res.data)
        .catch(rej => {
          console.log(rej);
          this.$toast({
            message: "公司数据加载失败,请重新加载"
          });
          // this.$indicator.close();
          return rej;
        });
      
      if (companyInfo.status) {
        this.$store.commit("authComInfo", companyInfo);
      } else {
        this.$store.commit("authComInfo", false);
      }
        this.$store.commit('indexInfo',companyInfo);
    },

    login() {
      if (this.isTest) {
        this.$axios
          .post(this.$api.LoginTest, {
            id: 11
          })
          .then(successBack => {
            // _this.$axios.get(_this.$api.GetUserInfo)
            // .then((successBack)=>{
            if (successBack.data.IsResult) {
              let res = successBack.data.Result;
              this.userInfo.ID = res.ID;
              // _this.userInfo.chbIsDefaultPage = res.chbIsDefaultPage; //废弃 原为默认页
              // _this.userInfo.hidBidsCompanyID = res.hidBidsCompanyID; // 标注为公司ID 然鹅后端没有使用该字段
              this.userInfo.hidWfEnterpriseID = res.hidWfEnterpriseID; //企业ID
              //本地存储个人信息
              // commonFn.handleStroage.setLocalStorage("userInfo", _this.userInfo)
              this.$store.commit("userInfo", _this.userInfo);
            } else {
              if (successBack.data.Status == 0 && !_this.isTest) {
                window.location.href =
                  "http://sxl.weiren.me/Api/Sx/PublicAccountLogin?redirectUrl=" +
                  location.pathname;
                //createDialog().removeLocalStorage("isCode");
                //登录
              }
            }
          })
          .catch(rej => {
            // eslint-disable-next-line
            console.log(rej);
          });
      } else {
        //获取用户信息

        this.$axios
          .get(this.$api.GetUserInfo)
          .then(res => {
            if (res.data.IsResult) {
              let res = res.data.Result;
              this.userInfo.ID = res.ID;
              // _this.userInfo.chbIsDefaultPage = res.chbIsDefaultPage; // 废弃 原为默认页
              // _this.userInfo.hidBidsCompanyID = res.hidBidsCompanyID; // 标注为公司ID 然鹅后端没有使用该字段
              this.userInfo.hidWfEnterpriseID = res.hidWfEnterpriseID; //企业ID

              //本地存储个人信息
              // commonFn.handleStroage.setLocalStorage("userInfo", _this.userInfo)

              this.$store.commit("userInfo", _this.userInfo);
            } else if (res.data.Status == 0 && !_this.isTest) {
              // alert(location.pathname)
              window.location.href = `http://sxl.weiren.me/Api/Sx/PublicAccountLogin?redirectUrl=${location.pathname}`;
            }
          })
          .catch(rej => {
            console.log(rej);
          });
      }
    },

    autoLogin() {
      // this.$axios.get(this.$api.autoLogin)
      // .then(res=>{
      //   console.log(res)
      //   return res
      // })
      // .catch(rej=>{
      //   console.log(rej)
      // })
    }
  },
  computed: {
    botHid() {
      let panthName = this.$route.name,
        hidList = [
          "autConfig",
          "chuck-msg",
          "authcomInfo",
          "feedback",
          "fd-history",
          "fdBak",
          "chongzhi",
          "poster",
          "setSub",
          "selfPic"
        ],
        isHid = hidList.indexOf(panthName) !== -1;

      if (isHid) {
        return false;
      }
      return true;
    }
  },

  //路由的过渡动画
  watch: {
    $route(to, from) {
      
      const toDepth = to.path.split("/")[1].length;
      const fromDepth = from.path.split("/")[1].length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
    /*
    "$store.state.loginInfo.userInfo": {
      handler(newVal) {
        this.$nextTick(()=>{
          this.getUserCompany();
        })
      }
      // deep:true,
    }
    */
  }
};
</script>

<style lang="scss">
html{
  
}
body{
  // overflow: hidden;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // // text-align: center;
  // color: #2c3e50;
  // overflow: hidden;
  height: 100%;
  // overflow: hidden;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


//以下为路由的过渡过画效果  -------START-----
.slide-left-leave-to{
  transform : translateX(-100%)
}
.slide-left-enter-active {
  transition: all 0.6s ease;
}
.slide-left-leave-active {
  transition: all 0.6 ease;
}
.slide-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  // opacity: 0;
}
.slide-left-leave-to{
  transform : translateX(-100%)
}
     
.slide-right-leave-to{
  transform : translateX(-100%)
}
.slide-right-enter-active {
  transition: all 0.6s ease;
}
.slide-right-leave-active {
  transition: all 0.6s ease;
}
.slide-right-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100px);
}
.slide-right-leave-to{
  transform : translateX(100%)
}
// 路由的过渡过画效果  ------END------


// Mint-ui loading z-index set s
.mint-indicator{
    transition: none !important;
    z-index:99999;
  .mint-indicator-wrapper{
    z-index:99999;
  }
  .mint-indicator-mask{
    z-index:99999;
  }
}


// Mint-ui loading z-index set e


.mint-navbar{
    &.mt-navbar-reset{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 1rem;
        z-index: 1;
      .mint-tab-item-label{
        font-size: 0.34rem;
      }
      .mint-tab-item.is-selected{
          border-bottom: 3px solid #09a2a3;
          color: #09a2a3;
          margin-bottom: -3px;
      }
    }
}

</style>


