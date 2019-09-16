<template>
  <div
    id="fd-bak"
    :class="{'add-mask':isShowBigImg}"
  >

    <div class="select-box">
      <section class="fd-bak-top-title">
        #上下链#意见反馈 后台看板
      </section>
      <SelectList
        @selseType="selseType"
        @selseState='selseState'
        @selseArea='selseArea'
      />
    </div>

    <div
      class="main-body"
      v-if="dataList.length !== 0"
      ref="mainBody"
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
          <div
            class="over-view"
            @click="showDetail(index)"
          >
            <div class="over-view-contact">
              <span class="img-box">
                <img
                  :src="item.wx_headimgUrl"
                  alt=""
                >
              </span>
              <span class="name">
                <span class="name-text">{{item.wx_username}}</span>
                <span class="name-time">{{item.create_time}}</span>
                <dl class="com-info">
                  <dd v-if="item.company_name">{{item.company_name}}
                    <span class="cancel">已认证</span>
                  </dd>
                  <dd
                    class="state"
                    v-else
                  >未绑定认证企业</dd>
                </dl>
              </span>
            </div>
            <div class="res-state">
              <span :class="{'res-state-c':item.audit_content}">{{item.audit_content ? '已回复':'待回复' }}</span>
              <span
                class="triangle"
                :class="{'active':index===i}"
              ></span>
            </div>
          </div>
          <div
            class="item-detail"
            ref="detail"
            v-show="index === i"
          >
            <p class="top">
              <span class="top-title"> 问题区域：</span>
              <span>{{item.functional_areas}}</span>
            </p>
            <p class="top">
              <span class="top-title"> 问题类型：</span>
              <span>{{item.types}}</span>
            </p>
            <p class="top">
              <span class="top-title"> 详细描述：</span>
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
                  @click.stop="showBigImg(itemImg)"
                >
              </li>
            </ul>
            <p class="bot">
              <span class="bottom-contact">
                <span class="bot-phone">联系电话：{{item.mobile || '未填写'}}</span>
                <span class="bot-phone">联&nbsp;&nbsp;系&nbsp;&nbsp;人：{{item.contact_name || '未填写'}}</span>
              </span>
              <span class="btn">
                <!-- <span class="wait">待定</span> -->
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
              <p class="res-name">
                <span class="res-name-box">
                  <span class="res-name-avatar">
                    <img
                      :src="item.headimgUrl"
                      alt=""
                    >
                  </span>
                  <span class="res-name-text">{{item.username}}</span>
                </span>
                <span class="time">{{item.audit_time}}</span>
              </p>
              <!-- <span>上下链回复：</span> -->
              <span class="res-content">{{item.audit_content}}</span>
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
    <div id="item-1"></div>

  </div>
</template>
<script>
import SelectList from "./SelectList";
import { InfiniteScroll } from "mint-ui";

