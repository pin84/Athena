<template>
  <dir
    id="followSuccess"
    v-if="isClose"
  >

    <div class="main">
      <h3>关注成功</h3>
      <div class="selectGroup">
        <div
          class="select"
          @click="showGroup"
        >
          <span>{{group}}</span>
          <span
            class="directionIcon"
            ref="arrow"
          ></span>
          <!-- <span>不分组</span> -->
        </div>

        <ul
          class="list"
          v-if="isShowList"
          ref="list"
          @touchstart="touchstart"
          @touchend='touchend'
        >
          <li
            class="item"
            v-for="(item,index) in list"
            :key="index"
            ref="li"
            @click='select'
          >
            <input
              type="text"
              ref="inputGroup"
              v-model="groupList[index]"
              readonly
              @blur="inputOnBlur(index)"
            >

            <span
              class="del"
              @click="delGroup(index)"
            >删除</span>
            <span
              class="edit"
              @click="editGroup(index)"
            >编辑</span>
          </li>
          <li
            class="newGroup"
            @click="newGroup"
          >
            <button ref="newGroutBtn">+新建分组</button>
          </li>
        </ul>
      </div>
      <div class="btn">
        <span @click="submitGroup">确定</span>
        <span @click="$emit('closeFollowPanel')">取消</span>
      </div>

      <!-- <span
        class="close"
        @click="close"
      ></span> -->
    </div>
    <div
      class="createGroup"
      v-if="isShowCreateGroup"
    >
      <h4>新建分组</h4>
      <input
        type="text"
        placeholder="请输入分组名"
        v-model="createGroupName"
      >
      <div class="btn">
        <span @click="btnSubmitNewGroup">确定</span>
        <span @click="btnCancelNewGroup">取消</span>
      </div>
    </div>
  </dir>
