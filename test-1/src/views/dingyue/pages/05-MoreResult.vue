<template>
  <div
    id="app"
    class="main_bgcolor_f3f3f3 pos_res i-more-result"
  >
    <div class="mainbody">
      <div
        class="accurateSearchBox w main_bgcolor_ffffff bs_bb"
        style="height: 1.1rem;"
      >
        <div class=" w main_bgcolor_ffffff bs_bb">
          <div class="accurateSearchBox-show  pos_res">
            <p
              class="accurateSearchBox-s1"
              @click="showSelectArea"
            >
              <span class="vm">筛选</span>
              <i
                class="pointDown vm"
                style="transform: rotate(0deg);"
              ></i>
            </p>
            <div class="accurateSearchBox-s2 pos_res"><i class="searchLogo"></i>
              <form
                action=""
                onsubmit="return false;"
              >
                <input
                  type="text"
                  autocomplete="off"
                  placeholder="请输入关键词"
                  class="w"
                  v-model="searchKeyword"
                  @change='changeKeyword'
                >
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="search-list"
        v-show="isShowSearchList"
      >
        <SearchList @search='filtArea' />
      </div>

      <div
        id="scrollBox"
        class="w bs_bb accurateSearchBox-list"
      >
        <p class="accurateSearchBox-list-title fz_24">已选择区域：
          {{selectedArea || '全国'}}
        </p>
        <p
          class="accurateSearchBox-list-title fz_24"
          v-if="dataList"
        >
          收集到
          <span style="color: rgb(190, 2, 3);">
            {{resultNum || 0}}
          </span>条采标信息
        </p>

        <p
          class="accurateSearchBox-list-title fz_24"
          v-else
        >
          收集到
          <span style="color: rgb(190, 2, 3);">
            0
          </span>条采标信息,请更换搜索条件
        </p>

      </div>

      <div
        id="listWrapper"
        ref="wrapper"
      >
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li
            class="item"
            v-for='(item,index) in dataList'
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
        :isShow='isShowDetail'
        :detailData='detailData'
        @closePop='closeDetail'
        :content='content'
      />
    </div>

  </div>
