<template>
  <svg width="960" height="960" font-family="sans-serif" font-size="10"></svg>
</template>


<script>
import { select, scaleBand, scaleRadial } from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    this.render();
  },

  methods: {
    render() {
      let svg = select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        innerRadius = 180,
        outerRadius = Math.min(width, height) / 2 - 6,
        g = svg
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

      let x = scaleBand()
        .range([0, 2 * Math.PI])
        .align(0);
      var y = d3.scaleRadial().range([innerRadius, outerRadius]);

      var z = d3
        .scaleOrdinal()
        .range([
          "#98abc5",
          "#8a89a6",
          "#7b6888",
          "#6b486b",
          "#a05d56",
          "#d0743c",
          "#ff8c00"
        ]);

      console.log(Math.min(width, height) / 2);
    }
  }
};
</script>

<style lang="scss" >
#barchart {
  circle {
    fill: steelblue;
    opacity: 0.5;
  }
  text {
    font-size: 1.4em;
    font-family: sans-serif;
  }
  .tick text {
    fill: aqua;
  }
  .tick line {
    stroke: blueviolet;
  }
  .axis-label {
    fill: burlywood;
  }
}
</style>
