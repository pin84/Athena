<template>
  <div>
    <div
      class="index_list_r_list_s"
      @click="showDetail(pData)"
      v-for='(pData,index) in pData'
      :key='index'
    >
      <div class="index_list_r_list_t">
        <div class="index_list_r_list_d pos_res">
          <div class="index_list_r_list_d_p1">
            <div class="list_d_s1">
              <p></p>
              <p><span class="fz_24">{{pData.BidsPirce  == 0 ? '(看详情)' :pData.BidsPirce }}</span>万</p>
              <!-- <p><span class="fz_24">{{(pData.BidsPirce / 10000).toFixed(2) == 0 ? '(看详情)' :(pData.BidsPirce / 10000).toFixed(2)}}</span>万</p> -->
            </div>
            <div class="list_d_s2">
              <p class="fC2 p1">{{pData.Title}}</p>
              <p class="fC1 fz_22 p2">招标单位:<span>{{pData.Company}}</span></p>
              <ul class="clear fz_20">
                <li class="fl fC1">截标:<span>{{pData.EndDate}}</span></li>
              </ul>
            </div>
            <div
              class="list_d_s3"
              :class="{time_out:pData.status === '1'}"
            >
              <span class="text">{{pData.status === '1' ? '已截止' : '正在进行'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopDetail from "./PopDetail";
export default {
  props: {
    pData: {
      type: Array
    }
    // pData: {
    //   type: Object,
    //   default: function() {
    //     return {
    //       BidsPirce: "",
    //       Title: "",
    //       Company: "",
    //       EndDate: "",
    //       status: ""
    //     };
    //   }
    // }
  },
  data() {
    return {
      isLimitTwoMsg: false //限制两条信息可读
    };
  },
  components: {
    PopDetail
  },
  methods: {
    showDetail(item) {
      this.$emit("showDetail", item);
    }
  }
};
</script>



<style lang="stylus" scoped>
.fz_24
  font-size 0.3rem
  height 0.8rem
  line-height 0.8rem
  vertical-align center
.accurateSearch_sbox{
    position:fixed;
    bottom:0;
    left:0;
    height:1rem;
    padding:0.15rem 0.2rem;
    z-index:1;
}
input[type=text]{
    outline:none;
    border:0;

}
.accurateSearchBox-sel{
    height: 4.6rem;
    overflow: scroll;
}
.accurateSearch_sbox input{
    width:75%;
    background-color:#edecec
}
.accurateSearch_sbox>button{
    width:20%;
    text-align:center;
    border-radius:0.08rem
}
.pcBtn1,.pcBtn2{
    position: fixed;
    top: 0.25rem;
    padding: 0.1rem;
    box-shadow: 2px 2px 2px #e2e2e2;
    z-index: 1;
    border: 2px solid #c4e3e3;
}
.pcBtn1{
     right:20%;
    border-radius:0.4rem;
    
}
.pcBtn2{
     right:40%;
     border-radius:50%
}
.pcBtn1 img,.pcBtn2 img{
    width:0.6rem;
    height:0.6rem;
    border-radius:50%
}
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
    border-radius:0.08rem;

}
.input_info{
    padding:0.15rem 0.15rem;
    background-color:#09a2a3;
    color:#ffffff;
    box-shadow:0 0 0.1rem 0 rgba(0,0,0,0.2);
    border-radius:0.08rem;
    box-sizing:border-box;
    max-width:90%;
    // margin-top:0.4rem
}
.res_info{
    padding-left:0.7rem;
    margin-top:0.4rem
}
.res_info>img{
    position:absolute;
    top:0;
    left:0;
    width:0.57rem;
    height:0.57rem;
    border-radius:50%;

}

.index_list_r_list_t{
    width: 100%;
    overflow: hidden;
    border-radius: 0.1rem;
}
.index_list_r_list_s{
    margin-bottom:0.2rem;
    border-radius:0.1rem;
    z-index:100;
    
}
.index_list_r_list_s>p{
    margin:0.1rem 0;
    font-size:0.26rem;
    color:rgba(153,153,153,1);
}
.index_list_r_list_d{
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);

}
.index_list_r_list_d_p1{
    width:100%;
    height:1.5rem;
    margin:0 auto;
    margin-bottom:0.1rem;
    padding:0 0.33rem 0 0.1rem;
    border-radius:0.1rem;
    box-shadow:0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
    position:relative;
    display:-webkit-box; 							
	-webkit-box-pack:center;
	-webkit-box-align:center;
    box-sizing:border-box;
    background-color:#fff;
    z-index:1;
    
}
.list_d_s1{
      width:1.52rem;
      height: 1.3rem;
      position: relative;
      background: url('../../../assets/icon/dingyue/pic-36.png') no-repeat center;
      background-size: 100% 100%;
      margin-right: 0.22rem;
}
.list_d_s1>p{
        width:100%;
        height:50%;
        line-height:0.65rem;
        text-align:center;
        color:#fff;
        font-size:0.22rem;

}
.list_d_s2{
    -webkit-box-flex:1;
    font-size:0.26rem;
    line-height:1.4

}
.list_d_s2 > p.p1 {
    line-height: 1.3;
    color: #010101;
}
.list_d_s2 > p.p2 {
    color: #333333;
}
.list_d_s2 ul {
    line-height: 1.2;
    color: #333333;
}
.list_d_s3{
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    height:1.14rem;
    width:0.24rem;
    background:url('../../../assets/icon/dingyue/radius-770.png') no-repeat center;
    background-size:100% 100%;
    display flex
    justify-content center
    align-items center
    text-align center
}
.time_out
    background:url('../../../assets/icon/dingyue/radius-770-gray.png') no-repeat center;
    background-size:100% 100%;


