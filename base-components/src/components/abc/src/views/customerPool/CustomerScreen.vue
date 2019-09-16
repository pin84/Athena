<template>
  <div id="customer-screen">

    <div class="header">
      <div class="g-header">
        <img
          class="header-img"
          :src="require('@/assets/icon/customerPoolHeader.png')"
          alt=""
        >
      </div>

      <div class="g-setting_bar">
        <div><span class="setting_bar-left-b1">共推荐潜在客户: </span><span class="theme-color">{{count||0}}家企业</span></div>
        <!-- <div class="iconfont">筛选&#xe64a;</div> -->
      </div>
    </div>

    <SelectList
      title='潜在客户行业'
      :dataList='industries'
      class="mb"
      @selectItem='selectItemIndustries'
    />
    <SelectList
      title='潜在客户省份'
      :dataList='province'
      class="mb"
      @selectItem='selectItemProvince'
    />
    <SelectList
      title='潜在客户企业名称包含'
      :dataList='companyTags'
      :isAllowAllSelect='false'
      class="mb"
      @selectItem='selectItemCompanyTags'
    />
    <SelectList
      title='潜在客户企业主营/服务标签'
      :dataList='serviceTags'
      :isAllowAllSelect='false'
      class="mb"
      @selectItem='selectItemSevice'
    />

    <div class="p">

      <section>
        <span class="type-title">企业生日(成立日期)</span>
        <select
          name=""
          id="day-select"
          ref="select"
          v-model="postData.selectDay"
        >
          <option
            class="opt"
            :value="day"
            v-for='(day,index) in dateList'
            :key='index'
          >{{day}}</option>
        </select>
        <span>天前推荐</span>
      </section>

      <section class="money">
        <span class="type-title">注册基金</span>
        <ul class="money-list">
          <li
            class="item"
            :class="{'active':item.active}"
            v-for='(item,index) in registeredSelectData'
            :key='index'
            @click="selectMoney(item,index)"
          >{{item.label}}</li>
        </ul>

      </section>
    </div>

    <div class="btn-submit">
      <span
        class="reset"
        @click="reset"
      >重置</span>
      <span
        class="submit"
        @click="submit"
      >确定</span>
    </div>
  </div>
</template>
<script>
import SelectList from "@/components/common/SelectList";
import CustomerSelect from "@/components/customerPool/CustomerSelect.vue";
import AreaJSON from '@/assets/js/area.json';
import CustomerSetting from '@/views/customerPool/CustomerSetting.vue';

