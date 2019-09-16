<template>

  <div id="search-list">
    <div
      class="list-title"
      @click="showList"
    >
      <span>{{title || '请输入title'}}</span>
      <i
        class="mark"
        :class="{'r':isShowList}"
      ></i>
    </div>
    <ul
      class="index_list_r_tag"
      ref="toggleList"
      :class="{'toggle-list':isShowList}"
    >
      <li
        class="fl bs_bb fC1"
        v-for="(item,index) in dataList"
        :key="index"
        :class="{active:item.active}"
        @click="select(item,index)"
        ref="item"
      >
        {{item.label}}
      </li>
    </ul>

    <!-- <p class="w main_bgcolor_ffffff p_t_20 p_b_20">
      <button
        type="button"
        class="btn_110"
        style="margin-top: 0px;"
        @click="search"
      >确定
      </button>
    </p> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    dataList: {
      type: Array,
      required: true,
      default: function() {
        return [
          {
            id: 0,
            label: "全国"
          },
          {
            id: 1,
            label: "北京市"
          },
          {
            id: 1,
            label: "北京市"
          },
          {
            id: 2,
            label: "天津市"
          }
        ];
      }
    },
    isAllowAllSelect: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      area: [
        {
          id: 0,
          label: "全国"
        },
        {
          id: 1,
          label: "北京市"
        },
        {
          id: 2,
          label: "天津市"
        },
        {
          id: 9,
          label: "上海市"
        },
        {
          id: 22,
          label: "重庆市"
        },
        {
          id: 3,
          label: "河北省"
        },
        {
          id: 4,
          label: "山西省"
        },
        {
          id: 6,
          label: "辽宁省"
        },
        {
          id: 7,
          label: "吉林省"
        },
        {
          id: 8,
          label: "黑龙江省"
        },
        {
          id: 10,
          label: "江苏省"
        },
        {
          id: 11,
          label: "浙江省"
        },
        {
          id: 12,
          label: "安徽省"
        },
        {
          id: 13,
          label: "福建省"
        },
        {
          id: 14,
          label: "江西省"
        },
        {
          id: 15,
          label: "山东省"
        },
        {
          id: 16,
          label: "河南省"
        },
        {
          id: 17,
          label: "湖北省"
        },
        {
          id: 18,
          label: "湖南省"
        },
        {
          id: 19,
          label: "广东省"
        },
        {
          id: 21,
          label: "海南省"
        },
        {
          id: 23,
          label: "四川省"
        },
        {
          id: 24,
          label: "贵州省"
        },
        {
          id: 25,
          label: "云南省"
        },
        {
          id: 27,
          label: "陕西省"
        },
        {
          id: 28,
          label: "甘肃省"
        },
        {
          id: 29,
          label: "青海省"
        },
        {
          id: 32,
          label: "台湾省"
        },
        {
          id: 5,
          label: "内蒙古自治区"
        },
        {
          id: 20,
          label: "广西壮族自治区"
        },
        {
          id: 26,
          label: "西藏自治区"
        },
        {
          id: 30,
          label: "宁夏回族自治区"
        },
        {
          id: 31,
          label: "新疆维吾尔自治区"
        }
        // {
        //   id: 33,
        //   label: "澳门"
        // },
        // {
        //   id: 34,
        //   label: "香港"
        // }
      ],
      postData: [],
      toggleList: null,
      isShowList: true
    };
  },

  mounted() {
    this.toggleList = this.$refs.toggleList;
  },

  methods: {
    /**
     * 这个方法主要是把选择的区域传给父组件。
     */

    showList() {
      this.isShowList = !this.isShowList;
      this.toggleList.scrollTop = 0;
    },

    select(item) {
      if (this.isAllowAllSelect) {
        if (item.label === this.dataList[0].label) {
          this.dataList.forEach(dataList => {
            this.$delete(dataList, "active");
          });
          this.$set(item, "active", true);
        } else {
          // this.$set(item, "active", true);
          item.active
            ? this.$delete(item, "active")
            : this.$set(item, "active", true);
          this.$delete(this.dataList[0], "active");
        }
      } else {
        item.active
          ? this.$delete(item, "active")
          : this.$set(item, "active", true);
      }
      this.$emit("selectItem", item.label);
    }

    // search() {
    //   this.dataList.forEach(item => {
    //     if (item.active) {
    //       this.postData.push(item.label);
    //     }
    //   });
    //   this.$emit("selectArea", this.postData);
    //   this.postData.length = 0;
    // }
  }
};
</script>
<style lang="stylus" scoped>
#search-list
  width 100%
  // height 100%
  box-sizing border-box
  background-color #fff
  z-index 100
  transition 0.3s
  transform-origin 0 0
  transform scaleY(1)
  padding 0.2rem
  .list-title
    font-size 0.32rem
    font-weight 600
    margin-bottom 0.2rem
    display flex
    justify-content space-between
    align-items center
    letter-spacing 0.02rem
    .mark
      display inline-block
      width 0.32rem
      height 0.32rem
      background url(../../assets/icon/userCenter/triangle-blue.png) no-repeat center
      background-size contain
      transition 0.2s
      transform rotate(180deg)
      &.r
        transform rotate(0deg)
        background url(../../assets/icon/userCenter/triangle-gray.png) no-repeat center
        background-size contain
.index_list_r_tag{
    background-color #fff
    max-height 5rem
    overflow-y auto
    box-sizing:border-box;
}
.toggle-list{
  height: 0.9rem;
  // display flex
  // justify-content space-around
  // flex-wrap wrap
  overflow: hidden;
}


.index_list_r_tag>li{
    width:31%;
    margin:0 0.2rem 0.2rem 0;
    text-align:center;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color:#f3f3f3;
    // border:1px solid #e2e2e2;
    font-size:0.28rem;
    border-radius:0.6rem;

}
.index_list_r_tag>li.active{    
    background-color #09a4a3
    // border:1px solid rgba(9,162,163,1);
    color:#fff
}
.index_list_r_tag>li:nth-of-type(3n){
    margin-right:0
}
// .active{
//   border:1px solid red;
// }
</style>
