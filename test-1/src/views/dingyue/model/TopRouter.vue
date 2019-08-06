<template>
  <div id="linkWrapper">
    <div id="mlinks">
      <router-link
        to="/mySubscript"
        class="routes"
      >我的订阅</router-link>
      <span class="line"></span>
      <router-link
        to="/recommand"
        class="routes"
      >采招推荐</router-link>
      <span class="line"></span>
      <router-link
        to="/lookAround"
        class="routes"
      >随便逛逛</router-link>
    </div>
  </div>
</template>


<script>
export default {
  
};
</script>
<style lang="stylus" scoped>
#linkWrapper
  width 100%
  height 100%
  background-color #ffffff
  font-size 0.3rem
  #mlinks
    width 100%
    display flex
    justify-content space-around
    align-items center
    text-align center
    height 1rem
    line-height 1rem
    .routes
      font-weight 600
    .line
      display inline-block
      width 0.01rem
      height 0.4rem
      background url(../../../assets/icon/dingyue/line@1_40.png) center no-repeat
    .router-link-active 
      position relative  
      color #09a2a3
      &::after
        position absolute
        bottom 0
        left 50%
        transform translateX(-50%)
        content ''
        width 30px
        height 2px 
        background-color #09a2a3
</style>
