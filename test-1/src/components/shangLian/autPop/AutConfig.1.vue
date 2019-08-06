<template>
  <!-- 这是企业认证中的页面 s -->
  <com-pop
    :my-index="'AutConfig'"
    class="certing"
  >
    <!-- @close="maskShow(item)" -->
    <template v-slot:pop-content>
      <!-- 这里是中间内容插槽 -->
      <div
        class="con-title"
        v-if="false"
      >企业认证</div>
      <div
        class="con-title"
        v-else
      >添加并认证我的企业</div>
      <form class="con-content certing-content i-aut-config">
        <div class="con-group">
          <div class="con-name">企业名称:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.name"
          />
        </div>
        <div class="con-group">
          <div class="con-name">统一社会信用代码:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.code"
          />
        </div>
        <div class="con-group">
          <!-- <div class="con-name">上传营业执照:(文件大小不超过500KB)</div> -->
          <!-- <input class="val" type="text" v-model="certingVal.code"/> -->
          <!-- 文件上传 s -->
          <div
            class="weui-cells weui-cells_form"
            id="uploader"
          >
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <!-- <p class="weui-uploader__title">图片上传</p> -->
                    <div class="weui-uploader__info"><span id="uploadCount">{{certingBlob ? 1 :0}}</span>/1</div>
                  </div>
                  <div class="weui-uploader__bd">
                    <ul
                      class="weui-uploader__files"
                      id="uploaderFiles"
                    ></ul>
                    <div
                      class="weui-uploader__input-box"
                      ref="inputBox"
                    >
                      <input
                        ref="getFile"
                        @change="getPic"
                        id="uploaderInput"
                        class="weui-uploader__input"
                        name=""
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 文件上传 e -->
        </div>
        <div class="con-group">
          <div class="con-name">联系人:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.contacts"
            placeholder="请输入联系人名称"
          />
        </div>
        <div class="con-group">
          <div class="con-name">联系电话:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.phone"
            placeholder="请输入联系电话"
          />
        </div>
        <div class="con-group">
          <div class="con-name">认证费用:<span class="cost">200年/年</span></div>
          <div class="des">上下链的认证审核时间为1-2个工作日，请耐心等待。</div>
        </div>
      </form>
    </template>
    <template v-slot:flex-left>
    </template>
    <template v-slot:flex-right>
      <foot-btn>
        <div
          class="radiusBtn"
          @click="saveData"
        >
          提交
        </div>
      </foot-btn>
    </template>
  </com-pop>
  <!-- 这是企业认证中的页面 e -->

</template>

<script>
import ComPop from "../../../components/common/ComPop";
import FootBtn from "../../../components/common/FootBtn";

export default {
  components: {
    ComPop,
    FootBtn
  },

  data() {
    return {
      // certingVal: {
      //   name: "",
      //   code: "",
      //   linkman: "",
      //   linkphone: ""
      // },

      certingVal: {
        name: "",
        code: "",
        contacts: "",
        phone: "",
        avatar_obj: undefined,
        identity_status: "0",
        administrator_status: "0"
      },
      certingBlob: undefined
    };
  },

  methods: {
    saveData() {
      // var formData = new FormData();
      // let file = this.$refs.getFile.files[0];

      // formData.append("username", "abc123");
      // formData.append("avatar", file);

      // console.log("===============", formData);
      // fetch("http://192.168.31.200:8000/user/QYauth/", {
      //   headers: {
      //     method: "POST",
      //     body: formData
      //   }
      // })
      //   .then(res => {
      //     console.log("=======res========", res);
      //   })
      //   .catch(error => console.error("Error:", error))
      //   .then(response => console.log("Success:", response));

      this.$axios
        .post("http://192.168.31.200:8000/user/QYauth/", {
          params: {
            name: this.certingVal.name,
            code: this.certingVal.code,
            contacts: this.certingVal.contacts,
            phone: this.certingVal.phone,
            avatar_obj: this.certingVal.avatar_obj
          }
        })
        .then(res => {
          console.log("===============", res);
        });
    },
    /**
     * 该方法用以检验图片大小 数目
     */
    picCheck() {
      // 获取input file 里面的图片数组 限制图片个数
      let file = this.$refs.getFile.files,
        len = file.length;
      if (len > 0 && len < 2) {
        let size = file[0].size,
          fileSize = 1024 * 500, // 限制图片大小 假如超过500kb 则无效
          fileName = file[0].name, //获取文件名
          fileNamearr = fileName.split("."),
          //获取截取的最后一个字符串，即为后缀名
          suffix = fileNamearr[fileNamearr.length - 1],
          type = "jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF",
          res = type.indexOf(suffix);

        if (res >= 0) {
          // 假如文件类型正确
          if (size > fileSize) {
            return "文件大小超过 500kb";
          } else if (size <= 0) {
            return "文件大小不能为0";
          } else {
            return true;
          }
        } else {
          return "文件格式错误 请图片传输以下格式:" + type;
        }
      } else if (len >= 2) {
        return "只能传一张图片";
      } else if (len == 0) {
        return "目前并没有选择图片哦";
      }
    },

    getPic() {
      let res = this.picCheck();
      let file = this.$refs.getFile.files[0];

      //保存到变量，以传给后台
      this.certingVal.avatar_obj = file;

      //以下把上传的图片用base64位显示在页面中
      if (res !== true) {
        alert(res);
      } else {
        let inputBox = this.$refs.inputBox;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          let dataURL = e.target.result;
          //上传图片后设置为背景图片
          let url = `url(${dataURL})`;
          inputBox.style.backgroundImage = url;
          inputBox.classList.add("uploadBG");

          //把二进制图片保存到 picBlob 以传给后台
          // let picBlob = this.convertBase64UrlToBlob(dataURL,file.type);
          // this.certingBlob = picBlob;
        };
      }
    },
    convertBase64UrlToBlob(urlData, type) {
      var bytes = window.atob(urlData.split(",")[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: type });
    }
  }
};
</script>

<style lang="stylus" scoped>
.i-aut-config
  width 100%
  .uploadBG
    background-repeat no-repeat
    background-position center
    background-size contain
    &::after
      background-color transparent
    &::before
      background-color transparent
</style>
