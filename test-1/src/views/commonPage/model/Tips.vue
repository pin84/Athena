<template>
  <div id="tips">
    <div class="content">
      <div class="tip_content">
        <slot name="content"></slot>
      </div>
      <div
        class="action"
        @click="toPage"
      >
        <!-- {{tipsText.actionText}} -->

        <slot name="left"></slot>
        <slot name='right'></slot>
      </div>

      <i
        class="close"
        @click="$emit('closeTips')"
      ></i>

    </div>
    <!-- <AutConfig /> -->
  </div>
</template>
<script>
import AutConfig from "../../../components/shangLian/autPop/AutConfig";
export default {
  props: {
    tipsText: {
      type: Object,
      // required: true,
      default: function() {
        return {
          tips: "",
          actionText: "",
          url: ""
        };
      }
    }
  },
  components: {
    AutConfig
  },
  methods: {
    toPage() {
      switch (this.tipsText.url) {
        case "autConfig":
          this.$router.push("/" + this.tipsText.url);
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#tips
  position absolute 
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  background-color rgba(0,0,0,0.8)
  display flex
  justify-content center
  align-items center
  overflow hidden
  font-size 0.32rem
  .content
    position relative
    width 90%
    height 5rem
    background-color #fff
    border-radius 0.15rem
    .tip_content
      width 100%
      height 100%
      padding 0.6rem 0.32rem
      box-sizing border-box
      // line-height 0.5rem
      word-wrap : break-word 
      display flex
      justify-content center
      align-items center
    .action
      position absolute 
      width 100%
      bottom 0
      background-color #f3f3f3
      color #09a2a3
      height 1rem
      line-height 1rem
      text-align center
      border-radius 0 0 0.15rem 0.15rem
      display flex
      justify-content space-around
      align-items center
      font-size 0.32rem
      :first-child,:last-child
        width 100%
      :last-child
        border-left 1px solid #cccccc
        color #222
    .close
      display inline-block
      position absolute 
      top -0.9rem
      right 0
      width 0.6rem
      height 0.6rem
      background url(../../../assets/icon/close@2x.png) center no-repeat
      background-size contain


</style>
