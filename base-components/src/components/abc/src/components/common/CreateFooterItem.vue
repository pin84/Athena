<template>
  <ul id="tabbar">
    <li
      v-for="(item) of tabbarList"
      :key="item.nowPage"
    >
      <!-- <router-link :to="item.route">
        <img :src="pos==item.nowPage?item.selectedIconPath:item.iconPath" />
        <p :style='{"color": pos==item.nowPage?"#fff":"#92f6f7"}'>{{item.text}}</p>
      </router-link> -->
      <!-- <img :src="pos==item.nowPage?item.selectedIconPath:item.iconPath"/> -->

      <a @click="linkRoute(item)">
        <img :src="pos==item.nowPage?item.selectedIconPath:item.iconPath" />
        <!-- <img :src="pos==item.nowPage?item.selectedIconPath:item.iconPath"/> -->
        <p :style='{"color": pos==item.nowPage?"#fff":"#92f6f7"}'>{{item.text}}</p>
      </a>
    </li>
  </ul>
</template>


<script>
import { debug } from 'util';
export default {
  // props: {
  //     pos: Number
  // },


  data() {
    return {
      pos: 0,
      tabbarList: [
        {
          text: "企业客•库",
          iconPath: require("../../assets/icon/tupu-new.png"),
          selectedIconPath: require("../../assets/icon/tupu-new-active.png"),
          nowPage: "0",
          route: {
            name: "shangLianTest"
          }
        },
        {
          text: "采购订阅+",
          iconPath: require("../../assets/icon/dingyue-new.png"),
          selectedIconPath: require("../../assets/icon/dingyue-new-active.png"),
          nowPage: "1",
          route: {
            name: "lookAround"
          }
        },
        {
          text: "企服专场+",
          iconPath: require("../../assets/icon/indexF2.png"),
          selectedIconPath: require("../../assets/icon/indexF2-active.png"),
          nowPage: "2",
          route: {
            name: "chuke"
          }
        },
        {
          text: "链圈",
          iconPath: require("../../assets/icon/indexF4.png"),
          selectedIconPath: require("../../assets/icon/indexF4-active.png"),
          nowPage: "3",
          route: {
            name: "lianQuan"
          }
        }
      ]
    };
  },

  computed: {


  },
  methods: {
    linkRoute(item){
      if(['3'].indexOf(item.nowPage) !== -1 ){
        this.$toast({
          message:'上下链暂未开放此页面,请期待我们的到来哦~~~'
        })
        return ; 
      }
      let {route} = item;
      console.log(item , route);
      this.$router.push({
        name:route.name,
      })

    },
  },
  watch: {
    "$route.name": {
      handler(newVal, oldVal) {
        switch (newVal) {
          case "shangLianTest":
            this.pos = 0;
            break;
          case "lookAround":
            this.pos = 1;
            break;
          case "chuke":
            this.pos = 2;
            break;
          case "lianQuan":
            this.pos = 3;
            break;
        }
      }
      // immediate:true
    }
  }
};
</script>
