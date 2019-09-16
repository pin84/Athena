<template>
  <div id="select-list">
    <!-- <div class="top" v-if="false">
      <span class="type" @click="showList('area')" ref="area">问题区域</span>
      <span class="type" @click="showList('type')" ref="type">问题类型</span>
      <span class="type" @click="showList('state')" ref="state">问题状态</span>
    </div>-->
    <ul id="list" v-if="isShow">
      <li
        class="item"
        v-for="(item,index) in dataList"
        :key="index"
        @click="selectItem(index)"
        :class="{'active':index === i}"
      >{{item}}</li>
    </ul>
    <div class="selectTime" v-if="isShowSelectTime && isShow ">
      <div class="time-box">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label for class="weui-label">起：</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="date" value v-model="startTime" ref="input" />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label for class="weui-label">止：</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="date" value v-model="endTime" />
          </div>
        </div>
      </div>
      <button class="btn" @click="selectTime">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array
    },
    isShow: false
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      isShowSelectTime: false,
      i: null
    };
  },
  
  created() {},
  mounted() {},
  methods: {
    selectItem(i) {
      this.i = i;
      if (i === 0) {
        this.isShowSelectTime = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
        return;
      } else {
        this.isShowSelectTime = false;
      }
      this.$listeners.listenFn(this.dataList[i]);
    },
    selectTime() {
      this.isShowSelectTime = false;
      this.$listeners.listenFn({ start: this.startTime, end: this.endTime });
    }
  }
};
</script>
<style lang="stylus" scoped>
#select-list
  position absolute
  width 100%
  // height 100vh
  background-color #fff
  box-sizing border-box
  // .top
  //   display flex
  //   border-bottom 1px solid #ccc
  //   .type
  //     width 100%
  //     font-size 0.28rem
  //     height 1rem
  //     line-height 1rem
  //     text-align: center;
  //     &::after
  //       display inline-block
  //       width 0.24rem
  //       height 0.24rem
  //       margin-left 0.2rem
  //       content ''
  //       background: url("../../../assets/icon/userCenter/triangle.png") no-repeat   center transparent
  //       background-size contain
  //       transition 0.3s
  //       transform rotate(0deg)
  //     &.active
  //       color #0da4a4
  //       &::after
  //         transform rotate(180deg)
  #list
    display flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    padding 0.15rem 0.1rem 0.1rem 0.1rem
    box-sizing border-box
    transition 0.2s
    background-color rgba(0,0,0,0.4)
    .item
      padding 0.05rem 0.2rem
      background-color #222
      border-radius 0.3rem
      margin 0.1rem 0.1rem
      color #ccc
      &.active
       color #fff
       background-color #1783E2
  .selectTime
    display flex  
    flex-direction column   
    justify-content center
    align-items center
    background-color #fff
    padding 0.2rem
    box-shadow 0 2px 2px  2px  #ccc
    .time-box
      width 100%
      display flex
      // padding 0 0.2rem
      box-sizing border-box
      .weui-cell
        // width 50%
        padding 0.1rem 0
        .weui-label
          width 100%
          margin-left 0.1rem
          // border 1px solid red
    .btn
      margin-top 0.2rem
      width 60%
      height 0.8rem
      line-height 0.8rem
      background-color #09a4a3 
      border-radius 0.4rem
      color #fff 
</style>

