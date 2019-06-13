<template>
  <svg id="world-map" width="960" height="460" font-family="sans-serif" font-size="10"></svg>
</template>


<script>
import { select, json, geoPath, geoEqualEarth } from "d3";
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

      svg
        .append("path")
        .attr("class", "sphere")
        .attr("d", pathGenerator({ type: "Sphere" }));

      json(url).then(data => {
        const countries = data.features;
        const paths = svg
          .selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr('class','country')
          .attr("d", pathGenerator);
      });
    }
  }
};
</script>

<style lang="stylus" >
#world-map 
  margin: 0;
  overflow: hidden;
  .sphere
    fill darkblue
  .country 
    fill lightgreen
    stroke black
    stroke-opacity 0.1
  

</style>
