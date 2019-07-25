<template>
  <!-- gs- 工商信息 s -->
  <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
  <com-pop my-index="dimen-9">
    <!-- @close="maskShow(item)" -->
    <template v-slot:pop-content>
      <!-- 这里是中间内容插槽 -->
      <!-- main-header s -->
      <com-head :company="company"></com-head>
      <!-- main-header e -->

      <!-- gs-info s -->
      <com-content-layout
        :get-info-list="infoList"
        get-info-title="软件著作权"
        my-index=""
      ></com-content-layout>
      <!-- gs-info e -->
    </template>

    <template v-slot:flex-left>
      <!-- <com-foot @fs="fullScreen(item)"> -->
      <!-- </com-foot> -->
    </template>
    <template v-slot:flex-right>
    </template>
  </com-pop>

  <!-- 工商信息 e -->
</template>

<script>
import { setTimeout } from "timers";
const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};
const ComHead = resolve => {
  import("@/components/common/ComHead").then(module => {
    resolve(module);
  });
};

const ComContentLayout = resolve => {
  import("@/components/common/ComContentLayout").then(module => {
    resolve(module);
  });
};

export default {
  props: {
    cID: "",
    industryid: ""
  },
  components: {
    ComPop,
    ComHead,
    ComContentLayout
  },

  data() {
    return {
      company: {}, //该值用于传输到com-head显示
      infoList: []
    };
  },
  created() {
    // 在被初始化 创建后请求接口获取数据并将数据注入到模板中
    this.getInfo();
    // console.log("===============", this.$store.state.loginInfo.userInfo);
  },

  watch: {
    // 当我的showingCId 发生改变时 重新调用接口信息
    "$store.state.loginInfo.showingCId": {
      handler(a) {
        this.getInfo();
      }
    }
  },

  methods: {
    // 用于获取接口信息 请求接口获取数据后将数据注入到模板中
    getInfo() {
      // this.$axios
      //   .post(this.$api.SelectDimDetial, {
      //     PageIndex: 1,
      //     PageSize: 30,
      //     Where: [
      //       {
      //         name: "id", //企业维度标题ID
      //         value: "1" //对应值 （上方） //1 基本信息
      //       },
      //       {
      //         name: "enterpriseid", //企业维度对应的链接ID
      //         value: this.$store.state.loginInfo.showingCId

      //         // "value": this.$commonFn.handleStroage.getLocalStorage('userInfo').hidBidsCompanyID // 企业ID
      //       }
      //     ]
      //   })
      //   .then(res => {
      //     // 获得数据company 其中 该函数已将已处理的数据导入至data中
      //     let company = this.$commonFn.comHeadTrans.call(this, res);

      //     // entIndustinfo 基本信息
      //     let entIndustinfo = res.data.Result.rows.entIndustinfo[0];

      //     let infoList = [
      //       {
      //         企业名称: company.Name || "未知",
      //         统一社会信用代码: entIndustinfo.Code || "未知",
      //         注册资本: entIndustinfo.Capital / 10000 + "万元" || "未知",
      //         经营状态: entIndustinfo.OperaState || "未知",
      //         法定代表人: entIndustinfo.LegalReprese || "未知",
      //         登记机关: entIndustinfo.Registration || "未知",
      //         成立日期: company.CreationTime || "未知",
      //         类型: entIndustinfo.ComparryType || "未知",
      //         所属行业: entIndustinfo.BLindustry || "未知",
      //         人员规模: entIndustinfo.StaffSize || "未知",
      //         电话: entIndustinfo.Phone || "未知",
      //         邮箱: entIndustinfo.Email || "未知",
      //         官网: entIndustinfo.Website || "未知",
      //         企业地址: entIndustinfo.EnAddress || "未知",
      //         经营范围: entIndustinfo.Scope || "未知"
      //       }
      //     ];
      //     this.company = {
      //       name: res.company_name,
      //       LegalReprese: res.company_name,
      //       CreationTime: res.established_time,
      //       Capital: res.registered_capital
      //     };
      //     this.$set(this, "infoList", infoList);
      //   })
      //   .catch(rej => {
      //     console.log(rej);
      //   });
    }
  }
};
</script>


