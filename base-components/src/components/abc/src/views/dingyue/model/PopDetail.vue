<template>
  <div>
    <div class="ZBdetails" v-if="isShow === 'detail'">
      <div class="main_bgcolor_ffffff">
        <div class="ZBdetails-logo">采购</div>
        <div class="ZBdetails-statement">
          <div class="ZBdetails-statement-title">{{detailData.Title}}</div>
          <div class="ZBdetails-statement-details">
            <div class="ZBdetails-statement-details-left">
              <div class="ZBdetails-statement-price">
                标的金额：
                <span>{{detailData.BidsPirce === '' ? '(看详情)' : detailData.BidsPirce }}</span>
                <span>万</span>
              </div>
            </div>
            <div
              class="ZBdetails-statement-details-tag"
              :class="{bgGray:detailData.status === '1'}"
            >{{detailData.status === '1' ? '已截止' :'正在进行'}}</div>
          </div>

          <div class="p_b_20 fz_24 main_color_666666">采招单位：{{detailData.Company}}</div>
          <p class="p_b_20 fz_24 main_color_666666">
            <span class="p_r_20">公告日期：{{detailData.CreateTime}}</span>
            <span>截标日期：{{detailData.EndDate}}</span>
          </p>
        </div>
        <div style="width: 100%; height: 0.2rem; background-color: rgb(243, 243, 243);"></div>
        <div class="ZBdetails-con" v-html="content">{{content}}</div>

        <div class="ZBdetails-operator">
          <!-- <button>
            <img src="../../../assets/icon/dingyue/collect.png">
            <span class="">收藏</span>
          </button>-->
          <button class="fs" @click="fullScreen">
            <img src="../../../assets/icon/dingyue/icon-fullScreen.png" />
            <span>全屏</span>
          </button>
          <button @click="shareWithFriend">
            <img src="../../../assets/icon/dingyue/share.png" />
            <span>分享</span>
          </button>
        </div>
        <a class="wrap_close detail_close"></a>
        <section class="close" @click="closePop"></section>
      </div>
      <section class="fullScreen bs_bb p_l_20 p_r_20 p_t_20" v-if="isShowFullScreen">
        <p class="fs-fz" v-html="content">{{content}}</p>
        <div class="btn">
          <a href="javascript:;" class="btn_i">拨打号码 +</a>
          <a
            href="javascript:;"
            type="button"
            @click="closeFullScreen"
            class="btn_i closeFullScreen"
          >关闭全屏</a>
        </div>
      </section>
    </div>

    <div id="tipsToReg" class="tips-to-wrap" v-if="isShow === 'limit'">
      <i class="tips-to-close" id="tipsToClose" @click="closePop"></i>
      <div class="unReg">
        <p class="tx-c fz_36">
          每天免费查阅
          <span class="main_color_09a2a3">2条</span>采招商机
          <br />详情权限已用完
        </p>
        <p class="fz_36 fw_bold tx-c">
          开通或绑定企业认证
          <br />每天
          <span class="main_color_09a2a3">无限制查阅</span>
        </p>
        <p class="pos_res">
          <a href="javascript:;" id="toSLink" @click="ToVerifyCompany">开通或绑定企业认证，获取商机</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import ShareMask from "../../../components/common/ShareMask";

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    isShow: {
      type: String,
      required: true
    },
    detailData: {
      type: Object,
      required: true
    },
    phone: {
      type: String,
      default: "13888888888"
    }
  },
  components: {
    // ShareMask
  },
  data() {
    return {
      // share: false, //分享的蒙层
      isShowFullScreen: false,
      username: ""
    };
  },

  created() {
    this.username = this.$store.state.loginInfo.userInfo.username;
  },

  computed: {
    phone_c: function() {
      return "tel:" + this.phone;
    }
  },

  methods: {
    shareWithFriend() {
      // this.share = !this.share;
      this.bus.$emit("shareMaskShow", true);

      let query = Object.assign({}, this.$route.query, {
        Title: this.detailData.Title,
        BidsPirce: this.detailData.BidsPirce,
        CreateTime: this.detailData.CreateTime,
        EndDate: this.detailData.EndDate,
        Company: this.detailData.Company,
        id: this.detailData.id
      });
      console.log(query);

      this.$router.push({
        path: this.$route.path,
        query
      });

      let str = `${this.username}邀请你关注 "${this.detailData.Title}"`;

      this.$store.commit("setShareInfo", {
        title: str
      });
      this.$store.commit("setFriendNetInfo", {
        title: str
      });
    },
    closePop() {
      this.$emit("closePop");
    },
    fullScreen() {
      this.isShowFullScreen = true;
      let phonies = this.detailData.Phone;

      console.log(`==phonies=====`, phonies);
    },
    closeFullScreen() {
      this.isShowFullScreen = false;
    },
    ToVerifyCompany() {
      this.$router.push("autConfig");
    }
  }
};
</script>
<style lang="stylus" scoped>
#toSLink
  font-size 0.28rem
