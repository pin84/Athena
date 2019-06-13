<template>
  <svg id="arc" width="960" height="500"></svg>
</template>


<script>
import {
  select,
  csv,
  scaleLinear,
  extent,
  max,
  scalePoint,
  axisLeft,
  axisBottom,
  format,
  scaleTime,
  area,
  curveBasis
} from "d3";
export default {
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      csv(
        "https://vizhub.com/curran/datasets/world-population-by-year-2015.csv"
      ).then(abc => {
        abc.forEach(d => {
          d.population = +d.population;
          d.year = new Date(d.year);
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

      const xValue = d => d.year;
      const xAisLabel = "year";
      const yValue = d => d.population;
      const yAisLabel = "population";

      const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
      const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice();

      // const yAxis = axisLeft(yScale);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xAxis = axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight)
        .tickPadding(10);
      const yAxisTichFormat = number => format(".1s")(number).replace("G", "B");

      const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(5)
        .tickFormat(yAxisTichFormat)

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

      const areaGenerator = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(curveBasis);
      g.append("path")
        .attr("class", "line-path")
        .attr("d", areaGenerator(data));

      svg.append("text")
        .attr("class", "title")
        .attr('x',width/2)
        .attr("y", 40)
        .text("World Population");
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

  .line-path {
    fill: orange;
  }

  .tick text {
    fill: #8e8883;
  }

  .axis-label, .title {
    font-size: 2rem;
  }

  .title{
    font-size 3rem;
    fill:#635f5d;
    text-anchor:middle;
  }
}
</style>


