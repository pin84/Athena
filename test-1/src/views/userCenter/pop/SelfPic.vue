<template>
  <div
    id="self-pic"
    @click="cancleDel"
  >
    <div
      id="mainbody"
      class="main-body"
      ref="mainBody"
    >
      <div class="content">

        <h1>欢迎来到上下链</h1>
        <h3>{{picType ==='company' ? '添加您的企业标签词' : '添加您的个人标签'}}</h3>
        <section
          class="se"
          v-if="picType === 'company'"
        >
          <div class="random">
            <h4>例如:</h4>
            <!-- <span
              class="change"
              @click="changeTags"
            >换一批</span> -->
          </div>
          <div class="example">
            <span
              v-for="(example,index) in comExamples"
              :key="index"
            >
              {{example}}
            </span>
          </div>
          <div class="btn">
            <input
              class="input-text"
              type="text"
              placeholder="输入企业标签词"
              v-model="companyTag"
              @focus="inputOnFocus"
            >
            <button
              class="btn-add"
              @click="addTag('company')"
            >+添加</button>
          </div>

          <ul class="list">
            <li
              class="item"
              :class="classList[classListNum[idx]]"
              v-for='(tag,idx) in comTags'
              :key='idx'
              @touchstart='touchstar'
              @touchend='touchend'
            >
              {{tag}}
              <em
                class="del"
                @click="delComTag(tag,idx)"
              ></em>
            </li>
          </ul>
        </section>

        <!-- =====================a:idx===0,b:idx===1,c:idx===2,d:idx===3,e:idx===4================================ -->

        <section
          class="se"
          v-if="picType === 'person'"
        >
          <div class="random">
            <h4>例如:</h4>
            <!-- <span
              class="change"
              @click="changeTags"
            >换一批</span> -->
          </div>
          <div class="example">
            <span
              v-for="(example,idx) in personExamples"
              :key="idx"
            >
              {{example}}
            </span>
          </div>
          <div class="btn">
            <input
              class="input-text"
              type="text"
              placeholder="输入个人标签词"
              v-model="personTag"
              @focus="inputOnFocus"
              ref="perInput"
            >
            <button
              class="btn-add"
              @click="addTag('person')"
            >+添加</button>
          </div>

          <ul class="list">
            <li
              class="item item-person"
              :class="classList[classListNum[idx]]"
              v-for='(tag,idx) in personTags'
              :key='idx'
              @touchstart='touchstar'
              @touchend='touchend'
            >
              {{tag}}
              <em
                class="del"
                @click="delPersonTag(tag,idx)"
              ></em>
            </li>
          </ul>

        </section>
      </div>

    </div>
    <div
      class="save-cancel"
      ref="btnbox"
    >
      <!-- <button @click='cancle' class="btn-save">放弃</button> -->
      <button
        @click="saveTag"
        class="btn-save"
      >保存标签</button>
    </div>
  </div>
</template>

