<template>
  <div id="mysubWrapper">
    <div class="search">
      <ul class="search-list">
        <li
          class="search-item"
          @click="showSelectArea"
        >数据来源筛选
          <img
            src="../../assets/icon/dingyue/icon-traiDown.png"
            class="vm r0"
            style="width: 0.14rem; height: 0.1rem; margin-left: 0.1rem; transition: all 0.2s;"
          >
        </li>
        <li
          id="pushBarId"
          class="search-item"
          @click="showSelectKeyword"
        >关键词筛选
          <img
            src="../../assets/icon/dingyue/icon-traiDown.png"
            class="vm r0"
            style="width: 0.14rem; height: 0.1rem; margin-left: 0.1rem; transition: all 0.2s;"
          >
        </li>
      </ul>

      <div
        class="searchBox"
        v-show="isShowAreaOrKeyword === 'area'"
      >
        <SearchList @search='areaSearch' />
      </div>

      <div
        class="searchBox"
        v-show="isShowAreaOrKeyword === 'keyword'"
      >
        <KeywordSearch @keySearch='keySearch' />
      </div>
    </div>

    <section class="main-body">
      <!-- <div v-if="!resultData">您设置的关键词暂无采招信息，请更换关键词试试</div> -->
      <!-- <NoContent v-if="resArr.length === 0" /> -->

      <div id="mySubscript">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-if="resultData !== undefined"
        >
          <div
            v-for="(val,index) in resultData"
            :key="index"
          >
            <div class="title">
              <span>推送时间：{{Object.keys(val)[0]}}</span>
              <span>当日匹配：{{count[index]}}</span>
            </div>
            <div
              v-for="(item,index) in Object.values(val)[0]"
              :key="index"
            >
              <DataItem
                :pData='item'
                @showDetail='showDetail(item)'
              />
            </div>
          </div>
        </ul>
        <ul v-else>
          您的订阅关键词和区域暂无数据，请更换条件试试
        </ul>
        <div
          class="subSetting"
          @click="$router.push('/setSub')"
        >
          <span class="bg">
            <span class="bg-inner"></span>
          </span>
          <span class="sub_text">订阅设置</span>
        </div>
      </div>
    </section>
    <PopDetail
      :detailData='detailData'
      :isShow='isShowDetail'
      @closePop='closePop'
      :content='content'
    />

  </div>
