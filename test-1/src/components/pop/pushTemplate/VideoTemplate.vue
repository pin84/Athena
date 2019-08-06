<template>
  <com-pop
    my-index="videoTemplate"
    class="top_0"
  >
    <template v-slot:pop-content>
      <div id="videoTemplate">
        <h3>添加视频模板</h3>
        <input
          type="text"
          class="temTitle"
          :placeholder="placeholder.temTitle"
          ref="tem_input"
          v-model="upToDBData.temName"
        >
        <input
          type="text"
          class="typeTitle"
          :placeholder="placeholder.typeTitle"
          ref="type_input"
           v-model="upToDBData.videoName"
        >
        <div class="uploadVedio">
          <label
            for="vedioOrImage"
            class="label"
            ref="upLabel"
          >
          </label>
          <input
            type="file"
            id="vedioOrImage"
            @change="uploadVedioOrIMG"
            multiple="multiple"
            :accept="acceptType"
            hidden
          >
          <span
            class="text"
            v-if="!imgList.length && !videoSrc.length"
          >
            添加图片/视频
          </span>
        </div>
        <div
          v-if="videoSrc.length"
          class="videoBox"
        >
          <video
            :src="videoSrc[0]"
            autoplay
            height='100px'
            ref="v_video"
          >
            您的浏览器不支持 video 标签。
          </video>
        </div>
        <ul
          class="showIMG"
          v-if="imgList.length"
        >
          <span class="imgCount">{{ `还可以加${8-imgList.length}张图片`}}</span>
          <li
            class="item"
            v-for='(item,index) in imgList'
            :key='index'
          >
            <img :src="item">
            <span
              class="deleteImg"
              @click="deleteImg(index)"
            ></span>
          </li>
        </ul>

      </div>
    </template>

    <template v-slot:flex-left>
      <div></div>
      <div class="m-item m-itemcenter">返回</div>
    </template>
    <template v-slot:flex-right>
      <div class="m-item footbtn">
        <div
          class="radiusBtn"
          @click="postData"
        >
          保存
        </div>
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
      placeholder: {
        temTitle: "请输入模板标题",
        typeTitle: "请输入视频标题",
        content: "添加图片/视频"
      },
      imgList: [],
      videoSrc: [],
      acceptType: "", //input框接受的类型
      maxVedio: 15768240, //视频允许最大字节
      maxImage: 512000, //图片允许的最大字节
      upToDBData:{
        temName:'',
        videoName:'',
        upBlob: [] //保存要上传到后台的图片或视频。
      },
    };
  },
  mounted() {
    // this.textarea_input = this.$refs.textarea;
  },
  components: {
    ComPop
  },
  methods: {
    //删除图片时移除disabled属性
    deleteImg(i) {
      this.imgList.splice(i, 1);
      let input = document.getElementById("vedioOrImage");
      input.removeAttribute("disabled");

      //如果列表中没有图片，则删除上传label的背景图片
      if (this.imgList.length === 0) {
        let upLabel = this.$refs.upLabel;
        upLabel.style.backgroundImage = "";
        upLabel.style.transform = "scale(0.5)";
      }
    },
    //需要上传的图片或视频，做上传之前的检测
    uploadVedioOrIMG() {
      
      let input = document.getElementById("vedioOrImage");
      let files = input.files[0];

      if (!files) {
        return;
      }

      let type = files.type.split("/")[0];
      if (type === "video" && files.size > this.maxVedio) {
        alert("视频最大不能超过1.5M");
        return;
      }
      if (type === "image" && files.size > this.maxImage) {
        alert("图片最大不能超过500KB");
        return;
      }
      if (
        (this.videoSrc.length && type === "image") ||
        (this.imgList.length && type === "video")
      ) {
        alert("不能同时上传视频和图片");
        return;
      }


      //用 new FileReader() 读取文件
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = e => {
        let url = e.target.result;
        if (type === "image") {
          //上传图片后设置为背景图片
          let upLabel = this.$refs.upLabel;
          let a = `url(${url})`;
          upLabel.style.backgroundImage = a;
          upLabel.style.transform = "scale(0.8)";
        }

        if (type === "image") {
          this.imgList.unshift(url);
          //当图片上传了8个时，禁用input框
          if (this.imgList.length === 8) {
            input.setAttribute("disabled", "disabled");
            return;
          }
        } else {
          this.videoSrc.unshift(url);
          this.videoSrc.splice(1);
        }
      };
    },

    postData() {
      
      this.upToDBData.upBlob.length = 0;
      if (this.imgList.length) {
        let type = this.imgList.forEach(item => {
          let curBlob = this.convertBase64UrlToBlob(item);
          this.upToDBData.upBlob.push(curBlob); //push到数组里,等待上传到后台
        });
      } else {
        let curBlob = this.convertBase64UrlToBlob(this.videoSrc[0]);
        this.upToDBData.upBlob.push(curBlob); //push到数组里,等待上传到后台
      }

      console.log(this.upToDBData);
      // var curBlob = this.convertBase64UrlToBlob(e.target.result, files.type);
      // var url = URL.createObjectURL(curBlob);
      // this.upBlob.push(curBlob); //push到数组里,等待上传到后台
    },

    /*转成二进制对象*/
    convertBase64UrlToBlob(urlData) {
      if(!urlData){
        return
      }
      var bytes = window.atob(urlData.split(",")[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab]);
    }
  }
};
</script>

<style lang="stylus" scoped>
#videoTemplate
  width 100%
  height 95vh
  background-color #fff
  padding 40px 10px 10px  10px
  box-sizing border-box
  h3
    text-align center
    font-size 18px
    padding 10px 0
  .uploadVedio 
    position relative
    width 100%
    height 200px
    background-color #f3f3f3
    border-radius 5px
    .label
      display block
      width 100%
      height 100%
      background-image url('../../../assets/icon/xiangji@128.png') 
      background-repeat no-repeat
      background-position center
      background-size contain
      text-align center
      transform scale(0.5)
    .text
      position absolute 
      top 50%
      left 50%
      transform translate(-50%,45px)
  .videoBox
    margin-top 10px    
  .showIMG
    position relative
    width 100%
    display flex
    flex-wrap wrap
    justify-content flex-start
    padding 10px 0
    margin-top 30px
    
    .imgCount
      position absolute
      top -20px
      left 0
      background #f3f3f3
    .item 
      position relative
      height 40px
      width 12%
      margin-top 10px
      margin-bottom 5px
      margin-right 10px
      img
        width 100%
        height 100%
      .deleteImg
        position absolute
        top -16px 
        right -16px
        display inline-block
        width 16px
        height 16px
        transform scale(0.8)
        // border 1px solid red
        background url('../../../assets/icon/cancel2.png') center no-repeat
        padding 5px

  .areaInput
    width 100%
    position relative
    .res
      position absolute
      bottom 15px
      right 0
      font-size 10px
  

  input,#textarea
    padding 15px 10px
    width 100%  
    box-sizing border-box
    border 0
    margin-bottom 10px
    background-color #f3f3f3
    border-radius 4px
    color #999999
  #textarea
    height 30vh
    
</style>
