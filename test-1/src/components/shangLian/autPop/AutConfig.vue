<template>
  <div id="auth">
    <section class="userInfo">
      <span class="avatar">
        <img
          :src="userInfo.headimgUrl"
          alt=""
        >

      </span>
      <dl class="user-name">
        <dt>{{userInfo.username}}</dt>
        <dd v-if="comName">{{comName}}
          <span
            class="cancel"
            v-show="numComState !== 2"
          >{{comState[numComState]}}</span>
        </dd>
        <dd
          class="state"
          v-else
        >未绑定认证企业</dd>
      </dl>
    </section>

    <section class="main-body">
      <section class="business">
        <div
          class="cost"
        >
          <span>认证费用</span>
          <span>
            <span class="marker">￥</span>
            <span class="money">200元/年</span>
          </span>
        </div>
        <div class="auth-list">
          <h4 class="auth-title">开通认证企业六大特权</h4>
          <ul class="list">
            <li
              class="item"
              v-for="(item,index) in typeStr"
              :key="index"
            >
              <span class="img-box">
                <img
                  :src="require(`../../../assets/icon/shanglian/${index+1}.png`)"
                  alt=""
                >
              </span>
              <div class="auth-type">{{typeStr[index]}}</div>
            </li>
          </ul>
        </div>
      </section>

      <section class="com-info">
        <ul class="list">
          <li class="item">
            <span class="itemText"> <span class="red">*</span> 企业全称</span>
            <span>
              <SearchBoxItem
                @changeCompany='getCompany'
                @inputText='inputText'
                @searchEnter='searchEnter'
                @nameConfirm='nameConfirm'
                :waitPayMoneyComName='inputComName'
              />
            </span>
          </li>
          <template v-for="(value,key,index) in companyInfo" >
            <li
              class="item"
              @click="selectItem(value,key,index)"
              v-if="['统一社会信用代码','kind'].indexOf(key) == -1"
              :key="index"
            >
              <span class="itemText"><span class="red">*</span> {{key}}</span>
              <!-- <input
                v-if="index ==2 || index == 3"
                :type="index === 2 ? 'number' : 'text'"
                v-model="companyInfo[key]"
                class="inputText"
                :placeholder="inputPlaceholder[index]"
              > -->
              <!-- <mt-picker v-if="index ==2 || index == 3" :slots="slots" @change="onValuesChange"></mt-picker> -->
              <!-- :title="'选择'+companyInfo[key]" -->
              <!-- <mt-cell v-if="index ==1 || index == 2"  is-link>
                  <span class="select-itemstyle">
                    {{value==''?'请选择企业归属':''}}
                    {{ (value.label=='') ?'请选择企业归属':''}}{{ (value.label=='' && index == 1) ?'省份':''}}{{ (value.label=='' && index == 2) ?'行业':''}}{{ (value.label=='') ?'':value.label}}
                    {{(value==''? ('请选择企业归属' + index==1?'省份':'行业') :value )}}
                  </span>
              </mt-cell> -->
              <mt-cell
                v-if="index ==1"
                is-link
              >
                <span class="select-itemstyle">
                  {{value.label == '' || value.label == undefined ? '请选择企业归属省份' : value.label}}
                </span>
              </mt-cell>
              <mt-cell
                v-if="index ==2"
                is-link
              >
                <span class="select-itemstyle">
                  {{value.label == '' || value.label == undefined ? '请选择企业归属行业' : value.label}}
                </span>
              </mt-cell>

              <input
                v-if="index !==1 && index !== 2"
                :type="index === 2 ? 'number' : 'text'"
                v-model="companyInfo[key]"
                class="inputText"
                :placeholder="inputPlaceholder[index]"
              >
            </li>
          </template>
        </ul>
      </section>

      <section class="upload">
        <h2>上传营业执照</h2>
        <!-- <div 
        @click="chooseMsg"
        >
        上传图片
        </div> -->
        <!-- type="file"
          id="upload-input2"
          ref="sendImgTest"
          accept="image/*" -->
        <label
          for="upload-input"
          class="uploa-label"
          @click="chooseMsg"
        >
          <div
            class="upload-img"
            v-if="postImg"
          >
            <img
              :src="imgUrl"
              ref="inputImg"
            >
          </div>
          <div
            class="upload-img"
            v-else
          >
            <span class="img-bg"></span>
            <span class="text">读取本地相册或拍照</span>
          </div>
        </label>

      </section>
      <section class="pay">
        <dir class="pay-tips">
          上下链的认证审核时间为24小时内，请耐心等待
        </dir>

        <div class="pay-topay">
          <span
            class="text"
            v-show="identity_status !== 3"
          >
            <span>一年仅需 </span>
            <span class="text-mark">￥</span>
            <span class="text-num">200元</span>
          </span>
          <span
            class="btn-pay"
            @click="toPay"
            id="getBrandWCPayRequest"
          >{{identity_status === 3 ? '重新提交': '提交并支付'}}</span>
        </div>

      </section>
    </section>

    <mt-popup
      v-model="provincesVis"
      position="bottom"
      class="mint-popup"
    >
      <mt-picker
        :slots="dataListPro"
        @change="onDateChangePro"
        :visible-item-count="5"
        :show-toolbar="false"
        ref="pickerPro"
        value-key="cName"
      ></mt-picker>
    </mt-popup>
    <mt-popup
      v-model="industryVis"
      position="bottom"
      class="mint-popup"
    >
      <mt-picker
        :slots="dataListInd"
        @change="onDateChangeInd"
        :visible-item-count="5"
        :show-toolbar="false"
        ref="pickerInd"
        value-key="cName"
      ></mt-picker>
    </mt-popup>

    <!-- <div style="position:fixed;left:0;bottom:50%;z-index:100000;background:yellow;" @click="companyChangeNext">调试用 下一家公司</div> -->
    <!-- <div style="position:fixed;left:0;bottom:50%;z-index:100000" @click="timeoutPay">调试用 开启定时器</div>
    <div style="position:fixed;right:0;bottom:50%;z-index:100000" @click="clearToPay">调试用 关闭定时器</div> -->

  </div>

