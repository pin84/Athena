<template>
  <div id="fd-bak">

    <div class="top-box">

      <SelectList
        @selseType="selseType"
        @selseState='selseState'
        @selseArea='selseArea'
      />
    </div>

    <div
      class="main-body"
      v-if="dataList.length !== 0"
    >
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="100"
        class="page-infinite-list"
        infinite-scroll-immediate-check='isScroll'
      >
        <li
          class="item"
          v-for='(item,index) in dataList'
          :key='index'
        >
          <p class="top">
            <span class="top-title">
              <span class="type">反馈类型：</span>
              <span class="time">{{item.create_time}}</span>
            </span>

            <span>{{item.types}}</span>
          </p>
          <p class="fd-content">{{item.content}}</p>
          <ul class="img-list">
            <li
              class="img-item"
              v-for='(itemImg,index) in item.image_name'
              :key='index'
            >
              <img
                :src="'http://47.106.105.213:8000/center/getfeedbackinfo/image?avatar='+itemImg"
                alt=""
              >
            </li>
          </ul>
          <p class="bot">
            <span class="bot-phone">联系电话:{{item.mobile}}</span>
            <span class="btn">
              <span class="wait">待定</span>
              <span
                class="res"
                @click="resFeedback(index)"
              >{{item.audit_content ? '已回复':'回复' }}</span>
            </span>
          </p>

          <div
            class="sys-res"
            v-if="item.audit_content"
          >
            <p>{{item.audit_time}}</p>
            <span>上下链回复：</span>
            <span>{{item.audit_content}}</span>
          </div>
          <div
            class="input"
            v-if="isShowInputIndex === index"
          >
            <input
              type="text"
              class="inputText"
              placeholder="输入回复内容"
              v-model="inputText"
            >
            <input
              type="submit"
              class="submit"
              @click="submitText(item)"
            >
          </div>
        </li>
      </ul>
    </div>
    <div
      v-else
      style="padding:0 0.3rem;font-size:0.32rem;padding-top:1.3rem;color:red;"
    >
      没有内容，请更换筛选条件
    </div>

  </div>
</template>
<script>
import SelectList from "./SelectList";
import { InfiniteScroll } from "mint-ui";

