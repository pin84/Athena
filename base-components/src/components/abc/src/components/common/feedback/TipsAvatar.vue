<template>
  <div id="tips">
    <div class="main-body">
      <div class="title">请选择接受管理员权限的用户</div>
      <ul class="tip-content" v-if="isShowAvatar">
        <li
          class="item"
          v-for="(item,index) in avatarList"
          :key="index"
          :class="{'selected':i===index}"
          @click="select(index)"
        >
          <p class="avatar">
            <img :src="item.avatar" alt />
          </p>
          <p class="username">{{item.username}}</p>
        </li>
      </ul>
      <section class="tip-content" v-else>确认把管理员权限输移给 {{username}}</section>
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
    leftText: "",
    rightText: "",
    avatarList: {
      type: Array
    }
  },
  data() {
    return {
      i: null,
      isShowAvatar: true,
      username: ""
    };
  },
  created() {},
  methods: {
    select(index) {
      this.i = index;
      this.username = this.avatarList[index].username;
      console.log(`=======`, this.username);
    },
    tipsPopSubmit() {
      if (this.username !== "") {
        this.$emit("btnEvent", { flag: true, user: this.avatarList[this.i] });
      }
      if (this.username !== "") {
        this.isShowAvatar = false;
      }

      // if (!this.isShowAvatar) {
      //   this.$emit("btnEvent", true);
      //   this.$store.commit("isShowTips", false);
      // }
    },
    closeTips() {
      this.$emit("btnEvent", false);
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
    justify-content space-center
    overflow hidden
    .title
      font-size 0.32rem
      text-align center
      margin-top 0.15rem
    .tip-content
      height 3rem
      padding 0 0.32rem
      box-sizing border-box
      display flex
      justify-content center
      align-items center
      font-size 0.32rem
      .item
        margin 0 0.5rem
        border 1px solid transparent
        display flex
        flex-direction column
        justify-content center
        align-items center
        &.selected
          // border 1px solid #1F85DE
          background-color #89C0F6
        .avatar
          width 1.4rem
          height 1.4rem
          border-radius 50%
          overflow hidden
          img
            width 100%
            height 100% 
        .username
          width 1.4rem
          font-weight 600
          text-align center
          margin-top 0.1rem   
          white-space nowrap 
          text-overflow ellipsis 
          overflow hidden 
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

