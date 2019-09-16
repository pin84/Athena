<template>
  <div id="user-center" ref="wrapper">
    <header>
      <div class="user">
        <section class="user-info">
          <span class="avatar">
            <img :src="userInfo.headimgUrl" alt />
          </span>
          <dl class="user-name">
            <dt>{{userInfo.username}}</dt>
            <dd v-if="num">
              {{companyName}}
              <span
                class="cancel"
                @click="companyAuth"
                v-show="num !== 2"
              >{{thisPageData.comState[num]}}</span>
            </dd>
            <!-- <dd v-if="num">{{companyName}}
              <span
                class="cancel"
                @click="companyAuth"
                v-show="num !== 1"
              >{{thisPageData.comState[num]}}</span>
            </dd>-->

            <dd v-else>未绑定认证企业</dd>
          </dl>
        </section>
        <aside class="user-aside">
          <div class="ring">
            <em></em>
          </div>
          <span @click="companyAuth">认证企业</span>
        </aside>
      </div>

      <ul class="list">
        <li class="item" v-for="(value, key,index) in userMsg" :key="index">
          <span>{{value}}</span>
          <span class="text">{{key}}</span>
        </li>
      </ul>
    </header>
    <div class="main-body">
      <div class="w">
        <div class="self-list">
          <li
            class="item"
            v-for="(item,index) in thisPageData.self"
            :key="index"
            @click="toComanyDetail(item,index)"
          >
            <span class="bg">
              <img :src="require(`../../assets/icon/userCenter/self-${index+1}.png`)" />
              <i class="mark" v-if="index === 0 || index === 1">{{tagNum[index] || 0}}</i>
            </span>
            <span class="text">{{item}}</span>
          </li>
        </div>
      </div>

      <div class="balance">
        <span class="money">
          <span class="ch">余额:</span>
          <span class="co">￥</span>
          <span class="co num">{{balance}}</span>
        </span>
        <span class="toPay" @click="toPay">去充值</span>
      </div>

      <div class="my-self-ck">
        <div class="title">
          <span class="left">我的企业图文动态</span>
          <!-- <span class="more">编辑</span> -->
        </div>
        <div class="cen" @click="sendMsg">&nbsp; 发布我的企业图文动态</div>
        <p>用文字 / 图片介绍企业</p>
        <!-- <div class="list">
          <p>用视频 / 图片分享企业内容</p>
          <div class="list-item">
            <span v-for="(value,key,index) in comment" :key="index">{{key}} ({{value}})</span>
          </div>
        </div>-->
      </div>

      <div class="msg">
        <div class="title">
          <span class="left">短信触客</span>
        </div>
        <div class="creat" @click="preciseMsg">
          <span>精准短信触客</span>
        </div>
        <p>用文字或视频短信精准触客</p>
      </div>

      <div class="customer-pool">
        <div class="title">
          <span class="left">潜在客户池订阅</span>
          <!-- <span class="more">查看</span> -->
        </div>
        <div class="creat" @click="toCustomerPool">
          <span>潜在客户池推荐设置</span>
        </div>
        <p>去设置潜在客户池</p>
      </div>

      <div class="servic">
        <div class="title">
          <span class="left">平台服务</span>
        </div>
        <ul class="list">
          <li
            class="item"
            v-for="(item,index) in thisPageData.service"
            :key="index"
            @click="comServic(item)"
          >
            <span class="img-box">
              <img :src="require(`../../assets/icon/userCenter/servic-${index+2}.png`)" alt />
            </span>
            <span class="service-text">{{item}}</span>
          </li>
        </ul>
      </div>

      <!-- <div class="user-servic">
        <div class="title">
          <span class="left">个人服务</span>
        </div>

        <ul class="list">
          <li
            class="item"
            v-for='(item,index) in thisPageData.us'
            :key='index'
          >
            <span class="img-box">
              <img
                :src="require(`../../assets/icon/userCenter/us-${index+1}.png`)"
                alt=""
              >
            </span>
            <span class=service-text>{{item}}</span>
          </li>
        </ul>
      </div>-->
    </div>

    <Tips v-if="isMask" @closeTips="closeTips">
      <template v-slot:content>
        <span>确认退出企业认证 ?</span>
      </template>
      <template v-slot:left>
        <span @click="btnSubmit">确定</span>
      </template>
      <template v-slot:right>
        <div @click="closeTips">取消</div>
      </template>
    </Tips>
    <FeedbackBtn />
    <CompanyContact />
    <!-- <CommonPop v-if="test" /> -->
    <Waiting v-if="isShowWait" :comName="companyName" @closeWaiting="closeWaiting" />

    <SelectTem />
    <MsgTemplate />
  </div>
