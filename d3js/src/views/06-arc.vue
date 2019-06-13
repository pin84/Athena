<template>
  <svg id="barchart" width="960" height="600"></svg>
</template>


<script>
import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  extent,
  scalePoint,
  axisLeft,
  axisBottom,
  format
} from "d3";
export default {
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      let url =
        "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv";
      csv(url).then(data => {
        data.forEach(d => {
          d.temperature = +d.temperature;
          d.timestamp = new Date(d.timestamp);
        });
        this.render(data);
      });
    },

    render(data) {
      const margin = {
        left: 80,
        top: 60,
        right: 40,
        bottom: 40
      };

      const title = "Cars : Horsepower vs. Weight";
      const svg = select("svg");
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const circleRadius = 6;
      const xAxisLabel = "timestamp";
      const yAxisLabel = "temperature";

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const xValue = d => d.timestamp;
      const yValue = d => d.temperature;

      const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
      const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]);


      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xAxisTichFormat = number => format(".3s")(number).replace("G", "B");

      const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTichFormat)
        .tickSize(-innerHeight)
        .tickPadding(20);

      const yAxis = axisLeft(yScale).tickSize(-innerWidth);

      const yAxisG = g.append("g").call(yAxis);
      yAxisG.selectAll(".domain").remove();

      yAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -50)
        .attr("x", -innerHeight / 2)
        .attr("fill", "black")
        .attr("transform", `rotate(-90)`)
        .attr("text-anchor", "middle")
        .text(yAxisLabel);

      const xAxisG = g
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${innerHeight})`);

      xAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -10)
        .attr("x", innerWidth / 2)
        .attr("fill", "black")
        .text(xAxisLabel);

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r", circleRadius);
      g.append("text")
        .attr("y", -10)
        .text(title);
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
    font-size: 1.8em;
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
