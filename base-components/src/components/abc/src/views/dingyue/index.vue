<template>
  <div id="dingyue">
    <div class="tr">
      <TopRouter />
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>


  </div>
</template>
<script>
import TopRouter from "./model/TopRouter";
import NoSubscript from "./pages/01_noSubscript";

// import TemplateList from '../../components/pop/pushTemplate/TemplateList'
// import TemplateList from '../../components/pop/pushTemplate/TemplateList'
export default {
  components: {
    NoSubscript,
    TopRouter,
  }
};
</script>

<style lang="stylus" scoped>
#dingyue
  width 100vw
  height 100vh
  overflow hidden
  background-color #ffffff
</style>
