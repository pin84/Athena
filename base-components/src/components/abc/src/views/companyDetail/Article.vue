<template>
  <div id="articel-list">
    <div class="title-box">

      <span class="triangle"></span>
      <span class="title">{{content.title}}</span>
    </div>

    <div
      class="main-body g-imgshowall"
      :class="{'show-all':isShowAll}"
      ref="mainBody"
      v-html="content.text"
    >{{content.text}}</div>
    <p class="btn-showall">
      <span @click="showAll(content.id)">{{isShowAll ?'收起': '展开全文'}}</span>
      <span class="iconfont down" :class="{'up':isShowAll}">&#xe90f;</span>
    </p>
  </div>
</template>
<script>
export default {
  // v-show="content.short_text.length > maxTextNum"
  props: {
    content: {
      type: Object,
      required: true,
      default: function() {
        return {
          title: "",
          con: "",
          short_text: ""
        };
      }
    }
  },
  data() {
    return {
      // company_id: "",
      maxTextNum: 150, //超过则显示 '显示全部' 按钮
      isShowAll: false
    };
  },
  created() {
    // this.company_id = this.$route.query.company_id;
  },

  methods: {
    async showAll(id) {
      this.isShowAll ? (this.isShowAll = false) : (this.isShowAll = true);
      // this.$emit('getAllContent',id)

      // let d = {
      //   id,
      //   company_id: this.company_id
      // };
      // console.log(`=======`, d);
      // let res = await this.$axios.get(this.$api.getArticle, {
      //   params: d
      // });

      // console.log(`===sdfsdf====`, res);
    }
  }
};
</script>
<style lang="stylus" scoped>
c=#00afe8


#articel-list
  width 100%
  font-size 0.32rem
  padding 0.2rem
  box-sizing border-box
  background-color #fff
  .title-box
    max-width 75%
    height 0.7rem
    display flex
    // justify-content center
    // align-items center
    .triangle
      display inline-block
      flex 0 0 0.18rem
      background  url('../../assets/icon/companyDetail/triangle.png') no-repeat left center
    .title
      display inline-block
      max-width 100%
      height 0.7rem
      line-height 0.7rem
      // font-size 0.48rem
      font-weight 600
      white-space nowrap 
      text-overflow ellipsis 
      padding 0  0.3rem  0  0.15rem
      color #fff
      overflow hidden
      background-color #09a2a3
      border-radius 0.08rem


  .main-body
    margin 0.1rem 0 
    height 1.8rem
    overflow hidden 
    font-size 0.28rem
    word-break break-all
    &.show-all
      height 100%
  .btn-showall
    color c
    text-align right
    padding-right 0.6rem
    font-size 0.28rem
  .down
    font-size 0.28rem
    margin-left 0.1rem
    display inline-block
    color c  
    transition 0.3s
    &.up
      transform rotate(180deg)
</style>

<style lang="stylus">
.g-imgshowall
  p
    width 100%
    img
      max-width 100%;
  a
    text-decoration underline
    color blue  
</style>