export default {
  directives: { InfiniteScroll },
  data() {
    return {
      bigImgUrl: "",
      isShowBigImg: false,
      i: null,
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
      },
      token: "",
      username: "",
      headimgUrl: "",
      numComState: null,
      mainBody: null,
      mainBodyScrollTop: null
    };
  },

  components: {
    SelectList
  },
  created() {
    let user = this.$store.state.loginInfo.userInfo;
    this.username = user.username;
    this.headimgUrl = user.headimgUrl;
    this.token = user.token;
    this.initData();

    // let a = ["a", 2, 3];

    // for (let i of a) {
    //   console.log(`=====0==`, i);
    // }

    let products = new Proxy(
      [
        { name: "Firefox", type: "browser" },
        { name: "SeaMonkey", type: "browser" },
        { name: "Thunderbird", type: "mailer" }
      ],
      {
        get: function(obj, prop) {
          console.log(`=======`, obj, prop);
          // 缺省行为是返回属性值， prop ?通常是一个整数
          if (prop in obj) {
            console.log(`====prop in obj===`);
            return obj[prop];
          }

          // 获取 products 的 number; 它是 products.length 的别名
          if (prop === "number") {
            console.log(`====number===`);
            return obj.length;
          }

          let result,
            types = {};

          for (let product of obj) {
            if (product.name === prop) {
              result = product;
            }
            if (types[product.type]) {
              types[product.type].push(product);
            } else {
              types[product.type] = [product];
            }
          }

          console.log(`===3====`,types);

          // 通过 name 获取 product
          if (result) {
            return result;
          }

          // 通过 type 获取 products
          if (prop in types) {
            return types[prop];
          }

          // 获取 product type
          if (prop === "types") {
            return Object.keys(types);
          }

          return undefined;
        }
      }
    );

    // console.log("--1---", products[0]); // { name: 'Firefox', type: 'browser' }
    // console.log("---2--",products["types"]); // { name: 'Firefox', type: 'browser' }
    // console.log(products["Chrome"]); // undefined
    console.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
    // console.log(products.types); // ['browser', 'mailer']
    // console.log(products.number); // 3
  },

  updated() {
    this.mainBody = this.$refs.mainBody;

    // this.mainBodyScrollTop = mainBody.scrollTop
  },

  methods: {
    closeShowBigImg() {
      this.isShowBigImg = false;
      this.mainBody.scrollTop = this.mainBodyScrollTop;
    },
    showBigImg(imgName) {
      this.mainBodyScrollTop = this.mainBody.scrollTop;

      let baseUrl =
        "http://47.106.105.213:8000/center/getfeedbackinfo/image?avatar=";
      this.isShowBigImg = true;
      this.bigImgUrl = baseUrl + imgName;
    },

    showDetail(i) {
      this.i === i ? (this.i = null) : (this.i = i);
    },
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

      // console.log(`===1====`, this.dataList);
      // this.getUserIdentityAndPayStatus();
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
    },

    async selseType(type) {
      type === "全部" ? (type = "") : (type = type);
      this.postData.page = 1;
      this.loading = false;
      this.postData.types = type;

      let { results } = await this.getData(
        this.$api.feedbackBakInitData,
        this.postData
      );
      this.dataList = results;
    },
    async selseState(state) {
      state === "全部"
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
      if (this.dataList[index].audit_content) {
        return;
      }

      this.isShowInputIndex === index
        ? (this.isShowInputIndex = "")
        : (this.isShowInputIndex = index);
    },
    async submitText(item) {
      this.postData.page = Math.ceil(this.i / 10);
      let pd = {
        id: item.id,
        audit_content: this.inputText,
        username: this.username,
        headimgUrl: this.headimgUrl
      };
      let res = await this.$axios.put(this.$api.feedbackResponse, pd);
      this.temFn(item);
      this.inputText = "";
      this.isShowInputIndex = null;

      // this.initData();
    },
    temFn(item) {
      let d = new Date();

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let str = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

      this.$set(item, "audit_content", this.inputText);
      this.$set(item, "username", this.username);
      this.$set(item, "headimgUrl", this.headimgUrl);
      this.$set(item, "audit_time", str);
      this.inputText = "";
      this.isShowInputIndex = null;
    }
  }
};
</script>
<style lang="stylus" scoped>
#fd-bak
  width 100%
  min-height 100vh
  // height 100%
  background-color #cccccc
  font-size 0.28rem
  &.add-mask 
    position:absolute;
    top:0; 
    height: 100%;
    overflow: hidden;
  .select-box
    position fixed
    width 100%
    z-index 1
    .fd-bak-top-title
      // position fixed
      height 1rem
      line-height 1rem
      background-color #09a2a3
      color #fff
      text-align center
      font-size 0.36rem
      font-weight 600
      letter-spacing 0.05rem
  .main-body
    padding 2.2rem  0.2rem 0.2rem  0.2rem 
    height 100vh
    box-sizing border-box
    overflow-y scroll 
    -webkit-overflow-scrolling touch
    .item
      background-color #fff
      box-sizing border-box
      border-radius 0.1rem
      margin-bottom 0.2rem
      overflow hidden
      .over-view
        width 100%
        height 1.5rem
        box-shadow 0 0.1rem  0.1rem #ccc
        padding 0.1rem
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        .over-view-contact
          display flex
          align-items center
          .img-box
            display inline-block
            width 1rem
            height 1rem
            border-radius 50%
            margin-right 0.1rem
            overflow hidden
            img   
              width 100%
              height 100%
          .name
            display flex
            flex-direction column
            .name-text
              font-weight 600
              font-size 0.32rem
            .name-time
              font-size 0.24rem
              color #666  
            .com-info
              dd
                font-size 0.2rem
                color #000
                .cancel
                  color black
                  font-size 0.15rem
                  background-color #000
                  padding 0.02rem  0.1rem
                  border-radius 0.2rem 
                  color #fff
                &.state
                  color #d2d2d2      
        .res-state
          font-size 0.28rem
          .res-state-c
            color #09a3a3  
          .triangle
            display inline-block
            width 0.3rem
            height 0.3rem
            border 1px solid #09a3a3  
            border-radius 50%  
            vertical-align middle
            margin 0 0.2rem
            background url(../../../assets/icon/userCenter/triangle-blue.png) no-repeat  center
            background-size 90%
            transition 0.3s
            transform rotate(0deg) 
            &.active
              transform rotate(180deg)
      .item-detail
        padding 0.1rem
        margin-top 0.1rem
        .top
          font-size 0.32rem
          display flex
          // justify-content space-start
          // padding-bottom 0.2rem
          .top-title
            flex 0 0  25%
            color #666
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
            display flex
            justify-content flex-start 
            img 
              width 100%
              height 100%
        .bot
          display flex
          justify-content space-between 
          margin 0.3rem 0
          .bottom-contact
            display flex
            flex-direction column
          .bot-phone
            color #999
            font-size 0.24rem
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
        .res-name
          display flex
          justify-content space-between
          margin-bottom 0.1rem
          .res-name-box
            display flex
            align-items center
            .res-name-avatar
              display inline-block
              width 0.6rem
              height 0.6rem
              border-radius 50%
              overflow hidden
              margin-right 0.1rem
              img 
                width 100%
                height 100%
            .res-name-text
              color black
              font-weight 600  
        .res-content
          font-size 0.24rem
          color #000     
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
  .show-img
    position absolute
    width 100vw
    height 100vh
    top 0
    left 0
    background-color rgba(0,0,0,0.8)
    display flex
    justify-content center
    align-items center
    overflow-y auto
    -webkit-overflow-scrolling touch
    z-index 10
    .show-img-box
      width 100%
      max-height 100%
      img 
        width 100%
        height 100%           
        
</style>

