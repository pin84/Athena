<template>
  <div id="poster">
    <div class="g-content-block">
      
      <div class="m-lian-icon">
        <img class="img-lian" src="../../assets/icon/lian@2x.png" alt="">
      </div>

      <div class="m-user_info-fresh-layout">
        <div class="u-user_info">
          <div class="avatar">
            <img :src="headimgUrl" alt="" class="avatar-img"/>
          </div>
          <div class="username">
            {{userName}}
          </div>
        </div>

        <div class="u-fresh" @click="getInspirationalText">
          换一换<i class="iconfont">&#xe6a7;</i>
        </div>

      </div>
      <div ref="inspireText" class="inspire-text">
        {{insText}}
        <!-- 不要总想着有人能与我们并肩前行，因为大多数人都只是擦肩而过啊 -->
      </div>
      <div ref="labelContent" class="m-label-content">
        <svg id="#svg-tag" ref="svgTag"></svg>
      </div>

      <div class="m-company_info-qrcode">

        <div class="u-company_info">
          <div class="company_name">
            {{chooseCompany.companyName}}
          </div>
          <div class="tags"> 
            主营:<template v-for="tag in chooseCompany.companyTags" >{{tag}}、</template>
          </div>
        </div>

        <div class="u-qrcode" >
          <vue-qr class="qrcode" :dotScale="1" :text="qrcode" :logoSrc="qrCodeImg" :size="90" :margin="0"/>
        </div>

      </div>
    </div>
    
    <div v-if="!getPosterBegin" class="btn-choose">
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
    </div>

    <div v-if="posterImgSrc" id="poster-img-content">
      <img :src="posterImgSrc" alt="" class="poster-img">
    </div>

  </div>
</template>

<script>
import VueQr from 'vue-qr'
import LabelShow from '@/components/pop/shanglian/LabelShow';
import { setTimeout } from 'timers';

