<template>
  <div class="confirm" v-if="isShow">
    <div class="con_box">
      <div class="context">
        <div class="con">
          <h6 class="type">{{text.type}}</h6>
          <p>{{text.msg}}</p>
        </div>
        <div class="btn">
          <span @click="close()" v-if="text.btn.no">{{text.btn.no}}</span>
          <span @click="ok()" v-if="text.btn.ok">{{text.btn.ok}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      text: {
        type: "提示",
        msg: "确定除此条信息？",
        btn: {
          ok: "确定",
          no: "取消"
        }
      }
    };
  },
  methods: {
    close() {
      console.log("关闭");
      
    },
    ok() {
      console.log("确定");
    }
  }
};
</script>
<style lang='stylus' scoped>
btn_h = 0.7rem
.confirm
  width 100%
  background-color rgba(0, 0, 0, 0.6)
  width 100%
  height 100%
  position fixed
  top 0
  box-sizing border-box
  display flex
  justify-content center
  align-items center
  .con_box
    width 85%
    height 25%
    background-color white
    position relative
    border-radius 5px
    box-sizing border-box
    .con
      padding 0.2rem
      .type
        font-size 0.32rem
        margin-bottom 0.2rem
        // padding 0.2rem 0
    .btn
      position absolute
      width 100%
      display flex
      justify-content space-around
      bottom 0.2rem
      span
        display inline-block
        width 2rem
        height btn_h
        line-height btn_h
        text-align center
        background-color #198CF1
        color #fff
        border-radius 0.4rem
</style>
