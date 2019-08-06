<template>
  <div data-id="chart_Component">
    <!--自画像生成中加载动画 s-->
    <div
      class="chartLoading"
      v-show="ischartLoading"
    >
      <div class="chartLoadingImg">
        <img
          src="../../assets/icon/285.gif"
          class="w"
        />
      </div>
      <p class="mar_t_20 main_color_ffffff">自画像正在生成中...</p>
    </div>

    <!--自画像生成中加载动画 e-->

    <!-- 企业维度 s -->
    <transition>
      <!-- isShowMainSelect 控制是否显示企业维度信息表 -->
      <div
        class="index-mainSelect"
        v-show="isShowMainSelect"
      >
        <p
          class="index-mainSelect-close"
          @click="isShowMainSelect=false"
        >
          <i class="iconfont">&#xe603;</i>
        </p>
        <div class="index-mainSelect-title main_color_ffffff">
          勾选关注的企业维度
        </div>
        <div
          class="index-mainSelect-wrapper"
          ref="mainSelect"
        >
          <ul class="w">
            <!--  mainFnBtnList： 最终获取到的企业维度信息-->
            <li
              class="index-mainSelect-sec main_color_ffffff"
              v-for="(item) of mainFnBtnList"
              :key="item.id"
            >
              <div class="weui-cells_checkbox">
                <label :for="item.id">
                  <div class="mar_r_20">
                    <input
                      type="checkbox"
                      class="weui-check"
                      name="checkbox1"
                      :id="item.id"
                      v-model="item.isCheck"
                      :disabled="item.id==1"
                    >
                    <i
                      class="iconfont"
                      :style="{'color':item.isCheck?'#e3000b':'#fff'}"
                    >{{item.isCheck?'&#xe632;': '&#xe681;' }}</i>
                  </div>
                  <div>{{item.title}}</div>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="index-serNote-con-btn">
          <!--- 保存维度信息 --->
          <a
            class="dis_bl main_bgcolor_ff8800 main_color_ffffff"
            style="width:100%"
            @click="saveMainFn"
          >保存</a>
        </div>
      </div>
    </transition>
    <!-- 企业维度 e -->

    <template v-if="this.$store.state.loginInfo.showingCId != ''">
      <!-- 基本信息 s-->
      <base-info></base-info>
      <!-- 基本信息 e-->

      <!-- 股东信息 s-->
      <shareholder-info></shareholder-info>
      <!-- 股东信息 e-->

      <!-- 主要人员信息 s-->
      <key-person></key-person>
      <!-- 主要人员信息 e-->

      <!-- 对外投资 s -->
      <!-- <foreign-investment></foreign-investment> -->
      <!-- 对外投资 e -->

      <!-- 企业认证提示 s -->
      <set-enterprise-tips></set-enterprise-tips>
      <!-- 企业认证提示 e -->

      <!-- 设置企业认证 s -->
      <set-enterprise></set-enterprise>
      <!-- 设置企业认证 e -->
      </template>
  </div>
</template>

<script>
import Vue from "vue";
import * as d3 from "d3";
import axios from "axios";
import BScroll from "better-scroll";
// 基本信息
const BaseInfo = resolve => {
  import("@/components/shangLian/dimenPop/BaseInfo").then(module => {
    resolve(module);
  });
};
// 股东信息
const ShareholderInfo = resolve => {
  import("@/components/shangLian/dimenPop/ShareholderInfo").then(module => {
    resolve(module);
  });
};
// 主要人员信息
const KeyPerson = resolve => {
  import("@/components/shangLian/dimenPop/KeyPerson").then(module => {
    resolve(module);
  });
};
// 对外投资
const ForeignInvestment = resolve => {
  import("@/components/shangLian/dimenPop/ForeignInvestment").then(module => {
    resolve(module);
  });
};
// 设置企业认证提示
const SetEnterpriseTips = resolve => {
  import("@/components/pop/certification/setEnterpriseTips").then(module => {
    resolve(module);
  });
};

// 设置企业认证
const SetEnterprise = resolve => {
  import("@/components/pop/certification/setEnterprise").then(module => {
    resolve(module);
  });
};

// import ComPop from '@/components/common/ComPop'
// import commonFn from "@/assets/js/commonFn";
// let baseurl = "";
var funTarget = null;
let vm = null;

/**
 * 在画图函数内 的getM函数 该函数添加了饼图内维度按钮的点击事件
 * 饼图维度按钮添加点击事件 插入部分 #$weiduClick s
 * gw.on("click", function () {
 * d3.select(this).classed("btnActive", function () {
 * 饼图维度按钮点击事件 插入部分 e
 *
 * 画图函数 getMainFnBtn
 * 更新饼图 饼图数据的函数 refreshInfo
 * 插入企业维度按钮的属性值 改变显示的值 checkDimensionInfo
 * 现在大致流程是在画图函数内 先更新好数据 refreshInfo
 * 再更新显示值 checkDimensionInfo
 * 然后再进行画图操作
 *
 * getM函数有获取数据并将数据写入到DOM对象的地方 #$DOMdata
 */
