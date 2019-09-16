<template>
  <div id="search_global">
    <chuke-msg />
  </div>
</template>

<script>
import chukeMsg from "@/views/chuke/Chuke-msg2.vue"; // 搜索框
import Utils from '@/utils'
export default {
  name: "searchGlobalPage",

  components: {
    chukeMsg
  },

  data() {
    return {};
  },

  async created() {
    //第一次到访提示 s
    let flag = await Utils.isFirstVisit(
      this.$api.isShowTips,
      this.$route.meta.remark
    );
    if (flag) {
      this.$router.push({
        path: "../tipmain",
        query: { num: [4], originUrl: this.$route.fullPath } //1是第1张图片
      });
    }
    //第一次到访提示 e
  },

  methods: {
 
  }
};
</script>

<style lang="scss">

#search_global{
    box-sizing: content-box;
    padding: 1%;
}

</style>
