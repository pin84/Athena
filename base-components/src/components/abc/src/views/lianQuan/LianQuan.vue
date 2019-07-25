<template>
  <div class="lianQuan">
    <svg
      id="force-lian"
      width="100%"
      height="100%"
    >
      <symbol
        id="add-group"
        viewBox="0 0 86 86"
      >
        <g>
          <title>background</title>
          <rect
            fill="#000000"
            id="canvas_background"
            height="302"
            width="302"
            y="-1"
            x="-1"
          />
          <g
            display="none"
            overflow="visible"
            y="0"
            x="0"
            height="100%"
            width="100%"
            id="canvasGrid"
          >
            <rect
              fill="url(#gridpattern)"
              stroke-width="0"
              y="0"
              x="0"
              height="100%"
              width="100%"
            />
          </g>
        </g>
        <g>
          <title>Layer 1</title>
          <ellipse
            rx="1"
            id="svg_2"
            cy="122.4375"
            cx="660.5"
            stroke-width="1.5"
            stroke="#000"
            fill="#fff"
          />
          <ellipse
            stroke="#ffffff"
            stroke-dasharray="40,40"
            ry="140"
            rx="140"
            id="svg_4"
            cy="150.999993"
            cx="150"
            stroke-width="10"
            fill="#000000"
          />
          <ellipse
            ry="120"
            rx="120"
            id="svg_5"
            cy="150"
            cx="150"
            stroke-width="10"
            stroke="#ffffff"
            fill="#000000"
          />
          <line
            stroke-linecap="null"
            stroke-linejoin="null"
            id="svg_11"
            y2="224.000007"
            x2="150.000004"
            y1="74.000007"
            x1="150.000004"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="10"
            stroke="#ffffff"
            fill="none"
          />
          <line
            x1="75.000001"
            stroke-linecap="null"
            stroke-linejoin="null"
            id="svg_12"
            y2="145"
            x2="225.000001"
            y1="145"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="10"
            stroke="#ffffff"
            fill="none"
          />
        </g>
      </symbol>

      <symbol
        id="circlepng"
        viewBox="0 0 86 86"
      >
        <circle
          fill="white"
          r="43"
          cx="43"
          cy="43"
        ></circle>
      </symbol>

      <symbol id="add-icon" viewBox="0 0 80 80">
        <!-- <g>
                <title>background</title>
                <rect fill="#000000" id="canvas_background" height="82" width="82" y="-1" x="-1"/>
                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" stroke-width="0" y="1" x="1" height="300" width="300"/>
                </g>
                </g> -->
        <!-- <g> -->
        <!-- <title>Layer 1</title> -->
        <!-- <ellipse rx="1" id="svg_2" cy="123.4375" cx="661.5" stroke-width="1.5" stroke="#000" fill="#fff"/> -->
        <!-- <line stroke-linecap="null" stroke-linejoin="null" id="svg_11" y2="225.000007" x2="151.000004" y1="75.000007" x1="151.000004" fill-opacity="null" stroke-opacity="null" stroke-width="10" stroke="#ffffff" fill="none"/> -->
        <!-- <line x1="76.000001" stroke-linecap="null" stroke-linejoin="null" id="svg_12" y2="146" x2="226.000001" y1="146" fill-opacity="null" stroke-opacity="null" stroke-width="10" stroke="#ffffff" fill="none"/> -->
        <ellipse
          stroke-dasharray="10,10"
          ry="39"
          rx="39"
          id="svg_13"
          cy="40"
          cx="40"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="#000000"
        />
        <ellipse
          ry="34"
          rx="34"
          id="svg_14"
          cy="39.999999"
          cx="39.999999"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="#000000"
        />
        <line
          stroke-linecap="null"
          stroke-linejoin="null"
          id="svg_15"
          y2="40"
          x2="60"
          y1="40"
          x1="20"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          stroke="#ffffff"
          fill="none"
        />
        <line
          stroke="#ffffff"
          stroke-linecap="null"
          stroke-linejoin="null"
          id="svg_16"
          y2="60"
          x2="40"
          y1="20"
          x1="40"
          fill-opacity="null"
          stroke-opacity="null"
          stroke-width="2"
          fill="none"
        />
        <!-- </g> -->
      </symbol>

      <symbol id="lian-main-Bth" viewBox="0 0 80 80">
        <g>
          <circle
            r="30%"
            id="svg_14"
            cx="50%"
            cy="50%"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="2"
            stroke="#ffffff"
            fill="#000000"
          />
        </g>
      </symbol>

    </svg>

    