.p_b_20
  padding-bottom 0  
.tips-to-close
  background url(../../../assets/icon/close@2x.png) center no-repeat
  background-size contain
.tips-to-wrap>div
  border-radius 0.24rem

.ZBdetails {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
  z-index: 100;
}

 .ZBdetails .close
    position absolute 
    top -1rem
    right 0rem
    width 0.6rem
    height 0.6rem
    // border 1px solid red
    background url('../../../assets/icon/close@2x.png') center no-repeat
    background-size contain

.ZBdetails > div {
  width: 94.6%;
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  margin-top: 0.9rem;
  position: relative;
}

.ZBdetails-logo {
  width: 1.6rem;
  height: 1.6rem;
  background: rgba(9, 162, 163, 1);
  border: 0.1rem solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 0.54rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  line-height: 1.4rem;
  text-align: center;
  margin: -0.9rem auto 0;
}

.ZBdetails-statement {
  padding: 0  0.18rem 
  // min-height 25vh
  box-sizing border-box
}

.ZBdetails-statement-title {
  font-size: 0.36rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 1.5;
}

.ZBdetails-statement-price {
  font-size: 0.26rem;
  font-weight: bold;
}

.ZBdetails-statement-price > span {
  color: #09a2a3;
}

.ZBdetails-statement-price > span:first-child {
  font-size: 0.36rem;
}

.ZBdetails-statement-details {
  position: relative;
  // padding: 0.1rem 0 
}

.ZBdetails-statement-details-left {
  width: 100%;
  box-sizing: border-box;
  padding-right: 1.3rem;
  display: -webkit-box;
  font-size: 0.26rem;
  color: #666;
}

.ZBdetails-statement-details-tag {
  position: absolute;
  right: 0;
  top: 0.1rem;
  width: 1.2rem;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  background: rgba(191, 2, 0, 1);
  border-radius: 0.06rem;
  font-size: 0.24rem;
  color: #fff;
}

.bgGray{
   background:#999;
}

.ZBdetails-con {
  padding: 0.39rem 0.21rem 0.45rem;
  line-height: 1.8;
  height: 40vh;
  overflow-y: scroll;
  text-indent:2em;
  font-size:0.32rem;
  overflow-y scroll 
  -webkit-overflow-scrolling touch
}

.ZBdetails-closeBtn {
  position: absolute;
  top: -1.2rem;
  right: 0.3rem;
}

.ZBdetails-operator {
  position: relative;
  height: 1rem;
  display: -webkit-box;
  background-color: #f3f3f3;
}

.ZBdetails-operator > button {
  position: relative;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  width: 50%;
  font-size: 0.28rem;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: none;
}

.ZBdetails-operator > button > img {
  width: 0.34rem;
  height: 0.34rem;
  margin-right: 0.15rem;
}



.ZBdetails-operator > button.fs::after {
  position: absolute;
  right: 0;
  top: 0.3rem;

  width: 1px;
  height: 0.4rem;
  background-color: #ccc;
  display: block;
  content: "";
}

.ZBdetails-operator > button.fs::before {
  position: absolute;
  left: 0;
  top: 0.3rem;
  width: 1px;
  height: 0.4rem;
  background-color: #ccc;
  display: block;
  content: "";
}

.fullScreen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-bottom: 1.2rem;
  overflow-y: scroll;
}

.fullScreen .fs-fz{
  text-indent 2em
  font-size:0.32rem;
}

.fullScreen > .btn {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 102;
  width: 100%;
  display:flex;
  justify-content space-around;
  padding-top:0.1rem;
  border-top 1px solid #ccc
  background-color:#fff;
  padding-bottom:0.2rem;
}

.fullScreen .btn .btn_i {
  display:inline-block;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #ffffff;
  background-color: #09a2a3;
  font-size: 0.28rem;
  border-radius:0.5rem;
  text-align center
  width 50%
}

.fullScreen .btn  .closeFullScreen{
  display: inline-block;
  background-color: #ccc;
  color:black;
  width 40%
}
</style>
