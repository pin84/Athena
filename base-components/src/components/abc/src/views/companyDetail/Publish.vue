<template>
  <div class="publish">
    <ComInput
      :config="inputConfig"
      @change="getText"
      class="input-test"
      v-on="$listeners"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import ComInput from "@/views/dingyue/model/ComInput";

export default {
  components: {
    ComInput
  },
  data() {
    return {
      inputConfig: {
        inputPH: "输入标题"
      }
    };
  },

  created() {
    // this.$axios
    //   .get(
    //     "http://47.106.105.213:8000/index/speciallist/?logo=up&provinces=%E5%B9%BF%E4%B8%9C%E7%9C%81&industryid=12&name=%E5%BE%8B%E5%B8%88%E4%BA%8B%E5%8A%A1%E6%89%80"
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
  },

  methods: {
    inputText() {
      console.log(`=======`);
    },
    getText(newText) {}
  }
};
</script>

<style lang="scss">
.publish{
    width:100%;
    height: 100%;
    background:white;
    padding: 2%  0.2rem 0;
    box-sizing: border-box;

}
.input-test{
    width: 100%;
    height: 1rem;

}
</style>