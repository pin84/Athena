<template>
  <div id="chuke-wrapper">

    <h1 class="title"></h1>
    <!-- <h1 class="title">用上下链触客 AI赋能营销</h1> -->

    <ul>
      <li
        class="list"
        v-for='(item,index) in content'
        :key='index'
      >
        <section
          class="item"
          :class="{'bg1':index===0,'bg2':index===1,'bg3':index===2}"
        >
          <section
            class="left"
            @click="toPage(index)"
          >
            <span class="item-title">
              <h2>{{content[index]['h2']}}</h2>
              <span>{{content[index]['span']}}</span>
            </span>
            <p>{{content[index]['p']}}</p>
            <div class="avatar-status">
              <ul class="avatar-list">

                <li
                  class="avtar-box"
                  :class='{a:idx === 0,b:idx === 1,c:idx === 2,d:idx === 3,}'
                  v-for='(url,idx) in item.urls'
                  :key='idx'
                >
                  <img
                    :src="url"
                    alt=""
                  >
                </li>
              </ul>
              <span class="user-num"> <span>{{content[index]['useNum']}}</span> 人在使用</span>
              <span
                class="status"
                :class="{'text-color-1':index===0,'text-color-2':index===1,'text-color-3':index===2, 'text-color-used':content[index]['status']}"
              >{{content[index]['status'] ?'您正在使用' :'您尚未使用' }}</span>
            </div>
          </section>
          <aside
            class="right"
            :class="{'right-bg-1':index===0,'right-bg-2':index===1,'right-bg-3':index===2}"
          ></aside>
        </section>
        <aside class="hot">
          <i class="text">火热进行</i>
        </aside>
      </li>
    </ul>
    <!-- <Feedback /> -->
  </div>
