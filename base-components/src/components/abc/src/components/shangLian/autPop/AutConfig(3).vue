<template>
  <div id="auth">
    <section class="userInfo">
      <span class="avatar">
        <img
          src="../../../assets/icon/shang.png"
          alt=""
        >
      </span>
      <div class="name-status">
        <span class="name">林菲菲</span>
        <span class="status">您当前还未认证任何企业</span>
      </div>
    </section>

    <section class="main-body">
      <section class="business">
        <div class="cost">
          <span>认证费用</span>
          <span>
            <span class="marker">￥</span>
            <span class="money">200/年</span>
          </span>
        </div>
        <div class="auth-list">
          <h4 class="auth-title">开通认证企业六大特权</h4>
          <ul class="list">
            <li
              class="item"
              v-for="(item,index) in 6"
              :key="index"
            >
              <span class="img-box">
                <img
                  src="../../../assets/icon/shanglian/message.png"
                  alt=""
                >
              </span>
              <div class="auth-type">短信触客</div>
            </li>
          </ul>
        </div>
      </section>

      <section class="com-info">
        <ul class="list">
          <li
            class="item"
            v-for="(value,key,index) in companyInfo"
            :key="index"
          >
            <span>{{key}}</span>
            <input
              type="text"
              v-model="companyInfo[key]"
              class="inputText"
              :placeholder="inputPlaceholder[index]"
            >
          </li>
        </ul>
      </section>
      <section class="upload">
        <h2>上传营业执照</h2>
        <label
          for="upload-input"
          class="uploa-label"
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
            <span class="text">文件大小不超过2m</span>
          </div>
        </label>
        <input
          type="file"
          id="upload-input"
          hidden
          ref="uploadImg"
          @change="getPic"
        >
      </section>
      <section class="pay">
        <dir class="pay-tips">
          上下链的认证审核时间为1-2个工作日，请耐心等待
        </dir>
        <div class="pay-topay">
          <span class="text">
            <span>一年仅需 </span>
            <span class="text-mark">￥</span>
            <span class="text-num">200</span>
          </span>
          <span
            class="btn-pay"
            @click="toPay"
          >去支付</span>
        </div>
      </section>
    </section>

  </div>

</template>

<script>
export default {
  created(){
    
  },
  data() {
    return {
      imgUrl: "",
      isHasUploadImg: true, //是否有上传中的图片（以显示背景或是上传的图片）
      inputPlaceholder: [
        "请输入企业名称",
        "请输入企业信用代码",
        "请输入联系人姓名",
        "请输入联系人电话"
      ],
      companyInfo: {
        企业全称: "广州市君安汽车销售有限公司",
        统一社会信用代码: "1458741569874125",
        联系人: "",
        联系电话在: ""
      },
      postImg: null
    };
  },

  methods: {
    getPic() {
      let file = this.$refs.uploadImg.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        let dataURL = e.target.result;
        this.imgUrl = dataURL;
        this.postImg = file;
      };
    },
    toPay() {
      console.log(this.companyInfo);
      
      // console.log(this.postImg);
    }
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
    position fixed
    left 0
    right 0
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
  .main-body
    height 100%
    overflow-y auto 
    padding  1.8rem  0 0.98rem 0   
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
            background url(../../../assets/icon/shanglian/privilege.png) center no-repeat
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
              margin-top 0.2rem
              font-weight 600
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
          .inputText
            width 60%
            border none
    .upload
      width 100%
      height 4rem 
      margin-top 0.1rem
      background-color #fff  
      padding 0.2rem
      box-sizing border-box
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
      .pay-tips
        width 100%
        height 1rem
        background-color #f3f3f3 
        text-align center
        line-height 1rem 
        font-size 0.24rem
        color #666
      .pay-topay
        width 100%
        display flex
        .text
          display inline-block
          flex 0 0 5rem
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
          width 100%
          height 1rem
          line-height 1rem
          text-align center
          background-color #09a2a3
          color #fff 







</style>
