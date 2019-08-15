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
import {select,arc,pie,scaleOrdinal,schemeCategory10}  from "d3";
export default {
  data() {
    return {
      screenSize: {
        width: null,
        height: null
      }
    };
  },
  mounted() {
    this.screenSize.width = document.body.clientWidth;
    this.screenSize.height = document.body.clientHeight;

    this.render();
  },

  methods: {
    render() {
      let svg = select("#abc");

      const dataset = [30, 10, 43, 55, 13]; // 数据集
      const outerRadius = this.screenSize.width/3; // 外半径
      const innerRadius = this.screenSize.width/4; // 内半径
      const piedata = pie()(dataset); // 数据转换
      const color = scaleOrdinal(schemeCategory10);

      const abc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(0.02);

      const arcs = svg
        .selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", "translate(" +  this.screenSize.width / 2 + "," +  this.screenSize.height / 2 + ")");

      arcs
        .append("path")
        .attr("fill", (d, i) => {
          return color(i);
        })
        .attr("d", d => {
          return abc(d);
        });

      arcs
        .append("text")
        .attr("transform", d => {
          return "translate(" + abc.centroid(d) + ")";
        })
        .attr("fill", "white")
        .style('font-size',fontSize)
        .attr("text-anchor", "middle")
        .text(d => {
          return d.data;
        });
    },
    createArc(){

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