<template>
  <div
    id="quickSearch"
    class="w h bs_bb  main_bgcolor_f3f3f3"
    style="height: 100vh; "
  >
    <div
      id="dialogBox"
      class="dialogBox main_bgcolor_f3f3f3"
    >

      <SearchHeader
        @searchHotword='searchHotword'
        @historyWordSearch='search'
        :curKeyword='curKeyword'
      />
    </div>

    <div
      v-for='(kw,index) in searchArray'
      :key='index'
      class="qs-list"
    >

      <div class="p_l_20 p_r_20 w bs_bb clear ">
        <div class="input_info fr">
          {{kw}}
        </div>
      </div>

      <div
        class="res_info fl w bs_bb pos_res"
        v-if="JSON.stringify(pData[index]) !== '[]'"
      >
        <img src="../../../assets/icon/dingyue/lian.png">
        <div>
          <!-- <div
            class="w index_list_r_list"
            v-for='(item,index) in pData'
            :key='index'
          > -->
          <DataList
            :pData='pData[index]'
            @showDetail='showDetail'
          />
          <!-- </div> -->
          <a
            class="watchMore dis_bl tx-c main_color_09a2a3"
            @click="moreResult(index)"
          >点击查看更多采招信息》</a>
        </div>
      </div>

      <div
        class="as_tips bs_bb fl"
        v-else
      >
        检索到的商机信息较少，建议重新修饰关键词内容后再检索
      </div>
    </div>

    <!-- 底下的搜索 -->
    <FootSearch @search='search' />

    <!-- 详情页面 -->
    <PopDetail
      @closePop='closePop'
      :detailData='detailData'
      :isShow='isShowDetail'
      :content='content'
    />

    <!-- <div
      id="loadingToast"
      style="display: none;"
    >
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast"><i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
      </div>
    </div>
    <div
      class="shareGuide dis_box box_a_c bo_p_c w h"
      style="display: none;"
    >
      <img
        src="../image/guide1.png"
        style="width: 3.3rem; height: 2.28rem;"
      >
    </div> -->

    <a
      class="pcBtn2T main_bgcolor_ffffff bs_bb dis_bl to_home"
      @click="$router.push('lookAround')"
    >
      <img
        src="../../../assets/icon/dingyue/toHome.png"
        class="vm"
      >
    </a>
  </div>
</template>
<script>
import SearchHeader from "./04_searchHistory_Header";
import FootSearch from "../model/FootSearch";
import TopRouter from "../model/TopRouter";
// import DataList from "../model/DataItem";
import DataList from "../model/DataItemT";
import PopDetail from "../model/PopDetail";
import myCommonJs from "../common";
export default {
  data() {
    return {
      content: "", //item的详情
      detailData: {}, //传给全屏页面的数据
      isShowDetail: "", //是否显示详情弹窗 值 'detail' or 'limit'
      isHotSearch: true, //显示热闹搜索还是历史搜索 true 热门
      curKeyword: "", //当前搜索的关键词
      searchArray: [],
      pData: [],
      pageNum: "1", //下一页数据，默认为1
      searchData: {
        token: this.$store.state.loginInfo.userInfo.token,
        Title: "",
        page_size: 6,
        page: 1
      },
      token: ""
    };
  },
  components: {
    SearchHeader,
    FootSearch,
    DataList,
    TopRouter,
    PopDetail
  },

  created() {
    this.token = this.$store.state.loginInfo.userInfo.token;
    let { keyword, id } = this.$route.query;
    if (keyword) {
      this.searchHotword(keyword);
    }
    if (id) {
      // let { BidsPirce,Company,CreateTime,EndDate,Title } = this.$route.query;
      this.showDetail(this.$route.query);
    }
  },

  methods: {
    moreResult(index) {
      let data = {
        morekey: this.searchArray[index]
      };

      this.$router.push({ path: "/moreResult", query: data });
    },

    closePop() {
      this.isShowDetail = "";
    },

    showDetail(item) {
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
            res.data.BidsContent[0] = res.data.BidsContent[0].replace(reg, "");

            this.content = res.data.BidsContent[0];
          }
        });
    },

    async searchHotword(hotword) {
      this.searchData.Title = hotword;

      myCommonJs.searchKeyword(hotword);
      this.bus.$emit("addHistorySearchKw", hotword);

      this.curKeyword = hotword;

      this.searchArray.unshift(hotword);

      let url = `${this.$api.keywordSearch}`;
      let searchData = {
        token: this.token,
        Title: hotword,
        page: this.pageNum,
        page_size: 6
      };

      this.accepeData(url, searchData);
    },

    async accepeData(url, searchData) {
      let res = await this.getData(url, searchData);
      if (!res) {
        this.pData.unshift([]);
      } else {
        this.pData.unshift(res.data.data_dict);
      }
    },

    async getData(url, data) {
      let res = await this.$axios.get(url, { params: data });
      console.log(`====getData===`, res);
      if (res.data.message === false) {
        return;
      }

      let now = new Date();
      let d = res.data.data_dict;
      let state_0 = [];
      let state_1 = [];
      d.forEach((item, index) => {
        let EndDate = new Date(item.EndDate);
        if (EndDate > now) {
          item.status = "0";
          state_0.push(item);
        } else {
          item.status = "1";
          state_1.push(item);
        }
      });
      res.data.data_dict = state_0.concat(state_1);

      return res;
    },

    async search(keyword) {
      this.searchData.Title = keyword;

      this.curKeyword = keyword;
      myCommonJs.searchKeyword(keyword);
      this.searchArray.unshift(keyword);

      this.bus.$emit("addHistorySearchKw", this.keyword);

      this.accepeData(this.$api.keywordSearch, this.searchData);

    }
  },

  watch: {
    curKeyword(keyword) {
      if (!keyword) return;

      let user = this.$store.state.loginInfo.userInfo.username,
        title = `#上下链# ${user}邀请你关注"${keyword}" 采购招标商机`,
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
        name: "quickSearch",
        query: {
          keyword
        }
      });
      // 动态改变朋友圈描述 e
    }
  }
};
</script>

