<template>
  <!-- <script src="drawSec.js"></script> -->
  <!-- <div class="clear box" id="app"> -->
  <div class="clear box">
    <!--  子组件 IndexWrapperperItem s-->
    <index-wrapper v-if="isShowIndexWrapper" v-cloak>
      <div class="tipsOrSuccessWrapper-con-checkPie">
        <a class="dis_bl mar_b_20 fz_20 main_bgcolor_09a2a3">查看自画像</a>
        <a class="dis_bl fz_20 main_bgcolor_ff8800">关注</a>
      </div>
    </index-wrapper>
    <!--  子组件 IndexWrapperperItem s-->

    <!-- 搜索框 子组件 SearchBoxItem-->
    <!-- <index-search></index-search> -->

    <div class="m-beside_btn_g">
      <div class="u-search_company" @click="besideBtnSearch(0)">
        <i class="iconfont beside_btn_icon">&#xe60d;</i>
        查找企业
      </div>
      <div class="u-global_search" @click="besideBtnSearch(1)">
        <i class="iconfont beside_btn_icon">&#xe608;</i>
        全网搜索
      </div>
    </div>

    <!-- 内容可视区域 s -->
    <div id="svgWrapper" class="pos_res">
      <!-- <template v-if="userInfo.ID"> -->
      <template>
        <!--  子组件 ChartItem 企业维度 s -->
        <!-- <index-chart
          :is-approve="true"
          :user-info="userInfo"
          v-on:stopdm="closeDm"
        >
        </index-chart>-->
        <new-chart v-if="$store.state.company.indexInfo !== null"></new-chart>
        <!-- 
                    :is-approve 该企业是否被认证
                    :user-info 用户信息
                    :stopdm 检测弹窗（获取子组件index-chart 传的状态值 ）
        -->
        <!--  子组件 ChartItem 企业维度 e -->

        <!-- <div
          class="recommendBtn"
          @click="recommend"
        >-->
        <!-- <div class="circle">
        </div>-->
        <!-- <div class="white-point"></div>
          我推荐
        </div>-->
      </template>
      <!-- <svg
        width="100%"
        height="100%"
        id="svgg"
        @click="closeSearchRes"
      ></svg>-->

      <!-- 认证通知DM弹窗 s -->
      <transition>
        <div class="dm" v-show="isShowDm&&!nowPage">
          <div>
            <img src="../../assets/icon/dmlogo.png" class="w h" />
          </div>
          <!--<p class="fC1 main_color_ffffff fz_24" v-for="(item,index) of dmList" @click="showDdm(item.ID)">{{item.Title}}<i></i></p>-->
          <p class="fC1 main_color_ffffff fz_24">{{dmCon}}</p>
        </div>
      </transition>

      <!-- 认证通知DM弹窗 e -->

      <!-- bz机器人 s -->
      <!-- <div
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
      </div>-->
      <!-- bz机器人 e -->
    </div>
    <!-- 内容可视区域 e -->

    <!-- 我推荐 -->
    <!--<a class="pcBtn2 bs_bb dis_bl" v-if="!nowPage">
            <i></i>
            我推荐
    </a>-->

    <!-- 服务通告（上下链服务） s -->
    <div :class="['index-serNote','clear',isShowServiceTrans?'active':'']" v-if="!nowPage">
      <p class="index-serNote-title fl" @click="openServiceTrans(1)">
        <span>我</span>
        <span>要</span>
        <span>认</span>
        <span>证</span>
        <span>开</span>
        <span>通</span>
        <i class="iconfont">&#xe601;</i>
      </p>
      <div class="index-serNote-con fr">
        <p class="index-serNote-con-title clear" @click="openServiceTrans(0)">
          <i class="iconfont fl p_l_20 p_r_20 main_color_ffffff">&#xe602;</i>
          认证开通上下链服务
        </p>
        <p class="index-serNote-con-word main_color_ffffff">
          1、认证您的企业，可面向几
          千万企业资源匹配推荐。图谱触控式可视化，一眼揽括企业上下游企业商机资源，即见即可得，总揽数据全局。
          <br />2、上下链每天新发布几万条全网采购信息，免费订阅即可获得平台精准匹配推送到关注公众号的手机微信。
          <br />3、上下链提供AI系统辅助算法，可进行精准短信触客、分发触客。
          <br />4、企业可发布企业各种采购需求，精准推荐到供应商家。
          <br />5、提供图谱触控式CRM，建立客户漏斗模型，形成营销资源链圈。
          <br />6、邀请同事同步管理，企业AI营销渠道组织重构。
          <br />
          <!-- 7、邀请同事同步管理，企业AI营销重构。 -->
        </p>
        <div class="index-serNote-con-btn">
          <a class="dis_bl main_bgcolor_ff8800 main_color_ffffff" @click="authen">我要认证开通</a>
          <!-- <a
            class="dis_bl main_bgcolor_ffffff"
            @click="searchFromBtn"
          ><i class="iconfont">&#xe600;</i>搜我的企业</a>-->
        </div>
      </div>
    </div>
    <!-- 服务通告（上下链服务） e -->

    <!-- 各省份详情弹窗 s -->
    <div class="provinceOfCompany" v-if="isShowSearchBox" v-cloak>
      <div class="provinceOfCompany-title clear">
        <p class="fl">汽车销售企业</p>
        <p class="fr">
          <i class="iconfont">&#xea29;</i>换一批
        </p>
      </div>
      <div class="provinceOfCompany-con">
        <div class="provinceOfCompany-con-fn">
          <span>共家企业</span>
          <a>精确检索</a>
        </div>
        <div class="provinceOfCompany-con-res" ref="proDetail">
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
            <div class="provinceOfCompany-con-btn-sec" @click="isShowSearchBox=false">
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

    <div v-if="isSubscribe==0" @click="bus.$emit('isFollow',true)" class="follow-block">
      <div class="follow-content">
        <div class="follow-icon iconfont">&#xe650;</div>
        <div class="follow-text">关注</div>
        <div class="follow-text">公众号</div>
      </div>
    </div>

    <!-- <div
      v-if="followQrcodeState"
      class="follow-qrcode"
    >
      <div class="follow-mask"></div>
      <div class="qrcode-block">
        <img
          @click="followQrcodeState = false"
          class="close"
          src="./../../assets/icon/11.png"
          alt=""
        >
        <img
          class="qrcode-img"
          src="./../../assets/icon/followQrcode.jpg"
          alt=""
        >
        <div class="follow-des">长按二维码，关注上下链！</div>
      </div>
    </div>-->

    <div class="user-center" @click="routeUser">
      <div class="iconfont">&#xe640; 用户中心</div>
      <!-- <span></span> -->
    </div>

    <transition>
      <div class="recommendPop" v-show="recommendPop.isShow">
        <div class="mask"></div>
        <div class="text">{{recommendPop.text}}</div>
      </div>
    </transition>

    <!-- 底部 -->
    <!-- <index-footer :pos="pos"></index-footer> -->

    <!-- 弹窗 -->
    <aut-config v-if="false" />

    <!--  -->
    <template v-if="loadPop">
      <!-- 目前只有只有 基本信息 股东信息 主要人员信息有数据 其余的暂无数据 -->
      <!-- 基本信息 s-->
      <base-info></base-info>
      <!-- 基本信息 e-->

      <!-- 股东信息 s-->
      <!-- <shareholder-info></shareholder-info> -->
      <!-- 股东信息 e-->

      <!-- 主要人员信息 s-->
      <!-- <key-person></key-person> -->
      <!-- 主要人员信息 e-->

      <!-- 对外投资 s -->
      <!-- <foreign-investment></foreign-investment> -->
      <!-- 对外投资 e -->

      <!-- 企业认证提示 s -->
      <!-- <set-enterprise-tips></set-enterprise-tips> -->
      <!-- 企业认证提示 e -->

      <!-- 设置企业认证 s -->
      <!-- <set-enterprise></set-enterprise> -->
      <!-- 设置企业认证 e -->
      <!-- <BaseInfo_dwtz />
        <BaseInfo_cgxq />
        <BaseInfo_zycp />
        <BaseInfo_swxy />
        <BaseInfo_sbxx />
        <BaseInfo_zlxx />
        <BaseInfo_zsxx />
        <BaseInfo_zpzzq />
      <BaseInfo_rjzzq />-->

      <CompanyList />
      <!-- 企业列表 -->
      <push-msg />
      <!-- 推送短信 -->
      <TemplateList />
      <!-- 模板列表 -->
      <selectTemType />
      <SelectTem />
      <MsgTemplate />
    </template>

    <!-- 用于弹窗展示 -->
    <!-- <router-view class="pop-router" ></router-view> -->
    <!-- 用于弹窗展示 -->
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from "axios";
import IndexWrapperItem from "../../components/shangLian/IndexWrapperItem";
import SearchBoxItem from "../../components/shangLian/SearchBoxItem"; //搜索框
// import CreateFooterItem from '../../components/common/CreateFooterItem'
// import ChartItem from "../../components/shangLian/ChartItem";
import NewChart from "@/components/shangLian/TestItem";