.list_d_s3 .text{
    font-size 0.18rem
    line-height 0.2rem
    color #fff
}


.watchMore{
    width:100%;
    height:0.8rem;
    line-height:0.8rem;
    background:rgba(255,255,255,1);
    box-shadow:0 0 0.1rem 0 rgba(0,0,0,0.2);
    border-radius:0.1rem
}
.nores{
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
     border-radius: 0.1rem;
}
.accurateSearchBox{
    position:fixed;
    top:0;
    left:0;    
    z-index:2;
    background-color:rgba(0,0,0,0.5);
    overflow:hidden;
    /*transition: height 0.1s*/
    

}
.accurateSearchBox>div{
    padding:0.2rem 0.3rem;
}
.accurateSearchBox-show {
    display: -webkit-box;
    -webkit-box-align: center;
    margin-bottom: 0.2rem;
}
.accurateSearchBox-s2>form{
    height:0.7rem;
    /*line-height:0.7rem;*/
    background-color:#e7e7e7;
    box-sizing:border-box;
    padding:0.1rem 0.1rem 0.1rem 0.68rem;
    display:block
}
.accurateSearchBox-s2>form>input{
    border:0;
    background-color:inherit;
    display:block;
    width:100%;
    height:100%;
    font-size:0.28rem
}
.accurateSearchBox-s1{
    width:1.12rem;
    height:0.7rem;
    line-height:0.7rem;
}
.accurateSearchBox-s2{
    -webkit-box-flex:1
}
.pointDown{
    display:inline-block;
    width:0.16rem;
    height:0.12rem;
    // background:url('../image/icon/icon-traiDown.png') no-repeat center;
    background-size:100% 100%; 
    margin-left:0.1rem;
    transition: all 0.1s
}
.searchLogo{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    left:0.18rem;
    display:inline-block;
    width:0.38rem;
    height:0.38rem;
    // background:url('../image/icon/icon-search.png') no-repeat center;
    background-size:100% 100%; 
}

.index_list_r_list_d_p2{
    position:absolute;
    top:0;
    right: 0;
    width: 40px;
    height:1.5rem;
    line-height:1.5rem;
    background-color:#be0201;
    color:#ffffff;
    font-weight:bold;
    text-align:center;
    border-bottom-right-radius:0.1rem;
    border-top-right-radius:0.1rem
}
.index_list_r_list_t{
    width: 100%;
    overflow: hidden;
    border-radius: 0.1rem;
}
.index_list_r_list_s{
    margin-bottom:0.1rem;
    border-radius:0.1rem;
}
.index_list_r_list_s>p{
    margin:0.1rem 0;
    font-size:0.26rem;
    color:rgba(153,153,153,1);
}
.index_list_r_list_d{
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);

}
.index_list_r_list_d_p1{
    width:100%;
    height:1.5rem;
    margin:0 auto;
    margin-bottom:0.15rem;
    padding:0 0.33rem 0 0.1rem;
    border-radius:0.1rem;
    box-shadow:0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
    position:relative;
    display:-webkit-box; 							
	-webkit-box-pack:center;
	-webkit-box-align:center;
    box-sizing:border-box;
    background-color:#fff;
    z-index:1;
    
}
.accurateSearchBox-list{
    padding-top:1.3rem;
    background-color:#f3f3f3
}
.accurateSearchBox-list-title{
    color:#666666;
    padding:0 0.3rem 0.1rem
}
.accurateSearchBox-list-con{
    padding:0 0.3rem 0.98rem
}
.accurateSearchBox-unfound{
    padding:2rem 0.47rem;
    font-size:0.24rem;
    color:#999999
}
/*选择弹窗*/

