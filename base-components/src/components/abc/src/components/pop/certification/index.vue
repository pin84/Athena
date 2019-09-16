<template>
  <div
    id="qiyerenzheng"
    ref="wrapper"
  >
    <ComHeader v-if="isShowHeader" />
    <div class="certified">
      <h3>企业认证</h3>
      <h4>企业认证及标识</h4>
      <span
        class="btn review"
        ref="btnRview"
        @touchstart='touchstart_review'
        @touchend='touchend_review'
      > {{isExpired? '去认证' : '开始年审'}}</span>
      <span
        class="btn order"
        ref="btnOrder"
        @touchstart='touchstart_order'
        @touchend='touchend_order'
        @click="orderDetail"
      >{{isExpired? '取消' : '查看订单'}}</span>
      <p class="expiryDate">年审时间：企业认证有效期为一年，此账号的企业认证会
        在 <span>{{expires.year}}</span>年{{expires.month}}月{{expires.day}}日到期，需要在到期前完成年审。</p>
    </div>
    <div class="order">

    </div>
    <ComFooter
      :center='isShowHeader ? "全屏": "取消全屏"'
      @centerEvent='fullScreen'
    />
  </div>
</template>
<script>
import ComHeader from "../../common/Header";
import ComFooter from "../../common/Footer";
export default {
  data() {
    return {
      //过期时间
      expires: {
        year: "2019",
        month: "08",
        day: "17"
      },
      isExpired: false, //如果认证已过期
      isShowHeader: true
    };
  },
  components: {
    ComHeader,
    ComFooter
  },
 watch: {
  '$route' (to, from) {
    console.log('==========');
    
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
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
        `企业认证将于${this.expires.year}年${this.expires.month}月${
          this.expires.day
        }日到期，请尽快进行年审`
      );
    }

    //如果已过期
    if (res < 0) {
      this.isExpired = true;
    }
  },
  methods: {
    orderDetail() {
      this.$router.push("/order");
    },
    fullScreen() {
      //从子组件派发的事件
      let wrapper = this.$refs.wrapper;
      if (this.isShowHeader) {
        this.isShowHeader = false;
        wrapper.style.padding = "0";
      } else {
        this.isShowHeader = true;
        wrapper.style.padding = "0 10px 10px 10px";
      }
    },

    //以下四个方法为按钮点击后的样式变化
    touchstart_order() {
      const btnOrder = this.$refs.btnOrder;
      btnOrder.style.background = "#336666";
    },
    touchend_order() {
      const btnOrder = this.$refs.btnOrder;
      btnOrder.style.background = "#09a2a3";
    },
    touchstart_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#FF6600";
    },
    touchend_review() {
      const btnRview = this.$refs.btnRview;
      btnRview.style.background = "#ff8800";
    }
  }
};
</script>
<style lang="stylus" scoped>

#qiyerenzheng
  position relative
  width 100vw
  height 100vh
  display flex
  flex-direction column
  align-items center
  background-color rgba(0,0,0,0.8)
  padding 0 10px 10px 
  box-sizing border-box
  .certified
    width 100%
    height 100%
    background-color #fff
    padding 0 10px 
    box-sizing border-box
    h3
      font-size 18px
      height 18px
      line-height 18px
      text-align center
      margin-top 10px
    h4
      font-size   16px
      margin-top 10px
      // letter-spacing 4px
    .btn
      display inline-block
      padding 10px 25px  
      background #ff8800
      border-radius 4px
      color #fff
      font-size 12px
      margin 10px 20px 25px 0px
      letter-spacing 4px
      &.order
        background #09a2a3
    .expiryDate
      line-height 30px


</style>
