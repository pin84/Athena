<template>
  <div id="special">
    <div class="main-body">
      <com-header :showHeadShare="true" :shareFunc="headShareFunc" :company="company" />
      <div v-if="articleList.length !== 0">
        <div v-for="(item,index) in articleList" :key="index" class="list" ref="list" :id="index">
          <div class="move" v-show="isAdmin">
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

    <Tips
      :isShow="isShowTips"
      :content="'确定要删除吗?'"
      :leftText="'取消'"
      :rightText="'确定'"
      @submit="submit"
      @cancel="cancel"
    />

    <div @click="$router.push('/userCenter')" class="send_dynamic" v-show="!isAdmin">
      <span class="iconfont icon">&#xe65a;</span>
      <span class>我也要发布图文动态</span>
    </div>
  </div>
</template>
<script>
// import BaseInfo from "@/components/shangLian/dimenPop/BaseInfo"; //
import ComHeader from "@/components/common/ComHead_2";
import ArticleList from "./Article";
import ShowImgList from "./ShowImgList";
import Tips from "@/views/dingyue/model/Tips";
// import BaseInfo from'@/components/shangLian/dimenPop/BaseInfo.vue'

export default {
  // name: "special",
  // mixins: [BaseInfo],
  data() {
    return {
      id: "", //文章的id
      isShowTips: false,
      isAdmin: false,
      company: {}, //传给头部的企业信息
      articleList: [],
      from: "" //点进来的地方，用户中心或搜索页面
    };
  },
  components: {
    // BaseInfo,
    ComHeader,
    ShowImgList,
    ArticleList,
    Tips
  },

  async created() {

    // let shareInfo = this.isShare();
    // let hrefCompanyInfo = null;
    // let myCompany = false;
    // if (shareInfo) {
    //   var {
    //     enterpriseid: shareEID,
    //     enterprise: shareE,
    //     industryid: shareIId,
    //     hasShare
    //   } = shareInfo;

    //   let authComInfo = this.$store.state.company.authComInfo;
    //   if (authComInfo.enterprise == shareE) {
    //     hrefCompanyInfo = null;
    //     myCompany = true;
    //   } else {
    //     hrefCompanyInfo = await this.getInfo(shareEID, shareE, shareIId);
    //   }
    // }

    // let { enterpriseid, enterprise, industryid } = this.getCompanyInfo(
    //   hrefCompanyInfo,
    //   myCompany
    // );

    // this.shareLink(enterpriseid, enterprise, industryid, this.from);
    this.initData();
  },
  mounted() {
    setTimeout(() => {
      this.headShareFunc();
    }, 200);
  },

  methods: {
    //这个方法只给从用户中心进来的用户来，是有谁企业的
    async getComDetailInfo() {
      let authCom = this.$store.state.company.authComInfo;
      let d = {
        enterpriseid: authCom.enterprise,
        industryid: authCom.industryid
      };

      let { data } = await this.$axios.get(this.$api.comInfo, {
        params: d
      });

      localStorage.setItem("com-detailInfo", JSON.stringify(data.basic[0]));
    },
    async initData() {
      let d = {
        company_id: this.company.enterpriseid,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };
      // console.log(`=======`,d);
      let { data } = await this.$axios.get(this.$api.getArticle, {
        params: d
      });

      data.introduct_list.forEach(item => {
        if (item.pic === null) {
          item.pic = [];
        }
      });

      this.articleList = data.introduct_list;
      console.log(`====initData===`, this.articleList);
    },

    async submit() {
      let d = {
        id: this.id,
        company_id: this.company.enterpriseid,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };
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

    isShare() {
      let { type } = this.$route.query;
      try {
        if (type == "share") {
          return {
            hasShare: true,
            ...this.$route.query
          };
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    },

    getCompanyInfo(shareCompany = null, myCompany = false) {
      this.from = this.$route.query.from;
      let fromSearch = false;
      if (shareCompany) {
        fromSearch = true;
      }

      

      let tem = JSON.parse(localStorage.getItem("com-detailInfo"));

      // 搜索企业进入
      if (Number(this.from) === 2 || fromSearch) {
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
      }


      // 用户中心进入
      // if (Number(this.from) === 1 || myCompany === true) {
      //   this.company = this.$store.state.company.authComInfo;
      //   this.isAdmin = true;
      //   console.log(`=======`, this.company);
      //   var time;
      //   try {
      //     time = tem.established_time.split("T")[0];
      //   } catch (e) {
      //     time = "未知";
      //     console.log("");
      //   }
      //   var d = {
      //     OperaState: tem.status,
      //     LegalReprese: tem.legal_representative,
      //     CreationTime: time,
      //     Capital: tem.registered_capital
      //   };
      //   Object.assign(this.company, d);
      // }

      return this.company;
    },

    shareLink(enterpriseid, enterprise, industryid, from) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: "share",
          enterpriseid,
          enterprise,
          industryid,
          from: this.from
        }
      });
    },
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
        company_id: this.company.enterpriseid,
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
      this.$router.push({
        path: "./addarticle",
        query: { from: this.from }
      });
    },
    editArticle(id) {
      // console.log(`=====id==`);
      this.$router.push({
        path: "./editarticle",
        query: {
          id,
          user_id: this.$store.state.loginInfo.userInfo.user_id,
          company_id: this.company.enterpriseid,
          from: this.from
        }
      });
    },
    toUsercenter() {
      this.$router.push("./usercenter");
    },
    headShareFunc() {
      let userName = this.$store.state.loginInfo.userInfo.username,
        companyName = this.company.enterprise;
      let str = ``;
      str = `${userName}分享${companyName}图文动态`;
      this.$store.commit("setShareInfo", {
        title: str
      });
      this.$store.commit("setFriendNetInfo", {
        title: str
      });
    },

    getInfo(companyId, companyName, industryId) {
      // console.clear();
      // console.log(this.comIndexInfo);

      return this.$axios
        .get(`${this.$api.comInfo}`, {
          params: {
            enterpriseid: companyName,
            industryid: industryId
          }
        })
        .then(result => {
          let message = result.message;
          if (message) {
            console.log(message);
            this.$toast({
              message
            });
            return;
          }
          let res = result.data.basic[0];

          console.log(`==aaaaaaaaaaaaaaaaaaaaaaaaa====`, res);

          // res.established_time = new Date(res.established_time)
          //   .toLocaleDateString()
          //   .replace(/\//g, "-");
          res.established_time = this.$commonFn.formatTime(
            new Date(res.established_time),
            1
          );

          if (result.data.code === 0) {
            let infoList = [
              {
                企业名称: res.company_name || "未知",
                统一社会信用代码: res.unified_social_credit_code || "未知",
                注册资本: res.registered_capital || "未知",
                经营状态: res.status || "未知",
                法定代表人: res.legal_representative || "未知",
                登记机关: res.registration_authority || "未知",
                成立日期: res.established_time || "未知",
                类型: res.type_of_enterprise || "未知",
                所属行业: res.industry_involved || "未知",
                人员规模: res.staff_size || "未知",
                电话: res.phone || "未知",
                邮箱: res.mailbox || "未知",
                官网: res.official_website || "未知",
                企业地址: res.business_address || "未知",
                经营范围: res.business_scope || "未知",
                company_id: res.company_id,
                industriesid: res.industriesid
              }
            ];

            this.detailInfo = Object.assign(infoList[0], {
              isAuth: result.data.states //该公司是否认证
            });

            this.$store.commit("detailInfo", this.detailInfo);
            localStorage.setItem(
              "com-detailInfo",
              JSON.stringify(this.detailInfo)
            );

            this.$set(this, "infoList", infoList);
            return result;
          }
        })
        .catch(rej => {
          console.log("get info rej ", rej);
        });
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
    bottom 2rem
    // background-color #ec3d3d
    // box-shadow 0 0 0.2rem 0 rgba(0,0,0,0.4)
    // display flex
    // justify-content center
    // align-items center
    img
      width 100%
      

</style>
<style lang="scss">
.send_dynamic{

  @include circularBeadBtn(1rem,80%);

  position: fixed;
  left: 50%;
  bottom: 1.2rem;
  transform: translate( -50%,0 );

  .icon{
    margin-right: 6px;
  }
}
  
</style>