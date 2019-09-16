<template>
  <div
    id="msg-search"
    my-index="precisionSearch"
  >

    <div
      class="mask"
      v-if="isShowMask"
    ></div>

    <div id="main-body">
      <ul class="select-list">
        <li
          class="item"
          @click="selectIndustry"
        >
          <span class="text">行业</span>
          <span class="ri">{{industry.name || '请选择行业'}}</span>
        </li>
        <li
          class="item"
          @click="selectProvince"
        >
          <span class="text">省份</span>
          <span class="ri">{{selectedProvince || '请选择省份'}}</span>
        </li>
        <span
          class="area-box"
          ref="areaBox"
        >
          <AreaSelect
            @selectArea='selectArea'
            v-show="isShowMask"
          />
        </span>
        <li class="item">
          <span class="text">主营产品/业务</span>
          <input
            class="item-input"
            :placeholder="inputPlaceholder"
            v-model="business"
            @focus="onFocus"
            @blur="onBlur"
          >
        </li>
      </ul>

      <button
        class="searchBtn"
        @click="search"
      >搜索</button>
    </div>
    <section class="result-list">
      <p class="total">
        <span class="num">共{{comNum}}家企业</span>
        <span
          class="next-page"
          @click="nextPage"
        >下一页</span>
      </p>

      <ul
        class="list sp"
        ref="hiddenList"
        v-if="resultList.length"
      >
        <li
          v-for="(item,index) in resultList"
          :key="index"
          class="item sp-i"
        >
          <span>{{index+1}}、</span>
          <div class="text">
            <span class="item-name">{{item.enterprises}} </span>
            <span class="item-phone">[{{item.mobile}}]</span>
          </div>
        </li>
        <!-- <span v-if="resultList.length > 9">......</span> -->
      </ul>
      <ul
        v-show="isShowNoResultTips"
        style="margin-top:0.3rem;"
      >
        暂未搜索到匹配的企业，请重新检索
      </ul>

    </section>
    <section class="btn">
      <span
        class="btn-text"
        @click="sendMsg"
      >发送文字短信</span>
      <span
        class="btn-video"
        @click="sendVideo"
      >发送视频短信</span>
    </section>
    <PushMsg />
    <SelectTem />
    <MsgTemplate />
  </div>
</template>



<script>
import { commonFnMixin } from "@/assets/js/mixins.js";
import AreaSelect from ".././../components/common/AreaSelect";
import SelectTem from "@/components/pop/pushTemplate/SelectTem";
import MsgTemplate from "@/components/pop/pushTemplate/MsgTemplate";
const PushMsg = resolve => {
  import("@/components/pop/pushMsgVideo/PushMsg").then(module => {
    resolve(module);
  });
};
export default {
  mixins: [commonFnMixin],

  data() {
    return {
      isShowNoResultTips: false,
      selectedProvince: "", //当前选择的省份
      isShowMask: false, //
      comNum: "" || 0, //搜索到的企业数
      comPhoneNum: "" || 0, //搜索到的手机数
      inputPlaceholder: "请输入主营产品/业务",
      business: "", //主营

      industry: {
        //当前选择的行业
        id: "",
        name: ""
      },
      industryList: [], //保存后台取回来的行业列表
      resultList: [],
      curPageNum: 1, //当前页面
      //当选择全国时。把这组数据传给后台
      allArea:
        "北京市,天津市,上海市,重庆市,河北省,山西省,辽宁省,吉林省,黑龙江省,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,海南省,四川省,贵州省,云南省,陕西省,甘肃省,青海省,台湾省,内蒙古自治区,广西壮族自治区,西藏自治区,宁夏回族自治区,新疆维吾尔自治区",
    };
  },
  components: {
    AreaSelect,
    PushMsg,
    SelectTem,
    MsgTemplate
  },

  created() {
    this.getIndustry();
  },

  mounted(){
    
  },
  computed:{
    
  },
  methods: {

    sendVideo() {
      this.$toast("此功能暂未开放，敬请期待");
    },
    sendMsg() {
      if (this.comNum === 0) {
        return this.$toast("请先搜索相对应的企业");
      }
      // 推送短信
      let showPushMsg = () => {
        this.$store.commit("showPop", {
          popName: "pushMsg",
          params: {
            saveParams: true,
            freshOtherFunc: function() {},

            companyCount: this.comNum,
            hasPhoneCount: this.hasPhoneCount,
            companyList: this.resultList,
            hasPhoneCompanyList: this.resultList,
            bussiness: this.business,

            // 此部分参数仅为了发送短信时的接口所用到的数据 s
            industryid: this.industry.id,
            provinces: this.selectedProvince=='全国'?this.allArea:this.selectedProvince,
            logo: "down",
            up_industry: "",
            sendType: "chukeMsg"

            // 此部分参数仅为了发送短信时的接口所用到的数据 e
          }
        });
      };

      this.identityAuth(() => {
        showPushMsg();
      });
    },
    async nextPage() {
      this.curPageNum++;
      if (this.curPageNum > Math.ceil(this.comNum / 10)) {
        return this.$toast("没有更多数据了");
      }
      let postData = {
        provinces: this.selectedProvince,
        industryid: this.industry.id,
        business: this.business,
        page: this.curPageNum
      };

      console.log(`=======`, postData);

      let { data } = await this.getData(postData);

      this.resultList = data.contacts;
    },
    selectArea(area) {
      this.selectedProvince = area.join();

      let box = this.$refs.areaBox;
      box.style.transform = "";
      setTimeout(() => {
        this.isShowMask = false;
      }, 200);
    },
    //选择行业
    selectIndustry() {
      this.$weui.picker(this.industryList, {
        className: "custom-classname",
        container: "body",
        defaultValue: [3],
        onChange: function(result) {
          console.log(result);
        },
        onConfirm: result => {
          this.industry.name = result[0].label;
          this.industry.id = result[0].id;
        },
        id: "singleLinePicker"
      });
    },
    selectProvince() {
      let box = this.$refs.areaBox;
      box.style.transform === ""
        ? (box.style.transform = "scaleY(1)")
        : (box.style.transform = "");

      this.isShowMask = true;
    },

    async search() {
      let postData = {
        provinces: this.selectedProvince,
        industryid: this.industry.id,
        business: this.business,
        page: 1
      };

      if (!postData.industryid) {
        return this.$toast("请选择行业");
      }
      if (!postData.provinces) {
        return this.$toast("请选择省份");
      }

      let { data } = await this.getData(postData);

      if (data.message) {
        return this.$toast(data.message);
      }

      this.resultList = data.contacts;
      this.comNum = data.all_count;
      this.comPhoneNum = data.count;
    },

    async getIndustry() {
      try {
        let { data } = await this.$axios.get(this.$api.selectIndustry);
        this.industryList = data.map((ele, index) => {
          return {
            label: ele.industry,
            value: index,
            id: ele.id
          };
        });
      } catch (err) {
        this.$toast(err);
      }
    },

    async getData(data) {
      if (data.provinces === "全国") {
        data.provinces = this.allArea;
      }
      let res = await this.$axios.get(`${this.$api.accSearch}`, {
        params: data
      });

      if (res.data.count === 0) {
        this.isShowNoResultTips = true;
      } else {
        this.isShowNoResultTips = false;
      }
      return res;
    },
    onFocus() {
      this.inputPlaceholder = "";
    },
    onBlur() {
      this.inputPlaceholder = "请输入主营产品/业务";
    }
  }
};
</script>