</template>
<script>
import DataItem from "../model/DataItem";
import SearchList from "../model/SearchList";
import PopDetail from "../model/PopDetail";
import { InfiniteScroll } from "mint-ui";
import Commonjs from "../common";
export default {
  directives: { InfiniteScroll },
  data() {
    return {
      loading: false,
      content: "", //详情页的内容
      limit: false, //限制只读两条
      isShowDetail: "", //显示详情页面或是限制只读两条页面。'detail' or 'limit'
      detailData: {}, //传给详情页面的数据
      resultNum: "" || "", //结果条数
      selectedArea: "", //已选择的区域
      isShowSearchList: false, //是否显示筛选区域的列表
      searchKeyword: "", //当前搜索的关键词
      dataList: [
        // {
        //   BidsPirce: "",
        //   Title: "",
        //   Company: "",
        //   EndDate: "",
        //   status: ""
        // }
      ],
      searchData: {}, //保存由上一页面的Router传过来的搜索参数
      pageNum: 0,
      isToScrollTop: true
    };
  },

  async created() {
    let d = this.$route.query;
    let token = this.$store.state.loginInfo.userInfo.token;
    let data = {
      token: token,
      page: "1",
      page_size: "24",
      Title: d.morekey
    };

    this.searchData = data;
    this.searchKeyword = d.morekey;
    this.changeShare(this.searchKeyword);

    let { num, state_0, state_1 } = await this.getData(
      `${this.$api.keywordSearch}`,
      this.searchData
    );

    this.dataList = state_0.concat(state_1);
    this.resultNum = num;

    if (d.id) {
      // let { BidsPirce,Company,CreateTime,EndDate,Title,morekey,id } = d;
      this.showDetail(d);
    }
  },
  updated: function() {
    if (this.isToScrollTop) {
      this.$nextTick(() => {
        this.$refs.wrapper.scrollTop = 0;
        this.iisToScrollTop = false;
      });
    }
  },
  components: {
    DataItem,
    SearchList,
    PopDetail
  },
  methods: {
    async loadMore() {
      this.isToScrollTop = false;
      if (this.dataList.length === 0) {
        return;
      }
      this.loading = true;
      this.searchData.page++;
      console.log(`====legnth===`, this.searchData.page);
      let res = await this.getData(
        `${this.$api.keywordSearch}`,
        this.searchData
      );

      if (!res) {
        return;
      }

      this.dataList = this.dataList.concat(res.state_1);
      this.dataList = res.state_0.concat(this.dataList);
      this.loading = false;
    },

    // 动态改变分享链接信息
    changeShare(searchKeyword) {
      let user = this.$store.state.loginInfo.userInfo.username,
        title = `#上下链#  ${user}邀请你关注"${searchKeyword}" 采购招标商机`,
        desc = `#上下链#  采购招标商机自动推送平台-机会创造价值`;

      // 动态改变朋友圈描述 s
      this.$store.commit("setShareInfo", {
        title,
        desc
      });

      this.$store.commit("setFriendNetInfo", {
        title,
        desc
      });

      this.$router.push({
        path: "/moreResult",
        query: { morekey: searchKeyword }
      });

      // 动态改变朋友圈描述 e
    },

    async changeKeyword() {
      this.isToScrollTop = true;
      this.searchData.page = "1";
      this.searchData.Title = this.searchKeyword;

      this.changeShare(this.searchData.Title);

      let res = await this.getData(
        `${this.$api.keywordSearch}`,
        this.searchData
      );
      this.dataList = [];
      this.resultNum = 0;

      if (!res) {
        this.loading = true;
        return;
      }

      this.dataList = res.state_0.concat(res.state_1);
      this.resultNum = res.num;
      this.loading = false;
    },

    async getData(url, data) {
      let res = await this.$axios.get(url, { params: data });

      if (res.data.message === false) {
        this.dataList = [];
        this.resultNum = 0;
        this.$toast("所选的区域和关键词没有数据");
        return;
      }

      if (res.data.message === false) {
        return false;
      }
      if (res.data.state === false) {
        return false;
      }

      let now = new Date();
      let state_0 = [];
      let state_1 = [];
      res.data.data_dict.forEach(item => {
        if (now > new Date(item.EndDate)) {
          item.status = "1";
          state_1.push(item);
        } else {
          state_0.push(item);
        }
      });

      res.data.data_dict = state_0.concat(state_1);
      return { num: res.data.number, state_0, state_1 };
    },

    async filtArea(areas) {
      this.isToScrollTop = true;
      let tem = [];
      let ids = [];
      areas.forEach(item => {
        tem.push(item.label);
        ids.push(item.id);
      });
      if (tem[0] === "全国") {
        this.selectedArea = "全国";
      } else {
        this.selectedArea = tem.join();
      }

      this.searchData.BidsAreaID = ids.join();
      this.searchData.page = "1";
      this.isShowSearchList = !this.isShowSearchList;
      let res = await this.getData(
        `${this.$api.keywordSearch}`,
        this.searchData
      );
      this.dataList = [];
      this.resultNum = 0;
      if (!res) {
        this.$toast("没有数据");
        return;
      }
      this.dataList = res.state_0.concat(res.state_1);
      this.resultNum = res.num;
      this.loading = false;
    },

    showSelectArea() {
      this.isShowSearchList = !this.isShowSearchList;
    },

    async showDetail(item) {
      let res = await Commonjs.showDetail(item.id, this.searchData.token);
      if (res !== false) {
        this.detailData = item;
        this.isShowDetail = "detail";
        this.content = res;
      } else {
        this.isShowDetail = "limit";
      }
    },

    closeDetail() {
      this.isShowDetail = "";
    },
    closePop() {
      this.isShowDetail = "";
    }
  }
};
</script>
<style lang="stylus" scoped>
.i-more-result
  width 100%
  height 100% 
  overflow hidden
  background-color #f3f3f3
  padding-bottom 1rem
  box-sizing border-box
  .mainbody
    // height 100%
    padding-top 1rem
    #listWrapper
      height 77vh
      overflow-y scroll 
      -webkit-overflow-scrolling touch
      .item
        background-color #f3f3f3
        height 1.6rem
        // height 30vh
        padding 0.1rem  0.1rem 1rem 0.1rem 
        box-sizing border-box  
        margin-bottom 0.1rem 
    .search-list
      position absolute
      width 100%
      height 100%
      box-sizing border-box
      z-index 3

 .vm{
   font-size:0.32rem;
 }     

