<template>
  <div id="app">
    <!-- <div id="nav">
<router-link :to="{name:'shangLian'}">Home</router-link> |
<router-link to="/about">About</router-link>
    </div>-->
    <!-- <transition
        :name="transitionName"
        mode="out-in"
    >-->
    <keep-alive :max="10">
      <router-view v-if="$route.meta.keepAlive && isLoadAll "></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive  && isLoadAll "></router-view>

    <!-- </transition> -->
    <lg-preview></lg-preview>
    <!-- 底部 -->
    <index-footer v-show="botHid" />

    <!-- 提示框 s -->
    <tips></tips>
    <!-- 提示框 e -->
    <share-mask></share-mask>

    <follow-tip :openState="followPopState" @closeFollowTip="closeFollowTip" />
  </div>
</template>


<script>
import ShareMask from "@/components/common/ShareMask";
import CreateFooterItem from "./components/common/CreateFooterItem";
import Tips from "@/components/common/Tips";
import FollowTip from "@/components/common/FollowTip.vue";
import { Indicator } from "mint-ui";
import { setTimeout } from "timers";

let vm = null;
export default {
  name: "app",
  components: {
    "index-footer": CreateFooterItem,
    Tips, //提示框
    ShareMask, //分享蒙版
    FollowTip
  },

  data() {
    return {
      // pos:0,
      transitionName: "", //保存路由动效名
      isTest: false, //测试账号
      // userInfo:this.$store.state.loginInfo.userInfo,
      // 用户信息

      recommendPop: {
        isShow: false,
        text: ""
      }, //推荐弹窗
      //调试/线上
      isTest: true,

      subscribe: 1,
      followPopState: false,
      isLoadAll: false
    };
  },
  beforeCreate() {
    vm = this;
  },
  async created() {
    this.bus.$on("isFollow", this.isShowFollowTip);

    // 假如url不带问号则在#字符前加?
    let config = {};
    let url = window.location.href;
    // if(!url.match(/\?/)){
    //   location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
    //   return;
    // }
    // this.autoLogin();
    // await this.getUserCompany();

    const getUserCompanyWatch = this.$watch(
      "$store.state.loginInfo.userInfo",
      async (newVal, oldVal) => {
        await this.getUserCompany();
        this.isFollowCheck();
        // this.getToken();
        getUserCompanyWatch();
      }
    );

    function pushHistory() {
      var state = {
        title: "title",
        url: location.href.split(location.host)[1]
      };
      window.history.pushState(
        state,
        "title",
        location.href.split(location.host)[1]
      );
    }

    window.addEventListener(
      "popstate",
      e => {
        if (!e.state) {
          this.$toast({
            message: "再按一次退出程序"
          });
          setTimeout(() => {
            pushHistory();
          }, 4000);
        }
      },
      false
    );

    pushHistory();
  },
  beforeMount() {},
  mounted() {
    // this.$store.commit("showPop", {
    //   popName: "tips",
    //   config: {
    //     text: "系统正在维护中，请耐心等待。",
    //     confirmText: "",
    //     confirm: () => {
    //       // alert("3Q");
    //     }
    //   }
    // });

    let core = this.$commonFn.coreJudge();
    if (core == "ios") {
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
    } else {
      document.body.style.height = window.innerHeight + "px";
    }

    window.addEventListener("resize", function() {
      document.body.scrollTop = 0;
    });

    let payState = sessionStorage.getItem("payJustNow");
    if (payState === "true") {
      sessionStorage.removeItem("payJustNow");
      this.bus.$emit("isFollow");
    }
  },

  errorCaptured(err, vm, info) {
    // this.$axios.post(this.$api.errorApi,{
    //   info:JSON.stringify({ "hehi":"heihei" }),
    //   path: window.location.href,
    // })
    // .then(res=>{
    // })
    // .catch(rej=>{
    // })
  },
  methods: {
    getToken() {
      let username = this.$store.state.loginInfo.userInfo.username;
      let noGetArr = [
        "XY lim",
        "池伟青Vince",
        "伊谢尔伦的风",
        "阿伟",
        "莊琼洲",
        "Ray"
      ].includes(username);

      if (noGetArr) {
        return;
      }

      this.$axios.post(this.$api.errorApi, {
        info: JSON.stringify({
          ...this.$store.state.loginInfo.userInfo,
          ...this.$store.state.company.indexInfo
        }),
        path: window.location.href
      });
    },
    async isFollowCheck() {
      let subscribeRes = this.$axios
        .get(this.$api.otherUserInfo, {
          params: {
            token: this.$store.state.loginInfo.userInfo.token
          }
        })
        .then(res => res.data.subscribe);
      let subscribe = await subscribeRes;
      if (subscribe == 0) {
        this.$store.state.loginInfo.isSubscribe = true;
      } else {
        this.$store.state.loginInfo.isSubscribe = false;
      }
    },

    async isShowFollowTip(isShowNow = false) {
      if (isShowNow) {
        this.followPopState = true;
        return;
      }

      let subscribe = this.$store.state.loginInfo.isSubscribe;
      if (subscribe == true) {
        this.followPopState = false;
      } else {
        this.followPopState = true;
      }
    },

    closeFollowTip() {
      this.followPopState = false;
    },

    // 获取用户企业
    async getUserCompany() {
      let userInfo = this.$store.state.loginInfo.userInfo,
        token = userInfo.token;

      let companyInfo;

      let res = await this.$commonFn.isJoinCooperation(
        this.$api.getUserAuth,
        userInfo.token,
        userInfo.user_id
        // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IiIsInVzZXJfaWQiOjYyOCwiZXhwIjoxNTY5NTUyOTEyLCJ1c2VybmFtZSI6Im9PNUVxNkFMR2hOS1dwOUUyTXBQV3k3ekItRnMifQ.BfMlnEGwIeiicJwJmghESzaYbEkP6gMNDXdZRCkcPTY",
        // 628
      );

      console.log(`==app res=====`, res);
      // debugger;

      if (res) {
        //拿公司全名去查爬虫表，拿到行业id  ---------start----
        let d = {
          company_name: res.user.company_name
        };

        let { data } = await this.$axios.get(this.$api.indexSearch, {
          params: d
        });
        let restData;
        if (data.length !== 0) {
          restData = {
            enterprise: data[0].company_name,
            industryid: data[0].industriesid
          };
        }
        //---------end-------------

        let tem = {
          enterprise: res.user.company_name,
          enterpriseid: res.user.company_id
        };

        companyInfo = Object.assign(res.companyInfo, tem, restData);

        //储存两个store是为了区别之后的逻辑，indexInfo在使用的过程中储存当用的公司信息，比较用户搜索后的企业信息
        this.$store.commit("authComInfo", companyInfo);
        this.$store.commit("indexInfo", companyInfo);
        // localStorage.setItem("com-indexinfo", JSON.stringify(companyInfo));
        localStorage.setItem("authComInfo", JSON.stringify(companyInfo));
        localStorage.setItem("indexInfo", JSON.stringify(companyInfo));
      } else {
        companyInfo = await this.$axios
          .get(this.$api.companyInfo, {
            params: {
              token: this.$store.state.loginInfo.userInfo.token
            }
          })
          .then(res => res.data)
          .catch(rej => {
            this.$toast({
              message: "公司数据加载失败,请重新加载"
            });
            return rej;
          });
        Indicator.open({
          text: "数据 让营销者先行"
        });

        this.$store.commit("authComInfo", false);
        this.$store.commit("indexInfo", companyInfo);
        localStorage.setItem("authComInfo", false);
        localStorage.setItem("indexInfo", JSON.stringify(companyInfo));
      }

      this.isLoadAll = true;
      Indicator.close();
    },
    // // 获取用户企业
    // async getUserCompany() {
    //   let userInfo = this.$store.state.loginInfo.userInfo,
    //     token = userInfo.token;

    //   let companyInfo = await this.$axios
    //     .get(this.$api.companyInfo, {
    //       params: {
    //         token: this.$store.state.loginInfo.userInfo.token
    //       }
    //     })
    //     .then(res => res.data)
    //     .catch(rej => {
    //       this.$toast({
    //         message: "公司数据加载失败,请重新加载"
    //       });
    //       // this.$indicator.close();
    //       return rej;
    //     });
    //   Indicator.open({
    //     text: "数据 让营销者先行"
    //   });

    //   if (companyInfo.status) {
    //     this.$store.commit("authComInfo", companyInfo);
    //     this.$store.commit("indexInfo", companyInfo);
    //     localStorage.setItem("com-indexinfo", JSON.stringify(companyInfo));
    //     // localStorage.setItem("authComInfo", JSON.stringify(companyInfo));
    //   } else {
    //     //如果没有认证的企业，则查询是否有加入协同
    //     let res = await this.$commonFn.isJoinCooperation(
    //       this.$api.getUserAuth,
    //       userInfo.token,
    //       userInfo.user_id
    //     );
    //     if (res) {
    //       let tem = {
    //         enterprise: res.user.company_name,
    //         enterpriseid: res.user.company_id
    //       };

    //       companyInfo = Object.assign(res.companyInfo, tem);
    //       //储存两个store是为了区别之后的逻辑，indexInfo在使用的过程中储存当用的公司信息，比较用户搜索后的企业信息
    //       this.$store.commit("authComInfo", companyInfo);
    //       this.$store.commit("indexInfo", companyInfo);
    //       localStorage.setItem("com-indexinfo", JSON.stringify(companyInfo));
    //       // localStorage.setItem("authComInfo", JSON.stringify(companyInfo));
    //     } else {
    //       this.$store.commit("authComInfo", false);
    //       this.$store.commit("indexInfo", companyInfo);
    //     }
    //   }

    //   this.isLoadAll = true;
    //   Indicator.close();
    // },

    /*
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
    },*/

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
          "spposter",
          "setSub",
          "selfPic",
          "customerset",
          "TipMain",
          "TipSearchCompanyShowRes",
          "TipSearchCompany",
          "addarticle2",
          "addarticle",
          "sppublish",
          "special"
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
    }

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


