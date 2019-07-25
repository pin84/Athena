<template>
  <div id="noSubscript">
    <!-- <router-link class="top"  to="/setSub">随便逛逛</router-link> -->
    <div class="goSetSub">
      <p>采招商机库中暂无有效的数据与您订阅的区域和关键词有匹配的采招商机数据，建议重新修改订阅区域和完善关键词。</p>
      <router-link class="btn" to='/setSub'>去设置</router-link>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate(){
    // this.$router.push('/lookAround')
  }
};
</script>
<style lang="stylus" scoped>
#noSubscript
  width 100%
  height 100%
  text-align center
  background-color #fff
  .top
    display inline-block
    font-size 0.24rem
    color #09a2a3
    border 1px solid #09a2a3
    padding 0.12rem 0.2rem
    border-radius 0.4rem
    margin 0.2rem 0
  .goSetSub
    color #999
    width 100%
    height 100%
    background-color #f3f3f3
    line-height 0.56rem
    padding 1rem 0.3rem 0 0.3rem
    box-sizing border-box
    p
      font-size 0.28rem
    .btn
      display inline-block
      width 5rem
      height 1rem
      line-height 1rem
      background-color #09a2a3
      border-radius 0.5rem
      margin-top 0.28rem
      color #fff
      font-size 0.32rem


</style>
