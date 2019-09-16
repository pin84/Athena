<template>
  <div class="new-chart" >
  <!-- <div class="lianQuan"> -->
    <svg
      :class="{'hidBtns':isHidFreshBtns}"
      id="force-lian"
      width="100%"
      height="100%"
    >
      <symbol
        id="add-group"
        viewBox="0 0 86 86"
        >
        <g>
          <title>background</title>
          <rect
            fill="#000000"
            id="canvas_background"
            height="302"
            width="302"
            y="-1"
            x="-1"
          />
          <g
            display="none"
            overflow="visible"
            y="0"
            x="0"
            height="100%"
            width="100%"
            id="canvasGrid"
          >
            <rect
              fill="url(#gridpattern)"
              stroke-width="0"
              y="0"
              x="0"
              height="100%"
              width="100%"
            />
          </g>
        </g>
        <g>
          <title>Layer 1</title>
          <ellipse
            rx="1"
            id="svg_2"
            cy="122.4375"
            cx="660.5"
            stroke-width="1.5"
            stroke="#000"
            fill="#fff"
          />
          <ellipse
            stroke="#ffffff"
            stroke-dasharray="40,40"
            ry="140"
            rx="140"
            id="svg_4"
            cy="150.999993"
            cx="150"
            stroke-width="10"
            fill="#000000"
          />
          <ellipse
            ry="120"
            rx="120"
            id="svg_5"
            cy="150"
            cx="150"
            stroke-width="10"
            stroke="#ffffff"
            fill="#000000"
          />
          <line
            stroke-linecap="null"
            stroke-linejoin="null"
            id="svg_11"
            y2="224.000007"
            x2="150.000004"
            y1="74.000007"
            x1="150.000004"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="10"
            stroke="#ffffff"
            fill="none"
          />
          <line
            x1="75.000001"
            stroke-linecap="null"
            stroke-linejoin="null"
            id="svg_12"
            y2="145"
            x2="225.000001"
            y1="145"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="10"
            stroke="#ffffff"
            fill="none"
          />
        </g>
      </symbol>

      <symbol
        id="circlepng"
        viewBox="0 0 86 86"
       >
        <circle
          fill="white"
          r="43"
          cx="43"
          cy="43"
        ></circle>
      </symbol>

      <symbol id="add-icon" viewBox="0 0 80 80">
        <!-- <g>
                <title>background</title>
                <rect fill="#000000" id="canvas_background" height="82" width="82" y="-1" x="-1"/>
                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" stroke-width="0" y="1" x="1" height="300" width="300"/>
                </g>
                </g> -->
        <!-- <g> -->
        <!-- <title>Layer 1</title> -->
        <!-- <ellipse rx="1" id="svg_2" cy="123.4375" cx="661.5" stroke-width="1.5" stroke="#000" fill="#fff"/> -->
        <!-- <line stroke-linecap="null" stroke-linejoin="null" id="svg_11" y2="225.000007" x2="151.000004" y1="75.000007" x1="151.000004" fill-opacity="null" stroke-opacity="null" stroke-width="10" stroke="#ffffff" fill="none"/> -->
        <!-- <line x1="76.000001" stroke-linecap="null" stroke-linejoin="null" id="svg_12" y2="146" x2="226.000001" y1="146" fill-opacity="null" stroke-opacity="null" stroke-width="10" stroke="#ffffff" fill="none"/> -->
        <ellipse
          stroke-dasharray="10,10"
          ry="39"
          rx="39"
          id="svg_13"
          cy="40"
          cx="40"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="#000000"
        />
        <ellipse
          ry="34"
          rx="34"
          id="svg_14"
          cy="39.999999"
          cx="39.999999"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="#000000"
        />
        <line
          stroke-linecap="null"
          stroke-linejoin="null"
          id="svg_15"
          y2="40"
          x2="60"
          y1="40"
          x1="20"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="none"
        />
        <line
          stroke="#ffffff"
          stroke-linecap="null"
          stroke-linejoin="null"
          id="svg_16"
          y2="60"
          x2="40"
          y1="20"
          x1="40"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          fill="none"
        />
        <!-- </g> -->
      </symbol>

      <symbol id="lian-main-Bth" viewBox="0 0 80 80">
        <g>
          <circle
            r="30%"
            id="svg_14"
            cx="50%"
            cy="50%"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="2"
            stroke="#ffffff"
            fill="#000000"
          />
        </g>
      </symbol>
      
      <symbol id="main-btn-icon" style="" viewBox="0 0 1024 1024" width="20" height="20" >
        <path d="M67.328278 187.392523c-0.64 12.159992-1.663999 23.999985-1.919999 36.031977-1.663999 59.519963 1.919999 118.783926 11.583993 177.663889 15.48799 93.823941 44.927972 183.039886 91.903942 266.111834 72.191955 127.87192 173.311892 224.959859 307.199808 287.039821 4.159997 1.855999 7.487995 1.919999 11.775993 0 121.407924-55.935965 217.215864-141.439912 287.93582-254.463841 94.847941-151.551905 129.919919-318.335801 122.239924-495.487691-0.32-5.695996-1.087999-11.327993-1.535999-17.087989l-5.759997-0.384a790.399506 790.399506 0 0 1-120.447924-10.751993 761.599524 761.599524 0 0 1-282.815824-108.735932c-3.775998-2.431998-6.399996-2.559998-10.623993-0.128-15.99999 9.791994-32.06398 19.647988-48.70397 28.543982a757.119527 757.119527 0 0 1-307.199808 88.895945c-17.471989 1.151999-35.007978 1.855999-53.631966 2.751998m-63.42396-7.167996a63.039961 63.039961 0 0 1 58.623963-57.279964c27.135983-1.791999 54.527966-2.175999 81.599949-5.119997A688.895569 688.895569 0 0 0 444.032042 12.160632c18.623988-11.839993 37.887976-15.67999 58.879964-8.639994 5.567997 1.919999 11.007993 4.799997 15.93599 7.999995a702.335561 702.335561 0 0 0 266.239833 101.823936c36.223977 6.015996 72.703955 8.767995 109.375932 9.279994 38.719976 0.576 63.99996 25.983984 66.687958 64.83196 3.583998 51.455968 3.071998 102.847936-1.727999 154.111904-16.959989 178.111889-76.095952 339.519788-191.74388 477.951701a713.983554 713.983554 0 0 1-257.535839 195.199878 65.855959 65.855959 0 0 1-57.279964-0.64 718.463551 718.463551 0 0 1-237.439852-172.991892C127.87224 744.768175 69.312277 632.512245 34.688298 507.520323A986.879383 986.879383 0 0 1 0.00032 253.952481c1.279999-24.639985 2.047999-49.279969 3.903998-73.727954z" p-id="2589"></path><path d="M320.00012 587.008273h150.079906V372.992407h-129.919919V320.00044h324.095798v52.991967H531.327988v214.015866h151.999905V640.00024H320.00012z" p-id="2590"></path>
      </symbol>
      <!-- <symbol id="">

      </symbol> -->
    </svg>
    <div v-show="isShowBtnG" class="more-mask">
      <div class="u-mask" @click="isShowBtnG=false"></div>
        <!-- 短信触客 -->
        <div @click="$router.push({path:'/chuke-msg'})" :style="moreBtnLeft" class="more-ubtn ubtn-1" >
          <div class="center-circle">
            <div class="content-circle btng-img-1">
              <!-- <img class="circle-img" src="../../assets/icon/main-btng-1.png"> -->
            </div>
          </div>
        </div>
        <!-- 触客分发 -->
        <div @click="$toast({message:'上下链暂未开放该功能~~'})" :style="moreBtnCenter" class="more-ubtn ubtn-2">
          <div class="center-circle">
            <div class="content-circle  btng-img-2">
              <!-- <img class="circle-img" src="../../assets/icon/main-btng-2.png"> -->
            </div>
          </div>
        </div>

        <!-- 采购 -->
        <div @click="$toast({message:'上下链暂未开放该功能~~'})" class="more-ubtn ubtn-3" :style="moreBtnRight">
          <div class="center-circle">
            <div class="content-circle  btng-img-3">
              <!-- <img class="circle-img " src="../../assets/icon/main-btng-3.png"> -->
            </div>
          </div>
        </div>
    </div>
    <!-- <div class="fresh-btn" @click="freshIndustry">
      <div class="fresh-center-circle">
      </div>
    </div> -->
    <!-- <i class="fresh-btn-icon iconfont">&#xe6a7;</i> -->

    <div v-show="isShowChooseBtns" class="industry-choose-btnG" :style="'height:auto;'">
      <ul>
        <li v-for="(listItem) in industryList" :key="listItem.key" @click="choosePie(showingPieDataType,listItem)" :class="{'active-industry-item':itemSelect==listItem}" class="industry-choose-item" >{{listItem.name}}</li>
      </ul>
      <!-- <i @click.self="btnGShowAll = !btnGShowAll" :class="btnGShowAll?'turn-up':''"  class="iconfont more-btns" >&#xe606;</i> -->
    </div>
    <!-- <div @click="btnGShowAll = false" :class="btnGShowAll?'btng-mask-show':''" class="btng-mask" ></div> -->


    <!-- 显示其他省份信息 s -->
    <div class="hid-provincelist" v-show="showHidProvinceList.length !== 0">
      <div class="hid-provincelist-close" @click="showHidProvinceList=[]">
        +
      </div>
      <ul class="provincelist-ul">
        <li class="provincelist-li ">其他省份</li>
        <li class="provincelist-li"  v-for=" item in showHidProvinceList" :key="item.Name"  @click="provincePop(item.Name)">
          <span class="provincelist-li-name">
            {{item.Name}}
          </span>
          <span class="provincelist-li-count">
            {{item.Count}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 显示其他省份信息 e -->
    <div v-if="companyInfo" @click="toSearchCompany(companyInfo)" :style="`top:${targetProvince[1]}px`" class="company_tag">
      <!-- :style="`margin-left:${targetProvince[0]}px;`" -->
      <div :style="`width:${targetProvince[0]}px;`" class="fill"></div>
      <div class="tag" >
        {{companyInfo.enterprise}}
      </div>
    </div>

    <div v-if="companyInfo" class="company_info_block" >
      <div class="company_info_item">{{companyInfo.enterprise}}</div>
      <div class="company_info_item"> <span class="company_info_des">推荐人数:</span><span class="company_info_val">{{companyInfo.number}}人</span></div>
      <div class="company_info_item"> <span class="company_info_des">采招推荐:</span><span class="company_info_val">{{companyInfo.kind_count}}条</span></div>
      <div class="company_info_item"> <span class="company_info_des">访问人数:</span><span class="company_info_val">{{companyInfo.count}}人</span></div>
      <div class="company_info_item"> <span class="company_info_des">认证情况:</span><span class="company_info_val">{{companyInfo.identity_status?'已认证':'未认证'}}</span></div>
    </div>

    <template>
      <MoreDimenPop @freshMainBtn="saveMainFn" :is-show-main-select='isShowMore' :dimen-data="userDimen" />
    </template>

    <!-- <LabelShow :labelShow="labelShow" :companyInfo="chooseCompany"/> -->

  </div>
</template>

<script>
let vm = null,
  d3 = null;
  
  import MoreDimenPop from "@/components/shangLian/MoreDimenPop";
  
  import downIndustry from "@/assets/js/downIndustry" //下链行业JSON
  import upIndustry from "@/assets/js/upIndustry" //上链行业JSON
  // import LabelShow from "@/components/pop/shanglian/LabelShow";

  import provinceShort from '@/assets/js/Province.json';
  import provinceCode from '@/assets/js/provinceCode.json';

  import chinaGEOJSON from '@/assets/js/china.geo.json';
import { setTimeout } from 'timers';

export default {
  name: "NewChart",
  components: {
    
    MoreDimenPop, //更多 弹窗
    // LabelShow,

  },
  // provinceCode:vm.provinceDict[vm.provinceTrans(ele.data.Name)],
  data() {
    return {
      userInfo:this.$store.state.loginInfo.userInfo,
      userName:this.$store.state.loginInfo.userInfo.username,

      simulation:null,

      //功能选择控制
      // 主按键上加号
      isShowBtnG:false,
      // 饼图放大时是否隐藏 换行业按钮 上下链服务按钮
      isHidFreshBtns:false,
      // 饼图放大时是否显示上链行业
      isShowChooseUpBtns:false,
      isShowChooseDownBtns:false,
      isShowChooseBtns:false, //合并的状态按钮

      btnGShowAll:false,//是否显示全部行业选择按钮
      
      showingPieDataType:null, //正在显示的饼图的类型 up / down

      // 上链选择按钮 下链选择按钮
      upItemSelect:null,
      downItemSelect:null,
      itemSelect:null,

      // 主按键上更多
      isShowMore:{
        isShow:false
      },
      // isShowMainSelect: false, //控制是否显示企业维度信息表

      bottomShow:true, //底部公司 及其相关信息的部分是否显示

      mainFnBtnList:[],

      // 用户维度
      userDimen:[
        {title:'工商信息',value:1,id:0,isCheck:true,isChange:false,isShow:true},
        {title:'每天海报',value:1,id:1,isCheck:true,isChange:true,isShow:true},
        {title:'短信触客',value:1,id:2,isCheck:true,isChange:true,isShow:true},
        {title:'营销漏斗',value:1,id:3,isCheck:true,isChange:true,isShow:true},
        {title:'分发触客',value:1,id:4,isCheck:true,isChange:true,isShow:true},
        {title:'企业自画像',value:1,id:5,isCheck:true,isChange:true,isShow:true},
        {title:'更多',value:1,id:10,isCheck:true,isChange:false,isShow:false},
        {title:'',value:11,id:11,isCheck:true,isChange:false,isShow:false}
      ],

      json: {},
      d3Obj: {},
      svgWidth:0, //svg在屏幕中的宽度
      svgHeight:0, //svg在屏幕中的高度,
      baseSide:0, //比较svgWidth svgHeight 哪个最短就选谁做基线
      isPlus:false, //饼图是否处于放大状态 点击事件需在放大后才可触发
      canDragged:true, // 是否允许被拖拽
      
      // 存储dom对象 s
      bgShade:null, //d3 背景遮罩元素
      plusedNode:null, //被放大的d3选择元素
      showingPlusPie:null, //正在显示的被放大的节点
      createdPlusPie:{}, //存储已被放大过的上下链行业节点
      // 存储dom对象 e
      
      // sizeSet将会自适应改变 s
      textFontSize:16, //饼图文字大小
      pieNodeRadius:50,//饼图半径
      outerRadius:60, // 主按键半径
      borderRadius:60/3, //外边半径
      nodePadding:220, //节点间间距

      // sizeSet将会自适应改变 e

      // mainBtn s
      mainBtnscale:1.4, //主按钮缩放倍数
      mainBtnDiameter:0, //主按钮直径大小
      // mainBtn e

      // botInfoSide s 底部信息栏
      blackSideHeight:0, //获取底部黑边高度
      leftWidth:0, //获取底部左侧空位宽度 用于存放 推荐人数 采招推荐
      rightWidth:0, //获取底部右侧空位宽度 用于存放 访问人数 认证情况
      // botInfoSide e

      // ajax get data s
      upJson:null, //上链数据
      downJson:null, //下链数据
      graphData:null, //d3力图数据 在init()函数中被存储
      // show data e

      // 上下链行业数据
      industryListUp:upIndustry,
      industryListDown:downIndustry,
      industryList:[], //此处将改变数据 改变上链数据 / 下链数据

      // 上链选择数据
      upSelectBtnData:{},
      // 下链选择数据
      downSelectBtnData:{},
      showHidProvinceList:[],
      // 正在显示的饼图的信息
      showingPieInfo:{},
      provinceDict:{}, // 省份简称字典

      labelShow:{
        isShow:false,

      },

      companyInfo:null,

      // 之前用于海报 现在暂时废弃
      chooseCompany: {
        companyName: "",
        companyTags: [],
        enterprisesid: "",
        industryid: 0
      },
      
      activatedFunc:false,

      freshInterval:0,

      targetProvince:[0,0],
    };
  },
  beforeCreate() {
    vm = this;
    d3 = this.$d3;
    
  },

  created() {
    
  },

  async mounted(){

    upIndustry.forEach((ele,index)=>{
      this.upSelectBtnData[ele.name] = index;
    });

    downIndustry.forEach((ele,index)=>{
      this.downSelectBtnData[ele.name] = index;
    });
    
    // 获取用户自定义维度
    this.userDimen = this.$commonFn.handleStroage.getLocalStorage('userDimen') || this.userDimen

    // 请求分别获取上下链数据
    let downDataReq = this.$axios.get(this.$api.downData).then(res=>{
      if(res.data.message){
        this.$toast({
          message:'下链数据加载失败,请重新加载',
        });
      }
      return res.data
    }).catch(rej=>{
      // alert(rej)
      // alert('downData fail')
      console.log(rej)
      return rej
    })
    
    let upDataReq = this.$axios.get(this.$api.upData).then(res=>{
      if(res.data.message){
        this.$toast({
          message:'上链数据加载失败,请重新加载',
        })
      }
      return res.data
    })
    .catch(rej=>{
      console.log(rej)
      this.$toast({
        message:'上链数据加载断开,请重新加载',
      })
      return rej
    })

    let downData = await downDataReq;
    let upData = await upDataReq;
    
    let companyInfo = await this.popHrefBaseInfo();
    
    let willUseCompanyInfo = companyInfo ? companyInfo:this.$store.state.company.indexInfo;
    this.companyInfo = willUseCompanyInfo;
    this.createInit(downData,upData);

    // let getCompanyCreate = function(){};
    // getCompanyCreate = this.$watch('$store.state.company.indexInfo',()=>{
      
    //   if(this.companyInfo === willUseCompanyInfo){return false}
      
    //   if(this.companyInfo === null){return false}
      
    //   getCompanyCreate()

    // },{ immediate:true })

  },
  methods: {
    toSearchCompany(companyInfo){

        this.$router.push({
          name:'searchCompany',
          params:companyInfo,
        })
    },
    createMap(){
    
      const baseLine = this.svgWidth > this.svgHeight ? this.svgHeight : this.svgWidth
      const projection = d3.geoMercator()
                          .scale(baseLine*0.8) //投影比例因子 按比例放大投影
                          .center([105, 16]) //中国地图经纬度中心点
                          .translate([this.svgWidth / 2, this.svgHeight ]);
                              //  .translate([0, 0]);

      const path = d3.geoPath(projection);

      // const colors = d3.scaleOrdinal(d3.schemeBrBG[11]);

      const svg = d3.select('#force-lian')

      const mapG = svg.append('g')
                      .attr('id','mapG');
      
      let mapBlockG =  mapG.selectAll('path')
                          .data(chinaGEOJSON.features)
                          .enter()
                          .append('g')
                          .attr('class','mapBlockG')
                          
      mapBlockG.append('path')
              .attr('d', path)
              .attr('fill', '#e5a21f')
              .attr('stroke', '#946000')
              .attr('stroke-width', 1)
          
      mapG
        .append('g')
        .attr('class','text-group')
        .selectAll('text')
        .data(chinaGEOJSON.features)
        .enter()
        .append('text')
        .html(d=>{
          let ignoreProvince = ['台湾','香港','澳门'];
          if(ignoreProvince.includes(d.properties.name)){ return }
          return d.properties.name;
        })
        .attr('transform',d=>{
          let [ log, lat ] = d.properties.cp;
          let coor = projection([ log, lat ])
          coor[1] = coor[1];
          d.properties.coor = [coor[0],coor[1]+5];
          // let provinceName = vm.provinceTrans(vm.companyInfo.province);
          // d.properties.name === provinceName ? this.targetProvince = d.properties.coor : null;
          
          return `translate(${coor[0]},${coor[1]})`
        })
        .style('fill','#white')
        .style('font-size','0.16rem')
        .style('font-weight','bold')
        .attr('text-anchor','middle') //水平居中
      
    },
    
    createInit(downData,upData){
      this.$store.commit('indexInfo',this.companyInfo);
      
      localStorage.setItem('com-indexinfo',JSON.stringify(this.companyInfo))

      let newJson = this.json2forceData(downData,upData);
      this.$nextTick()
          .then(()=>{
            this.forceDelete();
            this.sizeSet() //屏幕自适
            this.colorIcon()
            this.createMap()
            this.initCoor()
            this.initAtlasPie()  //初始化饼图
            this.simulation = this.init(newJson)  //初始化 主要是初始化图谱
            // this.initBotInfoPie(this.companyInfo)  //初始化 底部饼图
            // this.initBotInfoSide(this.companyInfo)  //初始化底部黑边 以及底部百分比半圆环
            this.createHrefPie(this.simulation) //对应分享信息 假如存在对应信息 则打开放大对应图谱
            
            this.$store.commit('isloading',false);
            this.$indicator.close();
          })
          // .then(this.sizeSet())//屏幕自适应
          // .then(this.colorIcon())
          // .then(this.initAtlasPie()) //初始化饼图
          // .then(this.simulation = this.init(newJson)) //初始化 主要是初始化图谱
          // .then(this.initBotInfoPie(this.companyInfo)) //初始化 底部饼图
          // .then(this.initBotInfoSide(this.companyInfo)) //初始化底部黑边 以及底部百分比半圆环
          // .then(this.createHrefPie(this.simulation)) //对应分享信息 假如存在对应信息 则打开放大对应图谱
          
      return true;
    },

    // 弹出分享时出现的公司弹窗
    popHrefBaseInfo(){
      // enterprise companyName 均是企业名称 只是参数不同 表现不同
      // 含有enterprise 弹出基本信息 含有companyName 弹出企业主营标签
      let { enterpriseid,enterprise,industryid,companyName } = this.$route.query;
      
      if([enterpriseid,enterprise||companyName,industryid].indexOf(undefined) !== -1) {
        return false
      };
      
      if(enterprise){
        this.$store.commit('showPop',{
          popName:'dimen-1',
          params:{
            chooseInfo:{
              enterpriseid,
              industryid,
              enterprise,
            }
          }
        });
      }
      return this.searchNewCompanyInfo(enterpriseid,enterprise||companyName,industryid)
    },

    // 根据企业id 企业名 行业id 获取新的企业信息并数据转换
    async searchNewCompanyInfo(enterpriseid,enterprise,industriesId){
      let companyOtherInfo = await this.$axios.get(this.$api.searchCompany,{
          params:{
            enterpriseid:enterprise,
            industryid:+industriesId
          }
      }).then(res=>res.data).catch(rej=>rej)
      console.log(companyOtherInfo);
      let {code,count,identity_status,kind,kind_count,number,province} = companyOtherInfo;
      
      let authComInfo =  this.$store.state.company.authComInfo;

      if(authComInfo){
          let {
              enterprise:authCompany,
              enterpriseid:authId,
          } = authComInfo;

          if(authCompany == enterprise && authId==enterpriseid){
              identity_status = true
          }

      }

      let companyInfo = {
          code,
          count, //访问数
          enterprise: enterprise,
          enterpriseid: enterpriseid,
          industryid: industriesId,
          number, //推荐数
          kind,
          kind_count,
          identity_status,
          province,
      }

      return companyInfo;

    },

    // 分享获取饼图并显示
    createHrefPie(simulation){
    let { dataType, industryName, industryID} = this.$route.query
      if([dataType,industryID,industryName].indexOf(undefined) !== -1) return ;
      
      this.isPlus = true;
      this.nodePlus(null,simulation,{
        dataType,
        industryID,
        industryName
      })
      
    },

    // 获得省份名 经处理：内蒙古自治区改为内蒙古 
    provinceTrans(provinceName){
      
      let transName = this.$commonFn.provinceNameTrans(provinceName);
      
      return transName
    },

    // 弹出其他省份的弹窗
    async provincePop(provinceName){
      
      let {
        industryid,
        // provinces,
        business,
        logoType,
        up_industry,
        // listData,
        // industryid,logoType,up_industry
      } = this.showingPieInfo;

      this.pieBtnReqCompanyList({
          industryid,
          provinces:provinceName,
          business:'',
          logoType,
          up_industry,
          // listData,
          industryName:provinceName, //仅用于显示
      });
    },

    // 选择 切换饼图
    async choosePie(dataType,btnItem){
      this.pieShareInfoSet(dataType,btnItem.name,btnItem.id)
      this.showHidProvinceList = [];
      if(dataType == 'up'){
        this.upItemSelect = btnItem;
      }else{
        this.downItemSelect = btnItem;
      }
      this.itemSelect = btnItem;

      let showingPlusPie;
      let {name:industryName, id:industryID} = btnItem;
      let pieId = btnItem.name + dataType;

      if(this.createdPlusPie[pieId] == undefined){
        
        // 获取单个行业信息 并将对应信息进行d3数据转换 用以画图

          let industryRes = await this.getIndustryInfo(dataType,industryName,industryID);

          // 接收单个行业的信息的d3数据  创建一个放大的饼图       ↓d3数据
          showingPlusPie = await this.createSinglePlusPie(industryRes);

          // 获取饼图id 用以存储
          let singlePlusPieID
          showingPlusPie.datum(d=>{
            singlePlusPieID = d.id
              return d;
          })
          vm.createdPlusPie[singlePlusPieID] = showingPlusPie;

          showingPlusPie.attr('transform',function(d){
            let scaleX = (vm.baseSide/2.6) / d.radius
            // let industryFontSize = d.industryFontSize;
            // return `translate(${vm.svgWidth/2},${(vm.svgHeight/2)+(vm.svgHeight/2 - ( d.radius + industryFontSize )*scaleX )/2}) scale(${scaleX})`
            return `translate(${vm.svgWidth/2},${vm.svgHeight - (d.radius * scaleX * 1.2)})scale(${scaleX})`
          })
      }else{
        showingPlusPie = vm.createdPlusPie[pieId];
        showingPlusPie.style('display','block')
      }

      vm.isHidFreshBtns = true;
      if(vm.showingPlusPie == showingPlusPie){
        return;
      }
      vm.showingPlusPie.style('display','none');
      vm.showingPlusPie = showingPlusPie;
      
    },


    // 更改企业显示
    async changeCompany(enterpriseid,enterprise,industriesId,hadCompanyInfo){
        console.log('706 changeCompany');
        let companyInfo;
        if(hadCompanyInfo){
          companyInfo = hadCompanyInfo;
        }else{
          companyInfo = await this.searchNewCompanyInfo(enterpriseid,enterprise,industriesId);
          // vm.companyInfo = companyInfo
        }
        this.$store.commit('indexInfo',companyInfo)
        this.companyInfo = companyInfo
        
        localStorage.setItem('com-indexinfo',JSON.stringify(this.companyInfo)); //快搜 采招推荐 用到
        
        this.freshIndustry(); //行业刷新
        // vm.removeBot();
        // vm.initBotInfoPie(companyInfo) //初始化 底部饼图
        // vm.initBotInfoSide(companyInfo) //初始化底部黑边 以及底部百分比半圆环
    },
    // 清空底部边栏
    removeBot(){
      d3.selectAll('.info-pie-g').remove();
      d3.selectAll('.botSide').remove();
      
    },
    // 删除力布局 用于刷新页面
    forceDelete(){
      d3.selectAll('.nodes').remove();
      d3.selectAll('.links').remove();
      d3.selectAll('.nodes-plus').remove();
    },
    // 行业刷新
    async freshIndustry(){
      if(this.freshInterval >8){
        this.$toast({
          message:'刷新过于频繁,请稍后再试'
        })
        setTimeout(()=>{
          this.freshInterval = 0;
        },100000)
        return;

      }
      this.freshInterval++;
      
      // 请求分别获取上下链数据
      let downData = await this.$axios.get(this.$api.downData).then(res=>res.data)
      .catch(rej=>{console.log(rej)})

      let upData = await this.$axios.get(this.$api.upData).then(res=>res.data)
      .catch(rej=>{console.log(rej)})

      let newJson = this.json2forceData(downData,upData)
      this.forceData = newJson //存储力布局数据
      let companyInfo = this.companyInfo
      
      // this.companyInfo = companyInfo;
      this.initCoor();
      this.forceDelete()
      // d3.select('.botSide').remove()
      this.init(newJson)
      // this.initBotInfoSide(companyInfo) //初始化底部黑边 以及底部百分比半圆环
      
    },
    
    // 放大状态恢复回原始状态时对应需要改变的相关操作
    zoomRestore(simulation=this.simulation){
      
      this.showHidProvinceList = [];
      this.isShowMore.isShow = false;
      this.isPlus = false;
      this.canDragged = true;
      this.shade = false;
      this.bgShade.style('display','none');
      this.bgShade.raise();
      this.bottomShow = true;

      let mainNodeG = d3.select('.main');
      if(this.showingPlusPie == 'mainNode'){
        mainNodeG.attr('transform',function(d){
          d.x = vm.svgWidth/2;
          d.y = vm.svgHeight
          // rotate(90) 用于隐藏隐藏半圆
          let botHeight = vm.blackSideHeight; //底部主按钮抬高量
          // vm.blackSideHeight = botHeight; //获取底部黑边高度
          return `translate(${d.x},${d.y - botHeight}) rotate(90) scale(1.5)`
          // rotate(90) 
        })
      }else{
        this.showingPlusPie.style('display','none')
      }
      this.isHidFreshBtns = false
      if(simulation){
        simulation.restart();
      }
      this.isShowChooseBtns = false;
    },

    // 刷新主按钮
    saveMainFn(){
      
      this.zoomRestore();
      this.forceDelete();
      this.init(this.graphData);
      
    },
    // 上下链数据转化为对应力导图所需数据  
    json2forceData(downJson,upJson){
      // dataType 有两种
      //  down up 
      let forceData={};
      forceData.links = [];
      forceData.nodes = [];
      let links = forceData.links,
          nodes = forceData.nodes;

      this.downJson = downJson; //原始的下链数据
      this.upJson = upJson; //原始的上链数据

      let showUp = JSON.parse(JSON.stringify(upJson)) //用于展示的上链数据 将上链数据深克隆 避免影响原始数据
      let showDown = JSON.parse(JSON.stringify(downJson)) //用于展示的下链数据 将下链数据深克隆 避免影响原始数据

      // 节点数据生成 
      let upForceData = this.getPieNodeData(showUp,'up') // 获得转换格式后的上链数据
      let downForceData = this.getPieNodeData(showDown,'down') //获得转换格式后的下链数据

      forceData.links=[...upForceData.links,...downForceData.links]
      forceData.nodes=[...upForceData.nodes,...downForceData.nodes]
      forceData.nodes.push({
        id:'main', //此节点为各个节点的终点 力图中心点
        pieType:'main'
      })

      return forceData
    },

    // 选择图谱后设置分享对应图谱信息
    pieShareInfoSet(dataType,industryName,industryID){
      console.log(dataType,industryName,industryID)
      this.$router.push({
        path:this.$route.path,
        query:{dataType,industryName,industryID},
      })

      let title = `#上下链# ${this.userName}邀请你关注“${industryName}”行业图谱数据探索`,
          desc = `#上下链#  采购招标商机自动推送平台-机会创造价值`
      ;
      this.$store.commit('setShareInfo',{
        title,
        desc,
      })
      this.$store.commit('setFriendNetInfo',{
        title,
        desc,
      })
    },
    
    // 获取单个行业的信息
    async getIndustryInfo(dataType,industryName,industryID){
      let sendParams = {logo:dataType};
      if(dataType == 'up'){
        Object.assign(sendParams,{
          industry_involved:industryName
        })
      }else if(dataType == 'down'){
        Object.assign(sendParams,{
          id:industryID
        })
      }else{
        console.warn('this datatype is illegality ')
        return;
      }

      let getRes = await this.$axios.get(this.$api.singleData,{
        params:{
          ...sendParams,
        },
        
      }).then(res=>res.data)
      .catch(rej=>rej)
      
      let dataTrans = [{
        ClassName:{
          ID:industryID,
          Name:industryName
        },
        Province:[]
      }]

      getRes.forEach((ele)=>{

         let {amount,province}= ele;
         dataTrans[0].Province.push({
           Count:amount,
           Name:province
         })

      })
      let newJson = this.getPieNodeData(dataTrans,dataType)
      
      return newJson.nodes[0]

    },
    
    // 前20外的全部合并为详情
    merge2Details(arr){
      let arrTem = [];
      arrTem = arr.splice(20,arr.length-10);
      let Count = 0;
      arrTem.forEach((ele)=>{
        Count += +ele.Count; //将其他非前20的省份数据统一合并到详情
      })
      arr.push({
        ID:'other',
        Name:'其他',
        Count
      })
      // 返回被合并的数组
      return arrTem;
    },
    // 非主按钮的上下链节点数据转换成d3格式的数据
    getPieNodeData(json,dataType){
        let links = [];
        let nodes = [];
        
        json.forEach((ele)=>{
          // 按照各元素对象的对应属性值降序排序
          // 此方法会直接影响数组本身进行处理 不用重新赋值
          this.$commonFn.dataDesSort(ele.Province,'Count')
          ele.ProvinceAll = JSON.parse(JSON.stringify(ele.Province))
          let ProvinceHid = this.merge2Details(ele.Province)
          ProvinceHid.forEach((ele)=>{
            ele.Count = vm.$commonFn.floatObj.divide(ele.Count,10000).toFixed(2) + '万'

          })
          ele.ProvinceHid =  ProvinceHid

        })
        
        json.forEach(ele=>{
          links.push({
            source:ele.ClassName.Name+dataType, //起源点 起点
            target:'main' // 目标点 终点
          })
        })

        // 接收到的数据
        json.forEach((ele,index)=>{
          
          nodes.push({
            pieType:'pie',
            id:ele.ClassName.Name+dataType, //节点特定ID 此ID用于力图标记 同时 力图通过此ID值显示节点名
            industryName:ele.ClassName.Name,
            industryID:ele.ClassName.ID, //行业ID
            provinceList:ele.Province, //省份值 节点不同省份值的不同显示
            provinceAll:ele.ProvinceAll,
            ProvinceHid:ele.ProvinceHid,
            dataType,
          })
        })

        return {
          links,
          nodes
        }
    },

    // 饼图大小自适应
    sizeSet(){
      let screenWidth = document.documentElement.offsetWidth, //屏幕宽度
          screenHeight = document.documentElement.offsetHeight, //屏幕高度
          baseSide = 0
      ;
      let svg = d3.select("svg"),
       svgWidth = +svg.node().clientWidth,
       svgHeight = +svg.node().clientHeight;
       this.svgWidth = svgWidth;
       this.svgHeight = svgHeight;

      // 非主按钮的节点直径 ! (根据面积/可显示节点数)得到值再开根号得节点直径
      let pieNodeDiameter  =  Math.sqrt((this.svgWidth*this.svgHeight/28));

      if(screenWidth > screenHeight ){
        baseSide = screenHeight
      }else{
        baseSide = screenWidth
      }
      // 基线 屏幕短边为准
      this.baseSide = baseSide
      // pie节点直径/2得节点半径
      this.pieNodeRadius = pieNodeDiameter/2

      // mainBtn 主按钮半径
      this.outerRadius = (baseSide/4/2);
      this.borderRadius = (this.outerRadius /5);

      // 设置节点间作用力
      this.nodePadding = (vm.outerRadius + vm.borderRadius)*2;

      // pie节点行业文字大小
      this.textFontSize = this.pieNodeRadius/3.4;
      
    },

    // 计算 外弧的中部弧点相连直线长
    getOuterArcD(arcAngle,circleRadius){
              // ↑数值型角度值 ↑圆形半径
      if(arcAngle > Math.PI/2){
        return circleRadius;        
      }
      let couAngle =  arcAngle/2
      let countLine = Math.sin(couAngle)*circleRadius
      let OuterArcD = countLine*2;
      // console.log(arcAngle,couAngle,Math.sin(couAngle),circleRadius,countLine)
      // console.log((arcAngle/2)*180/Math.PI)
      return OuterArcD
    },

    // 初始化 图谱模型
    initAtlasPie(){
      
      let svg = d3.select("svg"),
      pieSymbol, // 饼图Symbol标签
      pieG, //
      outerRadius = this.outerRadius, //图谱半径
      colorList =['#61a0a8','#ff8900','#d48265'],
      datas = [
        {title:'t1',value:1},
        {title:'t2',value:1},
        {title:'t3',value:1},
      ],
      pie = d3.pie().value(item=>item.value), //角度生成器
      pieRes = pie(datas),
      arc = d3.arc().innerRadius(0).outerRadius(outerRadius - 2) //圆弧生成器
      ;


      // 饼图symbol 用于被引用
      pieSymbol = svg
                    .append('symbol')
                    .attr('id','pie')
                    .attr('viewBox',`0 0 ${outerRadius * 2} ${outerRadius * 2}`);
      // 饼图G标签 用于内部元素整体操作
      pieG = pieSymbol.append('g')
      
      pieRes.forEach((pieData,index)=>{
        let arcRes = arc(pieData);

        let piePath  = pieG
                        .append('path')
                        .attr('d',arcRes)
                        .attr('stroke','transparent')
                        .attr('fill',colorList[index])
                        
      });
      pieG.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',outerRadius/2)
          .style('fill','black') 

      pieG.attr('transform', `translate(${outerRadius}, ${outerRadius}) rotate(90)`);

    },

    // 渐变色预定义 此处有用于填充按钮
    colorIcon(){
      let svg = d3.select('svg'),
      defs = svg.append('defs'),
      gradient = defs.append('linearGradient'), //渐变色标签
      stopColor = gradient.append('stop'),
      stopColor2 = gradient.append('stop')
      ; //

      gradient.attr('id','main-color')
              .attr("x1", "0%")
              .attr("y1", "0%")
              .attr("x2", "0%")
              .attr("y2", "100%");

      stopColor.attr("offset", "0%")
               .attr("style", "stop-color:rgb(241,241,243);stop-opacity:1");
      stopColor2.attr("offset", "100%")
                .attr("style", "stop-color:rgb(178,178,178);stop-opacity:1");

    },
    
    // 初始化 图谱 #init-start
    init(graphData) {
      
        vm.isPlus = false;
        vm.canDragged = true;
        vm.shade = false;
        let svg = d3.select("#force-lian"),
          svgWidth = this.svgWidth, //svg在屏幕中的宽度
          svgHeight = this.svgHeight; //svg在屏幕中的高度
        svg.append('g')
            .attr('id','force-layout')
        this.graphData = graphData // ajax数据处理后的数据结果

        // simulation 初始化力布局配置
        let simulation = this.initSimulation(),

        // 初始化处理节点间的连线
          link = this.initLinks(graphData),
          // 初始化处理节点
          getNodes = this.initNodes(graphData,simulation), //获取初始化节点后的各个selection
        //  getNodesPlus = this.initNodesPlus(graphData),
          { nodeG, industryNodeG, mainNodeG }= getNodes;

          this.eventManage(getNodes,simulation,graphData,link,industryNodeG,mainNodeG,svgWidth,svgHeight); //事件管理中心
      
        // 实时监听link node的x,y坐标更改
        // simulation.nodes(graphData.nodes).on("tick", ()=>vm.ticked(link,nodeG,svgWidth,svgHeight));
        // 力布局links
        simulation.force("link").links(graphData.links);
        d3.select('svg').append('g').attr('id','node-plus-group');
        return simulation;
    },
    
    initCoor(){
      const mapBlockG = d3.selectAll('.mapBlockG')
      mapBlockG.datum(d=>{
        
        let provinceName = vm.provinceTrans(vm.companyInfo.province);
        
        d.properties.name === provinceName ? this.targetProvince = d.properties.coor : null;
        return d;
      })
    },

    // 初始化力布局
    initSimulation() {
      // simulation.
      let simulation = d3
        .forceSimulation()
        .alphaMin(0.01)
        .force("link",
          d3.forceLink()
            .distance(vm.nodePadding) //节点之间的距离
            .id(function(d) {
              return d.id;
            })
        )
        //节点碰撞检测半径值
        .force("collide",d3.forceCollide().radius(d => vm.outerRadius+vm.borderRadius) )
        // forceManyBody 创建一个使用默认参数的电荷力模型
        // charge 节点间的作用力 正值吸引力 负值排斥力
        .force("charge", d3.forceManyBody())
        //设置中心力的坐标
        // .force("center", d3.forceCenter(vm.svgWidth / 2, vm.svgHeight / 2)); 
        .force("center", d3.forceCenter(vm.svgWidth / 2, vm.targetProvince[1] /2 )); 

        return simulation
    },

    // links 生成节点间连线
    initLinks(graphData) {

      let forceLayout = d3.select('#force-layout')
      let link = forceLayout.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .enter()
        .append("line")
        .attr('stroke','white')

      return link;
    },
    // nodes 生成节点
    initNodes(graphData,simulation) {
      let nodesData = graphData.nodes;
      
      let
      forcelayout = d3.select('#force-layout'),
      nodes,//所有节点 每个节点都包含了nodeG industryPie
      nodeG, // nodes下一级的各个g标签  可操作的节点 包含了industryPie nodeText
      industryNodeG,//饼图节点
      mainNodeG,//主按钮节点
      industryPie,//各个使用use标签的饼图
      nodeText, //每个节点对应的文字描述
      textFontSize = this.textFontSize,  //每个节点的text标签的文字大小
      mainBtnUse,//主按钮的use标签
      addBtnUse,//增加按钮的use标签
      pieBtnUse,//分组按钮的use标签
      // arc = d3.arc(), // d3的arc生成器
      pieNodeRadius = this.pieNodeRadius, //饼图半径
      outerRadius = this.outerRadius, // 主按键半径
      borderRadius = this.borderRadius //外边半径
      ;
      
      // 各个节点
      nodes = forcelayout.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodesData) // 绑定数据
                .enter()
                .datum(function(d,i) {
                // 向被绑定数据里绑定节点宽高
                  switch(d.pieType){
                    case 'main':
                      d.radius = outerRadius+borderRadius;
                    break;
                  }
                  d.nodeOrder = `node-${i}`;
                  return d;
                })

      // 节点组 节点的所有内容
      nodeG = nodes.append('g')
      nodeG.attr('class',function(d){
        if(d.pieType=='pie'){
          return 'industry'
        }
        else{
          return 'main'
        }
      })
      .attr('id',function(d,i){
      //  用于标识每个node 方便操作
        return `node-${i}`;
      })
      .attr('data-industry',function(d){
        return d.id
      })
      .attr('data-industry-id',function(d){
        return d.industryID
      })
           
      // add & pie
      industryNodeG = nodeG.select(function(d){
        if(d.pieType != 'main') {
          return this;
        }
      })
      // mainBtn
      mainNodeG =  nodeG.select(function(d){
        if(d.pieType == 'main') return this
      })
      // this.initMainBtn(mainNodeG,outerRadius,borderRadius) //初始化主按钮

      industryPie = industryNodeG.append("g")
            .attr('class','industry-pie')
            // .attr("width", d=>d.radius*2)
            // .attr("height", d=>d.radius*2)
            // .attr('transform',d=>`translate(${-d.radius},${-d.radius})`)

      // ====================================================================================
      this.initPieNode(industryPie) //生成上下链饼图

      // ====================================================================================

      // 包含text标签
      
      nodeText = nodeG.append('text')
      
      nodeText.style('font-size',textFontSize)
              .attr('class','node-name')
              .attr('fill','white')
              .attr('text-anchor','middle')
              .attr('transform',function(d){
                d.industryFontSize = textFontSize;
                return `translate(0,${d.radius + textFontSize})`
              })
              .html(function(d){
                if(d.pieType == 'pie'){
                  return d.industryName
                }else{
                  return
                }
              })
              .style('font-family','TRENDS')
      
      // 增加遮罩
      let bgShade = d3.select('.nodes')
        .append('rect')
        .attr('id','bg-shade')
        .style('fill','black')
        .style('width','100%')
        .style('height','100%')
        .style('display','none');

      this.bgShade = bgShade;

        nodeG.call(
          d3
            .drag()
            .on("start", (d)=>vm.dragstarted(d,simulation)) //拖拽开始
            .on("drag", (d)=>vm.dragged(d,vm.width,vm.height)) //拖拽中
            .on("end", (d)=>vm.dragended(d,simulation)) //拖拽结束
        );

      return {nodeG,industryNodeG,mainNodeG,industryPie,pieBtnUse,addBtnUse,};
    },
    // 初始化 生成主按钮饼图
    initMainBtn(mainNodeG,outerRadius=130,borderRadius=30){
                          //图谱半径
      
      // 用户自定义维度数据处理 过滤掉无需出现的企业维度按钮
      function getShowBtnData(){
        let isCheckNum = 0;
        return vm.userDimen.filter((ele,index)=>{
          if(vm.userDimen.length-1 != index && ele.isCheck){
            isCheckNum++
          }
          if(vm.userDimen.length-1 == index){
            ele.value = isCheckNum
          }
          return ele.isCheck == true;
        })
      }
      let 
      // 颜色列表
      colorList =['#61a126','#8bd126','#b1e485','#37c2e2','#01add3','#0182a2','#e5a21a','#205066','#466ac6','#f43c3c','#d33131','#a02d65','#e83d9f','#045a4d','#18837b','#1bb4a2'], //色块
      // 获得需要显示的饼图按钮的数据
      datas = getShowBtnData();
      
      let
      fontSize = outerRadius/13, //文字大小

      // 内圆
      circleR = innerRadius+fontSize*1.8,

      // 内环圆
      innerArcBaseR = 0,
      innerArcBesideR = outerRadius/2,

      // 外弧
      outerArcBaseR = outerRadius,
      outerArcBesideR = outerRadius + borderRadius ,

      // 内环圆文字部分
      innerTextArcBaseR = circleR,
      innerTextArcBesideR = outerArcBaseR,

      // 外弧图标部分
      outerIconArcBaseR = outerArcBaseR,
      outerIconArcBesideR = outerArcBesideR

      ;

      let
      // outerRadius = this.outerRadius, // 
      pie = d3.pie().value(item=>item.value), //角度生成器
      pieRes = pie(datas), //生成角度
      innerRadius = outerRadius/2, //内圆半径
      arc = d3.arc().innerRadius(0).outerRadius(outerRadius), //内弧圆内弧生成器
      borderArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius+borderRadius), //外弧坐标位置
      borderIconArc = d3.arc().innerRadius(outerRadius+borderRadius/2).outerRadius(outerRadius+borderRadius), //外弧图标坐标位置
      labelArc = d3.arc().innerRadius(innerRadius+fontSize*1.8).outerRadius(outerRadius), //圆弧上文字坐标位置
      piePathG  = mainNodeG.append('g').attr('id','path-g') // 用于存储弧度
      // pieTextG  = mainNodeG.append('g').attr('id','text-g') //用于存储文字 
      ;

      pieRes.forEach((pieData,index)=>{
        if(pieRes.length-1 == index)return ; 
        let arcRes = arc(pieData), //内大圆
            borderRes = borderArc(pieData), //外边框
            centerPoint = labelArc.centroid(pieData); //内大圆中心点 用于文字显示
        let iconAng = JSON.parse(JSON.stringify(pieData))
        let centerBorder = borderIconArc.centroid(iconAng) //外弧中心点 用于图标显示
        ;
        let dataId =  pieData.data.id
        // console.log(centerBorder,pieData)
        let pathItem = piePathG.append('g') // 用于存储对应角度的内弧以及外弧
                               .attr('class',`path-item-${dataId}`)
                               .attr('data-main-item',dataId)
            
            // 主按钮内环圆 
            pathItem.append('path')
                    .attr('d',arcRes)
                    // .attr('fill',colorList[index])
                    .attr('fill',colorList[index])
                    .attr('data-main-item',dataId)
                    .style('stroke','black')
                    .style('stroke-width','1.3')
            
            // 主按钮外环
            pathItem.append('path')
                    .attr('d',borderRes)
                    .attr('fill','#3a465e')
                    .attr('data-main-item',dataId)
                    .style('stroke','black')
                    .style('stroke-width','1.3')
            // 按钮文字
            pathItem.append('text')
                    .html(function(d){
                      return pieData.data.title
                    })
                    .attr('data-main-item',dataId)
                    .style('fill','white')
                    .style('font-size',fontSize)
                    .attr('text-anchor','middle') //水平居中
                    .attr('dominant-baseline','middle') //垂直居中
                    .attr('transform',`translate(${centerPoint[0]},${centerPoint[1]}) rotate(${ (pieData.startAngle + pieData.endAngle)/2 * 180/Math.PI + 90})`)
                    // .attr('transform',`scale(${(outerRadius/2)/fontSize/4})`)
            
            // 按钮图片
            pathItem.append('g')
                    // .attr('transform',
                    // )
                    .attr('transform',function(d){
                      
                      return `translate(${centerBorder[0]},${centerBorder[1]})`
                    })
                    .append('use')
                    .attr('href','#main-btn-icon')
                    .attr('width',borderRadius/2)
                    .attr('height',borderRadius/2)
                    .attr('fill','white')
                    .attr('transform',`rotate(${(pieData.startAngle + pieData.endAngle)/2 * 180/Math.PI})`)

      });
      /*
        // d3.selectAll('.main-path-item').on('click',(d)=>{
        //   alert('ok');
        //   console.log(d3.event)
        //   console.log(d)
        //   return
        // })
      */
      // 链圈二字 最小圆
      let lianCircle = mainNodeG.append('g')
                               .attr('id','lian-circle')
                               
      // 内圆
      lianCircle.append('circle')
                .attr('cx',0)
                .attr('cy',0)
                .attr('r',innerRadius*1.2)
                .style('fill','black') 

        // 内圆里的 (大+)黄色背景圆
      let mainAddBg = lianCircle.append('circle')
                    .attr('cx',-(innerRadius*1.1)/2)
                    .attr('cy',0)
                    .attr('r',(innerRadius*1.1)/2.2)
                    .style('fill','#f5aa14')
                    .attr('class','recommend')
                    .datum(function(d){
                    //  加号的点击事件
                      let newD = JSON.parse(JSON.stringify(d));
                      newD.func = 'mainAddFunc'
                      return newD
                    })
      // 内圆里的大+
      let mainAdd = lianCircle.append('text')
                  .datum(function(d){
                  //  加号的点击事件
                    let newD = JSON.parse(JSON.stringify(d));
                    newD.func = 'mainAddFunc'
                    return newD
                  })
                  .html('+')
                  .attr('class','recommend')
                  .style('font-size',innerRadius)
                  .attr('text-anchor','middle')
                  .attr('dominant-baseline','middle') //垂直居中
                  .style('fill','white')
                  .attr('transform',function(){
                    // console.log(`translate(${-(innerRadius*1.2)/2},0) rotate(270)`)
                    return `translate(${-(innerRadius*1)/2},0) rotate(270)`
                  })
      mainNodeG.datum(function(d){
        let botHeight = d.radius/3; //底部主按钮抬高量
        vm.blackSideHeight = botHeight; //获取底部黑边高度
        return d
      })  
      vm.mainBtnDiameter = outerArcBesideR*2*1.4 //获取主按钮直径
      vm.leftWidth = (vm.svgWidth - vm.mainBtnDiameter) / 2 //获取左侧宽
      vm.rightWidth = vm.leftWidth //获取右侧宽
      return mainNodeG;
    },
    
    // 初始化行业 上下链 节点
    initPieNode(industryPie){
                // ↑行业节点  ↑是否使用显示全部省份的数据
      let 
      colorList =['#61a126','#8bd126','#b1e485','#37c2e2','#01add3','#0182a2','#e5a21a','#205066','#466ac6','#f43c3c','#d33131','#a02d65','#e83d9f','#045a4d','#18837b','#1bb4a2'], //色块
      datas = [],
      outerRadius = this.pieNodeRadius
      ;

      let
      // 内环圆 由于内环其实是一个圆 中心并非镂空 所以innerArcBaseR为0 中间的上下链北景圆仅覆盖
      innerArcBaseR = 0, //内环圆内弧半径
      innerArcBesideR = outerRadius - 2,   //内环圆外弧半径
      innerWidth = innerArcBesideR - innerArcBaseR, //内环圆半径宽

      // 外环
      outerArcBaseR = innerArcBesideR , //外环内弧半径 与 内环外弧半径 一致！
      outerArcBesideR = outerArcBaseR + innerArcBesideR/5, //外环外弧半径
      outerWidth = outerArcBesideR - outerArcBaseR, //外环半径宽

      // 半径
      iconCircleR =innerWidth/1.55, //上下链文字背景圆半径
      iconCircleBorder = 1.55, //上下链文字背景圆边框大小

      // 数值 此处决定数值位置 内圆至外环内弧的内环
      numArcBaseR = iconCircleR,
      numArcBesideR = innerArcBesideR,
      numArcWidth = numArcBesideR - numArcBaseR, // 数值弧宽度
      numFontSize = numArcWidth/5,

      // 省份 此处决定省份位置 与外环弧一致
      provNameArcBaseR = outerArcBaseR,
      provNameArcBesideR = outerArcBesideR,
      provNameArcWidth = provNameArcBesideR - provNameArcBaseR, 
      provNameFontSize = provNameArcWidth/4

      ;

      // # 调试参数
      // 先用角度生成器生成角度 将对应角度作为参数传入圆弧生成器 得到弧度path 画出圆弧
      //角度生成器
      let creatAngle = d3.pie().value(item=>item.Count)
                               .sort(function(a, b) {
                                //  排序 其他放最后 其余由小到大排序
                                  let other=null;
                                  a.provinceCode == '其他' ? other = a.provinceCode : null;
                                  b.provinceCode == '其他' ? other = b.provinceCode : null;

                                  if(other){
                                    return true
                                  }
                                  return b.provinceCount - a.provinceCount
                                    // return b.index - a.index;
                               })
      
      let innerArc = d3.arc().innerRadius(innerArcBaseR).outerRadius(innerArcBesideR); //内圆弧生成器
      let outerArc = d3.arc().innerRadius(outerArcBaseR).outerRadius(outerArcBesideR); //外弧生成器

      // let numArc = d3.arc().innerRadius(outerRadius/2 + outerRadius/6).outerRadius(outerRadius - 2); //内圆弧上的数字弧生成器
      // let textArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius - 2+outerRadius/5); //外圆弧上的文字弧生成器

      let numArc = d3.arc().innerRadius(numArcBaseR).outerRadius(numArcBesideR); //内圆弧上的数字弧生成器
      
      // let textArc = d3.arc().innerRadius(provNameArcBaseR + provNameArcWidth/5 ).outerRadius(provNameArcBesideR); //外圆弧上的文字弧生成器
      let textArc = d3.arc().innerRadius(provNameArcBaseR).outerRadius(provNameArcBesideR); //外圆弧上的文字弧生成器

      industryPie.datum((d)=>{
        // 捕获d3内数据源 不修改
        // datas.push(d.provinceList)
        d.radius = innerWidth + outerWidth // 更新节点半径
        return d
      })

      // let innerR = outerRadius - 2;
      // let outerR = (outerRadius - 2) + (outerRadius/2 - outerRadius - 3);
      // pieG = industryPie
      //依赖path
      let provinceG = industryPie.selectAll('g')
          // 取绑定数据内的province 并使path都绑定province显示
          // class:province
          // !----------- data修改------provinceList拆成对应privince的各个属性
          .data(function(d){
            
            // d内数据：d.province 此节点含有各省数据
            let {dataType,industryID,industryName,nodeOrder,pieType,provinceList} = d
            // console.log(dataType,industryID,industryName,nodeOrder,pieType);
            let arr = []
            // console.log(provinceList);
            creatAngle(provinceList).forEach((ele,index)=>{
              // console.clear();
              
              arr.push({
                // dataType,industryID,industryName,nodeOrder,pieType,
                ...d,
                innerArc:innerArc(ele), //记录每个饼图内小块的 内弧path
                outerArc:outerArc(ele), //记录每个饼图内小块的 外弧path
                provinceName:ele.data.Name,//省份名
                provinceCode:provinceCode[vm.provinceTrans(ele.data.Name)], //省份简称
                provinceCount:ele.data.Count,//省份总计数
                provinceID:ele.data.ID,//省份ID
                textPosition:textArc.centroid(ele), //文字 外环内
                numPosition:numArc.centroid(ele), //数字 内环内
                angle:ele,//角度
              })
            })

            return arr
          })
          .enter()
          .append('g')

      // 内环圆
      let provinceInnerPath = provinceG.append('path')
                                  .attr('d',function(d){
                                    return d.innerArc
                                  })
                                  .style('stroke','black')
                                  .style('stroke-width','1.3')
                                  .style('fill',function(d,index){
                                    if(index < colorList.length){
                                      return colorList[index]
                                    }else{
                                      return colorList[index%colorList.length]
                                    }
                                  })

      // 外环
      let provinceOuterPath = provinceG.append('path')
                                       .attr('d',function(d){
                                         return d.outerArc
                                       })
                                       .style('stroke','black')
                                       .style('stroke-width','1.3')
                                       .style('fill',function(d,index){
                                         if(index < colorList.length){
                                           return colorList[index]
                                         }else{
                                           return colorList[0]
                                         }
                                       })
                                       .style('fill','#3a465e')

      // 省份名称
      let provinceName =  provinceG.append('text')
                  .attr('text-anchor','middle') //水平居中
                  .attr('dominant-baseline','middle') //垂直居中
                  .html(function(d){
                    return d.provinceCode //修正 省份简称
                    // return d.provinceName
                  })
                  .style('font-size',function(d){
                    return provNameArcWidth / 1.4 //修正 省份简称
                    // return provNameArcWidth / (d.provinceName.length-0.8)
                    // return provNameFontSize
                  })
                  .style('fill','white')
                  .style('font-family','TRENDS')
                  .attr('transform',function(d){
                    let start = d.angle.startAngle
                    let end = d.angle.endAngle
                    let ang = ( start + end ) / 2
                    return `translate(${d.textPosition[0]},${d.textPosition[1]}) rotate(${ ang * 180 / Math.PI })`
                  })

      // 省份数值
      let provinceCount = provinceG.append('text')
                                    .attr('text-anchor','middle') //水平居中
                                    .attr('dominant-baseline','middle') //垂直居中
                                    .html(function(d){
                                      
                                      let showCount = d.provinceCount
                                      showCount = vm.$commonFn.floatObj.divide(d.provinceCount,10000).toFixed(2)
                                      // if(showCount)
                                      d.showCount = showCount+'万'
                                      
                                      return d.showCount
                                    })
                                    .style('font-size',function(d){
                                      
                                      return numArcWidth / (d.showCount.length+1)
                                      // return numFontSize
                                    })
                                    .attr('fill','white')
                                    .style('font-family','TRENDS')
                                    .attr('transform',function(d){
                                      let start = d.angle.startAngle
                                      let end = d.angle.endAngle
                                      let ang = ( start + end ) / 2
                                      return `translate(${d.numPosition[0]},${d.numPosition[1]}) rotate(${ ang * 180 / Math.PI +90})`
                                    })

      // 饼图内圆
      let centerCircleG = industryPie.append('g')
      let centerCircle  = centerCircleG.append('circle')
                                    .attr('r',iconCircleR)
                                    .style('fill',function(d){
                                      if(d.dataType == 'down'){
                                        return 'black'
                                      }
                                      else if(d.dataType == 'up'){
                                        return 'white'
                                      }
                                    })
                                    .style('stroke','black')
                                    .style('stroke-width',iconCircleBorder)
          centerCircleG.append('text')
                     .html(function(d){
                       if(d.dataType == 'down'){
                         return `下`

                       }
                       else if(d.dataType == 'up'){
                         return '上'
                       }
                     })
                     .style('fill',function(d){
                       if(d.dataType == 'down'){
                         return 'white'
                       }else if(d.dataType == 'up'){
                        return 'black'
                       }
                     })
                     .style('font-size',innerWidth/2.5)
                     .style('font-family','TRENDS')
                     .attr('text-anchor','middle') //水平居中
                     .attr('dominant-baseline','middle') //垂直居中
                     .attr('transform',`translate(0,${-innerWidth/4})`)
          centerCircleG.append('text')
                     .html(function(d){
                       if(d.dataType == 'down'){
                         return `"下"为企业客户资源`

                       }
                       else if(d.dataType == 'up'){
                         return `"上"为企业供应资源`
                       }
                     })
                     .style('fill',function(d){
                       if(d.dataType == 'down'){
                         return 'white'
                       }else if(d.dataType == 'up'){
                        return 'black'
                       }
                     })
                     .style('font-size',innerWidth/((`"下"为企业客户资源`).length-2))
                     .style('font-family','TRENDS')
                     .attr('text-anchor','middle') //水平居中
                     .attr('dominant-baseline','middle') //垂直居中
                     .attr('transform',`translate(0,${innerWidth/5})`)
        return industryPie;
    },

    // 初始化行业 上下链 节点
    initPiePlusNode(industryPie){
                // ↑行业节点 
      
      let 
      colorList =['#61a126','#8bd126','#b1e485','#37c2e2','#01add3','#0182a2','#e5a21a','#205066','#466ac6','#f43c3c','#d33131','#a02d65','#e83d9f','#045a4d','#18837b','#1bb4a2'], //色块
      datas = [],
      outerRadius = this.pieNodeRadius
      ;

      let
      // 内环圆 由于内环其实是一个圆 中心并非镂空 所以innerArcBaseR为0 中间的上下链北景圆仅覆盖
      innerArcBaseR = 0, //内环圆内弧半径
      innerArcBesideR = outerRadius - 2,   //内环圆外弧半径
      innerWidth = innerArcBesideR - innerArcBaseR, //内环圆半径宽

      // 外环
      outerArcBaseR = innerArcBesideR , //外环内弧半径 与 内环外弧半径 一致！
      outerArcBesideR = outerArcBaseR + innerArcBesideR/5, //外环外弧半径
      outerWidth = outerArcBesideR - outerArcBaseR, //外环半径宽

      // 半径
      iconCircleR =innerWidth/1.55, //上下链文字背景圆半径
      iconCircleBorder = 1.55, //上下链文字背景圆边框大小

      // 数值 此处决定数值位置 内圆至外环内弧的内环
      numArcBaseR = iconCircleR,
      numArcBesideR = innerArcBesideR,
      numArcWidth = numArcBesideR - numArcBaseR, // 数值弧宽度
      numFontSize = numArcWidth/5,

      // 省份 此处决定省份位置 与外环弧一致
      provNameArcBaseR = outerArcBaseR,
      provNameArcBesideR = outerArcBesideR,
      provNameArcWidth = provNameArcBesideR - provNameArcBaseR, 
      provNameFontSize = provNameArcWidth/4

      ;

      

      // # 调试参数
      // 先用角度生成器生成角度 将对应角度作为参数传入圆弧生成器 得到弧度path 画出圆弧
      let creatAngle = d3.pie().value(item=>item.Count);//角度生成器

      let innerArc = d3.arc().innerRadius(innerArcBaseR).outerRadius(innerArcBesideR); //内圆弧生成器
      let outerArc = d3.arc().innerRadius(outerArcBaseR).outerRadius(outerArcBesideR); //外弧生成器

      // let numArc = d3.arc().innerRadius(outerRadius/2 + outerRadius/6).outerRadius(outerRadius - 2); //内圆弧上的数字弧生成器
      // let textArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius - 2+outerRadius/5); //外圆弧上的文字弧生成器

      let numArc = d3.arc().innerRadius(numArcBaseR).outerRadius(numArcBesideR); //内圆弧上的数字弧生成器
      let textArc = d3.arc().innerRadius(provNameArcBaseR + provNameArcWidth/5 ).outerRadius(provNameArcBesideR); //外圆弧上的文字弧生成器

      industryPie.datum((d)=>{
        // 捕获d3内数据源 不修改
        // datas.push(d.provinceList)
        d.radius = innerWidth + outerWidth // 更新节点半径
        return d
      })

      // let innerR = outerRadius - 2;
      // let outerR = (outerRadius - 2) + (outerRadius/2 - outerRadius - 3);
      // pieG = industryPie
      //依赖path
      let provinceG = industryPie.selectAll('g')
          // 取绑定数据内的province 并使path都绑定province显示
          // class:province
          // !----------- data修改------provinceList拆成对应privince的各个属性
          .data(function(d){
            
            // d内数据：d.province 此节点含有各省数据
            let {dataType,industryID,industryName,nodeOrder,pieType} = d
            let arr = []
            creatAngle(d.provinceAll).forEach((ele,index)=>{
              let ArcMidWidth = vm.getOuterArcD((ele.endAngle - ele.startAngle),innerArcBesideR + outerWidth/2)
              arr.push({
                dataType,industryID,industryName,nodeOrder,pieType,
                innerArc:innerArc(ele), //记录每个饼图内小块的 内弧path
                outerArc:outerArc(ele), //记录每个饼图内小块的 外弧path
                provinceName:ele.data.Name,//省份名
                provinceCount:ele.data.Count,//省份总计数
                provinceID:ele.data.ID,//省份ID
                textPosition:textArc.centroid(ele), //文字 外环内
                numPosition:numArc.centroid(ele), //数字 内环内
                angle:ele,//角度
                ArcMidWidth //外环弧中点宽
              })

            })
            return arr
          })
          .enter()
          .append('g')
          // .attr('class','province')
          .attr('class',function(d){
            if(d.dataType == 'up'){

              return `province-${d.provinceName}`
            }else if(d.dataType == 'down'){
              
              // 用于区分各行业内各省份
              return `province-${d.provinceID}`
            }
          })

      // 内环圆
      let provinceInnerPath = provinceG.append('path')
                                  .attr('d',function(d){
                                    return d.innerArc
                                  })
                                  .style('stroke','black')
                                  .style('stroke-width','1.3')
                                  .style('fill',function(d,index){
                                    if(index < colorList.length){
                                      return colorList[index]
                                    }else{
                                      return colorList[index%colorList.length]
                                    }
                                  })

      // 外环
      let provinceOuterPath = provinceG.append('path')
                                       .attr('d',function(d){
                                         return d.outerArc
                                       })
                                       .style('stroke','black')
                                       .style('stroke-width','1.3')
                                       .style('fill',function(d,index){
                                         if(index < colorList.length){
                                           return colorList[index]
                                         }else{
                                           return colorList[0]
                                         }
                                       })
                                       .style('fill','#3a465e')

      // 省份名称
      let provinceName =  provinceG.append('text')
                  .attr('text-anchor','middle') //水平居中
                  .attr('dominant-baseline','middle') //垂直居中
                  .style('font-size',function(d){
                    d.provinceFontSize = provNameArcWidth / (d.provinceName.length+1)
                    return d.provinceFontSize
                    // return provNameFontSize
                  })
                  .html(function(d){
                    
                    if(d.provinceFontSize * d.provinceName.length > d.ArcMidWidth){
                      d.infoShow = false; //假如文字过小则不再图谱显示

                    }else{
                      d.infoShow = true
                      return d.provinceName
                    }
                    
                  })
                  .style('fill','white')
                  .style('font-family','TRENDS')
                  .attr('transform',function(d){
                    let start = d.angle.startAngle
                    let end = d.angle.endAngle
                    let ang = ( start + end ) / 2
                    return `translate(${d.textPosition[0]},${d.textPosition[1]}) rotate(${ ang * 180 / Math.PI })`
                  })
                  

      // 省份数值
      let provinceCount = provinceG.append('text')
                                    .attr('text-anchor','middle') //水平居中
                                    .attr('dominant-baseline','middle') //垂直居中
                                    .html(function(d){
                                      if(!d.infoShow) return
                                      let showCount = d.provinceCount
                                      showCount = vm.$commonFn.floatObj.divide(d.provinceCount,10000).toFixed(2)
                                      // if(showCount)
                                      d.showCount = showCount+'万'
                                      
                                      return d.showCount
                                    })
                                    .style('font-size',function(d){
                                      if(!d.infoShow) return
                                      return numArcWidth / (d.showCount.length+1)
                                      // return numFontSize
                                    })
                                    .attr('fill','white')
                                    .style('font-family','TRENDS')
                                    .attr('transform',function(d){
                                      let start = d.angle.startAngle
                                      let end = d.angle.endAngle
                                      let ang = ( start + end ) / 2
                                      return `translate(${d.numPosition[0]},${d.numPosition[1]}) rotate(${ ang * 180 / Math.PI +90})`
                                    })

      // 饼图内圆
      let centerCircleG = industryPie.append('g')
      let centerCircle  = centerCircleG.append('circle')
                                    .attr('r',iconCircleR)
                                    .style('fill',function(d){
                                      if(d.dataType == 'down'){
                                        return 'black'
                                      }
                                      else if(d.dataType == 'up'){
                                        return 'white'
                                      }
                                    })
                                    .style('stroke','black')
                                    .style('stroke-width',iconCircleBorder)
          centerCircleG.append('text')
                     .html(function(d){
                       if(d.dataType == 'down'){
                         return '下'
                       }
                       else if(d.dataType == 'up'){
                         return '上'
                       }
                     })
                     .style('fill',function(d){
                       if(d.dataType == 'down'){
                         return 'white'
                       }else if(d.dataType == 'up'){
                        return 'black'
                       }
                     })
                     .style('font-size',innerWidth/2.5)
                     .style('font-family','TRENDS')
                     .attr('text-anchor','middle') //水平居中
                     .attr('dominant-baseline','middle') //垂直居中
                     .attr('transform','translate(0,2)')
        return industryPie;
    },
    
    // 创建一个放大的饼图
    async createSinglePlusPie(industryRes){
                              //↑获取经过转换的单行业d3数据

      let plusNodeGroup = d3.select('#node-plus-group')
                                      // .datum(function(){
                                      //   return industryRes;
                                      // })
      let nodesData = industryRes;
      
      let
      nodes,//所有节点 每个节点都包含了nodeG industryPie
      nodeG, // nodes下一级的各个g标签  可操作的节点 包含了industryPie nodeText
      industryNodeG,//饼图节点
      mainNodeG,//主按钮节点
      industryPie,//各个使用use标签的饼图
      nodeText, //每个节点对应的文字描述
      textFontSize = this.textFontSize,  //每个节点的text标签的文字大小
      mainBtnUse,//主按钮的use标签
      addBtnUse,//增加按钮的use标签
      pieBtnUse,//分组按钮的use标签
      // arc = d3.arc(), // d3的arc生成器
      pieNodeRadius = this.pieNodeRadius, //饼图半径
      outerRadius = this.outerRadius, // 主按键半径
      borderRadius = this.borderRadius //外边半径
      ;
      
      // 各个节点
      nodes = plusNodeGroup
                .append('g')
                .attr('class','single-plus')
                .selectAll("circle")
                .data([nodesData]) // 绑定数据
                .enter()
                .datum(function(d,i) {
                // 向被绑定数据里绑定节点宽高
                  switch(d.pieType){
                    case 'main':
                      d.radius = outerRadius+borderRadius;
                    break;
                  }
                  d.nodeOrder = `node-${i}`;
                  return d;
                })
      //   // 节点组 节点的所有内容
      nodeG = nodes.append('g')
      nodeG.attr('class',function(d){
        if(d.pieType=='pie'){
          return 'industry'
        }
        else{
          return 'main'
        }
      })
      .attr('id',function(d,i){
      //  用于标识每个node 方便操作
        return `node-${i}`;
      })
      .attr('data-industry',function(d){
        return d.id
      })
      .attr('data-industry-id',function(d){
        return d.industryID
      })
           
      
      // add & pie
      industryNodeG = nodeG.select(function(d){
        if(d.pieType != 'main') {
          return this;
        }
      })
      // mainBtn
      mainNodeG =  nodeG.select(function(d){
        if(d.pieType == 'main') return this
      })
      // this.initMainBtn(mainNodeG,outerRadius,borderRadius) //初始化主按钮

      industryPie = industryNodeG.append("g")
            .attr('class','industry-pie')
            // .attr("width", d=>d.radius*2)
            // .attr("height", d=>d.radius*2)
            // .attr('transform',d=>`translate(${-d.radius},${-d.radius})`)

      // ====================================================================================
      this.initPieNode(industryPie) //生成上下链饼图

      // ====================================================================================

      // 包含text标签
      
      nodeText = nodeG.append('text')
      /*
      nodeText.style('font-size',textFontSize)
              .attr('class','node-name')
              .attr('fill','white')
              .attr('text-anchor','middle')
              .attr('transform',function(d){
                d.industryFontSize = textFontSize;
                return `translate(0,${d.radius + textFontSize})`
              })
              
              .html(function(d){
                if(d.pieType == 'pie'){
                  return d.industryName
                }else{
                  return
                }
              })
              .style('font-family','TRENDS')
              */

        // 得到放大的单行业节点
        // let singlePlusPie = this.initPieNode(plusNode);
        // return plusNode
      return nodeG
    },

    // 初始化底部信息饼图
    initBotInfoPie(companyInfo){
      if(companyInfo == undefined){
        console.warn('companyInfo is undefined')
        return 
      }
      let botHeight = this.blackSideHeight, // 获取主按钮抬高量 黑边高度
          leftWidth = this.leftWidth, // 获取主按钮左侧宽度
          rightWidth = this.rightWidth, //获取主按钮右侧宽度
          mainBtnDiameter = this.mainBtnDiameter, //获取主按钮直径
          svgHeight = this.svgHeight,
          svgWidth = this.svgWidth,
          pieX={
            left1:leftWidth/4,
            left2:leftWidth*3/(4+0.2),
            right1:svgWidth - rightWidth + rightWidth * 1/(4-0.6),
            right2:svgWidth - rightWidth + rightWidth * 3/4
          },
          pieY = svgHeight - botHeight // 饼图Y坐标
      ;

      let datas = [
        {title:'showHalf',num:1},
        {title:'hiddenHalf',num:1}
      ]
      

      // Arc 角度生成器
      let creatAngle = d3.pie().value(item=>item.num);//角度生成器

      let infoArc = d3.arc().innerRadius(0).outerRadius(leftWidth/(4+1)); //圆弧生成器
      
      function infoPieFactory(node,colorList,rotateNum=0){
        creatAngle(datas).forEach((ele,index)=>{
          // console.log(ele);
          node.append('path')
              .attr('d',function(){
                return infoArc(ele)
              })
              .style('fill',colorList[index])
              .attr('transform',`rotate(${-270+rotateNum})`)
        })
        node.append('circle')
            .attr('r',(leftWidth/(4+1))/1.5)
        
      }
      
      
      let svg = d3.select('#force-lian')
      let infoPieG = svg.append('g')
                        .attr('class','info-pie-g')
                        
                        
      // 推荐数饼图
      let  recommendedPieG = infoPieG.append('g')
                                    .attr('class','recommended-pieG')
                                    .attr('transform',`translate(${pieX.left1},${pieY})`)
                                    .datum(()=>{
                                      
                                      let d = {
                                        func:'recommend'
                                      }
                                      return d;
                                    })

      let recPie = recommendedPieG.append('path')
                                 .attr('class','rec-pie')

      // 采招推荐饼图
      let dataDegreePieG = infoPieG.append('g')
                                  .attr('class','data-degree-pieG')
                                  .attr('transform',`translate(${pieX.left2},${pieY})`)
                                  .datum(function(){
                                    let d = {}
                                    d.func='tender';
                                    // d.changeText = ;
                                    return d
                                  })

      let dataPie = dataDegreePieG.append('path')
                                  .attr('class','data-pie')

      // 访问人数饼图
      let visitNumPieG = infoPieG.append('g')
                                .attr('class','visit-num-pieG')
                                .attr('transform',`translate(${pieX.right1},${pieY})`)
      let visPie = visitNumPieG.append('path')
                               .attr('class','vis-pie')

      // 认证情况饼图
      let isAuthPieG = infoPieG.append('g')
                               .attr('class','is-auth-pieG')
                               .attr('transform',`translate(${pieX.right2},${pieY})`)
                               
                               .datum(function(){
                                  let d = {}
                                  d.func='isAuth';
                                  return d
                               })
                                
      let isAuthPie = isAuthPieG.append('path')
                               .attr('class','is-auth-pie')

      let {number:recNum,  count:visNum,    identity_status,  kind_count} = companyInfo;
      //        ↑推荐数          ↑访问人数    ↑是否已认证        ↑采招推荐

      // 小饼图 百分比计算 并得到对应旋转角度
      function perCount(recNum){
        if(recNum<0){
          recNum = 0;
        }else if(recNum >= 10000){
          return 180;
        }

        let perNum = recNum/10000;
        return perNum*180;
      }

      // 饼图旋转角度
      let recRotate = perCount(recNum)
      let visRotate = perCount(visNum)
      let dataDegreeRotate = perCount(kind_count)

      let isAuthRotate = identity_status?180:0

      // 生成饼图 以及所需百分比
      infoPieFactory(recommendedPieG,['#e5a21a','#3a465e'],recRotate) //推荐人数
      infoPieFactory(dataDegreePieG,['#0182a2','#3a465e'],dataDegreeRotate) //采招推荐
      infoPieFactory(visitNumPieG,['#f43c3c','#3a465e'],visRotate) //访问人数
      infoPieFactory(isAuthPieG,['#ff8a00','#3a465e'],isAuthRotate) //认证情况

      // 得到小饼图文字大小
      function getFontSize(fontLength){
        let botPieBaseFontWidth = (vm.svgWidth - (vm.rightWidth *2))/5 ;
        let fontSize = botPieBaseFontWidth / fontLength;
        return fontSize+'px'
      }

      // 显示个饼图中心圆内文字信息
      let recText =  recommendedPieG.append('text')
                      .attr('id','recText')
                      .html('推荐↑')
                      .style('fill','orange')
                      .attr('text-anchor','middle') //水平居中
                      .attr('dominant-baseline','text-after-edge') //偏上
                    //  .attr('dominant-baseline','middle') //垂直居中
                      .style('font-size',function(d){
                        return getFontSize('推荐↑'.length);
                      })
      recText.datum(function(){
              let d = {}
              d.func='recommend';
              d.recNum = recNum;
              
              d.isRec = false;
              return d
              })

      // 采招推荐饼图组
      let tender =   dataDegreePieG.append('text')
                        .html(kind_count)
                        .style('fill','white')
                        .attr('text-anchor','middle') //水平居中
                        .attr('dominant-baseline','text-after-edge') //偏上
                      //  .attr('dominant-baseline','middle') //垂直居中
                        .style('font-size',function(d){
                          return getFontSize(kind_count.length*1.5);

                        })

      // 访问人数饼图组
      visitNumPieG.append('text')
                      .html(visNum)
                      .style('fill','white')
                      .attr('text-anchor','middle') //水平居中
                      .attr('dominant-baseline','text-after-edge') //偏上
                    //  .attr('dominant-baseline','middle') //垂直居中
                      .style('font-size',function(d){
                          return getFontSize(visNum.length*1.5);
                      })

      // 认证情况饼图组
      isAuthPieG.append('text')
                      .attr('id','is_auth')
                      .html(identity_status?'已认证':'未认证')
                      .style('fill','white')
                      .attr('text-anchor','middle') //水平居中  
                      .attr('dominant-baseline','text-after-edge') //偏上
                      .style('font-size',function(d){
                        return getFontSize(4);
                      })
                      
                      .datum(function(d){
                        
                        d.identity_status = identity_status?'已认证':'未认证';
                        return d
                      })
                      
        
      
    },
    // 初始化底部信息黑边以及各黑边上的圆弧
    initBotInfoSide(companyInfo){
      
      let botHeight = this.blackSideHeight, // 获取主按钮抬高量 黑边高度
          leftWidth = this.leftWidth, // 获取主按钮左侧宽度
          rightWidth = this.rightWidth, //获取主按钮右侧宽度
          mainBtnDiameter = this.mainBtnDiameter, //获取主按钮直径
          svgHeight = this.svgHeight,
          svgWidth = this.svgWidth
      ;

      let recommendPercent = 0,
          dataPercent = 0,
          visitPercent = 0,
          isAuthPercent = 0
      ;

      let {enterprise} = companyInfo

      if(!enterprise) {
        console.warn('enterprise is undefined or null')
        return
      }
      let svg = d3.select('#force-lian')
      
      // 黑边
        let botSideG = svg.append('g')
                          .attr('class','botSide')
                          .attr('transform',`translate(0,${svgHeight - botHeight})`)
        let botSide = botSideG.append('rect')
                              // .attr('x',0)
                              // .attr('y',svgHeight - botHeight)
                              .attr('width',svgWidth)
                              .attr('height',botHeight)
      let companyName = botSideG.append('text')
                               .html(enterprise) 
                               .style('fill','white')
                               .style('font-size',function(){
                                 if(svgWidth - leftWidth*2 <= botHeight/1.5 * enterprise.length){
                                   
                                   return (svgWidth - leftWidth*2) / enterprise.length
                                 }else{
                                   return botHeight/1.5
                                 }
                               })
                               .attr('text-anchor','middle') //水平居中
                               .attr('dominant-baseline','middle') //垂直居中
                               .attr('transform',function(d){
                                //  svgHeight - botHeight/2
                                 return `translate(${svgWidth/2},${botHeight/2})`
                               })
                               .attr('id','company-name')
                              //  .attr('x',svgWidth/2)
                              //  .attr('y',svgHeight - botHeight/2)
      // 推荐数
      let recommendedNum = botSideG.append('text')
                                   .html('推荐人数')
                                   .style('fill','white')
                                   .style('font-size',botHeight/2)
                                   .attr('text-anchor','middle') //水平居中
                                   .attr('dominant-baseline','middle') //垂直居中
                                   .attr('transform',function(d){
                                     //  svgHeight - botHeight/2
                                     return `translate(${leftWidth/4},${botHeight/2})`
                                   })
                                   .attr('id','recommend-num')
          // 采招推荐
          let dataDegree = botSideG.append('text')
                                   .html('采招推荐')
                                   .style('fill','white')
                                   .style('font-size',botHeight/2)
                                   .attr('text-anchor','middle') //水平居中
                                   .attr('dominant-baseline','middle') //垂直居中
                                   .attr('transform',function(d){
                                     //  svgHeight - botHeight/2
                                     return `translate(${leftWidth * 3/(4+0.2)},${botHeight/2})`
                                   })
                                   .attr('id','data-degree')
          // 访问数
          let visitNum = botSideG.append('text')
                                   .html('访问人数')
                                   .style('fill','white')
                                   .style('font-size',botHeight/2)
                                   .attr('text-anchor','middle') //水平居中
                                   .attr('dominant-baseline','middle') //垂直居中
                                   .attr('transform',function(d){
                                     //  svgHeight - botHeight/2
                                     return `translate(${svgWidth - rightWidth + rightWidth * 1/(4-0.6)},${botHeight/2})`
                                   })
                                   .attr('id','visit-num')
          // 认证情况
          let isAuth = botSideG.append('text')
                                   .html('认证情况')
                                   .style('fill','white')
                                   .style('font-size',botHeight/2)
                                   .attr('text-anchor','middle') //水平居中
                                   .attr('dominant-baseline','middle') //垂直居中
                                   .attr('transform',function(d){
                                     //  svgHeight - botHeight/2
                                     return `translate(${svgWidth - rightWidth + rightWidth * 3/4 },${botHeight/2})`
                                   })
                                   .attr('id','is-auth')
        return {
          companyName, //公司名称
          recommendedNum, //推荐人数
          dataDegree, //采招推荐
          visitNum, //访问人数
          isAuth, //认证情况
          // provinceName, //省份名称
        }
    },

    // 用于实时更新link 跟 node 的 xy坐标
    ticked(link,industryNodeG,mainNodeG,width,height) {
      // width 与 height 分别是 svg的宽高
      
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return vm.targetProvince[0];
          
          // return d.target.x;
        })
        .attr("y2", function(d) {
          return vm.targetProvince[1];
          // return d.target.y;
        });

      // 上下链节点
      industryNodeG
        .attr('transform',function(d){
          
          if(d.pieType == 'main'){
            // 主节点永远放在中心底部处
            // d.x = vm.svgWidth/2;
            // d.y = vm.svgHeight;
            d.x = vm.targetProvince[0];
            d.y = vm.targetProvince[1];
            
            // rotate(90) 用于隐藏隐藏半圆
            let botHeight = d.radius/3; //底部主按钮抬高量 
            // return `translate(${d.x},${d.y - botHeight}) rotate(90) scale(${vm.mainBtnscale})`
            return `translate(${d.x},${d.y})`
            
          }

          //防止非主节点得饼图越界
          if( d.x <= d.radius){
            d.x = d.radius
          }
          if( d.x > width - d.radius){
            d.x = width - d.radius
          }
          if( d.y <= d.radius ){
            d.y = d.radius 
          }
          if( d.y > height - d.radius){
            d.y = height - d.radius
          }

          return `translate(${d.x},${d.y})`
        });
      

      // 主按钮节点 
      // mainNodeG.attr('transform',function(d){
      //   d.x = vm.svgWidth/2;
      //   d.y = vm.svgHeight
      //   // rotate(90) 用于隐藏隐藏半圆
      //   let botHeight = vm.blackSideHeight; //底部主按钮抬高量
      //   // vm.blackSideHeight = botHeight; //获取底部黑边高度
      //   return `translate(${d.x},${d.y - botHeight}) rotate(90) scale(1.5)`
      //   // rotate(90) 
      // })

      mainNodeG.attr('transform',function(d){
        // d.x = vm.svgWidth/2;
        // d.y = vm.svgHeight;
        d.x = vm.targetProvince[0];
        d.y = vm.targetProvince[1];
        // rotate(90) 用于隐藏隐藏半圆
        let botHeight = vm.blackSideHeight; //底部主按钮抬高量
        // vm.blackSideHeight = botHeight; //获取底部黑边高度
        // return `translate(${d.x},${d.y - botHeight}) rotate(90) scale(1.5)`
        
        return `translate(${d.x},${d.y})`
        // rotate(90) 
      })

    },
    
    // 用于管理点击事件
    eventManage(nodeList,simulation,graphData,link,industryNodeG,mainNodeG,svgWidth,svgHeight){
      // 可用d3通过类名选或者通过已有选择变量进行事件添加
      
      let svg = d3.select('svg')
      svg.on('click',function(){
        
        let Target = d3.event.target;
        let func, dData, TargetNode;
        // ↑ 用于存储点击事件标识

        let TargetD3Obj = d3.select(Target);

        TargetD3Obj.datum(function(d){

          if(d){
            func =  d.func;
            dData = d;
            return d
          }
        })
        
        // 其他的点击事件
        if(func){
          switch(func){
            // 推荐人数+1
            case 'recommend':
              let company_id = vm.$store.state.company.indexInfo.enterpriseid,
                  token = vm.$store.state.loginInfo.userInfo.token,
                  industryid = +vm.$store.state.company.indexInfo.industryid;
              let isRec;
              d3.select('#recText').datum(function(d){
                  isRec = d.isRec
                  return d;
              })
              if(isRec){
                // 是否已推荐 true 已推荐 false 未推荐
                vm.$toast({
                  message:"你已经推荐过该企业"
                })
                return;
              }
              // /* 程序出错
              vm.$axios.post(vm.$api.Recommend,{
                company_id,
                industryid,
                token,
                i_recommend:true,
              })
              .then(res=>{
                console.log(res);
                let { message } = res.data;
                console.log(message)
                let addRecNum =0;
                if(message){
                  vm.$toast({
                    message
                  })
                }else{
                  vm.$toast({
                    message:"推荐成功"
                  })
                  addRecNum++;
                }
                d3.select('#recText').html(function(d){
                    d.isRec = true;
                    return d.recNum + addRecNum;
                })
              })
              .catch(rej=>{
                console.log(rej);
              })
            
            
            break;

            case 'tender':
              vm.$router.push('recommand')
              break;
            
            // 点击右下角未认证饼图
            case 'isAuth' :
              let status = vm.$store.state.company.indexInfo.status;
              if(status === false){
                vm.$router.push({
                  name:'autConfig'
                })
              }
                          
            break;
            // 中间按钮的加号点击事件
            case 'mainAddFunc' :
              // vm.$toast({
              //   message:'上下链暂未开放此功能,请期待我们的到来哦~~~'
              // })
              vm.isShowBtnG = true;
              return
            break;

          }
          return
        }
        //假如点击到了 [背景遮罩] 则取消全屏
        switch(Target){
          
          case vm.bgShade.node(): // 背景遮罩
          
            vm.zoomRestore(simulation);
            // vm.plusedNode.attr('style','display:none')
          break;
          default:
        }

        // 触发推荐按钮
        if(Array.prototype.indexOf.call(Target.classList,'recommend') !== -1){
          return
        }
        // 以上属于非节点放大后的点击事件

        // 以下属于节点放大后的点击事件
        // 假设该target含有d3绑定数据 该判断为判断节点 s
        d3.select(Target).datum((d)=>{console.log(d) ;return d;})
        if(!Target.__data__) return //不含d3数据不做处理 即饼图
        
        if(Target.__data__.nodeOrder) {
          //假如不是绑定的className(节点内绑定的数据)则退出
          let plusItem = d3.select('#'+Target.__data__.nodeOrder),
          pieType = Target.__data__.pieType //得知是哪一类饼图
          ;

          // 节点放大操作 要放大后才能操作饼图内按钮
          if(!vm.isPlus) {
            vm.isPlus = true;
            vm.nodePlus(plusItem,simulation); //对应节点是否需要放大也在该函数进行判断
            return;

          }else{
            // 放大后操作饼图内按钮
            switch(pieType){
              case 'main':
                // 用于代表该按钮是第几个按钮 取类名最后的数字
                let btnOrder = Target.dataset.mainItem
                vm.mainBtnItem(btnOrder) //对应按钮放大 并且不同btnOrder实现不同的的点击事件
              break;
              case 'pie':
                vm.pieBtnItem(Target);
              break;
              case 'add':

              break;
            }
          }
          
        }
        // 假设该target含有d3绑定数据 该判断为判断节点 e
        /*
        if(Target.__data__.type === "Feature"){
          const coor = Target.__data__.properties.coor;
          vm.targetProvince = coor;
          
          simulation.alphaTarget(1).restart();
          setTimeout(()=>{
            simulation.alphaTarget(0);
          },1000)
        }
        */
      });

      let init = true;
      // let timeout = []
      var timeout = null;
      // 实时监听link node的x,y坐标更改
      simulation.nodes(graphData.nodes).on("tick", ()=>{
        // timeout.forEach(ele=>{
        //   clearTimeout(ele);
        // })
        // timeout.push(
        /*
        if(timeout !== null){
          clearTimeout(timeout);
          clearTimeout(timeout._id);
        }
        timeout = setTimeout(()=>{
            init = false;
            vm.ticked(link,industryNodeG,mainNodeG,svgWidth,svgHeight)
            console.log('ready')
            
        },200)
        if(!init){
          console.log('run')
          vm.ticked(link,industryNodeG,mainNodeG,svgWidth,svgHeight)
        }
        */
        vm.ticked(link,industryNodeG,mainNodeG,svgWidth,svgHeight)
      
      });
      
    },

    // 省份按钮请求公司列表数据
    async pieBtnReqCompanyList(pieBtnInfo){
      let {
        industryid, //行业id
        provinces, //省份名称
        business, //搜索范围
        logoType, //区分上链还是下链 up / down
        up_industry, //上链传参用的行业名称
        industryName, //列表将要显示的行业名
      } = pieBtnInfo
      
      /*
      let companyLsData = await this.$axios.get(this.$api.searchPrinceCom,{
        params:{
          industryid,
          provinces,
          logo:logoType,
          up_industry:logoType=='up'?up_industry:'',
        }
      }).then(res=>res.data).catch(rej=>rej)
      */

      let companyLsData = await this.$ajax.getCompanyListData({
        industryid,
        provinces,
        logo:logoType,
        up_industry,
      });


      this.$store.commit("showPop", {
        popName: 'CompanyList',
        params: {
          pName:provinces,
          insId:industryid,
          logo:logoType,
          up_industry,
          // listData,
          companyLsData,
          industryName, //仅用于显示
        }
      });
    },

    // 非主节点的饼图节点点击放大后点击各省份的事件
    async pieBtnItem(Target){
      let 
      industryid, //请求参数 行业ID
      industryName, //显示参数 行业名称 用于精准检索 需先传入companyList 后companyList传入至进准检索
      provinces, //请求参数 省份名称
      logoType, //请求参数 区分上下链
      up_industry, //请求参数 上链必须 下链不必
      
      nodeOrder, // 获取对应行业节点 Order 用于与对应按钮的class相关联
      provinceID, //获取省份ID 用于与对应按钮的class相关联 其他的按钮的值为 other
      ProvinceHid //被隐藏的省份
      ;

      // 从被点击的节点中获取数据
      d3.select(Target).datum(function(d){
        // console.clear();
        // console.log(d);
        industryName = d.industryName;
        industryid = d.industryID;
        provinces = d.provinceName;
        logoType = d.dataType;
        up_industry = d.industryName;

        nodeOrder = d.nodeOrder;
        ProvinceHid = d.ProvinceHid;
        provinceID = d.provinceID; //其他的按钮的值为 other
        return d;
      })
      // 使饼图中心大圆形不触发事件 不弹出窗口
      if(!provinces) return;
      
      let clickSelect = (function(){
          // 上链对应的省份名 下链对应省份ID
          if(logoType == 'up'){
            console.log(`.province-${provinces}`)
            return `.province-${provinces}`
          }else if(logoType == 'down'){
            return `.province-${provinceID}`
          }
      }());

      // 点击时的省份弹出动画
      // let orderBtn = d3.select(`#${nodeOrder}`).select(clickSelect)
      // orderBtn.attr('transform','scale(1.2)')
      // setTimeout(()=>{
      //   orderBtn.attr('transform','scale(1)')
      // },1000);

      // 弹窗弹出

      if(provinceID!== 'other'){

        // 饼图按钮获取企业列表信息
        this.pieBtnReqCompanyList({
          industryid,
          provinces,
          business:'',

          logoType,
          up_industry,
          // listData,
          industryName, //仅用于显示
        });

      }else{
        // 当点击饼图中的其他按钮时
        
        vm.showingPieInfo =  {
          industryid,
          // provinces,
          business:'',
          logoType,
          up_industry,

          // industryid,
          // logoType,
          // up_industry: logoType=='up'?up_industry:null,
        }
        // industryid,
        // logoType,
        // up_industry: logoType=='up'?up_industry:null,
        
        // 被隐藏的其他省份列表
        vm.showHidProvinceList = ProvinceHid


      }

    },

    // 点击事件处理
    mainBtnItem(order){
      //获得order 得知是主节点的哪个按钮被触发 并触发相关事件
      // console.log(order)
      // if(order == '0'){
      //   this.$toast({
      //     message:'上下链暂未开放该功能，敬请期待~~~'
      //   })
      //   return
      // }
      let orderBtn = d3.select(`.path-item-${order}`)
      orderBtn.attr('transform','scale(1.2)')
      setTimeout(()=>{
        orderBtn.attr('transform','scale(1)')
      },1000)
      let {
        enterprise:companyName,
        kind,
        enterpriseid:enterprisesid,
        industryid,
      } = vm.$store.state.company.indexInfo;
      
      switch(order){
        case '0':
          console.log('0')
          vm.$store.commit("showPop", {
            popName: "dimen-" + (+order+1),
            params: {
            }
          });
        break;
        case '1':
          console.log('1');
          console.log('每天海报');
          
          let chooseCompany = {
            companyName,
            companyTags:kind,
            enterprisesid,
            industryid,
          }
          
          vm.$router.push({
            name:'poster',
            params:chooseCompany
          })
          
          // vm.labelShow.isShow = true;
        break;
        case '2':
          vm.$router.push({
            path:'/chuke-msg'
          });

        break;
        case '5':
          
          vm.bus.$emit('labelShowCall', enterprisesid,companyName,industryid, vm.$store.state.company.indexInfo );
          
        break;

        case '9':
          console.log('9')
        break;
        case '10':  
          vm.isShowMore.isShow = !vm.isShowMore.isShow
        break;
        default:
        console.log(order);
        this.$toast({
          message:'上下链暂未开放该功能，敬请期待~~~'
        });
        return;
      }

      // if(order !== 1){
      //   vm.$store.commit("showPop", {
      //     popName: "dimen-" + (+order+1),
      //     params: {
      //     }
      //   });

      // }

    },

    // 点击节点后节点放大
    async nodePlus(plusItem,simulation,hrefPieInfo=null){
      let plusOrder,
          plusNode,
          pieType,

          dataType, //数据类型 up / down
          industryName, //行业名称
          industryID, //行业id
          pieId //饼图对应id 唯一标识
      ;

      // 节点被放大时 无法拖动
      this.canDragged = false;
      // 打开背景遮罩
      this.bgShade.style('display','block');
      simulation.stop();
      vm.isHidFreshBtns = true;
      vm.bottomShow = false;
      if( plusItem !== null ){
        plusItem.datum(function(d){
          plusOrder = d.nodeOrder;
          pieType = d.pieType;
  
          dataType = d.dataType;
          industryName = d.industryName;
          industryID = d.industryID;
          pieId = d.id
  
          return d
        })
      }else if( hrefPieInfo !== null ){
        dataType = hrefPieInfo.dataType,
        industryName = hrefPieInfo.industryName,
        industryID = hrefPieInfo.industryID;
      }

      let showingPlusPie;

      // 主节点方大
      if(pieType == 'main'){
        plusItem.raise() //将其排序至最后 以改变显示层级 顺序靠后 显示优先级越高
            .attr('transform',function(d){
              // (基线/2)[基线半径]/节点半径 == 缩放倍数[满屏] 多出得0.4是为了调节大小 调得小一点
              let scaleX = (vm.baseSide/2.4) / d.radius
              // console.clear();
              console.log(d.pieType)
              if(d.pieType=='main'){
                pieType = 'main'
                return `translate(${vm.svgWidth/2},${vm.svgHeight/2}) scale(${scaleX}) rotate(90)`
              }
              // else{

                // return `translate(${vm.svgWidth/2},${vm.svgHeight/2}) scale(${scaleX})`
              // }
            })
        showingPlusPie = 'mainNode';
        // return
      }else{
        // 上下链节点放大
        
        // 选择行业饼图
        this.pieShareInfoSet(dataType,industryName,industryID)
        if(vm.createdPlusPie[pieId] == undefined){
          // 获取单个行业信息 并将对应信息进行d3数据转换 用以画图
          let industryRes = await this.getIndustryInfo(dataType,industryName,industryID);
          
          // 接收单个行业的信息的d3数据  创建一个放大的饼图       ↓d3数据
          showingPlusPie = await this.createSinglePlusPie(industryRes);

          // 获取饼图id 用以存储
          let singlePlusPieID
          showingPlusPie.datum(d=>{
            singlePlusPieID = d.id
            return d;
          })
          vm.createdPlusPie[singlePlusPieID] = showingPlusPie;
          
          // 将创建的饼图放大位移至中心显示
          showingPlusPie.attr('transform',function(d){
            let scaleX = (vm.baseSide/2.6) / d.radius
            // let industryFontSize = d.industryFontSize;
            // return `translate(${vm.svgWidth/2},${(vm.svgHeight/2)+(vm.svgHeight/2 - ( d.radius + industryFontSize )*scaleX )/2}) scale(${scaleX})`
            
            return `translate(${vm.svgWidth/2},${vm.svgHeight - (d.radius * scaleX * 1.2)})scale(${scaleX})`
          })
          
        }else{
          // 从已缓存的饼图中读取并展示饼图
          showingPlusPie = vm.createdPlusPie[pieId];
          showingPlusPie.style('display','block')

        }

        dataType=='up'? vm.industryList = upIndustry : vm.industryList = downIndustry;
        vm.isShowChooseBtns = true;
        vm.showingPieDataType = dataType;
        // 去除请求得到的行业名称里面的空格
        industryName = (function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')}(industryName))
        // 通过 上/下链 对应的行业名称获取对应对象 从而获取缓存了的[selectIndex]对应的每个饼图的id
        let selectIndex = this[dataType+'SelectBtnData'][industryName];
        // selectIndex !== undefined? vm[dataType+'ItemSelect'] = vm['industryList'][selectIndex]: null;
        // 对应的饼图id是否不存在 不存在则存入缓存对象中 否则不操作
        selectIndex !== undefined? vm['itemSelect'] = vm['industryList'][selectIndex]: null;
        
      }
      vm.showingPlusPie = showingPlusPie;
      
    },

    // 初始化将要被放大的节点
    initNodesPlus(graphData){

      let
      forcelayout = d3.select('#force-layout'),
      nodes,//所有节点 每个节点都包含了nodeG industryPie
      nodeG, // nodes下一级的各个g标签  可操作的节点 包含了industryPie nodeText
      industryNodeG,//饼图节点
      mainNodeG,//主按钮节点
      industryPie,//各个使用use标签的饼图
      nodeText, //每个节点对应的文字描述
      textFontSize = this.textFontSize,  //每个节点的text标签的文字大小
      mainBtnUse,//主按钮的use标签
      addBtnUse,//增加按钮的use标签
      pieBtnUse,//分组按钮的use标签
      // arc = d3.arc(), // d3的arc生成器
      pieNodeRadius = this.pieNodeRadius, //饼图半径
      outerRadius = this.outerRadius, // 主按键半径
      borderRadius = this.borderRadius //外边半径
      ;

      // 各个节点
      nodes = forcelayout.append("g")
                .attr("class", "nodes-plus")
                .selectAll("circle")
                .data(graphData.nodes) // 绑定数据
                .enter()
                .datum(function(d,i) {
                // 向被绑定数据里绑定节点宽高
                  switch(d.pieType){
                    case 'main':
                      d.radius = outerRadius+borderRadius;
                    break;
                  }
                  d.nodeOrder = `node-${i}`;
                  return d;
                })
      // 节点组 节点的所有内容
      nodeG = nodes.append('g')
      nodeG.attr('class',function(d){
        if(d.pieType=='pie'){
          return 'industry'
        }
        else{
          return 'main'
        }
      })
      .attr('id',function(d,i){
      //  用于标识每个node 方便操作
        return `node-${i}`;
      })
      .attr('data-industry',function(d){
        return d.id
      })
      .attr('data-industry-id',function(d){
        return d.industryID
      })
      .attr('style','display:none')
           
      
      // add & pie
      industryNodeG = nodeG.select(function(d){
        if(d.pieType != 'main') {
          return this;
        }
      })
      // mainBtn
      mainNodeG =  nodeG.select(function(d){
        if(d.pieType == 'main') return this
      })
      // this.initMainBtn(mainNodeG,outerRadius,borderRadius) //初始化主按钮

      industryPie = industryNodeG.append("g")
            .attr('class','industry-pie')
            // .attr("width", d=>d.radius*2)
            // .attr("height", d=>d.radius*2)
            // .attr('transform',d=>`translate(${-d.radius},${-d.radius})`)

      // ====================================================================================
      this.initPiePlusNode(industryPie) //生成上下链饼图

      // ====================================================================================

      // 包含text标签
      
      nodeText = nodeG.append('text')
      
      nodeText.style('font-size',textFontSize)
              .attr('class','node-name')
              .attr('fill','white')
              .attr('text-anchor','middle')
              .attr('transform',function(d){
                return `translate(0,${d.radius + textFontSize})`
              })
              .attr('transform',function(d){
                d.industryFontSize = textFontSize;
                return `translate(0,${d.radius + textFontSize})`
              })
              .html(function(d){
                if(d.pieType == 'pie'){
                  return d.industryName
                }else{
                  return
                }
              })
              .style('font-family','TRENDS')

      // 增加按钮  
      // addBtnUse = industryPie
      //             .select(function(d){
      //               if(d.pieType == 'add') return this
      //             })
      // addBtnUse.attr("xlink:href", "#add-icon")
      //          .attr('class','add-btn')

      // 分组按钮  
      // pieBtnUse = industryPie
      //             .select(function(d){
      //               if(d.pieType == 'pie') return this
      //             })
      // pieBtnUse.attr("xlink:href", "#pie")
      //          .attr('class','pie-btn-use')
    
      
      // 增加遮罩
      // let bgShade = d3.select('.nodes')
      //   .append('rect')
      //   .attr('id','bg-shade')
      //   .style('fill','black')
      //   .style('width','100%')
      //   .style('height','100%')
      //   .style('display','none');

      // this.bgShade = bgShade;

        // nodeG.call(
        //   d3
        //     .drag()
        //     .on("start", (d)=>vm.dragstarted(d,simulation)) //拖拽开始
        //     .on("drag", (d)=>vm.dragged(d,vm.width,vm.height)) //拖拽中
        //     .on("end", (d)=>vm.dragended(d,simulation)) //拖拽结束
        // );

      return {nodeG,industryNodeG,mainNodeG,industryPie,pieBtnUse,addBtnUse,};
    },
    
    // 触摸到对应的node会触发 包括点击 拖拽
    dragstarted(d,simulation) {
      if(d.pieType=='main') return
      if(!this.canDragged) return;
      //d3.event.active 当你点击过一下以后 就不存在了 所以当鼠标始终拖拽饼图时持续触发restart()
      if (!d3.event.active) simulation.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
    },

    // 拖拽中
    dragged(d,width,height) {
      if(d.pieType=='main') return
      // 无法拖动到边界外
      if(d3.event.x <= 0 || d3.event.y <= 0 || d3.event.x >= width || d3.event.y >= height ) return;
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    },
    // 拖拽结束
    dragended(d,simulation) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    
  },
  computed:{
    
    moreBtnLeft:function(){
      
      // 大圆直径
      let diameter = this.svgWidth - this.leftWidth*2
      let radius = diameter/3
      let testObj = {
        bottom:`${diameter/4}px`,
        width:`${this.pieNodeRadius*1.25*1.25}px`,
        height:`${this.pieNodeRadius*1.25*1.25}px`,
        left:`${this.leftWidth}px`,
      }
      return testObj

    },

    moreBtnCenter:function(){
      
      // 大圆直径
      let diameter = this.svgWidth - this.leftWidth*2
      let radius = diameter/3
      let testObj = {
        bottom:`${diameter/(2 - 0.5)}px`,
        width:`${this.pieNodeRadius*1.25*1.25}px`,
        height:`${this.pieNodeRadius*1.25*1.25}px`,
        left:`50%`,
        // right:`${this.svgWidth - this.leftWidth}px`
      }
      return testObj

    },

    moreBtnRight:function(){
      // 大圆直径
      let diameter = this.svgWidth - this.leftWidth*2
      let radius = diameter/3
      let testObj = {
        bottom:`${diameter/4}px`,
        width:`${this.pieNodeRadius*1.25*1.25}px`,
        height:`${this.pieNodeRadius*1.25*1.25}px`,
        left:`${this.leftWidth + diameter}px`,
      }
      return testObj

    }

  },

  activated(){
    console.log('activated')
    if(this.activatedFunc !== false){
      console.log('activated run!!!')
      this.$nextTick(()=>{

        this.activatedFunc.func(...this.activatedFunc.params)
        
        this.activatedFunc = false
      })
      
    }

  },
  deactivated(){
    this.bus.$on('changeCompany',(enterpriseid,enterprise,industriesId,hadCompanyInfo)=>{
      console.log('changeCompany listen')
      this.activatedFunc = {};
      this.activatedFunc.params = [enterpriseid,enterprise,industriesId,hadCompanyInfo]
      this.activatedFunc.func = this.changeCompany
    })
  },
  destroyed(){
    this.bus.$off('changeCompany');
  }
};
</script>
<style lang="scss">
  .company_tag{
    
    position:absolute;
    color:white;
    transform: translate(0%,-150%);
    display:flex;
    width:100%;

    .fill{
      
    }

    .tag{
      border:1px solid white;
      background-color:rgba(0,0,0,0.8);
      white-space: nowrap;
      padding:3px;
      border-radius: 6px;
      transform:translate(-10%);

    }

  }

  .company_info_block{
    position:absolute;
    left:2%;
    bottom:0;
    color:white;
    display:flex;
    flex-direction: column;
    font-size: 0.24rem;

    .company_info_item{
      display:inline;
      flex:0;
      margin: 2px auto 2px 0 ;
      padding:4px;
      background:#292929;
      min-width:100px;
      border-radius: 4px;

      &:nth-child(2)>.company_info_val{
        color:#b5464a;
      }
      &:nth-child(3)>.company_info_val{
        color:#1e8296;
      }
      &:nth-child(4)>.company_info_val{
        color:#aa8541;
      }
      &:nth-child(5)>.company_info_val{
        color:#a6a6a6;
      }
    }
    
    .company_info_des{
      margin-right: 0.2rem;
    }

  }
  
  .mint-indicator-wrapper{
    z-index:100;
  }
  .mint-indicator-mask{
    z-index:100;
  }

  .new-chart{
    width:100%;
    height:100%;
    position:relative;
  }
  
  .more-mask{
    position: absolute;
    top:0;
    left:0;
    right:0;
    height:100%;
    .u-mask{
      width:100%;
      height:100%;
      background:rgba(0,0,0,.5)
    }

    // 主按钮中加号点击后三个按钮的样式
    .more-ubtn{
      
      position:absolute;
      left:0;
      // background: #03303050;
      background:rgba(5, 255, 0, 0.22);
      border-radius: 50%;
      text-align:center;
      vertical-align:middle;
      display:flex;


      .center-circle{
        display:flex;
        width:80%;
        height:80%;
        border-radius: 50%;
        margin: auto;
        // background:#18697250;
        background:rgba(5, 255, 0, 0.3137254902);
        // background:rgba(68, 160, 30, 0.7803921568627451);
      }

      .content-circle{
        display:flex;
        flex-direction:column;
        flex-wrap: nowrap;
        width:80%;
        height:80%;
        border-radius: 50%;
        margin: auto;
        background:white;
        font-size: 1em
      }

      .circle-img{
        width:74%;
        height:auto;
        margin:10% auto auto;

      }

      &.ubtn-1{
        transform: translate(-50%,0);

      }

      &.ubtn-2{
        transform: translate(-50%,0);

      }

      &.ubtn-3{
        transform: translate(-50%,0);

      }

      .btng-img-1{
        background-color:white;
        background-image:url('../../assets/icon/main-btng-1.png');
        background-repeat: no-repeat;
        background-size:74%;
        background-position:center 30%;

      }

      .btng-img-2{
        background-color:white;
        background-image:url('../../assets/icon/main-btng-2.png');
        background-repeat: no-repeat;
        background-size:74%;
        background-position:center 30%;

      }

      .btng-img-3{
        background-color:white;
        background-image:url('../../assets/icon/main-btng-3.png');
        background-repeat: no-repeat;
        background-size:auto 74%;
        background-position:center;

      }

    }

    
  }
  // 换一批按钮样式
  .fresh-btn{
    position:absolute;
    display:flex;
    left: 2%;
    bottom: 10%;

    border-radius:50%;
    width:1rem;
    height:1rem;

    background:rgba(5, 255, 0, 0.3137254902);
    box-shadow:0px 0px 0px 8px rgba(5, 255, 0, 0.22);
  }

  .fresh-center-circle{
    display:flex;
    margin:auto;
    border-radius:50%;    
    width:0.8rem;
    height:0.8rem;

    background-color: white;
    background-image:url('../../assets/icon/fresh-icon.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 70%;
    
  }

  .fresh-btn-icon{
    
    margin:auto;
    font-size:0.5rem;
    color:#09a3a3;
  }
  // 用于隐藏换行业按钮以及上下链服务按钮
  .hidBtns{
    z-index:5;
    position:relative;

  }

  // 上下链饼图放大后的行业选择框样式
  .industry-choose-btnG{
    position:absolute;
    left:50%;
    top: 0.2rem;
    transform: translate(-50%,0);
    width:100%;
    z-index:7;
    height:20%;
    overflow: hidden;
    
    // background: white;
    .more-btns{
      position: absolute;
      right: 2%;
      top: 1rem;
      color:white;
      transition: all 0.4s;
      transform:rotate(0deg);
      opacity: 1;
    }
    .turn-up{
      transform:rotate(-180deg);
      opacity: 0;
    }
  }

  .btng-mask{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:100%;
    background: black;
    opacity: 0;
    z-index:6;
    transition: opacity .2s;

  }
  .btng-mask-show{
    bottom:0;
    opacity: 0.8;

  }

  .industry-choose-item{
    float:left;

    font-size:0.24rem;
    color:white;
    border:2px solid white;
    background-color:#363636;
    border-radius: 0.3rem;
    padding: 0 10px;
    margin: 0.05rem 0.05rem;
  }
  .active-industry-item{
    color:orange;
    border-color:orange;
  }
  .hid-provincelist{
    position:absolute;
    z-index:8;
    background: rgba(0, 0, 0, 0.82);
    left:4%;
    top: 1.15rem;

  }

  .hid-provincelist-close{
    position:absolute;
    right:0;
    top:0;
    width:0.5rem;
    height:0.5rem;

    font-size: 0.5rem;
    line-height: 0.5rem;
    text-align:center;
    color:white;
    font-weight: 100;

    background: #363636;
    border-radius: 50%;

    transform: translate(50%,-50%) rotate(45deg);

  }
  .provincelist-ul{
    padding: 0.1rem;


  }
  .provincelist-li{
    display:flex;
    justify-content : space-between;
    color:white;
    font-size:0.3rem;
    margin: 0.1rem 0;

    &:nth-of-type(1){
      text-align: center;
      display:block;

    }

  }
  .provincelist-li-name{

  }
  .provincelist-li-count{
    margin-left: 0.1rem;
  }
</style>
