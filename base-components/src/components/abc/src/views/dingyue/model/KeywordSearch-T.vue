<template>
  <div
    class="select-list"
    :class="{'close':!isShowList}"
  >
    <div class="select-type">
      <span @click="showList('area')">
        数据来源筛选<i :class="{active:isShowList && this.flag === 'area'}"></i>
      </span>
      <span @click="showList('keyword')">
        关键词筛选<i :class="{active:isShowList && this.flag === 'keyword'}"></i>
      </span>
    </div>
    <div
      class="main-body"
      :class="{showList:isShowList}"
    >

      <template>
        <ul class="list">
          <li
            class="item"
            v-for="(item,index) in dataList"
            :class="{'active':item.active}"
            :key="index"
            ref="keyword"
            @click="selectItem(item,index)"
          >
            {{item.label}}
          </li>
        </ul>
        <button
          class="submit"
          @click="submit"
        >
          确定
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyworDataList: {
      type: Array,
      // required:true,
      default: function() {
        return [
          {
            label: "全部"
          },
          {
            label: "abc1"
          },
          {
            label: "abc2"
          },
          {
            label: "abc3"
          },
          {
            label: "abc4"
          }
        ];
      }
    },
    areaDataList: {
      type: Array,
      // required:true,
      default: function() {
        return [
          {
            id: 0,
            label: "全国"
          }
        ];
      }
    }
  },

  data() {
    return {
      flag: null, //切换显示列表的标记(areaList or keywordList)
      dataList: [],
      isShowList: false,
      postData: {}
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {},
    showList(type) {
      if (!this.flag) {
        this.isShowList = !this.isShowList;
        this.flag = type;
        if (type === "area") {
          this.dataList = this.areaDataList;
        } else {
          this.dataList = this.keyworDataList;
        }
      } else {
        if (this.flag === type) {
          this.isShowList = !this.isShowList;
        } else {
          this.flag = type;
          this.isShowList = true;
        }

        if (type === "area") {
          this.dataList = this.areaDataList;
        } else {
          this.dataList = this.keyworDataList;
        }
      }
    },

    selectItem(item, index) {
      if (item.active) {
        this.$delete(item, "active");
      } else {
        this.$set(item, "active", true);
        if (item["label"] === this.dataList[0]["label"]) {
          this.dataList.forEach(item => this.$delete(item, "active"));
          this.$set(item, "active", true);
        } else {
          this.$delete(this.dataList[0], "active");
        }
      }
    },

    submit() {
      let postDataArr = [];
      this.dataList.forEach(item => {
        if (item.active) {
          postDataArr.push(item.label);
        }
      });

      this.isShowList = false;
      if (postDataArr[0] === this.dataList[0]["label"]) {
        postDataArr = [""];
      }
      this.$emit("submit", { [this.flag]: postDataArr });
    }
  }
};
</script>


<style lang="stylus" scoped>
.select-list
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  // padding-bottom 0.2rem
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  display block
  // display: -webkit-box;
  // -webkit-box-pack: center;
  // -webkit-box-align: center;
  // -webkit-box-orient: vertical;
  z-index: 100;
  &.close
    height 0
  .select-type
    background-color #fff
    width 100%
    padding 0.2rem
    box-sizing border-box
    display flex
    justify-content space-between
    span
      width 45%
      border 1px solid #ccc
      text-align center
      padding 0.05rem 0
      i
        display inline-block
        width 0.2rem
        height 0.2rem        
        background url(../../../assets/icon/dingyue/icon-traiDown.png) no-repeat center
        background-size contain
        margin-left 0.2rem
        transition 0.3s linear
        &.active
          transform rotate(180deg)
    // span:nth-child(1)
    //   color red
    // span:nth-child(2)
    //   color blue
  .main-body
    position relative
    width 100%
    background-color #fff
    font-size 0.28rem
    padding 0 0.2rem
    box-sizing border-box
    // transition 0.1s
    transform-origin 0 0
    transform scaleY(0)
    &.showList
      transform scaleY(1)
    .list
      width 100%
      max-height 5rem
      overflow scroll
      -webkit-overflow-scrolling touch
      display flex
      flex-wrap wrap
      
      .item
        width 28%
        text-align center
        background-color #e2e2e2
        margin 0.1rem  0.15rem
        padding 0.12rem 0
        border-radius 0.05rem
        font-size 0.24rem 
        box-sizing border-box
        border 1px solid transparent
        &.active
          background:rgba(230,255,255,1);
          border:1px solid rgba(9,162,163,1);
          color:#09A2A3
         

    .submit
      position relative
      left 50%
      transform translateX(-50%)
      width 80%
      height 1rem
      line-height 1rem
      margin 0.2rem 0
      color #ffffff
      background-color #09a4a3
      border-radius 0.1rem
      font-size 0.36rem
      text-indent 0.9rem
      letter-spacing 0.9rem
      text-align center

</style>

