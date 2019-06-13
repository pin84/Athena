<template>
  <svg id="arc-06" width="660" height="300"></svg>
</template>


<script>
import { select, range } from "d3";
import { fruitsBowl } from "./myModules/fruitBowl";
export default {
  mounted() {
    this._start();
  },

  methods: {
    _start() {
      let svg = select("#arc-06");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      const render = () => {
        fruitsBowl(svg, { fruits ,height});
      };

      const makeFruit = type => ({ type ,id:Math.random()});
      let  fruits = range(5).map(() => makeFruit("apple"));

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
        fruits = fruits.filter((d,i) => i !== 1)
        render();
      }, 3000);
    }
  }
};
</script> 

<style lang="stylus">
#arc-06
  margin 0
  overflow hidden
  border 1px solid red
  text 
    font-size 1.5rem
    font-family sans-serif
    text-anchor middle
  rect
    fill  #DDDDD7
</style>
