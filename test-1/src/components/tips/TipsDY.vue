<template>
  <div
    id="tips"
    v-if="isShow"
  >
    <div class="img-box">
      <img
        :src="require(`../../assets/icon/tips/${i}.jpg`)"
        alt=""
      >
    </div>

    <div
      class="btn-box"
      ref="btn"
    >
      <span
        class="close"
        @click="closeTips"
      >关闭</span>
      <span
        ref="next"
        class="next"
        @click="nextStep"
        v-if="isShowNext"
      >下一步</span>
    </div>
    <span
      class="text"
      v-if="isShowText"
      @click="toCer"
    >去认证</span>

    <span class="setSub" v-if="i===11" @click="$router.push('setSub')"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowNext: true,
      isShowText: false,
      isShow: true,
      i: 9,
      btn: undefined
    };
  },
  mounted() {
    this.btn = this.$refs.btn;
    // this.btn.style.transform = `translate(60vw,45vh)`;
  },

  methods: {
    toCer() {
      this.$router.push("autConfig");
    },
    closeTips() {
      this.$router.push("lookAround");
      // this.isShow = false;
    },
    nextStep() {
      if (this.i > 11) {
        this.isShow = false;
        this.$router.push("lookAround");
        return;
      }

      this.i++;
      switch (this.i) {
        case 10:
          this.btn.style.transform = `translate(55vw,-55vh)`;
          break;
        case 11:
          this.isShowNext = false;
          this.btn.style.transform = `translate(75vw,-45vh)`;
          break;
      }
      console.log(`=======`,this.i);
    }
  }
};
</script>
<style lang="stylus" scoped>
// @import '../../assets/fonts/font.css';
#tips
  position relative
  width 100vw
  height 100vh
  background-color rgba(0,0,0,0.2)
  z-index 100
  .img-box
    width 100%
    height 100%
    overflow hidden
    img 
      width 100%
  .btn-box
    position absolute 
    // top 45vh
    // left 60vw
    transform  translate(60vw,-50vh)
    // font-size 0.6rem
    display flex
    height 0.6rem
    color #fff
    display flex
    align-items center
    span
      border-radius 0.3rem
      text-align center
      letter-spacing 2px
      // font-family 'hksn'
      &.close
        font-size 0.18rem
        margin-right 0.2rem
        line-height 0.44rem
        width 1rem
        height 0.44rem
        border solid 0.01rem #cccccc
        color #ccc
      &.next
        background-color #1bb4a2
        font-size 0.24rem 
        line-height 0.6rem
        width 1.4rem
        height 0.6rem
  .setSub
    position absolute 
    right 0
    bottom 1rem
    display inline-block
    width 2rem
    height 1rem
    background url(../../assets/icon/tips/setSub.png)   center no-repeat
    background-size contain   
  .text
    position absolute
    left 70vw
    top 24vh
    font-size 0.48rem
    color #ff971a  
    // font-family 'hksn'  
</style>
