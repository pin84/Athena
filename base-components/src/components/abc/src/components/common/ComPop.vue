<template>
  <div
    class="g-pop"
    @click.stop
    :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}"
    :style="popShow"
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
      <div
        class="u-iconBlock"
        v-if="headShow"
        v-show="!item.isFull"
      >
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
            v-show="fullBtn"
          >
            <i class="iconfont-mask phone item-icon-block">&#xe786;</i>
            <span class="item-text"  >全屏</span>
          </div>
          <slot name="flex-right">
            <div class="m-item m-itemcenter" @click="openShare">
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

let vm = null;
export default {
  beforeCreate() {
    vm = this;
  },
  created() {
    // this.$store.commit('untilRegister',this.myIndex)
    // console.log(this.$store.state.pop.componentList)
    // 是否显示
    this.bus.$on("popIsShow", index => {
      console.clear();
      console.log("get bus");
      if (this.myIndex + "" == index + "") {
        this.item.isShow = !this.item.isShow;
      }
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  props: {
    myIndex: {
      default: "symbol"
    },
    headShow: {
      default: true,
      type: Boolean
    },
    fullBtn:{
      default:true,
      type:Boolean
    },
    shareFunc:{
      default:function(){},
      type:Function
    },

    // bgColor: {
    //   default: "white"
    // }
  },
  data: function() {
    return {
      item: {
        isShow: false, //是否显示
        isFull: false //是否全屏
      },
      index: this.myIndex, //绑定索引
      scrollTopNum:document.scrollingElement.scrollTop,
      topNum:0,
      botNum:0,
    };
  },
  computed: {
    isShowState() {
      console.log(
        this.myIndex,
        this.$store.state.pop.componentList[this.myIndex]
      );
      return this.$store.state.pop.componentList[this.myIndex];
      // return companyState;
    },

    popShow(){
      let top = `-200%`,
          bottom = `200%`;
      
      if(this.item.isShow){
        top = this.topNum;
        bottom = this.botNum;
      }

      return {
        top,
        bottom,
      }
    },

  },
  watch: {
    
    // 监听弹窗
    "$store.state.pop.call": {
      handler(newVal, oldVal) {
        let showing = this.$store.state.pop.showing;
        let oldShow = this.$store.state.pop.oldShow;

        if (showing == oldShow && this.myIndex == showing) {
          this.item.isShow = !this.item.isShow;
          this.$emit("comPopShow", this.item.isShow);
        } else if (showing == this.myIndex) {
          this.item.isShow = true;
          this.$emit("comPopShow", true);
        } else if (oldShow == this.myIndex) {
          this.item.isShow = false;
          this.$emit("comPopShow", false);
        }
      }
    },
    "item.isShow": {
      handler(newVal) {
        if (newVal) {
          this.$emit("params", this.$store.state.pop.params);
          this.$store.commit("popClose", this.myIndex);
        }
      }
    }
    // '$store.state.pop.componentList.CompanyList':{
    //   handler(newVal,oldVal){

    //     console.log(newVal,oldVal);
    //     // console.log(this)
    //   },
    //   deep:true,
    //   // immediate:true
    // }
    // isShowState:{
    //   handler(newVal){
    //     console.clear()
    //     console.log(newVal);

    //   },
    //   deep:true,
    // },
  },

  methods: {

    handleScroll: function () {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
        
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;; // div 到头部的距离
        
        this.topNum = scrollTop+'px';
        this.botNum = -scrollTop+'px';
    },
 
    close() {
      // this.item.isShow = !this.item.isShow;
      this.$store.commit("showPop", {
        popName: this.myIndex
      });
    },
    full() {
      this.item.isFull = !this.item.isFull;
      // return this.item.isFull
    },

    openShare(){
      this.shareFunc();
      this.bus.$emit('shareMaskShow',true);
      
    },

  }
};
</script>