<!-- <PrecisionSearch /> -->
      <!-- 分组管理、企业管理按钮 -->
    <!-- <ManageBtn />
    <GroupManage />
    

    <TemplateList />
    <SelectTemType />
    <MsgTemplate />
    <EditMsgTemplate />


    <VideoTemplate />
    <SearchCompany
      class="searchCom"
      v-if="false"
    /> -->

    <CompanyList   />
    <!-- <PrecisionSearch  v-if="false"/> -->
    <!-- 分组管理、企业管理按钮 -->
    <!-- <ManageBtn />
    <GroupManage />
    <CompanySetting />
    <CompanyContact />-->

    <!-- <SelfInfoPop  v-if="false"/>  -->
  </div>
</template>

<script>
let vm = null,
  d3 = null;
import SearchCompany from "@/components/pop/lianQuan/SearchCompany";
import CompanyList from "@/components/pop/shanglian/CompanyList"; // 上下链点击后显示的弹窗
import CompanySetting from "@/components/pop/companySetting/CompanySetting";
import CompanyContact from "@/components/pop/companySetting/CompanyContact";
import TemplateList from "@/components/pop/pushTemplate/TemplateList";
import SelectTemType from "@/components/pop/pushTemplate/selectTemType";
import MsgTemplate from "@/components/pop/pushTemplate/MsgTemplate";
import EditMsgTemplate from "@/components/pop/pushTemplate/EditMsgTemplate";
import VideoTemplate from "@/components/pop/pushTemplate/VideoTemplate";
import SelfInfoPop from "@/components/pop/selfPic/InfoPop";
import ManageBtn from "@/components/pop/manageBtn/ManageBtn";
import GroupManage from "@/components/pop/manageBtn/GroupManage";
import PrecisionSearch from "@/components/pop/shanglian/PrecisionSearch";




