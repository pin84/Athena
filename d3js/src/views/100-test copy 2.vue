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
export default {
  data() {
    return {
      screenSize: {
        width: null,
        height: null
      },
      arcProperty: {
        fontSize: document.body.clientWidth / 40
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

      const dataset = [
        { size: 30, val: "30万", name: "京" },
        { size: 15, val: "15万", name: "辽" },
        { size: 40, val: "40万", name: "桂" },
        { size: 60, val: "60万", name: "津" },
        { size: 8, val: "8万", name: "蒙" }
      ]; // 数据集

      //  const dataset = [30, 10, 43, 55, 13]; // 数据集

      const outerRadius = this.screenSize.width / 3; // 外半径
      const innerRadius = this.screenSize.width / 8; // 内半径

      const outerRadius_big = outerRadius + outerRadius / 5; // 外半径
      const innerRadius_big = outerRadius + 3; // 内半径

      const piedata = pie().value(d => d.size)(dataset); // 数据转换

      console.log(`=======`, piedata);
      // const color = scaleOrdinal(schemeCategory10);
      const colorScale = scaleOrdinal()
        .domain(dataset.map(x => x.size))
        .range(["#FC0909", "#EBDE1A", "#1F85DE", "#43698A", "#A919BE"]);
      const colorScale_big = scaleOrdinal()
        .domain(dataset.map(x => x.size))
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
      this.addArcText(arcs, abc, "val");
      this.addArcText(arcs, out, "name");

      const circle = arcs
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", innerRadius - 3)
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
        .style("font-size", "1rem")
        .text("下");
      const text_1 = textG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", "0.5rem")
        .attr("x", 0)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "0.15rem")
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

    //'rotate(${ (pieData.startAngle + pieData.endAngle)/2 * 180/Math.PI + 90})'

    addArcText(g, ele, property) {
      g.append("text")

        .attr("transform", d => {
          console.log(`=======`, d);
          return `translate(${ele.centroid(d)})  rotate(${(((d.startAngle +
            d.endAngle) /
            2) *
            180) /
            Math.PI +
            90})`;
        })

        .attr("fill", "white")
        .style("font-size", this.arcProperty.fontSize)
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