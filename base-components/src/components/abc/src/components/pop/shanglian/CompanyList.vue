<template>
  <div>
    <com-pop
      @comPopShow="comPopIsShow"
      my-index="CompanyList"
      class="top_0"
      :headShow="false"
      :fullBtn="false"
    >
      <template v-slot:pop-content>
        <div id="companyList">
          <div class="top">
            <h4>{{provinceTrans(province)}}({{total||0}}家)</h4>
            <button class="searchBtn" @click="searchCom">精准搜索</button>
            <span class="random" @click="randomCompany">换一批</span>
          </div>

          <div class="bottom">
            <ul class="list">
              <!-- <span>共{{total}}万家</span> -->
              <li
                class="item"
                :class="{active:num===index}"
                v-for="(companyItem,index) in companyList"
                :key="index"
                @click="selectCompany(index,companyItem)"
              >
                <span>{{index+1}}、</span>
                <span>{{companyItem.enterprises}}</span>
                <span
                  class="main-label"
                  :style="labelColor()"
                  v-for="(kindItme) in $commonFn.businessScope(companyItem.kind)"
                  :key="kindItme"
                >{{kindItme}}</span>
                <!-- <span class="main-label" v-for="(item,index) in businessScope(item.kind)" :key="item.kind"> {{item}}</span> -->
              </li>
              <!-- <li class="item"><span>&nbsp;&nbsp;&nbsp;</span><span>......</span></li> -->
            </ul>
          </div>
        </div>
      </template>

      <template v-slot:flex-left>
        <div></div>
      </template>
      <template v-slot:flex-right>
        <div class="m-item m-itemcenter" @click="pushVideo">推送视频</div>
        <div class="m-item m-itemcenter" @click="pushMessage">推送短信</div>
      </template>
    </com-pop>
    <PrecisionSearch
      v-if="isShowPrecisionSearch"
      @close="searchClose"
      :pieParams="searchInfo"
      @newCompany="getSearchInfo"
    />

    <label-show :labelShow="labelShow" :companyInfo="chooseCompany" />
  </div>

  <!-- 工商信息 e -->
</template>

<script>
import { commonFnMixin } from "@/assets/js/mixins.js";
import LabelShow from "@/components/pop/shanglian/LabelShow";
import PrecisionSearch from "@/components/pop/shanglian/PrecisionSearch";
import Utils from "../../../utils";

