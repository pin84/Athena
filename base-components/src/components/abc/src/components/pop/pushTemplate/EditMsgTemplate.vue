<template>
  <com-pop
    my-index="editMsgTemplate"
    class="top_0"
    @params='propsData'
  >
    <template v-slot:pop-content>
      <div id="myTemplate">
        <h3>编辑模板</h3>
        <input
          type="text"
          class="temTitle"
          :placeholder="placeholder.temTitle"
          ref="tem_input"
          v-model="propsDatas.temTitle"
        >
        <input
          type="text"
          class="typeTitle"
          :placeholder="placeholder.typeTitle"
          ref="type_input"
          v-model="propsDatas.typeTitle"
        >
        <div class="areaInput">
          <textarea
            name=""
            id="textarea"
            :placeholder='placeholder.content'
            ref="textarea"
            @input='limitInput'
            v-model="propsDatas.content"
          ></textarea>
          <div class="res">还可输入{{res}}个字</div>
        </div>

        <div class="uploadIMG">
          <span>上传图片：</span>
          <span class="showIMG">
            <canvas
              width="55"
              height="55"
              id="canvas_1"
            ></canvas>
            <label
              for="uploadIMGa"
              ref="uploadLabel"
            ></label>
            <input
              type="file"
              id="uploadIMGa"
              ref="uploadIMG"
              @change="uploadIMGa"
              hidden
            >

          </span>
        </div>
        <div class="option">
          <span>附件：</span>
          <label
            for="uploadOptionsa"
            class="option_label"
          >添加附件</label>
          <span>{{optionFile}}</span>
          <input
            type="file"
            id="uploadOptionsa"
            ref="uploadOption"
            @change='uploadOption'
            hidden
          >
        </div>
      </div>
    </template>

    <template v-slot:flex-left>
      <div></div>
      <div class="m-item m-itemcenter">返回</div>
    </template>
    <template v-slot:flex-right>
      <div
        class="m-item footbtn"
        @click="saveTem"
      >
        <div class="radiusBtn">
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
        typeTitle: "请输入短信标题",
        content: "请输入短信内容"
      },
      totalInput: 100, //textarea的最大输入数
      res: 100, //textarea的输入剩余数
      curText: "", //当前输入的值
      imgObj: new Image(), //装载input上传的图片
      optionFile: "", //保存上传的附件的名字
      propsDatas: {
        temTitle: "",
        typeTitle: "",
        content: ""
      }
    };
  },
  watch: {
    "$store.state.pop.showing": {
      handler(newVal, oldVal) {
        console.clear();
        console.log(newVal, oldVal);
      }
    }
  },
  mounted() {
    // this.textarea_input = this.
  },
  components: {
    ComPop
  },
  methods: {
    propsData(tem) {
      console.log("======", tem);
      this.propsDatas.temTitle = tem["模板名称"];
      this.propsDatas.title = tem["模板名称"];
      this.propsDatas.content = tem["content"];
    },
    uploadOption() {
      //上传附件
      let optionFile = this.$refs.uploadOption.files[0];
      this.optionFile = optionFile.name;

      var reader = new FileReader();
      reader.readAsDataURL(optionFile);
      reader.onload = e => {
        let blob = this.convertBase64UrlToBlob(e.target.result);
        console.log(blob);
      };
    },

    /*转成二进制对象*/
    convertBase64UrlToBlob(urlData) {
      var bytes = window.atob(urlData.split(",")[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab]);
    },

    uploadIMGa() {
      //上传图片
      let inputImg = this.$refs.uploadIMG;
      let imgSize = inputImg.files[0].size;
      if (imgSize > 15000) {
        alert("图像过大");
        return;
      }
      let canvas = document.getElementById("canvas_1");
      this.inputToCanvas(inputImg, canvas, this.imgObj);

      //canvas to blob
      canvas.toBlob((blob)=>{
        console.log(blob);
      })


      let uploadLabel = this.$refs.uploadLabel;
      uploadLabel.style.background =
        "url(../../../assets/icon/option.png) center no-repeat";
    },

    //input输入图片并在canvas中显示，接收三个参数,input,canvas,Image()
    inputToCanvas(domInput, domCanvas, imgObj) {
      let reader = new FileReader();
      reader.readAsDataURL(domInput.files[0]);
      reader.onload = e => {
        imgObj.src = e.target.result;
      };

      imgObj.onload = () => {
        // let canvasCtx = document.getElementById("canvasa").getContext("2d");
        let canvasCtx = domCanvas.getContext("2d");
        canvasCtx.clearRect(0, 0, domCanvas.width, domCanvas.height);
        canvasCtx.drawImage(imgObj, 0, 0, domCanvas.width, domCanvas.height);
      };
    },

    limitInput() {
      let len = this.$refs.textarea.value.length;
      this.res = this.totalInput - len;

      if (this.res === 90) {
        this.curText = this.$refs.textarea.value;
      }
      if (this.res < 90) {
        this.$refs.textarea.value = this.curText;
      }
    },
    saveTem() {
      this.testInput();
      console.log("=======", this.propsDatas);
    },
    testInput() {
      let reArr = ["a", "中国", 5];
      let str;
      reArr.forEach(item => {
        str += item + "|";
      });
      str = str.replace("undefined", "");
      let str_1 = str.substring(0, str.length - 1);
      let re = new RegExp(`${str_1}`, "g");

      let tem_input = this.$refs.tem_input.value;
      let type_input = this.$refs.type_input.value;
      let textarea_input = this.$refs.textarea.value;

      tem_input.replace(re, a => {
        // console.log(a+'为敏感词，请更换');
        alert([a] + "为敏感词，请更换");
      });
      type_input.replace(re, a => {
        // console.log(a+'为敏感词，请更换');
      });
      textarea_input.replace(re, a => {
        // console.log(a+'为敏感词，请更换');
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#myTemplate
  width 100%
  height 100vh
  background-color #fff
  padding 40px 10px 10px  10px
  box-sizing border-box
  h3
    text-align center
    font-size 18px
    padding 10px 0
  .areaInput
    width 100%
    position relative
    .res
      position absolute
      bottom 15px
      right 0
      font-size 10px
  .uploadIMG
    width 100%
    span 
      height 55px
      line-height 55px
    .showIMG
      position relative
      display inline-block
      width 55px
      height 55px 
      label
        display inline-block
        width 55px
        height 55px
        border 1px solid #ccc
        background url('../../../assets/icon/increase@32.png') center no-repeat
        background-color transparent
        position absolute
        vertical-align top
        top 0
        left 0
      #canvas_1
        vertical-align top  
        border 1px solid red
  .option
    width 100%
    font-size 14px
    margin 10px 0
    .option_label
      display inline-block
      color  #0782c9
      width 80px
      height 16px
      padding-left 16px
      line-height 16px
      background url('../../../assets/icon/option.png') left no-repeat
      vertical-align center
      // &::after
      //   content 'aaa'

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
