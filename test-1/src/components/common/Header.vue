<template>
  <div id="com-header">
    <div  class="img-box" >
      <div class="bg">
        <div class="bg_1">
          <img src="../../assets/icon/lian@2x.png" alt="">
        </div>
      </div>
    </div>
    <div class="close" @click="close">
       <img  src="../../assets/icon/close@2x.png" alt="">
    </div>
    <div class="headerbgColor"></div>
  </div>
</template>

<script>
export default {
  methods:{
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
#com-header
  width 100%
  height 110px
  position relative
  // background-color rgba(0,0,0,0.8)
  // background-color #000
  .img-box
    width 100%
    position relative
    display flex
    align-items center
    justify-content center
    padding-top 30px
    z-index 100
    .bg
      width 80px
      height 80px
      background-color #fff 
      display flex
      align-items center
      justify-content center
      border-radius 50%
      .bg_1
        width 70px
        height 70px 
        background-color #09a2a3
        border-radius 50%
        display flex
        align-items center
        justify-content center
        img
          width 41px
          height 37px
  .close
    width 30px
    height 30px
    position absolute
    top 20px 
    right 15px
    z-index 101
    img 
      width 100%
      height 100%   
  .headerbgColor
    width 100%
    height 40px
    background-color #fff 
    position absolute 
    left 0
    bottom 0
    border-radius 5px 5px 0 0
</style>


