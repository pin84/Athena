<template>

  <div class='flowWindow_wrap'>
    <div>
      <div class='flowWindow_title'>{{title}}</div>
      <div class='flowWindow_con'>
        <div class="h clear">
          <label
            class="dis_bl fl tx-c"
            v-for="(item,index) of idata"
            :key="index"
          >
            <input type="checkbox" />
            <span
              ref="areaSpan"
              :class="{cbSelect:true, fC1:true}"
              @click="checkboxSel(index)"
            >{{item.name}}</span>
          </label>
        </div>
      </div>
      <button
        class='flowWindow_btn dis_bl'
        type="button"
        @click="confirmFlowWindow"
      >确定</button>
    </div>
    <a
      class="wrap_close flowWindow_wrap_close dis_bl"
      @click="closeFlowWindow"
    ></a>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  props: {
    title: {},
    idata:{
      type:Array
    }
  },
  data() {
    return {
       postData:{}
    };
  },
  methods: {
    closeFlowWindow() {
      this.$emit("receive");
    },
    checkboxSel(i) {
      let areaSpan = this.$refs.areaSpan[i];
      if (Array.from(areaSpan.classList).includes("active")) {
        areaSpan.classList.remove("active");
        delete this.postData[i]
        return;
      }
      areaSpan.classList.add("active")
      
      this.postData[i]=this.idata[i]
    },
    confirmFlowWindow() {
      console.log(this.title);
      this.$emit("chagewordlist", {data:this.postData,type:this.title} );
    }
  }
};
</script>
