<template>
  <span
    class="toFeedback"
    ref="feedback"
  >
    <span
      class="inner"
      @click="toFeedback"
    >意见反馈
    </span>
  </span>
</template>
<script>
export default {
  data() {
    return {
      startY: null,
      eleFeedback: null
    };
  },

  mounted() {
    this.eleFeedback = this.$refs.feedback;

    document.addEventListener("touchstart", e => {
      this.startY = e.touches[0].pageY;
    });

    document.addEventListener("touchmove", e => {
      let moveY = e.touches[0].pageY;

      if (moveY - this.startY > 0) {
        this.eleFeedback.style.transform = "translateX(80%)";
      } else {
        this.eleFeedback.style.transform = "translateX(0)";
      }
    });
  },
  methods: {
    toFeedback() {
      this.$router.push("feedback");
      // let user = this.$store.state.loginInfo.userInfo.username;
      // if (user === "伊谢尔伦的风" || user === 'XY lim') {
      //   let st = this.eleFeedback.style.transform;
      //   if (st === "translateX(0px)") {
      //     this.$router.push("feedback");
      //   }
      // } else {
      //   this.$toast("此功能暂未开放，敬请期待");
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
  .toFeedback
    position fixed
    display inline-block
    width 0.9rem
    height 0.9rem
    bottom 1.5rem
    right 0.15rem
    z-index 3
    background-color #09a2a3
    display flex
    justify-content center
    align-items center
    border-radius 50%
    box-shadow 0 0 0.2rem #ccc
    transition 0.3s
    transform translateX(80%)
    .inner
      display inline-block
      background-color #ffffff
      width 0.7rem
      height 0.7rem
      border-radius 50%
      text-align center
      font-size 0.24rem
      line-height 0.3rem
      padding-top 0.05rem
      box-sizing border-box
      color black
</style>
