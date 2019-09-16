<template>
  <div id="tips">
    <div class="content">
      <div class="tip_content">
        {{tipsText.tips}}
      </div>
      <div
        class="action"
        @click="toPop"
      >
        {{tipsText.actionText}}
      </div>
      <i
        class="close"
        @click="$emit('closeTips')"
      ></i>
    </div>
    <AutConfig />
  </div>
</template>
<script>
import AutConfig from '../../../components/shangLian/autPop/AutConfig'
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
  components:{
    AutConfig
  },
  methods: {
    toPop() {
      switch (this.tipsText.url) {
        case "autConfig":
          this.$store.commit("showPop", "AutConfig");
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
  .content
    position relative
    width 90%
    background-color #fff
    border-radius 0.15rem
    .tip_content
      padding 0.6rem 0.32rem
      line-height 0.7rem
    .action
      background-color #f3f3f3
      color #09a2a3
      height 1rem
      line-height 1rem
      text-align center
      border-radius 0 0 0.15rem 0.15rem

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
