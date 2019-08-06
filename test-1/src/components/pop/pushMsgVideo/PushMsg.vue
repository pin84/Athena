<template>
  <com-pop
    @comPopShow="comPopIsShow"
    :my-index="'pushMsg'"
  >

    <template v-slot:pop-content>
      <div class="con-title">推送短信</div>
      <form class="con-content sms-push">
        <div class="sms-companylist">
          <ul class="list">
            <li
              v-for="(item,index) in hasPhoneCompanyList"
              :key="item.id"
              class="list-item signalLine"
            >{{index+1}}、{{item.enterprises}} [{{item.mobile}}]</li>
          </ul>
          <div class="count">
            <div>
             共{{companyCount}}家公司 包含{{hasPhoneCountNum}}个手机号码
            </div>
          </div>
        </div>

        <!-- 模板名称 -->
        <div
          @click="chooseTemplate"
          class="con-group con-single sms-choose"
        >
          <div class="con-name">选择短信内容模板</div>
          <div class="template">{{getTem.template_name}} ></div>
        </div>

        <!-- 输入内容 -->
        <textarea
          disabled
          class="con-group con-single sms-textarea abc"
          name=""
          :value="getTem.content"
        >
          </textarea>

        <div class="con-group con-single sms-phonearea">
          <div class="con-name sms-phonedes">插入我的号码体验</div>
          <input
            type="number"
            v-model="smspush.phone"
            placeholder="请输入号码"
            name=""
            class="con-val sms-phone"
          />
        </div>
      </form>
    </template>

    <!-- 按钮插槽 s -->
    <template v-slot:flex-left>
      <!-- <div class="m-item">
          <span class="item-text">暂存</span>
        </div> -->
    </template>
    <template v-slot:flex-right>
      <foot-btn>
        <div
          class="radiusBtn"
          @click="send"
        >
          发送
        </div>
      </foot-btn>
    </template>
    <!-- 按钮插槽 e -->
  </com-pop>
</template>

<script>
const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};

const FootBtn = resolve => {
  import("@/components/common/FootBtn").then(module => {
    resolve(module);
  });
};