export default {
  mixins:[CustomerSetting],
  
  data() {
    return {
      count:0,

      // userInfo:this.$store.state.loginInfo.userInfo,
      // // --获取配置信息 s

      // //从组件传值回来 s
      // getSelectedIndustry:[], //行业
      // getSelectedProvince:[], //省份
      // getCompanyNameKeyWords:[], //企业 名称关键词
      // getMainBussinessKeyWords:[], //企业 主营业务或经营产品
      // //从组件传值回来 e

      // getDataListVal:'不限',
      // wechatPushState:false, //微信推送状态
      // customPoolState:false, //客户池状态
      // industrySrcData:[{id:0,industry:'全行业'}],
      
      industries: [
        {
          label: "建筑业"
        },
        {
          label: "房地产业"
        }
      ],
      province: JSON.parse(JSON.stringify(AreaJSON)),
      companyTags: [
        { label: "互联网" },
        { label: "印刷品" },
        { label: "服装" }
      ],
      serviceTags: [{ label: "小程序" }, { label: "服务" }, { label: "美食" }],
      registeredSelectData: [
        {
          label: "100万以内",
          active: false,
          val: "0,100"
        },
        {
          label: "100-500万",
          active: false,
          val: "100,500"
        },
        {
          label: "500-1000万",
          active: false,
          val: "500,1000"
        },
        {
          label: "1000-3000万",
          active: false,
          val: "1000,3000"
        },
        {
          label: "3000-5000万",
          active: false,
          val: "3000,5000"
        },
        {
          label: "5000万以上",
          active: false,
          val: "5000,20000"
        }
      ],
      selectDateFlag: false,
      // dayList: [7, 15, 20, 30],
      moneySection: [
        "100万以内",
        "100-500万",
        "500-1000万",
        "1000-3000万",
        "3000-5000万",
        "5000万以上"
      ],
      postData: {
        industries: [],
        province: [],
        comTags: [],
        sevice: [],
        selectDay: "7",
        capital: ""
      }
    };
  },

  async activated() {
    
    await this.getConfigData();
    this.dataTrans();
    this.count = this.$route.params.count;

  },

  components: {
    SelectList,
    CustomerSelect
  },
  methods: {

    dataTrans(){
      this.industries
      
    },

    submit() {
      console.log(`=======`, this.postData);
    },
    reset() {
      [
        ...this.industries,
        ...this.province,
        ...this.companyTags,
        ...this.serviceTags,
        ...this.registeredSelectData
      ].forEach(item => {
        if (item.active) {
          item.active = false;
        }
      });

      this.postData = {};
    },
    selectItemIndustries(label) {
      this.handllerData(
        this.postData.industries,
        label,
        this.industries[0].label
      );
    },
    selectItemProvince(label) {
      this.handllerData(this.postData.province, label, this.province[0].label);
    },
    selectItemCompanyTags(label) {
      this.handllerData(this.postData.comTags, label);
    },
    selectItemSevice(label) {
      this.handllerData(this.postData.sevice, label);
    },

    handllerData(arr, str, originData = "") {
      str === originData ? (str = "") : str;
      if (str === "") {
        arr.length = 0;
        arr.push(str);
      } else {
        if (arr.includes("")) {
          arr.splice(0, 1);
        }

        let index = arr.indexOf(str);

        if (index !== -1) {
          arr.splice(index, 1);
          return;
        }
        arr.push(str);
      }
    },

    selectMoney(item, index) {
      this.registeredSelectData.forEach(item => {
        if (item.active) {
          item["active"] = false;
        }
      });
      item["active"] = true;
      this.postData.capital = item.label;
    }
  }
};
</script>

<style lang="stylus" scoped>
.theme-color{
    color: #15696c;
}

themeColor = #09a4a3
.common
  height 0.8rem
  line-height 0.8rem
  border-radius 0.08rem
  text-align center

#customer-screen
  width 100%
  height 100%
  background-color #fff
  box-sizing border-box
  font-size 0.32rem
  overflow scroll
  padding-bottom 2.8rem
  .header
    padding 0.2rem
    background-color black
    .g-header
      height: 1.6rem;
      text-align: center;
      line-height: 1.6rem;
      .header-img
        vertical-align: middle;
        height: 0.5rem;
        width: auto;
    .g-setting_bar
      display flex
      justify-content space-between  
      .setting_bar-left-b1,.iconfont
        color:#ccc;
  .mb
    margin-bottom 0.2rem
    box-shadow 0 0 0.2rem #ccc
  .p  
    padding 0 0.2rem  
    .type-title
      font-weight 600
      margin-right 0.2rem
    #day-select
      position relative
      margin-right 0.1rem
      width 2rem
      height 0.6rem
      border-radius 0.05rem
      color themeColor
      padding-left 0.1rem
      font-size 0.32rem
      appearance none
      background url(../../assets/icon/userCenter/triangle-gray.png) no-repeat 90%
      background-size 0.2rem 0.2rem

    .money
      margin 0.2rem 0  
      .money-list
        width 100%
        display flex
        flex-wrap wrap 
        justify-content space-around
        font-size 0.28rem
        .item
          @extend .common
          width 30%
          margin 0.1rem 0
          background-color #f3f3f3  
          &.active
            background-color #37bbb9
            color #fff
  .btn-submit
    position fixed
    bottom 1rem
    left 0
    right 0
    width 100%
    display flex
    justify-content space-around
    padding 0.3rem 0
    background-color #fff
    span 
      @extend .common
      display inline-block
      border-radius 0.5rem
    .reset
      width 25%
      background-color #f3f3f3
    .submit
      color #fff
      width 70%
      background-color themeColor    




</style>