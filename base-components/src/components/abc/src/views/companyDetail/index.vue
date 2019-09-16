<template>
  <div id="special">
    <div class="main-body">
      <com-header :showHeadShare="true" :shareFunc="headShareFunc" :company="company" />
      <div v-if="articleList.length !== 0">
        <div v-for="(item,index) in articleList" :key="index" class="list" ref="list" :id="index">
          <div class="move" v-show="isAdmin && articleList.length >1">
            <span @click="moveTo(index,'up')" v-show="index !== 0">
              <img src="../../assets/icon/companyDetail/up.png" alt />
            </span>
            <span @click="moveTo(index,'down')" v-show="index !== articleList">
              <img src="../../assets/icon/companyDetail/down.png" alt />
            </span>
            <span class="down"></span>
          </div>
          <ArticleList :content="item" @getAllContent="getAllContent" />
          <ShowImgList :imgList="item.pic" />
          <div class="mod-del" v-show="isAdmin">
            <span class="mod" @click="editArticle(item.id)">编辑</span>
            <span @click="delArticle(item.id)">删除</span>
          </div>
        </div>
      </div>

      <div v-else class="tips">
        <p>暂无图文动态</p>
        <p>请及时上传</p>
        <!-- <button class="btn" @click="toUsercenter" v-show="isAdmin">去上传</button> -->
      </div>
    </div>

    <div class="btn-add" @click="addArticle" v-show="isAdmin">
      <img src="../../assets/icon/companyDetail/add.png" alt />
    </div>

    <FollowBtn :isSubscribe="$store.state.loginInfo.isSubscribe"></FollowBtn>
    <Tips
      :isShow="isShowTips"
      :content="'确定要删除吗?'"
      :leftText="'取消'"
      :rightText="'确定'"
      @submit="submit"
      @cancel="cancel"
    />

    <div class="btn-box">
      <div @click="$router.push('/userCenter')" class="send_dynamic left" v-show="!isAdmin">
        <span class="iconfont icon">&#xe65a;</span>
        <span class>我也要发布图文动态</span>
      </div>

      <div class="send_dynamic right" v-show="!isAdmin" @click="headShareFunc">
        <span class="iconfont icon">&#xe6ff;</span>
        <span class>分享此文</span>
      </div>
    </div>
  </div>
</template>
<script>
// import BaseInfo from "@/components/shangLian/dimenPop/BaseInfo"; //
import ComHeader from "@/components/common/ComHead_2";
import ArticleList from "./Article";
import ShowImgList from "./ShowImgList";
import Tips from "@/views/dingyue/model/Tips";
import FollowBtn from "@/components/common/FollowBtn";
import qs from "qs";
// import BaseInfo from'@/components/shangLian/dimenPop/BaseInfo.vue'