</template>

<script>
import SearchBoxItem from "../SearchBoxItem";
import { clearInterval } from "timers";

let vm = null;
export default {
  data() {
    return {
      comName: "", //已认证企业进入这个页面时会显示认证的企业名
      postedAvartar: "", //已保存服务器上的图片信息
      // 照片上传 读取完毕
      readerReady: false,
      timeout: false,

      provincesVis: false,
      industryVis: false,

      dataListPro: [
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "left"
        }
      ],
      dataListInd: [],

      maxSize: 2 * 1024 * 1024, //允许上传的最大图片
      imgUrl: "", //上传后显示在输入框的图片的url
      isHasUploadImg: true, //是否有上传中的图片（以显示背景或是上传的图片）
      numComState: "",
      comState: ["未认证", "待支付", "已认证", "待审核", "待提交", "取消绑定"],
      typeStr: [
        "短信触客",
        "分发触客",
        "实时采招推荐",
        "圈层营销",
        "获得推荐",
        "团队协同"
      ],
      inputPlaceholder: [
        // "请输入企业名称",
        "请输入企业信用代码",
        "",
        "",
        "请输入联系人姓名",
        "请输入联系人电话"
      ],
      companyInfo: {
        统一社会信用代码: "",
        归属省份: "",
        归属行业: "",
        联系人: "",
        联系人电话: ""
      },
      postImg: null,
      imgLocalIds: "",
      media_id: "",

      userInfo: {
        headimgUrl: "",
        token: "",
        user_id: "",
        username: ""
      },
      payData: {}, //保存支付需要的信息
      inputComName: "", //保存搜索框输入的文字

      // 地区
      area: [
        {
          id: 0,
          label: "全国"
        },
        {
          id: 1,
          label: "北京市"
        },
        {
          id: 2,
          label: "天津市"
        },
        {
          id: 9,
          label: "上海市"
        },
        {
          id: 22,
          label: "重庆市"
        },
        {
          id: 3,
          label: "河北省"
        },
        {
          id: 4,
          label: "山西省"
        },
        {
          id: 6,
          label: "辽宁省"
        },
        {
          id: 7,
          label: "吉林省"
        },
        {
          id: 8,
          label: "黑龙江省"
        },
        {
          id: 10,
          label: "江苏省"
        },
        {
          id: 11,
          label: "浙江省"
        },
        {
          id: 12,
          label: "安徽省"
        },
        {
          id: 13,
          label: "福建省"
        },
        {
          id: 14,
          label: "江西省"
        },
        {
          id: 15,
          label: "山东省"
        },
        {
          id: 16,
          label: "河南省"
        },
        {
          id: 17,
          label: "湖北省"
        },
        {
          id: 18,
          label: "湖南省"
        },
        {
          id: 19,
          label: "广东省"
        },
        {
          id: 21,
          label: "海南省"
        },
        {
          id: 23,
          label: "四川省"
        },
        {
          id: 24,
          label: "贵州省"
        },
        {
          id: 25,
          label: "云南省"
        },
        {
          id: 27,
          label: "陕西省"
        },
        {
          id: 28,
          label: "甘肃省"
        },
        {
          id: 29,
          label: "青海省"
        },
        {
          id: 32,
          label: "台湾省"
        },
        {
          id: 5,
          label: "内蒙古自治区"
        },
        {
          id: 20,
          label: "广西壮族自治区"
        },
        {
          id: 26,
          label: "西藏自治区"
        },
        {
          id: 30,
          label: "宁夏回族自治区"
        },
        {
          id: 31,
          label: "新疆维吾尔自治区"
        },
        {
          id: 33,
          label: "澳门"
        },
        {
          id: 34,
          label: "香港"
        }
      ],

      // 行业
      industryList: [],

      identity_status: "", //认证的状态
      pay_status: "", //支付的状态

      testCompanyName: [
        "公司11111111111",
        "公司22222222222",
        "公司33333333333333",
        "公司44444444444444"
      ]
    };
  },

  components: {
    SearchBoxItem
  },

  // beforeRouteEnter(to, from, next) {
  //   next(async vm => {
  //     let tokenb = vm.$store.state.loginInfo.userInfo.token;
  //     let { data } = await vm.$axios.get(`${vm.$api.userCenterInfo}`, {
  //       params: {
  //         token: tokenb
  //       }
  //     });

  //   });
  // },

  beforeCreate() {
    vm = this;
  },

  created() {
    this.userInfo = this.$store.state.loginInfo.userInfo;
    this.bus.$on("changeCompany", this.getCompany);

    this.getUserIdentityAndPayStatus();
    
  },
  beforeMount() {
    this.$axios.get(this.$api.selectArea).then(res => {
      console.log(res);
      let { data } = res;
    });

    this.$axios.get(this.$api.selectIndustry).then(res => {
      console.log(res);
      let { data } = res;
      this.industryList = data;
    });
  },

  methods: {
    async getUserIdentityAndPayStatus() {
      let res = await this.$axios.get(`${this.$api.userCenterInfo}`, {
        params: {
          token: this.userInfo.token
        }
      });

      let pay_status = res.data.pay_status;
      let status = res.data.status;

      this.comName = res.data.company_name;

      this.pay_status = pay_status;
      this.identity_status = status;

      if (pay_status === 0 && status === 0) {
        this.numComState = 0;
      }
      if (pay_status === 0 && status === 1) {
        this.numComState = 1;
      }
      if (pay_status === 1 && status === 1) {
        this.numComState = 3;
      }
      if (status === 2) {
        this.numComState = 2;
      }
      if (status === 3) {
        this.numComState = 4;
      }


      this.getUserPostInfo();
    },

    async getUserPostInfo() {
      let data = {
        token: this.userInfo.token,
        identity_status: Number(this.identity_status),
        pay_status: Number(this.pay_status)
      };

      let res = await this.$axios.get(this.$api.reCertification, {
        params: data
      });

      console.log(`===res====`, res);

      if (res.data.message === "你没有待付款的订单") {
        console.log(`===你没有待付款的订单====`);
        return;
      }

      // this.companyInfo["统一社会信用代码"] = res.data[0].code;
      // this.companyInfo["归属省份"] = { label: res.data[0].province };
      // this.companyInfo["归属行业"] = { label: res.data[0].industry };
      // this.inputComName = res.data[0].name;
      this.companyInfo["联系人"] = res.data[0].contacts;
      this.companyInfo["联系人电话"] = res.data[0].phone;
      this.postedAvartar = res.data[0].avatar;

      let company_id = res.data[0].company_id;
      let industryid = res.data[0].industryid;
      let comName = res.data[0].name;
      

      this.imgUrl = `${this.$api.companyCertPicture}?token=${this.userInfo.token}&avatar=${this.postedAvartar}`;
      this.postImg = true;

      this.getCompany(company_id, comName, industryid);

      //归属省份和归属行业不可修改
      this.noMod = true;
    },

    // async getBusiness() {},

    // 选择选项
    selectItem(value, key, index) {
      if (this.noMod) {
        return;
      }
      if (index !== 1 && index !== 2) {
        return;
      }
      // 省份
      if (index == 1) {
        this.$weui.picker(this.area, {
          className: "custom-classname",
          container: "body",
          defaultValue: [3],
          onChange: function(result) {
            console.log(result);
          },
          onConfirm: result => {
            // console.clear();
            console.log(result);
            console.log(value, key, index);
            console.log(vm.companyInfo[key]);

            // vm.companyInfo[key] = result[0].label;
            vm.companyInfo[key] = result[0];
            console.log(vm.companyInfo[key]);
          },
          id: "singleLinePicker"
        });
      }

      // 行业
      if (index == 2) {
        let industryList = this.industryList.map((ele, index) => {
          return {
            label: ele.industry,
            value: index,
            id: ele.id
          };
        });

        this.$weui.picker(industryList, {
          className: "custom-classname",
          container: "body",
          defaultValue: [3],
          onChange: function(result) {
            console.log(result);
          },
          onConfirm: result => {
            // console.clear();
            console.log(result);
            console.log(value, key, index);
            console.log(this.companyInfo[key]);

            // this.companyInfo[key] = result[0].label;
            vm.companyInfo[key] = result[0];
            console.log(this.companyInfo[key]);
          },
          id: "singleLinePicker"
        });
      }
    },

    onDateChangePro() {},

    onDateChangeInd() {},
    inputText(text) {
      //搜索框输入文字后，用这个方法传到本组件
      this.inputComName = text.searchText;

      this.companyInfo["统一社会信用代码"] = "";
      this.companyInfo["归属省份"] = "";
      this.companyInfo["归属行业"] = "";
      this.companyInfo["联系人"] = "";
      this.companyInfo["联系人电话"] = "";
    },

    searchEnter(searchWord) {
      // console.log(`===searchWord====`,searchWord);
    },

    getCompany(companyId, company_name, industriesId) {
      console.log(`====11111111===`, companyId, company_name, industriesId);

      //归属省份和归属行业不可修改
      this.noMod = true;
      this.inputComName = company_name;

      this.$axios
        .get(`${this.$api.comInfo}`, {
          params: {
            enterpriseid: company_name,
            industryid: industriesId
          }
        })
        .then(res => {
          console.log(`====aaaaa===`, res);
          let {
            // unified_social_credit_code,
            province,
            industries,
            industriesid,
            kind,
          } = res.data.basic[0];

          // this.companyInfo["统一社会信用代码"] = unified_social_credit_code;
          this.companyInfo["归属省份"] = {
            label: province
          };

          this.companyInfo["归属行业"] = {
            id: industriesid,
            label: industries
          };
          this.companyInfo.kind = kind;
          
        });
    },

    // 微信选择图片
    chooseMsg() {
      console.log("触发 chooseMsg");
      // this.$indicator.open({
      //   text:`数据 让营销者先行...`,
      // })
      this.readerReady = false;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          let core = this.$commonFn.coreJudge();
          // 上传图片至微信服务器
          this.upLoadImage(localIds);
        },
        fail: rej => {
          console.log(rej);
        },
        cancel: () => {
          // 用户取消分享后执行的回调函数
        }
      });
    },

    // 获取本地照片的base64编码
    getLocalImgData(localId) {
      let getData = new Promise(resolve => {
        wx.getLocalImgData({
          localId, // 图片的localID
          success: res => {
            let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            resolve(localData);
          }
        });
      });

      return getData;
    },

    // 上传图片至微信服务器
    upLoadImage(localIds) {
      if (localIds.length == 0) {
        alert("请先使用 chooseImage 接口选择图片");
        return;
      } else {
        wx.uploadImage({
          localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: res => {
            let serverId = res.serverId; // 返回图片的服务器端ID
            this.media_id = serverId;
            this.downloadImage(serverId);
          },
          fail: rej => {
            console.log(rej);
          }
        });
      }
    },

    downloadImage(serverId) {
      wx.downloadImage({
        serverId: serverId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          let localId = res.localId; // 返回图片下载后的本地ID
          this.postImg = true;
          this.imgUrl = localId;
        },
        fail: rej => {
          console.log(rej);
        }
      });
    },

    // getPic() {
    //   let file = this.$refs.uploadImg.files[0];
    //   if (!file) {
    //     console.log("no img");
    //     return;
    //   }
    //   this.readerReady = false;

    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = e => {
    //     let dataURL = e.target.result;
    //     this.imgUrl = dataURL;
    //     this.postImg = file;
    //     // 异步操作
    //     this.readerReady = true;
    //   };
    // },

    checkToPayInfo() {
      let condition = [
        !this.inputComName,
        // !this.companyInfo["统一社会信用代码"],
        !this.companyInfo["归属省份"],
        !this.companyInfo["归属行业"],
        !this.companyInfo["联系人"],
        !this.companyInfo["联系人电话"],
        !this.$commonFn.checkMobile(this.companyInfo["联系人电话"]),
        !this.postImg
      ];

      let tips = [
        "请输入企业全称",
        // "请输入统一社会信用代码",
        "请选择归属省份",
        "请选择归属行业",
        "请输入联系人信息",
        "请输入联系人电话",
        "手机格式不正确，请重输。",
        "请上传营业执照"
      ];

      let tipsIndex = condition.findIndex(ele => {
        console.log(ele);
        return ele == true;
      });
      if (tipsIndex !== -1) {
        this.$toast({
          message: tips[tipsIndex]
        });
        return false;
      }

      return true;
    },

    clearToPay() {
      this.timeout = false;
    },
    timeoutPay() {
      this.timeout = true;
      setInterval(() => {
        if (this.timeout) {
          this.toPay();
        }
      }, 20000);
    },
    companyChangeNext() {
      this.testCompanyName.push(this.testCompanyName.shift());
    },

    async isExistCompany(inputComName){
      let results = await this.$axios.get(this.$api.indexSearch,{
        params:{
          company_name:inputComName,
          page_size:10
        }
      }).then(res=>res.data.results)
      
      return ((results.findIndex(ele=>ele.company_name == inputComName ?true:false)) !== -1 ? true : false );

    },
    async getExistInfo(enterpriseName,industriesId){
      let {count,number} = await this.$axios.get(this.$api.searchCompany,{
        params:{
          enterpriseid:enterpriseName,
          industryid:+industriesId,
        }
      }).then(res=>res.data)
      return {
        count,
        number,
      }
    },
    async toPay() {
      if (!this.checkToPayInfo()) {
        return "fail";
      }

      let data = {
        name: this.inputComName,
        // code: this.companyInfo["统一社会信用代码"],
        kind:this.noMod?this.companyInfo.kind:undefined,
        contacts: this.companyInfo["联系人"],
        phone: this.companyInfo["联系人电话"],
        media_id: this.media_id,
        token: this.$store.state.loginInfo.userInfo.token,
        province: this.companyInfo["归属省份"].label,
        industryid: this.companyInfo["归属行业"].id,
        industry: this.companyInfo["归属行业"].label,
        avatars: this.postedAvartar!==''?this.postedAvartar:undefined,
        mysql: (this.noMod||await this.isExistCompany(this.inputComName))?'是':'否' ,
      };
      if(data.mysql=='是'){
        let { count:access, number:recommended } =  await this.getExistInfo(data.name,data.industryid);
        data.recommended = recommended; //推荐数
        data.access = access; //访问数
        
      }

      console.log(`====data===`, data);
      
      this.$axios
        .post(`${this.$api.certification}`, data)
        .then(res => {
          let code = res.data.code;
          let message = res.data.message;
          let pay_info = res.data.pay_info;
          console.log("first step res", res);
          // 该企业已经认证
          // if(message == '该企业已经认证'){
          // 提交成功 等待审核
          // code = 1;
          // if(code == 0){
          if (pay_info) {
            let sendPayData = {
              token: this.$store.state.loginInfo.userInfo.token,
              name: this.companyInfo["联系人"],
              mobile: this.companyInfo["联系人电话"]
              // industry:1,
            };
            this.payData = {
              appId: pay_info.appId,
              timeStamp: pay_info.timeStamp,
              nonceStr: pay_info.nonceStr,
              package: pay_info.package,
              signType: pay_info.signType,
              paySign: pay_info.paySign
            };

            //公众号支付
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              this.payData,
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  window.location.href = "../?#/userCenter";
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  // alert("您已取消支付");
                  this.$messageBox.confirm("您已取消支付");

                  // window.location.href = "../?#/";
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                  this.$messageBox.confirm("支付失败，请稍后再试");
                }
              }
            );
          } else if (message) {
            // this.$toast({
            //   message
            // });
            // alert(message)
            this.$messageBox.confirm(message);
          }
        })
        .catch(rej => {
          console.log("first step rej", rej);
          this.$toast({
            message: "资料提交失败，请稍再重试"
          });
          return rej;
        });
    },
    nameConfirm() {
      this.noMod = false;
    }
  },
  destroyed() {
    this.bus.$off("changeCompany");
  }
};
</script>

