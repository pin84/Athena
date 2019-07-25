<template>
  <div
    id="search"
    my-index="precisionSearch"
  >

    <div class="u-mask"></div>
    <div id="precisionSearch">
      <div class="magnifierBox">
        <span class="magnifierOut">
          <span class="magnifierInner">
            <span></span>
          </span>
        </span>
      </div>
      <!-- 关闭按钮 s -->
      <div
        class="u-close"
        @click="closePop"
      >
        <img
          class="icon"
          src="../../../assets/icon/close@2x.png"
          alt=""
        >
      </div>
      <!-- 关闭按钮 e -->
      <ul class="list">
        <li class="item">
          <span class="text">行业</span>
          <input
            class="item_input"
            v-model="searchInfo.industryName"
            disabled="disabled"
          >
        </li>
        <li class="item">
          <span class="text">省份</span>
          <input
            class="item_input"
            v-model="searchInfo.provinces"
            disabled="disabled"

          >
        </li>
        <li class="item">
          <span class="text">主营产品/业务</span>
          <input
            class="item_input"
            v-model="searchInfo.business"
          >
        </li>

      </ul>
      <button
        class="searchBtn"
        @click="searchGetInfo"
      >搜索</button>
      <ul
        class="list sp"
        ref="hiddenList"
        v-if="isShowSelectList"
      >
        <li
          v-for="(item,index) in curDatalist"
          :key="index"
          class="item sp-i"
        >
          <span
            class="text"
            
          >{{item.name}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>

import FlowWindow from "./FlowWindow";
import { setTimeout } from "timers";
var that = null;

export default {
  
  components: {
    "flow-window": FlowWindow
  },

  props:{
    pieParams:{
      type:Object,
      default:()=>{
        return{
          provinces:'请选择省份',
          industryid:0,
          industryName:'请选择行业'
        }
      },

    }
  },

  data() {
    return {

      // 动态绑定input框内容
      searchInfo:{
        industryName:this.pieParams.industryName,
        provinces:this.pieParams.provinces,
        business:'',
      },
      // 弹窗获取参数
      getProvince: null,
      getIndustryId: null,

      postData: {
        curSelect: [
          { 0: "a" || "请选择" },
          { 1: "b" || "请选择" },
          { 2: "c" || "请选择" },
          { 3: false }
        ]
      },
      resultList: [], //保存搜索结果列表
      isShowSelectList: false, //是否显示下拉列表
      curDatalist: [],
      curIndex: 0,
      curSelect: [
        { 0: "a" || "请选择" },
        { 1: "b" || "请选择" },
        { 2: "c" || "请选择" },
        { 3: false }
      ],
      thisPageData: ["行业", "省份", "主营产品/业务"],
      count: "" || "0",
      private: "",
      isShowNum: 1,
      companyList: [],
      /** 动画部分s*/
      canRotate: true, //防抖开关
      newdeg: 0, //旋转计数
      deg: {
        transform: "rotate(0deg)"
      },
      isload: "none",
      /**动画部分e */
      bussiness: "", //主营产品/业务
      keyname: "", //企业名称

      // area: [], //省份列表
      wordlistarea: undefined, //已选中的省份
      wordlistindustry: undefined, //已选中的行业
      flowWindow_name: "area",
      isShowFlowWindow: false,
      capital: "",
      exclude: "",
      flag: false,

      industry: [
        { name: "农、林、牧、渔业", id: 1 },
        { name: "采矿业", id: 2 },
        { name: "制造业", id: 3 },
        { name: "电力、热力、燃气及水生产和供应业", id: 4 },
        { name: "建筑业", id: 5 },
        { name: "批发和零售业", id: 6 },
        { name: "交通运输、仓储和邮政业", id: 7 },
        { name: "住宿和餐饮业", id: 8 },
        { name: "信息传输、软件和信息技术服务业", id: 9 },
        { name: "金融业", id: 10 },
        { name: "房地产业", id: 11 },
        { name: "租赁和商务服务业", id: 12 },
        { name: "科学研究和技术服务业", id: 13 },
        { name: "水利、环境和公共设施管理业", id: 14 },
        { name: "居民服务、修理和其他服务业", id: 15 },
        { name: "教育", id: 16 },
        { name: "卫生和社会工作", id: 17 },
        { name: "文化、体育和娱乐业", id: 18 },
        { name: "公共管理、社会保障和社会组织", id: 19 },
        { name: "国际组织", id: 20 }
      ],
      area: [
        { name: "北京" },
        { name: "天津" },
        { name: "上海" },
        { name: "重庆" },
        { name: "河北" },
        { name: "山西" },
        { name: "辽宁" },
        { name: "吉林" },
        { name: "黑龙江" },
        { name: "江苏" },
        { name: "浙江" },
        { name: "安徽" },
        { name: "福建" },
        { name: "江西" },
        { name: "山东" },
        { name: "河南" },
        { name: "湖北" },
        { name: "湖南" },
        { name: "广东" },
        { name: "海南" },
        { name: "四川" },
        { name: "贵州" },
        { name: "云南" },
        { name: "陕西" },
        { name: "甘肃" },
        { name: "青海" },
        { name: "内蒙古" },
        { name: "广西" },
        { name: "西藏" },
        { name: "宁夏" },
        { name: "新疆维吾尔自治区" },
        { name: "香港" },
        { name: "澳门" }
      ],

      selectIndustry: [],
      selectArea: [],
      postToBack: {}, //传给后台的数据
      page: 1 //传给后台的页码
    };
  },  

  beforeCreate() {
    that = this;
  },

  mounted() {
    // this.getProvince = this.$store.state.pop.params.province;
    // this.getIndustryId = this.$store.state.pop.params.industryId;

    // this.postData.curSelect[0][0] = this.industry[this.getIndustryId]["name"];
    // this.postData.curSelect[1][1] = this.getProvince;
  },

  methods: {
    
    

    // 搜索获取新公司信息
    searchGetInfo(){
      if(!this.searchInfo.business){
        this.$toast({
          message:'请输入您的搜索内容！'
        })
        return;
      }
      let {industryid,provinces} = this.pieParams
      
      console.log('industryid,provinces',industryid,provinces);

      this.$axios.get(this.$api.accuracySearch,{
        params:{
          industryid,
          provinces,
          business:this.searchInfo.business,
        }
      }).then(res=>{
        console.log(res);
        
        let  {count,all_count,info,all_info,code} = res.data;
        if(typeof count == 'number' && typeof info ==  'object'){
          let bussiness = this.searchInfo.business;
          this.$emit('newCompany',count,all_count,info,all_info,bussiness);
          this.closePop();
        }else if(code == 1){
          this.$toast({
            message:'暂无相关企业信息'
          })
        }

      })
      .catch(rej=>{
        console.log(rej);
      })


    },

    closePop() {
      this.$emit("close");
    },
    
    search() {
      if (!this.wordlistindustry || !this.wordlistarea) {
        return alert("请选择行业或省份");
      }
      Object.values(this.wordlistindustry).map(item => {
        this.postToBack["id"] = item.id;
      });
      Object.values(this.wordlistarea).map(item => {
        this.postToBack["province"] = item.name;
      });

      console.log(this.$api.precise);

      this.$axios
        .get(`${this.$api.precise}/precise/`, {
          params: {
            industryid: 1,
            province: "西藏",
            page: 1
          }
        })
        .then(res => {
          console.log(res.data);
          this.companyList = res.data.enterprise_data;
          this.count = res.data.count;
        });
    },
    isShow(flag) {
      this.flag = flag;
      this.isShowFlowWindow = true;
    },

  }
};
</script>

<style lang="stylus" scoped>
.u-mask
  background-color: black;
  opacity: .8;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

.u-close
  position: absolute;
  right: 0;
  top: -15px;
  transform: translateY(-100%);
  width: 30px;
  height: 30px;
  .icon
    width: 100%;
  
#precisionSearch
  width 96vw
  background-color #fff
  // height 50%
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%);
  z-index 999
  border-radius 3px
  text-align center
  padding 50px 5px 50px
  box-sizing border-box
  .magnifierBox
    position absolute
    width 55px
    height 55px
    margin 0 auto 
    border-radius 50%
    display flex
    justify-content center
    align-items center
    top -20px
    left 50%
    background-color #ffffff
    z-index 10
    transform translateX(-50%)
    .magnifierOut
      display inline-block
      width 45px
      height 45px
      background-color  #08a3a2
      border-radius 50%
      display flex
      justify-content center
      align-items center
      .magnifierInner
        display inline-block
        width 32px
        height 32px
        background url(../../../assets/icon/magnifier.png) center no-repeat 
        transform scale(0.8)

  .list
    width 100%
    .item
      position relative
      background-color #f3f3f3
      border-radius 3px
      margin-bottom 10px
      display flex
      justify-content space-between
      font-size 0.28rem

      .item_input
        position absolute
        left 50%
        top 50%
        transform translateY(-50%)
        border 0
        background-color #f3f3f3
        text-align left
      /*
      &::before
        content ''
        position absolute
        width 20px
        height 20px
        right 10px
        top 50%
        background url('../../../assets/icon/arrow.png') center no-repeat 
        transform translateY(-50%) rotate(-90deg) scale(0.8)
        */
      .text
        display inline-block
        padding 10px 10px
        &.r
          padding 10px 30px
    &.sp
      position absolute
      top 200px
      height 320px
      overflow-y auto
      padding-bottom 10px
      background-color #f3f3f3
      .sp-i
        justify-content flex-end
        margin-bottom 0
        border-bottom 1px solid #ccc
        border-radius 0
        padding-right 20px
        &::before
           background url('')       
  .searchBtn
    position relative
    width 90%
    padding 12px 30px
    border-radius 20px
    background-color #0ebfc0
    font-size 16px
    color #fff
    box-shadow 0px 0px 4px #ccc
  .resultList
    width 100%
    height 200px
    background #fff
    margin-top 20px
    margin-left -5px
    padding 0 5px
    .top
      display flex
      justify-content space-between
      padding 0 10px
      font-size 0.28rem
    .lista
      width 100%
      text-align left
      .itema
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    .more
      color #0badad  
      border 1px solid #0badad
      border-radius 5px
      margin-top 10px
    .count
      margin-top 10px


</style>


