<template>
  <div id="cz-wrapper">
    <!-- <ComHeader
      class="comHeader"
      @close='close'
    />-->

    <div id="chongzhing" v-show="isShow" ref="wrapper">
      <h3 class="title">充值</h3>
      <!-- <div class="total">
        <span>剩余充值金额:
          <span class="total_num">￥{{resMoney}}</span>
        </span>
        <span class="jilu">充值记录</span>
      </div>-->
      <div class="inputmoney">
        <span>输入充值金额</span>
        <div class="inputbox">
          <input
            v-model="selectMoney"
            type="number"
            placeholder="请输入大于等于1元的金额"
            @focus="inputFocus"
            @blur="inputBlur"
          />
          <span>元</span>
        </div>
      </div>
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in moneyList"
          :key="index"
          @click="selectMoneyBtn(item,index)"
          :class="{'active':item.active}"
        >
          <span>￥</span>
          {{item.money}}
          <span class="marker"></span>
        </li>
        <!-- <span class="note">注：最低200元起充</span> -->
      </ul>
      <div class="explain">
        <p>说明</p>
        <p>1、短信每条0.05元，视频短信每条0.30元。</p>
        <p>
          2、普通短信70个字/条、长短信按64字/条计费；视频短
          信大小不超过1.5M。
        </p>
      </div>
    </div>
    <div class="footer">
      <ComFooter @rightEvent="recharge" @leftEvent="cancelRecharge" left="返回" right="充值" />
    </div>
  </div>
</template>
<script>
import ComHeader from "@/components/common/Header";
import ComFooter from "@/components/common/Footer";

let vm = null;
export default {
  beforeCreate() {
    vm = this;
    let tabbar = document.getElementById("tabbar");
    tabbar.style.transform = "scale(0)";
  },

  beforeRouteLeave(to, from, next) {
    let tabbar = document.getElementById("tabbar");
    tabbar.style.transform = "scale(1)";
    next();
  },

  data() {
    return {
      userInfo: this.$store.state.loginInfo.userInfo,
      isShow: true,
      resMoney: 10000,
      selectMoney: null,
      activeIndex: null,
      money: 0,
      moneyList: [
        { money: "100.00" },
        { money: "200.00" },
        { money: "500.00" },
        { money: "1000.00" },
        { money: "2000.00" },
        { money: "3000.00" }
      ]
    };
  },
  components: {
    ComHeader,
    ComFooter
  },

  methods: {
    cancelRecharge() {
      this.$router.go(-1);
    },
    close() {
      // this.isShow = false
      let wrapper = this.$refs.wrapper;
      wrapper.style.transform = `translateY(100%)`;
    },
    // 选择金钱按钮
    selectMoneyBtn(item, index) {
      if (item.active) {
        this.$delete(item, "active");
        this.selectMoney = "";
      } else {
        this.moneyList.forEach(obj => {
          this.$delete(obj, "active");
        });
        this.$set(item, "active", true);
        this.selectMoney = item.money;
      }
    },

    // 充值方法
    async recharge() {
      // 检查金钱是否合法
      function moneyCheck(money) {
        let NumMoney = +money;
        if (typeof NumMoney == "number" && NumMoney !== NumMoney) {
          // NaN
          this.$toast({
            message: "您输入了非法字符，请输入数字！"
          });
          return false;
        }

        // if(NumMoney<1){
        //   this.$toast({
        //     message:'请输入大于等于1元的金额'
        //   })
        //   return false;
        // }
        return true;
      }

      if (typeof this.selectMoney !== "string") return;

      if (!moneyCheck.call(this, this.selectMoney)) return;

      let d = {
        total_fee: String(this.selectMoney * 100),
        token: this.userInfo.token
      };

      

      
      let { data: rechargeRes } = await this.$axios
        .post(this.$api.recharge, d)
        .catch(rej => {
          console.log(rej);
        });

      console.log(rechargeRes);

      let {
        appId,
        timeStamp,
        nonceStr,
        package: _package,
        signType,
        paySign
      } = rechargeRes.pay_info;

      let pay_order = rechargeRes.pay_order;
      let payData = {
        appId,
        timeStamp,
        nonceStr,
        package: _package,
        signType,
        paySign
      };

      WeixinJSBridge.invoke("getBrandWCPayRequest", payData, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // vm.$axios
          //   .put(vm.$api.recharge, {
          //     ...res,
          //     pay_order,
          //     token: vm.userInfo.token
          //   })
          //   .then(putRes => {
          //     console.log(putRes);
          //   })
          //   .catch(putRej => {});
          // window.location.href = "../?#/autConfig";
          this.selectMoney = "";
          window.history.back(-1);
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          this.$messageBox.confirm("您已取消支付");
          // window.location.href = "../?#/autConfig";
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          this.$messageBox.confirm("支付失败，请稍后再试");
        }
        //  else {
        //   alert(JSON.stringify(res));
        // }
      });
    },
    inputFocus(e) {
      e.target.placeholder = "";
    },
    inputBlur(e) {
      e.target.placeholder = "请输入大于等于1元的金额";
    }
  }
};
</script>

<style lang="stylus" scoped>
  #cz-wrapper
    position relative
    height 100%
    background-color #fff
    #chongzhing
      overflow-y auto
      position relative
      width 100%
      height 100%
      min-height 100vh
      display flex
      flex-direction column 
      align-items center
      padding 0   0.3rem  1.2rem 0.3rem
      box-sizing border-box
      font-size 0.28rem
      background-color #fff
      .title
        font-size 0.8rem
        margin 0.5rem 0
      .total  
        width 100%
        display flex
        justify-content space-between
        color #666666
        height 0.8rem
        .total_num
          color red
          line-height 0.8rem
        .jilu
          line-height 0.8rem
          color #08a3a2  
          letter-spacing 2px
          padding 0 0.1rem
          border 1px solid #08a3a2  
          border-radius 0.05rem
      .inputmoney
        width 100%
        height 1rem
        display flex
        justify-content space-between
        padding 0 0.3rem
        margin-bottom 1rem
        box-sizing border-box
        background #f3f3f3
        border-radius 0.05rem
        font-size 0.32rem
        span 
          display inline-block
          height 1rem 
          min-height 1rem
          line-height 1rem
        input
          border none
          background #f3f3f3
          text-align right 
          &::placeholder 
            color #999
        span 
          margin-left 0.1rem
      .list
        position relative
        width 100%
        display flex
        flex-wrap wrap
        justify-content space-between
        padding-bottom 0.8rem
        .item
          position relative
          width 30%
          text-align center
          color #be0201
          padding 0.16rem 0
          margin 0.16rem  0
          border 1px solid #666666
          border-radius 0.1rem
          font-weight 600
        .active
          border-color #078e8d
          background  #e0e8e8
          .marker
            position absolute
            bottom 0
            right 0
            width: 0;
            height: 0;
            border-bottom: 0.5rem solid #078e8d;
            border-left: 0.4rem solid transparent;
            &::before 
              position absolute
              content '\2714'
              left -0.22rem
              top 0.1rem
              color #fff
              font-size 0.28rem
        .note
          position absolute 
          left 0
          bottom 0
          color #f64e4e

      .explain
        font-size 0.28rem 
        color #666  
        letter-spacing 1.5px  
  .footer
    position fixed 
    bottom 0
    width 100%

    

</style>
