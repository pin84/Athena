<template>

  <div>
    <!-- <ComHeader
      class="comHeader"
      @close='close'
    /> -->

    <div
      id="chongzhing"
      v-show="isShow"
      ref='wrapper'
    >
      <h3 class="title">充值</h3>
      <!-- <div class="total">
        <span>剩余充值金额:
          <span class="total_num">￥{{resMoney}}</span>
        </span>
        <span class="jilu">充值记录</span>
      </div> -->
      <div class="inputmoney">
        <span>输入充值金额</span>
        <div class="inputbox">
          <input
            v-model='selectMoney'
            type="number"
            placeholder="请输入大于等于1元的金额"
            @focus='inputFocus'
            @blur='inputBlur'
          >
          <span>元</span>
        </div>
      </div>
      <ul class="list">
        <!-- @click="select" -->
        <li
          class="item"
          v-for="(item,index) in moneyList"
          :key="index"
          @click="selectMoneyBtn(item,index)"
          :class="{'active':activeIndex==index?true:false}"
        >
          <span>￥</span>
          {{item}}
          <span class="marker"></span>
        </li>
        <!-- <span class="note">注：最低200元起充</span> -->
      </ul>
      <div class="explain">
        <p>说明</p>
        <p>1、短信每条0.05元，视频短信每条0.30元。</p>
        <p>2、普通短信70个字/条、长短信按64字/条计费；视频短
          信大小不超过1.5M。</p>
      </div>
    </div>
    <ComFooter
      @rightEvent='recharge'
      class="footer"
      left='返回'
      center='全屏'
      right='充值'
    />
  </div>

</template>
<script>
import ComHeader from "@/components/common/Header";
import ComFooter from "@/components/common/Footer";

let vm = null;
export default {
  beforeCreate() {
    vm = this;
  },
  created(){
    console.log(`=======`,document);
    
  },
  data() {
    return {
      userInfo: this.$store.state.loginInfo.userInfo,
      isShow: true,
      resMoney: 10000,
      selectMoney: null,
      activeIndex: null,
      money: 0,
      moneyList: ["100.00", "200.00", "500.00", "1000.00", "2000.00", "3000.00"]
    };
  },
  components: {
    ComHeader,
    ComFooter
  },

  methods: {
    close() {
      // this.isShow = false
      let wrapper = this.$refs.wrapper;
      wrapper.style.transform = `translateY(100%)`;
    },
    // 选择金钱按钮
    selectMoneyBtn(item, index) {
      // console.log(item,index);
      this.activeIndex = index;
      this.selectMoney = item;
    },

    select(e) {
      let clickTarget = e.target;
      let money;
      if (clickTarget.tagName === "UL" || clickTarget.className === "note") {
        return;
      }
      if (clickTarget.tagName === "SPAN") {
        clickTarget.parentNode.className = "item active";
        money = clickTarget.parentNode.innerText;
      }

      if (clickTarget.tagName === "LI") {
        clickTarget.className = "item active";
        money = clickTarget.innerText;
      }

      const clickNode =
        clickTarget.tagName === "SPAN" ? clickTarget.parentNode : clickTarget;

      const nodeList = this.siblings(clickNode);
      nodeList.pop();
      nodeList.forEach(item => {
        item.className = "item";
      });
      this.selectMoney = money.split(" ")[1];
    },

    siblings(elem) {
      let nodes = [];
      let previ = elem.previousSibling;
      while (previ) {
        if (previ.nodeType === 1) {
          nodes.push(previ);
        }
        previ = previ.previousSibling;
      }
      nodes.reverse();

      let nexts = elem.nextSibling;
      while (nexts) {
        if (nexts.nodeType === 1) {
          nodes.push(nexts);
        }
        nexts = nexts.nextSibling;
      }
      return nodes;
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

      let { data: rechargeRes } = await this.$axios
        .post(this.$api.recharge, {
          total_fee: String(this.selectMoney * 100),
          token: this.userInfo.token
        })
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
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          alert("您已取消支付");
          // window.location.href = "../?#/autConfig";
        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
          alert("支付失败，请稍后再试");
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

  // #chongzhing
  //   width 100%
  //   // height 90vh
  //   background-color rgba(0,0,0,0.8)
  //   padding  10px
  //   box-sizing border-box
  //   transition 1s
  //   display flex
  //   flex-direction column 
  //   align-items center
  //   box-sizing border-box
    #chongzhing
      position relative
      width 100%
      height 100%
      display flex
      flex-direction column 
      align-items center
      justify-content center
      padding 0 0.1rem
      box-sizing border-box
      font-size 0.28rem
      background-color #fff
      padding-bottom 0.1rem
      .title
        padding 0.1rem 0
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
        display flex
        justify-content space-between
        padding 0.1rem 0.05rem
        background #f3f3f3
        border-radius 0.05rem
        margin-top 0.7rem
        .inputbox 
          input
            border none
            background #f3f3f3
            text-align right 
            &::placeholder 
              color #999
          span 
            color black
            margin-left 0.1rem
      .list
        position relative
        width 100%
        display flex
        flex-wrap wrap
        justify-content space-between
        margin-top 20px
        padding-bottom 40px
        .item
          position relative
          width 30%
          text-align center
          color #be0201
          padding 8px 0
          margin 8px 0
          border 1px solid #666666
          border-radius 5px
        .active
          border-color #078e8d
          background  #e0e8e8
          .marker
            position absolute
            bottom 0
            right 0
            width: 0;
            height: 0;
            border-bottom: 25px solid #078e8d;
            border-left: 20px solid transparent;
            &::before 
              position absolute
              content '\2714'
              left -11px
              top 5px
              color #fff
              font-size 14px
        .note
          position absolute 
          left 0
          bottom 0
          color #f64e4e

      .explain
        font-size 14px       

</style>
