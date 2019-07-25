<template>
  <div id="searchCompany">
    <div class="search">
      <input
        type="search"
        placeholder="输入认证的企业名称"
        v-model="searchWord"
      >
      <span
        class="cancel"
        @click="cancel"
      >取消</span>
    </div>

    <ul class="list">
      <li
        class="item"
        v-for="(item,index) in searchList"
        :key="index"
        @click="selectCompany"
      >
        {{item}}
      </li>
    </ul>

    <Tips
      v-if="isShowTips"
      @closeTips='closeTips'
      :tipsText='tipsText'
    />
  </div>
</template>
<script>
import Tips from "./model/Tips";
export default {
  data() {
    return {
      companyStatus: 1, //企业的状态，0：已认证 1：未认证 2：搜不到
      tipsText: {
        tips: "" || "传给tips弹窗的文字", //传给tips弹窗的文字
        actionText: "" || "传给tips弹窗的文字" ,//传给tips弹窗的文字
        url:''
      },
      isShowTips: false, //是否显示提示窗
      searchWord: "", //输入搜索框的词
      searchList: [
        "a",
        "b",
        "c",
        "a",
        "b",
        "c",
        "a",
        "b",
        "c",
        "a",
        "b",
        "c",
        "a",
        "b",
        "c",
        "e"
      ]
    };
  },
  components: {
    Tips
  },
  created() {
    function getType(obj) {
      // var type = Object.prototype.toString

      // .call(obj)
      // .match(/^\[object (.*)\]$/)[1]
      // .toLowerCase();
      // Let "new String('')" return 'object'

      // if (type === "string" && typeof obj === "object") return "object";
      // if (obj === null) return "null";
      // if (obj === undefined) return "undefined";

      let type = String.toString(3);
      return type;
    }

    console.log(getType(["a"]));
  },
  methods: {
    selectCompany() {
      let tipsText = {};
      switch (this.companyStatus) {
        case 0:
          tipsText = {
            tips: "您搜索的企业已通过上下链认证",
            actionText: "加入认证企业",
            url: "aa"
          };
          break;
        case 1:
          tipsText = {
            tips: "您搜索的企业尚未通过上下链认证",
            actionText: "认证企业",
            url: "autConfig"
          };
          break;
        case 2:
          tipsText = {
            tips:
              "您搜索的企业已通过上下链认证您搜索的企业已通过上下链认证您搜索的企业已通过上下链认证",
            actionText: "去认证的我企业",
            url:'bb'
          };
          break;
      }

      this.tipsText = tipsText;
      this.isShowTips = true;
    },
    closeTips() {
      this.isShowTips = false;
    },
    cancel() {
      this.searchWord = "";
      this.$router.go(-1);
      // this.$store.commit("showPop", {
      //   popName: "tips",
      //   config: {
      //     text:
      //       "上下链大数据暂未收录到该企业信息 ,可查询其他企业或添加并认证为我的企业。",
      //     confirmText: "添加并认证为我的企业",
      //     confirm: () => {
      //       alert('aa')
      //       // this.$store.commit("showPop", {
      //       //   popName: "AutConfig"
      //       // });
      //     }
      //   }
      // });
    }
  }
};
</script>
<style lang="stylus" scoped>
#searchCompany
  position relative
  width 100%
  height 100vh
  overflow hidden
  background #fff
  box-sizing border-box
  font-size 0.32rem
  .search
    position absolute 
    width 100%
    background-color #fff
    top 0
    left 0
    padding 0.1rem 0.1rem
    display flex
    justify-content space-around
    align-items center
    border-bottom 1px solid #ccc
    input
      background-color #f3f3f3
      padding 0.1rem 0.05rem
      border-radius 0.05rem
      width 80%
      height 0.8rem
      border 0
      font-size 0.28rem
      text-align center
      &::placeholder
        display inline-block
        background url(../../assets/icon/dingyue/search@ccc.png)  20% no-repeat 
        width 0.4rem
        height 0.4rem
        background-size contain
    .cancel
      color #08a3a2
      padding 0.2rem
  .list
    width 100%
    height 100%
    padding 1.12rem  0.2rem
    box-sizing border-box
    overflow-y auto
    .item 
      height 1rem
      line-height 1rem
      border-bottom 1px solid #ccc
</style>
