<template>
  <div
    class="g-pop"
    @click.stop
    :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}"
  >
    <div class="u-mask"></div>
    <div class="m-bannerBg">
      <div
        class="u-close"
        @click="close"
      >
        <img
          class="icon"
          src="../../assets/icon/close@2x.png"
          alt=""
        >
      </div>
      <div class="u-iconBlock" v-if="false">
        <!-- 头部固定图标 -->
        <div class="iconbg">
          <img
            class="icon"
            src="../../assets/icon/lian@2x.png"
            alt="链"
          >
        </div>
      </div>

      <div class="m-content">
        <div class="content">
          <!-- 内容预留插槽 -->
          <slot name="pop-content">

          </slot>
        </div>
        <div
          class="close"
          @click="full"
        >关闭全屏</div>
      </div>
      <div class="m-footer">
        <!-- 底部预留插槽 -->
        <div class="com-flex fill">
          <slot name="flex-left">
            <div
              class="m-item"
              @click="close"
            >
              <span class="item-text">关闭</span>
            </div>
          </slot>
          <div
            class="m-item m-itemcenter"
            @click="full"
          >
            <i class="iconfont-mask phone item-icon-block">&#xe786;</i>
            <span class="item-text">全屏</span>
          </div>
          <slot name="flex-right">
            <div class="m-item m-itemcenter">
              <i class="iconfont-mask phone item-icon-block">&#xe6ff;</i>
              <span class="item-text">分享</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  created() {
    // 是否显示
    this.bus.$on("popIsShow", index => {
      console.clear();
      console.log("get bus");
      if (this.myIndex + "" == index + "") {
        this.item.isShow = !this.item.isShow;
      }
    });
  },
  props: {
    myIndex: {
      default: "symbol"
    },
    bgColor: {
      default: "white"
    }
  },
  data: function() {
    return {
      item: {
        isShow: false, //是否显示
        isFull: false //是否全屏
      },
      index: this.myIndex //绑定索引
    };
  },
  watch: {
    // 监听弹窗
    "$store.state.pop.call": {
      handler(newVal, oldVal) {
        // console.clear();
        // console.log(newVal,oldVal,'newVal,oldValenewVal,oldValenewVal,oldVale')
        let showing = this.$store.state.pop.showing;
        let oldShow = this.$store.state.pop.oldShow;
        // console.log(showing,oldShow,showing==oldShow,this.myIndex == showing,this.myIndex,'showingshowingshowingshowing')

        //
        // if(showing !== this.myIndex && oldShow !== this.myIndex){
        //     return;
        // }

        if (showing == oldShow && this.myIndex == showing) {
          // console.log('11111')
          this.item.isShow = !this.item.isShow;
        } else if (showing == this.myIndex) {
          // console.log('22222')
          this.item.isShow = true;
        } else if (oldShow == this.myIndex) {
          // console.log('333333')
          this.item.isShow = false;

          // titleAct
          // iconAct.classed('btnActive',false);
        }
        console.log(showing, oldShow, "hear");
      }
      // deep:true,
      // immediate: true,
    }
  },
  methods: {
    close() {
      // this.item.isShow = !this.item.isShow;
      this.$store.commit("showPop", this.myIndex);
    },
    full() {
      this.item.isFull = !this.item.isFull;
    }
  }
};
</script>
