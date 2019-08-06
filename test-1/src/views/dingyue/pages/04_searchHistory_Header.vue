<template>
  <div id="searchBar">
    <header
      class="hot w bs_bb p_l_20 p_r_20"
      v-if="hotOrHistory"
    >
      <p class="fw_bold fz_36">大家都在搜:</p>
      <ul class="hotWord clear">
        <li
          class="fl"
          v-for='(hotword,index) in hotSearch'
          :key='index'
        >
          <a
            class="w h dis_bl main_color_09a2a3 sbgColor_f1ffff fC1"
            @click="searchHotword(hotword)"
          >
            {{hotword}}
          </a>
        </li>
      </ul>

      <p class="as_tips bs_bb">
        输入采购商机关键词，输入2-6个中文字搜索查询更精准
      </p>
    </header>
    <header
      class="hot w bs_bb p_l_20 p_r_20"
      v-else
    >
      <p class="fw_bold fz_36"><span class="vm">搜索历史：</span>
        <img
          src="../../../assets/icon/dingyue/my-trash.png"
          class="vm"
          style="width: 0.32rem; height: 0.35rem;"
          @click="delHotSearch"
        >
      </p>
      <ul class="historyWord clear">
        <li
          class="fl"
          v-for="(value,key) in historySearch"
          :key="key"
        >
          <a
            href="javascript:;"
            class="w h dis_bl sbgColor_e4e4e4 fz_24  fC1"
            @click="historyWordSearch(value)"
          >
            {{value}}
          </a>
        </li>
      </ul>
      <!-- <p class="as_tips bs_bb">
        输入采购商机关键词，精准匹配潜在商机；关键词与商机标题及详情内容匹配；输入2-6个字搜索查询更精准
      </p> -->
    </header>

    <!-- <FootSearch /> -->


  </div>
</template>
<script>
import FootSearch from "../model/FootSearch";
export default {
  props: {
    curKeyword: ""
  },

  data() {
    return {
      hotOrHistory: true, //显示历史搜索或是热闹搜索
      historySearch: [], //历史搜索的关键词
      hotSearch: ["医疗", "软件", "设备", "汽车", "办公", "网络"],
      token: ""
    };
  },
  computed: {
    // isHotSearch_c: function() {
    //   return this.isHotSearch;
    // },
    // flag: function() {
    //   return !this.historySearch.length;
    // },
    // searchKeyword: function() {
    //   return this.$store.state.dingyue.historySearch;
    // }
  },

  created() {
    this.token = this.$store.state.loginInfo.userInfo.token;
    this.checkIshasHistroySearch();
    this.bus.$on("addHistorySearchKw", this.addHistorySearch);

    // this.$axios
    //   .post(`${this.$api.isHashistoryKerword}`, {
    //     token: this.$store.state.loginInfo.userInfo.token
    //   })
    //   .then(res => {
    //     if (res.data.message === false) {
    //       this.$store.commit("hotOrHistory", false);
    //       return (this.historySearch = []);
    //     }

    //     this.hotOrHistory = false;
    //   });
  },
  components: {
    FootSearch
  },

  methods: {
    addHistorySearch(kw) {
      let hs = localStorage.getItem("historySearch");
      if (hs === null) {
        this.historySearch.push(kw);
        this.hotOrHistory = false;
      } else {
        this.hotOrHistory = false;
        this.historySearch = hs.split(",");
      }
    },
    checkIshasHistroySearch() {
      let hs = localStorage.getItem("historySearch");
      if (hs === null) {
        this.hotOrHistory = true;
      } else {
        this.hotOrHistory = false;
        this.historySearch = hs.split(",");
      }
    },
    searchHotword(hotword) {
      this.hotOrHistory = false;
      this.$emit("searchHotword", hotword);
    },
    async delHotSearch() {
      this.hotOrHistory = true;
      localStorage.removeItem("historySearch");

      let { data } = await this.$axios.delete(
        `${this.$api.isHashistoryKerword}?token=${this.token}`
      );

      if (data.message === "删除成功") {
        this.$router.push("03_quickSearch");
      }
    },
    async deleteHistorySearch() {
      let history = await this.$axios.delete(
        `${this.$api.isHashistoryKerword}`,
        {
          params: {
            token: this.token
          }
        }
      );
    },
    historyWordSearch(Hkeyword) {
      this.$emit("historyWordSearch", Hkeyword); //03_quickSearch 接收
    }
  },

  destroyed(){
    this.bus.$off('addHistorySearchKw');

  },
};
</script>
<style lang="stylus" scoped>
.hot p{
    padding:0.35rem 0 0.19rem
}
.hot ul.hotWord,.hot ul.historyWord{
    // padding:0.3rem 0;
    /*display:flex;
    flex-wrap:wrap;*/
}
.hot ul.hotWord>li{
    width:30.666%;
    height:0.8rem;
    line-height:0.8rem;
    text-align:center;
    border-radius:0.08rem;
    margin:0 4% 0.3rem 0
    
}
.hot ul.hotWord>li:nth-of-type(3n){
    margin-right:0
}
.hot ul.hotWord>li>a{
    font-size:0.24rem;
    border-radius:0.08rem;
}
.as_tips{
    width:100%;
    text-align:center;
    padding:0.32rem 0.2rem;
    color:rgb(128, 128, 128);
    font-size:0.24rem
}
.sbgColor_f1ffff{
    background-color:#f1ffff
}
.sbgColor_e4e4e4{
    background-color:#e4e4e4
}
.hot ul.historyWord>li{
    width:1.4rem;
    height:0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius:0.08rem;
    margin:0 0.2rem 0.3rem 0
    
}
.hot ul.historyWord>li>a{
    font-size: 0.24rem;
    border-radius:0.08rem;

}
</style>