<script>
import { debug } from "util";
export default {
  data() {
    return {
      companyTag: "", //当前的输入的公司标签
      personTag: "", //当前的输入的个人标签
      i: 0, //换一批功能的下标,
      j: 0,
      isShowDel: false, //是否显示删除的标志
      classList: ["a", "b", "c", "d", "e", "f"],
      classListNum:[],
      personExamples: [
        "从业软件销售10年",
        "优秀销售人员",
        "擅长软件外包服务"
        // "全栈工程师",
        // "未来的大佬",
        // "精通javascript",
        // "精通ios原生开发",
        // "三大框架全接触",
        // "安卓原生开发"
      ],
      comExamples: [
        "软件开发",
        "Crm软件",
        " 小程序开发"
        // "Erp开发 ",
        // "微信公众号开发",
        // "java高级开发",
        // ".net后台开发 ",
        // "全平台开发",
        // "ios开发"
      ],
      comTags: [],
      personTags: [],
      timer: undefined,
      botNum: 0,
      picType: "",
    };
  },

  created() {
    this.picType = this.$route.query.type;
    this.initData();
  },

  mounted() {
    let mainBody = this.$refs.mainBody;
    mainBody.addEventListener("scroll", this.handleScroll, true);
  },

  methods: {
    handleScroll() {
      let mainBody = this.$refs.mainBody;
      let btn = document.getElementsByClassName("save-cancel")[0];
      let scrollTop = mainBody.scrollTop;
      btn.style.bottom = -scrollTop + "px";
    },

    inputOnFocus() {
      // document.body.style.height = '1250px'
      // console.log(`=======`, document.body.clientHeight);
      // document.body.scrollTop = document.body.scrollHeight;
    },

    cancle() {
      this.$emit("clostSelfPic");
    },
    addTag(type) {
      // this.classListNum.push(Math.floor(Math.random()*6))
      // console.log(`=======`, this.classListNum);
      if (type === "person") {
        if (!this.personTag.trim()) {
          this.personTag = "";
          this.$toast("请输入标签");
          return;
        }
        this.personTags.unshift(this.personTag);
        this.personTag = "";
      }

      if (type === "company") {
        if (!this.companyTag.trim()) {
          this.companyTag = "";
          this.$toast("请输入标签");
          return;
        }
        this.comTags.unshift(this.companyTag);
        this.companyTag = "";
      }
    },
    changeTags() {
      this.i++;
      if (this.i > 2) {
        this.i = 0;
      }
    },
    async saveTag() {
      let comTags = this.comTags;
      let personTags = this.personTags;
      let token = this.$store.state.loginInfo.userInfo.token;

      if (this.picType === "person") {
        if (Object.keys(personTags).length === 0) {
          personTags = null;
        } else {
          personTags = personTags.join().replace(/\,/g, "|");
        }

        let res = await this.$axios.post(`${this.$api.perTags}`, {
          token,
          lndividual_labels: personTags
        });




      } else {
        if (Object.keys(comTags).length === 0) {
          comTags = null;
        } else {
          comTags = comTags.join().replace(/\,/g, "|");
        }

        let localComInfo = JSON.parse(localStorage.getItem("com-indexinfo"));
        localComInfo.kind = this.comTags;
        localStorage.setItem("com-indexinfo", JSON.stringify(localComInfo));

        let res = await this.$axios.post(`${this.$api.comTags}`, {
          token,
          kind: comTags
        });
      }

      let instance = this.$toast("保存成功");
      setTimeout(() => {
        instance.close();
        this.$router.go(-1)
      }, 1000);

    },

    async initData() {
      let token = this.$store.state.loginInfo.userInfo.token;

      let resPersonTags = await this.$axios.get(`${this.$api.perTags}`, {
        params: {
          token
        }
      });
      let resComTags = await this.$axios.get(`${this.$api.comTags}`, {
        params: {
          token
        }
      });

      for(let i =0 ; i<50;i++){
        this.classListNum.push(Math.floor(Math.random()*6))
      }



      // let resComTags = await this.$axios.get(`${this.$api.accuracySearch}`, {
      //   params: {
      //     token
      //   }
      // });

      let comTags = [];
      let perTags = [];

      if (resPersonTags.data.lndividual_labels) {
        if (resPersonTags.data.lndividual_labels.indexOf("|") === -1) {
          perTags.push(resPersonTags.data.lndividual_labels);
        } else {
          perTags = resPersonTags.data.lndividual_labels.split("|");
        }
      }

      if (resComTags.data.kind) {
        if (resComTags.data.kind.indexOf("|") === -1) {
          comTags.push(resComTags.data.kind);
        } else {
          comTags = resComTags.data.kind.split("|");
        }
      }

      this.comTags = comTags;
      this.personTags = perTags;

      // this.$store.commit("savePersonTags", perTags);
      // this.$store.commit("saveComTags", comTags);
    },
    delComTag(tag, index) {
      this.comTags.splice(index, 1);
    },
    delPersonTag(tag, index) {
      this.personTags.splice(index, 1);
    },

    cancleDel(e) {
      if (e.target.tagName !== "EM") {
        this.isShowDel = false;
        return;
      }
    },

    touchstar() {
      this.timer = setTimeout(() => {
        this.isShowDel = true;
      }, 1000);
    },
    touchend() {
      clearTimeout(this.timer);
    }
  }
};
</script>
<style lang="stylus" scoped>
#self-pic
  position relative
  width: 100%
  min-height: 100%
  padding-bottom 1rem
  box-sizing: border-box;
  background-color: #fff
  // background-color: #fff;
  // display: -webkit-box;
  // -webkit-box-pack: center;
  // -webkit-box-align: center;
  // -webkit-box-orient: vertical;
  user-select: none
  font-size 0.28rem
  overflow-y auto
  .main-body
    position relative
    background-color #fff
    height 100%
    overflow-y auto
    // display flex
    // flex-direction column
    // justify-content space-between
    .content
      padding 0.2rem
      box-sizing border-box
      h1  
        margin-top 0.1rem
        color #333
        font-size 0.6rem
      h3
        font-size 0.36rem
        font-weight 200
        color #999  
      .random
        width 100%
        display flex
        justify-content space-between
        h4  
          font-size 0.3rem 
          color #333
        .change
          color #999
          font-size 0.28rem
          &::before
            display inline-block
            width 0.2rem
            height 0.2rem
            content ''
            background url(../../../assets/icon/userCenter/random-change.png) center no-repeat
            background-size contain
            margin-right 0.1rem
      .example
        width 100%
        // height 2.1rem
        padding 0.1rem
        box-sizing border-box
        overflow-y auto
        span 
          display inline-block 
          padding 0.15rem 0.3rem
          background-color #f3f3f3
          // opacity 0.05 
          color #666 
          border-radius 0.6rem
          margin-right 0.2rem
          margin-top 0.2rem
          font-size 0.28rem
      .list
        max-height 4.5rem
        box-sizing border-box
        overflow-y auto
        margin-top 0.2rem
        font-size 0.28rem
        .item
          position relative
          display inline-block
          padding 0.15rem 0.3rem
          border-radius 0.6rem
          margin-right 0.2rem
          margin-top 0.2rem
          &.item-person,&.item-company
            background-color #333
            color #fff
            font-size 0.28rem
            font-weight 200
          &.item-person::before
            display inline-block
            width 0.2rem
            height 0.2rem
            content ''
            background url(../../../assets/icon/userCenter/person-tag.png)
            background-size contain
          // &.item-company
          //   background   #ed7f14  
          &.a
            color #fff
            background-color #ed8014
          &.b
            color #1362ee
            background-color #f2f9fe
          &.c
            color #09a4a3
            background-color #f2fbf9
          &.d
            color #ec8011
            background-color #fbf9f3
          &.e
            color #ffffff
            background-color  #4EA2EC 
          &.f
            background-color #333
            color #fff   
          .del
            position absolute
            width 0.3rem
            height 0.3rem
            top -0.1rem
            right -0.1rem
            background url(../../../assets/icon/11.png) center no-repeat
            background-size contain
      .btn
        width 100%
        position relative  
        margin-top 0.4rem 
        .input-text,.btn-add
          width 100%
          height 1rem
          padding 0 0.2rem
          box-sizing border-box
          font-size 0.32rem
          border 1px solid #23b2b3
          border-radius 0.5rem
        .btn-add
          position absolute 
          right 0
          top 1px
          width 1.6rem
          border 0
          font-weight 200
          background-color #23b2b3
          color #fff
          font-size 0.28rem
        .input-text::placeholder
          color #cccccc
          font-size 0.3rem 
  .save-cancel
    position fixed
    bottom 0
    width 100%
    position absolute
    width 100%
    height 1rem
    line-height 1rem
    display flex
    margin-bottom 0.1rem
    button 
      font-size 0.32rem
      width 100%
      background #f3f3f3  
      color #666
      &:last-child
        border-left 1px solid #ccc
        color #09a2a3
      &.btn-save
          width 80%
          margin 0 auto
          border-radius 0.6rem
          background-color   #23b2b3
          color #ffffff





</style>
