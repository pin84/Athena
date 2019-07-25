<template>
  <div id="wrapperJilu" ref="wrapper">
    <ComHeader
      class="comHeader"
      @close='close'
    />
    <dir id="chongzhijilu">
      <h3 class="title">充值记录</h3>
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in dataList"
          :key="index"
        >
          <span class="money">￥10000</span>
          <div class="status">
            <span class="sta">{{status}}</span>
            <span>充值时间：<time>{{time}}</time></span>
          </div>
        </li>
      </ul>

    </dir>
    <ComFooter
      class="footer"
      left='返回发票申请'
      center='全屏'
      right='发票申请'
    />
  </div>
</template>
<script>
import ComHeader from "../common/Header";
import ComFooter from "../common/Footer";
export default {
  data() {
    return {
      status: "未开票",
      time: "2019-02-12",
      dataList: [1, 2, 3, 4, 5]
    };
  },
  components: {
    ComHeader,
    ComFooter
  },
  methods:{
    close(){
      let wrapper = this.$refs.wrapper
      wrapper.style.transform = `translateY(100%)`
    }
  }
};
</script>
<style lang="stylus" scoped>
#wrapperJilu
  width 100%
  background-color rgba(0,0,0,0.8)
  padding  10px
  box-sizing border-box
  transition 1s
  display flex
  flex-direction column 
  align-items center
  box-sizing border-box
  #chongzhijilu
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-color #fff
    padding 0 25px 14px 25px
    box-sizing border-box
    .title
      font-size: 18px;
    .list
      width 100%
      margin-top 15px 
      border-radius 5px
      .item
        display flex
        height: 50px;
        padding 9px 10px
        box-sizing border-box
        font-size 12px
        background-color: #f3f3f3;
        border-radius: 4px
        align-items center
        justify-content space-between
        margin-bottom 10px
        color: #666666;
        .money
          font-size 13px
          color: #eb0000;
        .status
          display flex
          flex-direction column
          .sta
            text-align right
            color: #333333;


   

</style>