</template>
<script>
import FeedbackBtn from "../../components/common/feedback/FeedbackBtn";
import Tips from "../commonPage/model/Tips";
// import SelfPic from "./pop/SelfPic";
import { MessageBox } from "mint-ui";
import CompanyContact from "../../components/pop/companySetting/CompanyContact";
import CommonPop from "./pop/CommonPop";
import Waiting from "./Waiting";
import SelectTem from "../../components/pop/pushTemplate/SelectTem";
import MsgTemplate from "../../components/pop/pushTemplate/MsgTemplate";
import commonFN from "../../utils";
import TestTips from "../../components/common/feedback/Tips_2 copy";
export default {
  data() {
    return {
      scrollTopDitance: null, //当前页面滚动的距离
      isShowWait: false, //企业认证等审核，等待的提示
      num: 0, //用于显示认证的状态
      isShowSelPic: false, //是否显示自画像
      showPicType: "", //显示企业还是个人自画像 person or company
      isMask: false, //是否显示蒙层
      thisPageData: {
        // top: ["推荐", "访问", '关注', "已消费"],
        self: ["个人自画像", "企业自画像", "联系信息", "企业资料"],
        service: [
          "消费记录",
          "需求配套",
          "短信模板",
          "协同",
          "发票管理",
          "推送记录",
          "推送汇总",
          "每日海报"
        ],
        us: ["订阅设置", "自定义维度", "推荐企业"],
        comState: ["未认证", "待支付", "已认证", "待审核", "待提交", "取消绑定"]
      },
      userMsg: {
        推荐: "0",
        访问: "0",
        // 关注: "8",
        "已消费(元)": "0"
      },
      comment: {
        关注: "0",
        评论: "0",
        点赞: "0",
        消息: "0"
      },
      balance: "" || "0", //用户的余额
      companyName: "", //保存从后台拿回来的公司名字
      userInfo: {}, //保存从store取来的用户信息
      pay_status: undefined, //用户的支付状态
      status: undefined, //用户的审核状态
      tagNum: [],
      company_id: "" //已认证的企业id
    };
  },
  components: {
    Tips,
    // SelfPic,
    FeedbackBtn,
    CompanyContact,
    CommonPop,
    Waiting,
    SelectTem,
    MsgTemplate,
    TestTips
  },
  created() {
    this.userInfo = this.$store.state.loginInfo.userInfo;
    // this.isCertifiedCom();
    this.initData();
  },

  methods: {
    async initData() {
      let res = await this.$commonFn.isJoinCooperation(
        this.$api.getUserAuth,
        this.userInfo.token,
        this.userInfo.user_id
      );

      if (res) {
        this.num = 2; //认证状态
        this.companyName = res.user.company_name;
        this.company_id = res.user.company_id;
        this.userMsg["推荐"] = res.companyInfo.number;
        this.userMsg["访问"] = res.companyInfo.count;
        this.balance = res.companyInfo.money;
        this.getTags();
      } else {
        await this.isCertifiedCom();
      }
    },

    async getTags() {
      let token = this.$store.state.loginInfo.userInfo.token;

      //个人标签
      let resPersonTags = await this.$axios.get(`${this.$api.perTags}`, {
        params: {
          token
        }
      });
      if (resPersonTags.data.lndividual_labels) {
        this.tagNum.push(
          resPersonTags.data.lndividual_labels.split("|").length
        );
      } else {
        this.tagNum.push(0);
      }

      //企业标签
      if (this.num === 2) {
        let resComTags = await this.$axios.get(`${this.$api.comTags}`, {
          params: {
            token,
            company_id: this.company_id
          }
        });

        if (resComTags.data.kind) {
          this.tagNum.push(resComTags.data.kind.split("|").length);
        } else {
          this.tagNum.push(0);
        }
      }
    },
    notOpen() {
      this.$toast("此功能暂未开放哦，敬请期待");
    },
    companyAuth() {
      // if (this.userInfo.username !== "伊谢尔伦的风") {
      //   return this.$toast("此功能暂未开放哦，敬请期待");
      // }

      switch (this.num) {
        case 0:
          this.$router.push("autConfig");
          break;
        case 1:
          this.$router.push({
            path: "autConfig"
            // query: { identity_status: this.status, pay_status: this.pay_status }
          });
          break;
        case 2:
          this.$router.push({
            path: "authcomInfo",
            query: { comName: this.companyName }
          });
          break;
        case 3:
          this.showMask(true);
          this.isShowWait = true;
          break;
        case 4:
          this.$router.push("autConfig");

          break;
        case 5:
          this.$toast("取消绑定");
          break;
      }
    },

    async isCertifiedCom() {
      //页面初始化时拿到用户中心的数据（推荐、访问、已消费）
      let res = await this.$axios.get(`${this.$api.userCenterInfo}`, {
        params: {
          token: this.userInfo.token
        }
      });

      console.log(`===res====`, res);

      this.status = res.data.status;
      this.pay_status = res.data.pay_status;
      this.handleStatus(res);
      this.getTags();
    },

    handleStatus(res) {
      if (this.status === 0 && this.pay_status === 0) {
        //未认证
        return (this.num = 0);
      }

      //公司名字赋值
      this.companyName = res.data.company_name;

      if (this.pay_status === 0 && this.status === 1) {
        //待付款
        return (this.num = 1);
      }

      if (this.pay_status === 1 && this.status === 1) {
        console.log(`=====待审核=`);
        return (this.num = 3);
      }

      if (this.status === 2) {
        console.log(`=====已认证=`);
        this.num = 2;
        this.company_id = res.data.company_id;
        this.userMsg["推荐"] = res.data.recommended_count;
        this.userMsg["已消费(元)"] = res.data.consumption_count;
        this.userMsg["访问"] = res.data.access_count;
        this.balance = res.data.balance;
        return;
      }
      if (this.status === 3) {
        console.log(`=====待提交=`);
        return (this.num = 4);
      }
    },

    async comServic(item) {
      if (!this.isCertifie()) return;

      switch (item) {
        case "短信模板":
          // this.scrollTopDitance = document.documentElement.scrollTop;
          // this.showMask(true);
          this.$store.commit("showPop", {
            popName: "selectTem",
            params: {
              // pId: q.data.pId,
              // insId: q.data.insId,
              // pName: q.data.name
            }
          });

          break;
        case "协同":
          // if (
          //   this.userInfo.username === "伊谢尔伦的风" ||
          //   this.userInfo.user_id === 600
          // ) {
          //   this.$router.push("cooperation");
          //   return;
          // }
          this.$router.push("/cooperation");
          // this.$toast("此功能暂未开放哦，敬请期待");
          break;
        case this.thisPageData.service[0]:
          if (this.userInfo.user_id === 653 || this.userInfo.user_id === 600) {
            this.$router.push("./records-consumption");
            return;
          }

          this.$toast("此功能暂未开放哦，敬请期待");
          break;
        case this.thisPageData.service[1]:
          if (this.userInfo.user_id === 608 || this.userInfo.user_id === 600) {
            return;
          }
          this.$toast("此功能暂未开放哦，敬请期待");
          break;
        case "每日海报":
          this.$toast("此功能暂未开放哦，敬请期待");
          //  this.$router.push({
          //   name: './poster',
          //   params: chooseCompany
          // });
          break;
        default:
          this.$toast("此功能暂未开放哦，敬请期待");
          break;
      }

      console.log(item);
    },

    async preciseMsg() {
      // if (!this.isCertifie()) return;
      // this.$toast('功能正在完善中，敬请期待。')
      // return
      this.$router.push("/search/global");
    },

    async sendMsg() {
      if (!this.isCertifie()) return;
      this.$router.push({ path: "./special", query: { ctype: 1 } });
      localStorage.setItem("specialAdmin", true);
    },
    async toPay() {
      if (!this.isCertifie()) return;
      this.$router.push("chongzhi");
    },

    isCertifie() {
      if (this.num === 0) {
        this.$toast("您还未认证企业，请先认证企业");
        return;
      }
      if (this.num === 1) {
        this.$toast("您有未完成的企业认证，请到认证页面完成认证");
        return;
      }

      if (this.num === 2) {
        return true;
      }

      if (this.num === 3) {
        this.$toast("您有待审核的企业认证，请耐心等待");
        return;
      }
      if (this.num === 4) {
        this.$toast("您有提交的企业认证未通过审核，请重新提交资料");
        return;
      }
    },

    btnSubmit() {
      this.showMask();
    },
    cancelBinding() {
      this.showMask(true);
    },

    async toComanyDetail(item, index) {
      switch (item) {
        case "个人自画像":
          this.$router.push({
            path: "selfPic",
            query: { type: "person" }
          });

          break;

        case "企业自画像":
          if (!this.isCertifie()) return;
          this.$router.push({
            path: "selfPic",
            query: { type: "company", company_id: this.company_id }
          });
          break;
        case "联系信息":
          this.$toast("此功能暂未开放哦，敬请期待");

          return;
          break;
        case "企业资料":
          this.$toast("此功能暂未开放哦，敬请期待");
          break;
      }
    },
    toCustomerPool() {
      this.$router.push("/customerpool");
    },

    closeTips() {
      this.showMask();
    },

    showMask(flag) {
      let wrapper = this.$refs.wrapper;
      flag
        ? wrapper.classList.add("add-mask")
        : wrapper.classList.remove("add-mask");
    },
    clostSelfPic() {
      this.isShowSelPic = false;
      this.showPicType = "";
      this.showMask(false);
    },
    closeWaiting() {
      this.showMask(false);
      this.isShowWait = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
#user-center
  width 100%
  height 100%
  font-size 0.28rem
  box-sizing border-box
  padding-bottom 1.3rem
  overflow scroll
  -webkit-overflow-scrolling touch
  &.add-mask 
    position:absolute;
    top:0; 
    height: 100%;
    overflow: hidden;
  header
    width 100%
    height 3.8rem
    background-color #09a3a3
    color #fff
    .user
      display flex
      justify-content space-between
      padding 0.3rem 0 0.2rem 0.3rem
      box-sizing border-box
      .user-info
        display flex 
        flex 0 0 70%
        .avatar
          display inline-block
          width 1rem
          height 1rem
          border-radius 50%
          overflow hidden
          img
            width 100%
            height 100%
        .user-name
          margin-left 0.2rem
          dt
            font-size 0.36rem
          dd
            font-size 0.2rem
            .cancel
              color black
              font-size 0.15rem
              background-color #ffffff
              padding 0.02rem  0.1rem
              border-radius 0.2rem
      .user-aside
        position relative
        display flex
        flex-direction column
        align-items center
        width 1.6rem
        .ring
          width 100%
          height 0.4rem
          text-align center
          em
            display inline-block
            content ''
            width 0.3rem
            height 0.3rem
            background url(../../assets/icon/userCenter/msg.png) center no-repeat 
            background-size contain
        span 
          display inline-block
          padding 0.02rem 0.1rem
          width 1.4rem
          height 0.5rem
          line-height 0.5rem
          background-image: linear-gradient(-86deg, #e1a336 0%,  #ff9033 100%)
          border-radius 0.25rem 0rem 0rem 0.25rem
          text-align center
          &::after
            display inline-block
            content :''
            width 0.2rem
            height 0.2rem
            background url(../../assets/icon/userCenter/right.png)  center no-repeat 
            background-size contain
    .list
      padding 0  0.3rem
      box-sizing border-box   
      display flex
      justify-content space-around
      margin-top 0.3rem
      .item
        display flex
        flex-direction column   
        align-items center
        .text
          letter-spacing 2px
  .main-body
    position relative
    width 100%
    background-color #f1f1f1
    padding 0 0.3rem
    box-sizing border-box
    .w
      width 100%
      position relative
      height 1.3rem
      .self-list
        position absolute
        width 100%
        top -0.5rem
        background-color #fff
        border-radius 0.1rem
        display flex
        justify-content space-around
        
        .item
          display flex
          flex-direction column
          align-items center
          justify-content center
          height 1.6rem
          .bg
            position relative
            display block
            width 0.5rem
            height 0.5rem
            margin-bottom 0.2rem
            img
              width 100%
              height 100%
            .mark
              position absolute 
              top -0.1rem
              right -0.2rem
              width 0.24rem
              height 0.28rem
              font-size 0.2rem
              text-align center
              line-height 0.28rem
              color #ffffff
              background-color #E34F28
              border-radius 50%
    .balance
      height 1rem
      border-radius 0.1rem
      background-image: linear-gradient(-90deg, #2f363f 0%, #39424c 100%)  
      display flex
      justify-content space-between  
      align-items center
      padding 0 0.3rem 
      font-weight 800
      .ch
        color   #fff 
      .co
        color #dba78c 
        margin-left 0.1rem  
      .num
        font-size 0.36rem
      .toPay
        background-color #dba78c
        padding 0.1rem 0.4rem
        border-radius 0.3rem
        color #222a32
  .my-self-ck 
    border-radius 0.1rem
    background-color #fff
    margin-top 0.2rem
    padding-bottom 0.2rem
    p
      margin-top 0.1rem
      text-align center
    .more
      color #666
      &::after
        display inline-block
        content ''
        width 0.2rem
        height 0.2rem
        background url(../../assets/icon/arrow@16_29.png) center no-repeat
        background-size contain
        margin-left 0.1rem
    .cen
      margin 0 auto
      width 80%
      height 1.1rem
      line-height 1.1rem
      border 1px solid   #ec3d3d    
      border-radius 0.6rem
      text-align center
      font-size 0.32rem
      color #ec3d3d
      // font-weight 800
      &::before
        display inline-block
        content ''
        width 0.34rem
        height 0.34rem
        background url(../../assets/icon/userCenter/err.png) center no-repeat
        background-size contain
        vertical-align center
        transform translateY(15%)
    .list
      text-align center
      p
        color #666
        height 1rem
        line-height 1rem
        margin 0 auto
      .list-item
        width 100%
        display flex
        justify-content space-around
        color #333333
        span 
          width 25%
          height 0.3rem
          line-height 0.3rem
          border-right 1px solid #ccc
          font-weight 800
          &:last-child
            border-right none
  .msg, .customer-pool
    height 3.1rem
    text-align center
    background-color #ffffff
    border-radius 0.1rem
    margin-top 0.2rem
    .bl
      background-color #09a3a3
      padding 0 0.1rem
      margin-right 0.03rem
      border-radius 0.05rem
      color #fff
      font-size 0.26rem
    .creat
      display flex
      justify-content space-around
      span 
        display inline-block
        width 80%
        height 1.1rem
        line-height 1.1rem
        border 1px solid  #09a3a3 
        border-radius 0.55rem
        text-align center
        color #09a3a3
        // font-weight 800
        &:last-child::before , &:first-child::before
          display inline-block
          content '' 
          width  0.3rem
          height 0.3rem
          margin-right 0.15rem
          transform translateY(12%)
        &:last-child::before
          background url(../../assets/icon/userCenter/add.png) center no-repeat
          background-size contain
        &:first-child::before
          background url(../../assets/icon/userCenter/msg-1.png) center no-repeat
          background-size contain
  .customer-pool
    .creat
      width 100%
      span
        color #faa500
        border 1px solid  #faa500
        &:first-child::before
          background url(../../assets/icon/userCenter/seting.png) center no-repeat
          background-size contain


    p
      color   #666
      font-size 0.26rem
      margin-top 0.2rem    
  .servic
    height 4.2rem
    background-color #fff
    margin-top 0.2rem
    border-radius 0.1rem
   .list
      display flex
      flex-wrap wrap
      // justify-content space-around
      .item
        width 25%
        margin-top 0.3rem
        display flex
        flex-direction column
        // justify-content space-around
        align-items center
        .img-box
          display inline-block
          width 0.5rem
          height 0.5rem
          img
            width 100%
            height 100%
        .service-text
          color #333
          margin-top 0.15rem
          font-weight 800
          font-size 0.26rem
  .user-servic
    background-color #fff
    margin-top 0.2rem
    border-radius 0.1rem
    height 2.6rem
  .abc
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    border 1px solid red    
.title
  display flex
  justify-content space-between
  height 1rem
  line-height 1rem
  padding 0 0.2rem
  box-sizing border-box
  .left
    font-size 0.32rem
    font-weight 800



// .list
//   display flex
//   flex-wrap wrap
//   justify-content space-around
//   .item
//     width 25%
//     margin-top 0.3rem
//     display flex
//     flex-direction column
//     // justify-content space-around
//     align-items center
//     .img-box
//       display inline-block
//       width 0.5rem
//       height 0.5rem
//       img
//         width 100%
//         height 100%
//     .service-text
//       color #333
//       margin-top 0.15rem
//       font-weight 800
//       font-size 0.26rem
  
</style>