</template>
<script>
import KeywordSearch from "./model/KeywordSearch";
import SearchList from "./model/SearchList";
import DataItem from "./model/DataItem";
import PopDetail from "./model/PopDetail";
import NoContent from "./pages/01_noContent";
import { InfiniteScroll } from "mint-ui";
import lodash from "lodash";
import { TLSSocket } from "tls";
export default {
  directives: { InfiniteScroll },
  data() {
    return {
      loading: undefined,
      count: undefined, //当日匹配的数据总数
      content: "", //详情页面的内容
      areaAndKeyword: {
        areaid: "",
        keyword: ""
      }, //储存区域id和keyword
      isLimit: true, //用户是否达到2条查看限制
      isHasSubContent: true, //是否有订阅的内容
      isShowAreaOrKeyword: "", //显示区域搜索或是关键搜索的标识
      isShowKeyworSearch: false, //是否显示关键词搜索
      isShowSearchList: false, //是否显示选择区域
      isShowDetail: "", //显示详情弹窗或是显示限制只读两条弹窗，'detail' / 'limit'
      detailData: {}, //传给详情弹窗的数据
      isShowSearch: false, //是否显示选择区域
      isShowSelectKeyword: false, //是否显不选择关键词
      resultData: undefined, //
      savedKeyword: {}, //保存本页面拿到的设置的关键词
      pageNum: 1,
      resKeyArr: []
    };
  },
  components: {
    DataItem,
    KeywordSearch,
    PopDetail,
    SearchList,
    NoContent
  },

  created() {
    console.log(this.$route.query);
    this.initData();
    let { id } = this.$route.query;
    console.log(this.$route.query);

    if (id) {
      this.showDetail(this.$route.query);
    }
  },

  methods: {
    async initData() {
      let token = this.$store.state.loginInfo.userInfo.token;

      let savedKeyword = await this.$axios.get(`${this.$api.setSubKeyword}`, {
        params: {
          token
        }
      });

      console.log(`===savedKeyword====`, savedKeyword);

      let data = {
        BidsAreaID: savedKeyword.data.data_dict.areas_id,
        Title: savedKeyword.data.data_dict.keywords_array,
        page: "1",
        page_size: 24
      };

      this.savedKeyword = data;
      let url = `${this.$api.mySubscript}`;
      let res = await this.fetchData(url, this.savedKeyword);

      this.resultData = res.contentArr;
      this.count = res.numArr;
    },

    async loadMore() {
      if (Object.keys(this.savedKeyword).length === 0) {
        return;
      }

      let url = `${this.$api.mySubscript}`;
      this.pageNum++;
      this.savedKeyword.page = this.pageNum;

      let res = await this.fetchData(url, this.savedKeyword);
      if (!res) {
        this.loading = true;
        return;
      }

      let resFisr = res.contentArr[0];
      let resultDataLast = this.resultData[this.resultData.length - 1];
      let resFirstKey = Object.keys(resFisr)[0];
      let resultDataLastKey = Object.keys(resultDataLast)[0];

      let obj = {};
      let tem = [];
      let numRest = [];
      if (resFirstKey === resultDataLastKey) {
        tem = resFisr[resFirstKey].concat(resultDataLast[resultDataLastKey]);
        let tem_0 = [];
        let tem_1 = [];
        let now = new Date();
        tem.forEach(con => {
          if (now > new Date(con.EndDate)) {
            tem_1.push(con);
          } else {
            tem_0.push(con);
          }
        });
        tem = tem_0.concat(tem_1);

        obj[resFirstKey] = tem;
        numRest = res.numArr.slice(1);
      }
      // this.resultData[this.resultData.length - 1] = obj;

      this.resultData.pop();
      this.resultData.push(obj);

      // this.resultData = JSON.parse(JSON.stringify(this.resultData));
      let rest = res.contentArr.slice(1);

      rest.forEach(item => {
        this.resultData.push(item);
      });

      numRest.forEach(i => {
        this.count.push(i);
      });
    },

    async keySearch(keyword) {
      let arr = [];
      let tem = [];

      keyword.forEach((item, index) => {
        if (item.kw !== "全部") {
          tem.push(item.kw);
        }
        if (item.active) {
          arr.push(item.kw);
        }
      });

      if (arr[0] === "全部") {
        this.savedKeyword.Title = tem.join();
      } else {
        this.savedKeyword.Title = arr.join();
      }
      let url = `${this.$api.mySubscript}`;

      let res = await this.fetchData(url, this.savedKeyword);

      if (!res) {
        this.isShowAreaOrKeyword = "";
        return this.$toast("所选的关键词和区域没有相关数据，请更换条件试试");
      }

      this.resultData = res.contentArr;
      this.count = res.numArr;
      this.isShowAreaOrKeyword = "";
    },

    async areaSearch(area) {
      console.log(`====sdfsfd===`, area);
      let arr = [];
      Object.values(area).forEach(item => {
        arr.push(item.id);
      });

      this.savedKeyword.BidsAreaID = arr.join();
      let url = `${this.$api.mySubscript}`;

      let res = await this.fetchData(url, this.savedKeyword);
      if (!res) {
        this.isShowAreaOrKeyword = "";
        return this.$toast("所选的关键词和区域没有相关数据，请更换条件试试");
      }

      this.resultData = res.contentArr;

      this.count = res.numArr;
      this.isShowAreaOrKeyword = "";
    },

    async fetchData(url, data) {
      if (!data.Title) {
        delete data.Title;
      }
      if (data.BidsAreaID === "0" || !data.BidsAreaID) {
        delete data.BidsAreaID;
      }

      let res = await this.$axios.get(`${this.$api.mySubscript}`, {
        params: data
      });

      if (res.data.message === false) {
        return;
      }

      

      if (res.data.state === false) {
        this.$toast("没有更多数据了");
        return;
      }

      let content = res.data.content;
      let num = res.data.num;
      let numArr = [];
      let dateArr = Object.keys(num).sort((a, b) => {
        return new Date(b) - new Date(a);
      });
      let contentArr = [];
      let now = new Date();

      dateArr.forEach(item => {
        numArr.push(num[item]);
        if (content[item].length === 1) {
          let obj = {};
          obj[item] = content[item];
          contentArr.push(obj);
        } else {
          let tem = [];
          let temObj = {};
          let tem_0 = [];
          let tem_1 = [];
          content[item].forEach(con => {
            if (now > new Date(con.EndDate)) {
              con.status = "1";
              tem_1.push(con);
            } else {
              tem_0.push(con);
            }
          });
          tem = tem_0.concat(tem_1);
          temObj[item] = tem;
          contentArr.push(temObj);
        }
      });

      return { numArr, contentArr };

    },

    /**
     * 这个方法要先判断用户是否有认证企业，如果没有要限制只读两条
     * this.isShowDetail = 'limit'; 显示限制信息
     * this.isShowDetail = 'detail'; 显示内容详情
     * 等后台接口
     */
    showDetail(item) {
      this.detailData = item;
      let token = this.$store.state.loginInfo.userInfo.token;

      this.$axios
        .get(`${this.$api.detailContent}${item.id}/`, {
          params: {
            token
          }
        })
        .then(res => {
          if (res.data.message === false) {
            this.isShowDetail = "limit";
          } else {
            this.isShowDetail = "detail";
            this.detailData = item;
            let reg = /class=".*?"|id=".*?"/g;
            this.content = res.data.BidsContent[0].replace(reg, "");
            // this.content = res.data.BidsContent[0];
          }
        });
    },
    closePop() {
      this.isShowDetail = "";
    },
    showSelectArea() {
      this.isShowAreaOrKeyword === "area"
        ? (this.isShowAreaOrKeyword = "")
        : (this.isShowAreaOrKeyword = "area");
    },
    showSelectKeyword() {
      this.isShowAreaOrKeyword === "keyword"
        ? (this.isShowAreaOrKeyword = "")
        : (this.isShowAreaOrKeyword = "keyword");
    }
  }
};
</script>