.accurateSearchBox-sel{
    height: 4.6rem;
    overflow: scroll;
}

.accurateSearchBox{
    position:fixed;
    top:0;
    left:0;    
    z-index:2;
    background-color:rgba(0,0,0,0.5);
    overflow:hidden;
    /*transition: height 0.1s*/
}

.accurateSearchBox>div{
    padding:0.2rem 0.3rem;
}
.accurateSearchBox-show {
    display: -webkit-box;
    -webkit-box-align: center;
    margin-bottom: 0.2rem;
}
.accurateSearchBox-s2>form{
    height:0.7rem;
    /*line-height:0.7rem;*/
    background-color:#e7e7e7;
    box-sizing:border-box;
    padding:0.1rem 0.1rem 0.1rem 0.68rem;
    display:block
}
.accurateSearchBox-s2>form>input{
    border:0;
    background-color:inherit;
    display:block;
    width:100%;
    height:100%;
    font-size:0.28rem
}
.accurateSearchBox-s1{
    width:1.12rem;
    height:0.7rem;
    line-height:0.7rem;
}
.accurateSearchBox-s2{
    -webkit-box-flex:1
}
.pointDown{
    display:inline-block;
    width:0.16rem;
    height:0.12rem;
    background:url('../../../assets/icon/dingyue/icon-traiDown.png') no-repeat center;
    background-size:100% 100%; 
    margin-left:0.1rem;
    transition: all 0.1s
}
.searchLogo{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    left:0.18rem;
    display:inline-block;
    width:0.38rem;
    height:0.38rem;
    background:url('../../../assets/icon/dingyue/icon-search.png') no-repeat center;
    background-size:100% 100%; 
}

.dialogBox{
  padding-bottom:1.5rem;
}
// .accurateSearch_sbox{
//     position:fixed;
//     bottom:0;
//     left:0;
//     height:1rem;
//     padding:0.15rem 0.2rem;
//     z-index:1
// }
// input[type=text]{
//     outline:none;
//     border:0;

// }
// .accurateSearch_sbox input{
//     width:75%;
//     background-color:#edecec
// }
// .accurateSearch_sbox>button{
//     width:20%;
//     text-align:center;
//     border-radius:0.08rem
// }
// .pcBtn1,.pcBtn2{
//     position: fixed;
//     top: 0.25rem;
//     padding: 0.1rem;
//     box-shadow: 2px 2px 2px #e2e2e2;
//     z-index: 1;
//     border: 2px solid #c4e3e3;
// }
// .pcBtn1{
//      right:20%;
//     border-radius:0.4rem;
    
// }
// .pcBtn2{
//      right:40%;
//      border-radius:50%
// }
// .pcBtn1 img,.pcBtn2 img{
//     width:0.6rem;
//     height:0.6rem;
//     border-radius:50%
// }
// .hot p{
//     padding:0.35rem 0 0.19rem
// }
// .hot ul.hotWord,.hot ul.historyWord{
//     padding:0.3rem 0;
//     /*display:flex;
//     flex-wrap:wrap;*/
// }
// .hot ul.hotWord>li{
//     width:30.666%;
//     height:0.8rem;
//     line-height:0.8rem;
//     text-align:center;
//     border-radius:0.08rem;
//     margin:0 4% 0.3rem 0
    