export default {
  mixins:[LabelShow],
  data() {
      return {
          qrcode: location.href,
          qrCodeImg:require('@/assets/icon/sxlIconSquare.jpg'),
          insText:'',
          posterImgSrc:null,
          headimgUrl:'',
          userName:'',
          html2ImgReady:false,
          getPosterBegin:false,

          optionsList:[
            // {
            //   imgSrc:require('../../assets/icon/wechat.png'),
            //   optionText:'微信',
            //   optionFunc:()=>{
            //     console.log('1')
            //   },
            // },
            // {
            //   imgSrc:require('../../assets/icon/friendNet.png'),
            //   optionText:'朋友圈',
            //   optionFunc:()=>{
            //     console.log('2')
            //   },
            // },
            {
              imgSrc:require('../../assets/icon/download.png'),
              optionText:'下载',
              optionFunc:()=>{
                
                let ready= ()=>{

                
                  let message = true;
                  if(this.getCompanyInfo == false){
                      message = '企业信息缺失';
                  }else{
                    if(!this.html2ImgReady){
                      message = '标签信息正在生成,请稍后';
                    }
                  }
                  if(this.inspireText == ''){
                    message = `激励语句缺失，请点击"换一换"或检查网络是否正常`;
                  }
                  if(message === true){
                    return true
                  }
                  this.$toast({
                    message
                  })
                  return false;
                }

                if(ready()){
                  this.getPoster();
                }

              },
            },
            // {
            //   imgSrc:require('../../assets/icon/qrcode.png'),
            //   optionText:'二维码',
            //   optionFunc:()=>{
            //     console.log('4')
            //   },
            // },
            // {
            //   imgSrc:require('../../assets/icon/QQ.png'),
            //   optionText:'QQ',
            //   optionFunc:()=>{
            //     console.log('5')
            //     /*
            //   },
            // },

          ],
          getCompanyInfo:false,
          chooseCompany:{
            companyName:'xxx有限公司',
            companyTags:['标签一','标签二','标签三','标签一','标签二','标签三','标签一','标签二','标签三',],
            enterprisesid:'',
            industryid:0, 
          },
      }
  },
  
  props:{
    
  },

  components:{
    VueQr,

  },
  computed:{
    
  },
  
  created(){
    console.log(this.toBaseInfo)
    this.getInspirationalText();
    console.log(this.$route)
    console.log(this.$route.query)
    console.log(this.$route.params)
    if(!this.$route.params.companyName){
      this.$toast({
        message:'公司信息缺失'
      })
      this.getCompanyInfo = false;
    }else{
      this.chooseCompany = this.$route.params
      this.getCompanyInfo = true;
    }
    console.log(this.$route.params)
    let { username,headimgUrl } = this.$store.state.loginInfo.userInfo;
    this.headimgUrl = headimgUrl;
    this.userName = username;
    
    setTimeout(()=>{
      this.html2ImgReady = true;
    },200 * this.chooseCompany.companyTags.length + 100)
    
  },
  mounted(){

    this.labelMountedInit();
    console.log(
      this.containerWidth,
      this.containerHeight
    )

  },
  methods: {

    // 获得心灵鸡汤
    async getInspirationalText(){
      let {content} = await this.$axios.get(this.$api.inspirationalText).then(res=>res.data)
      this.insText = content;
      // setTimeout(()=>{
      //   this.insText = '人不要太任性，因为你是活给未来的你。不要让未来的你讨厌现在的'
      // },1000)
    },

    // 获得海报
    getPoster(){
      this.getPosterBegin = true;
      setTimeout(()=>{
        this.$h2c(document.getElementsByTagName('html')[0],{useCORS: true})
        .then(canvas=>{
          this.posterImgSrc = canvas.toDataURL("image/png",1)
  
        })
        
      },0);

    },

    selfAdaptionText(text){
      let inspireTextBlock, //鸡汤容器
          blockWidth, //容器宽
          blockHeight, //容器高
          textLength, //鸡汤字体数
          textLine, //鸡汤显示行数
          textFontSize, //鸡汤文字大小
          setBlockFS, //控制容器字体大小
          singleLineHeight, // 单行高度
          blockFSCount, // 计算容器需要的字体大小
          getBlockFs //控制容器字体大小的计算结果
      ;

      inspireTextBlock = this.$refs.inspireText;
      blockHeight = Math.floor(inspireTextBlock.offsetHeight);
      blockWidth = Math.floor(inspireTextBlock.offsetWidth);
      textLength = text.length;
      textLine = 2;

      setBlockFS = (inspireTextBlock,blockFontSize)=> {inspireTextBlock.style.fontSize = blockFontSize+'px'};
      singleLineHeight = (blockHeight)=> blockHeight/2;
      blockFSCount = (blockWidth,blockHeight,singleLineHeight,textLine)=> {
        let fontWidth = (blockWidth* textLine)/textLength;
        fontWidth = fontWidth > singleLineHeight ? singleLineHeight : fontWidth;
        fontWidth =Math.floor(fontWidth) - 4; // 防止边界问题 文字溢出
        // debugger
        return fontWidth;
      };
      
      let line2,line3;
      line2 = blockFSCount(blockWidth,blockHeight,singleLineHeight(blockHeight),textLine);
      // line3 = blockFSCount(blockWidth,blockHeight,singleLineHeight(blockHeight),textLine+1);
      // getBlockFs = line2 > line3 ? line2:line3;
      getBlockFs = line2
      setBlockFS(inspireTextBlock,getBlockFs);

      console.log(getBlockFs);


    },

  },
  watch:{
    // 
    chooseCompany:{
      handler(newVal){
        this.$nextTick().then(()=>{
          console.log(newVal)
          this.changeCompanyInfo(newVal);
        })
      },
    },

    insText(newVal){
      this.selfAdaptionText(newVal);
      
    },
    
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/_public.scss';
$themeGreen:#09a4a3;


#poster{
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  background:$themeGreen;
  display: flex;
  width: 100%;

  .g-content-block{
    width: 90%;
    height: 90%;
    min-height: 450px;
    margin: auto;
    background: white;
    border-radius: 6px;
    padding: 0.3rem;
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
      height: 6%;
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
      font-size: 0.42rem;
      font-weight: bold;
      margin: 4% 0;
      height: 24%;
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
      height: 50%;
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
      height: 16%;
      margin-top: 2%;
      background: #f3f3f3;
      border-radius: 10px;

      .u-company_info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: nowrap;
        height: 100%;
        width: 60%;

      }

      .company_name{
        font-size: 0.4rem;
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

  #poster-img-content{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;

    .poster-img{
      width: 100%;
      height: auto;

    }
  }
}

</style>
