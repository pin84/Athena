<template>
  <div id="special">
    <div class="main-body">
      <com-header :showHeadShare="true" :shareFunc="headShareFunc" :company="company" />
      <div v-for="(item,index) in articleList" :key="index" class="list">
        <ArticleList :content="item" />
        <ShowImgList :imgList="item.pic" />
        <div class="mod-del" v-show="isAdmin">
          <span class="mod" @click="editArticle(item.id)">编辑</span>
          <span @click="delArticle(item.id)">删除</span>
        </div>
      </div>
    </div>

    <div class="btn-add" @click="addArticle" v-show="isAdmin">+</div>
  </div>
</template>
<script>
// import BaseInfo from "@/components/shangLian/dimenPop/BaseInfo"; //
import ComHeader from "@/components/common/ComHead_2";
import ArticleList from "./Article";
import ShowImgList from "./ShowImgList";
export default {
  // name: "special",
  // mixins: [BaseInfo],
  data() {
    return {
      isAdmin: false,
      company: {}, //传给头部的企业信息
      articleList: [],
      type: ""
    };
  },
  components: {
    // BaseInfo,
    ComHeader,
    ShowImgList,
    ArticleList
  },

  created() {
    console.log(`====created===`, this.$route.query.type);
    this.type = this.$route.query.type;
    // console.log(`=======`,this.$route.query, type === "1");
    if (Number(this.type) === 2) {
      this.company = this.$store.state.company.indexInfo;
      console.log(`=====22222222222222==`, this.company);
      // code: (...)
      // count: (...)
      // enterprise: (...)
      // enterpriseid: (...)
      // identity_status: (...)
      // industryid: (...)
      // kind: (...)
      // kind_count: (...)
      // number: (...)
      // province: (...)
    }
    if (Number(this.type) === 1) {
      console.log(`=====111111111111==`);
      this.company = this.$store.state.company.authComInfo;
      this.isAdmin = true;
      // console.log(`===this.company====`, this.company);
    }

    // this.company = {
    //   enterprise: d["企业名称"],
    //   OperaState: d["经营状态"],
    //   status: d.isAuth,
    //   // count: "20",
    //   LegalReprese: d["法定代表人"],
    //   CreationTime: d["成立日期"],
    //   Capital: d["注册资本"],
    //   Phone: d["电话"]
    // };

    this.initData();
  },

  methods: {
    async initData() {
      let d = {
        company_id: this.company.enterpriseid,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };
      let { data } = await this.$axios.get(this.$api.getArticle, {
        params: d
      });

      data.introduct_list.forEach(item => {
        if (item.pic === null) {
          item.pic = [];
        }
      });

      // data.status === 0 ? (this.isAdmin = true) : (this.isAdmin = false);

      this.articleList = data.introduct_list;
      console.log(`====initData===`, this.articleList);
    },
    async delArticle(id) {
      let d = {
        id,
        company_id: this.company.enterpriseid,
        user_id: this.$store.state.loginInfo.userInfo.user_id
      };
      let res = await this.$axios.get(this.$api.delArticle, {
        params: d
      });

      console.log(`=====res==`, res);
      this.initData();
    },
    addArticle() {
      this.$router.push({ path: "./addarticle2", query: { type: this.type } });
    },
    editArticle(id) {
      this.$router.push({ path: "./editarticle", query: { id } });
    },
    headShareFunc() {
      console.log("we are share pop");
      let { company, indexInfo } = this.$store.state.company;
      console.log(`=======`, company, indexInfo);

      let userName = this.$store.state.loginInfo.userInfo.username,
        companyName = company.enterprise;
      str = `${userName}分享${companyName}基本信息`;
      // let str = ``;
      console.log(userName, indexInfo);
      console.log(str);
      let { enterpriseid, industryid } = indexInfo;
      // this.$router.push({
      //     path:this.$route.path,
      //     query:{
      //     enterpriseid,
      //     enterprise:companyName,
      //     industryid,
      //     }
      // })
      let qs = this.$qs.stringify({
        enterpriseid,
        enterprise: companyName,
        industryid
      });
      let link = `http://${window.location.host}/js/#/?${qs}`;
      this.$store.commit("setShareInfo", {
        link,
        title: str
      });
      this.$store.commit("setFriendNetInfo", {
        link,
        title: str
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
    .list
      padding-bottom 0.2rem
      border-bottom 10px solid #ccc
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
  .btn-add
    position fixed
    width 1rem
    height 1rem
    line-height 0.9rem
    border-radius 50%
    font-size 1.2rem
    font-weight 100
    color #fff
    text-align center
    right 0.3rem
    bottom 2rem
    background-color #ec3d3d
    box-shadow 0 0 0.2rem 0 rgba(0,0,0,0.4)


</style>