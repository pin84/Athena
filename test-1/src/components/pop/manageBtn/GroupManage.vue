<template>
  <div id="groupManage" v-if="isShowGroupManage">
    <div class="g-container">
      <h2>分组管理</h2>
      <ul class="list">
        <li
          class="item"
          v-for='(item,index) in group'
          :key='index'
        >
          <span
            class="del"
            :class="{hidden:index === 0}"
            @click="delGroup(index)"
            ref="del"
          ></span>
          <input
            class="text"
            type="text"
            v-model="group[index]"
            ref="input"
          />
        </li>
      </ul>
      <div class="btn">
        <span @click="newGroup">+新建分组</span>
        <span @click="saveGroup">保存</span>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowGroupManage:true,
      group: ["默认分组", "商机客户了", "原材料供应商", "渠道客户"]
    };
  },
  methods: {
    saveGroup() {
      console.log(this.group);
    },
    newGroup() {
      if (this.group.length === 8) {
        return alert("最多只能添加8个分组！");
      }
      this.group.splice(1, 0, "");
      let input = this.$refs.input;
      input[1].focus();
    },
    delGroup(index) {
      // let del = this.$refs.del[index];
      // del.style.transform = "rotate(90deg)";
      this.group.splice(index, 1);
    },
    close(){
      this.isShowGroupManage = false
    },
  }
};
</script>
<style lang="stylus" scoped>
#groupManage
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0,0,0,0.6)
  box-sizing border-box
  .g-container
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%) 
    width 96vw
    height 320px
    background-color #fff
    border-radius 5px
    padding 5px
    box-sizing border-box
    h2
      text-align center
      font-size 24px
      padding 10px 0
    .list
      height 200px
      overflow-y auto
      .item 
        background-color #f3f3f3
        margin-bottom 10px
        height 36px
        line-height 36px  
        display flex
        align-items center
        .del
          display inline-block
          width 20px
          height 20px
          background red
          margin 0 15px
          border-radius 50%
          position relative
          transition 0.5s
          &::before
            position absolute 
            top 50%
            left 50%
            transform translate(-50%,-50%) 
            display inline-block
            content ''
            width 16px
            height 3px
            background-color #fff
          &.hidden
            visibility hidden  
        .text
          border 0
          padding 5px 0px
          background-color #f3f3f3
    .btn  
      width 100%
      display flex
      justify-content space-around
      margin-top 10px
      span 
        display inline-block
        color #ffffff
        background-color #09a2a3
        width 30%
        height 40px
        text-align center
        line-height 40px
        margin-right 15px
        border-radius 3px
      &>:first-child
        background-color #fa8500
    .close
      position absolute 
      width 20px
      height 20px
      right 0
      top -25px
      border-radius 50%
      background url('../../../assets/icon/cancel.png')    center no-repeat  
      // transform scale(1.1)
</style>

