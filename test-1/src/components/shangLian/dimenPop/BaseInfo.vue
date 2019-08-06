<template>
  <!-- gs- 工商信息 s -->
  <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
  <com-pop my-index="dimen-1" @comPopShow="comPopShowState" :share-func="share">
    <!-- @close="maskShow(item)" -->
    <template v-slot:pop-content>
      <!-- 这里是中间内容插槽 -->
      <!-- main-header s -->
      <com-head></com-head>
      <!-- main-header e -->

      <!-- gs-info s -->
      <com-content-layout
        :get-info-list="infoList"
        get-info-title="工商信息"
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

import {commonFnMixin} from '@/assets/js/mixins.js'

export default {
  name:'BaseInfo',
  mixins:[commonFnMixin],
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
      infoList: [],
      comIndexInfo: {} //保存watch store中的indexInfo后传值
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

    // 分享
    share(){
      console.log('we are share pop');
      let userName = this.$store.state.loginInfo.userInfo.username,
          companyName = this.infoList[0]['企业名称'],
          str = `${userName}分享${companyName}基本信息`;
      // let str = ``;
      console.log(userName,this.comIndexInfo);
      console.log(this.infoList);
      console.log(str);
      let {enterpriseid,industryid} = this.comIndexInfo;
      this.$router.push({
        path:this.$route.path,
        query:{
          enterpriseid,
          enterprise:companyName,
          industryid,
        }
      })
      this.$store.commit("setShareInfo",{
        title: str
      });
      this.$store.commit("setFriendNetInfo",{
        title: str
      });
      
    },
    comPopShowState(isShow){
      
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
        let {
          enterpriseid,enterprise,companyName,industryid
        } = this.comIndexInfo;

        this.getInfo(enterpriseid,enterprise||companyName,industryid);
      }
      
    },
    // 用于获取接口信息 请求接口获取数据后将数据注入到模板中
    getInfo(companyId,companyName,industryId) {
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
          
          let message = result.message
          if(message){
            console.log(message)
            this.$toast({
              message
            })
            return;
          }
          console.log(`===result====`,result);
          let res = result.data.basic[0];

          // res.established_time = new Date(res.established_time)
          //   .toLocaleDateString()
          //   .replace(/\//g, "-");
          res.established_time = this.$commonFn.formatTime(new Date(res.established_time),1);

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
              }
            ];
            
            this.$store.commit("detailInfo", Object.assign(infoList[0],{isAuth:result.data.states}));
            
            this.$set(this, "infoList", infoList);
            return result
          }
        }).catch(rej=>{
          console.log('get info rej ',rej)
        })
      //===py后台end======
      //   this.$axios
      //     .post(this.$api.SelectDimDetial, {
      //       PageIndex: 1,
      //       PageSize: 30,
      //       Where: [
      //         {
      //           name: "id", //企业维度标题ID
      //           value: "1" //对应值 （上方） //1 基本信息
      //         },
      //         {
      //           name: "enterpriseid", //企业维度对应的链接ID
      //           value: this.$store.state.loginInfo.showingCId

      //           // "value": this.$commonFn.handleStroage.getLocalStorage('userInfo').hidBidsCompanyID // 企业ID
      //         }
      //       ]
      //     })
      //     .then(res => {
      //       // 获得数据company 其中 该函数已将已处理的数据导入至data中
      //       let company = this.$commonFn.comHeadTrans.call(this, res);

      //       // entIndustinfo 基本信息
      //       let entIndustinfo = res.data.Result.rows.entIndustinfo[0];

      //       let infoList = [
      //         {
      //           企业名称: company.Name || "未知",
      //           统一社会信用代码: entIndustinfo.Code || "未知",
      //           注册资本: entIndustinfo.Capital / 10000 + "万元" || "未知",
      //           经营状态: entIndustinfo.OperaState || "未知",
      //           法定代表人: entIndustinfo.LegalReprese || "未知",
      //           登记机关: entIndustinfo.Registration || "未知",
      //           成立日期: company.CreationTime || "未知",
      //           类型: entIndustinfo.ComparryType || "未知",
      //           所属行业: entIndustinfo.BLindustry || "未知",
      //           人员规模: entIndustinfo.StaffSize || "未知",
      //           电话: entIndustinfo.Phone || "未知",
      //           邮箱: entIndustinfo.Email || "未知",
      //           官网: entIndustinfo.Website || "未知",
      //           企业地址: entIndustinfo.EnAddress || "未知",
      //           经营范围: entIndustinfo.Scope || "未知"
      //         }
      //       ];
      //       this.$set(this, "infoList", infoList);
      //     })
      //     .catch(rej => {
      //       console.log(rej);
      //     });
    }
  }
};
</script>