export default {
  components: {
    BaseInfo, //基本信息弹窗
    ShareholderInfo, //股东信息弹窗
    KeyPerson, //主要人员信息
    ForeignInvestment, //对外投资
    SetEnterpriseTips, //企业认证
    SetEnterprise //设置企业认证
  },

  props: {
    // 接收该用户是否有认证企业
    isApprove: Boolean,
    id: {
      type: String,
      default: ""
    },
    userInfo: {
      // 接收用户信息
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      //当前自画像显示企业的id
      cID: "",
      streamData: {
        upData: {
          data: [], //这里将会获取上链饼图信息
          total: 0 //这里将会获取上链信息总和
        },
        downData: {
          data: [], //这里将会获取下链饼图信息
          total: 0 //这里将会获取下链信息总和
        },
        title: "", //这里将会获得饼图的标题
        visit: 0, //将获得被访问数
        rec: 0 //将获得被推荐数
      },
      //默认状态下未选择维度时显示
      dataCheckdimension: [
        { slice: 0, segment: 1, value: 20, color: "#3A6E86", title: "" },
        { slice: 0, segment: 2, value: 5, color: "#3A6E86" },
        { slice: 0, segment: 3, value: 10, color: "" }
      ],

      // 这个是饼图
      streamData2: {
        nodes: [
          {
            id: "main", //节点ID
            name: "main", //节点名
            data: [] //节点内数据
            /**
             * @data
             * {
             *   color: "#3A6E86"
             *   offset: 0
             *   segment: 1
             *   slice: 0
             *   title: ""
             *   value: 20
             * }
             */
          }
        ],
        edges: [],
        companyName: "", //公司名
        visitNum: "", //访问数
        recNum: "" //推荐数
      },
      newUser: false,
      userInfoChart: null,
      saveInfoList: null, // 保存需要保存的信息 保存接口需要调用
      //功能list
      mainFnBtnList: [
        { title: "", isCheck: false, id: "", color: "", en: "", icon: "" }
      ],

      //功能选择控制
      isShowMainSelect: false, //控制是否显示企业维度信息表
      ischartLoading: false, //控制是否显示 loading 图

      // 控制放大时不进行任何饼图操作
      isClick: false,
      // !warn 这里的行业ID从1开始 所以index+1
      industryList:['农、林、牧、渔业','采矿业','制造业','电力、热力、燃气及水生产和供应业','建筑业','批发和零售业','交通运输、仓储和邮政业','住宿和餐饮业','信息传输、软件和信息技术服务业','金融业','房地产业','租赁和商务服务业','科学研究和技术服务业','水利、环境和公共设施管理业','居民服务、修理和其他服务业','教育','卫生和社会工作','文化、体育和娱乐业','公共管理、社会保障和社会组织','国际组织'],
      

    };
  },

  watch: {
    "userInfoChart.chbIsDefaultPage": {
      handler(newName, oldName) {
        // console.log(newName)
        if (d3.select("#certification")) {
          //console.log(d3.select("#certification").className)

          //if (newName) {
          //    d3.select("#certification").classed("dis_none",false)
          //} else {
          //    console.log("未认证")
          //    d3.select("#certification").attr("class", "dis_none")
          //}
          d3.select("#certification").classed("dis_none", function(d) {
            if (newName) {
              return false;
            }
            return true;
          });
        }

        //
      },
      immediate: true,
      deep: true
    },

    // ?为什么我要监听cID(企业ID)
    // *因为只有cID更新了 有值了 才可以进行下面的操作
    // cID获取后的操作
    // 下面的程序是 在用户登录之初 我们将首先获取企业维度信息 并更新视图

    "$store.state.loginInfo.showingCId": {
      handler: function(newCId) {
        if (newCId != "") {
          // console.log(newCId,'newCIdnewCIdnewCIdnewCIdnewCIdnewCIdnewCId');
          // !查询已勾选的企业维度
          function getCheckdimension() {
            return vm.$axios.post(vm.$api.GetCheckdimension, {
              // params:{
              //   id:commonFn.handleStroage.getLocalStorage("userInfo").ID || vm.userInfoChart.ID,
              pageIndex: 1,
              pageSize: 30,
              where: [
                {
                  name: "userid",
                  value: vm.$store.state.loginInfo.userInfo.ID
                  // vm.$commonFn.handleStroage.getLocalStorage("userInfo").ID,
                }
              ]
              // }
            });
          }

          // !获取企业维度链接
          function SelectDimDetial() {
            return vm.$axios.post(vm.$api.SelectDimDetial, {
              // params:{
              //   id:commonFn.handleStroage.getLocalStorage("userInfo").ID || vm.userInfoChart.ID,
              pageIndex: 1,
              pageSize: 30,
              where: [
                {
                  name: "id",
                  value: 1
                },
                {
                  name: "enterpriseid", //企业维度对应的链接ID
                  value: newCId // 企业ID
                }
              ]
              // }
            });
          }

          // !前端判断该用户为首次登陆 数据库进行新增操作
          function GetFirstSave() {
            return vm.$axios.get(vm.$api.GetFirstSave, {
              params: {
                //   id:commonFn.handleStroage.getLocalStorage("userInfo").ID || vm.userInfoChart.ID,
                userId: vm.$store.state.loginInfo.userInfo.ID
                // vm.$commonFn.handleStroage.getLocalStorage("userInfo").ID
              }
            });
          }

          // 用户登陆初始化 判断是否为首次登陆
          // !warn 首次登陆 与再次登录会多一重判断操作
          function loginFresh() {
            getCheckdimension()
              .then(checkState => { 
                let checkStateRes = checkState.data;
                let DimensionList; //企业维度名称列表
                let transCheckState = []; //转换数据格式储存变量

                // 图标列表
                let iconList = [
                  "&#xe64c;",
                  "&#xe66b;",
                  "&#xe615;",
                  "&#xe643;",
                  "&#xe652;",
                  "&#xe64b;",
                  "&#xe664;",
                  "&#xe607;",
                  "&#xe637;",
                  "&#xe6e7;",
                  "&#xe663;",
                  "&#xe608;",
                  "&#xe65d;",
                  "&#xe677;"
                ];

                // 颜色列表
                let colorList = [
                  "#cfbb0e",
                  "#ecce1e",
                  "#e09d10",
                  "#b94514",
                  "#a52c19",
                  "#7a494c",
                  "#515868",
                  "#36748b",
                  "#85a157",
                  "#bfbf07",
                  "#5359A6",
                  "#FF8800",
                  "#61A0A8",
                  "#A0E13A"
                ];
                // 数据结构转换

                let rows = checkStateRes.Result.rows; //已勾选企业维度结果集

                if (rows != null) {
                  // 认证过
                  vm.newUser = false;

                  let listinfo = rows.listinfo; //已勾选企业维度信息列表

                  if (checkStateRes.IsResult) {
                    let saveInfoList = {
                      hidSxUserID: vm.$store.state.loginInfo.userInfo.ID
                      // vm.$commonFn.handleStroage.getLocalStorage("userInfo").ID
                    };

                    // 已勾选企业维度信息列表 数据格式转换
                    Object.keys(listinfo).forEach((keyItem, index) => {
                      let title = listinfo[keyItem][0].title; //企业维度状态中获得企业维度标题

                      let titleid = listinfo[keyItem][0].titleid; //获得ID

                      let stateName = Object.keys(
                        listinfo[keyItem][0].state
                      )[0]; //state下的属性名

                      let state = listinfo[keyItem][0].state[stateName]; //state值 获得状态

                      // 基本信息 不可更改 始终为true
                      if (titleid == 1) {
                        state = true;
                      }

                      // 将数据 存储至 saveInfoList 用于保存操作时的传参
                      saveInfoList[stateName] = state;

                      let colorItem = colorList[index];
                      let iconItem = iconList[index];

                      // 假如写死的标题颜色不够用就从头开始循环
                      if (
                        colorList[index] == undefined ||
                        iconList[index] == undefined
                      ) {
                        colorItem = colorList[index % colorList.length];
                        iconItem = iconList[index % iconList.length];
                      }

                      let checkStateItem = {
                        title, //标题
                        id: titleid, //id
                        isCheck: state, //是否选中
                        stateName, //保存时用到的属性名
                        color: colorItem, //对应颜色
                        icon: iconItem //对应图标
                      };

                      transCheckState.push(checkStateItem);
                    });

                    vm.$set(vm, "saveInfoList", saveInfoList);
                  }

                  vm.$set(vm, "mainFnBtnList", transCheckState);

                  vm.ischartLoading = true;
                  //事件目标
                  let funTarget = null;
                  let width = 1124,
                    height = 2000;

                  // 画图 即 当获取完所有该有的数据后画图 并赋值
                  //t.dragForce(_this.streamData);
                  vm.getMainFnBtn(width, height, newCId);
                  // vm.saveMainFn(); //登陆进来后立刻更新自画像

                  // checkDimensionInfo 函数是改变视图的主要方法 下面两个方法现在插入于
                  // 画图函数 getMainFnBtn() 中
                  // 这两句话是用于更新视图的 s
                  // vm.refreshInfo()  //请求已更新的企业维度信息 并存储进localStorage
                  // vm.checkDimensionInfo(cID) //用于更新视图

                  // vm.getEnterpriseList(vm.cID);  //cID(企业id) 获取特定企业信息
                  // 这两句话是用于更新视图的 e
                } else {
                  vm.newUser = true;
                  // 未认证过 即结果集为null 为空

                  // !前端判断该用户为首次登陆 数据库进行新增操作
                  GetFirstSave()
                    .then(res => {
                      let { IsResult, Result } = res.data;
                      if (IsResult && Result === null) {
                        vm.newUser = false;

                        loginFresh();
                      } else {
                        return "err";
                      }
                    })
                    .catch(rej => console.log(rej, "GetFirstSave rej"));
                }
              })
              .catch(rej => console.log(rej, "getCheckdimension rej"));
          }

          loginFresh();
        }
      },
      deep: true,
      immediate: true
    }
  },
  beforeCreate() {
    vm = this;
  },
  beforeMount() {
    vm.userInfoChart = vm.userInfo; //将从父组件获取的用户信息转接到 userInfoChart
    vm.getEnterpriseList(); //#$执行函数1 先获取一下企业信息
    /**
     * getEnterpriseList()
     * 若有特定企业id传入 则获取特定企业的信息
     * 若无 则调用随机获取企业信息接口 获取该企业信息
     * 随后
     */
  },

  mounted() {
    // 引用 企业维度内每一个选项 item
    var mainSelect = vm.$refs.mainSelect;

    vm.$root.bus.$on("changesearchlist", function(id) {
      // 监听自SearchBoxItem组件 代码对应码 #$chart
      // vm.cID = id;
      vm.$store.commit("showingCId", id);
      vm.getEnterpriseList(id); //获取特定企业的信息
    });

    if (!this.scroll) {
      this.scroll = new BScroll(mainSelect, {
        click: true,
        scrollY: true,
        probeType: 3
      });
    } else {
      this.scroll.refresh();
    }
  },

  methods: {
    // ajax 请求工具函数
    getAjaxResponse(obj, fn1, fn2) {
      var _this = this;
      var CancelToken = axios.CancelToken;
      obj.cancelToken = new CancelToken(function executor(c) {
        vm.source = c;
      });
      axios(obj)
        .then(function(response) {
          fn1(response);
        })
        .catch(function(error) {
          fn2(error);
          console.log(error);
        });
    },
    /*
            addMulitSvg(wrapper, addNum, addTag, addHtml) {
           wrapper.attr("x", (d) => {

           })
           for (var i = 0; i < addNum; i++) {
               //添加外轮廓
               wrapper.append("circle")

                   .attr("r", 24)
                   .attr("cy", -4)
                   .attr("fill", function (d) {
                       return i < 1 ? "#28b3d5" : "#b53108"
                   })
                   .attr("cx", function (d) {
                       // console.log(d.x);
                       return i < 1 ? 25 : -25
                   });
               //添加图标
               wrapper.append(addTag)
                   .html(function () { return i < 1 ? "&#xe641;" : "&#xe68a;" })
                   .attr("class", "iconfont upDownIconfont")
                   .attr("y", 4)
                   .attr("x", function (d) {
                       // console.log(d.x);
                       return i < 1 ? 26 : -26
                   });
           }
        }, */

    // 维度弹窗 getM函数内调用该函数
    //传入企业维度ID 弹出对应的窗口
    // dimenPop(para1){
    /**
     * @params
     *
     */
    // console.clear();
    // console.dir(para1.data);
    // console.log(para1);
    // console.dir(para1);
    // console.log(para1,'para1,para2');

    // this.bus.$emit('popIsShow',para1)

    // },

    // !warn getPlus函数 有返回值 且 返回值有特定的含义
    // *0 为false 1 为true 通过 gw(饼图上的维度按钮添加点击事件并运行getPlus函数 返回 0 1 以达到状态判断)
    //每一项放大&&点击搜索每一个省份的企业
    // !warn 这不是饼图放大 这是维度按钮
    getPlus(_this, d, tag) {
      /**
       * @params
       * _this: 指向的是当前点击的DOM元素
       * d    : 当前点击的DMO元素的data 数据
       * tag  : 当前需要使用的标签的类名
       * 该函数作用是绑定点击事件的_this 获取data 并过滤特定类名获取特定DOM对象
       */
      // #$放大 点击饼图每一个按钮将会触发的函数
      console.log("每一项放大");
      // console.log(d)
      console.log(_this, d, tag, "点击每一个图 按钮");
      var point = d.data.point;
      //if()
      // console.log(point); //目前是undefined
      console.dir(_this, "DOM_this");
      /**
             此处 _this 指向的是 标签 <g class="title btnActive">
             */
      console.dir(d, "DOM_D");
      /**
             *  这是点击事件打印d的数据
            data:
                color: "#cfbb0e"
                minOffset: 0
                offset: 0
                segment: 1
                slice: "0"
                title: "基本信息"
                total: 36.037288931383095
                value: 21.037288931383095

            endAngle: 0.4487989505128276
            index: 0
            padAngle: 0
            startAngle: 0
            value: 1
             */
      console.log(
        _this.className.baseVal,
        "---------_this.className.baseVal--------"
      );
      /** 
             _this.className.baseVal (SVGAnimatedString)
             className: 
                    animVal: "icon btnActive"
                    baseVal: "icon btnActive"
            */

      /**
       * 此处的判断估计是作为被点击时的按钮是否含有多个字段
       * 若有多个字段则触发相应事件
       */
      if (_this.className.baseVal.split(" ").length > 1) {
        return 0;
        // *0 代表无效操作 1 代表有效操作
      } else {
        d3.select(_this.parentNode)
          .selectAll(tag)
          .filter(function(data, index) {
            // q是数据源   i 是索引
            // 下面的d是当前元素的数据源
            if (data.index != d.index) {
              // 假如 当前过滤器遍历到的元素 不是 当前元素 就把 类btnActive移除
              d3.select(this).classed("btnActive", false);
            }
          });
        var url = "",
          Where = null;
        // 此处判断此时点击的是上链还是下链
        if (point == "up") {
          url = this.$api.GetUpPreciseList;
          Where = [
            //{
            //"name": "enterpriseid",
            //"value": point == "up" ? d.data.cId : ""
            //},
            //{
            //    "name": "classid",
            //    "value": d.data.insId
            //},
            {
              name: "provinceid",
              value: d.data.pId
            }
          ];
        } else if (point == "down") {
          url = this.$api.GetDownPreciseList;
          Where = [
            {
              name: "classid",
              value: d.data.insId
            },
            {
              name: "provinceid",
              value: d.data.pId
            }
          ];
        } else {
          // 大饼图没有point属性
          // 此处是判断该处为大饼图时候的情况
          // console.log(_this,d,tag,'获取调用企业维度弹窗需要的参数')
          // console.dir(_this,d,tag,'获取调用企业维度弹窗需要的参数')
          return 1;
          // *0 代表无效操作 1 代表有效操作
        }
        //获取企业详情
        var para = {
          method: "post",
          url: url,
          data: {
            PageIndex: 1,
            PageSize: 5,
            Where: Where
          }
        };

        this.getAjaxResponse(
          para,
          function(successBack) {
            if (successBack.data.IsResult) {
              // console.log(successBack,'getPlus successBack');
            }
          },
          function(errorBack) {
            console.log(errorBack);
          }
        );
        //this.isShowSearchBox = true
        return 1;
      }
    },

    // 首页设置功能
    setIndex() {
      this.$store.commit("showPop", {
        popName: "tips",
        config: {
          text: `您确定要设置 ${this.streamData.title} 为首页么?`,
          confirm() {},
          cancel() {
            // alert('haha')
          }
        }
      });
    },

    showNumFix(data){
      data = (data/10000).toFixed(2);
      if(data < 0.01) return 0.01+'万'
      return data+'万'
    },

    //画图
    getMainFnBtn(width, height, id) {
      /**
       * @params
       * !上方参数分别是描述面板的 宽 高 企业ID
       * */

      d3.select("#svgg")
        .selectAll("*")
        .remove(); //清空面板
      let svgW = d3
          .select("#svgg")
          .attr("viewBox", "0 0 1124 2000")
          .attr("preserveAspectRatio", "xMidYMid meet"),
        svgDom = svgW.node(),
        svgWidth = svgDom.clientWidth,
        svgHeight = svgDom.clientHeight,
        heightRatio = height / svgHeight, // 获得画布与svg的高度比
        widthRatio = width / svgWidth; // 获得画布与svg的宽度比
      // console.log('h,w',heightRatio,widthRatio)
      // 获取需要的数据后的数据处理 s

      vm.refreshInfo(); //请求已更新的企业维度信息 并存储进localStorage
      this.checkDimensionInfo(id); //*检查企业维度的值,改变自画像的显示值 传入企业ID
      // console.clear();
      // console.log(this.streamData2,this.streamData2.nodes,this.streamData2.nodes.slice(0, 1),'this.streamData2.nodes.slice(0, 1)this.streamData2.nodes.slice(0, 1)')
      vm.$set(this.streamData2, "nodes", this.streamData2.nodes.slice(0, 1));

      this.streamData.upData.data.forEach(dateItem => {
        dateItem.Province.forEach(PItem => {
          // console.log(PItem,"PItem PItem PItem test")
          PItem.valueOfTag =
            PItem.value == 0 || dateItem.proTotal == 0
              ? 0
              : ((PItem.Count / dateItem.proTotal) * 100).toFixed(2) + "%";
        });
      });

      var nodes = this.streamData2.nodes.concat(this.streamData.upData.data);

      vm.$set(this.streamData2, "nodes", nodes);
      //  this.streamData2.nodes = this.streamData2.nodes.concat(streamData.upData.data);

      ////处理下链数据显示
      this.streamData.downData.data.forEach(downItem => {
        downItem.Province.forEach(PItem => {
          PItem.valueOfTag =
            PItem.value == 0 || downItem.proTotal == 0
              ? 0
              : ((PItem.Count / downItem.proTotal) * 100).toFixed(2) + "%";
        });
      });
      var node2 = this.streamData2.nodes.concat(this.streamData.downData.data);
      vm.$set(this.streamData2, "nodes", node2);
      ////处理链接
      var t_a = [];
      for (var i = 0; i < this.streamData2.nodes.length; i++) {
        if (this.streamData2.nodes.length > 1 && i > 0) {
          var o = {};
          o.target = "main";
          o.source = this.streamData2.nodes[i].id;
          t_a.push(o);
        }
      }
      console.log(t_a, "t_a t_a t_a");
      vm.$set(this.streamData2, "edges", t_a); //这里修改edges 数据
      /**
             * edges 里的数据如下
                index: 0
                source: Object
                target: Object

                其中 target 
                data: Array(9)
                id: "main"
                index: 0
                name: "main"
                    
                    其中data
                    color: "#cfbb0e"
                    offset: 0
                    segment: 1
                    slice: 0
                    title: "基本信息"
                    value: 21.635028833391033
             */

      (this.streamData2.companyName = this.streamData.title),
        (this.streamData2.visitNum = this.streamData.visit),
        (this.streamData2.recNum = this.streamData.rec);

      //获取需要的数据后的数据处理 e

      //在d3力导向图的拖放事件里，常会用到alphaTarget属性(衰减目标)
      /*
            拖放开始时，alphaTarget设置为比alphaMin更大的值，即会在拖放的过程中力导向图持续运算（防止拖到一半结束的情况)
            拖放结束时，alphaTarget设置为0，即在拖放结束后的一段时间内，力导向图停止运算。
            */

      //控制右边的icon不要超过范围
      let Font = 20;
      //生成力布局

      // 设置alpha衰减系数 创建一个新的力学仿真.
      var simulation = d3
        .forceSimulation()
        .force(
          "link",
          d3
            .forceLink()
            .distance(220)
            .id(function(d) {
              return d.id;
            })
        ) // distance为连线的距离设置
        .force(
          "collide",
          d3.forceCollide().radius(d => {
            // forceCollide 圆的碰撞检测
            //radius:半径访问器
            return 250;
          })
        ) // collide 为节点指定一个radius区域来防止节点重叠。 碰撞检测
        .force("charge", d3.forceManyBody().strength(-100))
        // forceManyBody 创建一个使用默认参数的电荷力模型
        // charge 节点间的作用力 正值吸引力 负值排斥力
        // 受数值影响其效果 .strength
        .force("center", d3.forceCenter(width / 2, height / 2));
      // 使用指定的 xy坐标创建一个新的中心力模型 若 x 和 y没有则默认 0,0

      var svg = svgW.append("g"); //.attr("width","100%").attr("height","100%");
      var link = svg
        .append("g") // link 用以各个节点间相互连接的线
        .attr("class", "links")
        .selectAll("line")
        .data(this.streamData2.edges) //这里插入data数据
        .enter()
        .append("line")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", "0.8");
      var node = svg
        .append("g") //各个节点
        .attr("class", "nodes")
        .selectAll("g")
        .data(this.streamData2.nodes) //这里插入data数据
        .enter()
        .append("g")
        .attr("class", "secBtn")
        .property("active", false);
      console.log(
        "before:",
        this.streamData2.edges[0].source.x,
        this.streamData2.nodes[0].x
      );
      //d3.behavior.drag()用来构造一个拖拽行为。如果让元素响应这个行为需要使用call()函数
      //拖动函数
      node.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

      // 用于节点放大后 底层显示黑色 正常情况下不显示
      node
        .append("rect")
        .attr("class", "dis_none")
        .attr("width", "1124")
        .attr("height", "2000")
        .attr("x", -562)
        .attr("y", -1000);

      simulation
        .nodes(this.streamData2.nodes) //生成节点数据
        .on("tick", ticked); //用于更新节点和连线位置
      simulation
        .force("link") //生成边集数据
        .links(this.streamData2.edges);
      // 下面的remove 意味 假如创建数比数据多则移除多余的部分
      node
        .exit()
        .transition()
        .remove();
      link
        .exit()
        .transition()
        .remove();
      //
      //上一个点击居中的对象
      let lastClickObj = null;

      function dragstarted(d) {
        // 假如该节点正在放大 : "active" 则复发拖动
        if (d3.select(this).property("active")) {
          return;
        }
        funTarget = "drag1";
        // 拖动时其他节点计时器重启
        if (!d3.event.active) simulation.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      // 正在拖动节点时候 鼠标位置在哪 d3.event 节点固定位置就在哪
      function dragged(d) {
        funTarget = "drag2";
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      let timer = null;
      let t = d3
        .transition()
        .duration(400)
        .ease(d3.easeLinear);

      function dragended(d) {
        if (d3.select(this).property("active")) return; //放大过就不放大
        simulation.restart();
        console.log("d3.select(this)", d3.select(this));
        var name = d.name;
        //点击无移动==放大
        // funTarget 在 dragstarted（开始拖拽行为） 赋值 drag1 当纯点击
        // 就不经过dragged（拖动过程）则纯点击的话 funTarget 为 drag1
        if (funTarget == "drag1") {
          if (!d3.select(this).property("active")) {
            d.fx = null;
            d.fy = null;
            if (!timer) {
              timer = setTimeout(() => {
                var nodes = d3.select(this);
                // 这个是点击饼图以后放大
                // nodes.transition(t) 节点放大动画
                nodes.transition(t).attr("transform", function(q) {
                  var x,
                    y,
                    r,
                    m = 1.5,
                    nx,
                    ny;
                  //计算点击之后的扩大的半径;
                  if (q.id == "main") {
                    r = document.documentElement.offsetWidth / 2;
                  } else {
                    r = document.documentElement.offsetWidth / 4;
                  }
                  nx = 1124 - r - 100 * m;
                  ny = 2000 - r - 100 * m;
                  if (q.x < r * m + 15 * m) {
                    x = r * m + 15 * m;
                  } else if (q.x > nx) {
                    x = nx;
                  } else {
                    x = q.x;
                  }
                  if (q.y < r * m + 40 * m) {
                    y = r * m + 40 * m;
                  } else if (q.y > ny) {
                    y = ny;
                  } else {
                    y = q.y;
                  }

                  // 饼图放大 点击饼图后放大
                  vm.isClick = true;
                  return "translate(" + 562 + "," + 1000 + ") scale(" + m + ")";
                });

                nodes.property("active", true);
                nodes.select("rect").classed("dis_none", false);
                //改变层级
                this.parentNode.appendChild(this);
                d3.selectAll(".secBtn").filter(function(z, i) {
                  if (z.name != name) {
                    d3.select(this).property("active", false);
                    d3.select(this)
                      .select("rect")
                      .classed("dis_none", true);
                  }
                });
                simulation.stop();

                clearTimeout(timer);
                timer = null;
              }, 100);
            }
            // ! 该衰减目标必须小于衰减最小值
            // 否则将会持续进行布局计算
            // 因为当前衰减值永远达不到衰减目标（衰减最小值永远小于衰减目标）
            if (!d3.event.active) simulation.alphaTarget(0).restart();
            //停止首页的dm消息弹窗
            that.$emit("stopdm", 1);
            // d3.select(".mainFnBtn").classed('dis_none', true);
            //  d3.select("#pt").classed('dis_none', true);
          } else {
            d3.select(this).property("active", false);
            d3.select(this)
              .select("rect")
              .classed("dis_none", true);
          }
        } else {
          d.fx = null;
          d.fy = null;
          if (!d3.event.active) simulation.alphaTarget(0).restart();
        }
      }

      // 生成节点 用于更新 节点与线的位置
      function ticked() {
        // 节点
        node
          /*
                        .attr("cx", function (d, i) {
                            var m = document.documentElement.offsetWidth / 5.5;
                            var n = 1124 - m;

                            if (d.x < m) {
                                return m

                            } else if (d.x > n) {


                                return n
                            }

                            return d.x

                        })//d.fx=d.x;
                        .attr("cy", function (d, i) {
                        // console.log(d.y)
                        var m = document.documentElement.offsetWidth / 5.5;
                        var n = 2000 - m;
                        if (d.y > n) {

                            return n
                        }
                        return d.y

                    })*/
          .attr("transform", function(d, i) {
            /*
                      let
                        xx = d.x,
                        yy = d.y,
                        width = d.width,
                        height = d.height,
                        cx = width / 2,
                        cy = height / 2;
                    */
            /*
                        var x = d.x, y = d.y;
                        var m = document.documentElement.offsetWidth / 5.5;
                        // var m = svgWidth / 2;
                        // var n = 1124 - m;
                        var n = 1124 - m

                        var n1 = 2000 - m;
                        if (x < m) {
                            x = m;

                        } else if (x > n) {

                            x = n;

                        };
                        if (d.y > n1) {

                            y = n1;
                        };
                        return "translate(" + x + "," + y + ") scale(1)"
                    */

            /**
             *  d.x d.y 分别是节点的xy轴
             */

            let x = d.x, //相对于viewBox的x
              y = d.y, //相对于viewBox的y
              dWidth = d.width, //预先存入的该元素的外在宽
              dHeight = d.height, //预先存入的该元素的外在高
              viewWidth = width, // 画布函数接收的viewBox宽
              viewHeight = height, // 画布函数接收的viewBox高
              rx = (dWidth / 2) * heightRatio,
              ry = (dHeight / 2) * widthRatio;

            /** 50 是为了边缘部分尽可能的部分填充 */
            if (x < rx) x = rx - 50; //当元素左边距小于左边框
            if (x > viewWidth - rx) x = viewWidth - rx + 50; //当元素右边距大于右边框
            if (y < ry) y = ry; //当元素上边距小于上边框
            if (y > viewHeight - ry) y = viewHeight - ry; //当元素下边距大于下边框
            // if(d.name=='main')console.log('main d ' ,d);
            d.x = x;
            d.y = y;
            return "translate(" + x + "," + y + ") scale(1)";
          });

        // 线
        link
          /*
                    .attr("x1", function (d) {
                        console.log(d)
                        var m = document.documentElement.offsetWidth / 5.5;
                        // var m = svgWidth / 2;
                        var n = 1124 - m;
                        if (d.source.x < m) {
                            return m
                        } else if (d.source.x > n) {
                            return n;
                        }
                        return d.source.x;
                    })
                    .attr("y1", function (d) {
                        var m = document.documentElement.offsetWidth / 5.5;
                        var n = 2000 - m;
                        if (d.source.y > n) {

                            return n;

                        }
                        return d.source.y;
                    })*/
          /*
                    .attr('x1',function(d){
                        
                        let
                        x = d.source.x, //相对于viewBox的x
                        dWidth = d.source.width, //预先存入的该元素的外在宽
                        viewWidth = width, // 画布函数接收的viewBox宽
                        rx = (dWidth / 2)*heightRatio,
                        
                        if(x < rx ) x = rx
                        if(x > viewWidth - rx ) x = viewWidth - rx
                        
                        console.log(d);
                      return "translate(" + x + "," + y + ") scale(1)"

                    })

                    .attr('y1',function(d){
                        let
                        x = d.x, //相对于viewBox的x
                        y = d.y, //相对于viewBox的y
                        dWidth = d.width, //预先存入的该元素的外在宽
                        dHeight = d.height,//预先存入的该元素的外在高
                        viewWidth = width, // 画布函数接收的viewBox宽
                        viewHeight = height, // 画布函数接收的viewBox高
                        rx = (dWidth / 2)*heightRatio,
                        ry = (dHeight / 2)*widthRatio;
                        
                        if(x < rx ) x = rx
                        if(x > viewWidth - rx ) x = viewWidth - rx
                        if(y < ry ) y = ry
                        if(y > viewHeight - ry ) y = viewHeight -ry
                        console.log(d);
                      return "translate(" + x + "," + y + ") scale(1)"

                    })*/

          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });
      }

      var that = this;
      /**
       * 其中 .secBtn 指的是 各个饼图 即上下链跟中间大饼图 共有类名
       */
      /**
       * 生成饼图
       * secBtn 遍历 并且不同id生成不同饼图
       * call意为对应被选择的元素调用对应call第一参数的函数
       * 其余参数用于传参
       */
      let secBtn = d3.selectAll(".secBtn").each(function(i) {
        /*
         * ! i 表示item
         */
        // 选中 .secBtn 遍历每个被选中的元素 其中 i 代表的是每个配套服务 行业
        // console.log(`d3.selectAll(".secBtn")`,i);
        // 这里的i估计是item

        //生成主功能 大饼图
        if (i.id == "main") {
          // console.clear();
          // console.log(i,i.data,'原始i')
          d3.select(this).call(getM, i.data, that);
        }
        //生成上链
        else if (i.point == "up") {
          d3.select(this).call(getMainFnBtn2, i.Province, 0, that);
          //生成下链
        } else {
          d3.select(this).call(getMainFnBtn2, i.Province, 1, that);
        }

        // 将每个 .secBtn 即饼图 （无论上下链还是大饼图）
        // 他们的宽高都写进他们各自的data里 用以记录 以便之后的边界值判定
        let dom = d3
          .select(this)
          .node()
          .getBoundingClientRect();
        i.width = dom.width;
        i.height = dom.height;
      });

      // console.log(secBtn.select('g').node().getBoundingClientRect())

      //缩放
      //d3.selectA-ll(".secBtn").on(".zoom", null);
      //var zoom_handler = d3.zoom()
      //    .on("zoom", zoom_actions);
      //var svgWrapper = d3.select("#svgWrapper");
      //zoom_handler(svgWrapper);
      //function zoom_actions() {
      //    //d3.event.stopPropagation(); // silence other listeners
      //    svg.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
      //};

      //主功能键
      // 这里是获取数据并将数据写入到DOM对象的地方
      function getM(p2, $data, that) {
        // console.log(p2, $data, that,"p2, $data, that 主功能键")
        //计算每一个slice的上行的offset

        // $data 的数据来源是来自每个secBtn的

        /**
         * 此处是将数组分类 将数据[{...},{...}]分为key value组的数据分组
         */
        var nestBySlice = d3
          .nest()
          .key(function(d) {
            return d.slice;
          })
          .entries($data);
        nestBySlice.forEach(function(d) {
          d.total = 0;
          let offset = 0;
          d.values.forEach(function(v, i) {
            //  console.log(v)
            d.total = d.total + v.value;
            v.offset = i == 2 ? 28 : offset;
            offset = offset + v.value;
          });
        });
        // console.log(nestBySlice)
        // #$DOMdata
        // 下面是将数据写入DOM对象里
        var pieData = [];
        nestBySlice.forEach(function(d) {
          d.values.forEach(function(v) {
            let s = {};
            s.segment = v.segment;
            s.color = v.color;
            s.slice = d.key;
            s.offset = v.offset;
            s.value = v.value;
            s.total = d.total;
            s.id = v.id; //这里插入 企业维度id属性
            if (v.segment == 1) s.title = v.title;
            if (v.segment == 2) s.icon = v.icon;
            pieData.push(s);
          });
        });
        //console.logconsole.log(pieData)
        //转化为绘制饼图的格式
        var nestBySegment = d3
          .nest()
          .key(function(d) {
            return d.segment;
          })
          .entries(pieData);
        //console.log(nestBySegment)
        nestBySegment.forEach(function(d) {
          let minOffset = d3.min(d.values, function(s) {
            return s.offset;
          });
          d.values.forEach(function(v) {
            v.minOffset = minOffset;
          });
        });
        // console.log("nestBySlice")
        // console.log(nestBySlice)
        // 计算数组中的最大值
        var maxTotal = d3.max(nestBySlice, function(d) {
          return d.total;
        });
        //根据画布大小算一个合适的半径-----主功能模块
        var radius = document.documentElement.offsetWidth / 1.2;
        var innerRadius = document.documentElement.offsetWidth / 8;
        var rScale = d3
          .scaleLinear()
          .range([innerRadius, radius])
          .domain([0, maxTotal]);
        var padding = 0.1;
        var paddingPX = padding * (innerRadius * 2 * Math.PI);
        //准备一个弧生成器，用于根据角度生产弧路径
        var arc = d3
          .arc()
          .innerRadius(function(d) {
            return rScale(d.data.offset);
          })
          .outerRadius(function(d) {
            return rScale(d.data.offset + d.data.value);
          });
        //var arc2 = d3.arc()
        //    .innerRadius(function (d) {
        //        return rScale(document.documentElement.offsetWidth *2)
        //    })
        //    .outerRadius(function (d) {

        //        return rScale(document.documentElement.offsetWidth * 2)
        //    });

        // #$gw
        /**
         *
         */
        var gw = p2.append("g").attr("class", "main");
        //主按键：设为企业和默认
        var mainFnBtn = gw.append("g").attr("class", "mainFnBtn");

        // 生成设为我的企业的图片之间的连线
        mainFnBtn
          .append("line")
          .attr("id", "mainFnBtnLine")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("stroke", "#ff8800")
          .attr("stroke-width", "5px");
        // 生成设为我的企业的按钮图片
        mainFnBtn
          .append("image")
          .attr("id", "mainFnBtnTop")
          .attr("width", "356")
          .attr("height", "92")
          .attr("href", require("@/assets/icon/setMy.png"))
          .on("click", function() {
            // 设为我的企业
            if (!vm.isClick) return;
            vm.popUp("certTips"); //弹出认证弹窗
          });
        mainFnBtn
          .append("image")
          .attr("id", "mainFnBtnBottom")
          .attr("width", "356")
          .attr("height", "92")
          .attr("xlink:href", require("@/assets/icon/setIndex.png"))
          .on("click", function() {
            if (!vm.isClick) return;
            vm.setIndex();
          });
        // gw 大饼图 .main
        gw.on("click", function() {
          d3.event.stopPropagation();
          // 大饼图的 title --- 大饼图的各个维度按钮
          d3.select(this)
            .selectAll(".title")
            .on("click", function(q) {
              d3.event.preventDefault();
              /**
                         * 
                        此处 企业维度按钮监听初 

                        此处是 q //代表的是饼图里的维度按钮
                        打印q后得出的结果如下
                        data:
                            color: "#ecce1e"
                            minOffset: 0
                            offset: 0
                            segment: 1
                            slice: "1"
                            title: "股东信息"
                            total: 36.549059564425875
                            value: 21.54905956442587

                        endAngle: 0.8975979010256552
                        index: 1
                        padAngle: 0
                        startAngle: 0.4487989505128276
                        value: 1
                         */

              /**
                         此处是gw 代表的是大饼图
                         * Selection
                            _groups: Array(1)
                                0: Array(1)
                                0: g //此处的g 是 .main 的g 即大饼图

                                length: 1
                                _parents: [null]
                                length: 1
                                
                         */

              /**
               * 点击的DOM对象 标题 图标 两者都放大
               * 点击时候运行下面函数 并运行getPlus 以达到状态判断 来决定
               * btnActive 这个类是否存在
               * #$weiduClick
               */

              // q.id 即对应的企业维度ID 通过此ID 我们可以调用不同的企业维度弹窗
              console.log(d3.select(this));
              if (!vm.isClick) return; //是否允许触发弹窗
              let dimenId = q.data.id; // !企业维度ID
              vm.$store.commit("showPop", "dimen-" + dimenId);
              // vm.dimenPop(dimenId); //传入企业维度ID 弹出对应的窗口
              // vm.bus.$emit('popIsShow',dimenId);
              // console.log('run popIsShow? -------------')

              d3.select(this).classed("btnActive", function() {
                var _this = this;
                // console.clear();
                // console.log(this,'gw click this')
                // q 点击的按钮对应数据
                // vm.dimenPop(_this,q);
                // console.clear();
                // console.dir(this,q,'BaseInfo this')

                return that.getPlus(_this, q, ".title");
              });

              d3.select(this.parentNode.nextElementSibling)
                .selectAll(".icon")
                .filter(function(item, index) {
                  // 选择全部的icon 过滤器的参数 item, index 分别是
                  // 每个item 以及索引
                  console.log(item, index, "z,j parentNode.nextElementSibling");
                  if (q.index == item.index) {
                    //d3.select(this).classed("btnActive",
                    //    that.getPlus.call(this, q, ".icon")
                    //);
                    d3.select(this).classed("btnActive", function() {
                      var _this = this;
                      return that.getPlus(_this, q, ".icon");
                    });
                  }
                });
            });

          // 获取 更多按钮对象 并添加点击事件
          // 该事件获取企业维度信息 并显示企业维度列表弹窗
          d3.select("#mainFnBtnIcon").on("click", function() {
            //获取企业维度  userId #$企业维度
            //   console.log('mainFnBtnIcon','mainFnBtnIcon true',)

            if (vm.isClick) vm.isShowMainSelect = true;
          });
        });

        //新增黑色透明外边框
        function corner2(angle, sign, setType) {
          var r;
          // var setType = gw.selectAll(".fake")._groups[0].length;
          //判断是否为未设置维度
          gw.selectAll(".fake")
            .select("path")
            .attr("transform", function(d) {
              if (d.index == 0) {
                r = setType
                  ? corner(0, 20, 0, setType, 0).split(",")[1]
                  : corner(0, 20, 0, d, 1).split(",")[1];
              }

              //if (setType>=10){
              ////设置按键定位
              //    if (d.index == 7) {
              //        var x = corner((d.startAngle + d.endAngle) / 2, 20, 2, d).split(",")[0];

              //        d3.selectAll("#mainFnBtnTop").attr("x", x - 176).attr("y", -x + 92)
              //       // d3.selectAll("#mainFnBtnBottom").attr("x", x - 176).attr("y", -x + 184)

              //    }
              //    if (d.index == 6) {
              //        var xl = corner((d.startAngle), 20, 2, d).split(",")[0];
              //        d3.selectAll("#mainFnBtnLine").attr("x2", xl - 176).attr("y2", -xl + 150)
              //    }
              //    if (d.index == 3) {
              //        var x2 = corner((d.startAngle), 20, 2, d).split(",")[0];
              //        d3.select("#certification").attr("x", x2 - 110).attr("y", x2 - 10)
              //    }
              //} else {
              /**这里设置了
               * 设为我的企业的位置
               * 默认为首页的位置
               */
              var x = corner(270 / 2, 20, 2, d).split(",")[0];
              var x2 = corner(160 / 2, 20, 2, d).split(",")[0];
              d3.select("#mainFnBtnTop")
                .attr("x", x - 356)
                .attr("y", -x + 250);
              d3.select("#mainFnBtnBottom")
                .attr("x", x - 356)
                .attr("y", -x + 250 + 92);
              d3.select("#mainFnBtnLine")
                .attr("x2", x - 176)
                .attr("y2", -x + 250);
              //if (vm.userInfo.chbIsDefaultPage) { }
              d3.select("#certification")
                .attr("x", -x2 - 110)
                .attr("y", -x2);

              //}

              return;
            });
          return (
            sign * Math.cos(angle) +
            Math.sqrt(r * r) * Math.sin(angle) +
            "," +
            (sign * Math.sin(angle) - Math.sqrt(r * r) * Math.cos(angle))
          );
        }
        //生成阴影
        var defs = gw.append("defs");
        var filter = defs.append("filter").attr("id", "drop-shadow");
        filter
          .append("feGaussianBlur")
          .attr("stdDeviation", 10)
          .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
        //生成渐变
        var lG = defs
          .append("linearGradient")
          .attr("id", "grey-to-grey")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        lG.append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color:rgb(241,241,243);stop-opacity:1");
        lG.append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color:rgb(178,178,178);stop-opacity:1");

        //画图
        nestBySegment.forEach(function(segment, i) {
          let minOffset = d3.min(segment.values, function(d) {
            return d.offset;
          });
          let c = minOffset * 2 * Math.PI;

          let thisPadding = paddingPX / c;
          //准备一个pie布局器，此布局可根据原始数据计算出一段弧的开始和结束角度
          var pie = d3.pie().value(1);

          // 将原始数据经过布局转换

          let p = pie(segment.values);

          //这个g
          let g = gw.append("g");

          g.attr("class", "wrapper");

          g.selectAll("path")
            .data(p)
            .enter()

            .append("g")
            .attr("class", function(d) {
              if (d.data.segment == 1) {
                // .title 对应企业维度按钮第二层的每个按钮
                // 如 基本信息 股东信息的按钮
                return "title";
              } else if (d.data.segment == 2) {
                return "icon";
              }
              // .fake 图标
              return "fake";
            })

            .append("path")

            .style("fill", function(d) {
              if (d.data.segment == 1) {
                return "url(#grey-to-grey)";
              }
              return d.data.color;
            })
            .style("fill-opacity", function(d) {
              if (d.data.segment == 3) {
                return 0.5;
              }
              return 1;
            })
            .attr("d", arc);
        });
        //是否认证
        //if (vm.userInfo.chbIsDefaultPage) { }
        gw.append("image")
          .attr("href", require("../../assets/icon/certification.png")) //已认证图片
          .attr("id", "certification")
          .attr("width", 165)
          .attr("height", 60)
          .attr("class", "dis_none");

        //主功能对应的每一个icon
        var titlel = gw.selectAll(".icon");
        var inx = titlel._groups[0].length;
        //假如用户显示多个（2个或以上）企业维度 则显示出多个按钮 否则就只显示基本信息
        if (inx > 1) {
          titlel.each(function() {
            d3.select(this)
              .append("text")
              .attr("class", "iconfont")
              .html(function(d) {
                // console.log(d)
                return d.data.icon;
              })
              .attr("fill", "#fff")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return (
                  "translate(" +
                  corner((d.startAngle + d.endAngle) / 2, 20, 1, d, 0) +
                  ")" +
                  "rotate(" +
                  (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
                  ")"
                );
              });
          });
        } else {
          //titlel.append("text")
          //        //.attr("class", "iconfont")
          //        .html("基本信息")
          //        .attr("fill", "#fff")
          //        .attr("text-anchor", "middle")
          //        .attr('transform', function (d) {

          //            return "translate(" + corner(0, 20, 1, d, 0) + ')' +
          //                'rotate(0)';
          //        });
          var str = "基本信息";
          var titleCon = str.split("");
          var leng = titleCon.length;
          var partIndex = Math.ceil(leng / 2);
          titleCon.forEach(function(q, i) {
            titlel
              .append("text")
              .attr("fill", "#fff")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                //if (i == 0) {
                //   // d3.select(this).html("&#xe61e;")
                //} else {

                //}
                d3.select(this).html(q);
                var angle;
                if (i + 1 <= partIndex) {
                  angle = -(45 / partIndex / 95) * (partIndex - i);
                  return (
                    "translate(" +
                    corner2(angle, -1, d) +
                    ")" +
                    "rotate(" +
                    (angle * 180) / Math.PI +
                    ")"
                  );
                } else {
                  angle = (45 / (leng - partIndex) / 95) * (i - partIndex);

                  return (
                    "translate(" +
                    corner2(angle, 1, d) +
                    ")" +
                    "rotate(" +
                    (angle * 180) / Math.PI +
                    ")"
                  );
                }
              });
          });
        }

        //这里将拆分titleCon 里的每个字符 并使得每个字符围绕维度饼图边框

        var str =
          "访问：" +
          that.streamData2.visitNum +
          "次 " +
          that.streamData2.companyName +
          " 推荐：" +
          that.streamData2.recNum +
          "次";

        var titleCon = str.split("");
        var recNumFirst = str.lastIndexOf("：");
        var recNumEnd = str.lastIndexOf("次");

        var leng = titleCon.length;
        var partIndex = Math.ceil(leng / 2);
        titleCon.forEach(function(q, i) {
          gw.append("text")
            .html(q)
            .attr("fill", "#fff")
            .attr("class", "mainTitle")
            .attr("transform", function(d) {
              var angle;
              // 字符串左半部分
              if (i + 1 <= partIndex) {
                angle = 0 - (180 / partIndex / 95) * (partIndex - i);
                return (
                  "translate(" +
                  corner2(angle, -1) +
                  ")" +
                  "rotate(" +
                  (angle * 180) / Math.PI +
                  ")"
                );
              } else {
                // 字符串右半部分
                angle = (180 / (leng - partIndex) / 95) * (i - partIndex);
                return (
                  "translate(" +
                  corner2(angle, 1) +
                  ")" +
                  "rotate(" +
                  (angle * 180) / Math.PI +
                  ")"
                );
              }
            })
            .classed("recNum", function() {
              if (i > recNumFirst && i < recNumEnd) {
                return true;
              }
            });
        });
        // title2 每个饼图内企业维度的按钮
        var title2 = gw.selectAll(".title");
        // console.log(title2)

        //生成每一个维度的标题
        var txt = title2
          .append("text")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return (
              "translate(" +
              corner((d.startAngle + d.endAngle) / 2, 20, 1, d, 0) +
              ")" +
              "rotate(" +
              (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
              ")"
            );
          })
          //.html(function (d) {
          //    return d.data.title
          //})
          .selectAll("tspan")
          .data(function(d) {
            // console.log(d.data.title)
            if (d.data.title.length >= 6) {
              return [d.data.title.slice(0, 4), d.data.title.slice(4)];
            } else {
              return [d.data.title.slice(0, 2), d.data.title.slice(2)];
            }
          })
          .enter()
          .append("tspan")
          .attr("x", "0")
          .attr("dy", "1em")
          .text(function(d) {
            return d;
          });

        //中心icon
        let icon_width = document.documentElement.offsetWidth / 3,
          icon_height = document.documentElement.offsetWidth / 3;
        //
        var iconG = gw
          .select(".wrapper")
          .append("g")
          .attr("id", "mainFnBtnIcon");
        var defs = iconG.append("defs");

        var pattern = defs
          .append("pattern")
          .attr("id", "image2")
          .attr("x", -icon_width / 2)
          .attr("y", -icon_height / 2)
          .attr("patternUnits", "userSpaceOnUse")
          .attr("height", icon_width)
          .attr("width", icon_height);

        pattern
          .append("svg:image")
          .attr("width", icon_width)
          .attr("height", icon_height)
          .attr("x", 0)
          .attr("y", 0)
          .attr("href", require("../../assets/image/1.png"));

        // 主按键----更多
        var mainCenterBtn = iconG
          .append("circle")
          .attr("r", icon_width / 2)
          .attr("cx", "0")
          .attr("cy", "0")
          .attr("fill", "#fff")
          .attr("strokeOpacity", "0.2")
          .attr("stroke", "#d5d5d5")
          .attr("strokeWidth", "2")
          .attr("id", "mianBtn");
        if (that.isApprove == 0) {
          mainCenterBtn.attr("fill", "url(#image2)");
        } else {
          iconG
            .append("text")
            .html("更多")
            .attr("class", "mainFnBtnText");
        }

        //定位icon
        function corner(angle, r, sign, d, tag) {
          var radius;

          radius =
            tag == 0
              ? rScale(d.data.offset + d.data.value) - 30
              : rScale(d.data.offset + d.data.value) - 50;

          //rScale(d.data.offset + d.data.value) - 20

          if (sign == 1) {
            return (
              sign * Math.cos(angle) +
              Math.sqrt(radius * radius) * Math.sin(angle) +
              "," +
              (sign * Math.sin(angle) -
                Math.sqrt(radius * radius) * Math.cos(angle))
            );
          }
          return (
            sign * Font * Math.cos(angle) +
            Math.sqrt(radius * radius - Font * Font) * Math.sin(angle) +
            "," +
            (sign * Font * Math.sin(angle) -
              Math.sqrt(radius * radius - Font * Font) * Math.cos(angle))
          );
        }
        /* 0

                被砍的功能 暂时不管
                //点击事件
                let prevObj1 = null, prevObj2 = null;

                // 
                var showSec = d3.select(".main").selectAll(".title");
                // console.log(d3.select(".main").selectAll(".title"))
                
                showSec.on("click", function (d) {

                    var obj1 = d3.select(".main").selectAll(".lines").selectAll("polyline");
                    var obj2 = d3.select(".main").selectAll(".labels").selectAll("text");
                    showNext(obj1, d, "polyline");
                    showNext(obj2, d, "text");



                });
                var showNext = function (obj, d, type) {
                    // #$002
                    console.log('obj j type',obj, d, type);
                    obj = obj || {};
                    obj.select(function (dx, i) {
                        if (i == d.index) {
                            console.log('dx,i',dx,i);
                            if (type && type == "polyline") {

                                if (prevObj1) {
                                    prevObj1.style.display = "none";
                                    prevObj1 = this;
                                    this.style.display = "block";
                                } else {
                                    prevObj1 = this;
                                    this.style.display = "block";
                                }
                            } else if (type && type == "text") {
                                if (prevObj2) {
                                    prevObj2.style.display = "none";
                                    prevObj2 = this;
                                    this.style.display = "block";
                                } else {
                                    prevObj2 = this;
                                    this.style.display = "block";
                                }
                            }


                        }
                    })
                }

                */
      }
      //上下链
      function getMainFnBtn2(p2, data, type, that) {
        //type:0---上游，type:1---下游
        //控制右边的icon不要超过范围
        let Font = 20;
        //计算每一个slice的上行的offset
        var nestBySlice = d3
          .nest()
          .key(function(d) {
            return d.slice;
          })
          .entries(data);

        nestBySlice.forEach(function(d) {
          d.total = 0;
          let offset = 0;
          d.values.forEach(function(v) {
            d.total = d.total + v.value;
            v.offset = offset;
            offset = offset + v.value;
          });
        });
        var pieData = [];

        nestBySlice.forEach(function(d) {
          d.values.forEach(function(v) {
            let s = {};
            s.segment = v.segment;
            s.color = v.color;
            s.slice = d.key;
            s.offset = v.offset;
            s.value = v.value;
            s.total = d.total;
            s.name = v.Name.slice(0, 2);
            s.rate = v.valueOfTag;
            s.point = v.point;
            s.cId = v.cId;
            s.insId = v.insId;
            s.pId = v.pId;
            pieData.push(s);
          });
        });

        //转化为绘制饼图的格式
        var nestBySegment = d3
          .nest()
          .key(function(d) {
            return d.segment;
          })
          .entries(pieData);
        //console.log(nestBySegment)
        nestBySegment.forEach(function(d) {
          let minOffset = d3.min(d.values, function(s) {
            return s.offset;
          });
          d.values.forEach(function(v) {
            v.minOffset = minOffset;
          });
        });

        var maxTotal = d3.max(nestBySlice, function(d) {
          return d.total;
        });
        var maxValue = d3.max(nestBySlice, function(d) {
          return d3.max(d.values, function(q) {
            return q.value / 2;
          });
          //console.log(d); return d.total
        });
        var minValue = d3.min(nestBySlice, function(d) {
          return d3.min(d.values, function(q) {
            return q.value / 8;
          });
          //console.log(d); return d.total
        });

        //根据画布大小算一个合适的半径-----上下游
        var radius, innerRadius;
        if (type == 1) {
          radius = document.documentElement.offsetWidth / 4; //document.documentElement.offsetHeight / 6 / 2
          innerRadius = document.documentElement.offsetWidth / 6;
        } else {
          radius = document.documentElement.offsetWidth / 4; //document.documentElement.offsetHeight / 6 / 2
          innerRadius = document.documentElement.offsetWidth / 6;
        }
        var rScale = d3
          .scaleLinear()
          .range([innerRadius, radius])
          .domain([minValue, maxValue]);

        var padding = 0.1;
        var paddingPX = padding * (innerRadius * 2 * Math.PI);
        //准备一个弧生成器，用于根据角度生产弧路径
        var arc = d3
          .arc()
          /*.padAngle(function(d){
                      let c = rScale(d.data.minOffset) * 2 * Math.PI;
                      let p = (paddingPX/c)
                      return p;
                    })*/
          .innerRadius(function(d) {
            return rScale(0);
            // return rScale(d3.max(d, (d) => { return d}))
          })
          .outerRadius(function(d) {
            return d.data.value == 0 ? rScale(0) : rScale(d.data.value);
            // return rScale(d.data.offset + d.data.value)
          });
        //var arc2 = d3.arc()
        //    /*.padAngle(function(d){
        //      let c = rScale(d.data.minOffset) * 2 * Math.PI;
        //      let p = (paddingPX/c)
        //      return p;
        //    })*/
        //    .innerRadius(function (d) {
        //        return rScale(document.documentElement.offsetWidth / 14)
        //    })
        //    .outerRadius(function (d) {
        //        return rScale(document.documentElement.offsetWidth / 14)
        //    });

        //var colorScale = d3.scaleSequential(d3.interpolateCubehelixDefault)
        //                   .domain([0, 31])
        // 颜色选择器 已决定饼图不同的部分不同的颜色
        var upColorList = d3
          .scaleQuantize()
          .domain([1, 33])
          .range([
            "#ff8800",
            "#ffc65c",
            "#b52700",
            "#6d0002",
            "#d48265",
            "#61a0a8"
          ]);
        var downColorList = d3
          .scaleQuantize()
          .domain([1, 33])
          .range([
            "#a0e13a",
            "#73ca9b",
            "#5c9ebc",
            "#5359a6",
            "#528e9c",
            "#5e7aa8"
          ]);

        // p2.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        //下链链接标签
        // 生成
        var gw = p2.append("g").attr("class", function(d) {
          //if (d.index == 6) {
          //    d3.select(this).append("image")
          //        .attr("xlink:href", "icon/pt.png")
          //        .attr("id", "pt")
          //        .attr("y", 0)
          //        .attr("width", 298)
          //        .attr("height", 140)

          //}
          //else if (d.index == 4) {
          //    d3.select(this).append("image")
          //        .attr("xlink:href", "icon/tj.png")
          //        .attr("id", "tj")
          //        .attr("y", 0)
          //        .attr("width", 352)
          //        .attr("height", 80)
          //}
          //else if (d.index == 12) {
          //    d3.select(this).append("image")
          //        .attr("xlink:href", "icon/yx.png")
          //        .attr("id", "yx")
          //        .attr("y", 0)
          //        .attr("width", 298)
          //        .attr("height", 140)
          //}
          return "sec" + d.index;
        });

        gw.on("click", function() {
          // console.log(d3.select(this),'------gw-------');
          d3.event.stopPropagation();
          // console.log(d3.select(this.parentNode).property("active"))
          d3.select(this)
            .selectAll(".title")
            .on("click", function(q) {
              d3.event.preventDefault();

              //d3.select(this).classed("btnActive",
              //    that.getPlus.call(this, q, ".title")
              //);
              d3.select(this).classed("btnActive", function() {
                var _this = this;

                return that.getPlus(_this, q, ".title");
              });
              d3.select(this.parentNode.nextElementSibling)
                .selectAll(".icon")
                .filter(function(z, j) {
                  if (q.index == z.index) {
                    //d3.select(this).classed("btnActive",
                    //    that.getPlus.call(this, q, ".icon")
                    //);
                    d3.select(this).classed("btnActive", function() {
                      var _this = this;

                      return that.getPlus(_this, q, ".icon");
                    });
                  }
                });
            });
        });

        //缩放
        var zoom_handler = d3.zoom().on("zoom", zoom_actions);
        zoom_handler(p2);
        function zoom_actions() {
          gw.attr("transform", d3.event.transform);
        }
        //生成阴影
        var defs = gw.append("defs");

        var filter = defs.append("filter").attr("id", "drop-shadow");

        filter
          .append("feGaussianBlur")
          .attr("stdDeviation", 50)
          .attr("result", "coloredBlur");
        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
        //生成渐变
        var lG = defs
          .append("linearGradient")
          .attr("id", "grey-to-grey")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        lG.append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color:rgb(241,241,243);stop-opacity:1");
        lG.append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color:rgb(178,178,178);stop-opacity:1");

        //画图
        nestBySegment.forEach(function(segment, i) {
          let minOffset = d3.min(segment.values, function(d) {
            return d.offset;
          });
          let c = rScale(minOffset) * 2 * Math.PI;
          let thisPadding = paddingPX / c;
          //准备一个pie布局器，此布局可根据原始数据计算出一段弧的开始和结束角度
          var pie = d3
            .pie()
            //宽度等比：function (d) { console.log(d); return (!d.total || !d.value) ? 0 : d.value / d.total }
            .value(1);
          //	.padAngle(thisPadding)
          // 将原始数据经过布局转换
          let p = pie(segment.values);

          //console.log(p)
          let g = gw.append("g");
          //添加连接线

          if (i == 0) {
            g.append("g").attr("class", "labels");
            g.append("g").attr("class", "lines");
            g.append("text")
              .html(d => {
                return d.ClassName.Name;
              })
              // 行业
              .attr("class", "insTag")
              .attr("fill", "#fff")
              .attr("text-anchor", "middle")
              .attr("dy", "-3em")
              .attr("style", "font-size:30px");
            var polyline = gw
              .select(".lines")
              .selectAll("polyline")
              .data(pie(segment.values))
              .enter()
              .append("polyline")
              .attr("stroke", function(d) {
                if (type == 0) {
                  return upColorList(d.index);
                } else {
                  return downColorList(d.index);
                }
              })
              // 上下连链饼图突出的线链接的终点到哪
              .attr("points", function(d) {
                // see label transform function for explanations of these three lines.
                //var pos = arc2.centroid(d);
                //pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                //console.logconsole.log(pos)
                // return [arc.centroid(d), arc2.centroid(d), pos]
                if (d.index % 2 == 0) {
                  return [
                    arc.centroid(d),
                    corner((d.startAngle + d.endAngle) / 2, 20, 2, d)
                  ];
                } else {
                  return [
                    arc.centroid(d),
                    corner((d.startAngle + d.endAngle) / 2, 20, 1, d)
                  ];
                }
              });
            function midAngle(d) {
              return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }
            // 上下链饼图文字显示 即突出的线外部的文字 值
            // 其中 label指的是name label2是value
            var label = gw
              .select(".labels")
              .selectAll("g")
              .data(pie(segment.values))
              .enter()
              .append("g")
              .append("text")
              .attr("dy", "-1.7em")
              .attr("text-anchor", "middle")
              .html(function(d) {
                //省份
                return d.data.name;
              })
              .attr("transform", function(d) {
                if (d.index == 0) {
                  gw.selectAll(".insTag").attr("transform", function() {
                    return (
                      "translate(" + corner(0, 20, 1, d) + ")" + "rotate(0)"
                    );
                  });
                }
                if (d.index == 1) {
                  var x = corner(
                    (d.startAngle + d.endAngle) / 2,
                    20,
                    2,
                    d
                  ).split(",")[0];
                  //   d3.select("#pt").attr("x", -x - 300)
                  d3.select("#tj").attr("x", x - 360);
                  //   d3.select("#yx").attr("x", -x - 300)
                }
                if (d.index % 2 == 0) {
                  return (
                    "translate(" +
                    corner((d.startAngle + d.endAngle) / 2, 20, 2, d) +
                    ")" +
                    "rotate(" +
                    (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
                    ")"
                  );
                } else {
                  return (
                    "translate(" +
                    corner((d.startAngle + d.endAngle) / 2, 20, 1, d) +
                    ")" +
                    "rotate(" +
                    (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
                    ")"
                  );
                }
              });
            var label2 = gw
              .select(".labels")
              .selectAll("g")
              .append("text")
              .attr("dy", "-.5em")
              .attr("text-anchor", "middle")
              .html(function(d) {
                // 数值
                //为数字加上 '万' 字
                let showNum = d.data.value;

                showNum = vm.showNumFix(showNum);
                return showNum;
                // return d.data.value;
              })
              .attr("transform", function(d) {
                if (d.index % 2 == 0) {
                  return (
                    "translate(" +
                    corner((d.startAngle + d.endAngle) / 2, 20, 2, d) +
                    ")" +
                    "rotate(" +
                    (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
                    ")"
                  );
                } else {
                  return (
                    "translate(" +
                    corner((d.startAngle + d.endAngle) / 2, 20, 1, d) +
                    ")" +
                    "rotate(" +
                    (((d.startAngle + d.endAngle) / 2) * 180) / Math.PI +
                    ")"
                  );
                }
              });
          }
          g.attr("class", "wrapper");

          g.selectAll("path")
            .data(p)
            .enter()
            .append("g")
            .attr("class", function(d) {
              if (d.data.segment == 1) {
                return "title";
              }
              return "icon";
            })
            .append("path")
            .style("fill", function(d) {
              if (type == 0) {
                return upColorList(d.index);
              } else {
                return downColorList(d.index);
              }
            })
            .attr("d", arc);
        });

        let icon_width = document.documentElement.offsetWidth / 4,
          icon_height = document.documentElement.offsetWidth / 4;
        var iconG = gw.select(".wrapper").append("g");

        var defs = iconG.append("defs");
        // 生成上链图标 跟 下链图标
        if (type == 1) {
          var pattern = defs
            .append("pattern")
            .attr("id", "image3")
            .attr("x", -icon_width / 2)
            .attr("y", -icon_height / 2)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("height", icon_width)
            .attr("width", icon_height);
          pattern
            .append("svg:image")
            .attr("width", icon_width)
            .attr("height", icon_height)
            .attr("x", 0)
            .attr("y", 0)
            .attr("href", require("../../assets/icon/circle.png"));
          var pattern1 = defs
            .append("pattern")
            .attr("id", "image4")
            .attr("x", -24)
            .attr("y", -24)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("height", 48)
            .attr("width", 48);
          pattern1
            .append("svg:image")
            .attr("width", 48)
            .attr("height", 48)
            .attr("x", 0)
            .attr("y", 0)
            .attr("href", require("../../assets/icon/xia.png"));
          iconG
            .append("circle")
            .attr("r", icon_width / 2)
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("fill", "url(#image3)");
          iconG
            .append("circle")
            .attr("r", 24)
            .attr("fill", "url(#image4)")
            .attr("cx", 0)
            .attr("cy", 0);
        } else {
          var pattern2 = defs
            .append("pattern")
            .attr("id", "image5")
            .attr("x", -24)
            .attr("y", -24)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("height", 48)
            .attr("width", 48);
          pattern2
            .append("svg:image")
            .attr("width", 48)
            .attr("height", 48)
            .attr("x", 0)
            .attr("y", 0)
            .attr("href", require("../../assets/icon/shang.png"));
          iconG
            .append("circle")
            .attr("r", 24)
            .attr("fill", "url(#image5)")
            .attr("cx", 0)
            .attr("cy", 0);
        }

        //定位icon
        function corner(angle, r, sign, d) {
          //  调整icon的offsetTop,为0是与外圆弧相同
          var iconOffset = sign == 2 ? -40 : -100;
          if (sign == 2) {
            iconOffset = -40;
          } else if (sign == 3) {
            iconOffset = -200;
          } else {
            iconOffset = -100;
          }
          var radius = rScale(d.data.value) - iconOffset;

          if (sign == 1) {
            return (
              sign * Math.cos(angle) +
              Math.sqrt(radius * radius) * Math.sin(angle) +
              "," +
              (sign * Math.sin(angle) -
                Math.sqrt(radius * radius) * Math.cos(angle))
            );
          } else if (sign == 2) {
            return (
              sign * Math.cos(angle) +
              Math.sqrt(radius * radius) * Math.sin(angle) +
              "," +
              (sign * Math.sin(angle) -
                Math.sqrt(radius * radius) * Math.cos(angle))
            );
          }
          return (
            sign * Font * Math.cos(angle) +
            Math.sqrt(radius * radius - Font * Font) * Math.sin(angle) +
            "," +
            (sign * Font * Math.sin(angle) -
              Math.sqrt(radius * radius - Font * Font) * Math.cos(angle))
          );
        }
        //点击事件
        // let prevObj1 = null, prevObj2 = null;
        // var showSec = d3.selectAll(".title");
        // showSec.on("click", function (d) {

        //     var obj1 = d3.selectAll(".lines").selectAll("polyline");
        //     var obj2 = d3.selectAll(".labels").selectAll("text");
        //     showNext(obj1, d, "polyline");
        //     showNext(obj2, d, "text");

        // });
        // var showNext = function (obj, d, type) {

        //     obj = obj || {};
        //     obj.select(function (dx, i) {
        //         if (i == d.index) {
        //             if (type && type == "polyline") {

        //                 if (prevObj1) {
        //                     prevObj1.style.display = "none";
        //                     prevObj1 = this;
        //                     this.style.display = "block";
        //                 } else {
        //                     prevObj1 = this;
        //                     this.style.display = "block";
        //                 }
        //             } else if (type && type == "text") {
        //                 if (prevObj2) {
        //                     prevObj2.style.display = "none";
        //                     prevObj2 = this;
        //                     this.style.display = "block";
        //                 } else {
        //                     prevObj2 = this;
        //                     this.style.display = "block";
        //                 }
        //             }

        //         }
        //     })
        // }
      }

      d3.select("#svgg").on(
        "click",
        function(d) {
          // console.clear();
          // console.log(d3.event)
          d3.event.stopPropagation();
          d3.event.preventDefault();
          d3.selectAll(".secBtn").filter(function(z, i) {
            if (d3.select(this).property("active")) {
              d3.select(this)
                .selectAll(".title")
                .classed("btnActive", false);
              d3.select(this)
                .selectAll(".icon")
                .classed("btnActive", false);
            }
            d3.select(this).property("active", false);
            d3.select(this)
              .select("rect")
              .classed("dis_none", true);
          });

          simulation.restart();
          vm.$emit("stopdm", 0);
          vm.isClick = false;
          // d3.select(".mainFnBtn").classed('dis_none', false);
          // d3.select("#pt").classed('dis_none', false);
          vm.isShowMainSelect = false;
        },
        false
      ); //.attr("preserveAspectRatio", "xMidYMid meet")
      vm.ischartLoading = false;
    },

    // 该方法先通过 GetUpEnterpriseList
    // 该方法用途：企业信息数据加工
    /**
     * 此处现将数据获取
     * 然后存入vm.streamData
     * vm.streamData 会赋值给 vm.streamData2
     * vm.streamData2将会用获得的数据绘制图谱
     */
    

    makeEnterpriseList(id) {
      // 获取上链数据
      function getUpData() {
        return vm.$axios.post(vm.$api.GetUpEnterpriseList, {
          PageIndex: 1,
          PageSize: 1,
          Where: [
            {
              name: "enterpriseid",
              value: id
            }
          ]
        });
      }

      // 获取下链数据
      function getDownData() {
        return vm.$axios.post(vm.$api.GetDownEnterpriseList, {
          PageIndex: 1,
          PageSize: 1,
          Where: [
            {
              name: "enterpriseid",
              value: id
            }
          ]
        })
        .then(res=>{
          console.log('========原始=======',res);
          return res
        })
      }

      // 查询企业访问次数
      function getSaveVisitCount() {
        return vm.$axios.post(vm.$api.SaveVisitCount, {
          enterpriseid: id
        });
      }

      vm.$axios
        .all([getUpData(), getDownData(), getSaveVisitCount()])
        .then(
          vm.$axios.spread((up, down, visit) => {
            let showNum = 6;

            // 上链数据
            if (up.data.IsResult) {
              let upRes = up.data.Result;
              let showRes = [];
              upRes.rows.Up.length > showNum
                ? (showRes = upRes.rows.Up.slice(0, showNum))
                : (showRes = upRes.rows.Up);

              // console.log(res,'makeEnterpriseList  GetUpEnterpriseList')
              showRes.forEach((item, index) => {
                let proTotal = 0;
                item.name = item.ClassName.Name + "-up";
                item.id = item.ClassName.ID + "-up"; //避免与上链重复id，导致缺失连线
                item.Province.forEach((PItem, PIndex) => {
                  // 省份数据处理
                  PItem.segment = 1; //因老板改需求 所以该属性废了
                  PItem.slice = PIndex + 1; //索引 从1开始
                  PItem.value = PItem.Count == null ? 0 : PItem.Count; //饼图显示的数值
                  proTotal += PItem.value; //计数器 用于下面的计算总和
                  PItem.cId = upRes.rows.ID; //对应企业ID
                  PItem.insId = item.ClassName.ID; //对应行业ID
                  PItem.pId = PItem.ID; //排序ID
                  PItem.point = "up"; //用于区分上下链
                });
                item.point = "up"; // 区分上下链
                item.proTotal = proTotal; //计算总和
              });
              // console.log(res,'res res res');
              // console.log(res.rows,'res.rows res.rows');
              // console.log(res.rows.Up,'res.rows.up res.rows.up');
              // vm.streamData.upData.data = upRes.rows.Up.length > 3 ? upRes.rows.Up.slice(0, 4) : upRes.rows.Up;
              vm.streamData.upData.data = showRes;
              vm.streamData.upData.total = upRes.total;
              vm.streamData.title = upRes.rows.txtName;
            }

            // 下链数据
            if (down.data.IsResult) {
              let downRes = down.data.Result;
             

            console.log("====tdata===========", downRes);

            let tdata = [
              {
                ClassName:{Name: "交通运输、仓储和邮政业", ID: 7},
                Province:[{Name: "天津市", ID: 2, Count: 94},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                         
                          ]
              },
              {
                ClassName:{Name: "交通运输、仓储和邮政业", ID: 8},
                Province:[{Name: "天津市", ID: 2, Count: 94},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "天津市", ID: 2, Count: 94},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "天津市", ID: 2, Count: 94},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "天津市", ID: 2, Count: 94},
                          {Name: "河北省", ID: 3, Count: 73},
                          {Name: "山西省", ID: 4, Count: 171},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                          {Name: "内蒙古自治区", ID: 5, Count: 66},
                         
                          ]
              },
            ]

              let showRes = [];
              // downRes.rows.Down.length > showNum
              //   ? (showRes = downRes.rows.Down.slice(0, showNum))
              //   : (showRes = downRes.rows.Down);


              showRes = tdata


              //处理下链
              // 该数据结构可参考上链 就在上面！！！ 的介绍
              showRes.forEach((DItem, DIndex) => {
                DItem.name = DItem.ClassName.Name + "-down"; //避免与上链重复id，导致缺失连线
                DItem.id = DItem.ClassName.ID + "-down"; //避免与上链重复id，导致缺失连线
                let proTotal = 0;
                DItem.Province.forEach(PItem => {
                  PItem.segment = 1;
                  PItem.slice = DIndex + 1;
                  PItem.value = PItem.Count == null ? 0 : PItem.Count;
                  proTotal += PItem.value;
                  PItem.cId = downRes.rows.ID;
                  PItem.insId = DItem.ClassName.ID;
                  PItem.pId = PItem.ID;
                  PItem.point = "down";
                });
                DItem.point = "down";
                DItem.proTotal = proTotal;
              });
              vm.streamData.downData.data = showRes;
              vm.streamData.downData.total = downRes.total;
              vm.streamData.title = downRes.rows.txtName;

              
            }

            // 访问数 推荐数接口
            if (visit.data.IsResult) {
              let count = visit.data.Result.Count.count; // 访问数
              let number = visit.data.Result.Count.number; // 推荐数
              vm.streamData.visit = ++count;
              vm.streamData.rec = number;
              // ok++
            }

            //事件目标
            let funTarget = null;
            let width = 1124,
              height = 2000;

            // 画图 即 当获取完所有该有的数据后画图 并赋值
            //t.dragForce(_this.streamData);

            vm.getMainFnBtn(width, height, id);
          })
        )
        .catch(rej => {
          console.log(rej);
        });
    },

    // 这是用于获取显示首页企业的代码块
    // 获取企业信息
    getEnterpriseList(id) {
      vm.ischartLoading = true; //在获取完信息前显示loading图
      //初始化随机获取企业
      // 假如已存在企业信息ID
      if (id) {
        // console.log(id,'getEnterpriseListIDgetEnterpriseListID')
        // 指定某企业ID
        id = id;
        // 调用获得企业信息的方法
        vm.makeEnterpriseList(id); // 用于获取上下链企业信息 并且对数据进行加工
        // vm.cID = id; //将该id 存储起来 表示企业ID
        vm.$store.commit("showingCId", id); //将正在显示的企业ID存进vuex里
      } else {
        // 假如企业信息ID不存在
        // 就从数据库中随机抽取其中一条企业ID
        /*  需求：这是初始化时做的用户是否存在已认证企业 若无则随机显示
                    若有则 有可能设置了特定企业为首屏显示 故此函数会在初始化时获取默认企业
                    进行判断

                    假如我没有企业ID
                    则随机获取一条企业信息 该接口调用GetRandomEnterpriseList 成功认证的企业
                 */
        //随机获取企业名称GetRandomEnterpriseList
        var para = {
          method: "get",
          url: vm.$api.GetRandomEnterpriseList
        };
        vm.getAjaxResponse(
          para,
          function(successBack) {
            if (successBack.data.IsResult) {
              id = successBack.data.Result[0].ID;
              //将该id 存储起来 表示企业ID
              // vm.$children.cID = id;
              // vm.cID = id;
              vm.$store.commit("showingCId", id); //将正在显示的企业ID存进vuex里
              //用于获取上下链企业信息 并且对数据进行加工
              vm.makeEnterpriseList(id); // 用于获取上下链企业信息 并且对数据进行加工
            }
          },
          function(errorBack) {
            console.log(errorBack);
          }
        );
      }
    },

    //保存维度 #$save
    saveMainFn() {
      //保存成功---更新维度信息
      // var obj = {};
      // obj.SxUserID = _this.userInfoChart.ID;
      // obj.WfEnterpriseID = _this.cID
      // _this.mainFnBtnList.forEach((v, i) => {
      //     console.log(obj,obj[v.en],v.isCheck,v,'saveMainFn')
      //     obj[v.en] = v.isCheck

      // });
      // console.log(obj)

      // 将 mainFnBtnList 获得的数据 转译为 saveInfoList s
      let mainFnBtnList = vm.mainFnBtnList;
      let saveInfoList = vm.saveInfoList;
      mainFnBtnList.forEach(item => {
        saveInfoList[item.stateName] = item.isCheck;
      });

      // 将 mainFnBtnList 获得的数据 转译为 saveInfoList e

      console.log(mainFnBtnList, "--------mainFnBtnList----------");

      var para = {
        method: "post",
        url: vm.$api.SaveCheckdimension,
        data: saveInfoList
      };

      vm.getAjaxResponse(
        para,
        function(successBack) {
          // console.log(successBack)
          //本地存储个人维度

          if (successBack.data.IsResult) {
            vm.refreshInfo(); //请求已更新的企业维度信息 并存储进localStorage
            vm.getEnterpriseList(vm.$store.state.loginInfo.showingCId); //cID(企业id) 获取特定企业信息
            vm.isShowMainSelect = false; //关闭企业维度选择弹窗
            console.log(successBack, "save successBack");
          } else {
          }
        },
        function(errorBack) {
          console.log(errorBack);
        }
      );
    },
    // $#save

    //更新维度信息 #$
    refreshInfo() {
      var _this = this;
      //获取企业维度
      var para = {
        method: "post",
        url: vm.$api.GetCheckdimension, //查询已勾选的企业维度信息
        data: {
          pageIndex: 1,
          PageSize: 30,
          Where: [
            {
              name: "userid",
              value: vm.$store.state.loginInfo.userInfo.ID
              //   vm.$commonFn.handleStroage.getLocalStorage("userInfo").ID
            }
          ]
        }
      };

      vm.getAjaxResponse(
        para,
        function(successBack) {
          // console.log(successBack)
          //本地存储个人维度

          if (successBack.data.IsResult) {
            var res = successBack.data.Result;
            // console.log('res refreshInfo refreshInfo refreshInfo',res);
            vm.$commonFn.handleStroage.setLocalStorage("Checkdimension", res); //存储入库了的已勾选的企业维度信息
          } else {
          }
        },
        function(errorBack) {
          console.log(errorBack, "获取企业维度信息失败");
        }
      );
    },

    //检查企业维度的值,改变自画像的显示值
    // 饼图数据处理
    checkDimensionInfo(id) {
      // var obj = vm.$commonFn.handleStroage.getLocalStorage("Checkdimension"); //*获得已勾选
      var data = [];
      var recData = [];
      var dataCheckdimension = vm.dataCheckdimension;
      // var mainColorList = vm.mainColorList; //选择框内的数据
      vm.mainFnBtnList.forEach((btnItem, i) => {
        // 应该是该维度按钮是否被选择吧?
        if (btnItem.isCheck) {
          for (var k = 0; k <= 2; k++) {
            var o = {};
            o.slice = i;
            o.segment = k + 1;
            o.value = null;
            o.color = "";
            o.id = btnItem.id; //这里是插入了  企业维度id !warn 需优化
            if (k == 0) {
              o.value = 20 + 2 * Math.random();
              o.color = btnItem.color;
              o.title = btnItem.title;
            } else if (k == 1) {
              o.value = 5;
              o.color = btnItem.color;
              o.icon = btnItem.icon;
            } else {
              o.value = 10;
            }
            data.push(o);
          }
        }

        for (var k1 = 0; k1 <= 2; k1++) {
          var newObj = {};
          newObj.slice = i;
          newObj.segment = k + 1;
          newObj.value = null;
          newObj.color = "";
          newObj.id = btnItem.id; //这里插入了 企业维度id !warn 需优化
          if (k1 == 0) {
            newObj.value = 20 + 2 * Math.random();
            newObj.color = btnItem.color;
            newObj.title = btnItem.title;
          } else if (k1 == 1) {
            newObj.value = 5;
            newObj.color = btnItem.color;
            newObj.icon = btnItem.icon;
          } else {
            newObj.value = 10;
          }
          recData.push(newObj);
        }
      });
      //未认证企业或者不是查看自己的企业
      //认证
      // 将用户信息存入浏览器本地数据库
      // var hidBidsCompanyID = vm.$commonFn.handleStroage.getLocalStorage("userInfo").hidBidsCompanyID;
      var hidWfEnterpriseID =
        vm.$store.state.loginInfo.userInfo.hidWfEnterpriseID;
      // vm.$commonFn.handleStroage.getLocalStorage("userInfo").hidWfEnterpriseID;

      /*
            if (hidBidsCompanyID) {
                //查看自己认证的企业
                if (hidBidsCompanyID == id) {
                    vm.streamData2.nodes[0].data = recData
                } else {
                    vm.streamData2.nodes[0].data = data.length > 0 ? data : vm.dataCheckdimension
                }

            } else {
                //未认证判断是否为默认企业
                vm.streamData2.nodes[0].data = data.length > 0 ? data : vm.dataCheckdimension
            }*/

      // 假如现企业是默认企业
      if (hidWfEnterpriseID == id) {
        vm.streamData2.nodes[0].data = recData;
      } else {
        // 查看其它企业或未有认证企业
        vm.streamData2.nodes[0].data =
          data.length > 0 ? data : vm.dataCheckdimension;
      }
      // console.log(data)
    },
    // 引用对应窗口
    popUp(popName) {
      this.$store.commit("showPop", popName);
    }
  }
};
</script>