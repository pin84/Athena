<template>
  <div id="tips" v-if="isShow">
    <div class="main-body">
      <section class="tip-content">
        <div>{{content}}</div>
      </section>
      <section class="btn">
        <span class="close" @click="closeTips" v-if="leftText">{{leftText}}</span>
        <span class="submit" @click="tipsPopSubmit" v-if="rightText">{{rightText}}</span>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: false,
    content: "",
    leftText: "",
    rightText: ""
  },
  data() {
    return {};
  },
  computed: {
    // isShowM: function() {
    //   return this.isShow;
    // }
  },
  methods: {
    tipsPopSubmit() {
      // this.$listeners.func2((fn)=>{
      //   fn()
      // });
      this.$emit("submit");
    },
    closeTips() {
      this.$listeners.func1("props changed second");
      // this.$emit("cancel", false);
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

