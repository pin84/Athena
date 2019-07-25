<template>
  <div
    id="yaoqing"
    ref="wrapper"
  >
    <ComHeader @close='close' />
    <div class="mainbody">
      <h3 class="title">邀请同事加入</h3>
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in people"
          :key="index"
        >
          <div class="avatar">
            <img
              :src="item.avatar"
              alt=""
            >
          </div>
          <div class="name">{{item.name}}</div>
          <div
            class="del"
            v-if="isShowDel"
            @click="del(index)"
          >删除</div>
        </li>
        <li class="item"  v-if="isShowDel">
          <div class="avatar add">
            +
          </div>
          <div class="del addbtn">去邀请</div>
        </li>
      </ul>
    </div>
    <ComFooter
      class="footer"
      center='全屏'
    />
  </div>
</template>
<script>
import ComHeader from "../common/Header";
import ComFooter from "../common/Footer";
export default {
  data() {
    return {
      isShowDel: true,
      people: [
        {
          avatar:
            "http://img0.imgtn.bdimg.com/it/u=4096154172,2235873766&fm=26&gp=0.jpg",
          name: "abc",
        },
        {
          avatar:
            "http://img4.imgtn.bdimg.com/it/u=545868361,955539399&fm=26&gp=0.jpg",
          name: "aa"
        },
        {
          avatar:
            "http://img4.imgtn.bdimg.com/it/u=545868361,955539399&fm=26&gp=0.jpg",
          name: "abbbc"
        },
        {
          avatar:
            "http://img4.imgtn.bdimg.com/it/u=545868361,955539399&fm=26&gp=0.jpg",
          name: "cc"
        },
        {
          avatar:
            "http://img4.imgtn.bdimg.com/it/u=545868361,955539399&fm=26&gp=0.jpg",
          name: "ddd"
        }
   
      ]
    };
  },
  components: {
    ComHeader,
    ComFooter
  },
  methods: {
    del(index) {
      this.people.splice(index, 1);
    },
    close() {
      let wrapper = this.$refs.wrapper;
      wrapper.style.transform = `translateY(100%)`;
    }
  }
};
</script>
<style lang="stylus" scoped>
#yaoqing
  width 100%
  background-color rgba(0,0,0,0.8)
  padding  10px
  box-sizing border-box
  transition 1s
  display flex
  flex-direction column 
  align-items center
  box-sizing border-box
  .mainbody
    width 100%
    position relative
    text-align center
    background-color #fff
    .title
      padding 10px 0
    .list
      display flex
      align-items space-around
      justify-content space-around
      flex-wrap wrap
      .item
        text-align center
        width 30%
        margin-bottom 15px
        .avatar
          width 70px
          height 70px
          margin 0 auto
          border-radius 50%
          overflow hidden
          img 
            width 100%
            height 100%
        .add
          font-size 70px 
          height 70px
          line-height 70px
          font-weight 100 
          color #ccc
          border 1px dashed #000
          margin-bottom 15px
        .name     
          font-weight 600
          margin 3px 0
        .del,.addbtn
          width 70px
          height 20px
          text-align center
          line-height 20px  
          border-radius: 10px;
          color #fff
          margin 0 auto
          &.del
            background-color  #d81d1f
          &.addbtn
            background-color  #09a2a3   


</style>
