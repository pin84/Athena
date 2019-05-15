<template>
  <svg id="barchart" width="600" height="300"></svg>
</template>


<script>
import {
  select,
  csv,
  scaleLinear,
  max,
  scalePoint,
  axisLeft,
  axisBottom,
  format
} from "d3";
export default {
  data() {
    return {
      data: [
        { country: "China", population: 1415045 },
        { country: "India", population: 1254052 },
        { country: "United", population: 326767 },
        { country: "Brazil", population: 210868 },
        { country: "Pakistan", population: 200814 },
        { country: "Nigeria", population: 195875 },
        { country: "Banladesh", population: 166368 },
        { country: "Russia", population: 143965 },
        { country: "Mexico", population: 130759 }
      ]
    };
  },
  mounted() {
    this.render(this.data);
  },

  methods: {
    render(data) {
      data.forEach(d => {
        d.population = +d.population * 1000;
      });

      const margin = {
        left: 80,
        top: 60,
        right: 40,
        bottom: 40
      };

      const svg = select("svg");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xValue = d => d.population;
      const yValue = d => d.country;

      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        .nice()
      const yScale = scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);

      // const yAxis = axisLeft(yScale);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xAxisTichFormat = number => format(".3s")(number).replace("G", "B");

      const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTichFormat)
        .tickSize(-innerHeight);

        const yAxis = axisLeft(yScale).tickSize(-innerWidth)

      g.append("g")
        .call(yAxis)
        .selectAll(".domain")
        .remove();
      const xAxisG = g
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${innerHeight})`);

      xAxisG
        .append("text")
        .attr('class','axis-label')
        .attr("y", -10)
        .attr("x", innerWidth / 2)
        .attr("fill", "black")
        .text(" Population ");

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", d => yScale(yValue(d))  )
        .attr("cx", d => xScale(xValue(d)))
        .attr("r",10);
      g.append("text")
        .attr("y", -10)
        .text("top 10 most populous contries");
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
