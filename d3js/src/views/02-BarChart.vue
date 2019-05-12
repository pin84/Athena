<template>
  <div id="barchart"></div>
</template>

<script>
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
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
    this.render();
  },

  methods: {
    render() {
      const width = 960;
      const height = 500;
      const xValue = d => d.population;
      const yValue = d => d.country;
      const margin = {
        left: 80,
        top: 0,
        right: 0,
        bottom: 0
      };

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = select("#barchart")
        .append("svg")
        .attr("width", innerWidth)
        .attr("height", innerHeight);

      const xScaleWidth = 600;
      const yScaleHeight = 300;
      const xScale = scaleLinear()
        .domain([0, max(this.data, xValue)])
        .range([0, xScaleWidth]);

      const yScale = scaleBand()
        .domain(this.data.map(yValue))
        .range([0, yScaleHeight])
        .padding(0.1);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      g.append("g").call(axisLeft(yScale));
      g.append("g")
        .call(axisBottom(xScale))
        .attr("transform", `translate(0,${yScaleHeight})`);

      g.selectAll("rect")
        .data(this.data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(yValue(d)))
        .attr("width", d => xScale(xValue(d)))
        .attr("height", yScale.bandwidth());
    }
  }
};
</script>

<style lang="scss" >
#barchart {
  rect {
    fill: steelblue;
  }
  text {
    font-size: 1.4em;
  }
}
</style>