import AutConfig from "@/components/shangLian/autPop/AutConfig"; //企业认证

import commonFn from "@/assets/js/commonFn"; //公共方法
import ComPop from "@/components/common/ComPop";

// popManagement s
import SearchCompany from "@/components/pop/lianQuan/SearchCompany";
import CompanyList from "@/components/pop/shanglian/CompanyList"; // 上下链点击后显示的弹窗
import CompanySetting from "@/components/pop/companySetting/CompanySetting";
import CompanyContact from "@/components/pop/companySetting/CompanyContact";
import TemplateList from "@/components/pop/pushTemplate/TemplateList";
import MsgTemplate from "@/components/pop/pushTemplate/MsgTemplate";
import EditMsgTemplate from "@/components/pop/pushTemplate/EditMsgTemplate";
import VideoTemplate from "@/components/pop/pushTemplate/VideoTemplate";
import SelfInfoPop from "@/components/pop/selfPic/InfoPop";
import ManageBtn from "@/components/pop/manageBtn/ManageBtn";
import Utils from "../../utils";

import GroupManage from "@/components/pop/manageBtn/GroupManage";
// 基本信息
const BaseInfo = resolve => {
  import("@/components/shangLian/dimenPop/BaseInfo").then(module => {
    resolve(module);
  });
};
/*
  // 主按钮弹窗s
  const BaseInfo_rjzzq = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_rjzzq").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_zpzzq = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_zpzzq").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_zsxx = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_zsxx").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_zlxx = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_zlxx").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_sbxx = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_sbxx").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_swxy = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_swxy").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_zycp = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_zycp").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_cgxq = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_cgxq").then(module => {
      resolve(module);
    });
  };
  const BaseInfo_dwtz = resolve => {
    import("@/components/shangLian/dimenPop/BaseInfo_dwtz").then(module => {
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
*/
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
// 主按钮弹窗e
import selectTemType from "@/components/pop/pushTemplate/selectTemType";
import SelectTem from "@/components/pop/pushTemplate/SelectTem";
import PushMsg from "@/components/pop/pushMsgVideo/PushMsg";
// import TemplateList from '@/components/pop/pushTemplate/TemplateList';

