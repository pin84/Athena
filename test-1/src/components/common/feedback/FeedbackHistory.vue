<template>
  <div id="feedback-history">
    <ul
      class="list"
      v-if="histories.length"
    >
      <li
        class="item"
        v-for='(histories,index) in histories'
        :key='index'
      >
        <div class="line">
          <div class="fd-type">
            <span class="title">问题所属功能区域: </span>
            <span class="right">{{histories.functional_areas}}</span>
          </div>
          <div class="fd-type">
            <span class="title">问题类型: </span>
            <span class="right">{{histories.types}}</span>
          </div>
        </div>

        <div class="detail">
          <p class="title">详细描述: </p>
          <p class="d-content">{{histories.content}}</p>
        </div>

        <ul class="img-list">
          <li
            class="img-item"
            v-for='(itemImg,index) in histories.image_name'
            :key='index'
            @click="showImg(itemImg,index)"
            ref="li"
          >
            <img
              :src="'http://47.106.105.213:8000/center/getfeedbackinfo/image?avatar='+itemImg"
              alt=""
            >
            <div
              class="show-img"
              v-show="isShowBigImg"
              @click.stop="closeShowBigImg"
            >
              <div class="show-img-box">
                <img
                  :src="bigImgUrl"
                  alt=""
                >
              </div>
            </div>
          </li>
        </ul>
        <time class="time"> {{histories.create_time}}</time>
        <div
          class="res"
          v-if="histories.audit_content"
        >
          上下链回复： {{histories.audit_content}}
        </div>
      </li>
    </ul>
    <ul
      v-else
      class="no-fd"
    >您还没有任何反馈历史</ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bigImgUrl: "",
      isShowBigImg: false,
      histories: [
        // {
        //   types: "认证未成功",
        //   create_time: "2019-07-01",
        //   content: "认证企业的时候，无法sfddddddddddddddddddddddddddddddddddddddddddddddddddddd上传照片……",
        //   audit_content: "上下链回复：您好，问题已修复"
        // },
      ],
      token: ""
    };
  },

  created() {
    this.token = this.$store.state.loginInfo.userInfo.token;

    this.initData();
  },

  methods: {
    showImg(img, i) {
      let str =
        "http://47.106.105.213:8000/center/getfeedbackinfo/image?avatar=";
      this.bigImgUrl = str + img;
      this.isShowBigImg = true;
    },
    closeShowBigImg() {
      this.bigImgUrl = "";
      this.isShowBigImg = false;
    },
    async initData() {
      let { data } = await this.$axios.get(this.$api.feedback, {
        params: {
          token: this.token
        }
      });

      if (data) {
        data.forEach(item => {
          if (item.image_name) {
            item.image_name = item.image_name.split(",");
          }
          item.create_time = item.create_time.split("+")[0].replace("T", " ");
        });
      }
      this.histories = data;
    }
  }
};
</script>
<style lang="stylus" scoped>
#feedback-history
  width 100%
  min-height 100vh
  box-sizing border-box
  background-color #f3f3f3
  font-size 0.29rem
  color #333
  .item
    width 100%
    padding 0.1rem
    box-sizing border-box
    margin-bottom 0.2rem 
    background-color #fff
    .line
      border-bottom 1px solid #f3f3f3
      padding-bottom 0.1rem
      .fd-type
        display flex
        margin-bottom 0.1rem
        .title
          flex-basis 40%
          color #666
        .right
          width 60%
          font-weight 600
    .detail
      width 100%
      .title
        flex-basis 40%
        color #666     
    .img-list
      margin-top 0.1rem
      display flex
      justify-content flex-start
      .img-item
        width 2rem
        height 2rem
        margin-right 0.1rem
        img 
          width 100%
          height 100%  
      .show-img
        position fixed
        width 100vw
        height 100vh
        top 0
        left 0
        background-color rgba(0,0,0,0.5)
        .show-img-box
          position absolute
          width 100vw
          top 50%
          transform translateY(-50%)
          img 
            width 100%
            height 100%     
    .time
      color #999
      font-size 0.24rem        
  .qs
      word-break break-all    
    .res
      display inline-block
      width 100%
      margin-top 0.2rem
      background-color #f3f3f3
      border-radius 0.1rem
      padding 0.2rem 
      box-sizing border-box
      font-size 0.32rem
      color #666666
  .no-fd
    color #fff
    text-align center
    background-color #7DB7EB


</style>