</template>
<script>
export default {
  props: {
    company: {
      type: Object
    }
  },

  data() {
    return {
      isShowList: true, //是否显示分组
      showListFlag: false, //箭头方向的标志
      group: "" || "默认分组", //默认显示的分组名
      isClose: true, //关闭窗口
      isShowCreateGroup: false, //显示新建分组
      createGroupName: "", //新建分组的名字
      // list: ["默认分组", "渠道客户", "商机客户", "原料供应该商"]
      list: [], //存储从localStorage拿出来的分组名称
      groupList: {} //input v-model
    };
  },
  mounted() {
    let list = localStorage.getItem("companyGrout");
    this.list = list.split(",");

    this.initGroup()
    // if(this.list.length === 8){
    //   let newGroutBtn = this.$refs.newGroutBtn
    //   newGroutBtn.setAttribute('disabled','disabled')
    // }
  },
  methods: {
    editGroup(index) {
      let inputGroup = this.$refs.inputGroup[index];
      inputGroup.removeAttribute("readonly");
      inputGroup.focus();

      console.log(this.groupList[index]);
    },
    inputOnBlur(index) {
      console.log("blur==", index);
      let inputGroup = this.$refs.inputGroup[index];
      inputGroup.setAttribute("readonly", true);
    },

    delGroup(index) {
      this.list.splice(index, 1);
      this.initGroup()
    },
    
    initGroup() {
      this.list.forEach((item, index) => {
        this.groupList[index] = item;
      });
    },

    //分组成功后提交
    submitGroup() {
      console.log(this.group);
      console.log(this.company);
      this.$emit("closeFollowPanel");
    },
    //确定新建分组
    btnSubmitNewGroup() {
      this.isShowCreateGroup = false;
      this.list.push(this.createGroupName);
      localStorage.setItem("companyGrout", this.list);

      this.group = this.createGroupName;
    },
    //取消新建分组
    btnCancelNewGroup() {
      this.createGroupName = "";
      this.isShowCreateGroup = false;
    },
    //新建分组
    newGroup() {
      if (this.list.length === 8) {
        return alert("最多只能建8个分组！");
      }
      this.isShowCreateGroup = true;
      this.showGroup();
      this.createGroupName = "";
    },
    //选择分组
    select(e) {
      if (e.target.innerText === "删除" || e.target.innerText === "编辑") {
        return;
      }
      console.log(e.target.value);

      const text = e.target.value;
      this.group = text;

      // this.showGroup();
    },

    //显示分组
    showGroup() {
      let list = this.$refs.list;
      let arrow = this.$refs.arrow;
      if (!this.showListFlag) {
        arrow.style.transform = "rotate(180deg)";
        list.style.transform = "scaleY(1)";
        this.showListFlag = true;
      } else {
        list.style.transform = "scaleY(0)";
        arrow.style.transform = "rotate(0)";
        this.showListFlag = false;
      }
    },

    //以下两个touch的方法都只是改变dom的样式
    touchstart(e) {
      if (e.target.innerText !== "+新建分组") {
        return;
      }
      let clickDom = e.target;
      if (clickDom.className != "item") {
        clickDom.style.background = "#EE7621";
        return;
      }
      clickDom.style.background = "#f3f3f3";
    },
    touchend(e) {
      if (e.target.innerText !== "+新建分组") {
        return;
      }
      let clickDom = e.target;
      if (clickDom.className != "item") {
        clickDom.style.background = "#ff8800";
        return;
      }
      clickDom.style.background = "#fff";
    }
  }
};
</script>
<style lang="stylus" scoped>
#followSuccess
  position absolute
  top 0
  width 100vw
  height 70vh
  max-height 80vh
  display flex
  align-items center
  background-color rgba(0,0,0,0.6)
  .main
    position relative
    width 100%
    height 230px
    background-color #fff
    text-align center
    padding 10px 
    box-sizing border-box
    h3
      font-size 24px
      margin-top 26px
    .selectGroup
      background-color #f3f3f3
      display flex
      flex-direction column
      font-size 15px
      letter-spacing 3px
      border-radius 4px
      margin-top 20px
      position relative
      .select
        width 100%
        display flex
        justify-content space-between
        padding 0 20px 0 0
        box-sizing border-box
        span
          display inline-block
          padding 10px
        .directionIcon
          vertical-align top
          background url('../../../assets/icon/arrow.png') center no-repeat 
          transition 0.3s 
      .list
        width 100%
        height 45vh
        overflow-y: auto
        position absolute
        top 44px
        margin-top 5px
        background #fff
        transition 0.3s
        transform scaleY(0)
        transform-origin 0 0
        .item
          border-bottom 1px solid #999
          text-align left
          background #fff
          span
            padding 5px 10px
          input
            border 0
            padding 10px 10px
            border-radius 2px 
            background-color #f3f3f3
            box-sizing border-box
        .newGroup
          margin-top 10px
          text-align left
          padding 15px 0
          button 
            color #fff
            padding 10px 20px
            background-color #ff8800
            border-radius 3px
            margin-left 10px
    .btn
      display flex
      justify-content space-around
      margin-top 30px
      span
        padding 5px 20px
        border 1px solid #ccc
        border-radius 4px
        background-color #f3f3f3
    .close
      display inline-block
      width 60px
      height 60px
      background url('../../../assets/icon/close@2x.png') center   no-repeat 
      transform scale(0.5)
      position absolute
      top -55px
      right -10px
      border-radius 50%

  .createGroup
    position absolute
    width 80% 
    height 150px
    background-color #f3f3f3  
    top 50%
    left 50%
    transform translate(-50%,-50%) 
    text-align center
    padding 20px  
    box-sizing border-box
    border-radius 8px
    h4
      font-size 24px
    input
      margin 10px 0
      width 80%
      padding 5px 10px
      outline none 
      border 1px solid #ccc
    .btn
      display  flex
      justify-content space-around
      span
        padding 4px 8px
        background #ff8800
        border-radius 4px
        color #fff
      &>:last-child
        background #ccc 

</style>

