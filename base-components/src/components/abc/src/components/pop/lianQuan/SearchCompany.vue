<template>
  <div id="searchCompanyWrapper">
    <div
      id="searchCompany"
      v-if='isShow'
    >
      <div class="searchBox">
        <input
          type="text"
          placeholder=" 输入要关注的企业名称"
          v-model="inputText"
          @focus='onFocus'
          @blur="onBlur"
          ref="inputbox"
        >
        <span
          class="searchIcon"
          v-if="isShowSearchIcon"
        ></span>
        <span
          class="cancel"
          @click="cancelSearch"
        >取消</span>
      </div>
      <ul class="list">
        <li
          class="item border_1px"
          v-for="(item,index) in companies"
          :key="index"
        >
          <span>{{item.name}}</span>
          <span
            class="follow"
            :class="{followed:item.status === 2}"
            @click="follow(item)"
          >{{item.status === 1 ? '+关注' :'已关注'}}</span>
        </li>
      </ul>
    </div>
    <FollowSuccess
      :company='company'
      v-if="isShowFollowSuccess"
      @closeFollowPanel='isShowFollowSuccess=false'
    />
  </div>
</template>
<script>
import FollowSuccess from "./FollowSuccess.vue";
export default {
  data() {
    return {
      isShow: true, //是否显示整个弹窗
      isShowSearchIcon: true, //是不显示放大镜图标
      inputText: "", //输入框的内容
      isShowFollowSuccess: false, //是否显示子关注成功后的弹窗
      company: undefined,
      companies: [
        {
          id: 1,
          name: "广东兴锐汽车销售有限公司",
          status: 2
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 3,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 2,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        },
        {
          id: 3,
          name: "广东兴锐汽车销售有限公司",
          status: 1
        }
      ]
    };
  },
  components: {
    FollowSuccess
  },
  methods: {
    //点击关注后跳到关注页面。并把关注的公司信息传过去
    follow(company) {
      company.status === 2 ? (company.status = 1) : (company.status = 2);
      if (company.status === 2) {
        // this.$emit("followSuccess", company); //父组件 LianQuan.vue 接收这个事件
        // this.isShow = false
        this.company = company;
        this.isShowFollowSuccess = true;
      } else {
        alert("取消关注", company);
      }
    },

    // onFocus()   onBlur()  方法控制input框的placeholder显示或不显示字符
    onFocus() {
      let inputbox = this.$refs.inputbox;
      inputbox.setAttribute("placeholder", "");
      this.isShowSearchIcon = false;
    },
    onBlur() {
      let inputbox = this.$refs.inputbox;
      inputbox.setAttribute("placeholder", "输入要关注的企业名称");
      let text = inputbox.getAttribute("placeholder");
      if (this.inputText === "") {
        this.isShowSearchIcon = true;
      }
    },
    cancelSearch() {
      this.isShow = false;
      this.inputText = "";
      this.isShowSearchIcon = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
#searchCompanyWrapper
  width 100%
  position absolute
  top 0
  #searchCompany
    width 100%
    background-color #fff
    margin-bottom 10px  
    .searchBox
      position relative
      width 100%
      border-bottom 1px solid #ccc
      padding 8px 13px
      box-sizing border-box
      input 
        outline none 
        border none
        background-color #f3f3f3
        height 35px
        width 80%
        border-radius: 2px;
        text-align center
        font-size 14px
      .searchIcon
        position absolute
        left 14%
        top 38%
        margin auto 0
        display inline-block
        width 16px 
        height 16px
        background-image url('../../../assets/icon/search.png')  
      .cancel
        padding 7px 12px
        color   #09a2a3
    .list
      width 100% 
      padding 0 10px 10px
      box-sizing border-box
      height 60vh
      overflow-y auto

      .item
        position relative
        display flex
        align-items center
        justify-content space-between
        flex-wrap wrap
        width 100%
        height 50px
        .follow
          width: 70px;
          height: 25px;
          line-height 25px
          background-color: #ff8800;
          border-radius: 3px;
          text-align center
          color #fff
          &.followed
            background-color #09a2a3


</style>
