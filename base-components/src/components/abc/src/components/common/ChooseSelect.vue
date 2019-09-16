<template >
  <div v-show="selecterState.isShow" id="com-search-list">
    <div @click="selecterState.isShow = false" class="open-mask" ></div>
    <div class="search-list-content">
      <slot name="head">
      </slot>
      <div v-if="closeBtn" @click="selecterState.isShow = false" class="close_btn">
        <img src="../../assets/icon/close@2x.png" alt="">
      </div>
      <ul class="index_list_r_tag clear w test">
          <li
            class="fl bs_bb fC1"
            v-for="(item,index) in chooseData"
            :key="index"
            :class="{active:item.active}"
            @click="select(item,index)"
            ref="item"
          >
            {{item[showProp]}}
          </li>
      </ul>

      <p class="btn_content w main_bgcolor_ffffff p_t_20 p_b_20">
        <button
          type="button"
          class="btn_110"
          style="margin-top: 0px;"
          @click="search"
        >{{btnText}}
        </button>
      </p>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    closeBtn:{
      type:Boolean,
      default:false,
    },
    selecterState:{
      type:Object,
      default:function(){
        return {
          isShow:false,
        }
      },
    },
    selectAllItem:{
      default:null,
    },
    showProp:{
      type:String,
      default:'label',
    },
    getChooseData:{
      type:Array,
      default:()=>[],
    },
    initChooseState:{
      type:Array,
      default:()=>[],
    },
    btnText:{
      type:String,
      default:'确定',
    }
    
  },

  data() {
    return {
      postData: [],
      chooseData:this.getChooseData,
    };
  },
  
  computed: {
    
  },
  created(){
  },
  beforeMount(){
    
  },
  beforeUpdate(){
  },
  watch:{
    getChooseData:{
      handler(newVal){
        // this.$set(this,'chooseData',newVal)
        this.chooseData = newVal
      },
      deep:true,

    },

    initChooseState:{
      handler(newVal){
        // this.$set(this,'chooseData',newVal)
        // this.chooseData = newVal
        let isSelect = false;
        if(this.selectAllItem){
          // let { key,value } = this.selectAllItem;
          if(this.chooseData.length-1 == newVal.length){
            let allItemIndex = this.chooseData.findIndex(ele=>{
              let bol = ele[this.showProp] === this.selectAllItem.value; 
              return  bol
            })
            this.chooseData[allItemIndex].active = true;
            isSelect = true;
          }
        }

        if(!isSelect){
          this.chooseData.forEach(ele=>{ 
            if( newVal.find( newEle=> newEle[this.showProp] === ele[this.showProp]) ){
              ele.active = true;
            }
          });
        }

      },
      deep:true,

    },
   
  },

  methods: {
    /**
     * 这个方法主要是把选择的区域传给父组件。
     */

    select(item,index) {
      if (item.active) {
        this.$delete(item, "active");
        // delete this.postData[item.id];
      } else {
        if (item[this.selectAllItem.key] === this.selectAllItem.value) {
          this.chooseData.forEach(chooseItem => {
            this.$delete(chooseItem, "active");
          });
          this.$set(item, "active", true);
          // this.postData = {};
          // this.postData[item.id] = item;
        } else {
          this.$set(item, "active", true);
          this.$delete(this.chooseData[0], "active");
          // delete this.postData["0"];
          // this.postData[item.id] = item;
        }
      }
    },

    // select(item, index) {
    //   if (item.active) {
    //     this.$delete(item, "active");
    //     delete this.postData[index];
    //   } else {
    //     this.$set(item, "active", true);
    //     this.postData[index] = item;
    //   }
    //   if (item.label === "全国") {
    //     this.area.forEach(area => {
    //       this.$delete(area, "active");
    //     });
    //     this.$set(item, "active", true);
    //     this.postData = {};
    //     this.postData[index] = item;
    //   } else {
    //     this.$delete(this.area[0], "active");
    //     delete this.postData["0"];
    //     this.postData[index] = item;
    //   }
    // },

    search() {
      this.chooseData.forEach(item => {
        if (item.active) {
          this.postData.push(item);
        }
      });
      this.$emit("isSelect", this.postData);
      this.postData.length = 0;
      this.selecterState.isShow = false;

    }
  }
};
</script>
<style lang="stylus" scoped>
#com-search-list

  img{
    width:100%;
  }

  position fixed
  left 0
  top 0
  width 100%
  height 100%
  box-sizing border-box
  background-color rgba(0,0,0,0.6)
  // background-color white
  z-index 100
  transition 0.3s
  // transform-origin 0 0
  // transform scaleY(1)

.close_btn{
  position:absolute;
  right :0;
  bottom : 102%;
  width : 0.7rem;
}

.open-mask{
  position fixed;
  background #00000060;
  left 0;
  right 0;
  top 0;
  bottom 0;

}
.search-list-content{
  position absolute;
  left 0;
  right 0;
  top 50%;
  transform translate(0,-50%);
  z-index 1;
  background white;
}
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
