<template>
  <div id="img-wrapper">
    <ul id="list" ref="ul">
      <li class="li" v-for="(item,index) in imgList" :key="index" @click="showBigImg(index)">
        <img :src="item" alt />
      </li>
    </ul>
    <div class="show-img" @click="closeBigImg" v-show="bigImgUrl">
      <div class="show-img-box">
        <img :src="bigImgUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      bigImgUrl: "",
      num: 1
   
    };
  },
  methods: {
    showBigImg(i) {
      this.bigImgUrl = this.imgList[i];
    },
    closeBigImg() {
      this.bigImgUrl = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
#img-wrapper
  width 100vw
  background-color #fff
  overflow hidden
  #list
    width 100%
    display flex
    flex-wrap wrap
    box-sizing border-box
    padding-left 0.1rem //为了让图片居中。
    overflow hidden
    .li
      display inline-block
      width 31vw
      margin 0.05rem 0.05rem
      border-radius 0.2rem
      overflow hidden
      img 
        width 100%
        height 100%
  .show-img
    position absolute
    width 100vw
    height 100vh
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(255,255,255,0.8)
    display flex
    justify-content center
    align-items center
    overflow-y auto
    -webkit-overflow-scrolling touch
    // z-index 10
    .show-img-box
      width 100%
      max-height 100%
      img 
        width 100%
        height 100%   
</style>