<style  scoped>
#quickSearch {
  position: relative;
  padding: 0 0.1rem 2.5rem 0.1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.to_home {
  position: fixed;
  width: 0.8rem;
  height: 0.8rem;
  right: 0;
  bottom: 3rem;
  text-align: center;
  line-height: 0.8rem;
  border-radius: 20px 0 0 20px;
  z-index: 2;
}
.to_home img {
  width: 0.6rem;
  height: 0.6rem;
}

/* .dialogBox {
  padding-bottom: 1.5rem;
} */

.pcBtn1,
.pcBtn2 {
  position: fixed;
  top: 0.25rem;
  padding: 0.1rem;
  box-shadow: 2px 2px 2px #e2e2e2;
  z-index: 1;
  border: 2px solid #c4e3e3;
}
.pcBtn1 {
  right: 20%;
  border-radius: 0.4rem;
}
.pcBtn2 {
  right: 40%;
  border-radius: 50%;
}
.pcBtn1 img,
.pcBtn2 img {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}
.hot p {
  padding: 0.35rem 0 0.19rem;
}
.as_tips {
  width: 100%;
  text-align: center;
  padding: 0.32rem 0.2rem;
  color: rgb(128, 128, 128);
  font-size: 0.24rem;
}
.sbgColor_f1ffff {
  background-color: #f1ffff;
}
.sbgColor_e4e4e4 {
  background-color: #e4e4e4;
}
.hot ul.historyWord > li {
  width: 1.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border-radius: 0.08rem;
  margin: 0 0.2rem 0.3rem 0;
}
.hot ul.historyWord > li > a {
  border-radius: 0.08rem;
}
.input_info {
  padding: 0.2rem 0.15rem;
  background-color: #09a2a3;
  color: #ffffff;
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.08rem;
  box-sizing: border-box;
  max-width: 90%;
  /* margin-top: 0.4rem; */
  font-size: 0.24rem;
}
.res_info {
  padding-left: 0.7rem;
  margin-top: 0.2rem;
}
.res_info > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.57rem;
  height: 0.57rem;
  border-radius: 50%;
}

