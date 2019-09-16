<template>
  <div
    id="feedback"
    ref="feedback"
  >
    <section class="select-type">
      <p class="title">请选择你要反馈的问题所属的功能区域:</p>
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in area'
          :key='index'
          :class="{'other':item.type=== '其他','active':item.active}"
          @click="selectFnArea(item)"
        >
          {{item.type}}
        </li>
      </ul>
    </section>
    <section class="select-type">
      <p class="title">请选择你要反馈的问题类型:</p>
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in type'
          :key='index'
          :class="{'other':item.type=== '其他','active':item.active}"
          @click="selectType(item)"
        >
          {{item.type}}
        </li>
      </ul>
    </section>
    <section class="uploadImg">
      <p class="title">请补充详细问题及建议:</p>
      <div class="content">
        <textarea
          name=""
          id="textarea"
          rows="6"
          placeholder="请输入描述文字(必填)或截图描述"
          v-model="postData.content"
        ></textarea>

        <div class="img-list">
          <label
            for="img-upload"
            class="img-upload"
            @click='chooseImg'
          ></label>
          <!-- <input
            type="file"
            id="img-upload"
            hidden

          > -->

          <ul class="show-img">
            <li
              v-for='(imgUrl,index) in showImg'
              :key='index'
            >
              <img
                :src="imgUrl"
                alt=""
              >
              <span
                class="del-img"
                @click="delImg(index)"
              ></span>
            </li>
          </ul>

        </div>

        <span class="history">
          <span
            class="text"
            @click="toHistory"
          >历史反馈</span>
        </span>
      </div>
    </section>

    <section class="contact">
      <p class="title">请输入联系信息:</p>
      <div class="input-info">
        <label
          for="username"
          class="label"
        >联系人:</label>
        <input
          type="text"
          id="username"
          :placeholder="placeholder.name"
          @focus="onFocus('name')"
          @blur='onBlur("name")'
          v-model="postData.contact_name"
        >
      </div>
      <div class="input-info">
        <label
          for="phone"
          class="label"
        >联系电话:</label>
        <input
          type="text"
          id="phone"
          :placeholder="placeholder.phone"
          @focus="onFocus"
          @blur="onBlur"
          v-model="postData.mobile"
        >
      </div>
    </section>
    <section class="btn">
      <button
        class="submit"
        @click="submit"
      >提交</button>
    </section>
    <Tips
      leftText='确定'
      @btnEvent='resetData'
    />
  </div>
