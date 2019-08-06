<template>
  <div id="fpWrapper">
    <ComHeader />
    <div id="fapiao">
      <h3 class="title">发票申请</h3>
      <div class="invoiceInfo">
        <p><span>开票金额：</span><span class="money">{{info.money}}</span> &nbsp;元<a
            href="/"
            class="moneyDetail"
          >（查看明细）</a></p>
        <h4>发票抬头：</h4>
        <div>
          <span
            class="invoicetype normal "
            :class="{active:isSelect === '普通发票'}"
            @click="selectType"
          >普通发票</span>
          <span
            class="invoicetype special"
            :class="{active:isSelect === '增值税发票'}"
            @click="selectType"
          >增值税发票</span>
        </div>
        <p>单位名称：广州恒丰汽车有限公司</p>
        <p class="lastDom">纳税人识别号：14521331354</p>
      </div>
      <ul class="list">
        <li
          v-for="( item,index) in blank"
          :key="index"
        >
          <span>{{item}}</span>
          <input
            type="text"
            :placeholder="blank_placeholder[index]"
            v-model="info.blank[index]"
          >
        </li>
      </ul>
      <h4>开票人信息：</h4>
      <ul class="list">
        <li
          v-for="( item,index) in contact"
          :key="index"
        ><span>{{item}}</span> <input
            type="text"
            :placeholder="contact_placeholder[index]"
            v-model="info.contact[index]"
          ></li>
      </ul>
      <div class="note">
        注：请认真核对开票信息，发票申请后不能修改，因用户填写错误信息导致的问题上下链不予重开。发票金额低于5000元的统一顺丰快递到付。
        费用支付超一年的不再给予开票。
      </div>
    </div>

    <ComFooter
      class="footer"
      left='开票记录'
      center='全屏'
      right='保存'
      @clickEvent='saveInfo'
    />
  </div>
</template>
<script>
import ComHeader from "../common/Header";
import ComFooter from "../common/Footer";
export default {
  data() {
    return {
      blank: ["注册地址", "注册电话", "开户银行", "银行账号"],
      blank_placeholder: [
        "请输入注册地址",
        "请输入注册电话",
        "请输入开户银行",
        "请输入银行账号"
      ],
      contact: ["姓名", "电话", "地址"],
      contact_placeholder: [
        "请输入发票人姓名",
        "请输入发票人电话",
        "请输入发票人地址"
      ],
      info: {
        money: 15421,
        type: "",
        company: "",
        taxNum: null,
        blank:[],
        contact:[]
      },
      isSelect: ""
    };
  },
  components: {
    ComHeader,
    ComFooter
  },
  methods: {
    saveInfo() { 
      let info = this.info
      //把用户信息保存到obj中，传给后台
      let obj = {
        money:info.money,
        type:info.type,
        company:info.company,
        taxNum:info.taxNum,
        blankAdd:info.blank[0],
        blankPhone:info.blank[1],
        blankName:info.blank[2],
        blankNum:info.blank[3],
        name:info.contact[0],
        phone:info.contact[1],
        add:info.contact[2]
      }
     alert(obj)
    },
    selectType(e) { //选择普通发票还是增值税发票
      let type = e.target.innerText;
      this.isSelect = type;
      this.info.type = type;
    }
  }
};
</script>

<style lang="stylus" scoped>
#fpWrapper
  width 100%
  background-color rgba(0,0,0,0.8)
  padding  10px
  box-sizing border-box
  transition 1s
  display flex
  flex-direction column 
  align-items center
  box-sizing border-box
  #fapiao
    width 100%
    background-color #fff
    position relative
    display grid
    padding 0 15px
    box-sizing border-box
    .title
      justify-self center
    .invoiceInfo
      .money
        color #eb0000
      .moneyDetail
        color #087ada
      .invoicetype
        border-radius  13px
        height 25px
        font-size 12px
        display inline-block
        text-align center
        line-height 25px
        margin 5px 0
        border 1px solid black
        &.normal
          width 70px 
        &.special
          width 110px 
          margin-left 10px
        &.active
          border: solid 1px #eb0000 
      .lastDom
        margin 5px 0
    .list
      li
        background-color #f3f3f3
        border-radius: 4px;
        // padding 5px 6px
        margin-bottom 4px
        height 45px
        line-height 45px
        padding-left 10px
        input
          outline none
          border 0
          background-color: #f3f3f3
          margin-left 30px
          width 170px
  .note
    font-family: SimHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 1px;
    color: #f64e4e;  
    margin-bottom 10px     
</style>

