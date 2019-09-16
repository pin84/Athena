<template>
  <div id="search-list" v-if="isShow">
    <ul class="index_list_r_tag clear w test">
      <li
        class="fl bs_bb fC1"
        v-for="(item,index) in dataList"
        :key="index"
        :class="{active:item.active}"
        @click="select(item,index)"
        ref="item"
      >{{item.label}}</li>
    </ul>

    <p class="w main_bgcolor_ffffff p_t_20 p_b_20">
      <button type="button" class="btn_110" style="margin-top: 0px;" @click="search">确定</button>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: []
    },
    isShow: false
    // keyword: {
    //   type: Array,
    //   default: function() {
    //     return [];
    //   }
    // }
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
      postData: []
    };
  },

  methods: {
    /**
     * 这个方法主要是把选择的区域传给父组件。
     */

    select(item) {
      let arr = ["全国", "全行业", "全选"];

      // if (arr.includes(item.label)) {
      //   this.dataList.forEach(i => {
      //     this.$set(i, "active", false);
      //   });
      //   this.$set(item, "active", true);
      // } else {
      //   this.$set(item, "active", true);
      //   this.$set(this.dataList[0], "active", false);
      // }

      item.active
        ? this.$set(item, "active", false)
        : this.$set(item, "active", true);

      if (arr.includes(item.label)) {
        this.dataList.forEach(i => {
          this.$set(i, "active", false);
        });
        this.$set(item, "active", true);
      } else {
        this.$set(this.dataList[0], "active", false);
      }
    },

    search() {
      this.dataList.forEach(item => {
        if (item.active) {
          this.postData.push(item.label);
        }
      });
      this.$emit("selectArea", this.postData);
      this.postData.length = 0;
    }
  }
};
</script>
<style lang="stylus" scoped>
#search-list
  position absolute
  width 95%
  // height 100vh
  box-sizing border-box
  background-color rgba(0,0,0,0.6)
  z-index 100
  transition 0.3s
  transform-origin 0 0
  transform scaleY(1)
  color black


.index_list_r_tag{
    background-color #fff
    height 5rem
    overflow-y auto
    padding:0.18rem;
    box-sizing:border-box;
    // margin-top:0.2rem
}
.index_list_r_tag>li{
    width:27.9%;
    margin:0 8.15% 0.2rem 0;
    text-align:center;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color:#e2e2e2;
    border:1px solid #e2e2e2;
    font-size:0.24rem;
    border-radius:0.08rem;

}
.index_list_r_tag>li.active{    
    background:rgba(230,255,255,1);
    border:1px solid rgba(9,162,163,1);
    color:#09A2A3
}
.index_list_r_tag>li:nth-of-type(3n){
    margin-right:0
}
// .active{
//   border:1px solid red;
// }
</style>