// }
// .hot ul.hotWord>li:nth-of-type(3n){
//     margin-right:0
// }
// .hot ul.hotWord>li>a{
//     border-radius:0.08rem;
// }
// .as_tips{
//     width:100%;
//     text-align:center;
//     padding:0.32rem 0.2rem;
//     color:rgb(128, 128, 128);
//     font-size:0.24rem
// }
// .sbgColor_f1ffff{
//     background-color:#f1ffff
// }
// .sbgColor_e4e4e4{
//     background-color:#e4e4e4
// }
// .hot ul.historyWord>li{
//     width:1.4rem;
//     height:0.6rem;
//     line-height:0.6rem;
//     text-align:center;
//     border-radius:0.08rem;
//     margin:0 0.2rem 0.3rem 0
    
// }
// .hot ul.historyWord>li>a{
//     border-radius:0.08rem;

// }
// .input_info{
//     padding:0.2rem 0.15rem;
//     background-color:#09a2a3;
//     color:#ffffff;
//     box-shadow:0 0 0.1rem 0 rgba(0,0,0,0.2);
//     border-radius:0.08rem;
//     box-sizing:border-box;
//     max-width:90%;
//     margin-top:0.4rem
// }
// .res_info{
//     padding-left:0.7rem;
//     margin-top:0.4rem
// }
// .res_info>img{
//     position:absolute;
//     top:0;
//     left:0;
//     width:0.57rem;
//     height:0.57rem;
//     border-radius:50%;

// }

// .index_list_r_list_t{
//     width: 100%;
//     overflow: hidden;
//     border-radius: 0.1rem;
// }
// .index_list_r_list_s{
//     margin-bottom:0.2rem;
//     border-radius:0.1rem;
// }
// .index_list_r_list_s>p{
//     margin:0.1rem 0;
//     font-size:0.26rem;
//     color:rgba(153,153,153,1);
// }
// .index_list_r_list_d{
//     box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);

// }
// .index_list_r_list_d_p1{
//     width:100%;
//     height:1.5rem;
//     margin:0 auto;
//     margin-bottom:0.1rem;
//     padding:0 0.33rem 0 0.1rem;
//     border-radius:0.1rem;
//     box-shadow:0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
//     position:relative;
//     display:-webkit-box; 							
// 	-webkit-box-pack:center;
// 	-webkit-box-align:center;
//     box-sizing:border-box;
//     background-color:#fff;
//     z-index:1;
    
// }
// .list_d_s1{
//       width:1.52rem;
//       height: 1.3rem;
//       position: relative;
//       // background: url('../image/item8-l-price.png') no-repeat center;
//       background-size: 100% 100%;
//       margin-right: 0.22rem;
// }
// .list_d_s1>p{
//         width:100%;
//         height:50%;
//         line-height:0.65rem;
//         text-align:center;
//         color:#fff;
//         font-size:0.22rem;

// }
// .list_d_s2{
//     -webkit-box-flex:1;
//     font-size:0.26rem;
//     line-height:1.4

// }
// .list_d_s2 > p.p1 {
//     line-height: 1.3;
//     color: #010101;
// }
// .list_d_s2 > p.p2 {
//     color: #333333;
// }
// .list_d_s2 ul {
//     line-height: 1.2;
//     color: #333333;
// }
// .list_d_s3{
//     position:absolute;
//     right:0;
//     top:50%;
//     transform:translateY(-50%);
//     height:1.14rem;
//     width:0.24rem;
//     // background:url('../image/stateTag-doing.png') no-repeat center;
//     background-size:100% 100%;

// }
// .watchMore{
//     width:100%;
//     height:0.8rem;
//     line-height:0.8rem;
//     background:rgba(255,255,255,1);
//     box-shadow:0 0 0.1rem 0 rgba(0,0,0,0.2);
//     border-radius:0.1rem
// }
// .nores{
//     box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
//      border-radius: 0.1rem;
// }


