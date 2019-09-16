<template>
  <!-- <script src="drawSec.js"></script> -->
  <!-- <div class="clear box" id="app"> -->
  <div class="clear box">

    <!--  子组件 IndexWrapperperItem s-->
    <index-wrapper
      v-if="isShowIndexWrapper"
      v-cloak
    >
      <div class="tipsOrSuccessWrapper-con-checkPie">
        <a class="dis_bl mar_b_20 fz_20  main_bgcolor_09a2a3">查看自画像</a>
        <a class="dis_bl fz_20 main_bgcolor_ff8800">关注</a>
      </div>
    </index-wrapper>
    <!--  子组件 IndexWrapperperItem s-->

    <!-- 搜索框 子组件 SearchBoxItem-->
    <index-search></index-search>

    <!-- 内容可视区域 s -->
    <div
      id="svgWrapper"
      class="pos_res"
    >
      <template v-if="userInfo.ID">

        <!--  子组件 ChartItem 企业维度 s -->
        <index-chart
          :is-approve="true"
          :user-info="userInfo"
          v-on:stopdm="closeDm"
        >
        </index-chart>
        <!-- 
                    :is-approve 该企业是否被认证
                    :user-info 用户信息
                    :stopdm 检测弹窗（获取子组件index-chart 传的状态值 ）
                 -->
        <!--  子组件 ChartItem 企业维度 e -->

        <div
          class="recommendBtn"
          @click="recommend"
        >
          <!-- <div class="circle">
                    </div> -->
          <div class="white-point"></div>
          我推荐
        </div>

      </template>
      <svg
        width="100%"
        height="100%"
        id="svgg"
        @click="closeSearchRes"
      ></svg>

      <!-- 认证通知DM弹窗 s -->
      <transition>
        <div
          class="dm"
          v-show="isShowDm&&!nowPage"
          v-cloak
        >
          <div>
            <img
              src="../../assets/icon/dmlogo.png"
              class="w h"
            />
          </div>
          <!--<p class="fC1 main_color_ffffff fz_24" v-for="(item,index) of dmList" @click="showDdm(item.ID)">{{item.Title}}<i></i></p>-->
          <p class="fC1 main_color_ffffff fz_24">{{dmCon}}</p>
        </div>
      </transition>

      <!-- 认证通知DM弹窗 e -->

      <!-- bz机器人 s -->
      <div
        class="dm-robot"
        v-if="!nowPage"
      >
        <div class="dm-robot-logo">
          <img
            src="../../assets/icon/womiAI.png"
            class="w"
          />
        </div>
        <transition>
          <div
            class="dm-robot-note"
            v-show="isShowRobot"
            v-cloak
          >
            <div class="dm-robot-note-logoL"><img
                src="../../assets/icon/bzRobotL.png"
                class="h w"
              /></div>
            <div class="main_color_ffffff dm-robot-note-con pos_res">
              <p
                ref="wordLoop"
                v-html="wordLoop"
                class="fz_24"
              ></p>
              <div class="dm-robot-note-logoR"><img
                  src="../../assets/icon/bzRobotR.png"
                  class="h w"
                /></div>
            </div>
          </div>
        </transition>
      </div>
      <!-- bz机器人 e -->

    </div>
    <!-- 内容可视区域 e -->

    <!-- 我推荐 -->
    <!--<a class="pcBtn2 bs_bb dis_bl" v-if="!nowPage">
            <i></i>
            我推荐
        </a>-->

    <!-- 服务通告（上下链服务） s -->
    <div
      :class="['index-serNote','clear',isShowServiceTrans?'active':'']"
      v-if="!nowPage"
    >
      <p
        class="index-serNote-title fl"
        @click="openServiceTrans(1)"
      >
        <span>上</span>
        <span>下</span>
        <span>链</span>
        <span>服</span>
        <span>务</span>
        <i class="iconfont">&#xe601;</i>
      </p>
      <div class="index-serNote-con fr">
        <p
          class="index-serNote-con-title clear"
          @click="openServiceTrans(0)"
        >
          <i class="iconfont fl p_l_20 p_r_20 main_color_ffffff">&#xe602;</i>
          认证开通上下链服务
        </p>
        <p class="index-serNote-con-word main_color_ffffff">
          1、入驻成为供应商家（上链），面向几
          千万企业资源，通过AI算法获得推荐。<br />
          2、每天新发布几万条采购招标信息，AI机器人精
          准匹配免费推送到手机微信。<br />
          3、AI系统辅助算法可进行精准营销推送，
          包括文字短信、视频短信。<br />
          4、不限量浏览上下链企业自画像。<br />
          5、发布企业动态、关注重点企业为链圈。<br />
          6、发布采购选型报价公告，AI人工语音播读实时采购。<br />
          7、邀请同事同步管理，企业AI营销重构。
        </p>
        <div class="index-serNote-con-btn">
          <a
            class="dis_bl main_bgcolor_ff8800 main_color_ffffff"
            @click="authen"
          >我要认证开通</a>
          <a
            class="dis_bl main_bgcolor_ffffff"
            @click="searchFromBtn"
          ><i class="iconfont">&#xe600;</i>搜我的企业</a>
        </div>
      </div>
    </div>
    <!-- 服务通告（上下链服务） e -->

    <!-- 各省份详情弹窗 s -->
    <div
      class="provinceOfCompany"
      v-if="isShowSearchBox"
      v-cloak
    >
      <div class="provinceOfCompany-title clear">
        <p class="fl">汽车销售企业</p>
        <p class="fr"><i class="iconfont">&#xea29;</i>换一批</p>
      </div>
      <div class="provinceOfCompany-con">
        <div class="provinceOfCompany-con-fn">
          <span>共家企业</span>
          <a>精确检索</a>
        </div>
        <div
          class="provinceOfCompany-con-res"
          ref="proDetail"
        >
          <ul>
            <li>1、454545</li>
          </ul>
        </div>
        <p class="provinceOfCompany-con-send">- 发送 -</p>
        <div class="provinceOfCompany-con-btn">
          <section>
            <div class="provinceOfCompany-con-btn-sec">
              <a class="margin_auto">
                <i class="iconfont fz_36 main_color_ffffff">&#xe61d;</i>
              </a>
              <p class="tx-c fz_20">短信</p>
            </div>
          </section>
          <section>
            <div class="provinceOfCompany-con-btn-sec">
              <a class="margin_auto">
                <i class="iconfont fz_36 main_color_ffffff">&#xe606;</i>
              </a>
              <p class="tx-c fz_20">邮件</p>
            </div>
          </section>
          <section>
            <div
              class="provinceOfCompany-con-btn-sec"
              @click="isShowSearchBox=false"
            >
              <a class="margin_auto">
                <i class="iconfont main_color_ffffff">&#xe605;</i>
              </a>
              <p class="tx-c fz_20">关闭</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <!-- 各省份详情弹窗 e -->

    <!-- 查看自画像/推荐成功弹窗 -->
    <!--<div class="tipsOrSuccessWrapper">
            <div class="tipsOrSuccessWrapper-con">
                <div class="tipsOrSuccessWrapper-con-checkPie">
                    <a class="dis_bl mar_b_20 fz_20  main_bgcolor_09a2a3">查看自画像</a>
                    <a class="dis_bl fz_20 main_bgcolor_ff8800">关注</a>
                </div>
                <p class="tipsOrSuccessWrapper-con-recSuccess">推荐成功</p>
            </div>
        </div>-->
    <transition>
      <div
        class="recommendPop"
        v-show="recommendPop.isShow"
      >
        <div class="mask"></div>
        <div class="text">
          {{recommendPop.text}}
        </div>
      </div>
    </transition>

    <!-- 底部 -->
    <!-- <index-footer :pos="pos"></index-footer> -->

    //弹窗
    <aut-config />

    <!-- <CompanyList /> -->
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from "axios";
import IndexWrapperItem from "../../components/shangLian/IndexWrapperItem";
import SearchBoxItem from "../../components/shangLian/SearchBoxItem"; //搜索框
// import CreateFooterItem from '../../components/common/CreateFooterItem'
import ChartItem from "../../components/shangLian/ChartItem";

