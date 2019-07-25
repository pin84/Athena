<template>
  <div class="manageBtn">
    <span class="out">
      <span class="inner"></span>
      企业管理
    </span>
    <span class="out">
      <span class="inner"></span>
      分组管理
    </span>
  </div>
</template>
<script>
export default {};
</script>

<style lang="stylus" scoped>
.manageBtn
  position absolute
  bottom 15px
  right 0
  z-index 100
  color #fff
  box-sizing border-box
  // transition 0.5s
  // transform translateX(65px)
  .out 
    display block
    background-color #09a2a3
    padding 3px  5px
    margin-bottom 10px
    border-radius 20px 0 0 20px
    height 35px
    line-height 35px
    .inner
      display inline-block
      width 35px
      height 35px
      background-color #fff
      vertical-align top
      border-radius 50%
      &::before
        display inline-block
        content ''
        width 35px
        height 35px
        background url('../../../assets/icon/gear@26.png')  center  no-repeat  
        vertical-align top
        margin-right 5px
</style>

