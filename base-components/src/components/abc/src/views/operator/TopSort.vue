<template>
  <div id="linkWrapper">
    <div id="mlinks">
       <router-link
        to="/operator"
        class="routes"
      >待审核</router-link>
       <router-link
        to="/ng"
        class="routes"
      >审核记录</router-link>
      <span class="line"></span>
     
     
      <!-- <span class="line"></span>
      <router-link
        to="/lookAround"
        class="routes"
      >随便逛逛</router-link> -->
    </div>
  </div>
</template>


<script>
export default {
  
};
</script>
<style lang="stylus" scoped>
#linkWrapper
  position absolute
  top 0
  left 0
  width 100%
  height 1rem
  background-color #ffffff
  font-size 0.3rem
  border-bottom 1px solid #ccc
  z-index 100
  #mlinks
    width 100%
    display flex
    justify-content space-around
    align-items center
    text-align center
    height 1rem
    line-height 1rem
    .routes
      width 100%
      font-weight 600
      border-right 1px solid #ccc
      &:last-child
        border-right none

    .line
      display inline-block
      width 0.01rem
      height 0.4rem
      // background url(../../assets/icon/dingyue/line@1_40.png) center no-repeat
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
