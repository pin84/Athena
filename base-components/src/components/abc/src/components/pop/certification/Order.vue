<template>
  <div
    id="order"
    ref="wrapper"
    v-if="isShowOrder"
  >
    <ComHeader v-if="isShowHeader"  @close='close'/>
    <div class="mainInfo">
      <h3>认证订单</h3>
      <p>订单信息：</p>
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in order'
          :key='index'
        >
          <div class="item-part">
            <span>创建时间: </span>
            <span>订单号: </span>
            <span>金额: </span>
            <span>到期时间: </span>
            <span>进度: </span>
          </div>
          <div class="item-part left">
            <span>{{item.createTime}}</span>
            <span>{{item.orderNum}}</span>
            <span>{{item.money}}</span>
            <span>{{item.expire}}</span>
            <span>{{item.status}}</span>
          </div>
        </li>
      </ul>
    </div>

    <ComFooter
      left='返回'
      :center='isShowHeader ? "全屏": "取消全屏"'
      @centerEvent='fullScreen'
      @leftEvent='toPrePage'
    />
  </div>
</template>
<script>
import ComHeader from "../../common/Header";
import ComFooter from "../../common/Footer";
export default {
  data() {
    return {
      isShowOrder:true,
      isShowHeader: true,
      order: [
        {
          createTime: "2019-02-13",
          orderNum: 13414632333,
          money: "2145元",
          expire: "2020-12-12",
          status: "审核完成"
        },
        {
          createTime: "2019-02-13",
          orderNum: 13414632333,
          money: "2145元",
          expire: "2020-12-12",
          status: "审核完成"
        },
        {
          createTime: "2019-02-13",
          orderNum: 13414632333,
          money: "2145元",
          expire: "2020-12-12",
          status: "审核完成"
        },
        {
          createTime: "2019-02-13",
          orderNum: 13414632333,
          money: "2145元",
          expire: "2020-12-12",
          status: "审核完成"
        }
      ]
    };
  },
  components: {
    ComHeader,
    ComFooter
  },

  methods: {

    toPrePage(){
      this.$router.push('/')
    },
    fullScreen() {
      let wrapper = this.$refs.wrapper;
      if (this.isShowHeader) {
        this.isShowHeader = false;
        wrapper.style.padding = "0";
      } else {
        this.isShowHeader = true;
        wrapper.style.padding = "0 10px 10px 10px";
      }
    },
    close(){
      this.isShowOrder = false
    }
  }
};
</script>
<style lang="stylus" scoped>
#order
  position relative
  width 100vw
  height 100vh
  display flex
  flex-direction column
  align-items center
  background-color rgba(0,0,0,0.8)
  padding 0 10px 10px 10px
  box-sizing border-box
  z-index 100

  .mainInfo
    width 100%
    height 100%
    background-color #fff
    box-sizing border-box
    overflow-y auto
    h3
      text-align center
      font-size 18px
      padding 10px 0
    p
      font-size 16px  
      padding 0 10px
    .list
      margin-top 10px
      .item 
        display flex
        background-color #f3f3f3
        border-radius 4px
        margin-bottom 10px
        padding 8px
        justify-content space-between
        .item-part
          display flex
          flex-direction column  
          &.left
            width 60%
            text-align left
          span 
            height 24px
            line-height 24px  

      

</style>
