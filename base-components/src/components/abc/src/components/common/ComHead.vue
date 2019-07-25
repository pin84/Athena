<template>
  <div class="main-header">
    <div class="title">
      <div class="flex-layout line-1">
        <div class="icon"></div>
        <div class="main">
          <div class="name signalLine">
            {{company.enterprise ? company.enterprise : '未知'}}
          </div>
          <div class="flex-layout tag">
            <div class="tag-group">
              <div class="tag-state">{{company.OperaState?company.OperaState:'未知'}}</div>
              <!-- <div class="tag-oldname">曾用名</div>
              <div class="tag-new">高新技术企业</div> -->
              <div class="tag-new">{{company.isAuth?'已认证':'未认证'}}</div>
            </div>
            <div class="view">浏览:{{company.count?company.count:1}}</div>
          </div>
        </div>
      </div>
      <div class="line-2">
        <div class="info">
          <div class="info-represe">法定代表人: {{company.LegalReprese?company.LegalReprese:'末知'}}</div>
          <div class="info-ctime">成立日期: {{company.CreationTime?company.CreationTime :'末知'}}</div>
          <div class="info-capital">注册资本: {{company.Capital?company.Capital:'末知'}}</div>
        </div>

        <a
          v-if="company.Phone !== null && company.Phone !== undefined"
          class="phoneBlock"
          :href="'tel:'+company.Phone"
        >
          <i class="iconfont-mask phone">&#xe601;</i>
        </a>
        <a
          v-else
          class="phoneBlock"
        >
          <i class="iconfont-mask phone">&#xe601;</i>
        </a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // company: {
    //   type: Object,
    //   default: () => ({
    //     name: "",
    //     LegalReprese: "",
    //     CreationTime: "",
    //     Capital: ""
    //   })
    // }
  },
  data() {
    return {
      comInfo: undefined,
      company: {}
    };
  },
  watch: {
    "$store.state.company.detailInfo": {
      handler() {
        let company = this.$store.state.company.detailInfo;
        this.company = {
          enterprise: company["企业名称"],
          OperaState: company["经营状态"],
          LegalReprese: company["法定代表人"],
          CreationTime: company["成立日期"],
          Capital: company["注册资本"],
          Phone: company["电话"],
          count:this.$store.state.company.indexInfo.count,
          isAuth:company.isAuth,
        };
        console.log(`===this.company====`, this.$store.state.company.indexInfo.count);
      }
    }
  },
  created() {
    let com = this.$store.state.loginInfo;
    this.comInfo = com[0];
  }
};
</script>