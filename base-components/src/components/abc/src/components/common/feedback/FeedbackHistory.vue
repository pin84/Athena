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
        <div class="fd-type">
          <span class="fd-time">
            <span class="title">问题所属功能区域: </span>
            <time> {{histories.create_time}}</time>
          </span>
          <p>{{histories.functional_areas}}</p>
        </div>
        <div class="fd-type">
          <span class="fd-time">
            <span class="title">问题类型: </span>
          </span>
          <p>{{histories.types}}</p>
        </div>
        <div class="fd-type">
          <span class="fd-time">
            <span class="title">详细描述: </span>
          </span>
          <p class="qs">{{histories.content}}</p>
        </div>

        <ul class="img-list">
          <li
            class="img-item"
            v-for='(itemImg,index) in histories.image_name'
            :key='index'
          >
            <img
              :src="'http://47.106.105.213:8000/center/getfeedbackinfo/image?avatar='+itemImg"
              alt=""
            >
          </li>
        </ul>
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
    async initData() {
      let { data } = await this.$axios.get(this.$api.feedback, {
        params: {
          token: this.token
        }
      });

      data.forEach(item => {
        if (item.image_name) {
          item.image_name = item.image_name.split(",");
        }
        item.create_time = item.create_time.split("+")[0].replace("T", " ");
      });

      // let getImg = await this.$axios.get(this.$api.feedbackGetImg, {
      //   params: {
      //     avatar: "2019072413301771.jpg"
      //   }
      // });

      this.histories = data;
      console.log(`====fsdsf===`, data);
    }
  }
};
</script>
<style lang="stylus" scoped>
#feedback-history
  width 100%
  min-height 100vh
  padding 0.2rem
  box-sizing border-box
  background-color #fff
  font-size 0.29rem
  color #333
  .item
    width 100%
    padding-bottom 0.1rem
    border-bottom 1px solid #f3f3f3
    margin-top 0.2rem 
    background-color #fff
    .fd-type
      display flex
      flex-direction column
      justify-content space-between
      margin-bottom 0.1rem
      // height 0.6rem
      // line-height 0.6rem
      .fd-time
        display flex
        justify-content space-between
      .title
        font-weight 600
      time
        color #999
    .img-list
      display flex
      justify-content flex-start
      .img-item
        width 2rem
        height 2rem
        margin-right 0.1rem
        img 
          width 100%
          height 100%    
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
