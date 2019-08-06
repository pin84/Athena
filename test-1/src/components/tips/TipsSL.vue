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
      class="btn"
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
      >下一步</span>
    </div>
    <span
      class="text"
      v-if="isShowText"
      @click="toCer"
    >去认证</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowText: false,
      isShow: true,
      i: 1,
      btn: undefined
    };
  },

  // beforeCreate() {
  //   let tabbar = document.getElementById("tabbar");
  //   tabbar.style.transform = "scale(0)";
  // },

  // beforeRouteLeave(to, from, next) {
  //   let tabbar = document.getElementById("tabbar");
  //   tabbar.style.transform = "scale(1)";
  //   next();
  // },

  mounted() {
    this.btn = this.$refs.btn;
    // this.btn.style.transform = `translate(60vw,45vh)`;
  },

  methods: {
    toCer() {
      this.$router.push("autConfig");
    },
    closeTips() {
      // this.isShow = false;
      // window.location.href = "../?#/";
      this.$router.push("/");
    },
    nextStep() {
      if (this.i > 10) {
        this.isShow = false;
        this.$router.push("/");
        return;
      }

      this.i++;
      console.log(`=======`,this.i);
      switch (this.i) {
        case 2:
          this.btn.style.transform = `translate(50vw,-55vh)`;
          break;
        case 3:
          this.btn.style.transform = `translate(55vw,-40vh)`;
          break;
        case 4:
          this.btn.style.transform = `translate(60vw,-70vh)`;
          break;
        case 5:
          this.btn.style.transform = `translate(55vw,-35vh)`;
          break;
        case 6:
          this.btn.style.transform = `translate(55vw,-45vh)`;
          break;
        case 7:
          let next = this.$refs.next;
          next.style.display = "none";
          this.isShowText = true;
          this.btn.style.transform = `translate(75vw,-30vh)`;
          break;
        case 8:
          this.btn.style.transform = `translate(55vw,-50vh)`;
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
// @import '../../assets/fonts/font.css';
#tips
  position relative
  width 100%
  height 100%
  background-color black
  z-index 100
  .img-box
    width 100vw
    height 100vh
    overflow hidden
    position relative
    img 
      position absolute 
      top 0
      width 100%
  .btn
    position absolute 
    transform translate(60vw,-45vh)
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
  .text
    position absolute
    left 70vw
    top 24vh
    font-size 0.48rem
    color #ff971a  
    // font-family 'hksn'  
</style>
