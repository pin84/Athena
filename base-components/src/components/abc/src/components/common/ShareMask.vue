<template>
  <div
    v-show="showShare"
    class="shareGuide dis_box box_a_c bo_p_c w h"
    style=""
    @click="$emit('isShowShare',showShare);closeShare()"
  >
    <img
      src="../../assets/icon/dingyue/guide1.png"
      style="width: 3.3rem; height: 2.28rem;"
    >
  </div>
</template>
<script>
export default {
  created(){
    this.bus.$on('shareMaskShow',(state)=>{
      if(typeof state !== 'boolean'){
        console.error(`bus function shareMaskShow's params must be boolean`);
        return;
      }
      // this.$store.commit('saveBeforShareUrl',this.$route.fullPath)
      this.showShare = state
    });

  },
  destroyed() {
    this.bus.$on('shareMaskShow');
    
  },
  data(){
    return{
      showShare:false,

    }
  },
  methods: {
    closeShare(){
      this.showShare = false;
      // console.log(`=======`,this.$store.state.shareInfo.saveBeforShareUrl);
      // this.$router.push(this.$store.state.shareInfo.saveBeforShareUrl)
      this.$store.commit('resetShareInfo',this.$route);
    }
  },
  destroyed(){
    this.bus.$off('shareMaskShow');
    
  },
};
</script>

