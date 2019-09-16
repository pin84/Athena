<template>
    <div v-if="isSubscribe" @click="bus.$emit('isFollow',true)" class="follow-block">
      <div class="follow-content">
        <div class="follow-icon iconfont">&#xe650;</div>
        <div class="follow-text">关注</div>
        <div class="follow-text">公众号</div>
      </div>
    </div>
</template>

<script>
export default {

    data(){
        return{

        }

    },

    props:{
        isSubscribe:{
            type:Boolean,
            default:true,
        }
    },

    created(){
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.follow-block{
    $green:#00bb57;
      position: fixed;
      left: 0.3rem;
      bottom: 30%;
      width: 1rem;
      height: 1rem;
      background: white;
      // overflow: hidden;
      // border: 0.2rem solid $green;
      border-radius: 50%;
      z-index:1000;


    .follow-content{
      position: absolute;
      border: 0.1rem solid #05773bb8;
      box-shadow: 0 0 0 0.1rem  #00bb5754;
      top: -0.1rem;
      left: -0.1rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      
      .follow-icon{
        text-align: center;
        color:$green;
        font-size: 0.4rem;
        line-height: 1.2;

      }
      .follow-text{
        font-size: 0.2rem;
        line-height: 1.1;
        text-align: center;

      }
    }

  }


</style>