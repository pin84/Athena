<template>
  <svg
    id="barchart"
    width="375"
    height="667"
  ></svg>
</template>


<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      variables: {
        B01001_003E: "<5", // Male
        B01001_004E: "5-9",
        B01001_005E: "10-14",
        B01001_006E: "15-19", // 15-17,
        B01001_007E: "15-19", // 18-19,
        B01001_008E: "20-24", // 20
        B01001_009E: "20-24", // 21
        B01001_010E: "20-24", // 22-24
        B01001_011E: "25-29",
        B01001_012E: "30-34",
        B01001_013E: "35-39",
        B01001_014E: "40-44",
        B01001_015E: "45-49",
        B01001_016E: "50-54",
        B01001_017E: "55-59",
        B01001_018E: "60-64", // 60-61
        B01001_019E: "60-64", // 62-64
        B01001_020E: "65-69", // 65-66
        B01001_021E: "65-69", // 67-69
        B01001_022E: "70-74",
        B01001_023E: "75-79",
        B01001_024E: "80-84",
        B01001_025E: "≥85",
        B01001_027E: "<5", // Female
        B01001_028E: "5-9",
        B01001_029E: "10-14",
        B01001_030E: "15-19", // 15-17
        B01001_031E: "15-19", // 18-19
        B01001_032E: "20-24", // 20
        B01001_033E: "20-24", // 21
        B01001_034E: "20-24", // 22-24
        B01001_035E: "25-29",
        B01001_036E: "30-34",
        B01001_037E: "35-39",
        B01001_038E: "40-44",
        B01001_039E: "45-49",
        B01001_040E: "50-54",
        B01001_041E: "55-59",
        B01001_042E: "60-64", // 60-61
        B01001_043E: "60-64", // 62-64
        B01001_044E: "65-69", // 65-66
        B01001_045E: "65-69", // 67-69
        B01001_046E: "70-74",
        B01001_047E: "75-79",
        B01001_048E: "80-84",
        B01001_049E: "≥85"
      }
    };
  },
  mounted() {
    this.render(this.variables);
  },

  methods: {
    render(data) {
      const pie = d3
        .pie()
        .padAngle(0.005)
        .sort(null)
        .value(d => d.value);
      const arcs = pie(data);

      const svg = d3
        .select("svg")
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif");
      const width = svg.attr("width");
      const height = svg.attr("height");

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      g.selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

      // const text = g.selectAll("text")
      //   .data(arcs)
      //   .join("text")
      //     .attr("transform", d => `translate(${arc.centroid(d)})`)
      //     .attr("dy", "0.35em");

      // text.append("tspan")
      //     .attr("x", 0)
      //     .attr("y", "-0.7em")
      //     .style("font-weight", "bold")
      //     .text(d => d.data.name);

      // text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
      //     .attr("x", 0)
      //     .attr("y", "0.7em")
      //     .attr("fill-opacity", 0.7)
      //     .text(d => d.data.value.toLocaleString());

      // return svg.node();
    }
  }
};
</script>

<style lang="scss" >
#barchart {
  circle {
    fill: steelblue;
  }
  text {
    font-size: 1.4em;
    font-family: sans-serif;
  }
  .tick text{
    fill: aqua;
  }
  .tick line {
    stroke:blueviolet;
  }
  .axis-label{
    fill:burlywood ;
  }
}
</style>