// .index_list_r_list_d_p2{
//     position:absolute;
//     top:0;
//     right: 0;
//     width: 40px;
//     height:1.5rem;
//     line-height:1.5rem;
//     background-color:#be0201;
//     color:#ffffff;
//     font-weight:bold;
//     text-align:center;
//     border-bottom-right-radius:0.1rem;
//     border-top-right-radius:0.1rem
// }
// .index_list_r_list_t{
//     width: 100%;
//     overflow: hidden;
//     border-radius: 0.1rem;
// }
// .index_list_r_list_s{
//     margin-bottom:0.1rem;
//     border-radius:0.1rem;
// }
// .index_list_r_list_s>p{
//     margin:0.1rem 0;
//     font-size:0.26rem;
//     color:rgba(153,153,153,1);
// }
// .index_list_r_list_d{
//     box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);

// }
// .index_list_r_list_d_p1{
//     width:100%;
//     height:1.5rem;
//     margin:0 auto;
//     margin-bottom:0.15rem;
//     padding:0 0.33rem 0 0.1rem;
//     border-radius:0.1rem;
//     box-shadow:0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
//     position:relative;
//     display:-webkit-box; 							
// 	-webkit-box-pack:center;
// 	-webkit-box-align:center;
//     box-sizing:border-box;
//     background-color:#fff;
//     z-index:1;
    
// }
.accurateSearchBox-list{
    padding-top 0.2rem
    background-color:#f3f3f3
}
.accurateSearchBox-list-title{
    color:#666666;
    padding:0 0.3rem 0.1rem
}
.accurateSearchBox-list-con{
    padding:0 0.3rem 0.98rem
}
// .accurateSearchBox-unfound{
//     padding:2rem 0.47rem;
//     font-size:0.24rem;
//     color:#999999
// }
// /*选择弹窗*/

// .flowWindow_wrap {
//     display:-webkit-box; 							
// 	-webkit-box-pack:center;
// 	-webkit-box-align:center;
// 	-webkit-box-orient:vertical;
//     background-color: #ffffff;
// }



// .flowWindow_title {
//     height: 1rem;
//     line-height: 1rem;
//     width: 100%;
//     border-top-left-radius: 0.1rem;
//     border-top-right-radius: 0.1rem;
//     text-align: center;
//     background-color: #e4fcfc;
//     font-size: 0.36rem;
// }

// .flowWindow_con {
//     padding-top: 0.5rem;
// }

// .flowWindow_con > div {
//     align-content: flex-start;
//     overflow-y: scroll;
// }


// .flowWindow_con label {
//     position: relative;
//     width: 1.6rem;
//     height: 0.74rem;
//     background: rgba(255, 255, 255, 1);
//     margin-right: calc((100% - 6.4rem) / 3);
//     margin-bottom: 0.3rem;
//     box-sizing: border-box;
// }
// .flowWindow_wrap.as2 .flowWindow_con label{
//     position: relative;
//     width: 24.25%;
//     height: 0.74rem;
//     background: rgba(255, 255, 255, 1);
//     margin-right: 1%;
//     margin-bottom: 0.3rem;
//     box-sizing: border-box;
// }
// .flowWindow_wrap.as2 .flowWindow_con label:nth-of-type(4n),.flowWindow_con label:nth-of-type(4n) {
//     margin-right: 0;
// }

// .cbSelect {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     text-align: center;
//     line-height: 0.74rem;
//     background-color: #fff;
//     border: 1px solid rgba(204, 204, 204, 1);
//     border-radius: 0.1rem;
//     font-size: 0.24rem;
//     box-sizing: border-box;
// }

// .cbSelect.active {
//     background-color: #eff;
//     color: #09a2a3;
//     border-color: #09a2a3;
// }

// .flowWindow_btn {
//     width: 89.3%;
//     height: 1rem;
//     line-height: 1rem;
//     background: rgba(9, 162, 163, 1);
//     border-radius: 0.5rem;
//     font-size: 0.3rem;
//     text-align: center;
//     color: #ffffff;
//     margin: 0 auto;
// }
// /* 招标详情 */

// .ZBdetails {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     box-sizing: border-box;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: -webkit-box;
//     -webkit-box-pack: center;
//     -webkit-box-align: center;
//     -webkit-box-orient: vertical;
//     z-index: 100;
// }

//     .ZBdetails > div {
//         width: 94.6%;
//         border-top-left-radius: 0.1rem;
//         border-top-right-radius: 0.1rem;
//         margin-top: 0.9rem;
//         position: relative;
//     }

