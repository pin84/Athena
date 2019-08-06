<template>
  <div id="LookAround">
    <div class="mainbody">
      <div class="search">
        <span
          class="qs"
          @click="qs"
        >快<br>搜</span>
        <span class="new">最<br>新<br>采<br>招</span>
      </div>

      <div id="listWrapper">

        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li
            class="item"
            v-for='(item,index) in resultList'
            :key="index"
          >
            <DataItem
              :pData='item'
              @showDetail='showDetail(item)'
            />

          </li>

        </ul>

      </div>

      <PopDetail
        :content='content'
        :detailData='detailData'
        :isShow='isShowDetail'
        @closePop='closePop'
      />
    </div>
    <FeedbackBtn />
    <!-- <span
      class="toFeedback"
      @click="showFeedback"
      ref="feedback"
    >
      <span class="inner">意见反馈</span>
    </span> -->

    <!-- <LimitTwoMsg  /> -->
  </div>
</template>

<script>
import FeedbackBtn from "../../components/common/feedback/FeedbackBtn";
import TopRouter from "./model/TopRouter";
import DataItem from "./model/DataItem";
import PopDetail from "./model/PopDetail";
import { InfiniteScroll } from "mint-ui";
import Commonjs from "./common";
export default {
  directives: { InfiniteScroll },
  data() {
    return {
      content: "",
      detailData: {}, //存储传给子组件的数据
      isShowDetail: "", //显示详情或是限制只读两信息。'detail' / 'limit'
      resultList: undefined,
      top: null,
      start: null,
      pageNum: 1,
      isShowFeedback: false,
      token: ""
    };
  },

  components: {
    DataItem,
    TopRouter,
    PopDetail,
    FeedbackBtn
  },

  async created() {
    this.token = this.$store.state.loginInfo.userInfo.token;
    this.isShowTip();
    let resT = await this.getToken();

    let res = await this.getData();
    this.resultList = res.results;

    let { keyword, id } = this.$route.query;
    console.log(this.$route.query);
    
    if (id) {
      this.showDetail(this.$route.query);
    }
  },

  methods: {
    //给后台拿到token,用于 isShowTips方法（后台用）
    async getToken() {
      let data = {
        token: this.token
      };
      let res = await this.$axios.get(this.$api.isShowTipsStep_1, {
        params: data
      });

      return res;
    },

    async isShowTip() {
      let url_name = this.$route.meta.remark;

      let data = {
        token: this.token,
        url_name
      };

      let res = await this.$axios.get(this.$api.isShowTips, {
        params: data
      });

      if (res.data === 0) {
        this.$router.push("tipsdy");
      }
    },

    async loadMore() {
      if (!this.resultList) return;
      this.loading = true;
      let res = await this.getData();

      this.resultList = this.resultList.concat(res.results);
    },

    async getData() {
      let { data } = await this.$axios.get(`${this.$api.randomData}`, {
        params: {
          page: this.pageNum,
          page_size: 24
        }
      });

      this.pageNum++;
      return data;

      // let now = new Date();
      // let status_1 = [];
      // let status_0 = [];
      // res.data.results.forEach(item => {
      //   let d = new Date(item.EndDate);
      //   if (d < now) {
      //     item.status = "1";
      //     status_1.push(item);
      //   } else {
      //     item.status = "0";
      //     status_0.push(item);
      //   }
      // });

      // return [status_0, status_1];
    },
    touchstart(e) {
      let list = this.$refs.list;
      let rect = list.getBoundingClientRect();
      this.top = rect.top;

      // console.log(e.touches[0].pageY);
      this.start = e.touches[0].pageY;
    },
    touchmove(e) {
      // let y = e.touches[0].pageY;
    },
    touchend(e) {
      // console.log(e.touches[0]);
    },

    async showDetail(item) {

      
      let res = await Commonjs.showDetail(item.id, this.token);
      if (res !== false) {
        this.detailData = item;
        
        this.isShowDetail = "detail";
        this.content = res;
      } else {
        this.isShowDetail = "limit";
      }
    },

    closePop() {
      this.isShowDetail = "";
    },
    qs() {
      this.$router.push("/03_quickSearch");
    }
  }
};
</script>
<style lang="stylus" scoped>
#LookAround 
  position relative
  width 100%
  height 100%
  overflow hidden
  background-color #f3f3f3
  box-sizing border-box
  // .toFeedback
  //   position fixed
  //   display inline-block
  //   width 1rem
  //   height 1rem
  //   bottom 1.5rem
  //   right 0.15rem
  //   z-index 3
  //   background-color #09a2a3
  //   display flex
  //   justify-content center
  //   align-items center
  //   border-radius 50%
  //   box-shadow 0 0 0.2rem #222
  //   transition 0.3s
  //   transform translateX(80%)

  //   .inner
  //     display inline-block
  //     background-color #ffffff
  //     width 0.8rem
  //     height 0.8rem
  //     border-radius 50%
  //     text-align center
  //     font-size 0.28rem
  //     line-height 0.3rem
  //     padding-top 0.1rem
  //     box-sizing border-box
  .mainbody
    height 93vh
    padding 0 0 1rem 0
    box-sizing border-box
    display flex
    position relative
    .search
      position fixed
      left 0
      height 100%
      display flex
      flex-direction column
      // justify-content space
      z-index 2
      .qs,.new
        display inline-block
        text-align center
        // background-color #fff
        border-radius 0 0 0.12rem 0
        font-weight 600
        font-size 0.3rem
        width 0.7rem
        vertical-align middle
        box-sizing border-box
        &::before
          display inline-block
          content ''
          width 0.44rem
          height 0.44rem
        &.qs
          height 2.6rem
          background-color #fff
          &::before
            background url(../../assets/icon/dingyue/search.png) center no-repeat
            background-size contain
        &.new
          height 100%
          color #09a2a3
          background-color #f3f3f3
          border-left 0.05rem solid #09a2a3
          padding-top 2.6rem
          &::before
            background url(../../assets/icon/dingyue/tender.png) center no-repeat
            background-size contain
    #listWrapper
      width 100%
      height 100%
      padding-left 0.7rem
      overflow-y scroll 
      -webkit-overflow-scrolling touch
      .item
        background-color #f3f3f3
        height 1.6rem
        // height 30vh
        padding 0.1rem  0.1rem 1rem 
        box-sizing border-box   
        // display flex
        // flex-direction column 
        margin-bottom 0.1rem
</style>