export default {
  // name: "special",
  // mixins: [BaseInfo],
  data() {
    return {
      type: null, //如果是点击分享的链接进来的，则这个字段为'share'
      id: "", //文章的id
      isShowTips: false,
      isAdmin: false,
      company: {}, //传给头部的企业信息
      articleList: [],
      ctype: "" //点进来的地方，用户中心或搜索页面
    };
  },
  components: {
    // BaseInfo,
    ComHeader,
    ShowImgList,
    ArticleList,
    Tips,
    FollowBtn
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("specialAdmin", JSON.stringify(false));
    // this.wxSign(to)
    next();
  },

  async created() {
    await this.getCompanyInfo();
    // console.log(`=======`, this.company);
    this.initData();

    let query = this.$route.query;

    if (Number(query.ctype) === 1) {
      this.isAdmin = true;
      // localStorage.setItem("specialAdmin", JSON.stringify(true));
    }
  },

  methods: {
    async headShareFunc() {
      this.bus.$emit("shareMaskShow", true);
      this.$router.push({
        path: "/special",
        query: {
          ctype: 3,
          company: this.company.enterprise,
          industryid: this.company.industryid
        }
      });

      await this.wxSign(this.$route);

      let userName = this.$store.state.loginInfo.userInfo.username,
        companyName = this.company.enterprise;

      // let str = ``;
      // str = ` ${userName} 分享 ${companyName} 图文动态`;

      this.$store.commit("setShareInfo", {
        title: ` ${userName} 分享 ${companyName} 图文动态`

        // link: `http://www.shangxialian.net/js/#/special?from=share&company=${this.company.enterprise}&industryid=${this.company.industryid}`
      });
      this.$store.commit("setFriendNetInfo", {
        title: ` ${userName} 分享 ${companyName} 图文动态`
        // link: `http://www.shangxialian.net/js/#/special?from=share&company=${this.company.enterprise}&industryid=${this.company.industryid}`
      });
      // this.$toast("现已可分享信息");
    },

    // 微信签名
    async wxSign(to) {
      let url = location.href;
      let queryString = this.$qs.stringify(to.query);
      url =
        url.split("#")[0] +
        "#" +
        to.path +
        (queryString ? `?${queryString}` : "");

      let core = this.coreJudge();
      if (core == "ios") {
        url = this.getFirstUrl();

        this.$store.commit("loadFirstUrl", url);
        // url = 'http://www.shangxialian.net/js/'
      }

      let { data } = await this.$axios.get(this.$api.wxConfig, {
        params: {
          // url:'http://www.shangxialian.net/js/?#/'
          url
        }
      });

      let { appId, timestamp, nonceStr, signature } = data;

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: [
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "onMenuShareAppMessage",
          "onMenuShareTimeline"
        ]
      });
    },

    // 安卓 ios 内核判断
    coreJudge() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return "android";
      } else if (isIOS) {
        return "ios";
      }
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("微信");
      } else {
        console.log("非微信");
      }
    },

    // for wx sign 兼容 ios
    getFirstUrl() {
      let loadFirstUrl = this.$store.state.loginInfo.loadFirstUrl;
      return loadFirstUrl;
      // return sessionStorage.getItem('sxlFirstLink')
    },

    async initData() {
      let d = {
        // company_id: this.company.enterpriseid,
        company_name: this.company.enterprise,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };

      // console.log(`===this.company====`, d);
      let { data } = await this.$axios.get(this.$api.getArticle, {
        params: d
      });

      // console.log(`====initData===`, data);
      data.introduct_list.forEach(item => {
        if (item.pic === null) {
          item.pic = [];
        }
      });

      this.articleList = data.introduct_list;
    },

    async submit() {
      let d = {
        id: this.id,
        // company_id: this.company.enterpriseid,
        company_name: this.company.enterprise,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };
      // console.log(this.company, d);
      let res = await this.$axios.get(this.$api.delArticle, {
        params: d
      });
      this.isShowTips = false;

      // console.log(`=====res==`, res);
      this.initData();
    },
    cancel() {
      this.isShowTips = false;
    },

    async getAllContent(id) {
      let d = {
        id,
        company_id: this.company.enterpriseid
      };

      let { data } = await this.$axios.get(this.$api.getArticle, {
        params: d
      });

      this.articleList.forEach(item => {
        if (item.id === id) {
          item.short_text = data.introduct.text;
        }
      });
    },
    // getHrefCompanyInfo(enterprise, industryid) {
    //   return this.$axios
    //     .get(this.$api.comInfo, {
    //       params: {
    //         enterpriseid: enterprise,
    //         industryid
    //       }
    //     })
    //     .then(res => res.data);
    // },

    // isShare() {
    //   let { type } = this.$route.query;
    //   try {
    //     if (type == "share") {
    //       return {
    //         hasShare: true,
    //         ...this.$route.query
    //       };
    //     } else {
    //       return false;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    async getCompanyInfo() {
      this.ctype = this.$route.query.ctype;

      let tem;
      // 搜索企业进入
      if (Number(this.ctype) === 2) {
        tem = JSON.parse(localStorage.getItem("com-detailInfo"));
      }

      // 用户中心进入
      if (Number(this.ctype) === 1) {
        let authCompany = this.$store.state.company.authComInfo;
        let { data } = await this.$axios.get(this.$api.comInfo, {
          params: {
            enterpriseid: authCompany.enterprise,
            industryid: authCompany.industryid,
          }
        });


        


        tem = Object.assign({}, data.basic[0], { isAuth: data.states });
      }

      //如果是分享进入
      if (Number(this.ctype) === 3) {
        // console.log(`===从分享进来====`);
        let query = this.$route.query;

        let d = {
          enterpriseid: query.company,
          industryid: query.industryid
        };

        let { data } = await this.$axios.get(this.$api.comInfo, {
          params: d
        });
        tem = Object.assign(data.basic[0], { isAuth: data.states });
      }


      this.company = {
        industryid: tem.industriesid,
        enterprise: tem.company_name,
        status: tem.isAuth, //该企业是否已认证
        OperaState: tem.status,
        LegalReprese: tem.legal_representative,
        CreationTime: tem.established_time.split("T")[0],
        Capital: tem.registered_capital,
        enterpriseid: tem.company_id
      };




      return this.company;
    },

    // shareLink(enterpriseid, enterprise, industryid, ctype) {
    //   this.$router.push({
    //     path: this.$route.path,
    //     query: {
    //       // type: "share",
    //       enterpriseid,
    //       enterprise,
    //       industryid,
    //       ctype: this.ctype
    //     }
    //   });
    // },
    async moveTo(i, type) {
      if (type === "up") {
        if (i === 0) {
          return;
        }
        let tem = this.articleList[i - 1];
        this.articleList[i - 1] = this.articleList[i];
        this.articleList[i] = tem;
      } else {
        if (i === this.articleList.length - 1) {
          return;
        }
        let tem = this.articleList[i + 1];
        this.articleList[i + 1] = this.articleList[i];
        this.articleList[i] = tem;
      }

      let t = this.articleList.pop();
      this.articleList.push(t);

      let arr = [];
      this.articleList.forEach(item => {
        arr.push(item.id);
      });

      let d = {
        company_name: this.company.enterprise,
        rule: arr.join()
      };
      // console.log(`====d===`, d);

      let res = await this.$axios.get(this.$api.sortArticle, {
        params: d
      });

      // console.log(`==res=====`, res);
    },

    async delArticle(id) {
      this.id = id;
      this.isShowTips = true;
      // let d = {
      //   id,
      //   company_id: this.company.enterpriseid,
      //   user_id: this.$store.state.loginInfo.userInfo.user_id
      // };
      // let res = await this.$axios.get(this.$api.delArticle, {
      //   params: d
      // });

      // // console.log(`=====res==`, res);
      // this.initData();
    },
    addArticle() {
      // if (this.$store.state.loginInfo.userInfo.username === 'XY lim' || this.$store.state.loginInfo.userInfo.username === '伊谢尔伦的风' || this.$store.state.loginInfo.userInfo.username === 'Su.jd') {
      //   this.$router.push({
      //     path: "./addarticle_t",
      //     query: { ctype: this.ctype }
      //   });
      //   return;
      // }

      this.$router.push({
        path: "./addarticle",
        query: { ctype: this.ctype }
      });
    },
    editArticle(id) {
      // console.log(`=====id==`);
      this.$router.push({
        path: "./editarticle",
        query: {
          id,
          user_id: this.$store.state.loginInfo.userInfo.user_id,
          company_name: this.company.enterprise,
          company_id: this.company.enterpriseid,
          ctype: this.ctype
        }
      });
    },
    toUsercenter() {
      this.$router.push("./usercenter");
    }
  }
};
</script>

