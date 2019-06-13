<template>
  <svg id="arc-06-1" width="660" height="300"></svg>
</template>


<script>
import { select, range, scaleOrdinal } from "d3";
export default {
  mounted() {
    this._start();
  },

  methods: {
    _start() {
      let svg = select("#arc-06-1");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      const makeFruit = type => ({ type, id: Math.random() });
      let fruits = range(5).map(() => makeFruit("apple"));

      let selectFruit = null;
      const onClick = id => {
        selectFruit = id;
        render();
      };

      const render = () => {
        this.fruitsBowl(svg, { fruits, height, onClick, selectFruit });
      };

      render();

      //Eat an apple
      setTimeout(() => {
        fruits.pop();
        render();
      }, 1000);

      //Replacing an apple with a lemon
      setTimeout(() => {
        fruits[2].type = "lemon";
        render();
      }, 2000);

      //Eat an apple
      setTimeout(() => {
        fruits = fruits.filter((d, i) => i !== 1);
        render();
      }, 3000);
    },

    fruitsBowl(selection, props) {
      const colorScale = scaleOrdinal()
        .domain("apple", "lemon")
        .range(["#FC0909", "#EBDE1A"]);

      const radiusScale = scaleOrdinal()
        .domain("apple", "lemon")
        .range([30, 20]);

      const xPosition = (d, i) => i * 80 + 60;

      const { fruits, height, onClick, selectFruit } = props;
      const circle = selection.selectAll("circle").data(fruits, d => d.id);
      circle
        .enter()
        .append("circle")
        .attr("cx", xPosition)
        .attr("cy", height / 2)
        .attr("r", 0)
        .merge(circle)
        .attr("fill", d => colorScale(d.type))
        .attr('stroke-width' ,5)
        .attr("stroke", d => d.id === selectFruit ? "black" : "none")
        .on("click", d => onClick(d.id))
        .transition()
        .duration(1000)
        .attr("cx", xPosition)
        .attr("r", d => radiusScale(d.type));
      circle
        .exit()
        .transition()
        .duration(1000)
        .attr("r", 0)
        .remove();

      const text = selection.selectAll("text").data(fruits);
      text
        .enter()
        .append("text")
        .attr("x", (d, i) => i * 80 + 60)
        .attr("y", height / 2 + 60)
        .merge(text)
        .text(d => d.type);
      text.exit().remove();
    }

    
  }
};
</script> 

<style lang="stylus">
#arc-06-1 {
  margin: 0;
  overflow: hidden;
  border: 1px solid blue;

  text {
    font-size: 1.5rem;
    font-family: sans-serif;
    text-anchor: middle;
  }

  rect {
    fill: #DDDDD7;
  }
}
</style>
