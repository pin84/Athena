<template>
  <div id="spposter" >
    <div v-if="!getPosterBegin" class="m-freshBar">
        <div @click="freshImg" class="u-fresh">换皮肤</div>
    </div>
    <div class="g-content-block">
      <div id="poster_content">
        <img id="poster_img" :src="bgImg" >  
        <div class="m-company_info-qrcode sp-info_qrcode">
            <div class="u-qrcode" >
                <vue-qr class="qrcode" :dotScale="1" :text="qrcode" :logoSrc="qrCodeImg" :size="160" :margin="8"/>
            </div>
            <div class="u-company_info">
                <div class="company_name">
                {{chooseCompany.companyName}}
                </div>
                <div class="tags"> 
                主营:<template v-for="tag in $commonFn.businessScope(chooseCompany.companyTags)" >{{tag}}、</template>
                </div>
            </div>

        </div>
        <div v-show="posterImgSrc" id="poster-img-show" >
            <img :src="posterImgSrc"  alt="" class="poster-img">
        </div>
      </div>
      <!-- <div class="m-lian-icon">
        <img class="img-lian" src="../../assets/icon/lian@2x.png" alt="">
      </div> -->

      <!-- <div class="m-user_info-fresh-layout">
          
        <div class="u-user_info">
          <div class="avatar">
            <img :src="headimgUrl" alt="" class="avatar-img"/>
          </div>
          <div class="username">
            {{userName}}
          </div>
        </div>
        
        <div v-if="!getPosterBegin" class="u-fresh" @click="getInspirationalText">
          换一换<i class="iconfont">&#xe6a7;</i>
        </div>
        
      </div>
      <div ref="inspireText" class="inspire-text">
        {{insText}}
      </div>

      <div ref="labelContent" class="m-label-content">
        <svg id="#svg-tag" ref="svgTag"></svg>
      </div> -->

    </div>
    
    <!-- <div v-if="!getPosterBegin" class="btn-choose">
        <template v-for="opItem in optionsList">
          <div class="m-op_item" :key="opItem.id">
            <div class="u-op_item-icon" @click="opItem.optionFunc">
              <img class="img_op_icon" :src="opItem.imgSrc">
            </div>
            <div class="u-op_item-text">
              {{opItem.optionText}}
            </div>
          </div>
        </template>
    </div> -->

    <div v-if="!getPosterBegin" class="fresh-btn">
      <div @click="infoCheck" class="fresh-center-circle">海报生成</div>
    </div>
    <!-- <div v-if="showCover" id="cover"></div> -->
    
    <!-- <div v-show="posterImgSrc" id="poster-img-content" :style="`width:${showImgWidth}px;height:${showImgHeight}px`">
      <img :src="posterImgSrc"  alt="" class="poster-img">
    </div> -->

  </div>
</template>

<script>
import VueQr from 'vue-qr'
import FestivalJSON from '@/api/activity.json'
import { setTimeout } from 'timers';
// import LabelShow from '@/components/pop/shanglian/LabelShow';

