<template>
    <div v-show="openState" class="follow-qrcode">
        <div class="follow-mask"></div>
        <div class="qrcode-block">
        <img @click="closeTip" class="close" src="./../../assets/icon/11.png" alt="">
        <img class="qrcode-img" src="./../../assets/icon/followQrcode.jpg" alt="">
        <div class="follow-des" >长按二维码，关注上下链！</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      openState: {
        type: Boolean,
        default: false,

      },
    },
    methods:{
      closeTip(){
        this.$emit('closeFollowTip',false);
      },
    }
}
</script>

<style lang="scss">
  @mixin fullScreen{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:100;

  }
  .follow-qrcode{
    @include fullScreen;

    .follow-mask{
      // @include fullScreen;
      width: 100%;
      height: 100%;
      background: #00000080;

    }

    .qrcode-block{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 60%;

    }

    .close{
      position: absolute;
      right: 0;
      bottom: 100%;
      transform: translate( 50% , -50%);
      width: 0.6rem;
      height: auto;

    }
    .qrcode-img{
      width: 100%;
      height: auto;

    }

    .follow-des{
      color:white;
      font-size: 0.26rem;
      text-align: center;
    }


  }

  .follow-block{
    $green:#00bb57;
      position: fixed;
      left: 0.3rem;
      bottom: 18%;
      width: 1rem;
      height: 1rem;
      background: white;
      // overflow: hidden;
      // border: 0.2rem solid $green;
      border-radius: 50%;


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