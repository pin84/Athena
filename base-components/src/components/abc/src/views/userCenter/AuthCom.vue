<template>
  <div
    id="qiyerenzheng"
    ref="wrapper"
  >
    <div class="certified">
      <h3 class="title" >认证企业</h3>
      <h4 class="com-name">{{comName}}</h4>
      <span
        class="btn review"
        ref="btnRview"
        @touchstart='touchstart_review'
        @touchend='touchend_review'
      > {{isExpired? '去认证' : '开始年审'}}</span>
      <div class="expiryDate">年审时间：企业认证有效期为一年，此账号的企业认证会
        在 {{expires.year }}年{{expires.month }}月{{expires.day }}日到期，需要在到期前完成年审。</div>
    </div>
    <div>
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in order'
          :key='index'
          @click="showAll(index)"
          ref="li"
        >

          <div class="item-part">
            <span class="lh">{{item.createTime}}</span>
            <span>订单号</span>
            <span>金额</span>
            <span>到期时间</span>
          </div>
          <div class="item-part left">
            <span class="lh">{{item.status}}</span>
            <span>{{item.orderNum}}</span>
            <span>{{item.money}} 元</span>
            <span>{{item.expire}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import ComHeader from "../../common/Header";
// import ComFooter from "../../common/Footer";
export default {
  data() {
    return {
      comName: "", //公司名字,传给认证页面
      comID: "", //公司id,传给认证页面
      industryID: "", //行业id,传给认证页面
      //过期时间
      expires: {
        year: "",
        month: "",
        day: ""
      },
      isExpired: false, //如果认证已过期
      isShowHeader: true,
      order: [
        // {
        //   createTime: "2019-02-13",
        //   orderNum: 13414632333,
        //   money: "2145元",
        //   expire: "2020-12-12",
        //   status: "审核完成"
        // },
      ],
      allLi: null, //认证结果列表。
      token: ""
    };
  },

  created() {
    this.comName = this.$route.query.comName;
    this.token = this.$store.state.loginInfo.userInfo.token;

    this.initData();
    // this.test();
  },

  mounted() {
    // 注意： 取到现在的时间现在是取本机电脑的时间 new Date()，以后需要拿到服务器的时间
    let dueTime = new Date(
      `${this.expires.year}-${this.expires.month}-${this.expires.day}`
    );
    let res = dueTime.getTime() - new Date();
    let num = 86400000; //一天的毫秒数
    if (Math.ceil(res / num) < 30) {
      console.log(
        `企业认证将于${this.expires.year}年${this.expires.month}月${this.expires.day}日到期，请尽快进行年审`
      );
    }

    //如果已过期
    if (res < 0) {
      this.isExpired = true;
    }
  },
  methods: {
    // async test() {
    //   let data = {
    //     token: this.token,
    //     identity_status: 2,
    //     pay_status: 1
    //   };

    //   let res = await this.$axios.get(this.$api.reCertification, {
    //     params: data
    //   });
    //   console.log(`===你没res====`, res);
    // },
    async initData() {
      let pData = {
        token: this.token
      };
      console.log(`====data===`, data);
      let { data } = await this.$axios.get(this.$api.certificationYears, {
        params: pData
      });

      let endDate = data.endtime.split("T")[0];
      this.expires.year = endDate.split("-")[0];
      this.expires.month = endDate.split("-")[1];
      this.expires.day = endDate.split("-")[2];
      let stste = ["待审核", "审核完成", "审核不通过"];

      //存全局，传给认证页面
      this.comID = data.company_id;
      this.industryID = data.industryid;

      let order = {
        createTime: data.reviewer_time,
        orderNum: data.order_id,
        money: data.pay_money,
        expire: endDate,
        status: stste[data.identity_status - 1]
      };
      this.order.push(order);

      console.log(`===resfsfd====`, data);
    },
    showAll(index) {
      this.allLi = this.$refs.li;

      let height = this.allLi[index].style.height;
      height === "2.4rem"
        ? (this.allLi[index].style.height = "0.8rem")
        : (this.allLi[index].style.height = "2.4rem");
    },

    touchstart_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#FF6600";
    },
    touchend_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#ff8800";

      this.$toast('功能即将开放，敬请期待')
      return

      this.$router.push({
        path: "autConfig",
        query: {
          comName: this.comName,
          comID: this.comID,
          industryID: this.industryID
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>

#qiyerenzheng
  position relative
  width 100vw
  height 100vh
  background-color #fff
  padding 0 0.1rem
  box-sizing border-box
  font-size 0.28rem
  .certified
    width 100%
    background-color #fff
    box-sizing border-box
    .title
      font-size 0.48rem
      text-align center
    .com-name
      color #333
      font-size  0.32rem
      margin-top 0.2rem
      &::after
        content ''
        display inline-block
        width 0.3rem
        height 0.3rem
        background url(../../assets/icon/userCenter/gemstone.png) center no-repeat
        background-size contain
        margin-left 0.2rem
    .btn
      display inline-block
      padding 0.15rem 0.4rem
      box-sizing border-box
      background #ff8800
      border-radius 0.08rem
      color #fff
      font-size 0.28rem
      letter-spacing 0.1rem
      margin-top 0.3rem
      &.order
        background #09a2a3
    .expiryDate
      width 100%
      font-size 0.28rem
      margin 3vh 0 
  .list
    height 65vh
    overflow-y scroll
    -webkit-overflow-scrolling: touch
    .item 
      display flex
      overflow hidden
      height 0.8rem
      background-color #f3f3f3
      border-radius 0.1rem
      padding 0.03rem 0.2rem
      box-sizing border-box
      justify-content space-between
      transition 0.3s
      margin-bottom 0.15rem
      .item-part
        display flex
        flex-direction column  
        .lh
          line-height 0.8rem
          font-weight 400
        &.left
          width 60%
          text-align left


</style>