// .ZBdetails-logo {
//     width: 1.6rem;
//     height: 1.6rem;
//     background: rgba(9, 162, 163, 1);
//     border: 0.1rem solid rgba(255, 255, 255, 1);
//     border-radius: 50%;
//     box-sizing: border-box;
//     font-size: 0.54rem;
//     font-weight: normal;
//     color: rgba(255, 255, 255, 1);
//     line-height: 1.4rem;
//     text-align: center;
//     margin: -0.9rem auto 0;
// }

// .ZBdetails-statement {
//     padding: 0 0.18rem;
// }

// .ZBdetails-statement-title {
//     font-size: 0.36rem;
//     font-weight: bold;
//     color: rgba(0, 0, 0, 1);
//     line-height: 1.5;
// }

// .ZBdetails-statement-price {
//     font-size: 0.26rem;
//     font-weight: bold;
// }

//     .ZBdetails-statement-price > span {
//         color: #09a2a3;
//     }

//         .ZBdetails-statement-price > span:first-child {
//             font-size: 0.36rem;
//         }

// .ZBdetails-statement-details {
//     position: relative;
//     padding: 0.2rem 0 0.2rem;
// }

// .ZBdetails-statement-details-left {
//     width: 100%;
//     box-sizing: border-box;
//     padding-right: 1.3rem;
//     display: -webkit-box;
//     font-size: 0.26rem;
//     color: #666;
// }

// .ZBdetails-statement-details-tag {
//     position: absolute;
//     right: 0;
//     top: 0.3rem;
//     width: 1.2rem;
//     height: 0.36rem;
//     line-height: 0.36rem;
//     text-align: center;
//     background: rgba(191, 2, 0, 1);
//     border-radius: 0.06rem;
//     font-size: 0.24rem;
//     color: #fff;
// }

// .ZBdetails-con {
//     padding: 0.39rem 0.21rem 0.45rem;
//     line-height: 1.8;
//     height: 32.38vh;
//     overflow-y: scroll;
// }

// .ZBdetails-closeBtn {
//     position: absolute;
//     top: -1.2rem;
//     right: 0.3rem;
// }

// .ZBdetails-operator {
//     position: relative;
//     height: 1rem;
//     display: -webkit-box;
//     background-color: #f3f3f3;
// }

//     .ZBdetails-operator > button {
//         position: relative;
//         display: -webkit-box;
//         -webkit-box-pack: center;
//         -webkit-box-align: center;
//         width: 33.3333%;
//         font-size: 0.28rem;
//         border: 0;
//         border-radius: 0;
//         margin: 0;
//         padding: 0;
//         overflow: visible;
//         background: none;
//     }

//         .ZBdetails-operator > button > img {
//             width: 0.34rem;
//             height: 0.34rem;
//             margin-right: 0.15rem;
//         }

//         .ZBdetails-operator > button.fs::after {
//             position: absolute;
//             right: 0;
//             top: 0.3rem;

//             width: 1px;
//             height: 0.4rem;
//             background-color: #ccc;
//             display: block;
//             content:""
//         }

//         .ZBdetails-operator > button.fs::before {
//             position: absolute;
//             left: 0;
//             top: 0.3rem;
//             width: 1px;
//             height: 0.4rem;
//             background-color: #ccc;
//             display: block;
//             content:""
//         }


// .fullScreen {
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 101;
//     width: 100%;
//     height: 100%;
//     background-color: #ffffff;
//     padding-bottom:1.2rem;
//     overflow-y: scroll;
// }

//     .fullScreen > button {
//         position: fixed;
//         bottom: 0;
//         left: 0;
//         z-index: 102;
//         width: 100%;
//         height: 1rem;
//         line-height: 1rem;
//         text-align: center;
//         color: #ffffff;
//         background-color: #09A2A3;
//         font-size:0.28rem
//     }

// .detail_close {
//     position: absolute;
//     right: 0;
//     top: -1.5rem;
//     width: 0.59rem;
//     height: 0.59rem;
// }
</style>
