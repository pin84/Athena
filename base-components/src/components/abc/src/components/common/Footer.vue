<template>
  <div
    id="myFoot"
    ref="wrapper"
  >
    <span
      class="left"
      v-if="isShowLeft"
      @click="$emit('leftEvent')"
      @touchstart='touchstart'
      @touchend='touchend'
      ref="btn_left"
    >{{left}}</span>
    <span
      class="center"
      v-if="isShowCenter"
      @click="$emit('centerEvent')"
    >
      <i class="iconfont-mask phone item-icon-block">&#xe786; &nbsp;</i>{{center}}
    </span>
  
    <span
      class="right"
      v-if="isShowRight"
      @touchstart='touchstartRight'
      @touchend='touchendRight'
      @click="$emit('rightEvent')"
      ref="btn_right"
    > {{right}}</span>
  </div>
</template>
<script>
export default {
  props: {
    left: "",
    center: "",
    right: ""
  },
  data() {
    return {
      isShowLeft: false,
      isShowCenter: false,
      isShowRight: false,
      isShow_2: false,
      isShow_3: false
    };
  },
  mounted() {
    this.showDom();
  },
  methods: {
    touchstartRight() {
      let btn_right = this.$refs.btn_right;
      btn_right.style.background = "#99CCFF";
    },
    touchendRight() {
      
      let btn_right = this.$refs.btn_right
      btn_right.style.background = '#09a2a3'
    },
    touchstart() {
      let btn_left = this.$refs.btn_left;
      btn_left.style.background = "#cccccc";
    },
    touchend() {
      let btn_left = this.$refs.btn_left;
      btn_left.style.background = "#f3f3f3";
    },
    showDom() {
      let left = this.left;
      let center = this.center;
      let right = this.right;

      if (this.left && this.center) {
        this.isShow_2 = true;
      }
      if (this.right && this.center) {
        this.isShow_3 = true;
      }

      if (left) {
        this.isShowLeft = true;
      }
      if (center) {
        this.isShowCenter = true;
      }
      if (right) {
        this.isShowRight = true;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#myFoot
  position relative
  width 100%
  height 1rem
  background-color #f3f3f3
  display flex
  justify-content space-around
  align-items center
  font-size 0.32rem
  border-top 1px solid #ccc
  box-sizing border-box
  .border-2,.border-3
    width 30%
    height 1rem
    line-height 1rem
    text-align center
  .left ,.center,.right
    width 100%
    height 1rem
    text-align center
    line-height 1rem
  .left
    border-right 1px solid #ccc  
  .right 
    background-color #09a2a3
    color #fff
    border 1px solid #09a2a3


.iconfont-mask
  font-size 0.32rem   
   
</style>
