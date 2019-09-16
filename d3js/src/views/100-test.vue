<template>
  <div class="bg">
    <svg
      id="abc"
      :width="screenSize.width"
      :height="screenSize.height"
    ></svg>

  </div>
</template>

<script>
import { select, arc, pie, scaleOrdinal, schemeCategory10 } from "d3";
import axios from 'axios'
export default {
  data() {
    return {
      screenSize: {
        width: null,
        height: null
      },
      arcProperty: {
        fontSize: document.body.clientWidth / 45
      }
    };
  },
  mounted() {
    this.screenSize.width = document.body.clientWidth;
    this.screenSize.height = document.body.clientHeight;

    this.getData()
   
  },
  

  
  methods: {
    async getData(){
      let {data}  = await axios.get('http://47.106.105.213:8000/index/industry')

      data.forEach(item =>{
        item.Province.sort((a,b) => b.Count - a.Count)
        item['firstData'] = item.Province.slice(0,20)
        item['restData'] = item.Province.slice(20)

        
        item['mergeRestData'] = {
            ID:32,
            Count: item['restData'].reduce((acu,acc)=>{
              console.log(`=======`,acc.Count);
             return acu.Count+acc.Count
            },0),
            Name:'其他'
        }
        
        
       
      })


     console.log(`==aa=====`,data);




    // this.render(data);
    },
    render(data) {
      const svg = select("#abc");

      const dataset = [
        { size: 30, val: "30万", name: "京" },
        { size: 15, val: "15万", name: "辽" },
        { size: 40, val: "40万", name: "桂" },
        { size: 60, val: "60万", name: "津" },
        { size: 8, val: "8万", name: "蒙" }
      ]; // 数据集

      const province = data[0].Province
      console.log(`=======`,province);


      const outerRadius = this.screenSize.width / 8; // 外半径
      const innerRadius = this.screenSize.width / 16; // 内半径

      const outerRadius_big = outerRadius + outerRadius / 4; // 外半径
      const innerRadius_big = outerRadius + 3; // 内半径

      const piedata = pie().value(d => d.Count)(province); // 数据转换

      // const color = scaleOrdinal(schemeCategory10);
      const colorScale = scaleOrdinal()
        .domain(province.map(x => x.size))
        .range(["#FC0909", "#EBDE1A", "#1F85DE", "#43698A", "#A919BE"]);
      const colorScale_big = scaleOrdinal()
        .domain(province.map(x => x.size))
        .range(["#1C5865"]);

      const abc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(0.02);

      const out = arc()
        .innerRadius(innerRadius_big)
        .outerRadius(outerRadius_big)
        .padAngle(0.02);

      const arcs = svg
        .selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        .attr(
          "transform",
          "translate(" +
            this.screenSize.width / 2 +
            "," +
            this.screenSize.height / 2 +
            ")"
        );

      this.createArc(arcs, abc, colorScale);
      this.createArc(arcs, out, colorScale_big);
      this.addArcText(arcs, abc, "Count");
      this.addArcText(arcs, out, "Name");


      let circleR = innerRadius - 3
      const circle = arcs
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", circleR)
        .attr("fill", "black");

      const textG = arcs.append("g");

      const text = textG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", "0rem")
        .attr("x", 0)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", circleR )
        .text("下");
      const text_1 = textG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", circleR/2)
        .attr("x", 0)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", circleR/6)
        .text('"下"为企业客户资源');
    },

    createCircle() {},
    createArc(g, ele, color) {
      g.append("path")
        .attr("fill", (d, i) => {
          return color(i);
        })
        .attr("d", d => {
          return ele(d);
        });
    },

    addArcText(g, ele, property) {
      g.append("text")

        .attr("transform", d => {
          return `translate(${ele.centroid(d)})  rotate(${(((d.startAngle +
            d.endAngle) /
            2) *
            180) /
            Math.PI +
            90})`;
        })

        .attr("fill", "white")
        .style("font-size", this.arcProperty.fontSize /2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")

        .text(d => {
          return d.data[property];
        });
    }
  }
};
</script>


<style lang="stylus" scoped>
.bg
  width 100%
  // height 100%
  background-color #fff
</style>