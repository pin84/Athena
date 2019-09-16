<template>
  <div id="edi-page">
    <div class="main-body">
      <Publish @inputText="inputText" :val="article.title" />

      <!-- <textarea name id="textarea" placeholder="请输入内容......" v-model="article.text"></textarea>

      <UploadImg :imgList="article.pic" @modUploadImgList="modUploadImgList" />-->

      <div class="box">
        <quill-editor
          ref="QuillEditor"
          :content="article.text"
          @change="onEditorChange($event)"
          :options="editorOption"
        ></quill-editor>
      </div>

      <div class="btn-submit" @click="save">保存</div>
    </div>
  </div>
</template>
<script>
import Publish from "./Publish";
import UploadImg from "./UploadImg";
import { quillEditor } from "vue-quill-editor";
import { setTimeout } from "timers";

export default {
  data() {
    let toolbarOptions = [
      [{ size: ["small", false, "large"] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ];

    return {
      core: "",
      id: "",
      user_id: "",
      company_name: "",
      company_id: "",
      val: "", //传给 input 框的值
      article: {
        // id: 1,
        // text: "",
        // imgList: [
        //   "../../assets/icon/lian.jpg",
        //   "../../assets/icon/lian.jpg",
        //   "../../assets/icon/lian.jpg"
        // ]
        title: ""
      },
      UploadImgList: [], //保存要上传的图片id
      FN_clearInput: null, //保存由 input 框组件传过来的清空输入框的方法

      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: this.imgHandler
            }
          }
        }
      },

      getImgList: []
    };
  },

  components: {
    Publish,
    UploadImg,
    quillEditor
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.user_id = this.$route.query.user_id;
    this.company_name = this.$route.query.company_name;
    this.company_id = this.$route.query.company_id;
    this.initData(id);

    //内核判断
    this.core = this.$commonFn.coreJudge();
  },
  methods: {
    imgHandler() {
      if (this.core === "computer") {
        this.sendImgFunc();
      } else {
        this.chooseImg();
      }
    },

    save() {
      if (this.core === "computer") {
        this.computerSave();
      } else {
        this.phoneSave();
      }
    },

    chooseImg() {
      // if (this.showImg.length >= 3) {
      //   this.$toast("最多只能上传3张图片");
      //   return;
      // }
       console.log(`=====edite=手机端=`,);
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          console.log(`==localIds--------------=====`, localIds);

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
            // this.postData.media_id.push(serverId);
            // this.downloadImage(serverId);

            this.arr = [];

            this.arr.push(serverId);

            let d = {
              user_id: this.$store.state.loginInfo.userInfo.user_id,
              media_id: this.arr
            };
            this.getImgName(d);
            // console.log(`===00====`, tem);
          },
          fail: rej => {
            console.log(rej);
          }
        });
      }
    },

    async getImgName(d) {
      let res = await this.$axios.post(this.$api.getWXImgName, d);
      let imgName = res.data.str_data[0];
      let baseurl = "http://47.106.105.213:8000/index/save/pic?pic=";
      this.insertToEditor(baseurl + imgName);
    },

    insertToEditor(url) {
      console.log(`====url===`, url);
      let { quill } = this.$refs.QuillEditor;
      // push image url to rich editor.
      const range = quill.getSelection();
      // quill.insertEmbed(range.index, "image", `${app.serverAddr}${url}`);
      quill.insertEmbed(range.index, "image", url);

      // quill editor add image handler
      // quill.getModule("toolbar").addHandler("image", () => {
      //   selectLocalImage();
      // });
    },

    async phoneSave() {
      let tem = {
        id: this.id,
        user_id: this.user_id,
        company_name: this.company_name,
        company_id: this.company_id
      };

      let d = Object.assign(this.article, tem);

      let res = await this.$axios.post(this.$api.modArticle, d);

      this.$toast("保存成功");
      setTimeout(() => {
        this.$router.push({
          path: "./special",
          query: { ctype: this.$route.query.ctype }
        });
      }, 1000);
    },

   

    // 富文本编辑器图片传输回调
    async sendImgFunc(value) {
      console.log(`=====edite=电脑端=`,);
      let quill = this.$refs.QuillEditor.quill;
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

    async computerSave() {
      console.log(`====电脑端===`,);
      let fd = new FormData();
      let toSaveImgList = document.querySelectorAll("img[data-src]");
      let getImgLinkArr = [];
      if (toSaveImgList.length !== 0) {
        [].forEach.call(toSaveImgList, (ele, index) => {
          let dataSrc = ele.getAttribute("data-src");
          let imgIndex = dataSrc.slice(3);
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
      // this.FN_clearInput();
      console.log(`=======`, this.article);

      // if (this.UploadImgList.length !== 0) {
      //   this.article.imgList = this.article.imgList.concat(this.UploadImgList);
      // }

      let tem = {
        id: this.id,
        user_id: this.user_id,
        // company_id: this.company_id，
         company_name: this.company_name,
      };

      let d = Object.assign(this.article, tem);
      console.log(`=======`, d);

      let res = await this.$axios.post(this.$api.modArticle, d);

      this.$router.push({
        path: "./special",
        query: { ctype: this.$route.query.ctype }
      });

      console.log(`=res======`, res);
      // this.article = {};
    },


    onEditorChange({ editor, html, text }) {
      //富文本编辑器  文本改变时 设置字段值
      this.article.text = html;
    },
    inputText(obj) {
      this.article.title = obj.text;
      this.FN_clearInput = obj.fn;
    },
    modUploadImgList(args) {
      console.log(`===args====`, args);
      this.UploadImgList = args;
    },

    async initData(id) {
      let d = {
        id,
        company_name: this.company_name
      };
      let { data } = await this.$axios.get(this.$api.getArticle, {
        params: d
      });

      this.article = data.introduct;

      if (data.introduct.pic === null) {
        data.introduct.pic = [];
      }
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
  .main-body
    width 100%
    background-color #fff
    overflow-y scroll
    #textarea
      border none
      margin-top 0.2rem
      width 100%
      height 3rem
      padding 0.3rem
      font-size 0.32rem
      box-sizing border-box
      // border 1px solid yellow
    .box
      height 100vh
      // padding-bottom 4rem
    .btn-submit 
      position absolute 
      right 0.5rem
      bottom 1.5rem
      width 1.8rem
      height 0.8rem
      line-height 0.8rem
      text-align center
      border-radius 0.4rem
      background-image linear-gradient(#09a2a3 0%,#17babb 100%)
      color #fff 
      
</style>