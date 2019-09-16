<template>
  <!-- gs- 工商信息 s -->
  <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
  <com-pop my-index="dimen-1" @comPopShow="comPopShowState" :share-func="share">
    <!-- @close="maskShow(item)" -->
    <template v-slot:pop-content>
      <!-- 这里是中间内容插槽 -->
      <!-- main-header s -->
      <com-head :detailInfo="detailInfo"></com-head>
      <!-- main-header e -->

      <!-- gs-info s -->
      <com-content-layout :get-info-list="infoList" get-info-title="工商信息" my-index></com-content-layout>
      <!-- gs-info e -->
      <ul v-show="popShowState" class="link_group">
        <template v-for="(linkBtn,index) in linkBtnList">
          <li
            @click="linkTo(linkBtn.linkTo)"
            v-if=" linkBtnList.length-1 !== index "
            :key="linkBtn.text"
            class="link_item"
          >{{linkBtn.text}}</li>
        </template>
        <li
          @click="linkTo(linkBtnList[linkBtnList.length-1].linkTo)"
          :key="linkBtnList[linkBtnList.length-1].text"
          class="link_item link_item_last"
        >{{linkBtnList[linkBtnList.length-1].text}}</li>
      </ul>
      <LabelShow :labelShow="labelShow" :companyInfo="chooseCompany" />
    </template>

    <template v-slot:flex-left>
      <!-- <com-foot @fs="fullScreen(item)"> -->
      <!-- </com-foot> -->
    </template>
    <template v-slot:flex-right></template>
  </com-pop>
  <!-- 工商信息 e -->
</template>

<script>
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
import LabelShow from "@/components/pop/shanglian/LabelShow";

import { commonFnMixin } from "@/assets/js/mixins.js";