// popManagement e

let vm = null;
export default {
  components: {
    "index-wrapper": IndexWrapperItem,
    "index-search": SearchBoxItem, //搜索框
    // "index-footer": CreateFooterItem,
    // "index-chart": ChartItem, //图表
    NewChart,
    "aut-config": AutConfig, //认证

    // pop s
    BaseInfo, //基本信息弹窗
    /*
      ShareholderInfo, //股东信息弹窗
      KeyPerson, //主要人员信息
      ForeignInvestment, //对外投资
      SetEnterpriseTips, //企业认证
      SetEnterprise, //设置企业认证
      BaseInfo_dwtz,
      BaseInfo_cgxq,
      BaseInfo_zycp,
      BaseInfo_swxy,
      BaseInfo_sbxx,
      BaseInfo_zlxx,
      BaseInfo_zsxx,
      BaseInfo_zpzzq,
      BaseInfo_rjzzq,
    */

    CompanyList, // 公司列表 （显示各省份的数据）

    PushMsg,
    selectTemType,
    SelectTem,
    TemplateList,
    MsgTemplate
    // pop e
  },

  data() {
    //  mainProBtn: mainProBtn,
    return {
      isSubscribe: 1,
      // followQrcodeState: false,

      // dm定时器清除专用
      t1: null,
      t2: null,
      timeoutState: true,

      loadPop: true,
      fatherCall: {
        isShow: true,
        isFull: false
      },
      dmCon: "", //弹窗内容存储

      isShowDm: false, //是否显示认证通知DM弹窗

      timer1: null,
      timer2: null,
      timer3: null,
      dmSetTime1: null,
      dmSetTime2: null,

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

  // 页面被销毁前
  beforeDestroy() {
    this.timeoutState = false;
    let t1 = this.t1;
    let t2 = this.t2;
    clearTimeout(t1);
    clearTimeout(t2);
  },

  async beforeCreate() {
    //第一次到访提示 s
    let flag = await this.$commonFn.isFirstVisit(
      this.$api.isShowTips,
      '企业客库'
    );
    if (flag) {
      this.$router.push({
        path: "tipmain",
        query: { num: [1], originUrl: this.$route.fullPath } //1是第1张图片
      });
    }
    //第一次到访提示 e
  },

  created() {
    /*
     * 模拟用户登录
     * 获取登录信息
     */
    this.$store.commit('isloading',true);
    var _this = this;

    this.posterActivity();
    this.invLetterActivity();
    this.isFollow();
  },
  mounted() {
    // this.dmFn();
  },

  methods: {
    // async isFirstVisit() {},
    async isFollow() {
      let { token } = this.$store.state.loginInfo.userInfo;
      let otherUserInfo = await this.$axios
        .get(this.$api.otherUserInfo, {
          params: {
            token
          }
        })
        .then(res => res.data);
      let subscribe = otherUserInfo.subscribe;
      this.isSubscribe = subscribe;
    },

    async invLetterActivity() {
      let isTake = localStorage.getItem("invLetterActivity");
      if (isTake == "true") {
        return;
      }

      let { linkPop, share_user, custom_field } = this.$route.query;
      const qs = [linkPop, share_user];

      if (qs.indexOf(undefined) !== -1) {
        return;
      }
      if (linkPop !== "InvLetter") {
        return;
      }
      let userId = this.$store.state.loginInfo.userInfo.user_id;
      userId = +userId;
      share_user = +share_user;
      if (share_user == userId) {
        return;
      }
      let posterReturn = await this.$axios
        .post(this.$api.invLetterActivity, {
          new_user: userId,
          share_user: share_user,
          custom_field: custom_field || undefined,
          type: "邀请函"
        })
        .then(res => {
          localStorage.setItem("invLetterActivity", "true");
        });
    },

    async posterActivity() {
      let isTake = localStorage.getItem("posterActivity");
      if (isTake == "true") {
        return;
      }
      let {
        linkPop,
        authCompany: companyName,
        authCompanyId: enterpriseid,
        share_user
      } = this.$route.query;
      // localStorage.getItem()
      // localStorage.setItem()
      const qs = [linkPop, companyName, enterpriseid, share_user];

      if (qs.indexOf(undefined) !== -1) {
        return;
      }
      if (linkPop !== "poster") {
        return;
      }

      let userId = this.$store.state.loginInfo.userInfo.user_id;
      userId = +userId;
      share_user = +share_user;
      if (share_user == userId) {
        return;
      }
      let posterReturn = await this.$axios
        .post(this.$api.posterActivity, {
          company_id: enterpriseid,
          company_name: companyName,
          new_user: userId,
          share_user: share_user,
          type: "海报"
        })
        .then(res => {
          localStorage.setItem("posterActivity", "true");
        });
    },

    besideBtnSearch(toNum) {
      let routeName = "";
      if (toNum == 0) {
        routeName = "searchCompany";
      } else {
        routeName = "searchGlobal";
      }
      this.$router.push({
        name: routeName
      });
    },

    routeUser() {
      this.$router.push({
        name: "userCenter"
      });
    },

    //pin START=============
    authen() {
      let authority = true;
      let authComInfo = this.$store.state.company.authComInfo;
      console.log(authComInfo);
      let { status } = authComInfo;

      if (!status) {
        this.$router.push("autConfig");
      } else {
        this.$toast({
          message: "您已有认证企业"
        });
      }
      // this.$store.commit("showPop", "AutConfig");
    },

    //pin END============

    // 我推荐按钮
    recommend() {
      console.log("recommendrecommend");
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
    async dmFn() {
      /*
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
        */
      let newAxios = axios.create();
      let { enterprise } = await newAxios
        .get(this.$api.randomCompany)
        .then(res => res.data)
        .catch(rej => {
          // console.clear();
          // console.log(rej);
          return rej;
        });
      // console.clear()
      // console.log(enterprise);
      
      let word =
        enterprise.length > 12 ? enterprise.slice(0, 16) + "..." : enterprise;
      this.dmCon = word + "完成提交认证";
      this.isShowDm = true;
      //  this.timer2 = setTimeout(()=>{
      this.dmSetTime1 = setTimeout(() => {
        this.isShowDm = false;
        this.dmSetTime2 = setTimeout(() => {
          this.dmFn();
        }, 8000);
      }, 6000);
    },

    // 上下链服务弹窗开关
    openServiceTrans(n) {
      this.isShowServiceTrans = n === 1 ? true : false;
    },

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
  activated() {
    this.dmFn();
  },
  deactivated() {
    clearTimeout(this.dmSetTime1._id);
    clearTimeout(this.dmSetTime2._id);
    clearTimeout(this.dmSetTime1);
    clearTimeout(this.dmSetTime2);
  },

  beforeDestroy() {
    clearTimeout(this.dmSetTime1._id);
    clearTimeout(this.dmSetTime2._id);
    clearTimeout(this.dmSetTime1);
    clearTimeout(this.dmSetTime2);
  }
};
</script>

<style lang="scss" scoped>
  
  .pop-router{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    z-index:999;
    // background: rgba(0, 0, 0, 0.25);
  }

  @mixin fullScreen{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

  }
  .follow-qrcode{
    @include fullScreen;

    .follow-mask{
      // @include fullScreen;
      width: 100%;
      height: 100%;
      background: #00000080;

    }

    .qrcode-block{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 60%;

    }

    .close{
      position: absolute;
      right: 0;
      bottom: 100%;
      transform: translate( 50% , -50%);
      width: 0.6rem;
      height: auto;

    }
    .qrcode-img{
      width: 100%;
      height: auto;

    }

    .follow-des{
      color:white;
      font-size: 0.26rem;
      text-align: center;
    }


  }

  .follow-block{
    $green:#00bb57;
      position: fixed;
      left: 0.3rem;
      bottom: 30%;
      width: 1rem;
      height: 1rem;
      background: white;
      // overflow: hidden;
      // border: 0.2rem solid $green;
      border-radius: 50%;


    .follow-content{
      position: absolute;
      border: 0.1rem solid #05773bb8;
      box-shadow: 0 0 0 0.1rem  #00bb5754;
      top: -0.1rem;
      left: -0.1rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      
      .follow-icon{
        text-align: center;
        color:$green;
        font-size: 0.4rem;
        line-height: 1.2;

      }
      .follow-text{
        font-size: 0.2rem;
        line-height: 1.1;
        text-align: center;

      }
    }

  }

  .user-center{
    $height:0.6rem;
    position:absolute;
    right:0;
    bottom:1.2rem;
    width: 0.25rem * 7;
    height:$height;
    font-size: 0.18rem ;
    line-height: $height;
    color:white;
    text-align: left;
    padding-left:0.25rem;

    border-radius:$height/2 0 0 $height/2;

    background:#09a2a3;
    
  }
  .m-beside_btn_g{
    
    position: absolute;
    left: 0;
    top: 1rem;
    width: 0.6rem;
    box-sizing: border-box;
    font-size: 0.3rem;

    color:white;
    z-index:1;

    @mixin besideBtn{
      background: #333333;
      padding: 0.1rem;
      border-radius: 0 8px 8px 0;
      // font-family: 'STHeiti';
      // font-weight: bold;
     
    }
    
    .beside_btn_icon{
      font-size: 0.36rem;
    }
    
    .u-search_company{
      @include besideBtn;
      margin-bottom: 10px;

      // background-image: url('../../assets/icon/searchCompany.png');
    }

    .u-global_search{
      @include besideBtn;
      // background-image: url('../../assets/icon/globalSearch.png');
    }

  }

  

</style>