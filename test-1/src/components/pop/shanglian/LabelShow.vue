<template>
  <div
    class="g-pop label-pop"
    @click.stop
    :class="{'g-pop-show':labelShow.isShow}"
  >
    <div class="u-mask"></div>
    <div class="m-bannerBg">
      <SearchBoxStarter v-if="linkPopStyle && showSearch" @changeCompany="getCompany" id="label-search-style"/>
      <div
        class="u-close"
        @click="close"
      >
        <img
          class="icon"
          src="@/assets/icon/close@2x.png"
          alt=""
        >
      </div>
      
      <div ref="labelContent" class="m-content">
        <div v-show="!showSearch" class="company-name">
          {{propCompanyInfo.companyName}}
        </div>
        <div class="content-tag">
        <svg class="svg-tag" ref="svgTag"></svg>
        </div>
      </div>
      
      <div class="m-footer" >
        <div class="m-footer-leftbtn">
          +关注
        </div>
        <div @click="toBaseInfo" class="m-footer-rightbtn">
          基本信息
        </div>
        <div @click="toGetPoster" class="m-footer-leftbtn">
          生成海报
        </div>
      </div>

      <div v-if="linkPopStyle && isShowToPoster" @click="searchCompanyToPoster" class="m-to_poster" >
        我也要生成海报 >
      </div>
    </div>
  </div>


</template>

<script>
import d3Cloud from 'd3-cloud';
import SearchBoxStarter from "@/components/shangLian/SearchBoxStarter"; //搜索框
import upIndustry from '@/assets/js/upIndustry';

