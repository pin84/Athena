<template>
  <svg id="world-map" width="960" height="460" font-family="sans-serif" font-size="10"></svg>
</template>


<script>
import { select, json, geoPath, geoEqualEarth, zoom, event } from "d3";
export default {
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      //矢量数据NPM搜索 visionscarto-world-atlas
      let url =
        "https://unpkg.com/visionscarto-world-atlas/world/110m_countries.geojson";

      const projection = geoEqualEarth();
      const pathGenerator = geoPath().projection(projection);

      let svg = select("#world-map");
      const g = svg.append("g");
      g.append("path")
        .attr("class", "sphere")
        .attr("d", pathGenerator({ type: "Sphere" }));

      svg.call(
        zoom().on("zoom", () => {
          g.attr("transform", event.transform);
        })
      );

      json(url).then(data => {
        const countries = data.features;

        const paths = g
          .selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", pathGenerator)
          .append("title")
          .text(d => d.properties.name_zh);
      });
    }
  }
};
</script>

<style lang="stylus" >
#world-map {
  margin: 0;
  overflow: hidden;

  .sphere {
    fill: darkblue;
  }

  .country {
    fill: lightgreen;
    stroke: black;
    stroke-width: 0.05px;

    &:hover {
      fill: red;
    }
  }
}
</style>
