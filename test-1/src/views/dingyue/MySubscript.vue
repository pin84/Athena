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

      <div
        id="mySubscript"
        ref="wrapper"
      >

        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check='isImmediateCheck'
          v-if="mergeData.length !== 0"
        >
          <div
            v-for="(val,index) in mergeData"
            :key="index"
          >

            <div class="title">
              <span> 推送时间：{{val[0]}}</span>
              <span>当日匹配：{{count[index][1]}} </span>
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
      isImmediateCheck: true,
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
      isHasKeyword: true,
      i: 0,//做为是否滚动到顶部的标记
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

  updated: function() {
    if (this.i === 0) {
      this.$nextTick(() => {
        this.$refs.wrapper.scrollTop = 0;
        this.i++;
      });
    }
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
      console.log(`====11===`, this.newPostData);
      let res = await this.fetchData(this.$api.postToken, this.newPostData);

      console.log(`===2====`, res);

      if (!res) {
        this.dataFrom = "";
        return;
      }

      let d = Object.entries(res.d);
      let c = Object.entries(res.count);
      this.sortDate(d, "0");

      d.forEach(item => {
        this.sortDate(item[1], "EndDate");
        this.mergeData.push(item);
      });

      c.forEach(item => {
        this.count.push(item);
      });
      this.sortDate(this.count, "0");
    },

    async fetchData(url, data) {
      let res = await this.$axios.get(url, {
        params: data
      });
      console.log(`===fetchData====`, res);

      if (res.data.message === "没有数据") {
        return;
      }

      if (res.data.end) {
        return;
      }

      let d = res.data.data;
      let now = new Date();
      Object.values(d).forEach(item => {
        item.forEach(obj => {
          if (new Date(obj.EndDate) < now) {
            obj.status = "1";
          }
        });
      });
      let count = res.data.time_count;

      return { d, count };
    },

    async loadMore() {
      this.loading = true;
      this.newPostData.page++;
      console.log(
        `===loadMore data====`,
        this.newPostData.page,
        this.newPostData.Title
      );
      let nowScrollTop = this.$refs.wrapper.scrollTop;
      let res = await this.fetchData(this.$api.postToken, this.newPostData);

      if (!res) {
        this.loading = true;
        return;
      }
      console.log(`===more====`, tem, res.count);

      let tem = res.d;
      let c = res.count;
      let obj = {};
      this.count.forEach(item => {
        obj[item[0]] = item[1];
      });

      for (let key in c) {
        obj[key] = c[key];
      }

      let obj1 = {};
      this.mergeData.forEach(item => {
        obj1[item[0]] = item[1];
      });

      for (let key in tem) {
        if (obj1[key]) {
          obj1[key] = obj1[key].concat(tem[key]);
        } else {
          obj1[key] = tem[key];
        }
      }

      this.mergeData = Object.entries(obj1);
      this.mergeData.forEach(item => {
        this.sortDate(item[1], "EndDate");
      });
      this.count = Object.entries(obj);

      console.log(`====more 3===`, this.mergeData);

      // let ab = [];
      // this.mergeData.forEach(a => {
      //   a[1].forEach(b => {
      //     ab.push(b.id);
      //   });
      // });
      // console.log(`=======`, ab.length, new Set(ab));
      // console.log(`====more2===`, this.mergeData);

      this.loading = false;
      this.$refs.wrapper.scrollTop = nowScrollTop - 100;
    },

    async keySearch(keyword) {
      this.i = 0;
      this.loading = false;
      this.newPostData.page = 1;
      this.newPostData.Title = keyword;

      console.log(`==keySearch=====`, this.newPostData.Title);
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

      this.mergeData = Object.entries(res.d);
      this.sortDate(this.mergeData, "0");
      this.mergeData.forEach(item => {
        this.sortDate(item[1], "EndDate");
      });
      this.count = Object.entries(res.count);
      this.sortDate(this.count, "0");
      this.isShowAreaOrKeyword = "";
    },

    sortDate(d, sortProperty) {
      return d.sort((a, b) => {
        return new Date(b[sortProperty]) - new Date(a[sortProperty]);
      });
    },

    async areaSearch(areaIds) {
      this.i = 0;
      this.loading = false;
      let idArr = [];
      areaIds.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length === 33) {
        this.newPostData.BidsAreaID = "";
      } else {
        this.newPostData.BidsAreaID = idArr.join();
      }
      this.newPostData.page = "1";
      console.log(`====areaSearch===`, this.newPostData.BidsAreaID);

      let res = await this.fetchData(this.$api.postToken, this.newPostData);
      console.log(`=areaSearch======`, res);

      if (!res) {
        console.log(`=====没有数据==`);
        this.mergeData = [];
        this.isShowAreaOrKeyword = "";
        return;
      }

      if (res.d.length === 0) {
        console.log(`=====没有数据==`);
        this.dataFrom = "";
        this.isShowAreaOrKeyword = "";
        return;
      }
      this.mergeData = [];
      this.count = [];

      this.mergeData = Object.entries(res.d);
      this.sortDate(this.mergeData, "0");
      this.mergeData.forEach(item => {
        this.sortDate(item[1], "EndDate");
      });
      this.count = Object.entries(res.count);
      this.sortDate(this.count, "0");
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
            console.log(`==sdfsdf=====`, item);
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
    height 8.7rem
    // overflow-y auto  
    // padding-bottom 0.5rem 
    // border 1px solid red
    #mySubscript
      width 100%
      height 100%
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
