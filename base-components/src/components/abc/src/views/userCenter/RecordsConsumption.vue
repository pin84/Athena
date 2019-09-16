<template>
  <div id="records-consumption">
    <div class="top">
      <p class="top-title" @click="getTime"># 上下链 # 账单</p>
      <p class="top-overview">
        <span class="overview">
          <p>
            <span>支出(元)</span>
            <span>收入(元)</span>
          </p>
          <p>
            <span class="money">2455</span>
            <span class="money">2148</span>
          </p>
        </span>
        <span class="screen" @click="screenType">筛选</span>
      </p>
    </div>
    <SelectList :dataList="typeList" :isShow="isShowSelectList" @listenFn="listenFn" />

    <ul class="list">
      <li class="item" v-for="(item,index) in recordsList" :key="index">
        <span class="avatar-box">
          <img :src="item.avatar" alt />
        </span>
        <div class="detail">
          <span>
            <p class="name">{{item.username}}</p>
            <p>充值</p>
          </span>
          <span>
            <p>2019-08-01 21:14</p>
            <p class="money">+188.88</p>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import SelectList from "./modules/SelectList";
export default {
  data() {
    return {
      startTime: null,
      isShowSelectList: false,
      typeList: ["起止时间", "充值", "短信消费", "短信退款", "海报分享新用户"],
      recordsList: [
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        },
        {
          avatar:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132",
          username: "伊谢尔伦的风"
        }
      ]
    };
  },
  components: {
    SelectList
  },
  created() {
    this.initData();
  },
  methods: {
    getTime() {
      console.log(`=======`, this.startTime);
    },
    // we run {"username":"伊谢尔伦的风","user_id":608,"headimgUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/zOZ9wWKyQXNsqE9UDicgfRVmh1ySE9vuJ5icZGRrJ66qfCPEUUfI152bAzYlcIvqg8LkYQ2aUAoyrAHcK9NGibuJw/132","endUrl":"www.shangxialian.net/?#/records-consumption","endUrlName":"消费记录","mainEndUrlName":"用户中心"}
    async initData() {},
    //监听子组件的方法，
    async listenFn(val) {
      this.isShowSelectList = false;
      console.log(`==o====`, val);

      // let res = await this.$axios.get();
    },

    async getData(url, d) {
      let res = await this.$axios.get(url, { params: data });
      return res;
    },
    screenType() {
      this.isShowSelectList = !this.isShowSelectList;
    }
  }
};
</script>


<style lang="stylus" scoped>
.df
  display flex
  justify-content center
  align-items center
#records-consumption
  width 100%
  height 100vh
  font-size 0.28rem
  overflow hidden
  .top
    width 100%
    height 20%
    background-color #fff
    .top-title
      width 100%
      height 1.2rem
      line-height 1.2rem
      background-color #49a0a2
      text-align center
      font-size 0.48rem
      color #fff
    .top-overview
      display flex  
      justify-content space-around
      padding 0.1rem 0.2rem
      .overview
        flex 0 0 80%
        p
          width 100%
          display flex
          span 
            width 50%
            color #666
            &.money
              font-weight 600
              color black
      .screen
        @extend .df
        width 100% 
        color #666 
  .list
    background-color #fff
    margin-top 0.2rem
    width 100%
    height 80%
    box-sizing border-box
    overflow-y scroll  
    padding-bottom 1.3rem 
    .item
      display flex

      .avatar-box
        @extend .df
        display inline-block
        // width 1rem
        // height 1rem
        flex 0 0 1rem
        margin 0.1rem 0.3rem
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
      .detail
        @extend .df 
        justify-content space-between
        padding-right 0.2rem
        width 100%
        color #666
        border-bottom 1px solid #ccc
        .money,.name
          font-weight 600
          color #000
        .name
          font-size 0.32rem
        
</style>