export default {
  name:'LabelShow',

  components: {
    SearchBoxStarter,

  },
  props:{
    companyInfo:{
      type:Object,
      default:()=>{
        return{
          companyName:'xxx公司',
          companyTags:['标签一','标签二','标签三'],
          enterprisesid:'',
          industryid:0,
        }
      },
    },

    labelShow:{
      type:Object,
      default:()=>{
        return{
          isShow:false
        }
      },
    }
  },
  data() {
    return {
      baseFontSize:5,
      chartRef:null,

      // 容器宽高
      containerWidth:0, 
      containerHeight:0,

      isShowToPoster:false,
      linkPopStyle:false,
      showSearch:false,


      // 公司标签
      companyTags:[
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },{
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        },
        {
          name:'标签一',
          value:1,
          href:'http://www.baidu.com'
        }
      ],
      companyTagsD3Data:[],
      propCompanyInfo:this.companyInfo,
      indexGetInfo:null,
    }
  },

  computed:{
    
   
  },

  async created(){
    this.linkShow();
    
  },

  mounted(){
    this.labelMountedInit();
  },
  activated(){
    this.bus.$on('labelShowCall',this.labelCall);
  },
  deactivated(){
    this.bus.$off('labelShowCall');
  },
  
  methods:{

    labelCall(enterpriseid,enterprise,industryid, hadCompanyInfo,/*,path='/'*/){
      // if(path == this.$route.path){
        this.getCompany(enterpriseid,enterprise, industryid , hadCompanyInfo);
        this.labelShow.isShow = true;
      // }
    },

    linkShow(){
      
      let {
        linkPop,
        companyName,
        enterpriseid,
        industryid,
      } = this.$route.query;
      
      if(linkPop =='poster' && enterpriseid && industryid){
        
        this.labelCall(enterpriseid,companyName, industryid);
        this.linkPopStyle = true;
        this.isShowToPoster = true;
        // this.getCompany(enterpriseid,companyName, industryid);
        // this.labelShow.isShow = true;
        // this.linkPopStyle = true;
        // this.isShowToPoster = true;

      }

    },
    
    async getCompany(companyId,companyName, industriesId,hadCompanyInfo){
      let companyOtherInfo;
      if(hadCompanyInfo){
        companyOtherInfo = hadCompanyInfo;
      }else{
        companyOtherInfo = await this.$axios.get(this.$api.searchCompany,{
            params:{
              enterpriseid:companyName,
              industryid:+industriesId,
            }
        }).then(res=>res.data).catch(rej=>rej)
      }
      console.log(companyOtherInfo)
      
      let {kind} = companyOtherInfo;

      this.indexGetInfo = {
        companyName,
        companyTags:this.$commonFn.businessScope(kind),
        enterprisesid:companyId,
        industryid:industriesId,
      }
      
    },

    searchCompanyToPoster(){
      this.showSearch = true;
      this.isShowToPoster =false;

    },

    labelMountedInit(){
      this.chartRef = this.$refs.svgTag;
      let containerWidth  = this.chartRef.parentElement.offsetWidth;
      let containerHeight  = this.chartRef.parentElement.offsetHeight;
      this.containerWidth = containerWidth;
      this.containerHeight = containerHeight;
      
    },
    // 生成海报
    toGetPoster(){
      // return
      // console.log(this.propCompanyInfo)
      // return
      
      this.$router.push({
        name:'poster',
        params:this.propCompanyInfo
      })

    },

    close() {
      // this.item.isShow = !this.item.isShow;
      this.labelShow.isShow = false;
      this.linkPopStyle = false;
    },

    // 跳转到baseInfo
    async toBaseInfo(){
      let {
        enterprisesid,
        industryId,
        industryid,
        companyName,
      } = this.propCompanyInfo

      // let enterprisesid = this.propCompanyInfo.enterprisesid;
      // let companyName = this.propCompanyInfo.companyName
      // let industryid = this.industryid
      this.close();
      // this.labelShow.isShow = false;

      let chooseInfo = {
        enterpriseid:enterprisesid,
        industryid:+(industryId||industryid),
        companyName,
      }
      // console.clear();
      console.log(chooseInfo);
      this.$store.commit('showPop',{
        popName:'dimen-1',
        params:{
          chooseInfo
        }
      })
    },

    initTag(tagData){
      let d3 = this.$d3;
      this.chartRef = this.$refs.svgTag;

      let containerWidth  = this.containerWidth;
      let containerHeight  = this.containerHeight;
      
      const data = tagData;
      let chart = d3.select(this.chartRef)

      let fill = d3.scaleOrdinal(d3.schemeCategory20) // 定义颜色

      let words = tagData;
      // let words = data.map(item => {
      //   // 处理原始数据
      //   return {
      //     text: item.name,
      //     size: 10 + item.value * 8,
      //     href: item.href
      //   }
      // })

      let layout = d3Cloud() // 构建云图
        .size([containerWidth, containerHeight])
        .words(words)
        .padding(5)
        .rotate(function() {
          return ~~(Math.random() * 2) * 90
        })
        .font('Impact')
        .fontSize(function(d) {
          return d.size
        })
        .on('end', draw)

      layout.start()

      function draw(words) {
        // 输出所有标签
        let g = chart
          .attr('width', containerWidth)
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            'translate(' + containerWidth / 2 + ',' + layout.size()[1] / 2 + ')'
          )

        g.selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .on('click', function(d) {
            window.open(d.href)
          })
          .style('font-family', 'Impact')
          .style('cursor', 'pointer')
          .style('fill', function(d, i) {
            return fill(i)
          })
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
          })
          .style('font-size', function(d) {
            return d.size + 'px'
          })
          .text(function(d) {
            return d.text
          })
          .append('title')
          .text(function(d) {
            return d.href
          })

        g.selectAll('text') // 创建动画
          .style('fill-opacity', 0)
          .transition()
          .duration(200)
          .delay(function(d, i) {
            return i * 200
          })
          .style('fill-opacity', 1)
      }
    },

    changeCompanyInfo(newVal){
      this.propCompanyInfo = JSON.parse(JSON.stringify(newVal));
      
      this.$d3.selectAll('.svg-tag').select('g').remove();

      console.log(newVal.companyTags)
      let companyTags = this.$commonFn.businessScope(newVal.companyTags);
      if(!companyTags.length){
        this.$toast({
          message:'该企业暂无主营标签',
          duration:1000,
        })
        // return;
      }
      let tagData = [];

      console.dir(this.$refs.labelContent);
      let labelContent = this.$refs.labelContent;
      let contWidth = labelContent.innerWidth || labelContent.clientWidth;
      let contHeight = labelContent.innerHeight || labelContent.clientHeight;
      console.log(contWidth,contHeight)
      let shortSide = contWidth <= contHeight?contWidth:contHeight;

      console.log(shortSide);
      let baseFontSize = 5*6;

      companyTags.forEach(ele => {
          let itemFontSize = baseFontSize;
          let tagLen = ele.length;
          if(ele.length * baseFontSize > shortSide){
            itemFontSize = shortSide / ( tagLen + 6 );
            console.log('itemFontSize',itemFontSize);
          }
          tagData.push({
            text:ele,
            size: itemFontSize,
            href:''
          })
      });

      this.initTag(tagData);
    },
  },


  watch:{
    indexGetInfo(newVal){
      this.changeCompanyInfo(newVal);
    },
    companyInfo:{
      handler(newVal){
        this.changeCompanyInfo(newVal);
      },
      deep:true,
    }

  }
}
</script>

