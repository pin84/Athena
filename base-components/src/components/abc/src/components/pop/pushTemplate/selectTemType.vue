<template>
  <com-pop
    my-index="selectTemType"
    class="top_0"
  >
    <template v-slot:pop-content>
      <div id="editTemplate">
        <h3>添加模板</h3>
        <div class="selectTem">
          <h4>选择推送类型</h4>
          <div class="templateType">
            <span
              v-for='(item,index) in type' :key='index'
              :class="{active:isSelect===index}"
              @click='selectType(index,item)'

            >{{item}}</span>
          </div>
        </div>
        <div
          class="next"
          @click="next"
        >下一步</div>
      </div>
    </template>

    <template v-slot:flex-left>
      <div></div>
      <div class="m-item m-itemcenter">取消</div>
    </template>
    <template v-slot:flex-right>
      <div class="m-item footbtn">
        <div ></div>
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
      isSelect: 1,//更改激活状态
      type: ["邮件", "短信", "视频短信"]
    };
  },
  components: {
    ComPop
  },
  methods: {
    selectType(i) {
      this.isSelect = i;
    },
    next() {
      if(this.isSelect === 1){

        this.$store.commit('showPop','msgTemplate');
      }
      if(this.isSelect === 2){
        this.$store.commit('showPop','videoTemplate');

      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#editTemplate
  width 100%
  height 100vh
  background-color #fff
  padding 8px
  box-sizing border-box
  h3
    padding-top 40px
    text-align center
    font-size 18px
  .selectTem
    width 100%
    margin-top 10px
    h4
      font-size 16px
    .templateType
      width 100%
      margin-top 10px
      color #666666
      span 
        padding  2px 12px
        border 1px solid #666666
        border-radius 13px
        margin-right 12px
        &.active
          color #eb0000
          border 1px solid #eb0000
  .next
    background-color #09a2a3
    width 100%
    height 50px
    color #fff
    text-align center
    line-height 50px
    margin-top 50px
</style>