export default {
  directives: { InfiniteScroll },
  data() {
    return {
      isScroll: false,
      loading: null,
      showSelectType: "", //显示当前选择的问题类型
      isShowInputIndex: null, //是否显示回复框
      inputText: "", //input框输入的内容
      dataList: [
        // {
        //   feedbackType: "数据异常",
        //   feedbackTime: "2019-07-01:12:45:34",
        //   feedbackConent: "认证企业的时候无法上传照片。。。。。",
        //   phone: "18688888888",
        //   resTime: "2019-09-09 20:01:01",
        //   resText: "adfsf", //回复的内容
        //   type: "",
        //   status: ""
        // },
        // {
        //   feedbackType: "认证不成功",
        //   feedbackTime: "2019-07-01:12:45:30",
        //   feedbackConent: "认证企业的时候无法上传照片。。。。。",
        //   phone: "18688888888",
        //   resTime: "2019-09-09 20:01:01",
        //   resText: "adfsf", //回复的内容
        //   type: ""
        // }
      ],
      postData: {
        functional_areas: "",
        types: "",
        audit_state: "",
        page: 1
      }
    };
  },

  components: {
    SelectList
  },
  created() {
    this.initData();
  },
  methods: {
    async loadMore() {
      this.loading = true;
      this.postData.page++;

      let res = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );
      this.dataList = this.dataList.concat(res.results);
      if (!res.next) {
        this.loading = true;
        return;
      }

      this.loading = false;
    },
    async initData() {
      let data = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );
      this.dataList = data.results;
    },
    async getData(url, d) {
      let { data } = await this.$axios.get(url, {
        params: d
      });

      data.results.forEach(item => {
        item.create_time = item.create_time.split("+")[0].replace("T", " ");
        if (item.audit_time) {
          item.audit_time = item.audit_time.split("+")[0].replace("T", " ");
        }
        if (item.image_name) {
          item.image_name = item.image_name.split(",");
        }
      });

      if (!data.next) {
        this.loading = true;
      }

      return data;
    },

    async selseArea(area) {
      area === "全部" ? (area = "") : (area = area);
      this.postData.page = 1;
      this.loading = false;
      this.postData.functional_areas = area;

      let { results } = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );
      this.dataList = results;
      console.log(`=======`, this.dataList);
    },

    async selseType(type) {
      type === "全部" ? (type = "") : (type = type);
      this.postData.page = 1;
      this.loading = false;
      this.postData.types = type;

      console.log(`=======`, this.postData.page);

      let { results } = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );
      this.dataList = results;
    },
    async selseState(state) {
      state === "待定"
        ? (state = "")
        : state === "已回复"
        ? (state = 1)
        : (state = 0);
      this.postData.page = 1;
      this.loading = false;
      this.postData.audit_state = state;

      let { results } = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );

      this.dataList = results;
    },
    resFeedback(index) {
      this.isShowInputIndex = index;
    },
    async submitText(item) {
      let pd = {
        id: item.id,
        audit_content: this.inputText
      };
      console.log(`====pd===`,pd);
      let res = await this.$axios.put(this.$api.feedbackResponse, pd);
      console.log(`====res===`,res);
      this.inputText = "";
      this.isShowInputIndex = null;
      this.initData();
    }
  }
};
</script>
<style lang="stylus" scoped>
#fd-bak
  width 100%
  min-height 100vh
  height 100%
  background-color #f3f3f3
  font-size 0.28rem
  .top-box
    position fixed
    width 100%
  .main-body
    padding 1.2rem  0.2rem 0.2rem  0.2rem 
    .item
      height 100%
      // min-height 4.7rem
      background-color #fff
      padding 0.1rem
      box-sizing border-box
      border-radius 0.1rem
      margin-bottom 0.2rem
      .top
        font-size 0.32rem
        display flex
        justify-content space-between
        flex-direction  column
        // height 0.8rem
        // line-height 0.8rem
        padding-bottom 0.2rem
        border-bottom 1px solid #ccc
        .top-title
          display flex
          justify-content space-between
          .type
            color #333
            font-weight 600
          .time
            font-size 0.2rem
            color #999
            vertical-align middle
      .fd-content
        color #333
        font-size 0.32rem
        margin-bottom 0.2rem
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
      .bot
        display flex
        justify-content space-between 
        margin 0.3rem 0
        .bot-phone
          color #999
          font-size 0.24rem
          height 0.6rem
          line-height 0.6rem
        .btn span 
          display inline-block
          width 1.5rem
          height 0.6rem
          line-height 0.6rem
          border-radius 0.3rem
          text-align center
          margin-right 0.2rem
          font-size 0.24rem
          &.wait
            color #333
            border 1px solid   #999  
          &.res
            color #09a3a3
            border 1px solid   #09a3a3  
      .sys-res
        background-color #f3f3f3
        padding 0.15rem
        color #666
        border-radius 0.1rem
        margin-bottom 0.1rem
        .input
          display inline-block
          height 0.6rem
          input 
            height 100%
            margin-right 0.1rem
          .submit
            display inline-block
            height 100%
            line-height 100%
            background-color   #09a3a3
            color #fff
            padding 0.1rem
            border-radius 0.05rem
            font-size 0.24rem
      .response
        width 100%
        max-height 2rem
        overflow-y auto
        margin-bottom 0.1rem
        border-radius 0.1rem
        background-color #f3f3f3
        padding 0.1rem
        box-sizing border-box
        font-size 0.28rem

        .res-title
          font-weight 600
      .input
        width 100%
        input
          height 0.8rem
          &.inputText
            width 80%
            margin-right 0.2rem
            padding 0 0.1rem
            box-sizing border-box
            border none
            background-color #ccc
            border-radius 0.08rem
          &.submit
            display inline-block
            background-color #09a3a3
            color #ffffff
            padding 0 0.2rem
            border-radius 0.08rem
          
        
</style>