export default {
//   mixins:[LabelShow],
  data() {
      return {
          activity:'TeachersDay', //节日名
          imgOrder:1, //当前显示的海报数
          imgCount:0, //海报背景图总数
          qrcode: "http://www.shangxialian.net/js/#/search/company",
          qrCodeImg:require('@/assets/icon/lian200.jpg'),
          insText:'',
          posterImgSrc:null,
          headimgUrl:'',
          userName:'',
          html2ImgReady:false,
          getPosterBegin:false,
          showCover:true,

          noIconTips:[],

          optionsList:[
            {
              imgSrc:require('../../assets/icon/download.png'),
              optionText:'下载',
            },
          ],
          getCompanyInfo:false,
          chooseCompany:{
            companyName:'xxx有限公司',
            companyTags:['标签一','标签二','标签三','标签一','标签二','标签三','标签一','标签二','标签三',],
            enterprisesid:'',
            industryid:0, 
          },

          showImgWidth:0,
          showImgHeight:0,
      }
  },
  
  props:{
    
  },

  components:{
    VueQr,

  },
  computed:{
    creatPosterListen(){
      if(this.html2ImgReady && this.getPosterBegin){
        return true
      }
      return false;
    },

    bgImg(){
        let { activity, imgOrder } = this;
        
        let imgPath= require( "../../assets/image/activityPosterImg/" + activity + '/'+imgOrder + '.jpg');
        
        return imgPath
    },
  },
  
  async created(){
    // console.log(this.toBaseInfo)
    // let res = await this.getInspirationalText();
    let festivalInfo = await this.isFestivalTime();
    
    if(!festivalInfo){
        this.$toast('今天还没有相关节日活动哦！')
        this.$router.push('/');
    }
    let { festival,posterBgImgNum } = festivalInfo;

    this.activity = festival;
    this.imgCount = posterBgImgNum;

    let { companyName,enterprisesid,industryId,industryid } = this.$route.params
                                    //CompanyList   首页
    if(!companyName){
      this.$toast({
        message:'缺失海报所需企业信息'
      })
      this.$router.push('/');
      this.getCompanyInfo = false;
    }else{
      this.chooseCompany = this.$route.params;
      if(typeof this.chooseCompany.companyTags =="string"){
          this.chooseCompany.companyTags = this.chooseCompany.companyTags.split('|')
      }
      if(this.chooseCompany.companyTags == null){
          this.chooseCompany.companyTags = []
      }
      
      this.getCompanyInfo = true;
      let {
        enterprise:authCompany,
        enterpriseid:authCompanyId,
      } = this.$store.state.company.authComInfo;

      let data = {
        linkPop:'poster',
        companyName,
        enterpriseid:enterprisesid,
        industryid:industryId||industryid,
        share_user:this.$store.state.loginInfo.userInfo.user_id,
        authCompany:authCompany, //分享者认证企业
        authCompanyId:authCompanyId, //分享者认证企业id
      }
      let qsData = this.$qs.stringify(data);
      this.qrcode = this.qrcode + (qsData?'?'+qsData:'');

    }
    
    let { username,headimgUrl } = this.$store.state.loginInfo.userInfo;
    this.headimgUrl = headimgUrl;
    this.userName = username;
    // let len = this.chooseCompany.companyTags.length||10;
    this.html2ImgReady = true;
    // setTimeout(()=>{
    // },200 * len + 100)
    
  },
  mounted(){

    // this.labelMountedInit();
    // console.log(
    //   this.containerWidth,
    //   this.containerHeight
    // )

    let poster = document.getElementById('poster_content');
    let { clientHeight,offsetHeight,clientWidth,offsetWidth } = poster;
    
    this.showImgWidth = (clientWidth||offsetWidth);
    this.showImgHeight = (clientHeight||offsetHeight);
  },
  methods: {
    async isFestivalTime(){
        let timeObj =  await this.$axios.get('http://quan.suning.com/getSysTime.do')
        let nowTimeStr = timeObj.data.sysTime2;
        // 2019-09-09 20:10:55
        let ObjNumTrans = (timeObj)=>{
            for(let key in timeObj ){
                timeObj[key] = +timeObj[key]
            }
            return timeObj;
        }
        let nowTimeTrans = (timeStr)=>{
            let [intDay,times] = timeStr.split(' ');
            let [year,month,day] = intDay.split('-');
            let [hour,min,sec] = times.split(':');
            let timeObj = { year,month,day,hour,min,sec }
            // return ObjNumTrans(timeObj)
            return timeObj
            
        }
        
        let nowTimeObj = nowTimeTrans(nowTimeStr);
        let {month:nMon, day:nD, hour:nH, min:nM, sec:nS}=nowTimeObj
        let nowTimeS = +`${nMon}${nD}${nH}${nM}${nS}`;
        let timeTrans = (str)=>{
            let [month,day,time] = str.split('/');
            let [hour,min,sec] = time.split(':');
            let timeObj = { month,day,hour,min,sec }
            // return ObjNumTrans(timeObj)
            return timeObj
        }
        

        let ObjEqu = (prop,...params)=>{
            for(let i = 0; i < params.length-2;i++ ){
                if(params[i][prop]!==params[i+1][prop]){
                    return false
                }
            }
            return true;
        }

        let festItem = FestivalJSON.findIndex(ele=>{
            let [startTime,endTime] = ele.activityTime.split('-');
            let startTimeObj = timeTrans(startTime);
            let endTimeObj = timeTrans(endTime);
            let { month:sMon, day:sD, hour:sH, min:sM, sec:sS}=startTimeObj;
            let { month:eMon, day:eD, hour:eH, min:eM, sec:eS}=endTimeObj;
            let startTimeS = +`${sMon}${sD}${sH}${sM}${sS}`;
            let endTimeS = +`${eMon}${eD}${eH}${eM}${eS}`;
            
            let conditionArr = [
                // +nMon >= +sMon && +nMon <= +eMon,
                // +nD >= +sD && +nD <= +eD,
                nowTimeS >= startTimeS && nowTimeS <= endTimeS,
            ];
            
            if(!conditionArr.includes(false)){
                return true
            }else{
                return false
            }
            
        })
        
        if(festItem !== -1){
            return FestivalJSON[festItem];
        }else{
            return false;
        }

    },
    freshImg(){
        if(this.imgOrder < this.imgCount){
            this.imgOrder++
        }else{
            this.imgOrder=1;
        }
    },

    infoCheck(){
        this.$indicator.open({
            text:'海报正在生成中，请稍后',
        });
      let message = '';
      if(this.getCompanyInfo == false){
          message = '企业信息缺失，无法生成海报';
      }
      if(this.inspireText == ''){
        message = `激励语句缺失，请点击"换一换"或检查网络是否正常`;
      }
      if(message!=''){
          this.$toast({message})
        // this.noIconTips.push();
        this.$indicator.close();
        return
      }

      this.getPosterBegin = true;
    },

    // 获得心灵鸡汤
    async getInspirationalText(){
      let data = await this.$axios.get(this.$api.inspirationalText).then(res=>res)
      this.insText = data.content;
      // setTimeout(()=>{
      //   let s25 = "不要总想着有人能与我们并肩前行，因为大多数人都只是"
      //   let s30 = "不要总想着有人能与我们并肩前行，因为大多数人都只是擦肩而过啊"
      //   this.insText = s30
      // },1000)
      return data
    },

    // 获得海报
    getPoster(onHandler){
      if(this.noIconTips.length !== 0){
        this.noIconTips.forEach(ele => {
          ele.close();
        });
      }
    //   let windowH = window.innerHeight;
      // document.documentElement.scrollTop = windowH;
      // document.body.scrollTop = windowH;
      
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      let poster = document.getElementById('poster_content');
      
      let { clientHeight,offsetHeight,clientWidth,offsetWidth } = poster;
      
      let width = document.documentElement.clientWidth || document.body.clientWidth;
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      
        try{
            this.$h2c( poster ,{
                // type: 'view',
                height: (clientHeight||offsetHeight),
                //   x:0,
                //   y:0,
                //   windowWidth: (clientWidth||offsetWidth),
                //   windowHeight: (clientHeight||offsetHeight),
                windowWidth: width,
                windowHeight: height,
                useCORS: true,
            })
            .then(canvas=>{
                this.$indicator.close()
                this.posterImgSrc = canvas.toDataURL("image/png",1);
                this.$messageBox({
                    title: '提示',
                    message: '海报生成成功，长按页面保存图片，即可发布朋友圈',
                })
            })
            .catch(e=>{
                this.createFail();
            })

        }catch(e){
            this.createFail();
        }
        
    },

    createFail(){
        this.$indicator.close();
        this.$messageBox({
            title: '提示',
            message: '海报生成失败，请重新生成',
        })
        this.$forceUpdate()
        this.getPosterBegin = false;
        
    },

    selfAdaptionText(text){
      let inspireTextBlock, //鸡汤容器
          blockWidth, //容器宽
          blockHeight, //容器高
          textLength, //鸡汤字体数
          textLine, //鸡汤显示行数
          textFontSize, //鸡汤文字大小
          setBlockFS, //控制容器字体大小
          setBlockStyle, //控制容器样式
          singleLineHeight, // 单行高度
          blockFSCount, // 计算容器需要的字体大小
          getBlockFs //控制容器字体大小的计算结果
      ;

      inspireTextBlock = this.$refs.inspireText;
      blockHeight = Math.floor(inspireTextBlock.offsetHeight);
      blockWidth = Math.floor(inspireTextBlock.offsetWidth);
      textLength = text.length;
      textLine = 3;

      setBlockFS = (inspireTextBlock,blockFontSize)=> {inspireTextBlock.style.fontSize = blockFontSize+'px'};
      setBlockStyle = (inspireTextBlock,val,prop)=> {inspireTextBlock.style[prop] = val};
      singleLineHeight = (blockHeight,textLine)=> blockHeight/textLine;
      blockFSCount = (blockWidth,blockHeight,singleLineHeight,textLine)=> {
        let blockFontSize = (blockWidth * textLine)/textLength;
        
        let checkFont = (blockFontSize,baseSide,textLine)=>{
          if(blockFontSize * textLine < baseSide && (blockFontSize+2) * textLine > baseSide){
            blockFontSize -= 2
            return blockFontSize;
          }
          else if(blockFontSize * textLine < baseSide){
            blockFontSize += 2;
            return checkFont(blockFontSize,baseSide,textLine)
          }else{
            blockFontSize -=2;
            return checkFont(blockFontSize,baseSide,textLine)
          }
        }
        // let mixCheckFont = checkFont(blockFontSize,blockWidth>blockHeight?blockWidth:blockHeight,textLine);
        let mixCheckFont = checkFont(blockFontSize,blockWidth>blockHeight?blockWidth:blockHeight,textLine);
        console.log(mixCheckFont);
        // fontWidth = fontWidth > singleLineHeight ? singleLineHeight : fontWidth;
        // fontWidth =fontWidth; // 防止边界问题 文字溢出
        return blockFontSize;
      };
      
      let line2,line3;
      line2 = blockFSCount(blockWidth,blockHeight,singleLineHeight(blockHeight),textLine);
      line3 = blockFSCount(blockWidth,blockHeight,singleLineHeight(blockHeight),textLine+1);
      // getBlockFs = line2 > line3 ? line2:line3;
      getBlockFs = line2
      setBlockFS(inspireTextBlock,getBlockFs);
      // setBlockStyle(inspireTextBlock,getBlockFs+'px','lineHeight');
      console.log(getBlockFs);


    },

  },
  watch:{
    
    // chooseCompany:{
    //   handler(newVal){
    //     this.$nextTick().then(()=>{
    //       console.log(newVal)
    //       this.changeCompanyInfo(newVal);
    //     })
    //   },
    // },

    // insText(newVal){
    //   this.selfAdaptionText(newVal);
      
    // },

    creatPosterListen(newVal){
      if(newVal){
        // function onHandler(e){
        //   e.preventDefault();
        //   console.log('ok');
        // }
        // let poster = document.getElementById('poster_img');
        // let cover = document.getElementById('cover');
        
        // this.getPoster(onHandler);
        this.getPoster();
            
      }
    }
    
  }
};
</script>

