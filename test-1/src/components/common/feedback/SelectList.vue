<template>
  <div id="select-list">
    <div class="top">
      <span
        class="type"
        @click="showList('area')"
        ref="area"
      >问题区域</span>
      <span
        class="type"
        @click="showList('type')"
        ref="type"
      >问题类型</span>
      <span
        class="type"
        @click="showList('state')"
        ref="state"
      >问题状态</span>
    </div>
    <ul
      id="list"
      v-if="isShowAreaList"
    >
      <li
        class="item"
        v-for='(item,index) in list'
        :key='index'
        @click="selectAreaItem(item)"
        :class="{'active':item.active}"
      >
        {{item.question}}
      </li>
    </ul>
    <ul
      id="list"
      v-if="isShowTypeList"
    >
      <li
        class="item"
        v-for='(item,index) in list'
        :key='index'
        @click="selectTypeItem(item)"
        :class="{'active':item.active}"
      >
        {{item.question}}
      </li>
    </ul>
    <ul
      id="list"
      v-show="isShowStateList"
    >
      <li
        class="item"
        v-for='(item,index) in list'
        :key='index'
        :class="{'active':item.active}"
        @click="selectStateItem(item)"
        @touchstart='itemTouchstart'
      >
        {{item.question}}
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  props: {
    // list: {
    //   type: Array
    // }
  },
  data() {
    return {
      isShowAreaList: false,
      isShowTypeList: false,
      isShowStateList: false,
      scaleNum: 0,
      list: [],
      listArea: [
        {
          question: "全部"
        },
        {
          question: "图谱探索"
        },
        {
          question: "订阅"
        },
        {
          question: "用户中心"
        },
        {
          question: "认证"
        },
        {
          question: "触客"
        }
      ],
      listType: [
        { question: "全部" },
        { question: "首页白屏" },
        { question: "首页数据加载失败" },
        { question: "认证企业信息无法输入" },
        { question: "认证信息提交失败" },
        { question: "界面错位" },
        { question: "列表数据加载不完整" },
        { question: "提交短信模板失败" },
        { question: "无法充值" },
        { question: "无法发送短信" },
        { question: "订阅详情无法加载" },
        { question: "采招推荐没有内容" },
        { question: "快搜结果列表都是已截标" },
        { question: "精准短信触客搜索结果不正常" }
      ],
      listState: [
        {
          question: "全部"
        },
        {
          question: "未回复"
        },
        {
          question: "已回复"
        }
      ],
      eleArea: null,
      eleType: null,
      eleState: null
    };
  },
  created() {
    this.$set(this.listArea[0], "active", true);
    this.$set(this.listType[0], "active", true);
    this.$set(this.listState[0], "active", true);
  },
  mounted() {
    this.eleArea = this.$refs.area.classList;
    this.eleType = this.$refs.type.classList;
    this.eleState = this.$refs.state.classList;
  },
  methods: {
    selectAreaItem(item) {
      this.isShowAreaList = false;
      this.comSelect(item, this.listArea);
      this.$emit("selseArea", item.question);
      this.reset(this.eleArea);
    },
    selectTypeItem(item) {
      this.isShowTypeList = false;
      this.comSelect(item, this.listType);
      this.$emit("selseType", item.question);
      this.reset(this.eleType);
    },
    selectStateItem(item) {
      this.isShowStateList = false;
      this.comSelect(item, this.listState);
      this.$emit("selseState", item.question);
      this.reset(this.eleState);
    },

    showList(flag) {
      // :style="{transform:`scaleY(${scaleNum})`}"
      // this.list = [];
      if (flag === "area") {
        this.list = this.listArea;
        this.eleType.remove("active");
        this.eleState.remove("active");
        this.reset(this.eleArea);
        this.isShowAreaList = !this.isShowAreaList;
        this.isShowTypeList = false;
        this.isShowStateList = false;
      }
      if (flag === "type") {
        this.list = this.listType;
        this.eleState.remove("active");
        this.eleArea.remove("active");
        this.reset(this.eleType);
        this.isShowTypeList = !this.isShowTypeList;
        this.isShowStateList = false;
        this.isShowAreaList = false;
      }

      if (flag === "state") {
        this.list = this.listState;
        this.eleArea.remove("active");
        this.eleType.remove("active");
        this.reset(this.eleState);
        this.isShowStateList = !this.isShowStateList;
        this.isShowTypeList = false;
        this.isShowAreaList = false;
      }
    },

    comSelect(data, list) {
      list.forEach(type => {
        if (type.active) {
          this.$delete(type, "active");
        }
      });
      this.$set(data, "active", true);
    },
    itemTouchstart() {
      console.log(`====1===`);
    },

    reset(ele) {
      ele.contains("active") ? ele.remove("active") : ele.add("active");
    }
  }
};
</script>
<style lang="stylus" scoped>
#select-list
  width 100%
  background-color #fff
  .top
    display flex
    border-bottom 1px solid #ccc
    .type
      width 100%
      font-size 0.28rem
      height 1rem
      line-height 1rem
      text-align: center;
      &::after
        display inline-block
        width 0.24rem
        height 0.24rem
        margin-left 0.2rem
        content ''
        background: url("../../../assets/icon/userCenter/triangle.png") no-repeat   center transparent
        background-size contain
        transition 0.3s
        transform rotate(0deg)
      &.active
        color #0da4a4
        &::after
          transform rotate(180deg)
  #list
    display flex
    justify-content flex-start
    align-items flex-start
    flex-wrap wrap
    min-height 2rem
    padding 0.1rem
    box-sizing border-box
    transition 0.2s
    background-color rgba(0,0,0,0.4)
    .item
      padding 0 0.2rem
      background-color #222
      border-radius 0.2rem
      margin 0.05rem 0.1rem
      color #ccc
      &.active
       color #fff
       background-color #1783E2
    
</style>