<style lang="stylus" scoped>
#mysubWrapper
  width 100%
  height 100%
  background-color #f3f3f3
  position relative
  .search
    width 100%
    .search-list
      width 100%
      display flex
      height 1rem
      justify-content space-around
      align-items center
      box-sizing border-box
      background-color #fff
    .search-item
      width 40%
      height 0.5rem
      line-height 0.5rem
      text-align center
      border 1px solid #ccc
      font-size 0.24rem
    .searchBox
      position absolute
      top 1rem
      bottom 0
      left 0
      right 0
      z-index 3
  .main-body
    height 76vh
    // overflow-y auto    
    #mySubscript
      width 100%
      height 76vh
      background-color #f3f3f3
      padding 0.2rem  0.2rem 0rem 0.2rem
      overflow-y scroll 
      -webkit-overflow-scrolling touch
      box-sizing border-box
      .title  
        display flex
        justify-content space-between
        color #666666
        font-size 0.26rem
        padding-bottom 0.1rem
      .subSetting
        position fixed 
        right 0
        bottom 1.2rem
        width 1.9rem
        height 0.8rem
        background-color #09a2a3
        border-radius 0.4rem 0rem 0rem 0.4rem
        text-align right
        padding-right 0.11rem
        display flex
        justify-content center
        align-items center
        z-index 1
        .bg,.bg-inner
          display inline-block
          width 0.6rem
          height 0.6rem
          background-color #ffffff
          border-radius 50%
          &.bg-inner
            background url(../../assets/icon/dingyue/gear@20.png) center no-repeat
            background-size 0.37rem 0.37rem
        .sub_text
          color #ffffff
          font-size 0.24rem
          margin-left 5px


</style>
