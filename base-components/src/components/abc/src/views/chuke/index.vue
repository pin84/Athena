  <template>
  <div id="chuke-wrapper">
    <h1 class="title"></h1>
    <!-- <h1 class="title">用上下链触客 AI赋能营销</h1> -->

    <ul class="list">
      <li class="list-li" v-for="(item,index) in content" :key="index" @click="toPage(item.h2)">
        <!-- <section class="item" :class="'bg'+(index+1)"> -->
        <section class="item" :style="{'background-color':bgList[index]}">
          <span class="right">
            <img :src="require(`@/assets/icon/chuke/pic-${index+1}.png`)" alt />
          </span>
          <section class="left">
            <span class="item-title">
              <h2 :style="{'color':h2ColorList[index]}">{{content[index]['h2']}}</h2>
              <!-- <span>{{content[index]['span']}}</span> -->
            </span>
            <p>{{content[index]['p']}}</p>
            <div class="avatar-status">
              <ul class="avatar-list">
                <li
                  class="avtar-box"
                  v-for="(url,idx) in item.urls"
                  :class="['a','b','c','d'][idx]"
                  :key="idx"
                >
                  <img :src="url" alt />
                </li>
              </ul>
              <div v-if="item.h2 === '法律服务专场'">
                <span class="user-num">
                  <span>{{content[index]['useNum']}}</span> 人在使用
                </span>
                <span class="status">{{content[index]['comNum']}}家服务单位</span>
              </div>
              <div v-else>
                <span>暂未开启</span>
              </div>
            </div>
          </section>
        </section>
        <aside class="hot" v-show="item.h2 === '法律服务专场'">
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
          h2: "法律服务专场",
          span: "（企业认证后充值使用）",
          p:
            "上下链在全国各地挑选各项专项服务突出的律师所认证到平台来，服务中小企业，解决他们在日常法律顾问、债权债务、知识产权、融资股权等各种经营上的实际问题。",
          urls: [
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png"),
            require("../../assets/icon/xia.png"),
            require("../../assets/icon/circle.png")
          ],
          leftImg: "../../assets/icon/chuke/",
          useNum: "522",
          status: undefined,
          comNum: 14552
        },

        {
          h2: "信息化服务专场",
          span: "（认证企业免费）",
          p:
            "上下链提供全国各地专注于信息化服务企业认证到平台来，以信息技术与高科技手段服务于企业信息化领域；为企业提供软件开发、互联网平台、大数据服役等的信息化建设服务。",
          urls: [
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png"),
            require("../../assets/icon/shang.png"),
            require("../../assets/icon/msg.png")
          ],
          useNum: "",
          status: undefined,
          comNum: 25146
        },
        {
          h2: "知识产权专场",
          span: "（认证企业免费）",
          p:
            "上下链汇集全国各地专注于知识产权服务企业认证到平台来，服务于企业知识产权领域；为企业提供商标、著作权、专利、证书等知识产权服务。",
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
          h2: "团建培训服务专场",
          span: "（认证企业免费）",
          p:
            "上下链汇集全国各地为企业提供团建培训服务的企业到平台，为企业提供团队建设、管理技能、新人融入、团队凝聚力、潜能开发等拓展培训服务。",
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
        },
        {
          h2: "融资投资服务专场",
          span: "（认证企业免费）",
          p:
            "上下链汇集全国各地投资机构、产业基金、投融资公司。投资咨询机构、资产管理公司等融资投资服务企业于平台，为企业的投资、融资等活动提供中介或者直接服务。",
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
        },
        {
          h2: "企业定制专场",
          span: "（认证企业免费）",
          p:
            "上下链集结全国各地专项专注为企业定制服务企业到平台，为企业根据自身实际情况，量身定做的一些个性排他的服务，如商务礼品、工作服、公关活动等企业定制服务。",
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
      ],
      bgList: [
        "#a3afc7",
        "#5db2b0",
        "#dab87b",
        "#fd7670",
        "#ff7b47",
        "#3098d9"
      ],
      h2ColorList: [
        "#3f4a5d",
        "#1c3e3e",
        "#735c34",
        "#642422",
        "#4e2210",
        "#0d2f45"
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
    // this.initData();
  },

  mounted() {
    let title = "#上下链# 企业服务分类专场，让服务更专业更便捷。";
    this.$store.commit("setShareInfo", {
      title
    });
    this.$store.commit("setFriendNetInfo", {
      title
    });
  },
  methods: {
    async initData() {
      let res = await this.$axios.get(`${this.$api.useNum}`, {
        params: {
          token: this.$store.state.loginInfo.userInfo.token
        }
      });

      console.log(`==1=====`, res.data);
      this.content[0].useNum = res.data.short_message_num;
      this.content[2].useNum = res.data.subscribe_num;
      this.content[3].useNum = res.data.touches_num;

      this.content[0].status = res.data.data_state.short_message;
      this.content[2].status = res.data.data_state.subscribe;
      this.content[3].status = res.data.data_state.touches;
    },
    toPage(index) {
      switch (String(index)) {
        case "法律服务专场":
          this.$router.push({
            path: "/",
            query: {
              dataType: "special",
              industryName: "法律服务",
              industryID: "12"
            }
          });
          break;
        case "知识产权专场":
          this.$router.push({
            path: "/",
            query: {
              dataType: "special",
              industryName: "知识产权",
              industryID: "12"
            }
          });
          break;
        // case "1":
        //   this.$router.push("/customerpool");
        //   break;
        // case "2":
        //   this.$router.push("mySubscript");
        //   break;
        // case "3":
        //   this.$toast("此功能暂未开放哦，敬请期待");
        //   break;
        default:
          this.$toast("此功能暂未开放哦，敬请期待");
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#chuke-wrapper
  position absolute
  // height 100%
  width 100%
  top 0
  bottom 0.98rem
  overflow scroll
  padding 0.1rem 0.1rem 0
  box-sizing border-box
  text-align center
  color #f1f1f1
  font-family '苹方'
  font-size 0.24rem
  .title
    width 80%
    height 0.9rem
    margin 0 auto 0.1rem
    padding 0.2rem 0
    background url(../../assets/icon/chuke/chuke.png) center no-repeat 
    background-size contain
  .list
    width 100%
    // padding-bottom 1rem
    .list-li
      position relative
      margin-bottom 0.6rem
      .item
        width 100%
        // height 2.4rem
        box-shadow 0 0 0.2rem 0 rgba(0, 4, 0, 0.2)
        border-radius 0.1rem
        padding 0.2rem 0.1rem
        box-sizing border-box
        display flex
        align-items center
        text-align left
        .left
          width 100%
          .item-title
            display flex
            align-items center
            h2
              color #1c3e3e
              opacity 0.9
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
              color #1c3e3e
              &::before
                display inline-block
                content ''
                width 0.2rem
                height 0.2rem
                background url(../../assets/icon/chuke/pen.png) center no-repeat
                background-size contain
                margin-right 0.05rem
            
        .right
          display inline-block
          width 1.2rem
          height 1rem
          margin-right 0.15rem
          text-align center
          img
            width 100%
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