</template>
<script>
import Tips from "./Tips";
export default {
  data() {
    return {
      isShowTips: true, // show  tip ?
      placeholder: {
        name: "请输入联系人姓名",
        phone: "请输入联系人电话"
      },
      area: [
        { type: "图谱探索" },
        { type: "订阅" },
        { type: "触客" },
        { type: "用户中心" },
        { type: "认证" }
      ],
      type: [
        { type: "首页白屏" },
        { type: "首页数据加载失败" },
        { type: "认证企业信息无法输入" },
        { type: "认证信息提交失败" },
        { type: "界面错位" },
        { type: "列表数据加载不完整" },
        { type: "提交短信模板失败" },
        { type: "无法充值" },
        { type: "无法发送短信" },
        { type: "订阅详情无法加载" },
        { type: "采招推荐没有内容" },
        { type: "快搜结果列表都是已截标" },
        { type: "精准短信触客搜索结果不正常" }
      ],
      showImg: [],
      postData: {
        functional_areas: "",
        types: "",
        token: "",
        media_id: [
          // "2hb0uIyI9awzM-Z3uqoFnp2tJN5MsnGVglBzgFxGPPpYNJhCSkOSk0tdZZsHuCPA"
        ],
        content: "",
        contact_name: "",
        mobile: "",
        wx_username: this.$store.state.loginInfo.userInfo.username,
        wx_headimgUrl: this.$store.state.loginInfo.userInfo.headimgUrl,
        upImgLength:3
      }
      // postData: {
      //   fnArea: "",
      //   type: "",
      //   token: "",
      //   media_id: [
      //     // "2hb0uIyI9awzM-Z3uqoFnp2tJN5MsnGVglBzgFxGPPpYNJhCSkOSk0tdZZsHuCPA"
      //   ],
      //   detail: "",
      //   name: "",
      //   phone: "",
      //   wx_username:this.$store.state.loginInfo.userInfo.username,
      //   wx_headimgUrl:this.$store.state.loginInfo.userInfo.headimgUrl
      // }
    };
  },
  components: {
    Tips
  },

  created() {
    let userinfo = this.$store.state.loginInfo.userInfo;
    this.postData.token = userinfo.token;
  },

  methods: {
    selectFnArea(item) {
      if (item.active) {
        this.$delete(item, "active");
      } else {
        this.$set(item, "active", true);
      }
    },
    resetData() {
      console.log(`=====ssssssss==`,);
      let feedback = this.$refs.feedback;
      feedback.classList.remove("add-mask");
      this.type.forEach(item => {
        if (item.active) {
          this.$delete(item, "active");
        }
      });
      this.area.forEach(item => {
        if (item.active) {
          this.$delete(item, "active");
        }
      });
      this.showImg = [];
      this.postData.content = "";
      this.postData.contact_name = "";
      this.postData.mobile = "";
      this.postData.media_id = [];
    },

    delImg(index) {
      this.postData.media_id.splice(index, 1);
      this.showImg.splice(index, 1);
    },
    toHistory() {
      // let userinfo = this.$store.state.loginInfo.userInfo.username;

      // if (userinfo !== "伊谢尔伦的风") {
      //   this.$toast("功能即将开放，敬请期待");
      //   return;
      // }
      this.$router.push("fd-history");
    },
    chooseImg() {
      

      if (this.showImg.length >= 3) {
        this.$toast("最多只能上传3张图片");
        return;
      }

      wx.chooseImage({
        count: 3-this.showImg.length, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          console.log(`==localIds--------------=====`,localIds);

          // 上传图片至微信服务器
          this.upLoadImage(localIds);
        },
        fail: rej => {
          console.log(rej);
        },
        cancel: () => {
          console.log("取消选择图片");
        }
      });
    },

    upLoadImage(localIds) {
      while (localIds.length) {
        let id = localIds.pop();
        wx.uploadImage({
          // localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          localId: id,
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: res => {
            let serverId = res.serverId; // 返回图片的服务器端ID
            console.log(`====serverId===`, serverId);
            this.postData.media_id.push(serverId);
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
          this.showImg.push(localId);
        },
        fail: rej => {
          console.log(rej);
        }
      });
    },

    selectType(item) {
      if (item.active) {
        this.$delete(item, "active");
      } else {
        this.$set(item, "active", true);

        this.postData.types = item.type;
      }
    },
    async submit() {
      let fnAreaTem = [];
      this.area.forEach(item => {
        if (item.active) {
          fnAreaTem.push(' ' +item.type);
        }
      });
      this.postData.functional_areas = fnAreaTem.join();
      let typeTem = [];
      this.type.forEach(item => {
        if (item.active) {
          typeTem.push(' ' +item.type);
        }
      });


      this.postData.types = typeTem.join();


      if (this.postData.contact_name === "") {
        delete this.postData.contact_name;
      }
      if (this.postData.mobile === "") {
        delete this.postData.mobile;
      }
      if (this.postData.content === "") {
        delete this.postData.content;
      }
      if (!this.check()) return;

      // console.log(`===1====`, this.postData);

      let res = await this.$axios.post(this.$api.feedback, this.postData);

      // console.log(`===2====`, res);

      if (res.data.code === 0) {
        let tipsContent =
          "感谢您的反馈，我们会认真处理您的反馈，并尽快给您答复，感谢您的使用。";
        this.$store.commit("isShowTips", { content: tipsContent, isShow: true });
        let feedback = this.$refs.feedback;
        feedback.classList.add("add-mask");
      } else {
        this.$toast("提交出错，请重新提交");
      }
    },

    check() {
      if (this.postData.mobile) {
        console.log(`==testphone=====`, this.postData);
        let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!reg.test(this.postData.mobile)) {
          this.$toast("手机号码输入不正确");
          return false;
        } else {
          return true;
        }
      }

      let flags = [
        this.postData.functional_areas !== "",
        this.postData.types !== "",
        this.postData.content || this.postData.media_id.length !== 0
        // this.postData.contact_name !== "",
        // reg.test(this.postData.mobile)
      ];

      let toast = [
        "请选择问题所属的功能区域",
        "请选择问题的类型",
        "请输入问题描述或上传问题截图"
        // "请上传问题截图",
        // "请输入联系人",
        // "电话号码格式不正确"
      ];

      if (flags.indexOf(false) !== -1) {
        this.$toast(toast[flags.indexOf(false)]);
        return false;
      }
      return true;
    },
    onFocus(type) {
      type === "name"
        ? (this.placeholder.name = "")
        : (this.placeholder.phone = "");
    },
    onBlur(type) {
      type === "name"
        ? (this.placeholder.name = "请输入联系人姓名")
        : (this.placeholder.phone = "请输入联系人电话");
    }
  }
};
</script>

