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
      <div class="u-iconBlock" v-if="headShow" v-show="!item.isFull">
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
            
            <router-view></router-view>

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
  data() {
    return {
        item: {
            isShow: true, //是否显示
            isFull: false //是否全屏
        },
        index: this.myIndex, //绑定索引
    }
  },
  methods:{
      close() {
        this.item.isShow = false;
        
      },
      full() {
        this.item.isFull = !this.item.isFull;
        // return this.item.isFull
      }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
