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
        <KeywordSearch @keySearch="keySearch" />
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
          infinite-scroll-immediate-check='isImmediateCheck'
          v-if="mergeData.length !== 0"
          ref="ul"
          id="tt"
        >
          <div
            v-for="(val,index) in mergeData"
            :key="index"
          >
            <div class="title">
              <span>推送时间：{{val[0]}}</span>
              <span>当日匹配 ：{{count[index]}}</span>
            </div>
            <DataItem
              :pData='val[1]'
              @showDetail='showDetail'
            />
          </div>
        </ul>

        <ul v-else>
          您的订阅关键词和区域暂无数据，请去订阅设置更换条件试试
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
import DataItem from "./model/DataItemT";
// import DataItemAK from "./model/DataItemAK";
import PopDetail from "./model/PopDetail";
import NoContent from "./pages/01_noContent";
import { InfiniteScroll } from "mint-ui";
import lodash from "lodash";
import { TLSSocket } from "tls";
import { Promise } from "q";
export default {
  directives: { InfiniteScroll },
  data() {
    return {
      isImmediateCheck: false,
      loading: undefined,
      count: [], //当日匹配的数据总数
      content: "", //详情页面的内容
      isLimit: true, //用户是否达到2条查看限制
      isHasSubContent: true, //是否有订阅的内容
      isShowAreaOrKeyword: "", //显示区域搜索或是关键搜索的标识
      isShowKeyworSearch: false, //是否显示关键词搜索
      isShowSearchList: false, //是否显示选择区域
      isShowDetail: "", //显示详情弹窗或是显示限制只读两条弹窗，'detail' / 'limit'
      detailData: {}, //传给详情弹窗的数据
      isShowSearch: false, //是否显示选择区域
      isShowSelectKeyword: false, //是否显不选择关键词
      resultData: [], //
      savedKeyword: {}, //保存本页面拿到的设置的关键词
      resKeyArr: [],
      createdTime: "", //关键词设置的时间
      token: "",
      mergeData: [],
      mergeNum: [],
      pastNum: "",
      isHasData: false,
      new_date: "", //保存最新的日期
      dataFrom: "init",
      dataFromAreaOrKeyword: [],
      newPostData: {},
      isHasKeyword: true
      // keywords: ""
    };
  },
  components: {
    DataItem,
    KeywordSearch,
    PopDetail,
    SearchList,
    NoContent
    // DataItemAK
  },

  created() {
    this.token = this.$store.state.loginInfo.userInfo.token;
    let { id } = this.$route.query;
    if (id) {
      this.showDetail(this.$route.query);
    }
    this.getSubKeyword();
  },

  methods: {
    async getSubKeyword() {
      let { data } = await this.$axios.get(`${this.$api.setSubKeyword}`, {
        params: {
          token: this.token
        }
      });

      if (data.message === false) {
        this.isHasKeyword = false;
        this.dataFrom = "";
        return;
      }

      this.createdTime = data.data_dict.create_time;

      let d = {
        BidsAreaID:
          data.data_dict.areas_id === "0" ? "" : data.data_dict.areas_id,
        Title: data.data_dict.keywords_array,
        page: "1",
        page_size: 24,
        token: this.token,
        set_time: data.data_dict.remind_long_time
      };
      this.savedKeyword = d;

      // this.keywords = data.data_dict.keywords_array;
      // this.keySearch(this.keywords);
      //  let a = await this.firstFetch(
      //       this.$api.mySubscript,
      //       this.savedKeyword
      //     );

      let first = localStorage.getItem("setFirstRequestTime");
      if (first === null) {
        console.log(`=======`, first);
        let a = await this.firstFetch(this.$api.mySubscript, this.savedKeyword);
        let now = new Date();
        localStorage.setItem("setFirstRequestTime", now);
      } else {
        let tem = localStorage.getItem("setFirstRequestTime");
        let secondReq = new Date();
        if (
          secondReq.getTime() - new Date(tem).getTime() >
          1000 * 60 * 60 * 24
        ) {
          console.log(`===secondReq====`);
          let a = await this.firstFetch(
            this.$api.mySubscript,
            this.savedKeyword
          );
          localStorage.setItem("setFirstRequestTime", secondReq);
        }
        console.log(`===secondReq==不请求老接口==`);
      }

      setTimeout(async () => {
        this.initData();
      }, 200);
    },

    async initData() {
      if (!this.isHasKeyword) {
        return;
      }

      this.newPostData = {
        token: this.token,
        page: "1",
        Title: this.savedKeyword.Title,
        BidsAreaID: this.savedKeyword.BidsAreaID
      };

      let res = await this.fetchData(this.$api.postToken, this.newPostData);


      if (!res) {
        this.dataFrom = "";
        return;
      }

      res.d.forEach(item => {
        this.mergeData.unshift(item);
      });

      this.count = res.count;
    },

    async fetchData(url, data) {
      let res = await this.$axios.get(url, {
        params: data
      });
      console.log(`===fetchData====`,res.data);

      if (res.data.message === "没有数据") {
        return;
      }

      if (res.data.end) {
        return;
      }

      



      let d = Object.entries(res.data.data);
      d.forEach(item => {
        if (item[1].length > 1) {
          item[1].sort((a, b) => {
            return new Date(b.EndDate) - new Date(a.EndDate);
          });
        }
      });

      let tem = Object.entries(res.data.time_count);

      let count = [];
      tem.forEach(item => {
        count.push(item[1]);
      });

      // let count = res.data.time_count;

      return { d, count };
    },

    async loadMore() {
      this.loading = true;
      this.newPostData.page++;

      console.log(`=======`, this.newPostData.page);
      let res = await this.fetchData(this.$api.postToken, this.newPostData);
      if (!res) {
        this.loading = true;
        return;
      }

      let tem = res.d;
      res.count.forEach(item => {
        this.count.push(item);
      });
      this.count = Array.from(new Set(this.count));

      console.log(`===more====`, this.count);
      let obj1 = {};
      this.mergeData.forEach(item => {
        obj1[item[0]] = item[1];
      });

      tem.forEach(item => {
        if (obj1[item[0]]) {
          obj1[item[0]] = obj1[item[0]].concat(item[1]);
        } else {
          obj1[item[0]] = item[1];
        }
      });

      this.mergeData = [];
      this.mergeData = Object.entries(obj1);

      this.mergeData.forEach(item => {
        item[1].sort((a, b) => {
          return new Date(b.EndDate) - new Date(a.EndDate);
        });
      });

      console.log(`===b====`, this.mergeData);

      this.loading = false;

      // return;
      // if (this.dataFrom === "init") {
      // } else {
      //   this.loading = true;
      //   let url = `${this.$api.mySubscript}`;
      //   this.savedKeyword.page++;
      //   let res = await this.firstFetch(url, this.savedKeyword);
      //   if (!res) {
      //     this.loading = true;
      //     return;
      //   }
      //   if (res.d.length === 0) {
      //     this.$toast("没有更多数据了");
      //     this.loading = true;
      //     return;
      //   }

      //   let last = this.dataFromAreaOrKeyword[
      //     this.dataFromAreaOrKeyword.length - 1
      //   ];
      //   let first = res.d[0];
      //   if (last[0] === first[0]) {
      //     let tem = res.d.shift();
      //     tem[1].forEach(item => {
      //       last[1].push(item);
      //     });
      //     res.count.shift();
      //   }

      //   this.dataFromAreaOrKeyword = this.dataFromAreaOrKeyword.concat(res.d);
      //   this.dataFromAreaOrKeyword.forEach(item => {
      //     item[1].sort((a, b) => {
      //       return new Date(b.EndDate) - new Date(a.EndDate);
      //     });
      //   });
      //   this.count = this.count.concat(res.count);
      //   this.loading = false;
      // }
    },

    async keySearch(keyword) {
      let ul = this.$refs.ul;
      let tt = document.getElementById("tt");
      tt.scrollTop = 200;

      this.newPostData.page = 1;
      this.newPostData.Title = keyword;

      // let url = `${this.$api.mySubscript}`;
      // let res = await this.firstFetch(url, this.savedKeyword);

      console.log(`==keySearch data=====`, this.newPostData);

      let res = await this.fetchData(this.$api.postToken, this.newPostData);

      console.log(`==keySearch=====`,res);

      if (!res) {
        this.mergeData = [];
        this.isShowAreaOrKeyword = "";
        return;
      }
      if (res.d.length === 0) {
        this.dataFrom = "";
        this.isShowAreaOrKeyword = "";
        return;
      }

      this.mergeData = [];
      this.count = [];

      this.mergeData = res.d;
      this.count = res.count;

      this.isShowAreaOrKeyword = "";
    },

    async areaSearch(areaIds) {
      let idArr = [];
      areaIds.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length === 33) {
        this.newPostData.BidsAreaID = "";
      } else {
        this.newPostData.BidsAreaID = idArr.join();
      }

      this.newPostData.page = 1;

      // let url = `${this.$api.mySubscript}`;
      // let res = await this.firstFetch(url, this.savedKeyword);
      console.log(`===areaSearch data====`, this.newPostData);

      let res = await this.fetchData(this.$api.postToken, this.newPostData);
      if (!res) {
        this.mergeData = [];
        this.isShowAreaOrKeyword = "";
        return;
      }
      if (res.d.length === 0) {
        this.dataFrom = "";
        this.isShowAreaOrKeyword = "";
        return;
      }

      this.mergeData = res.d;
      this.count = res.count;

      this.isShowAreaOrKeyword = "";
    },

    async firstFetch(url, data) {
      if (data.BidsAreaID) {
        let tem0 = data.BidsAreaID.split(",");
        // if (tem0[0] === "0") {
        //   tem0.shift();
        // }
        data.BidsAreaID = tem0.join();
      }

      if (!data.Title) {
        delete data.Title;
      }
      if (data.BidsAreaID === "0" || !data.BidsAreaID) {
        // delete data.BidsAreaID;
        data.BidsAreaID = "";
      }

      let res = await this.$axios.get(url, {
        params: data
      });

      // if (res.data.message === false) {
      //   return;
      // }

      // if (res.data.state === false) {
      //   return;
      // }

      // let originData = Object.entries(res.data.content);
      // let originNum = Object.entries(res.data.num);

      // let toArr = [];
      // let countTem = [];

      // let cd = new Date(this.createdTime);
      // let create_time = cd.getTime() - 1000 * 60 * 60 * 24;
      // originData.forEach(item => {
      //   if (new Date(item[0]) > new Date(create_time)) {
      //     toArr.push(item);
      //   }
      // });

      // originNum.forEach(item => {
      //   if (new Date(item[0]) > new Date(create_time)) {
      //     countTem.push(item);
      //   }
      // });

      // toArr.sort((a, b) => {
      //   return new Date(b[0]) - new Date(a[0]);
      // });
      // countTem.sort((a, b) => {
      //   return new Date(b[0]) - new Date(a[0]);
      // });

      // let count = [];
      // countTem.forEach(item => {
      //   count.push(item[1]);
      // });

      // let now = new Date();
      // toArr.forEach(item => {
      //   item[1].forEach(obj => {
      //     if (new Date(obj.EndDate) < now) {
      //       obj.status = "1";
      //     }
      //   });
      // });

      // let d = toArr;
      // return { d, count };
    },

    _sort(arr, sortProperty) {
      return arr.sort(
        (a, b) => new Date(b[sortProperty]) - new Date(a[sortProperty])
      );
    },

    /**
     * 这个方法要先判断用户是否有认证企业，如果没有要限制只读两条
     * this.isShowDetail = 'limit'; 显示限制信息
     * this.isShowDetail = 'detail'; 显示内容详情
     * 等后台接口
     */
    showDetail(item) {
      this.detailData = item;
      this.$axios
        .get(`${this.$api.detailContent}${item.id}/`, {
          params: {
            token: this.token
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
