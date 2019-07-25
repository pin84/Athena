<template>
  <com-pop
    my-index="companySetting"
    class="top_0"
  >
    <template v-slot:pop-content>

      <div id="companySetting">
        <h3>上下链设置</h3>
        <div class="top">
          <p>企业名称：{{company.name}}</p>
          <p>认证情况：{{company.status}}</p>
          <p class="wechat">认证微信：
            <span class="avatar">
              <img
                :src="company.wechatAvatar"
                alt=""
              >
            </span>{{company.wechat}}</p>
          <p>法定代表人：{{company.keyPerson}}</p>
        </div>
        <ul class="bottom">
          <li class="logo">
            <span>LOGO</span>
            <span>
              <span class="imgbox">
                <canvas
                  id="canvas"
                  width="40"
                  height="40"
                ></canvas>
                <img
                  :src="user.avatar"
                  alt=""
                  id="logoImg"
                  ref="logoImg"
                >
              </span>
              <label
                for="changeLogo"
                class="changeLogo"
              ></label>
              <input
                type="file"
                id="changeLogo"
                style="display:none"
                @change="changeLogo"
                ref="changeLogo"
              >
            </span>
          </li>
          <li class="introduce">
            <span class="left">介绍</span>
            <textarea
              class="textarea"
              name=""
              id=""
              cols="30%"
              rows="4"
              ref="textarea_in"
              v-model="companyIntroduce"
            ></textarea>
            <span
              class="cancel"
              @click="cancelIntroduce"
            ></span>
          </li>
          <li class="introduce">
            <span class="left">所在地址</span>
            <textarea
              class="textarea"
              name=""
              id=""
              cols="30%"
              rows="2"
              ref="textarea_add"
              v-model="companyAdd"
            ></textarea>
            <span
              class="cancel"
              @click="cancelAdd"
            ></span>
          </li>
          <li
            class="forLis"
            v-for='(item,index) in thisPageData'
            :key='index'
          >
            <span class="left">{{Object.keys(item)[0]}}</span>
            <input
              class="centerInput"
              type="text"
              :placeholder="Object.values(item)[0]"
              ref="inputText"
              v-model='inputMSG[index]'
            >
            <span
              class="cancel"
              @click="cancelText(index)"
            ></span>
          </li>
        </ul>
      </div>
    </template>

    <template v-slot:flex-left>
      <div class="m-item m-itemcenter">取消</div>
    </template>
    <template v-slot:flex-right>
      <div class="m-item footbtn">
        <div
          class="radiusBtn"
          @click="saveMsg"
        >保存</div>
      </div>
    </template>
  </com-pop>

</template>
<script>
const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};
export default {
  data() {
    return {
      thisPageData: [
        { 企业电话: "1371455464" },
        { "联  系  人": "陈某某" },
        { 手机号码: "1371455464" }
      ],
      company: {
        name: " 广州恒丰汽车销售有限公司",
        status: "已认证",
        wechat: "145216212",
        wechatAvatar:
          "http://img3.imgtn.bdimg.com/it/u=1148545956,3361209271&fm=26&gp=0.jpg",
        keyPerson: "张某某"
      },
      companyIntroduce:
        "上下链：基于大数据的企业资源可视化图谱，赋能企业链接能下达下游企业商业圈", //v-model 企业介绍input
      companyAdd: "广州天河区海安路13号财富世纪广场1205", //v-model 企业地址input
      imgObj: new Image(), //装载input打开的图片,即logo
      user: {
        //微信用户的信息
        avatar:
          "http://img4.imgtn.bdimg.com/it/u=350641063,3669544341&fm=11&gp=0.jpg"
      },
      inputMSG:['','','']
    };
  },
  components: {
    ComPop
  },
  updated() {
    let logoIMG = document.getElementById("logoImg");
    let canvasCtx = document.getElementById("canvas").getContext("2d");
    canvasCtx.clearRect(0, 0, 40, 40);
    canvasCtx.drawImage(logoIMG, 0, 0, 40, 40);
  },
  methods: {
    saveMsg() {
      // console.log(this.imgObj.src);
      // console.log(this.inputMSG[0]);

      //这是 canvas 的 url:data 的使用方法，saveMsg的时候会把url:data传给后台保存
      // var img = new Image();
      // img.src = this.imgObj.src;
      // img.onload = () =>{
      //   let canvasCtx = document.getElementById("canvasa").getContext("2d");
      //   canvasCtx.clearRect(0, 0, 40, 40);
      //   canvasCtx.drawImage(img, 0, 0, 40, 40);
      // };
    },
    changeLogo() {
      let input = this.$refs.changeLogo;
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = e => {
        this.imgObj.src = e.target.result;
      };


      this.imgObj.onload = () => {
        let canvasCtx = document.getElementById("canvas").getContext("2d");
        canvasCtx.clearRect(0, 0, 40, 40);
        canvasCtx.drawImage(this.imgObj, 0, 0, 40, 40);
      };
    },
    cancelIntroduce() {
      let textarea_in = this.$refs.textarea_in;
      textarea_in.value = "";
    },
    cancelAdd() {
      let textarea_add = this.$refs.textarea_add;
      textarea_add.value = "";
    },
    cancelText(index) {
      let inputText = this.$refs.inputText[index];
      inputText.value = "";
    }
  }
};
</script>
<style lang="stylus" scoped>
#companySetting
  width 100%
  background-color #fff
  padding 40px 5px 10px 5px
  box-sizing border-box
  border-radius 5px 5px 0 0
  h3
    text-align center
    padding 10px 0
  .top
    width 100%
    line-height 26px
    .avatar
      display inline-block
      width 26px
      height 26px
      border-radius 50%
      vertical-align bottom
      overflow hidden
      margin-right 10px

      img
        width 100%
        height 100%
  .bottom
    width 100%
    li
      background-color #f3f3f3
      padding 5px 10px 
      border-radius 5px
      margin-top 10px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      color #000000
      // &::before
      //   position absolute 
      //   right 0
      //   padding 0 20px
      //   content 'aaa'
      .imgbox
        display inline-block
        width 40px
        height 40px
        border-radius 50%
        vertical-align top
        box-sizing border-box
        overflow hidden
        // canvas 
        //   width 100%
        //   height 100%
        img
          width 100%
          height 100%
      .changeLogo
        display inline-block
        width 16px
        height 16px
        padding 10px
        background url('../../../assets/icon/arrow.png') center no-repeat
        transform rotate(-90deg)
        vertical-align center
      &.introduce
        width 100%
        .textarea
          color #333333
          background-color #f3f3f3
      &.forLis
        width 100%   
        height 45px
        input
          width 70%
      .left 
        flex-basis 60px 
      .centerInput
        border 0 
        padding 6px 10px 
        box-sizing border-box
      .cancel
        display inline-block
        width 16px 
        height 16px
        background url('../../../assets/icon/cancel.png') center no-repeat

</style>
