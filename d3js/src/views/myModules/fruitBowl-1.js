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

  const bowl = selection.selectAll('rect').data([null]).enter().append('rect')
    .attr('y', 90).attr('width', 300).attr('height', 130).attr('rx',40)

  const groups = selection.selectAll("g").data(fruits);
  const groupEnter = groups.enter().append('g')
  groupEnter
    .merge(groups)
    .attr('transform', (d, i) => `translate(${i * 80 + 60},${height / 2})`);
  groups.exit()
    .remove();

  groupEnter.append("circle")
    .merge(groups.select('circle'))
    .attr("fill", d => colorScale(d.type))
    .attr("r", d => radiusScale(d.type));

  groupEnter.append("text")
    .merge(groups.select('text'))
    .text(d => d.type)
    .attr('y', 60)

};