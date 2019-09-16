<template>
  <div id="edi-page">
    <div class="main-body">
      <!-- <Publish @inputText="inputTitle" />
      <textarea name id="textarea" placeholder="请输入内容......" v-model="article.text"></textarea>
      <UploadImg @modUploadImgList="modUploadImgList" />-->
      <div class="title">
        <h3>标题：</h3>
        <input type="text" class="input" placeholder="请输入标题" v-model="article.title" />
      </div>
      <div class="box">
        <quill-editor
          ref="myTextEditor"
          :content="article.text"
          :options="editorOption"
          @change="onEditorChange($event)"
          class="needsclick"
        ></quill-editor>
      </div>

      <div class="btn-submit" @click="save">发布</div>
    </div>
  </div>
</template>
<script>
import Publish from "./Publish";
import UploadImg from "./UploadImg";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    let toolbarOptions = [
      [{ size: ["small", false, "large"] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ];
    return {
      getImgList: [],
      user: "",
      // content: "",
      article: {
        title: "",
        text: null,
        // media_id: ['afsf'],
        company_id: this.$store.state.company.authComInfo.enterpriseid,
        company_name: this.$store.state.company.authComInfo.enterprise,
        user_id: this.$store.state.loginInfo.userInfo.user_id,
        short_text: ""
      },
      fn_clearInput: null, //清除孙组件input输入的文字的方法，定义在孙组件
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: this.chooseImg
            }
          }
        }
      }
    };
  },
  components: {
    Publish,
    UploadImg,
    quillEditor
  },
  created() {
    // this.company = this.$store.state.company.authComInfo;
    this.user = this.$store.state.loginInfo.userInfo;
  },

  mounted() {},
  methods: {
    async sendImgFunc(value) {
      let quill = this.$refs.myTextEditor.quill;
      let length = quill.getSelection().index; //当前文本编辑器光标

      let imgObj = await this.getLocalImg();
      if (!imgObj) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(imgObj);

      reader.onload = e => {
        let url = e.target.result;
        quill.insertEmbed(length, "image", "url");
        quill.setSelection(length + 1); // 调整光标到最后

        let imgList;
        // setTimeout(()=>{
        imgList = document.getElementsByTagName("img");
        let urlItem = [].findIndex.call(imgList, ele => {
          return ele.getAttribute("src") == "url";
        });

        if (imgList[urlItem] !== -1) {
          let len = this.getImgList.length;
          imgList[urlItem].setAttribute("data-src", "img" + len);
          imgList[urlItem].setAttribute("src", url);
          this.getImgList.push(imgObj);
        }
      };
    },

    getLocalImg() {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      // input.setAttribute("capture", "camera");

      // Listen upload local image and save to server
      input.click();
      let state;

      state = new Promise((res, rej) => {
        input.onchange = () => {
          const file = input.files[0];
          // file type is only image.
          if (/^image\//.test(file.type)) {
            res(file);
          } else {
            this.$toast("仅支持图片");
            rej(false);
          }
        };
      });
      return state;
    },

    async save() {
      let fd = new FormData();
      let toSaveImgList = document.querySelectorAll("img[data-src]");
      let getImgLinkArr = [];

      if (toSaveImgList.length !== 0) {
        [].forEach.call(toSaveImgList, (ele, index) => {
          let dataSrc = ele.getAttribute("data-src");
          let imgIndex = dataSrc.slice(-1);
          fd.append(`pic${index}`, this.getImgList[imgIndex]);
        });
        // 插入图片
        fd.append(`user_id`, this.$store.state.loginInfo.userInfo.user_id);
        getImgLinkArr = await this.$axios
          .post(this.$api.articlePhoto, fd)
          .then(res => {
            console.log(res);
            return res.data.pic_name;
          })
          .catch(rej => {
            console.log(rej);
          });

        getImgLinkArr.forEach((ele, index) => {
          toSaveImgList[index].setAttribute(
            "src",
            `${this.$api.articlePhoto}?pic=${ele}`
          );
          toSaveImgList[index].removeAttribute("data-src");
        });
      }

      console.log(`===this.article====`, this.article);

      debugger;

      let res = await this.$axios.post(this.$api.addArticle, this.article);

      this.$router.push({
        path: "./special",
        query: { ctype: this.$route.query.ctype }
      });
    },

    /**

    sendImgFunc(a) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.click();
      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0];
        // file type is only image.
        if (/^image\//.test(file.type)) {
          this.saveToServer(file);
        }
      };
    },

    async saveToServer(file) {
      const fd = new FormData();
      fd.append("pic0", file); // 参数根据后端接口自行更改
      fd.append("user_id", this.user.user_id); // 参数根据后端接口自行更改

      let { data } = await this.$axios.post(this.$api.articlePhoto, fd);

      let imgName = data.pic_name[0];

      // const xhr = new XMLHttpRequest();
      // xhr.open(
      //     "POST",
      //   `${app.serverAddr}/p/file/upload_file?token=${app.token}`,
      //   true
      // );
      // xhr.onload = () => {
      //     if (xhr.status === 200) {
      //         // this is callback data: url
      //     const url = JSON.parse(xhr.responseText).file_path;
      // xhr.send(fd);
      //   }
      // };

      let url = `${this.$api.uploadImg}?pic=${imgName}`;
      this.insertToEditor(url);
    },

    insertToEditor(url) {
      let { quill } = this.$refs.myTextEditor;
      // push image url to rich editor.
      const range = quill.getSelection();
      // quill.insertEmbed(range.index, "image", `${app.serverAddr}${url}`);
      quill.insertEmbed(range.index, "image", url);

      // quill editor add image handler
      // quill.getModule("toolbar").addHandler("image", () => {
      //   selectLocalImage();
      // });
    },

    async save() {
      let res = await this.$axios.post(this.$api.addArticle, this.article);

      this.$router.push({
        path: "./special",
        query: { ctype: this.$route.query.ctype }
      });
    },

    */

    // chooseImg() {
    //   // if (this.showImg.length >= 3) {
    //   //   this.$toast("最多只能上传3张图片");
    //   //   return;
    //   // }

    //   wx.chooseImage({
    //     count: 9, // 默认9
    //     sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    //     success: res => {
    //       let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

    //       console.log(`==localIds--------------=====`, localIds);

    //       // 上传图片至微信服务器
    //       this.upLoadImage(localIds);
    //     },
    //     fail: rej => {
    //       console.log(rej);
    //     },
    //     cancel: () => {
    //       console.log("取消选择图片");
    //     }
    //   });
    // },

    // upLoadImage(localIds) {
    //   while (localIds.length) {
    //     let id = localIds.pop();
    //     wx.uploadImage({
    //       // localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
    //       localId: id,
    //       isShowProgressTips: 1, // 默认为1，显示进度提示
    //       success: res => {
    //         let serverId = res.serverId; // 返回图片的服务器端ID
    //         console.log(`====serverId===`, serverId);
    //         // this.postData.media_id.push(serverId);
    //         // this.downloadImage(serverId);

    //         //插入到编辑器
    //         // this.insertToEditor(url)
    //       },
    //       fail: rej => {
    //         console.log(rej);
    //       }
    //     });
    //   }
    // },

    // async getImgName(id) {
    //   let res = await this.$axios.get(this.$api.getWXImgName, {
    //     params: { id }
    //   });

    //   console.log(`=======`,res);
    // },

    // downloadImage(serverId) {
    //   wx.downloadImage({
    //     serverId: serverId, // 需要上传的图片的本地ID，由chooseImage接口获得
    //     isShowProgressTips: 1, // 默认为1，显示进度提示
    //     success: res => {
    //       let localId = res.localId; // 返回图片下载后的本地ID
    //       this.showImg.push(localId);
    //     },
    //     fail: rej => {
    //       console.log(rej);
    //     }
    //   });
    // },

    checkArticle(article) {
      if (article.title === "") {
        this.$toast("请输入标题");
        return false;
      }
      if (article.text === "") {
        this.$toast("请输入内容");
        return false;
      }

      return true;
    },

    onEditorChange({ editor, html, text }) {
      //富文本编辑器  文本改变时 设置字段值
      this.article.text = html;
    },

    inputTitle(args) {
      this.article.title = args.text;
      this.fn_clearInput = args.fn;
    },
    modUploadImgList(args) {
      this.article.media_id = args;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import './css/quill.core.css'
@import './css/quill.snow.css'
@import './css/quill.bubble.css'
#edi-page
  width 100vw
  height 100vh
  overflow hidden
  box-sizing border-box
  // border 1px solid blue
  font-size 0.28rem
  background-color #fff
  user-select auto
  .main-body
    width 100%
    background-color #fff
    overflow-y scroll
    .title
      display flex
      margin 0.2rem 0.2rem
      .input
        border none
        width 80%
    .box
      height 100vh
      // border 1px solid red
      .needsclick
        -webkit-touch-callout: text !important;
        -webkit-user-select: text !important;
        -khtml-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        * {
          -webkit-touch-callout: text !important;
          -webkit-user-select: text !important;
          -khtml-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }
    #textarea
      border none
      margin-top 0.2rem
      width 100%
      height 3rem
      padding 0.3rem
      font-size 0.32rem
      box-sizing border-box
      // border 1px solid yellow
    .btn-submit 
      position absolute 
      right 0.3rem
      bottom 1rem
      width 1.8rem
      height 0.8rem
      line-height 0.8rem
      text-align center
      border-radius 0.4rem
      background-image linear-gradient(#09a2a3 0%,#17babb 100%)
      color #fff 
      
</style>