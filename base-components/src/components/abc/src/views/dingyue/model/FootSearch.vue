<template>
  <footer
    data-v-26e58902=""
    class="accurateSearch_sbox w bs_bb main_bgcolor_ffffff clear"
  >
    <input
      data-v-26e58902=""
      type="text"
      placeholder="请输入关键词"
      class="fl dis_bl h bs_bb p_l_20 p_r_20"
      v-model="keyword"
    >
    <button
      data-v-26e58902=""
      type="button"
      class="fr dis_bl h main_bgcolor_09a2a3 main_color_ffffff fz_24"
      @click="search"
    >
      发送
    </button>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      
      if(!this.keyword){
        return this.$toast('请输入关键词')
      }
     
      this.$emit("search", this.keyword); //03_quickSearch 接收
      this.keyword = "";
    }
  }
};
</script>
<style lang="stylus" scoped>
.accurateSearch_sbox {
  position: fixed;
  bottom:1rem;
  left: 0;
  height: 1rem;
  padding: 0.15rem 0.2rem;
  z-index: 2;
}
input[type="text"] {
  outline: none;
  border: 0;
}
.accurateSearchBox-sel {
  height: 4.6rem;
  overflow: scroll;
}
.accurateSearch_sbox input {
  width: 75%;
  background-color: #edecec;
}
.accurateSearch_sbox > button {
  width: 20%;
  text-align: center;
  border-radius: 0.08rem;
}
</style>
