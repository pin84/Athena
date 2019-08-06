<template>
    <!-- 企业维度 s -->
    <transition>
      <!-- isShowMainSelect 控制是否显示企业维度信息表 -->
      <div
        class="index-mainSelect"
        v-show="isShowSel.isShow"
      >
        <p
          class="index-mainSelect-close"
          @click="isShowSel.isShow=false"
        >
          <i class="iconfont">&#xe603;</i>
        </p>
        <div class="index-mainSelect-title main_color_ffffff">
          勾选常用的功能
        </div>
        <div
          class="index-mainSelect-wrapper"
          ref="mainSelect"
        >
          <ul class="w">
            <!--  mainFnBtnList： 最终获取到的企业维度信息-->
            <li
              class="index-mainSelect-sec main_color_ffffff"
              v-for="(item) of dimenData"
              :key="item.id"
            >
              <div class="weui-cells_checkbox" v-if="item.isShow">
                <label :for="item.id">
                  <div class="mar_r_20">
                    <input
                      type="checkbox"
                      class="weui-check"
                      name="checkbox1"
                      :id="item.id"
                      v-model="item.isCheck"
                      :disabled="item.isChange==false"
                    >
                    <i
                      class="iconfont"
                      :style="{'color':item.isChange?(item.isCheck?'#e3000b':'#fff'):'rgb(88, 88, 88)'}"
                    >{{item.isCheck?'&#xe632;': '&#xe681;' }}</i>
                  </div>
                  <div>{{item.title}}</div>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="index-serNote-con-btn">
          <!--- 保存维度信息 --->
          <a
            class="dis_bl main_bgcolor_ff8800 main_color_ffffff"
            style="width:100%"
            @click="saveMainFn"
          >保存</a>
        </div>
      </div>
    </transition>
  <!-- 企业维度 e -->
</template>

<script>
export default {
    
    props:{
        isShowMainSelect:{
            type:Object,
            default:{
              isShow:false
            }
        },
        dimenData:{
          type:Array,
          default:[]
        }
    },

    data(){
        return {
            // isShowMainSelect: false, //控制是否显示企业维度信息表
          isShowSel:this.isShowMainSelect,
          
        }
    },
    created(){

    },

    methods:{
        saveMainFn(){
          this.$commonFn.handleStroage.setLocalStorage('userDimen',this.dimenData)
          // 保存完毕后刷新页面
          // window.location.href="./"
          this.isShowSel.isShow = false
          this.$emit('freshMainBtn');

        }
    },

    computed:{
      isShowCom(){
        return this.isShowMainSelect;
      },
      userDimenData(){
          let newDimenData = (JSON.parse(JSON.stringify(this.dimenData)))
          newDimenData.splice(-2,2)
          return newDimenData
      }
    }

}
</script>