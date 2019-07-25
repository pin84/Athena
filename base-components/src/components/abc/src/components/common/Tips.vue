<template>
  <div
    class="tips-pop"
    @click.stop
    :class="{'tips-show':item.isShow}"
  >
    <div class="u-mask"></div>
    <div class="m-bannerBg">
      <div
        class="u-close"
        @click="close(),cancel()"

      >
        <img
          class="icon"
          src="@/assets/icon/close@2x.png"
          alt=""
        >
      </div>
      <div class="m-content">
        <!-- <slot></slot> -->
        {{text}}
      </div>
      <slot name="tips-btn">
        <a
          @click="confirm(),close()"
          class="u-reset weui-btn weui-btn_primary"
        >确认</a>
      </slot>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
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
      text: ""
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
        // console.clear();
        // console.log(newVal,oldVal,'newVal,oldValenewVal,oldValenewVal,oldVale')
        let popData = this.$store.state.pop,
          { showing, oldShow, config } = popData;

        // console.log(showing,oldShow,showing==oldShow,this.myIndex == showing,this.myIndex,'showingshowingshowingshowing')

        //
        // if(showing !== this.myIndex && oldShow !== this.myIndex){
        //     return;
        // }

        if (showing == oldShow && this.myIndex == showing) {
          // console.log('11111')
          this.item.isShow = !this.item.isShow;
        } else if (showing == this.myIndex) {
          //将传入的确认功能 取消功能 文本内容分别传入到提示框内
          this.item.isShow = true;
          let { confirm, cancel, text } = config;
          this.confirm = confirm;
          // this.cancel = cancel;
          this.text = text;
        } else if (oldShow == this.myIndex) {
          this.item.isShow = false;

          // titleAct
          // iconAct.classed('btnActive',false);
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
</style>
