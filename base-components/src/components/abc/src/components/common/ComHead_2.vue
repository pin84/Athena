<template>
  <div class="i-com-header">
    <div class="title">
      <div class="flex-layout line-1">
        <!-- <div class="icon"></div> -->
        <div class="main">
          <div class="name signalLine">{{company.enterprise ? company.enterprise : '未知'}}</div>
          <div class="flex-layout tag">
            <div class="tag-group">
              <div class="tag-state">{{company.OperaState?company.OperaState:'未知'}}</div>
              <!-- <div class="tag-oldname">曾用名</div>
              <div class="tag-new">高新技术企业</div>-->
              <div class="tag-new">{{company.status?'已认证':'未认证'}}</div>
            </div>
            <!-- <div class="view">浏览:{{company.count?company.count:1}}</div> -->
          </div>
        </div>

        <div v-if="showHeadShare" @click="openShare" class="iconfont share_icon">&#xe6ff;</div>
      </div>
      <div class="line-2">
        <div class="info">
          <div class="info-represe">法定代表人: {{company.LegalReprese?company.LegalReprese:'末知'}}</div>
          <div class="info-ctime">成立日期: {{company.CreationTime?company.CreationTime :'末知'}}</div>
          <div class="info-capital">注册资本: {{company.Capital?company.Capital:'末知'}}</div>
        </div>

        <a
          v-if="company.Phone !== null && company.Phone !== undefined"
          class="phoneBlock"
          :href="'tel:'+company.Phone"
        >
          <i class="iconfont-mask phone">&#xe601;</i>
        </a>
        <a v-else class="phoneBlock">
          <i class="iconfont-mask phone">&#xe601;</i>
        </a>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  props: {
    showHeadShare: false,
    shareFunc: {
      type: Function,
      default: () => {}
    },
    propGet: {
      type: Boolean,
      default: false
    },
    company: {
      type: Object
      // default: function() {
      //   return {};
      // }
    }
  },
  data() {
    return {};
  },
  created() {
    // this.company = this.$store.state.company;
    // console.log(`=======`,this.company);
    

  },

  mounted() {},

  methods: {
    openShare() {
      this.shareFunc();
      this.bus.$emit("shareMaskShow", true);
    }

    //   detailInfoWatch(newVal){

    //     let company = newVal;
    //     this.company = {
    //       enterprise: company["企业名称"],
    //       OperaState: company["经营状态"],
    //       LegalReprese: company["法定代表人"],
    //       CreationTime: company["成立日期"],
    //       Capital: company["注册资本"],
    //       Phone: company["电话"],
    //       count:this.$store.state.company.indexInfo.count,
    //       isAuth:company.isAuth,
    //     };
    //     console.log(`===this.company====`,this.company);
    //   },

    // },

    // watch: {

    //  detailInfo:{
    //    handler(newVal){
    //      console.log(`=====wwwwwwwwwwwwwwwww==`,);
    //      this.detailInfoWatch(newVal);

    //    },

    //  }
  }
};
</script>

<style lang="scss"  scoped>

// com-head的样式 s
.i-com-header{
    background-color :#fff;
    padding: 0.3rem 0;
    padding: 0.2rem;
    border-bottom: 10px solid #ccc;
  .share_icon{
    margin:0 0.4rem 0.36rem;

    text-align: center;
    font-size: 0.6rem;
    @include zoom-in-out;
  }

    .line-1{
        justify-content: center;
    }
    // .icon{
    //     width: calRem(40);
    //     height: calRem(40);
    //     margin-right: 10px;
    //     background-color: #fdcc06;
    // }
    .main{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
        line-height: normal;
        .name{
            // text-align: center;
            font-size: calRem(20);
            line-height: calRem(24);
            font-weight: bold;
        }
    }
    .tag{
        margin-top: calRem(5);
        font-size: calRem(10);
        line-height: calRem(13);
        justify-content: space-between;
        .tag-group{
            display: flex;
            
            [class|=tag]{
            
                margin-right: 10px;
                // border:1px solid black;
                border-radius: 2px;
                padding: 1px 2px;
                justify-content: space-between;
            }
        } 
        .tag-state{
            $tag-state:#07b4fc;
            color:$tag-state;
            border:1px solid $tag-state;
        }
        .tag-oldname{
            $tag-oldname:#fe6e00;
            color:$tag-oldname;
            border:1px solid $tag-oldname;
        }
        .tag-new{
            $tag-new:#0aa4a3;
            color:$tag-new;
            border:1px solid $tag-new;
        }
        .view{
            // align-self: flex-end;
            $view-color:#666666;
            color:$view-color
        }
    }



    .line-2{ 
      //  padding: 14px 0 0 10px;
       display: flex;
       align-items: center;
       box-sizing: border-box;
       width: 100%;
       justify-content: center;
    }
    .info{
        width: 87%;
        display: inline-flex;
        justify-content: left;
        flex-wrap: wrap;
        position: relative;
        font-size: calRem(12);
        
        [class|=info]{
            @media screen and (max-width: 370px)  {
                margin-right: 3px;
        
            }
            margin-right: 24px;
            // text-align: center;
        }

        &::after{
            content: '';
            position: absolute;
            border-right: 1px solid #cccccc;
            top: 0;
            bottom: 0;
            right: 0;
        }
    }
    
    .phoneBlock{
        
        margin: 0 14px;
        float: right;
        width: calRem(30);
        height: calRem(30);
        line-height: calRem(30);
        text-align: center;
        border-radius: 50%;
        background-color: #dd0201;
        .phone{
            color:white;
            font-size: calRem(18);
        }
    }
}
// com-head的样式 e

</style>