import AutConfig from "@/components/shangLian/autPop/AutConfig"; //企业认证

import commonFn from "@/assets/js/commonFn"; //公共方法

import CompanyList from "@/components/pop/shanglian/CompanyList"; // 上下链点击后显示的弹窗
let vm = null;
export default {
  components: {
    "index-wrapper": IndexWrapperItem,
    "index-search": SearchBoxItem, //搜索框
    // "index-footer": CreateFooterItem,
    "index-chart": ChartItem, //图表
    "aut-config": AutConfig, //认证
    CompanyList
  },

  data() {
    //  mainProBtn: mainProBtn,
    return {
      dmCon: "", //弹窗内容存储

      isShowDm: false, //是否显示认证通知DM弹窗

      timer1: null,
      timer2: null,
      timer3: null,

      isShowServiceTrans: false, //是否显示上下链服务弹窗

      //下拉加载页数
      PageIndex: 1,
      //每页加载数据量
      PageSize: 20,
      wordLoop: ``, //机器人提示语
      isFirst: true,
      isShowRobot: false,
      //控制下拉加载
      isLoadMore: true,
      isEmptyData: false,
      isShowLoading: false,

      //取消请求
      source: null,
      streamData: {
        //该属性参考 ChartItem组件内 有介绍 目前未发现在此处用途
        upData: {
          data: [],
          total: 0
        },
        downData: {
          data: [],
          total: 0
        },
        title: "",
        visit: 0,
        rec: 0
      },
      downData: {
        data: [],
        total: 0
      },
      title: "",
      visit: 0,
      rec: 0,
      //   },

      //各省份详情弹窗
      isShowSearchBox: false, //废了
      //显示弹窗index-wrapper
      isShowIndexWrapper: false, //废了
      //当前所在页面 : 0首页--1上链--2下链
      nowPage: 0,
      //控制底部栏的显示
      pos: 0,
      // bus: new Vue(),
      //用户个人信息

      userInfo: {
        //判断是否已经认证
        hidWfEnterpriseID: "",
        //是否设为首页
        chbIsDefaultPage: null,
        //用户ID
        ID: null
      },
      recommendPop: {
        isShow: false,
        text: ""
      }, //推荐弹窗
      //调试/线上
      isTest: true
    };
  },
  methods: {
    //pin START=============
    authen() {
      this.$store.commit("showPop", "cert-ing");
    },

    //pin END============

    // 我推荐按钮
    recommend() {
      this.$axios
        .post(this.$api.SaveRecommendNumber, {
          enterpriseid: this.$store.state.loginInfo.showingCId,
          userid: this.$store.state.loginInfo.userInfo.ID
        })
        .then(res => {
          console.log(res);
          // 此处是点赞是否成功地结果
          // 0 代表失败 已推荐过
          // 1代表成功 推荐成功
          let getResult = res.data.Result;
          let result;
          if (+getResult) {
            result = "已成功推荐";
          } else {
            result = "已推荐过，无法重复推荐";
          }

          this.recommendPop.text = result;
          this.recommendPop.isShow = true;
          setTimeout(() => {
            this.recommendPop.isShow = false;
          }, 2000);
        })
        .catch(rej => {
          console.log(rej);
        });
    },

    // 关闭搜索框 取消搜索请求
    closeSearchRes() {
      var _this = this;
      _this.searchResultList = [];
      _this.isShowResult = false;
      _this.source();
    },

    // 工具函数
    getAjaxResponse(obj, fn1, fn2) {
      var _this = this;
      var CancelToken = axios.CancelToken; //这是用来取消请求的
      obj.cancelToken = new CancelToken(function executor(c) {
        _this.source = c;
      });
      axios(obj)
        .then(function(response) {
          fn1(response);
        })
        .catch(function(error) {
          fn2(error);
          // eslint-disable-next-line
          console.log(error);
        });
    },

    //公告定时器
    dmFn() {
      var _this = this;
      clearTimeout(this.timer2);
      var para = {
        method: "get",
        url: _this.$api.GetRandomEnterpriseList
      };
      this.getAjaxResponse(
        para,
        function(successBack) {
          if (successBack.data.IsResult) {
            var word =
              successBack.data.Result[0].Title.length > 12
                ? successBack.data.Result[0].Title.slice(0, 16) + "..."
                : successBack.data.Result[0].Title;
            _this.dmCon = word + "完成提交认证";
            _this.isShowDm = true;
            _this.timer2 = setTimeout(function() {
              _this.isShowDm = false;
              //_this.dmList=[]
            }, 5000);
          }
          //console.log(successBack)
        },
        function(errorBack) {
          // eslint-disable-next-line
          console.log(errorBack);
        }
      );
    },

    //机器人定时器 先不管他
    dmRobotFn() {
      var _this = this;
      clearTimeout(this.timer3);
      var para = {
        method: "get",
        url: _this.$api.GetRandomEnterpriseList
      };
      this.getAjaxResponse(
        para,
        function(successBack) {
          if (successBack.data.IsResult) {
            if (_this.isFirst) {
              _this.wordLoop =
                "实时行业采购需求，搜索您的企业进行认证即可接入<br/>服务，详情请点开屏幕右上角《上下链服务》。";
              _this.isFirst = false;
            } else {
              //var word = successBack.data.Result[0].Title.trim();
              var word = successBack.data.Result[0].Title.trim().split("");
              for (var i = 0; i < word.length; i++) {
                if (i % 16 == 0 && i + 1 && i > 0) {
                  word.splice(i, 0, "<br/>");
                  i++;
                }
              }
              _this.wordLoop = word.join("");
            }
            _this.isShowRobot = true;
            _this.timer3 = setTimeout(function() {
              _this.isShowRobot = false;
            }, 4000);
          }
        },
        function(errorBack) {
          // eslint-disable-next-line
          console.log(errorBack);
        }
      );
    },

    // 上下链服务弹窗开关
    openServiceTrans(n) {
      this.isShowServiceTrans = n === 1 ? true : false;
    },
    //点击企业切换自画像

    //来自搜索框组件的获取信息
    //cpGetE(id) {
    //    this.getEnterpriseList(id)
    //},

    //监控弹窗
    closeDm(state) {
      // eslint-disable-next-line
      console.log(state);
      var _this = this;
      if (state == 1) {
        _this.nowPage = 4;
      } else {
        _this.nowPage = 0;
        //_this.timer1 = setInterval(_this.dmFn, 8000);
      }
    },
    //搜索我的企业按钮
    searchFromBtn() {
      this.$root.bus.$emit("focusSearch");
      this.isShowServiceTrans = false;
    }
  },
  watch: {
    nowPage(newName /*, oldName*/) {
      var _this = this;
      if (newName != 0) {
        _this.timer1 = null;
        clearInterval(_this.timer1);
      }
    }
  },
  computed: {
    bodyHei() {
      return "height:" + window.innerHeight + "px";
    }
  },

  created() {
    console.log('=======aaaaaaaaaaaaaaaaa========',);
    /*
     * 模拟用户登录
     * 获取登录信息
     */

    var _this = this;
    //模拟用户登录
    // eslint-disable-next-line
    // isTest 是否调试模式
    if (_this.isTest) {
      _this.$axios
        .post(_this.$api.LoginTest, {
          id: 12
        })
        .then(successBack => {
          if (successBack.data.IsResult) {
            var res = successBack.data.Result;
            _this.userInfo.ID = res.ID;
            // _this.userInfo.chbIsDefaultPage = res.chbIsDefaultPage; //废弃 原为默认页
            // _this.userInfo.hidBidsCompanyID = res.hidBidsCompanyID; // 标注为公司ID 然鹅后端没有使用该字段
            _this.userInfo.hidWfEnterpriseID = res.hidWfEnterpriseID; //企业ID
            //本地存储个人信息
            // commonFn.handleStroage.setLocalStorage("userInfo", _this.userInfo)
            _this.$store.commit("userInfo", _this.userInfo);

          } else {
            if (successBack.data.Status == 0 && !_this.isTest) {
              window.location.href =

                "http://sxl.weiren.me/Api/Sx/PublicAccountLogin?redirectUrl=" +
                location.pathname;
              //createDialog().removeLocalStorage("isCode");
              //登录
            }
          }
        })
        .catch(rej => {
          // eslint-disable-next-line
          console.log(rej);
        });
    } else {
      //获取用户信息
      para = {
        method: "get",
        url: _this.$api.GetUserInfo
      };
      _this.getAjaxResponse(
        para,
        function(successBack) {
          console.log('===============',successBack);
          // eslint-disable-next-line
          if (successBack.data.IsResult) {
            var res = successBack.data.Result;
            _this.userInfo.ID = res.ID;
            // _this.userInfo.chbIsDefaultPage = res.chbIsDefaultPage; // 废弃 原为默认页
            // _this.userInfo.hidBidsCompanyID = res.hidBidsCompanyID; // 标注为公司ID 然鹅后端没有使用该字段
            _this.userInfo.hidWfEnterpriseID = res.hidWfEnterpriseID; //企业ID

            //本地存储个人信息
            // commonFn.handleStroage.setLocalStorage("userInfo", _this.userInfo)
            _this.$store.commit("userInfo", _this.userInfo);
          } else {
            if (successBack.data.Status == 0 && !_this.isTest) {

              window.location.href =
                "http://sxl.weiren.me/Api/Sx/PublicAccountLogin?redirectUrl=" +
                location.pathname;
              // createDialog().removeLocalStorage("isCode");
              //登录
            }
          }
        },
        function(errorBack) {
          // eslint-disable-next-line
          console.log(errorBack);
        }
      );
    }

    /*
     * 随机获取企业名
     */
    // console.log("首页mounted");
    // var _this = this;
    // _this.timer1 = setInterval(_this.dmFn, 8000); //公告定时器显示

    /*
        //新用户弹出
        ////if (this.isFirst) {
        ////    this.wordLoop = '嗨，欢迎来到上下链企业AI（智能）营销，<br/>上下链汇集几千万家企业图谱，自动向企业推送';
        ////    this.isShowRobot = true;
        ////    setTimeout(() => {
        ////        this.isShowRobot = false;
        ////        setInterval(_this.dmRobotFn, 6000);
        ////    },6000)
        ////} else {
        ////    var para = {
        ////        method: 'get',
        ////        url: '../../Api/SxChain/GetRandomEnterpriseList'
        ////    }
        ////    this.getAjaxResponse(para, function (successBack) {
        ////        if (successBack.data.IsResult) {
        ////            var word = successBack.data.Result[0].Title.trim().split("");
        ////            for (var i = 0; i < word.length; i++) {
        ////                if (i % 16 == 0 && i + 1 && i > 0) {
        ////                    word.splice(i, 0, "<br/>");
        ////                    i++;
        ////                }
        ////            };
        ////            console.log(word)
        ////            _this.wordLoop = word.join("")

        ////            _this.isShowRobot = true;
        ////            _this.timer3 = setTimeout(function () {
        ////                _this.isShowRobot = false;
        ////                setInterval(_this.dmRobotFn, 6000);
        ////            }, 6000)
        ////        }
        ////    }, function (errorBack) {
        ////        console.log(errorBack)
        ////    });
        ////}
        */
    /**
     * 此处用于随机企业公告
     */
    //随机获取企业名称GetRandomEnterpriseList
    var para = {
      method: "get",
      url: _this.$api.GetRandomEnterpriseList
    };
    _this.getAjaxResponse(
      para,
      function(successBack) {
        // eslint-disable-next-line
        // console.log(successBack.data.Result[0].title)
        if (successBack.data.IsResult) {
          var word =
            successBack.data.Result[0].Title.length > 12
              ? successBack.data.Result[0].Title.slice(0, 16) + "..."
              : successBack.data.Result[0].Title;
          _this.dmCon = word + "完成提交认证";
          _this.isShowDm = true;
          _this.timer2 = setTimeout(function() {
            _this.isShowDm = false;
            //_this.dmList=[]
          }, 5000);
        }
        // else {

        // }
      },
      function(errorBack) {
        // eslint-disable-next-line
        console.log(errorBack);
      }
    );
    this.$nextTick(() => {
      // var _this = this;
      this.showUp1 = true;
    });
  }
};
</script>