</template>
<script>
import Feedback from "../../components/common/feedback/FeedbackBtn";
export default {
  data() {
    return {
      content: [
        {
          h2: "精准短信触客",
          span: "（企业认证后充值使用）",
          p:
            "上下链完成对几千万企业标注有各种标签信息，您可以通过检索行业、地区、主营业务等标签进行精准的短信触客，大数据赋能营销高效。",
          urls: [
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png"),
            require("../../assets/icon/xia.png"),
            require("../../assets/icon/circle.png")
          ],
          useNum: "",
          status: undefined
        },
        {
          h2: "采购招标公告订阅",
          span: "（认证企业免费）",
          p:
            "上下链每天向订阅用户推送全网采购招标信息订阅，根据用户设置的关键词，自动匹配推荐，精准推送，掌握最新采招。",
          urls: [
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png"),
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png")
          ],
          useNum: "",
          status: undefined
        },
        {
          h2: "触客分发",
          span: "（认证企业免费）",
          p:
            "上下链提供您的企业可在不同场景进行触客分发，熟人圈分发、陌生圈分发，上下链提供各种营销文进行分发，充分触客。",
          urls: [
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png"),
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png")
          ],
          useNum: "",
          status: undefined,
          token: "", //测试用
          user: "" //用户名
        }
      ]
    };
  },
  components: {
    Feedback
  },
  created() {
    this.user = this.$store.state.loginInfo.userInfo.username;
    let token = this.$store.state.loginInfo.userInfo.token;
    this.token = token;
    // console.log(`=======`,token);
    // this.$axios.get(`http://192.168.31.73:8001/pay/Recharge/?token=${token}&total_fee=200`).then(res =>{
    //   console.log('=========res===',res);
    // })
    this.initData();
  },
  methods: {
    async initData() {
      let res = await this.$axios.get(`${this.$api.useNum}`, {
        params: {
          token: this.$store.state.loginInfo.userInfo.token
        }
      });

      console.log(`=======`, res.data);
      this.content[0].useNum = res.data.short_message_num;
      this.content[1].useNum = res.data.subscribe_num;
      this.content[2].useNum = res.data.touches_num;

      this.content[0].status = res.data.data_state.short_message;
      this.content[1].status = res.data.data_state.subscribe;
      this.content[2].status = res.data.data_state.touches;
    },
    toPage(index) {
      switch (String(index)) {
        case "0":
          // if (this.user === "伊谢尔伦的风") {
          // }
          this.$router.push("chuke-msg");
          // this.$toast("此功能维护中，即将开放，敬请期待");

          break;
        case "1":
          this.$router.push("mySubscript");
          break;
        case "2":
          this.$toast("此功能暂未开放哦，敬请期待");

          break;
      }
    },

    // toast() {
    //   this.$messageBox
    //     .confirm("功能暂未开放", "提示")
    //     .then(action => {})
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>
<style lang="stylus" scoped>
#chuke-wrapper
  width 100%
  padding 0.3rem
  box-sizing border-box
  text-align center
  color #f1f1f1
  font-family '苹方'
  font-size 0.24rem
  position relative
  .title
    // font-size 0.4rem
    // font-family 'SSZH'
    // letter-spacing 0.05rem
    // font-weight 400
    // color #000
    padding 0.3rem   0
    width 80%
    height 0.8rem
    margin 0 auto
    background url(../../assets/icon/chuke/chuke.png) center no-repeat 
    background-size contain
  .list
    position relative
    .item
      width 100%
      height 2.4rem
      box-shadow 0 0 0.2rem 0 rgba(0, 4, 0, 0.2)
      border-radius 0.1rem
      padding 0.1rem
      box-sizing border-box
      display flex
      align-items center
      text-align left
      margin-bottom 0.6rem
      &.bg1
        background-image linear-gradient(-90deg,#b7c4e0 0%,#a3afc7 100%)
      &.bg2
        background-image  linear-gradient(-90deg, #f3ce8d 0%, 	#dab87b 100%)
      &.bg3
        background-image linear-gradient(-90deg, #f88883 0%, #fd7670 100%);
      .left
        width 100%
        .item-title
          display flex
          align-items center
        .avatar-status
          display flex 
          .avatar-list
            display flex
            align-items center
            .avtar-box
              width 0.2rem
              height 0.2rem
              img
                width 100%
                height 100%
              &.a
                transform translateX(0rem)
                z-index 5
              &.b
                transform translateX(-0.05rem)
                z-index 4
              &.c
                transform translateX(-0.1rem)
                z-index 3
              &.d
                transform translateX(-0.15rem)
          .user-num
            transform translateX(-0.1rem)
          .status
            padding-left  0.2rem
            &::before
              display inline-block
              content ''
              width 0.2rem
              height 0.2rem
              background url(../../assets/icon/chuke/pen.png) center no-repeat
              background-size contain
              margin-right 0.05rem
            &.text-color-1
              color #606979
            &.text-color-2
              color #786036
            &.text-color-3
              color #6f2b28
            &.text-color-used
              color #fff 
              &::before
                display inline-block
                content ''
                width 0.2rem
                height 0.2rem
                background url(../../assets/icon/chuke/pen-white.png) center no-repeat
                background-size contain
                margin-right 0.05rem
      .right
        flex 0 0  0.8rem
        width 0.8rem
        height 0.8rem
        padding 0 0.2rem
        text-align center
        &.right-bg-1
          background url(../../assets/icon/chuke/pic-1.png) center no-repeat
          background-size contain
        &.right-bg-2
          background url(../../assets/icon/chuke/pic-2.png) center no-repeat
          background-size contain
        &.right-bg-3
          background url(../../assets/icon/chuke/pic-3.png) center no-repeat
          background-size contain

  .hot
    position absolute 
    top 0
    right 0
    width 0.9rem
    height 0.9rem
    background url(../../assets/icon/chuke/triangle.png) center no-repeat
    background-size contain
    .text
      display inline-block
      color blue
      transform  translate(0.1rem, 0.13rem) rotate(45deg)
      color #fff
      font-size 0.2rem

</style>
