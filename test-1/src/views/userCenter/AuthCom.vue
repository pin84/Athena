<template>
  <div
    id="qiyerenzheng"
    ref="wrapper"
  >
    <div class="certified">
      <h3 class="title">上下链企业认证</h3>
      <h4 class="com-name">{{comName}}</h4>
      <div class="expiryDate">
        年审时间：上下链企业认证有效期为一年，当前企业账号的企业认证到期时间是{{expires.year }}年{{expires.month }}月{{expires.day }}日，请在{{dateArr[0] }}年{{dateArr[1] }}月{{dateArr[2] }}日至{{expires.year }}年{{expires.month }}月{{expires.day }}日完成年审。
      </div>
      <span
        class="btn review"
        ref="btnRview"
        @touchstart='touchstart_review'
        @touchend='touchend_review'
      > {{isExpired? '去认证' : '开始年审'}}
      </span>
    </div>

    <div class="list-wrapper">
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in order'
          :key='index'
          @click="showAll(index)"
          ref="li"
        >

          <div class="item-part left">
            <span class="title-l">{{item.createTime}}</span>
            <span class="item-h line">订单号</span>
            <span class="item-h">金额</span>
            <span class="item-h">到期时间</span>
          </div>
          <div class="item-part right">
            <span class="title-r">{{item.status}}</span>
            <span class="item-h r line">{{item.orderNum}}</span>
            <span class="item-h r">{{item.money}} 元</span>
            <span class="item-h r">{{item.expire}}</span>
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
      dateArr: [], //保存认证到期两人个月之前的日期
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
        // {
        //   createTime: "2019-02-13",
        //   orderNum: 13414632333,
        //   money: "2145元",
        //   expire: "2020-12-12",
        //   status: "审核完成"
        // }
      ],
      allLi: null, //认证结果列表。
      token: "",
      itemHeight: "2.8rem"
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
        `企业认证将于${this.expires.year}年${this.expires.month}月${this.expires.day}日到期，请尽快进行年审``年审时间：上下链企业认证有效期为一年，当前企业账号的企业认证到期时间是****年**月**日，请在****年**月**日至****年**月**日完成年审。`
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
      console.log(`===pData====`, pData);
      let { data } = await this.$axios.get(this.$api.certificationYears, {
        params: pData
      });

      console.log(`=======`, data);

      let endDate = data.endtime.split("T")[0];
      let d = new Date(endDate).getTime();
      this.endDate = new Date(d - 86400000 * 60);
      this.dateArr = this.endDate.toLocaleDateString().split("/");

      console.log(`====data===`, endDate);

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
      height === this.itemHeight
        ? (this.allLi[index].style.height = "0.8rem")
        : (this.allLi[index].style.height = this.itemHeight);
    },

    touchstart_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#FF6600";
    },
    touchend_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#ff8800";

      if (new Date(this.endDate) > new Date()) {
        this.$toast("还未到年审时间");
      }

      return;

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
  background-color #eee
  font-size 0.28rem
  .certified
    width 100%
    background-color #fff
    padding 0 0.2rem
    box-sizing border-box
    text-align center
    .title
      font-size 0.48rem
      text-align center
      padding 0.5rem 0
    .com-name
      color #333
      font-size  0.32rem
      text-align left
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
      width 80%
      height 0.8rem
      line-height 0.8rem
      border-radius 0.6rem
      background-color #ff8800
      color #fff
      font-size 0.32rem
      letter-spacing 0.1rem
      margin 0.3rem auto
      text-align center
      box-shadow 0 0 0.5rem   #ccc
      &.order
        background #09a2a3
    .expiryDate
      width 100%
      font-size 0.28rem
      margin 0.1rem 0 
      color #666
      text-align left
  .list-wrapper
    width 100% 
    margin-top 0.2rem  
    padding 0 0.3rem
    box-sizing border-box
    .list
      max-height 60vh
      overflow-y scroll
      -webkit-overflow-scrolling: touch
      .item 
        display flex
        background-color #fff
        overflow hidden
        height 0.8rem
        border-radius 0.1rem
        padding 0.03rem 0.2rem
        box-sizing border-box
        justify-content space-between
        transition 0.3s
        margin-bottom 0.15rem
        box-shadow 0 0 0.1rem   #ccc
        .item-part
          display flex
          flex-direction column  
          .title-l,.title-r
            line-height 0.8rem
            font-weight 600
          .title-r
            color #09a2a3
            text-align right
          .line
            border-top 1px solid #f3f3f3  
          .item-h
            height 0.6rem
            line-height 0.6rem 
            color #666 
          .r
            color black 
            font-weight 400  
          &.left
            width 40%
            text-align left
          &.right
            width 60%
            text-align left


</style>