export default {
  name: "BaseInfo",
  mixins: [commonFnMixin],
  props: {
    cID: "",
    industryid: ""
  },
  components: {
    ComPop,
    ComHead,
    ComContentLayout,
    LabelShow
  },

  data() {
    return {
      infoList: [],
      comIndexInfo: {}, //保存watch store中的indexInfo后传值
      detailInfo: {},
      linkBtnList: [
        // {
        //   text: "图文动态",
        //   linkTo: "/special"
        // },
        {
          text: "每天海报",
          linkTo: "poster"
        },
        {
          text: "企 业自画像",
          linkTo: "myDraw"
        }
      ],

      labelShow: {
        isShow: false
      },

      chooseCompany: {
        companyName: "",
        companyTags: [],
        enterprisesid: "",
        industryid: 0
      },

      popShowState: false
    };
  },
  created() {
    // this.getInfo();
  },

  watch: {
    // 当我的showingCId 发生改变时 重新调用接口信息
    "$store.state.pop.showingCId": {
      handler(a) {}
    },

    //在被初始化时，监听store.state.company.indexInfo 中有信息则 请求接口获取数据并将数据注入到模板中
    "$store.state.company.indexInfo": {
      handler(a) {
        /*
        if(isShow){
        let params = this.$store.state.pop.params;
        let {
          chooseInfo
        }= params;
        console.log(chooseInfo)
        if(chooseInfo){
          this.comIndexInfo = chooseInfo;
        }else{
          this.comIndexInfo = this.$store.state.company.indexInfo;
        }
       }
        */
        // this.comIndexInfo = this.$store.state.company.indexInfo;
        // this.getInfo();
      }
    }
  },

  methods: {
    linkTo(linkPath) {
      let {
        enterprise: companyName,
        kind,
        enterpriseid: enterprisesid,
        industryid
      } = this.$store.state.company.indexInfo;
      switch (linkPath) {
        case "poster":
          let chooseCompany = {
            companyName,
            companyTags: kind,
            enterprisesid,
            industryid
          };

          this.$router.push({
            name: linkPath,
            params: chooseCompany
          });

          break;

        case "/chuke-msg":
          this.$router.push({
            path: linkPath
          });
          break;
        case "/special":
          this.$router.push({
            path: linkPath
          });
          break;

        case false:
          this.$toast("此功能暂未开放，敬请期待");
          break;

        case "myDraw":
          this.chooseCompany = {
            companyName,
            companyTags: kind,
            enterprisesid: enterprisesid,
            industryid: industryid
          };

          this.labelShow.isShow = true;
          // this.bus.$emit('labelShowCall', enterprisesid,companyName,industryid );
          break;
      }
    },

    // 分享
    share() {
      console.log("we are share pop");
      let userName = this.$store.state.loginInfo.userInfo.username,
        companyName = this.infoList[0]["企业名称"],
        str = `${userName}分享${companyName}基本信息`;
      // let str = ``;
      console.log(userName, this.comIndexInfo);
      console.log(this.infoList);
      console.log(str);
      let { enterpriseid, industryid } = this.comIndexInfo;
      this.$router.push({
        path: this.$route.path,
        query: {
          enterpriseid,
          enterprise: companyName,
          industryid
        }
      });
      this.$store.commit("setShareInfo", {
        title: str
      });
      this.$store.commit("setFriendNetInfo", {
        title: str
      });
    },
    comPopShowState(isShow) {
      if (isShow) {
        this.popShowState = true;
        let params = this.$store.state.pop.params;
        let { chooseInfo } = params;
        console.log(chooseInfo);
        if (chooseInfo) {
          this.comIndexInfo = chooseInfo;
        } else {
          this.comIndexInfo = this.$store.state.company.indexInfo;
        }
        let {
          enterpriseid,
          enterprise,
          companyName,
          industryid
        } = this.comIndexInfo;

        this.getInfo(enterpriseid, enterprise || companyName, industryid);
      } else {
        this.popShowState = false;
      }
    },
    // 用于获取接口信息 请求接口获取数据后将数据注入到模板中
    getInfo(companyId, companyName, industryId) {
      // console.clear();
      // console.log(this.comIndexInfo);

      return this.$axios
        .get(`${this.$api.comInfo}`, {
          params: {
            enterpriseid: companyName,
            industryid: industryId
          }
        })
        .then(result => {
          let message = result.message;
          if (message) {
            console.log(message);
            this.$toast({
              message
            });
            return;
          }
          let res = result.data.basic[0];

          //保存搜索的企业信息。（法人，资产等）
          let tem = Object.assign(res, {
            isAuth: result.data.states //该公司是否认证
          });
          localStorage.setItem("com-detailInfo", JSON.stringify(tem));

          res.established_time = this.$commonFn.formatTime(
            new Date(res.established_time),
            1
          );

          if (result.data.code === 0) {
            let infoList = [
              {
                企业名称: res.company_name || "未知",
                统一社会信用代码: res.unified_social_credit_code || "未知",
                注册资本: res.registered_capital || "未知",
                经营状态: res.status || "未知",
                法定代表人: res.legal_representative || "未知",
                登记机关: res.registration_authority || "未知",
                成立日期: res.established_time || "未知",
                类型: res.type_of_enterprise || "未知",
                所属行业: res.industry_involved || "未知",
                人员规模: res.staff_size || "未知",
                电话: res.phone || "未知",
                邮箱: res.mailbox || "未知",
                官网: res.official_website || "未知",
                企业地址: res.business_address || "未知",
                经营范围: res.business_scope || "未知",
                company_id: res.company_id,
                industriesid: res.industriesid
              }
            ];

            this.detailInfo = Object.assign(infoList[0], {
              isAuth: result.data.states //该公司是否认证
            });

            this.$store.commit("detailInfo", this.detailInfo);

            this.$set(this, "infoList", infoList);
            return result;
          }
        })
        .catch(rej => {
          console.log("get info rej ", rej);
        });
    }
  }
};
</script>

<style lang="scss">
  .link_group{
      position: fixed;
      z-index: 1;
      right:0.2rem;
      bottom:1.4rem;
      width: 1rem;
      
      color:white;
      background: transparent;


      .link_item{
          box-sizing: border-box;
          padding: 0.16rem;
          margin-bottom: 0.1rem;

          font-family:"微软雅黑";
          letter-spacing:0.046rem;
          line-height: 0.34rem;
          vertical-align: middle;
          text-align: center;
          font-size: 0.22rem;
          width:1rem;
          height:1rem;
          
          border-radius: 50%;
          background: #08a2a3;
          
          &.link_item_last{
              padding: 0.1rem;
              line-height: 0.36rem;
          }
      }
  }
</style>