<style lang="stylus" scoped>
#special
  position relative
  width 100vw
  height 100vh
  padding-bottom 1rem
  background-color #fff
  box-sizing border-box
  overflow hidden
  font-size 0.28rem
  .main-body
    width 100%
    height 100%
    min-height 100%
    background-color #fff
    overflow-y scroll
    -webkit-overflow-scrolling touch
    .list
      position relative
      padding-bottom 0.2rem
      border-bottom 10px solid #ccc
      .move
        position absolute 
        width 1.4rem
        height 0.5rem
        right 0.1rem
        top 0.2rem
        span
          display inline-block
          width 0.5rem
          margin-right 0.2rem
          img
            width 100%

      .mod-del
        text-align right
        span 
          display inline-block
          width 2rem
          height 0.7rem
          line-height 0.7rem
          border 1px solid black
          border-radius 0.5rem
          text-align center
          margin-right 0.3rem
          margin-top 0.2rem
          &.mod
            color #09a2a3
            border 1px solid #09a2a3
    .tips
      text-align center
      margin-top 0.5rem
      .btn
        width 80%
        height  0.8rem
        background-color #09a3a0
        color #ffffff
        border-radius 0.5rem
        margin-top 0.3rem
        font-size 0.3rem
  .btn-add
    position fixed
    width 1rem
    height 1rem
    // border-radius 50%
    right 0.3rem
    bottom 1rem
    // background-color #ec3d3d
    // box-shadow 0 0 0.2rem 0 rgba(0,0,0,0.4)
    // display flex
    // justify-content center
    // align-items center
    img
      width 100%
      

</style>
<style lang="scss">

.btn-box {
  position:fixed;
  display: flex;
  bottom:0;
  width: 100%;
  // height:1.9rem;
  justify-content: space-around;
  align-items:center;
  padding:0.1rem 0;
  box-sizing:border-box;


  .send_dynamic{
  
    @include circularBeadBtn(0.85rem,80%);
  
    // position: ;
    // left: 50%;
    // bottom: 0rem;
    // transform: translate( -50%,0 );
  
    .icon{
      margin-right: 6px;
    }
  }
    .left {
      width:60%;
    }
    .right {
      width:30%;
    }


}
  
</style>