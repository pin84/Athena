<template>
    <!-- <transition name="fade"> -->
    <div id="search_page">
        
        <div class="m-search_page-beside_btn_g">
            
            <div>
                <i></i>
            </div>
            <div @click="cutState(0)" :class="$route.name!=='searchCompany'?'btn_unactive':''" class="u-btn_search_company" >
                <div class="btn_content">
                    <i class="iconfont btnicon">&#xe60d;</i>
                    查找企业
                </div>
            </div>

            <div @click="cutState(1)" :class="$route.name!=='searchGlobal'?'btn_unactive':''" class="u-btn_global_search">
                <div class="btn_content">
                    <i class="iconfont btnicon">&#xe608;</i>
                    全网搜索
                </div>
            </div>

        </div>

        <keep-alive>
            <router-view class="g-content" />
        </keep-alive>

    </div>
    <!-- </transition> -->
</template>


<script>

export default {
    name:'indexSearchPage',
    
    data(){
        return{
            pageState:0, //页面状态 0:查找企业 1:全网搜索
            transitionName:'',
            myPath:'',

        }
    },

    created(){
        this.myPath = this.$route.path;
    },

    methods: {

        cutState( state ){
            this.pageState = state;
            let routeName = '';
            if(state == 0){
                routeName = 'searchCompany';
            }
            else{
                routeName = 'searchGlobal';
            }
            this.$router.push({
                name:routeName
            })
        },

    },

    watch:{
        $route(to, from) {  
            // const toDepth = to.path.split("/")[1].length;
            // const fromDepth = from.path.split("/")[1].length;
            // const toDepth = to.path.split("/")[1].length;
            // const fromDepth = from.path.split("/")[1].length;
            
            this.transitionName = to.path == this.myPath ? "slide-right" : "slide-left";
        },
    }
}

</script>

<style lang="scss">
#search_page{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0.98rem;
    background: black;
    width: 100%;
 
    $leftBesideWidth:0.6rem;

    .m-search_page-beside_btn_g{
        
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: $leftBesideWidth;

        $btnFS:0.4rem;
        font-size: $btnFS;
        
        
        @mixin searchBesideBtn{
            
            
            height:48%;
            color:#09a1a2;
            text-align: center;
            vertical-align: middle;
            border-radius: 0 6px 6px 0;
            display:flex;

        }
        .u-btn_search_company{
            @include searchBesideBtn;
            margin-bottom:1%;

        }
        .u-btn_global_search{
            @include searchBesideBtn;

        }
            .btn_content{
                margin:auto 4px;
                
            }
            .btnicon{
                font-size: $btnFS;
            }

        .btn_unactive{
            background: #333333;
            color:white;
        }
    }

    .g-content{
        position:absolute;
        top:0;
        left: $leftBesideWidth;
        right: 0;
        bottom: 0;

    }
}

//以下为路由的过渡过画效果  -------START-----
.fade-enter-active {
    transition: all 500ms;
    animation: bounce-in 0.2s;
  }
.fade-leave-active {
    transition: all 500ms;
    animation: bounce-out 0.2s;
}
  @keyframes bounce-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    25% {
      transform: translate3d(-75%, 0, 0);
    }
    50% {
      transform: translate3d(-50%, 0, 0);
    }
    75% {
      transform: translate3d(-25%, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    25% {
      transform: translate3d(-25%, 0, 0);
    }
    50% {
      transform: translate3d(-50%, 0, 0);
    }
    75% {
      transform: translate3d(-75%, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
// 路由的过渡过画效果  ------END------

</style>
