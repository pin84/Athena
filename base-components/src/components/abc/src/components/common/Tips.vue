<template>
  <div class="tips-pop" id="tips-pop-style" @click.stop :class="{'tips-show':item.isShow}">
    <div class="u-mask"></div>
    <div class="m-bannerBg">
      <div class="u-close" @click="close(),cancel()">
        <img class="icon" src="@/assets/icon/close@2x.png" alt />
      </div>
      <div class="m-content">
        <!-- <slot></slot> -->
        {{text}}
      </div>

      <div class="flex-layout">
      <!-- <slot name="tips-btn"></slot> -->
        <a v-show="confirmBtn" @click="confirm(),close()" :style="cancelBtn?`width:40%;`:''"  class="u-reset weui-btn weui-btn_primary">确认</a>
        <a v-show="cancelBtn" @click="cancel(),close()" :style="cancelBtn?`width:40%;`:''" class="u-reset weui-btn weui-btn_primary">取消</a>
      </div>
    </div>
  </div>
</template>



<script>

export default {
  name: "tips",
  props: {},
  data() {
    return {
      editNum: this.getEditNum,
      idIndex: 0,
      addVal: this.setAddVal,
      placeHolder: this.setPlaceHolder,
      item: {
        isShow: false
      },
      myIndex: "tips", //弹窗名
      text: "",
      confirmBtn:true,
      cancelBtn: false,
    };
  },
  created() {
    /*stateControl.$on('tips',()=>{
          this.isShow = !this.isShow;
      })*/
  },
  computed: {},
  methods: {
    close() {
      this.item.isShow = !this.item.isShow;
    },
    confirm() {},
    cancel() {}
  },
  watch: {
    // 监听弹窗
    "$store.state.pop.call": {
      handler(newVal, oldVal) {
        let popData = this.$store.state.pop,
          { showing, oldShow, config } = popData;

        if (showing == oldShow && this.myIndex == showing) {
          this.item.isShow = !this.item.isShow;
        } else if (showing == this.myIndex) {
          //将传入的确认功能 取消功能 文本内容分别传入到提示框内
          this.item.isShow = true;
          
        } else if (oldShow == this.myIndex) {
          this.item.isShow = false;
          // titleAct
          // iconAct.classed('btnActive',false);
        }
        if(this.item.isShow == true){
          let { confirm, cancel, text, cancelBtn } = config;
          this.confirm = confirm;
          this.cancelBtn = cancelBtn;
          this.cancel = cancel;
          this.text = text;

        }
        console.log(showing, oldShow, "hear");
      }
      // deep:true,
      // immediate: true,
    }
  }
};
</script>

<style scoped lang="scss">
  #tips-pop-style{
    z-index: 1000;
  }
  .flex-layout{
    display: flex;
    align-items: center;
    justify-content: space-around;

    .u-reset{
      margin:0;

    }
  }
  // u-reset weui-btn weui-btn_primary
  
</style>
