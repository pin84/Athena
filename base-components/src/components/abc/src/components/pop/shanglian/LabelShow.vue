<template>
  <div
    class="g-pop label-pop"
    @click.stop
    :class="{'g-pop-show':labelShow.isShow}"
  >
    <div class="u-mask"></div>
    <div class="m-bannerBg">
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
        <div class="company-name">
          {{companyInfo.companyName}}
        </div>
        <div class="content-tag">
        <svg id="svg-tag" ref="svgTag"></svg>
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
    </div>
  </div>


</template>

<script>
import d3Cloud from 'd3-cloud';

export default {
  components: {
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
    }
  },

  mounted(){
    this.labelMountedInit();
  },
  
  methods:{
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
      this.$router.push({
        name:'poster',
        params:this.companyInfo
      })

    },

    close() {
      // this.item.isShow = !this.item.isShow;
      this.labelShow.isShow = false;
    },

    // 跳转到baseInfo
    async toBaseInfo(){
      let {
        enterprisesid,
        industryId,
      } = this.companyInfo
      // let enterprisesid = this.companyInfo.enterprisesid;
      // let companyName = this.companyInfo.companyName
      // let industryid = this.industryid
      this.close();
      // this.labelShow.isShow = false;
      // debugger;
      let chooseInfo = {
        enterpriseid:enterprisesid,
        industryid:industryId,
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
      this.$d3.select('#svg-tag').select('g').remove();

      console.log(newVal.companyTags)
      let companyTags = newVal.companyTags;
      
      let tagData = [];

      console.dir(this.$refs.labelContent);
      let labelContent = this.$refs.labelContent;
      let contWidth = labelContent.innerWidth || labelContent.clientWidth;
      let contHeight = labelContent.innerHeight || labelContent.clientHeight;
      console.log(contWidth,contHeight)
      let shortSide = contWidth <= contHeight?contWidth:contHeight;
      // debugger
      console.log(shortSide);
      let baseFontSize = 5*6;

      companyTags.forEach(ele => {
          let itemFontSize = baseFontSize;
          let tagLen = ele.length;
          if(ele.length * baseFontSize > shortSide){
            itemFontSize = shortSide / ( tagLen + 4 );
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
    companyInfo(newVal){
      this.changeCompanyInfo(newVal);
    }

  }
}
</script>

<style lang="scss">

.g-pop.label-pop{
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
        // padding: 0.1rem 0;
      }

      .content-tag {
        position:absolute;
        left:0;
        right:0;
        top:0.8rem;
        bottom:0;

        #svg-tag{
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