<style lang="scss">

.g-pop.label-pop{
    #label-search-style{

      position: absolute;
      z-index: 12;

      .search-input{
        background: white;
        color:#9a9a9a;

      }
    }

    .m-bannerBg{
      width:80%;
      height:70%;
      margin:auto;
      background-image: url('../../../assets/image/labelPopBgImg.jpg');
      background-size: 100% auto;
      background-position: center;

    }

    $boundary:1rem;
    .m-content{
      color:#08a3a2;
      
      top:0;
      bottom:1rem;
      background:transparent;
      overflow: hidden;

      .company-name{

        // $height :
        margin-top:6px;
        margin-left:auto;
        margin-right:auto;
        text-align: center;
        font-size:0.3rem;
        // line-height: 0.4rem;
        text-overflow: ellipsis;
        height:0.6rem;
        border: 1px solid #c0c0c0;
        border-radius: 0.3rem;
        width: 90%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        // padding: 0.1rem 0;
      }

      .content-tag {
        position:absolute;
        left:0;
        right:0;
        top:0.8rem;
        bottom:0;

        .svg-tag{
          width:100%;
          height:100%;

        }
      }

      
    }
    
    .m-footer{
      display:flex;
      align-items: center;
      justify-content: space-around;
      height: 1rem;
      background-color:transparent;

      $themeColor:#08a3a2;
      .m-footer-leftbtn,.m-footer-rightbtn{
        $height:0.6rem;
        width:30%;
        height: $height;
        border:1px solid $themeColor;
        border-radius: $height;

        text-align: center;
        line-height: $height;
        font-size: 0.3rem;
      }
      .m-footer-leftbtn{
        color:$themeColor;
        background-color: transparent;
      }
      .m-footer-rightbtn{
        
        color:white;
        background-color: $themeColor;


      }

    }

    .m-to_poster{
      
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(0,120%);
      
      width: 100%;
      height: 0.8rem;
      background: white;
      border-radius: 0.4rem;
      text-align: center;
      font-size: 0.36rem;
      line-height: 0.8rem;
      color:#0aa3a4;


    }
    
    // width:80%;

    // position: absolute;
    // left:50%;
    // top:50%;
    // width:80%;
    // height:70%;
    // background: black;
    // z-index:1000;
    // border-radius: 10px;

    // transform: translate(-50%,-45%);

    // .u-close{
    //   position: absolute;
    //   right: 0;
    //   top: -5px;
    //   -webkit-transform: translateY(-100%);
    //   transform: translateY(-100%);
    //   width: 30px;
    //   height: 30px;

    //   .icon{
    //     width: 100%;
    //   }
    //   // height: 0.2rem;
    // }

    // .u-mask{
    //     background-color: black;
    //     opacity: .8;
    //     position: fixed;
    //     top: 0;
    //     bottom: 0;
    //     left: 0;
    //     right: 0;
    //     width: 100%;
    //     height: 100%;
    // }
}

</style>
