<template>
  <div
    id="waiting"
    ref="waiting"
  >

    <div class="content">

      <div class="img-box">
        <img
          src="../../assets/icon/userCenter/waiting.jpg"
          alt=""
        >
      </div>
      <div class="text">
        <p>
          <span>{{comName}} </span>
          <span class="waiting">正在审核中...</span>
        </p>
        <p>24小时内通过审核，请耐心等待</p>
      </div>
      <button
        class="btn"
        @click="$emit('closeWaiting')"
      >确定</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comName: {
      type: String,
      required: true
    }
  },
  mounted() {
    // let waiting = this.$refs.waiting;
    // waiting.addEventListener(
    //   "touchstart",
    //   e => {
    //     e.preventDefault();
    //   },
    //   false
    // );
    //cpGetE(id) {
  }
};
</script>
<style lang="stylus" scoped>
#waiting
  position fixed 
  width 100vw
  height 100vh
  top 0
  left 0
  bottom 0
  right 0
  background-color rgba(0,0,0,1)
  box-sizing border-box
  display flex
  align-items center
  z-index 999
  .content
    width 95vw
    margin auto 
    display flex
    flex-direction  column
    align-items center
    background-color #fff
    border-radius 0.1rem
    padding 0.2rem
    box-sizing border-box
    .img-box
      width 30vw   
      margin-top 0.3rem 
      img
        width 100%
        height 100%
    .text
      color black
      font-size 0.32rem 
      .waiting
        color #eb0000
    .btn
      width 90%
      height 0.8rem
      line-height 0.8rem
      background-color #09a2a3  
      border-radius 0.6rem
      font-size 0.32rem
      color #fff
      letter-spacing 0.3rem
      margin-top 0.2rem
</style>