.index_list_r_list_t {
  width: 100%;
  overflow: hidden;
  border-radius: 0.1rem;
}
.index_list_r_list_s {
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
}
.index_list_r_list_s > p {
  margin: 0.1rem 0;
  font-size: 0.26rem;
  color: rgba(153, 153, 153, 1);
}
.index_list_r_list_d {
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
}
.index_list_r_list_d_p1 {
  width: 100%;
  height: 1.5rem;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  padding: 0 0.33rem 0 0.1rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
  position: relative;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
}
.list_d_s1 {
  width: 1.52rem;
  height: 1.3rem;
  position: relative;
  /* background: url('../image/item8-l-price.png') no-repeat center; */
  background-size: 100% 100%;
  margin-right: 0.22rem;
}
.list_d_s1 > p {
  width: 100%;
  height: 50%;
  line-height: 0.65rem;
  text-align: center;
  color: #fff;
  font-size: 0.22rem;
}
.list_d_s2 {
  -webkit-box-flex: 1;
  font-size: 0.26rem;
  line-height: 1.4;
}
.list_d_s2 > p.p1 {
  line-height: 1.3;
  color: #010101;
}
.list_d_s2 > p.p2 {
  color: #333333;
}
.list_d_s2 ul {
  line-height: 1.2;
  color: #333333;
}
.list_d_s3 {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1.14rem;
  width: 0.24rem;
  /* background:url('../image/stateTag-doing.png') no-repeat center; */
  background-size: 100% 100%;
}
.watchMore {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
  font-size: 0.32rem;
  margin-bottom: 0.4rem;
}
.nores {
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
}
.accurateSearchBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  /*transition: height 0.1s*/
}
.accurateSearchBox > div {
  padding: 0.2rem 0.3rem;
}
.accurateSearchBox-show {
  display: -webkit-box;
  -webkit-box-align: center;
  margin-bottom: 0.2rem;
}
.accurateSearchBox-s2 > form {
  height: 0.7rem;
  /*line-height:0.7rem;*/
  background-color: #e7e7e7;
  box-sizing: border-box;
  padding: 0.1rem 0.1rem 0.1rem 0.68rem;
  display: block;
}
.accurateSearchBox-s2 > form > input {
  border: 0;
  background-color: inherit;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0.28rem;
}
.accurateSearchBox-s1 {
  width: 1.12rem;
  height: 0.7rem;
  line-height: 0.7rem;
}
.accurateSearchBox-s2 {
  -webkit-box-flex: 1;
}
.pointDown {
  display: inline-block;
  width: 0.16rem;
  height: 0.12rem;
  /* background:url('../image/icon/icon-traiDown.png') no-repeat center; */
  background-size: 100% 100%;
  margin-left: 0.1rem;
  transition: all 0.1s;
}
.searchLogo {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.18rem;
  display: inline-block;
  width: 0.38rem;
  height: 0.38rem;
  /* background:url('../image/icon/icon-search.png') no-repeat center; */
  background-size: 100% 100%;
}

.index_list_r_list_d_p2 {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #be0201;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  border-bottom-right-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
}
.index_list_r_list_t {
  width: 100%;
  overflow: hidden;
  border-radius: 0.1rem;
}
.index_list_r_list_s {
  margin-bottom: 0.1rem;
  border-radius: 0.1rem;
}
.index_list_r_list_s > p {
  margin: 0.1rem 0;
  font-size: 0.26rem;
  color: rgba(153, 153, 153, 1);
}
.index_list_r_list_d {
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
}
.index_list_r_list_d_p1 {
  width: 100%;
  height: 1.5rem;
  margin: 0 auto;
  margin-bottom: 0.15rem;
  padding: 0 0.33rem 0 0.1rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
  position: relative;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
}
.accurateSearchBox-list {
  padding-top: 1.3rem;
  background-color: #f3f3f3;
}
.accurateSearchBox-list-title {
  color: #666666;
  padding: 0 0.3rem 0.1rem;
}
.accurateSearchBox-list-con {
  padding: 0 0.3rem 0.98rem;
}
.accurateSearchBox-unfound {
  padding: 2rem 0.47rem;
  font-size: 0.24rem;
  color: #999999;
}
/*选择弹窗*/

.flowWindow_wrap {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
  background-color: #ffffff;
}

.flowWindow_title {
  height: 1rem;
  line-height: 1rem;
  width: 100%;
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  text-align: center;
  background-color: #e4fcfc;
  font-size: 0.36rem;
}

.flowWindow_con {
  padding-top: 0.5rem;
}

.flowWindow_con > div {
  align-content: flex-start;
  overflow-y: scroll;
}

.flowWindow_con label {
  position: relative;
  width: 1.6rem;
  height: 0.74rem;
  background: rgba(255, 255, 255, 1);
  margin-right: calc((100% - 6.4rem) / 3);
  margin-bottom: 0.3rem;
  box-sizing: border-box;
}
.flowWindow_wrap.as2 .flowWindow_con label {
  position: relative;
  width: 24.25%;
  height: 0.74rem;
  background: rgba(255, 255, 255, 1);
  margin-right: 1%;
  margin-bottom: 0.3rem;
  box-sizing: border-box;
}
.flowWindow_wrap.as2 .flowWindow_con label:nth-of-type(4n),
.flowWindow_con label:nth-of-type(4n) {
  margin-right: 0;
}

.cbSelect {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 0.74rem;
  background-color: #fff;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 0.1rem;
  font-size: 0.24rem;
  box-sizing: border-box;
}

.cbSelect.active {
  background-color: #eff;
  color: #09a2a3;
  border-color: #09a2a3;
}

.flowWindow_btn {
  width: 89.3%;
  height: 1rem;
  line-height: 1rem;
  background: rgba(9, 162, 163, 1);
  border-radius: 0.5rem;
  font-size: 0.3rem;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
}
/* 招标详情 */

.ZBdetails {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
  z-index: 100;
}

.detail_close {
  position: absolute;
  right: 0;
  top: -1.5rem;
  width: 0.59rem;
  height: 0.59rem;
}
</style>

