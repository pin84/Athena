import { scaleOrdinal } from "d3";
const colorScale = scaleOrdinal()
  .domain("apple", "lemon")
  .range(["#FC0909", "#EBDE1A"]);

const radiusScale = scaleOrdinal()
  .domain("apple", "lemon")
  .range([30, 20]);

const xPosition = (d, i) => i * 80 + 60

export const fruitsBowl = (selection, props) => {
  const { fruits, height } = props
  const circle = selection.selectAll("circle").data(fruits, d => d.id);
  circle
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr('r', 0)
    .merge(circle)
    .attr("fill", d => colorScale(d.type))
    // .transition().duration(1000)
    .attr("cx", xPosition)
    .attr("r", d => radiusScale(d.type));
  circle.exit()
    // .transition().duration(1000)
    .attr('r', 0)
    .remove();

  const text = selection.selectAll("text").data(fruits);
  text
    .enter()
    .append("text")
    .attr("x", (d, i) => i * 80 + 60)
    .attr("y", height / 2 + 60)
    .merge(text)
    .text(d => d.type)
  text.exit() 
    .remove();
};