export default {
  data() {
    return {
      userInfo: this.$store.state.loginInfo.userInfo,
      smspush: {
        phone: ""
      },
      getTem: {
        content: "",
        data_time: "",
        id: 0,
        sms_type: "",
        template_name: "请选择模板",
        user: ""
      },

      // 通过 弹窗传值获取参数 s

      hasPhoneCompanyList: {}, //
      companyCount: 0,
      hasPhoneCount: 0, //含有手机号的[企业数]
      hasPhoneCountNum:0,//含有企业的号码数
      bussiness: "",
      count_money:'',

      industryid: 0,
      provinces: "",
      logo:'',
      up_industry:'',
      sendType:'',
      companyName:'',

      // 通过 弹窗传值获取参数 e
    };
  },
  components: {
    ComPop,
    FootBtn
  },

  methods: {
    // 选择模板
    chooseTemplate() {
      this.$store.commit("showPop", {
        popName: "selectTem",
        params: {}
      });
    },

    comPopIsShow(isShow) {
      
      if (isShow) {
        let oldShow = this.$store.state.pop.oldShow;
        let showing = this.$store.state.pop.showing;
        let { saveParams } = this.$store.state.pop.params;

        // saveParams用于保存参数不被修改 (但如果强行修改也会被篡改！)
        // if (saveParams == true && oldShow == "CompanyList") {
          
        //   this.handlerData();
        // }
        // //如果是触客模块的，走这里
        // if (saveParams == true && showing == "pushMsg" ) {
        //   console.log(`=======`, "check");
        //   this.handlerData();
        // }

        // 用于获取模板信息
        // else
        if (saveParams == true && oldShow == "selectTem") {
          let { getTem } = this.$store.state.pop.params;
          this.getTem = getTem;
        }else {
          // 获取数据
          this.handlerData();
        }
      }
    },

    // 获取对应数据
    async handlerData() {
      let {
        // companyList, //不经筛选的公司信息
        companyCount, //不经筛选的公司信息总数
        freshOtherFunc,
        hasPhoneCount, //经筛选的公司信息
        hasPhoneCompanyList, //经筛选的公司信息总数
        bussiness, //搜索主营业务范围 即精准搜索的搜索范围
        industryName,

        //从CompanyList / Chuke-msg 传入进来 s
        industryid, 
        provinces,
        logo,
        up_industry,
        sendType,

        //从CompanyList / Chuke-msg 传入进来 e
      } = this.$store.state.pop.params;
      
      this.getTem = {};
      this.hasPhoneCompanyList = hasPhoneCompanyList;
      this.companyCount = companyCount;
      this.hasPhoneCount = hasPhoneCount;
      this.bussiness = bussiness;
      this.industryid = industryid; //从CompanyList传入进来
      this.provinces = provinces; //从CompanyList传入进来
      this.logo = logo;
      this.up_industry = up_industry;
      this.sendType = sendType;
      // 要发送短信（用户已认证）的公司
      this.companyName = this.$store.state.company.authComInfo.enterprise


      switch(sendType){
        case "chukeMsg":
          this.chukeMsgPhoneCount(this.$store.state.pop.params);
        break;
        default:
          this.companyListMsgPhoneCount(this.$store.state.pop.params);
      }
        
    },

    // 短息触客 余额 发送手机号码数
    async chukeMsgPhoneCount({
      // companyList, //不经筛选的公司信息
        companyCount, //不经筛选的公司信息总数
        freshOtherFunc,
        hasPhoneCount, //经筛选的公司信息
        hasPhoneCompanyList, //经筛选的公司信息总数
        bussiness, //搜索主营业务范围 即精准搜索的搜索范围

        //从CompanyList / Chuke-msg 传入进来 s
        industryid, 
        provinces,
        logo,
        up_industry,
        sendType,
    }){
      let chukeMsgInfo = await this.$axios.get(this.$api.chukeMsgInfo,{
                                      params:{
                                        provinces,
                                        industryid,
                                        business:bussiness,
                                        token:this.userInfo.token,
                                      }
                                    })
                                    .then(res=>res.data)
                                    .catch(rej=>{
                                      console.log(rej)
                                      return rej;

                                    })
      
      console.warn(chukeMsgInfo);

      let {
        company_name, //公司名称
        count_money, //消费金额
        mobile_count, //发送号码数
        money, //余额
      } = chukeMsgInfo;

      this.hasPhoneCountNum = mobile_count;
      this.count_money = count_money
    },
    
    // 
    async companyListMsgPhoneCount({
      // companyList, //不经筛选的公司信息
        companyCount, //不经筛选的公司信息总数
        freshOtherFunc,
        hasPhoneCount, //经筛选的公司信息
        hasPhoneCompanyList, //经筛选的公司信息总数
        bussiness, //搜索主营业务范围 即精准搜索的搜索范围

        //从CompanyList / Chuke-msg 传入进来 s
        industryid,
        provinces,
        logo,
        up_industry,
        sendType,
    }){
      
      let balance = await this.$axios
        .get(this.$api.sendSms, {
          params: {
            provinces,
            industryid,
            bussiness,
            mobile:'',
            token: this.userInfo.token,
            logo,
            up_industry,
          }
        })
        .then(res => res)
        .catch(rej => {
          console.log(rej);
          if (rej) {
            this.$toast({
              message: "号码查询失败，请检查网络或稍后重试"
            });
          }
          return rej;
        });

      let { data } = balance;
      let {
        message, //不成功时返回提示
        count_money, //当前消费总金额
        mobile_count, //号码发送总数
        money, //当前用户余额
        company_name,
      } = data;
      console.log(data)
      if(message){
        this.$toast({
          message
        });
        return;

      }
      this.canSend = true;
      this.hasPhoneCountNum = mobile_count;
      this.count_money = count_money;

    },

    // 发送内容检查 检查短信内容 手机号码 是否认证
    sendCheck() {
      if (["", undefined, null].indexOf(this.getTem.template_name) !== -1) {
        this.$toast({
          message: "模板不能为空，请选择短信内容模板"
        });
        return false;
      }

      // 检查手机号码 手机号码可以为空
      if (
        this.smspush.phone !== "" &&
        !this.$commonFn.checkMobile(this.smspush.phone)
      ) {
        this.$toast({
          message: "手机号码格式不合法，请检查手机号码是否正确"
        });
        return false;
      }

      return true;
    },

    // 短信发送
    async send() {
      console.log("check before");
      if (!this.sendCheck()) {
        return;
      }
      
      // 短信触客分支
      if(this.sendType == 'chukeMsg'){
        this.chukeMsgSend();
        return;
      }
      
      console.log("check after");
      let { provinces, industryid, bussiness } = this;

      let mobile = this.smspush.phone;

      let balance = await this.$axios
        .get(this.$api.sendSms, {
          params: {
            provinces,
            industryid,
            bussiness,
            mobile,
            token: this.userInfo.token,
            logo: this.logo,
            up_industry: this.up_industry,
          }
        })
        .then(res => res)
        .catch(rej => {
          console.log(rej);
          if (rej) {
            this.$toast({
              message: "发送失败，请检查网络或稍后重试"
            });
          }
          return rej;
        });

      let { data } = balance;
      let {
        message, //不成功时返回提示
        count_money, //当前消费总金额
        mobile_count, //号码发送总数
        money, //当前用户余额
        company_name
      } = data;

      if (message == "没有认证企业") {
        this.$messageBox
          .confirm("短信触客需要您实名认证您的企业才能使用。")
          .then(action => {
            this.$router.push({
              path: "/autConfig"
            });
          });
      }

      if (message == "查询出错") {
        // alert('查询出错');
        this.$messageBox.confirm("查询出错");
      }

      if ([count_money, mobile_count, money, company_name].indexOf(undefined) ==-1) {
        // ↑短信消费总金额 ↑号码发送总数    ↑当前用户余额 ↑公司名称

        /**
         * 公司名称
         * 本次可发送号码数
         * 可用余额
         * 本次消费
         */
        // 余额不足

        if (money - count_money < 0) {
          
          this.lackMoneyTip({
            company_name,
            mobile_count,
            money,
            count_money,
          });
          
        } else {
          // 余额充足 发送短信

          let { data: pushSmsRes } = await this.$axios
            .post(this.$api.pushSms, {
              template_name: this.getTem.template_name,
              mobile,
              token: this.userInfo.token
            })
            .then(res => res)
            .catch(rej => {
              console.log(rej);
              if (rej) {
                this.$toast({
                  message: "支付失败，请检查网络或稍后重试"
                });
              }
              return rej;
            });

          let message = pushSmsRes.message;
          let code = pushSmsRes.code;
          console.log(pushSmsRes);
          if (code == 0) {
            this.$toast({
              message: "短信发送成功！"
            });
            let {oldShow} = this.$store.state.pop;
            // this.$store.commit('showPop',oldShow);
            // this.$store.commit('showPop',{
            //   params:{
            //     popName:showing,
            //     saveParams:true,
            //   }
            // });
            this.$store.commit('showPop',{
              params:{
                popName:'CompanyList',
                saveParams:true,
              }
            });

          }
          if (message) {
            // alert(message);
            this.$messageBox.confirm(message);
          }
        }
      }
    },
    
    // 短信发送 短息触客分支
    async chukeMsgSend(){
      
      let sendMsg = await this.$axios.post(this.$api.chukeMsgSend,{
                      token:this.userInfo.token,
                      provinces:this.provinces,
                      industryid:this.industryid,
                      business:this.bussiness,
                      template_name:this.getTem.template_name,
                      phone:this.smspush.phone,
                    }).then(res=>res.data)
                    .catch(rej=>{console.log(rej)});

      console.log(sendMsg);
      let {
        message,
        money,
        code
      } = sendMsg;
      if(message=='余额不足'){
        this.lackMoneyTip({
          company_name:this.companyName,
          mobile_count:this.hasPhoneCountNum+(this.smspush.phone?1:0),
          money,
          count_money:this.count_money,
        })
      }else if(code == 0){
        this.$toast({
          message: "短信发送成功！"
        });
        let { /*oldShow,*/ showing} = this.$store.state.pop;
        // this.$store.commit('showPop',oldShow);
        this.$store.commit('showPop',{
          popName:showing,

        })
      }

    },

    // 余额不足提醒
    lackMoneyTip({
      company_name, //公司名称
      mobile_count, //电话数
      money, //余额
      count_money, //消费金额
    }){

      this.$messageBox({
        title: "余额不足",
        showCancelButton: true,
        confirmButtonText: "去充值",
        cancelButtonText: "重新搜索",
        message: `
        公司名称: ${company_name};
        本次可发送号码数: ${mobile_count}条;
        可用余额: ${money}元;
        本次消费: ${count_money}元。
        `
      }).then(action => {
        if (action === "confirm") {
          this.$store.commit("showPop", {
            popName: "chongzhi"
          });
        }

        if (action === "cancel") {
          this.$store.commit("showPop", {
            popName: "CompanyList"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
// .abc{
//   border:1px solid red !important;
//   padding-top :0.2rem !important;
// }

</style>

