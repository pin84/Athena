<template>
  <div id="face"></div>
</template>

<script>
import { select, arc } from "d3";
export default {
  mounted() {
    this.rendPage();
  },
  methods: {
    rendPage() {
      let width = 500;
      let height = 400;
      const svg = select("#face")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const circle = g
        .append("circle")
        .attr("r", height / 2)
        // .attr("cx", width / 2)
        // .attr("cy", height / 2)
        .attr("fill", "yellow")
        .attr("stroke", "black");

      const eyeSpacing = 100;
      const eyeYOffset = -60;
      const eyeRadius = 30;
      const eyebrowWidth = 70;
      const eyebrowHeight = 15;
      const eyebrowYOffset = -70

      const eyesG = g
        .append("g")
        .attr("transform", `translate(0,${eyeYOffset})`);

      const rightEye = eyesG
        .append("circle")
        .attr("r", eyeRadius)
        .attr("cx", eyeSpacing);
      // .attr("cy",  eyeYOffset)
      const leftEye = eyesG
        .append("circle")
        .attr("r", eyeRadius)
        .attr("cx", -eyeSpacing);
      // .attr("cy",  eyeYOffset)

      const leftEyebrow = eyesG
        .append("rect")
        .attr("x", -eyeSpacing - eyebrowWidth / 2)
        .attr("y", eyeYOffset)
        .attr("width", eyebrowWidth)
        .attr("height", eyebrowHeight);

      const rightEyebrow = eyesG
        .append("rect")
        .attr("x", eyeSpacing - eyebrowWidth / 2)
        .attr("y", eyeYOffset)
        .attr("width", eyebrowWidth)
        .attr("height", eyebrowHeight)
        .transition()
        .duration(2000)
        .attr("y", eyebrowYOffset -10);

      const mouth = g.append("path").attr(
        "d",
        arc()({
          innerRadius: 120,
          outerRadius: 130,
          startAngle: Math.PI / 2,
          endAngle: (Math.PI * 3) / 2
        })
      );
    }
  }
};
</script>