<style lang="scss">
// @import '../../assets/scss/_public.scss';

$themeGreen:#09a4a3;


#spposter{
    position: relative;
    background:$themeGreen;
    display: flex;
    width: 100%;
    min-height:100%;
    padding-top:1.4rem;

//   padding:1rem 0 0;
  .g-content-block{
      position: relative;
      
  }
  .m-freshBar{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 0.2rem;
      display: flex;

  }
  .u-fresh{
      @include circularBeadBtn(1rem,2rem);
      margin:auto;

  }

  .test{
    position: absolute;
    left:0;
    top: -0.4rem;

    .test25{
      background: red;
      margin-bottom: 4px;
    }
    .test30{
      background: yellow;

    }
  }
  #poster_content{
      position: relative;
      width: 100%;

  }

  #poster_img{
      width:100%;

  }

  .g-content-block{
    
    width: 90%;
    height: 100%;
    min-height: 450px;
    margin: auto;
    margin: 1rem auto 0.2rem;
    background: white;
    border-radius: 6px;
    padding: 0.3rem 0.3rem ;
    box-sizing: border-box;
    position: relative;
    .m-lian-icon{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%,-50%);
      background: $themeGreen;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      display: flex;
      border: 4px solid white;

    }
    .img-lian{
      width: 50%;
      height: auto;
      margin: auto;
    }

    .m-user_info-fresh-layout{
      display: flex;
      // height: 6%;
      height:0.6rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.34rem;

      .u-user_info{
        display: flex;
        align-items: center;
        height: 100%;

      }
      
      .avatar{
        height: 100%;

      }
      .avatar-img{
        border-radius: 50%;
        height: 100%;

      }
      .username{
        font-weight: bold;

      }
      .u-fresh{
        color:#17a6fb;

      }

    }

    .inspire-text{
      // position: relative;
      font-size: 0.5rem;
      font-weight: bold;
      margin: 0.4rem 0;
      // height: 24%;
      line-height: 140%;
      // height: 2rem;
      // padding: 1px;

      overflow: hidden;
      // text-overflow:ellipsis;
      // display:-webkit-box;
      // -webkit-line-clamp:2;
      // -webkit-box-orient:vertical;
    }

    .m-label-content{
      width: 100%;
      // height: 50%;
      height:6rem;
      margin: auto;
      border-radius: 10px;
      // background: black;
      background-image: url('../../assets/image/labelPopBgImg.jpg');
      background-size: 100% auto;
      background-position: center;

    }

    .m-company_info-qrcode{
      
      display: flex;
      align-items: center;
      justify-content: space-around;
      // height: 16%;
      height:1.4rem;
      margin:0.2rem 0;
      background: #f3f3f3;
      border-radius: 10px;

      .u-company_info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: nowrap;
        height: 100%;
        width: 70%;

      }

      .company_name{
        font-size: 0.3rem;
        font-weight: bold;
        @include ellipsis;

      }

      .tags{
        font-size: 0.2rem;
        color: #898989;
        // margin:0.4rem 0 0; 
        @include ellipsis;
        
      }

      .u-qrcode{
        width: 30%;
        height: 100%;
        text-align: center;
        .qrcode{
          width: auto;
          height: 100%;

        }

      }
      
    }

    .sp-info_qrcode{
        position: absolute;
        bottom: 0;
        margin:0;
        padding: 0.2rem;
        left:0;
        right:0;
        border-radius: 0;
        background-color: #00000020;
        .company_name{
            color:white;

        }
        .tags{
            color:#ccc;

        }
    }

  }
  
  .btn-choose{
    position: absolute;
    left: 0;
    bottom: -1.4rem;
    width: 100%;
    height: 1.6rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.4rem;
    box-sizing: border-box;

    border-radius: 10px 10px 0 0;
    background: white;

    .m-op_item{
      // &:nth-child(1){
      //   .u-op_item-icon{
      //     background: #51bd5a;
      //   }
      // }
      // &:nth-child(2){
      //   .u-op_item-icon{
      //     border:2px solid #51bd5a;
      //     background: white;
      //   }
      // }
      &:nth-child(1){
        .u-op_item-icon{
          background: #12a6a5;
        }
      }
      // &:nth-child(4){
      //   .u-op_item-icon{
      //     background: #4cb0e9;
      //   }
      // }

      }
      .u-op_item-icon{
        display: flex;
        box-sizing: border-box;
        width: 0.8rem;
        height: 0.8rem;
        
        border-radius: 50%;
        padding: 8px;
                
      }
      .u-op_item-text{
        text-align: center;

      }
      .img_op_icon{
        margin:auto;
        width: 80%;
        height: auto;
        
      }
  }
  .create_post{
    position:fixed;
    right: 0;
    bottom: 10%;
    width: 1rem;
    height:1rem;
    border-radius: 50%;
    color: white;
    background:$themeGreen;
    font-size: 0.4rem;
    text-align:center;
    line-height: 1rem;


  }

  // 换一批按钮样式
  .fresh-btn{
    position:fixed;
    display:flex;
    left:auto;
    right: 2%;
    bottom: 10%;

    border-radius:50%;
    width:1rem;
    height:1rem;

    background:rgba(73, 161, 162, 0.6);
    box-shadow:0px 0px 0px 6px rgba(73, 161, 162, 0.4);
    z-index:1;
  }

  .fresh-center-circle{
    display:inline-block;
    margin:auto;
    border-radius:50%;    
    width:0.8rem;
    height:0.8rem;

    color: #60a7a8;
    font-size: 0.12rem;
    line-height: 1.2rem;
    text-align: center;
    vertical-align: bottom;
    font-weight:bold;

    background-color: white;
    background-image:url('../../assets/icon/posterCreate.png');
    background-repeat: no-repeat;
    background-position: center 20%;
    background-size: auto 50%;
    
  }

  // #cover{
  //   position: fixed;
  //   top: 0;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
    
  // }

  #poster-img-content{
    width: 100%;
    // height: 100%;
    top: 0;
    left: 0;
    position: absolute;

    .poster-img{
      width: 100%;
      height: auto;

    }
  }

  #poster-img-show{
      width:100%;
      position:absolute;
      top: 0;
    .poster-img{
        width:100%;

    }
  }
}

</style>