<style lang="stylus" scoped>
#msg-search  
  width 100%
  min-height 100vh
  font-size 0.29rem
  background-color #f3f3f3
  .mask
    position absolute 
    top 0
    left 0
    right 0
    bottom 0
    z-index 99
    background-color rgba(0,0,0,0.4)
  #main-body
    width 100%
    background-color #fff
    text-align center
    box-sizing border-box
    .select-list
      width 100%
      padding 0 0.2rem
      box-sizing border-box
      .item
        position relative
        border-bottom 1px solid #f3f3f3
        display flex
        justify-content space-between
        span  
          height 1.1rem
          line-height 1.1rem
        .ri
          color #666
          width 60%
          text-align right
          overflow hidden
          white-space nowrap 
          text-overflow ellipsis 
          &::after
            content ''
            display inline-block
            width 0.14rem
            height 0.24rem
            background url(../../assets/icon/arrow@16_29.png) center no-repeat
            background-size contain
            margin-left 0.3rem
        .item-input
          border 0
          background-color #fff
          position relative
          color #ccc
          width 60%
          font-size 0.32rem
          &::placeholder
            text-align right
            font-size 0.28rem
      .area-box
        position absolute 
        width 100%
        left 0
        z-index 100
        display inline-block
        transition 0.2s
        transform-origin 0 0
        transform scaleY(0)
    .searchBtn
      position relative
      width 90%
      padding 0.24rem 0.6rem
      border-radius 0.4rem
      background-color #09a3a3
      font-size 0.32rem
      color #fff
      margin-top 0.3rem
      margin-bottom 0.3rem
  .result-list
    width 100%
    height auto
    overflow-y scroll
    margin-top 0.15rem
    background #fff
    padding 0 0.2rem 1.4rem
    box-sizing border-box
    .total
      display flex
      justify-content space-between
      align-items flex-end
      font-size 0.28rem
      box-sizing border-box
      .num
        font-weight 600
        font-size 0.32rem
      .next-page
        color   #09a2a3
        color 0.28rem
    .list
      color #333
      display flex
      flex-direction column
      margin-top 0.2rem
      box-sizing border-box
      .item
        display flex
        .text
          display flex
          .item-name 
            max-width 60vw
            overflow hidden
            white-space nowrap 
            text-overflow ellipsis 
          .item-phone
            max-width 30vw
  .btn
    position absolute 
    width 100%
    bottom 0
    display flex
    justify-content space-around
    align-items center
    border-top 1px solid #ccc
    height 1.3rem

    font-size 0.26rem
    background white

    .btn-text, .btn-video
      width 45%
      height 0.8rem
      line-height 0.8rem
      text-align center
      border-radius 0.6rem
      color #fff
    .btn-text
      background-color #09a2a3
      &::before
        vertical-align middle
        display inline-block
        width 0.32rem
        height 0.32rem
        margin-right 0.1rem
        margin-bottom 0.05rem
        content ''
        background url(../../assets/icon/chuke/msg.png) center no-repeat
        background-size contain
        
    .btn-video
      background-color #ffa200
      &::before
        vertical-align middle
        display inline-block
        width 0.32rem
        height 0.32rem
        margin-right 0.1rem
        margin-bottom 0.05rem
        content ''
        background url(../../assets/icon/chuke/vedio.png) center no-repeat
        background-size contain






</style>


