<template>
  <div id="mysubWrapper">

    <!-- <div class="search">
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
    </div> -->

    <KeywordSearch
      @submit='contentScreen'
      :areaDataList='area'
      :keyworDataList='keywordArr'
    />

    <section class="main-body">
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
    <follow-tip v-if="subscribe == 0" :openState="followPopState" @closeFollowTip="closeFollowTip"/>
  </div>
</template>
<script>
import KeywordSearch from "./model/KeywordSearch-T";
// import SearchList from "./model/SearchList";
import DataItem from "./model/DataItemT";
import PopDetail from "./model/PopDetail";
import NoContent from "./pages/01_noContent";
import { InfiniteScroll } from "mint-ui";
// import SelectList from "@/components/common/SelectList";
import CommonFn from "./common";
import FollowTip from '@/components/common/FollowTip';

export default {
  directives: { InfiniteScroll },
  data() {
    return {
      userInfo:this.$store.state.loginInfo.userInfo,

      subscribe:1,
      followPopState:false,

      isImmediateCheck: false,
      loading: undefined,
      count: [], //当日匹配的数据总数
      content: "", //详情页面的内容
      isLimit: true, //用户是否达到2条查看限制
      isShowAreaOrKeyword: "", //显示区域搜索或是关键搜索的标识
      isShowDetail: "", //显示详情弹窗或是显示限制只读两条弹窗，'detail' / 'limit'
      detailData: {}, //传给详情弹窗的数据
      savedKeyword: {}, //保存本页面拿到的设置的关键词
      // createdTime: "", //关键词设置的时间
      token: "",
      mergeData: [], 
      mergeNum: [],
      newPostData: {},
      isHasKeyword: true,
      i: 0, //做为是否滚动到顶部的标记
      keywordArr: [{ label: "全部" }],
      area: [
        {
          id: 0,
          label: "全国"
        },
        {
          id: 1,
          label: "北京市"
        },
        {
          id: 2,
          label: "天津市"
        },
        {
          id: 9,
          label: "上海市"
        },
        {
          id: 22,
          label: "重庆市"
        },
        {
          id: 3,
          label: "河北省"
        },
        {
          id: 4,
          label: "山西省"
        },
        {
          id: 6,
          label: "辽宁省"
        },
        {
          id: 7,
          label: "吉林省"
        },
        {
          id: 8,
          label: "黑龙江省"
        },
        {
          id: 10,
          label: "江苏省"
        },
        {
          id: 11,
          label: "浙江省"
        },
        {
          id: 12,
          label: "安徽省"
        },
        {
          id: 13,
          label: "福建省"
        },
        {
          id: 14,
          label: "江西省"
        },
        {
          id: 15,
          label: "山东省"
        },
        {
          id: 16,
          label: "河南省"
        },
        {
          id: 17,
          label: "湖北省"
        },
        {
          id: 18,
          label: "湖南省"
        },
        {
          id: 19,
          label: "广东省"
        },
        {
          id: 21,
          label: "海南省"
        },
        {
          id: 23,
          label: "四川省"
        },
        {
          id: 24,
          label: "贵州省"
        },
        {
          id: 25,
          label: "云南省"
        },
        {
          id: 27,
          label: "陕西省"
        },
        {
          id: 28,
          label: "甘肃省"
        },
        {
          id: 29,
          label: "青海省"
        },
        {
          id: 32,
          label: "台湾省"
        },
        {
          id: 5,
          label: "内蒙古自治区"
        },
        {
          id: 20,
          label: "广西壮族自治区"
        },
        {
          id: 26,
          label: "西藏自治区"
        },
        {
          id: 30,
          label: "宁夏回族自治区"
        },
        {
          id: 31,
          label: "新疆维吾尔自治区"
        }
        // {
        //   id: 33,
        //   label: "澳门"
        // },
        // {
        //   id: 34,
        //   label: "香港"
        // }
      ]
    };
  },
  components: {
    DataItem,
    KeywordSearch,
    PopDetail,
    // SearchList,
    NoContent,
    // SelectList
    FollowTip,
  },

  async created() {
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

    closeFollowTip(){
      this.followPopState = false;
    },

    selectedData(d) {
      console.log(`==selectedData=====`, d);
    },
    async contentScreen(obj) {
      if (obj["area"]) {
        let tem = [];
        let i = 0;
        for (let j = 0, len = this.area.length; j < len; j++) {
          let flag = obj["area"].includes(this.area[j].label);

          if (flag) {
            tem.push(this.area[j].id);
            i++;
          }
          if (i === obj["area"].length) {
            break;
          }
        }

        this.newPostData.BidsAreaID = tem.join() === "" ? "" : tem.join();
      } else {
        this.newPostData.Title =
          obj["keyword"].join() === "" ? "" : obj["keyword"].join();
      }

      this.i = 0;
      this.loading = false;
      this.newPostData.page = 1;

      let res = await this.fetchData(this.$api.postToken, this.newPostData);
      this.isShowAreaOrKeyword = "";

      if (!res) {
        this.mergeData = [];
        this.isShowAreaOrKeyword = "";
        return;
      }

      this.sortDate(res.dataArr, "0");
      this.mergeData = res.dataArr;

      this.mergeData.forEach(item => {
        if (item[1].length > 1) {
          this.sortDate(item[1], "EndDate");
        }
      });

      console.log(`==keySearch=====`, this.mergeData);
    },

    async getSubKeyword() {
      let { data } = await this.$axios.get(`${this.$api.setSubKeyword}`, {
        params: {
          token: this.token
        }
      });

      if (data.message === false) {
        this.isHasKeyword = false;
        return;
      }

      // this.createdTime = data.data_dict.create_time;
      data.area.forEach(a => {
        this.area.forEach(b => {
          if (a.id === b.id) {
            b["active"] = true;
          }
        });
      });

      let keyword = data.data_dict.keywords_array;
      if (keyword) {
        let arrKeyword = keyword.split(",");
        arrKeyword.forEach((item, index) => {
          let obj = {};
          obj["label"] = item;
          obj["active"] = true;
          this.keywordArr.push(obj);
        });
      }

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
        // Title: "",
        Title: this.savedKeyword.Title,
        BidsAreaID: this.savedKeyword.BidsAreaID
      };
      let res = await this.fetchData(this.$api.postToken, this.newPostData);

      if (!res) {
        return;
      }

      this.sortDate(res.dataArr, "0");
      // this.sortDate(res.countArr, "0");
      res.dataArr.forEach(item => {
        if (item[1].length > 1) {
          this.sortDate(item[1], "EndDate");
        }
      });

      this.mergeData = res.dataArr;
      // this.count = res.countArr;
    },

    async fetchData(url, data) {
      let res = await this.$axios.get(url, {
        params: data
      });

      if (res.data.message === "没有数据") {
        return;
      }

      if (res.data.end) {
        return;
      }

      let d = res.data.data;
      let countArr = Object.entries(res.data.datetime_count);
      let dataArr = [];

      for (let key in d) {
        let tem = [];
        tem[0] = key;
        tem[1] = d[key];
        dataArr.push(tem);
      }

      let now = new Date();
      dataArr.forEach(item => {
        item[1].forEach(obj => {
          if (new Date(obj.EndDate) < now) {
            obj.status = "1";
          }
        });
      });

      this.count = [];
      this.count = countArr;
      this.sortDate(this.count, "0");
      return { dataArr };
    },

    async loadMore() {
      this.loading = true;
      this.newPostData.page++;
      // let nowScrollTop = this.$refs.wrapper.scrollTop;
      let res = await this.fetchData(this.$api.postToken, this.newPostData);

      if (!res) {
        this.loading = true;
        return;
      }
      this.sortDate(res.dataArr, "0");
      let tem = [];
      this.mergeData.forEach(item => {
        tem.push(item[0]);
      });

      res.dataArr.forEach(item => {
        if (tem.indexOf(item[0]) !== -1) {
          this.mergeData[tem.indexOf(item[0])][1] = this.mergeData[
            tem.indexOf(item[0])
          ][1].concat(item[1]);
        } else {
          this.mergeData.push(item);
        }
      });

      this.mergeData.push([]);
      this.mergeData.pop();

      this.mergeData.forEach(item => {
        this.sortDate(item[1], "EndDate");
      });

      this.loading = false;
      // this.$refs.wrapper.scrollTop = nowScrollTop - 100;
    },

    // async keySearch(keyword) {
    //   this.i = 0;
    //   this.loading = false;
    //   this.newPostData.page = 1;
    //   this.newPostData.Title = keyword;

    //   let res = await this.fetchData(this.$api.postToken, this.newPostData);
    //   console.log(`==1=====`, res);
    //   this.isShowAreaOrKeyword = "";

    //   if (!res) {
    //     this.mergeData = [];
    //     this.isShowAreaOrKeyword = "";
    //     return;
    //   }

    //   this.sortDate(res.dataArr, "0");
    //   this.mergeData = res.dataArr;

    //   this.mergeData.forEach(item => {
    //     if (item[1].length > 1) {
    //       this.sortDate(item[1], "EndDate");
    //     }
    //   });

    //   console.log(`==keySearch=====`, this.mergeData);
    // },

    // async areaSearch(areaIds) {
    //   this.i = 0;
    //   this.loading = false;
    //   let idArr = [];
    //   areaIds.forEach(item => {
    //     idArr.push(item.id);
    //   });
    //   if (idArr.length === 33) {
    //     this.newPostData.BidsAreaID = "";
    //   } else {
    //     this.newPostData.BidsAreaID = idArr.join();
    //   }
    //   this.newPostData.page = "1";
    //   console.log(`====areaSearch= 1==`, this.newPostData);

    //   let res = await this.fetchData(this.$api.postToken, this.newPostData);
    //   console.log(`=areaSearch== 2====`, res);
    //   this.isShowAreaOrKeyword = "";

    //   if (!res) {
    //     console.log(`=====没有数据==`);
    //     this.mergeData = [];
    //     this.isShowAreaOrKeyword = "";
    //     return;
    //   }

    //   this.sortDate(res.dataArr, "0");

    //   this.mergeData = res.dataArr;
    //   this.isShowAreaOrKeyword = "";

    //   this.mergeData.forEach(item => {
    //     if (item[1].length > 1) {
    //       this.sortDate(item[1], "EndDate");
    //     }
    //   });
    // },

    sortDate(d, sortProperty) {
      return d.sort((a, b) => {
        return new Date(b[sortProperty]) - new Date(a[sortProperty]);
      });
    },

    async showDetail(item) {

      let detailContent = await CommonFn.showDetail(item.id, this.token);
      if (detailContent) {
        this.isShowDetail = "detail";
        this.content = detailContent;
        this.detailData = item;
      } else {
        this.isShowDetail = "limit";
      }

      // console.log(`=======`, item);
      // this.detailData = item;
      // this.$axios
      //   .get(`${this.$api.detailContent}${item.id}/`, {
      //     params: {
      //       token: this.token
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.message === false) {
      //       this.isShowDetail = "limit";
      //     } else {
      //       this.isShowDetail = "detail";
      //       console.log(`==sdfsdf=====`, item);
      //       this.detailData = item;
      //       let reg = /class=".*?"|id=".*?"/g;
      //       this.content = res.data.BidsContent[0].replace(reg, "");
      //       // this.content = res.data.BidsContent[0];
      //     }
      //   });
    },

    closePop() {
      this.isShowDetail = "";
    }
    // showSelectArea() {
    //   this.isShowAreaOrKeyword === "area"
    //     ? (this.isShowAreaOrKeyword = "")
    //     : (this.isShowAreaOrKeyword = "area");
    // },
    // showSelectKeyword() {
    //   this.isShowAreaOrKeyword === "keyword"
    //     ? (this.isShowAreaOrKeyword = "")
    //     : (this.isShowAreaOrKeyword = "keyword");
    // }
  }
};
</script>


<style lang="stylus" scoped>
#mysubWrapper
  width 100%
  height 100vh
  background-color #f3f3f3
  padding 0 0.1rem 2rem 0.1rem
  box-sizing border-box
  position relative
  overflow hidden
  .search
    position absolute 
    width 100%
    top 0
    left 0
    height 1rem
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
    height 100%
    overflow hidden
    padding-top 1.2rem
    box-sizing border-box
    #mySubscript
      width 100%
      height 100%
      background-color #f3f3f3
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