export default {
  name: "lianQuan",
  components: {
    SearchCompany,
    CompanyList,
    CompanySetting,
    CompanyContact,
    TemplateList,
    MsgTemplate,
    EditMsgTemplate,
    VideoTemplate,
    SelectTemType,
    SelfInfoPop,
    ManageBtn,
    GroupManage,
    PrecisionSearch
  },

  data() {
    return {
      json: {},
      d3Obj: {},
      svgWidth:0, //svg在屏幕中的宽度
      svgHeight:0, //svg在屏幕中的高度,
      isPlus:false, //饼图是否处于放大状态 点击事件需在放大后才可触发
      canDragged:true, // 是否允许被拖拽
      bgShade:null, //d3 背景遮罩元素
      
      // sizeSet将会自适应改变 s
      textFontSize:16, //饼图文字大小
      nodeRadius:50,//饼图半径
      outerRadius:60, // 主按键半径
      borderRadius:60/3, //外边半径
      nodePadding:220, //节点间间距
      // sizeSet将会自适应改变 e
    };
  },
  beforeCreate() {
    vm = this;
    d3 = this.$d3;
    // this.$axios.get('http://192.168.31.73:8000/index/list/1'
    // )
    // .then(res=>{console.warn(res)})
    // .catch(rej=>{console.error(rej)})
  },
  async created() {
    
    this.sizeSet(); //屏幕自适应
    this.json = await this.$ajax.getLian(); //获得并处理相关数据

    this.$nextTick()
        .then(this.colorIcon())
        .then(this.initAtlasPie()) //初始化饼图
        .then(this.init()) //初始化
    this.$store.commit('showPop','companyList');

  },
  methods: {
    // 饼图大小自适应
    sizeSet(){
      let screenWidth = document.documentElement.offsetWidth, //屏幕宽度
          screenHeight = document.documentElement.offsetHeight, //屏幕高度
          baseSize = 0
      ;
      if(screenWidth > screenHeight ){
        baseSize = screenHeight
      }else{
        baseSize = screenWidth
      }

      this.nodeRadius = baseSize/4/2 -5;
      this.outerRadius = baseSize/4/2;
      this.borderRadius = baseSize/4/2 /3;
      this.nodePadding = (vm.outerRadius + vm.borderRadius)*4;
      this.textFontSize = this.nodeRadius/4;
      

    },
    // 初始化 图谱模型
    initAtlasPie(){
      let svg = d3.select("svg"),
      pieSymbol, // 饼图Symbol标签
      pieG, //
      outerRadius = this.outerRadius, //图谱半径
      colorList =['#61a0a8','#ff8900','#d48265'],
      datas = [
        {title:'t1',value:1},
        {title:'t2',value:1},
        {title:'t3',value:1},
      ],
      pie = d3.pie().value(item=>item.value), //角度生成器
      pieRes = pie(datas),
      arc = d3.arc().innerRadius(0).outerRadius(outerRadius - 2) //圆弧生成器
      ;

      console.log(pieRes);

      // 饼图symbol 用于被引用
      pieSymbol = svg
                    .append('symbol')
                    .attr('id','pie')
                    .attr('viewBox',`0 0 ${outerRadius * 2} ${outerRadius * 2}`);
      // 饼图G标签 用于内部元素整体操作
      pieG = pieSymbol.append('g')
      
      pieRes.forEach((pieData,index)=>{
        let arcRes = arc(pieData);
        // console.log(pieData,'===',arcRes);

        let piePath  = pieG
                        .append('path')
                        .attr('d',arcRes)
                        .attr('stroke','transparent')
                        .attr('fill',colorList[index])
                        
      });
      pieG.append('circle')
          .attr('cx',0)
          .attr('cy',0)
          .attr('r',outerRadius/2)
          .style('fill','black') 

      pieG.attr('transform', `translate(${outerRadius}, ${outerRadius}) rotate(90)`);

    },
    // 渐变色预定义 此处有用于填充按钮
    colorIcon(){
      let svg = d3.select('svg'),
      defs = svg.append('defs'),
      gradient = defs.append('linearGradient'), //渐变色标签
      stopColor = gradient.append('stop'),
      stopColor2 = gradient.append('stop')
      ; //

      gradient.attr('id','main-color')
              .attr("x1", "0%")
              .attr("y1", "0%")
              .attr("x2", "0%")
              .attr("y2", "100%");

      stopColor.attr("offset", "0%")
               .attr("style", "stop-color:rgb(241,241,243);stop-opacity:1");
      stopColor2.attr("offset", "100%")
                .attr("style", "stop-color:rgb(178,178,178);stop-opacity:1");

    },
    
    // 初始化 图谱
    init() {
      let svg = d3.select("svg"),
       svgWidth = +svg.node().clientWidth,
       svgHeight = +svg.node().clientHeight,
       graphData = this.dataDeal({
         forceData: this.json //力布局处理布局需要用到的数据
       });
      
      this.graphData = graphData // ajax数据处理后的数据结果
      this.svgWidth = svgWidth; //svg在屏幕中的宽度
      this.svgHeight = svgHeight; //svg在屏幕中的高度
       // 数据处理

      // simulation 初始化力布局配置
      let simulation = this.initSimulation(),

      // 初始化处理节点间的连线
       link = this.initLinks(graphData),
       // 初始化处理节点
       getNodes = this.initNodes(graphData,simulation), //获取初始化节点后的各个selection
       {nodeG}= getNodes
       ;
       this.eventManage(getNodes,simulation,graphData,link,nodeG,svgWidth,svgHeight); //事件管理中心

      

      // 实时监听link node的x,y坐标更改
      // simulation.nodes(graphData.nodes).on("tick", ()=>vm.ticked(link,nodeG,svgWidth,svgHeight));
      // 力布局links
      simulation.force("link").links(graphData.links);


    },
    
    // 这里处理数据 将数据转换为图谱需要用到的数据
    dataDeal({ forceData = {} }) {
      let graphData = forceData; //提取数据
      // ...处理数据
      // 打标签 区分饼图类型
      Array.prototype.forEach.call(graphData.nodes, ele=>{
        
        let eleId = ele.id,
        className = ''
        
        switch(eleId.slice(0,3)){
          case 'pie' :
            className = 'pie'
          break;
          case 'add' :
            className = 'add'
          break;
          default:
            className = 'main'
        }
        
        ele.className = className
      })
      console.log(graphData)

      return graphData;
    },

    // 初始化力布局
    initSimulation() {
      // simulation.
      let simulation = d3
        .forceSimulation()
        .alphaMin(0.01)
        .force(
          "link",
          d3
            .forceLink()
            .distance(vm.nodePadding) //节点之间的距离
            .id(function(d) {
              return d.id;
            })
        )
        //节点碰撞检测半径值
        .force("collide",d3.forceCollide().radius(d => vm.outerRadius+vm.borderRadius) )
        // forceManyBody 创建一个使用默认参数的电荷力模型
        // charge 节点间的作用力 正值吸引力 负值排斥力
        .force("charge", d3.forceManyBody())
        //设置中心力的坐标
        .force("center", d3.forceCenter(vm.svgWidth / 2, vm.svgHeight / 2)); 

        return simulation
    },

    // links 生成节点间连线
    initLinks(graphData) {
      let svg = d3.select('svg');
      let link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .enter()
        .append("line")
        .attr('stroke','white')

      return link;
    },
    // nodes 生成节点
    initNodes(graphData,simulation) {

      let svg = d3.select('svg'), //svg节点
      nodes,//所有节点 每个节点都包含了nodeG nodeUse
      nodeG, //node Group 可操作的节点 包含了nodeUse nodeText
      nodeToUse,//即将使用use标签的节点
      nodeUse,//各个使用use标签的饼图
      nodeMain,//主按钮节点
      nodeText, //每个节点对应的文字描述
      textFontSize = this.textFontSize,  //每个节点的text标签的文字大小
      mainBtnUse,//主按钮的use标签
      addBtnUse,//增加按钮的use标签
      pieBtnUse,//分组按钮的use标签
      // arc = d3.arc(), // d3的arc生成器
      nodeRadius = this.nodeRadius, //饼图半径
      outerRadius = this.outerRadius, // 主按键半径
      borderRadius = this.borderRadius //外边半径
      ;

      // 各个节点
      nodes = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graphData.nodes) // 绑定数据
                .enter()
                .datum(function(d,i) {
                // 向被绑定数据里绑定节点宽高
                  switch(d.className){
                    case 'add':
                      case 'pie':
                      d.radius = nodeRadius;
                    break;
                    case 'main':
                      d.radius = outerRadius+borderRadius;
                    break;
                  }
                  d.nodeOrder = `node-${i}`;
                  return d;
                })
      // 节点组 节点的所有内容
      nodeG = nodes.append('g')
      nodeG.attr('class','nodeG')
           .attr('id',function(d,i){
            //  用于标识每个node 方便操作
             return `node-${i}`;
           })
      
      // add & pie
      nodeToUse = nodeG.select(function(d){
        if(d.className != 'main') {
          return this;
        }
      })
      // mainBtn
      nodeMain =  nodeG.select(function(d){
        if(d.className == 'main') return this
      })
      this.initMainBtn(nodeMain,outerRadius,borderRadius) //初始化主按钮

      nodeUse = nodeToUse.append("use")
            .attr("width", d=>d.radius*2)
            .attr("height", d=>d.radius*2)
            .attr('transform',d=>`translate(${-d.radius},${-d.radius})`)

      // 包含text标签
      
      nodeText = nodeG.append('text')
      
      nodeText.style('font-size',textFontSize)
              .attr('fill','white')
              .attr('text-anchor','middle')
              .attr('transform',function(d){
                return `translate(0,${d.radius + textFontSize})`
              })
              .html(function(d){
                return d.id
              })

      // 增加按钮  
      addBtnUse = nodeUse
                  .select(function(d){
                    if(d.className == 'add') return this
                  })
      addBtnUse.attr("xlink:href", "#add-icon")
               .attr('class','add-btn')

      // 分组按钮  
      pieBtnUse = nodeUse
                  .select(function(d){
                    if(d.className == 'pie') return this
                  })
      pieBtnUse.attr("xlink:href", "#pie")
               .attr('class','pie-btn-use')
      
      // 增加遮罩
      let bgShade = d3.select('.nodes')
        .append('rect')
        .attr('id','bg-shade')
        .style('fill','black')
        .style('width','100%')
        .style('height','100%')
        .style('display','none');

      this.bgShade = bgShade;

        nodeG.call(
          d3
            .drag()
            .on("start", (d)=>vm.dragstarted(d,simulation)) //拖拽开始
            .on("drag", (d)=>vm.dragged(d,vm.width,vm.height)) //拖拽中
            .on("end", (d)=>vm.dragended(d,simulation)) //拖拽结束
        );

      return {nodeG,nodeToUse,nodeMain,nodeUse,pieBtnUse,addBtnUse,};
    },
    // 初始化 生成主按钮饼图
    initMainBtn(nodeMain,outerRadius=130,borderRadius=30){
                          //图谱半径
      let 
      // 颜色列表
      colorList =['#61a0a8','#ff8900','#d48265','#61a0a8','#ff8900','#d48265','#61a0a8','#ff8900','#d48265','#61a0a8'],
      // 饼图数据
      datas = [
        {title:'自画像',value:1},
        {title:'缴费',value:1},
        {title:'推送记录',value:1},
        {title:'消息',value:1},
        {title:'自动营销',value:1},
        {title:'链圈',value:1},
        {title:'协同',value:1},
        {title:'主营',value:1},
        {title:'认证',value:1},
        {title:'设置',value:1}
      ],
      pie = d3.pie().value(item=>item.value), //角度生成器
      pieRes = pie(datas), //生成角度
      arc = d3.arc().innerRadius(0).outerRadius(outerRadius), //圆弧内弧生成器
      fontSize = outerRadius/8, //文字大小
      innerRadius = outerRadius/3, //内圆半径
      //外弧坐标位置
      borderArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius+borderRadius),
      //圆弧上文字坐标位置
      labelArc = d3.arc().innerRadius(innerRadius+fontSize*1.8).outerRadius(outerRadius),
      piePathG  = nodeMain.append('g').attr('id','path-g') // 用于存储弧度
      // pieTextG  = nodeMain.append('g').attr('id','text-g') //用于存储文字 
      ;
      
      pieRes.forEach((pieData,index)=>{
        let arcRes = arc(pieData), //内大圆
            borderRes = borderArc(pieData), //外边框
            centerPoint = labelArc.centroid(pieData); //内大圆中心点 用于文字显示

        let pathItem = piePathG.append('g') // 用于存储对应角度的内弧以及外弧
                               .attr('class',`path-item-${index}`)
                               .attr('data-main-item',index)
            // 内环圆
            pathItem.append('path')
                    .attr('d',arcRes)
                    // .attr('fill',colorList[index])
                    .attr('fill','url(#main-color)')
                    .attr('data-main-item',index)
            // 外弧
            pathItem.append('path')
                    .attr('d',borderRes)
                    .attr('stroke','transparent')
                    .attr('fill',colorList[index])
                    .attr('data-main-item',index)
            // 文字
            pathItem.append('text')
                    .html(function(d){
                      return pieData.data.title
                    })
                    .attr('data-main-item',index)
                    .style('fill',colorList[index])
                    .style('font-size',fontSize)
                    .attr('text-anchor','middle') //水平居中
                    .attr('dominant-baseline','middle') //垂直居中
                    .attr('x',centerPoint[0])
                    .attr('y',centerPoint[1])
                    // .attr('transform',`scale(${(outerRadius/2)/fontSize/4})`)
            
            pathItem.append('use')
                    .attr('href','#main-btn-icon')
      });
      
      // d3.selectAll('.main-path-item').on('click',(d)=>{
      //   alert('ok');
      //   console.log(d3.event)
      //   console.log(d)
      //   return
      // })

      // 链圈二字 最小圆
      let lianCircle = nodeMain.append('g')
                               .attr('id','lian-circle')
      lianCircle.append('circle')
                .attr('cx',0)
                .attr('cy',0)
                .attr('r',innerRadius)
                .style('fill','white') 
      lianCircle.append('text')
                .html('链圈')
                .style('font-size',innerRadius/2)
                .attr('text-anchor','middle')
                .attr('dominant-baseline','middle') //垂直居中
                .style('fill','#61a0a8')

    },
    
    // 用于实时更新link 跟 node 的 xy坐标
    ticked(link,nodeG,width,height) {
      // width 与 height 分别是 svg的宽高
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      nodeG
        .attr('transform',function(d){
          //防止饼图越界
          if( d.x <= d.radius){
            d.x = d.radius
          }
          if( d.x > width - d.radius){
            d.x = width - d.radius
          }
          if( d.y <= d.radius){
            d.y = d.radius
          }
          if( d.y > height - d.radius){
            d.y = height - d.radius
          }
          return `translate(${d.x},${d.y})`
        })
    },
    
    // 用于管理点击事件
    eventManage(nodeList,simulation,graphData,link,nodeG,svgWidth,svgHeight){
      // 可用d3通过类名选或者通过已有选择变量进行事件添加
      
      let svg = d3.select('svg')
      svg.on('click',function(){
        
        let Target = d3.event.target;

        //假如点击到了 背景遮罩DOM 则取消全屏
        switch(Target){ 
          case vm.bgShade.node():
            vm.isPlus = false;
            vm.canDragged = true;
            vm.shade = false;
            vm.bgShade.style('display','none');
            vm.bgShade.raise();
            simulation.restart();

          break;
          default:
            console.dir(Target);
            console.log(this)
        }

        // 假设该target含有d3绑定数据 该判断为判断节点 s
        if(!Target.__data__) return
        if(Target.__data__.nodeOrder) {
          //假如不是绑定的className(节点内绑定的数据)则退出
          let plusItem = d3.select('#'+Target.__data__.nodeOrder),
          className = Target.__data__.className //得知是哪一类饼图
          ;
          //要放大后才能操作饼图内按钮
          if(!vm.isPlus) { 
            vm.isPlus = true;
            vm.nodePlus(plusItem,simulation); //对应节点是否需要放大也在该函数进行判断
            return;
          }else{
            // 放大后操作饼图内按钮
            switch(className){
              case 'main':
                // 用于代表该按钮是第几个按钮 取类名最后的数字
                let btnOrder = Target.dataset.mainItem
                vm.mainBtnItem(btnOrder) //对应按钮放大 并且不同btnOrder实现不同的的点击事件

              break;
              case 'pie':
                
              break;
              case 'add':

              break;

            }
          }
          

        }
        // 假设该target含有d3绑定数据 该判断为判断节点 e



      });

      // 实时监听link node的x,y坐标更改
      simulation.nodes(graphData.nodes).on("tick", ()=>vm.ticked(link,nodeG,svgWidth,svgHeight));
      
    },

    // 点击事件处理
    mainBtnItem(order){
      //获得order 得知是主节点的哪个按钮被触发 并触发相关事件

      let orderBtn = d3.select(`.path-item-${order}`)
      orderBtn.attr('transform','scale(1.2)')
      setTimeout(()=>{
        orderBtn.attr('transform','scale(1)')
      },1000)

      switch(order){
        case '0':
        console.log('0')
        break;
        case '9':
        console.log('9')
        break;
      }

    },

    // 点击节点后节点放大
    nodePlus(plusItem,simulation){
    
      simulation.stop()
      plusItem.raise() //将其排序至最后 以改变显示层级 顺序靠后 显示优先级越高
          .attr('transform',`translate(${this.svgWidth/2},${this.svgHeight/2}) scale(2)`)
      simulation.stop()
      
      // 节点被放大时 无法拖动
      this.canDragged = false;
      // 打开背景遮罩
      this.bgShade.style('display','block');

    },

    // 触摸到对应的node会触发 包括点击 拖拽
    dragstarted(d,simulation) {
      console.log('started success')
      if(!this.canDragged) return;
      //d3.event.active 当你点击过一下以后 就不存在了 所以当鼠标始终拖拽饼图时持续触发restart()
      if (!d3.event.active) simulation.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    // 拖拽中
    dragged(d,width,height) {
      console.log('ing success')
      // 无法拖动到边界外
      if(d3.event.x <= 0 || d3.event.y <= 0 || d3.event.x >= width || d3.event.y >= height ) return;
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    },
    // 拖拽结束
    dragended(d,simulation) {
      console.log('end success')
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    
  }
};
</script>
<style lang="stylus" scoped>

</style>
