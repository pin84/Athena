<template>
  <svg id="arc" width="960" height="500"></svg>
</template>


<script>
import {
  select,
  csv,
  scaleLinear,
  extent,
  scalePoint,
  axisLeft,
  axisBottom,
  format,
  scaleTime
} from "d3";
export default {
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      csv("https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv").then(abc => {
        
        abc.forEach(d => {
          d.temperature = +d.temperature
          d.timestamp = new Date(d.timestamp)
        });
        this.render(abc);
      });
    },
    render(data) {
      // data.forEach(d => {
      //   d.population = +d.population * 1000;
      // });

      const margin = {
        left: 80,
        top: 60,
        right: 40,
        bottom: 60
      };

      const svg = select("svg");
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const circleRadius = 6;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xValue = d => d.timestamp;
      const xAisLabel = "time";
      const yValue = d => d.temperature;
      const yAisLabel = "temperature";

      const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
      const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight,0])
        .nice();

      // const yAxis = axisLeft(yScale);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


      const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10);

      const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(5);

      const yAxisG = g.append("g").call(yAxis);
      yAxisG.selectAll(".domain").remove();
      yAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", -40)
        .attr("x", -innerHeight / 2)
        .attr("fill", "black")
        .attr("transform", `rotate(-90)`)
        .style("text-anchor", "middle")
        .text(yAisLabel);

      const xAxisG = g
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${innerHeight})`);

      xAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("y", 50)
        .attr("x", innerWidth / 2)
        .attr("fill", "black")
        .text(xAisLabel);

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r", circleRadius);
      g.append("text")
        .attr("class", "title")
        .attr("y", -10)
        .text("one week of temperature ");
    }
  }
};
</script>

<style lang="stylus">
#arc {
  position: relative;

  text {
    font-size: 1rem;
  }

  circle {
    fill: orange;
  }

  .tick text {
    fill: #8e8883;
  }

  .axis-label, .title {
    font-size: 2rem;
  }
}
</style>