<style lang="stylus" scoped>

#feedback
  width 100%
  min-height 100vh
  padding 0.01rem 0.1rem 1.5rem 0.1rem
  box-sizing border-box
  background-color #fff
  font-size 0.28rem
  color #666
  &.add-mask 
    position:absolute;
    top:0; 
    height: 100%;
    overflow: hidden;
  .select-type
    width 100%
    margin 0.2rem 0
    padding-bottom 0.1rem
    border-bottom 1px solid #ccc
    .list
      display flex
      flex-wrap wrap
      margin-top 0.2rem
      .item
        background-color #f1f1f1
        padding 0.1rem 0.3rem
        border-radius 0.3rem
        margin-right 0.2rem 
        margin-bottom 0.1rem 
        &.active
          color #09a3a3
          background-color rgba(9,163,163,0.2)
        &.other
          padding 0.1rem 0.5rem
  .uploadImg
    width 100%
    margin-top 0.2rem
    .content
      position relative
      background-color #f3f3f3
      border-radius 0.1rem
      margin-top 0.2rem
      margin-bottom 0.2rem
      overflow hidden
      #textarea
        width 100%
        box-sizing border-box
        padding 0.1rem
        background-color #f3f3f3
        border 0 
        font-size 0.32rem
        &::placeholder
          font-size 0.28rem
      .img-list
        width 100%  
        margin-bottom 0.1rem
        display flex
        .img-upload
          display inline-block
          flex 0 0 1.5rem
          height 1.5rem
          background url(../../../assets/icon/xiangji@128.png) center no-repeat
          background-size 0.5rem 0.5rem
          background-color #e2e2e2
          border-radius 0.1rem
          margin-left 0.2rem
        .show-img
          width 100%  
          height 1.5rem 
          display flex
          li
            width 30%
            margin-left 0.1rem
            position relative
            img 
              display inline-block
              width 100%
              height 100%
            .del-img
              position absolute 
              top -0.1rem
              right -0.1rem
              display inline-block
              width 0.3rem
              height 0.3rem
              background url(../../../assets/icon/reduce@30.png) center no-repeat
              background-size contain
      .history
        position fixed 
        bottom 2rem
        right 0.2rem
        display inline-block
        width 0.8rem  
        height 0.8rem
        border-radius 50%
        background-image linear-gradient(#09a2a3 100%)   
        color #ffffff
        font-size 0.2rem
        display flex
        justify-content center
        align-items center
        box-shadow 0 0 0.2rem 0 rgba(0,0,0,0.2)
        .text
          display inline-block
          width 0.4rem
          height 0.4rem
          line-height 0.2rem
  .contact
    width 100%  
    .input-info
      display flex
      justify-content space-between
      height 1.1rem
      line-height 1.1rem
      border-bottom 1px solid #f3f3f3
      .label
        flex 0 0 2rem
       
      input
        width 100%
        border 0
        &::placeholder
          text-align right
  .btn
    position fixed
    width 100%
    bottom 0
    left 50%
    transform translateX(-50%)
    text-align center  
    background-color #fff
    padding-bottom 0.2rem
    .submit
      background-image linear-gradient(#09a2a3 0%,#0ec2c3 100%)
      width 80vw
      height 1rem
      line-height 1rem
      border-radius 0.6rem
      color #ffffff
      font-size 0.32rem 
      margin-top 0.2rem

p.title
  color #333
  // height 0.6rem
  font-size 0.32rem
  font-weight 600
  // line-height 0.6rem

        
</style>

