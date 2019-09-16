<template>
  <div id="upload">
    <ul class="list">
      <li v-for="(url,index) in imgList" :key="index">
        <img class="upload-imgs" :src="url" alt />
        <span class="del-img" @click="delImg(index)"></span>
      </li>
      <li v-for="(url,index) in temShowList" :key="url">
        <img class="upload-imgs" :src="url" alt />
        <span class="del-img" @click="delUploadImg(index)"></span>
      </li>

      <li @click="chooseImg">
        <img src="../../assets/icon/xiangji@48.png" alt />
        <span>添加图片</span>
        <!-- <label for="img-upload" class="img-upload" @click="chooseImg"></label> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    imgList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      maxNum: 9,
      temShowList: [
        // "../../assets/icon/xiangji@48.png",
        // "../../assets/icon/xiangji@120.png"
      ],
      uploadImgList: [
        // "../../assets/icon/xiangji@48.png",
        // "../../assets/icon/xiangji@120.png"
      ]
    };
  },
  methods: {
    chooseImg() {
      if (this.imgList.length + this.uploadImgList.length >= this.maxNum) {
        this.$toast(`最多只能上传${this.maxNum}张图片`);
        return;
      }

      wx.chooseImage({
        count: this.maxNum - (this.imgList.length + this.uploadImgList.length), // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
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
            this.uploadImgList.push(serverId);
            this.$listeners.modUploadImgList(this.uploadImgList);
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
          this.temShowList.push(localId);
        },
        fail: rej => {
          console.log(rej);
        }
      });
    },
    delUploadImg(i) {
      // this.uploadImgList.splice(i, 1);
      // this.temShowList.splice(i, 1);
      this.$listeners.modUploadImgList(this.uploadImgList);
    },
    delImg(i) {
      this.imgList.splice(i, 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
#upload
  width 100vw
  height 100%
  box-sizing border-box
  .list
    width 100%  
    display flex
    flex-wrap wrap
    li
      width 2.2rem
      height 2.2rem
      margin-left 0.2rem
      margin-top 0.1rem
      position relative
      box-sizing border-box
      // border-radius 0.2rem
      // overflow hidden
      .upload-imgs 
        display inline-block
        width 100%
        // height 100%
      &:last-child
        background-color #f3f3f3
        display flex
        flex-direction  column
        justify-content center
        align-items center
        img
          width 30%
      .del-img
        position absolute 
        top -0.1rem
        right -0.1rem
        display inline-block
        width 0.3rem
        height 0.3rem
        background url(../../assets/icon/reduce@30.png) center no-repeat
        background-size contain
      


</style>