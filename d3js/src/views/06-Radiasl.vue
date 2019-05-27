<template>
  <svg width="960" height="960" font-family="sans-serif" font-size="10"></svg>
</template>


<script>
import { select, scaleBand, scaleRadial,csv } from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    this.render();
  },



  methods: {
    render() {
      let url = 'https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv'
      csv(url).then(data =>{
        data.forEach(d =>{
          d.temperature = +d.temperature;
          d.timestamp = new Date(d.timestamp)
        })
      })

      let svg = select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        innerRadius = 180,
        outerRadius = Math.min(width, height) / 2 - 6,
        g = svg
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);



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