const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};
export default {
  mixins: [commonFnMixin],

  components: {
    ComPop,
    PrecisionSearch,
    LabelShow
  },

  data() {
    return {
      userInfo: this.$store.state.loginInfo.userInfo,
      isShowPop: false,
      id: undefined, //保存从store拿到的省份ID和行业ID

      // 该列表信息所属范围 s
      province: "" || "广东省",
      industryId: null,
      industryName: "" || "请选择对应行业",
      bussiness: "", //搜索范围
      up_industry: "",
      logo: "",
      // 该列表信息所属范围 e

      // 列表信息 s
      total: "" || 1, //未经筛选号码的公司信息总数
      companyList: [], //未经筛选号码的公司信息
      hasPhoneTotal: 0, //含有手机号码的公司信息总数
      hasPhoneCompanyList: [], //含有手机号码的公司信息
      // 列表信息 e

      num: 0, //用来控制是否给li加上active类
      temArr: ["A", "B", "C", "D", "E", "F", "G", "H"],
      isShowPrecisionSearch: false,
      labelShow: {
        isShow: false
      },
      chooseCompany: {
        companyName: "",
        companyTags: [],
        enterprisesid: "",
        industryid: 0
      },
      searchInfo: {} //将饼图信息传入到搜索框内
    };
  },

  methods: {
    // 获得省份名 经处理：内蒙古自治区改为内蒙古
    provinceTrans(provinceName) {
      let transName = this.$commonFn.provinceNameTrans(provinceName);
      return transName;
    },

    // 此处仅限用于精准搜索获取参数
    getSearchInfo(count, all_count, info, all_info, searchBussiness) {
      //          ↑总计数 ↑所有搜索结果  ↑信息  ↑未经筛选信息  ↑主营业务搜索范围
      console.clear();
      console.log(count, all_count, info, all_info, searchBussiness);
      this.total = all_count;
      this.companyList = all_info;
      this.hasPhoneTotal = count;
      this.hasPhoneCompanyList = info;
      this.bussiness = searchBussiness;
    },

    labelColor() {
      let colorList = [
        {
          backgroundColor: "#caecee",
          color: "#50aba5"
        },
        {
          backgroundColor: "#dce2f4",
          color: "#8faae4"
        },
        {
          backgroundColor: "#fbe5d0",
          color: "#ea9c5c"
        }
      ];
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
      }
      let randomIndex = getRandomInt(0, 3);

      let colorItem = colorList[randomIndex];

      return {
        ...colorItem
      };
    },

    // 获取弹窗传值 该方法仅限用于饼图传值
    getParams() {
      // let pName = this.$store.state.pop.params.pName;
      // let insId = this.$store.state.pop.params.insId;
      // let type = this.$store.state.pop.params.logo;
      // let up_industry = this.$store.state.pop.params.up_industry;
      // let {enterprises_data,count} = this.$store.state.pop.params.listData;

      let {
        pName,
        insId,
        logo,
        up_industry,
        // listData,
        companyLsData,
        industryName
      } = this.$store.state.pop.params;

      // let {enterprises_data,count}  = listData;
      // let { all_info, info, all_count, count } = listData;
      let { count, enterprises_data } = companyLsData; //index/list

      // console.log(this.$store.state.pop.params.listData,all_info,count,info)
      /*
      this.companyList = all_info;
      this.total = all_count;
      this.hasPhoneTotal = count;
      this.hasPhoneCompanyList = info;
      this.bussiness = "";

      this.province = pName;
      this.industryId = insId;
      this.industryName = industryName;
      */

      this.companyList = enterprises_data;
      this.total = count; //所有企业统计数
      this.hasPhoneTotal = count; //用于 短信推送 显示含有手机号码的统计数
      this.hasPhoneCompanyList = enterprises_data; //含有手机号码的企业数
      this.bussiness = "";

      this.province = pName;
      this.industryId = insId;
      this.industryName = industryName;
      this.up_industry = logo == "up" ? up_industry : "";
      this.logo = logo;
    },
    comPopIsShow(isShow) {
      
      console.log(isShow, "isShow");
      if (isShow) {
        this.isShowPop = true;
        // 获取弹窗传值 该方法仅限用于饼图传值
        this.getParams();
      } else {
        this.isShowPop = false;
      }
    },
    searchClose() {
      this.isShowPrecisionSearch = false;
    },
    searchCom() {
      console.log(
        "=========2======",
        this.province,
        this.industryId,
        this.industryName
      );

      this.searchInfo = {
        provinces: this.province, //省份id
        industryid: this.industryId, //行业id
        industryName: this.industryName //行业名称
      };

      this.isShowPrecisionSearch = true;
      //跳出搜索弹窗
      // this.$store.commit("showPop", {
      //   popName: "precisionSearch",
      //   params: {
      //     province: this.province, //省份id
      //     industryId: this.industryId //行业id
      //   }
      // });
    },
    //给li加上active的类名
    selectCompany(index, companyItem) {
      this.num = index;
      // this.labelShow.isShow = true;

      let companyName = companyItem.enterprises;
      let companyTags = this.$commonFn.businessScope(companyItem.kind);
      let enterprisesid = companyItem.enterprisesid;

      // this.chooseCompany = {
      //   companyName,
      //   companyTags,
      //   enterprisesid,
      //   industryId: this.industryId
      // };

      let toSearchCompanyInfo = {
        enterpriseid: enterprisesid,
        enterprise: companyName,
        industryid: this.industryId,
      }

      this.$router.push({
        name:'searchCompany',
        params:toSearchCompanyInfo,
      })
    },
    async randomCompany() {
      if (this.bussiness) {
        this.$axios
          .get(this.$api.accuracySearch, {
            params: {
              industryid: this.industryId,
              provinces: this.province, //省份id
              business: this.bussiness
            }
          })
          .then(res => {
            let { count, all_count, info, all_info } = res.data;
            if (all_info.length == 0) {
              this.$toast({
                message: "没有更多数据了"
              });
              return;
            }

            if (typeof count == "number" && typeof info == "object") {
              let bussiness = this.searchInfo.business;
              this.total = all_count;
              this.companyList = all_info;
              this.hasPhoneTotal = count;
              this.hasPhoneCompanyList = info;
            }
          })
          .catch(rej => rej);
      }

      /*
      this.companyList = enterprises_data; 
      this.total = count; //所有企业统计数
      this.hasPhoneTotal = count; //用于 短信推送 显示含有手机号码的统计数
      this.hasPhoneCompanyList = enterprises_data; //含有手机号码的企业数
      this.bussiness = "";

      this.province = pName;
      this.industryId = insId;
      this.industryName = industryName;
      this.up_industry = logo=='up'?up_industry:'';
      this.logo = logo;
      */

      // -------------此为当直接进入省份换一批获得的数据 s
      if (!this.bussiness) {
        let companyLsData = await this.$axios
          .get(this.$api.searchPrinceCom, {
            params: {
              industryid: this.industryId,
              provinces: this.province,
              logo: this.logo,
              up_industry: this.logo == "up" ? this.up_industry : ""
            }
          })
          .then(res => res.data)
          .catch(rej => rej);

        let { count, enterprises_data } = companyLsData;

        this.companyList = enterprises_data;
        this.total = count; //所有企业统计数
        this.hasPhoneTotal = count; //用于 短信推送 显示含有手机号码的统计数
        this.hasPhoneCompanyList = enterprises_data; //含有手机号码的企业数
      }
      // -------------此为当直接进入省份换一批获得的数据 e

      /*
      this.$axios.get(`${this.$api.inbatch}`,{
        params:{
          name: this.userInfo.username,
          token:this.userInfo.token
        }
      }).then(res => {
        if (res.data.code === 2) {
          return alert("没有更多数据了");
        }
        this.companyList = res.data.enterprises_data;
      });
      */
    },

    //生成一个随机的标记，以传给后台
    createRandomID() {
      let randomID;
      let companyID = localStorage.getItem("companyID");
      let tem = companyID.split(",");
      let index = Math.floor(Math.random() * tem.length);
      randomID = tem[index];
      tem.splice(index, 1);

      if (tem.length === 0) {
        localStorage.setItem("companyID", this.temArr);
        return randomID;
      }
      localStorage.setItem("companyID", tem);
      return randomID;
    },
    pushVideo() {
      this.$toast({
        message: "上下链暂未开放此功能，请期待我们的到来哦~~~"
      });
    },

    // 推送短信
    pushMessage() {
      // from mixins → commonFnMixin
      let showPushMsg = async () => {
        console.log(
          this.industryId,
          this.province,
          this.logo,
          this.up_industry
        );
        let phoneCount = await this.$axios
          .get(this.$api.phoneCount, {
            params: {
              // industryid[行业id] provinces[省份名] logo[ up / down ] up_industry[上链行业名称]!仅上链需要  区分上下链
              industryid: this.industryId,
              provinces: this.province,
              logo: this.logo,
              up_industry: this.up_industry
            }
          })
          .then(res => res.data)
          .catch(rej => rej);

        this.hasPhoneTotal = phoneCount.mobile_count
          ? phoneCount.mobile_count
          : 0;

        this.$store.commit("showPop", {
          popName: "pushMsg",
          params: {
            saveParams: true,
            freshOtherFunc: function() {},

            companyCount: this.total,
            hasPhoneCount: this.hasPhoneTotal,
            companyList: this.companyList,
            hasPhoneCompanyList: this.hasPhoneCompanyList,
            bussiness: this.bussiness,

            // 此部分参数仅为了发送短信时的接口所用到的数据 s
            industryid: this.industryId,
            provinces: this.province,
            logo: this.logo,
            up_industry: this.up_industry,
            sendType: "CompanyList",
            industryName: this.industryName
            // 此部分参数仅为了发送短信时的接口所用到的数据 e
          }
        });

        //第一次到访提示 s
        this.isFirstVisit();
      };
      this.identityAuth(() => {
        showPushMsg();
      });
    },
    //第一次到访提示 s
    async isFirstVisit() {
      let flag = await Utils.isFirstVisit(
        this.$api.isShowTips,
        // this.$route.meta.remark
        "全网搜索推送短信"
      );
      if (flag) {
        this.$router.push({
          path: "../tipmain",
          query: { num: [5, 6, 7], originUrl: this.$route.fullPath } //1是第1张图片
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="stylus" scoped>
 #companyList
  position relative
  width 100%
  height 100%
  overflow hidden

  .top
    position absolute
    width: inherit
    padding 0 15px 
    box-sizing border-box
    display flex
    background-color #fff
    justify-content space-between
    align-items center
    border-radius 5px 5px 0 0
    top 0
    h4
      padding 0.10rem 0
      font-size 0.36rem
    .searchBtn
      display inline-block
      padding 0.08rem 0.2rem  
      background-color #09a2a3
      border-radius 5px
      color #fff
      font-size 0.24rem
    .random
      position relative
      color #fe8700
      padding 0  0  0 20px
      font-size 0.32rem
      // &::before
      //   position absolute 
      //   right 100%
      //   top 5px
      //   display inline-block
      //   content ''
      //   background url('../../../assets/icon/random.png') center no-repeat
      //   background-size 0.32rem 0.32rem
      //   width 0.32rem
      //   height 0.32rem
      //   vertical-align center
      //   transform scale(1)
        
  .bottom
    // height 100vh
    padding 0.86rem 15px  0px 15px
    box-sizing border-box
    background-color  rgba(233,233,233,0.6)
    .list
      font-size 0.3rem
      height 80vh
      .item 
        // text-overflow: ellipsis
        overflow hidden
        white-space nowrap
        padding 3px 0
        // font-size 0.38rem
        &.active
          color #fe8700
        
        .main-label
          margin-left 0.1rem
          border-radius 0.1rem
          padding 0.01rem 0.04rem
          position relative
          // &::before
          //   content ''
          //   position absolute
          //   left 0
          //   top -20px

            // width 0
            // height 0       

          //   border-left 0.01rem white
          //   border-right 0.01rem white
          //   border-bottom 0.01rem black



      .contact
        text-align center
        margin-top 10px  
        .contactType
          display flex
          justify-content space-around
          .imgbox
            width 30px
            height 30px
            img 
              width 100%
              height 100%
            
  .close  
    position absolute
    top -55px
    right -5px
    width 60px
    height 60px
    background url('../../../assets/icon/close@2x.png') no-repeat center
    transform scale(0.5)
  .foot
    position absolute 
    width 100%
    border-radius 0 0 5px 5px
    overflow hidden
 
</style>

