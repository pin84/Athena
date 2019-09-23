<template>
  <div
    id="tips"
    v-if="$store.state.tips.isShow"
  >
    <div class='main-body'>
      <section class="tip-content">
        <div>
          {{$store.state.tips.content}}
        </div>
      </section>
      <section class="btn">
        <span
          class="close"
          @click="closeTips"
          v-if="leftText"
        >{{leftText}}</span>
        <span
          class="submit"
          @click="tipsPopSubmit"
          v-if="rightText"
        >{{rightText}}</span>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftText: "",
    rightText: ""
  },
  data() {
    return {};
  },
  created() {
    console.log(`====tips===`,this.$store.state.tips);
  },

  mounted(){
    console.log(`====tips===`,this.$store.state.tips);
    
  },
  methods: {
    tipsPopSubmit() {
      this.$emit("btnEvent",true);
      this.$store.commit("isShowTips", false);

    },
    closeTips() {
      this.$emit("btnEvent",false);
      this.$store.commit("isShowTips", false);
    }
  }
};
</script>



<style lang="stylus" scoped>
#tips
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0,0,0,0.3)
  font-size 0.28rem
  display flex
  justify-content center
  align-items center
  user-select none
  .main-body
    width 80vw
    height 4rem
    background-color #fff
    border-radius 0.15rem
    display flex
    flex-direction column
    justify-content space-between
    overflow hidden
    .tip-content
      height 3rem
      padding 0.32rem
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      font-size 0.32rem
    .btn
      width 100%
      text-align center
      background-color #f1f1f1
      color #09a3a3
      font-size 0.32rem
      letter-spacing 0.2rem
      display flex
      .close,.submit
        display inline-block
        height 1rem
        line-height 1rem
        width 100%
      .close
        color #666  
      .submit
        border-left 1px solid #ccc


</style>