.flowWindow_wrap {
    display:-webkit-box; 							
	-webkit-box-pack:center;
	-webkit-box-align:center;
	-webkit-box-orient:vertical;
    background-color: #ffffff;
}



.flowWindow_title {
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    text-align: center;
    background-color: #e4fcfc;
    font-size: 0.36rem;
}

.flowWindow_con {
    padding-top: 0.5rem;
}

.flowWindow_con > div {
    align-content: flex-start;
    overflow-y: scroll;
}


.flowWindow_con label {
    position: relative;
    width: 1.6rem;
    height: 0.74rem;
    background: rgba(255, 255, 255, 1);
    margin-right: calc((100% - 6.4rem) / 3);
    margin-bottom: 0.3rem;
    box-sizing: border-box;
}
.flowWindow_wrap.as2 .flowWindow_con label{
    position: relative;
    width: 24.25%;
    height: 0.74rem;
    background: rgba(255, 255, 255, 1);
    margin-right: 1%;
    margin-bottom: 0.3rem;
    box-sizing: border-box;
}
.flowWindow_wrap.as2 .flowWindow_con label:nth-of-type(4n),.flowWindow_con label:nth-of-type(4n) {
    margin-right: 0;
}

.cbSelect {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    line-height: 0.74rem;
    background-color: #fff;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 0.1rem;
    font-size: 0.24rem;
    box-sizing: border-box;
}

.cbSelect.active {
    background-color: #eff;
    color: #09a2a3;
    border-color: #09a2a3;
}

.flowWindow_btn {
    width: 89.3%;
    height: 1rem;
    line-height: 1rem;
    background: rgba(9, 162, 163, 1);
    border-radius: 0.5rem;
    font-size: 0.3rem;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
}
/* 招标详情 */

.ZBdetails {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-orient: vertical;
    z-index: 100;
}

    .ZBdetails > div {
        width: 94.6%;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
        margin-top: 0.9rem;
        position: relative;
    }

.ZBdetails-logo {
    width: 1.6rem;
    height: 1.6rem;
    background: rgba(9, 162, 163, 1);
    border: 0.1rem solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    box-sizing: border-box;
    font-size: 0.54rem;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 1.4rem;
    text-align: center;
    margin: -0.9rem auto 0;
}

.ZBdetails-statement {
    padding: 0 0.18rem;
}

.ZBdetails-statement-title {
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 1.5;
}

.ZBdetails-statement-price {
    font-size: 0.26rem;
    font-weight: bold;
}

    .ZBdetails-statement-price > span {
        color: #09a2a3;
    }

        .ZBdetails-statement-price > span:first-child {
            font-size: 0.36rem;
        }

.ZBdetails-statement-details {
    position: relative;
    padding: 0.2rem 0 0.2rem;
}

.ZBdetails-statement-details-left {
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.3rem;
    display: -webkit-box;
    font-size: 0.26rem;
    color: #666;
}

.ZBdetails-statement-details-tag {
    position: absolute;
    right: 0;
    top: 0.3rem;
    width: 1.2rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    background: rgba(191, 2, 0, 1);
    border-radius: 0.06rem;
    font-size: 0.24rem;
    color: #fff;
}

.ZBdetails-con {
    padding: 0.39rem 0.21rem 0.45rem;
    line-height: 1.8;
    height: 32.38vh;
    overflow-y: scroll;
}

.ZBdetails-closeBtn {
    position: absolute;
    top: -1.2rem;
    right: 0.3rem;
}

.ZBdetails-operator {
    position: relative;
    height: 1rem;
    display: -webkit-box;
    background-color: #f3f3f3;
}

    .ZBdetails-operator > button {
        position: relative;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        width: 33.3333%;
        font-size: 0.28rem;
        border: 0;
        border-radius: 0;
        margin: 0;
        padding: 0;
        overflow: visible;
        background: none;
    }

        .ZBdetails-operator > button > img {
            width: 0.34rem;
            height: 0.34rem;
            margin-right: 0.15rem;
        }

        .ZBdetails-operator > button.fs::after {
            position: absolute;
            right: 0;
            top: 0.3rem;

            width: 1px;
            height: 0.4rem;
            background-color: #ccc;
            display: block;
            content:""
        }

        .ZBdetails-operator > button.fs::before {
            position: absolute;
            left: 0;
            top: 0.3rem;
            width: 1px;
            height: 0.4rem;
            background-color: #ccc;
            display: block;
            content:""
        }


.fullScreen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding-bottom:1.2rem;
    overflow-y: scroll;
}

    .fullScreen > button {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 102;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #ffffff;
        background-color: #09A2A3;
        font-size:0.28rem
    }

.detail_close {
    position: absolute;
    right: 0;
    top: -1.5rem;
    width: 0.59rem;
    height: 0.59rem;
}
</style>