<style lang="stylus" scoped>

#auth
  position relative
  width 100%
  height 100%
  background-color #ccc
  font-size 0.32rem
  .userInfo
    // position fixed
    // left 0
    // right 0
    height 1.8rem
    background-color #363f48
    display flex
    align-items center
    .avatar
      display inline-block
      width 1rem
      height 1rem
      border-radius 50%
      padding 0 0.32rem
      img 
        width 100%
        height 100%
    .name-status
      display flex
      flex-direction column
      .name
        color #fff
        font-weight  600
      .status
        color #d2d2d2 
        font-size 0.24rem
    .user-name
      dt
        color #fff
        font-size 0.32rem
      dd
        font-size 0.2rem
        color #fff
        .cancel
          color black
          font-size 0.15rem
          background-color #ffffff
          padding 0.02rem  0.1rem
          border-radius 0.2rem 
        &.state
          color #d2d2d2    
  .main-body
    height 100%
    // padding  0  0 0.98rem 0   
    .business      
      height 6.4rem
      background-color #ffffff
      padding 0.2rem
      box-sizing border-box
      .cost
        height 1.4rem
        background-color #f5ccb6
        border solid 1px #dba88d
        display flex
        justify-content space-around
        align-items center
        font-size 0.32rem
        color #6d4e3e
        border-radius 0.1rem
        box-shadow 0 0 0.2rem rgba(101, 60, 39, 0.3)
        .marker
          font-size 0.2rem
        .money
          font-size 0.48rem
          font-weight 600
      .auth-list
        text-align center
        .auth-title
          padding 0.3rem 0
          font-size 0.32rem
          &::before
            content ''
            display inline-block
            width 0.28rem
            height 0.28rem
            background url(../../../assets/icon/shanglian/privil.png) center no-repeat
            background-size contain
            margin-right 0.1rem
        .list
          display flex
          flex-wrap wrap
          justify-content space-around
          .item
            width 30%
            margin-bottom 0.2rem
            .img-box
              display inline-block
              width 0.86rem
              height 0.86rem
              img
                width 100%
                height 100%
            .auth-type  
              color #333
              margin-top 0.2rem
              font-weight 800
              font-size 0.26rem
    .com-info
      width 100% 
      background-color #fff
      margin-top 0.1rem
      .list
        width 100%
        .item
          height 1.1rem
          line-height 1.1rem
          border-bottom 1px solid #f3f3f3
          padding 0 0.2rem
          box-sizing border-box
          display flex
          justify-content space-between
          .red
            color red
          .itemText  
            font-size 0.28rem
          .inputText
            width 60%
            border none

      .select-itemstyle
        font-size 0.26rem
        line-height 1.1rem
    .upload
      width 100%
      height 4rem 
      margin-top 0.1rem
      background-color #fff  
      padding 0.2rem
      box-sizing border-box
      h2  
        font-size 0.32rem
      .uploa-label
        display inline-block
        width 100%
        height 2.4rem
        border-radius 0.1rem
        margin-top 0.32rem
        background-color #f3f3f3
        display flex 
        flex-direction column
        justify-content center
        .upload-img
          width 100%
          height 100%
          display flex 
          flex-direction column
          justify-content center
          align-items center
          img
            height 100%
          .img-bg
            display inline-block
            content ''
            width 0.5rem
            height 0.5rem
            background url(../../../assets/icon/xiangji@128.png) center no-repeat
            background-size contain 
        .text 
          font-size 0.24rem
          color #666666
    .pay
      width 100% 
      border-bottom 1px solid #fff     
      .pay-tips
        width 100%
        height 1rem
        padding-bottom 1rem
        background-color #f3f3f3 
        text-align center
        line-height 1rem 
        font-size 0.24rem
        color #666
      .pay-topay
        position fixed
        bottom 0
        left 0
        height 1rem
        width 100%
        display flex
        justify-content flex-end
        z-index:5 
        background-color #fff
        .text
          display inline-block
          width 60%
          height 1rem
          background-color #fff
          line-height 1rem
          padding-left 0.5rem
          box-sizing border-box
          color #666
          .text-mark
            color #d62222
            font-size 0.28rem
          .text-num
            color #d62222
            font-size 0.48rem  
        .btn-pay
          display inline-block
          width 40%
          height 1rem
          line-height 1rem
          text-align center
          background-color #09a2a3
          color #fff 
          right 0



.index-search
  position relative !important



</style>
