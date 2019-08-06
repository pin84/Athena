<template>
  <div
    id="app"
    class="main_bgcolor_f3f3f3 pos_res h "
  >
    <div class="select-list">
      <ul class="index_list_r_tag clear kw ">
        <li
          class="fl bs_bb fC2"
          :class="{active:item.active}"
          v-for="(item,index) in keyword"
          :key="index"
          ref="keyword"
          @click="selectKeyword(item,index)"
        >
          {{item.kw}}
        </li>
      </ul>
      <!-- <h2 class="title-hs">历史关键词：</h2>
      <ul class="index_list_r_tag clear">
        <li
          class="fl bs_bb fC2"
          :class="{active:item.active}"
          v-for="(item,index) in historyKw"
          :key="index"
          ref="keyword"
          @click="selectKeyword(item,index)"
        >
          {{item.kw}}
        </li>
      </ul> -->

      <p class="main_bgcolor_ffffff p_t_20 p_b_20">
        <button
          type="button"
          class="btn_110"
          style="margin-top: 0px;"
          @click="search"
        >确定
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   areaOrKeyword: {
  //     type: String
  //   }
  // },

  data() {
    return {
      keyword: [{ kw: "全部" }],
      postData: {},
      historyKw: [
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" },
        { kw: "abc" }
      ]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let token = this.$store.state.loginInfo.userInfo.token;

      let { data } = await this.$axios.get(`${this.$api.setSubKeyword}`, {
        params: {
          token
        }
      });

      if (data.message === false) {
        return;
      }
      let keyword = data.data_dict.keywords_array;
      if (keyword) {
        let arrKeyword = keyword.split(",");
        arrKeyword.forEach((item, index) => {
          let obj = {};
          obj["kw"] = item;
          obj["active"] = true;
          this.keyword.push(obj);
        });
      }
    },

    selectKeyword(item, index) {
      if (item.active) {
        this.$delete(item, "active");
      } else {
        this.$set(item, "active", true);
      }

      if (item["kw"] === "全部") {
        this.keyword.forEach(keyword => this.$delete(keyword, "active"));
        this.historyKw.forEach(hs => this.$delete(hs, "active"));

        this.$set(item, "active", true);
      } else {
        this.$delete(this.keyword[0], "active");
      }
    },
    kwHandler(arr) {
      let tem = [];
      arr.forEach(item => {
        if (this.keyword[0].active) {
          tem.push(item.kw);
        } else if (item.active) {
          tem.push(item.kw);
        }
      });
      return tem;
    },
    search() {
      let kw = this.kwHandler(this.keyword);
      let hkw = this.kwHandler(this.historyKw);

      if (kw.length === 0) {
        this.keyword.forEach(item => {
          kw.push(item.kw);
        });
      }
      if (kw[0] === "全部") {
        kw.shift();
      }
      this.$emit("keySearch", kw.join());
    }
  }
};
</script>

<style lang="stylus" scoped>
.main_bgcolor_f3f3f3
  position: fixed;
  top: 2rem;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  display block
  // display: -webkit-box;
  // -webkit-box-pack: center;
  // -webkit-box-align: center;
  // -webkit-box-orient: vertical;
  z-index: 100;
.i-list
  display flex
  height 1rem
  justify-content space-around
  align-items center
  box-sizing border-box
  .i-list-item
    width 30%
    height 0.5rem
    line-height 0.5rem
    text-align center
    border 1px solid #ccc
    font-size 0.24rem


.index_list_r {
    width:100%;
    box-sizing:border-box;
    padding:0.2rem 2.6% 0.98rem;
    
}
.title-hs{
  padding 0 0.1rem
  background-color #fff
}
.index_list_r_tag{
    background-color #fff
    height 2.5rem
    overflow-y auto
    padding:0.1rem;
    box-sizing:border-box;
    // margin-top:0.2rem
}
.kw{
  height 5rem  
}

.index_list_r_tag>li{
    width:27.9%;
    margin:0 8.15% 0.2rem 0;
    text-align:center;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color:#e2e2e2;
    border:1px solid #e2e2e2;
    font-size:0.24rem;
    border-radius:0.08rem;

}
.index_list_r_tag>li.active{    
    background:rgba(230,255,255,1);
    border:1px solid rgba(9,162,163,1);
    color:#09A2A3
}
.index_list_r_tag>li:nth-of-type(3n){
    margin-right:0
}
.index_list_r_list_t{
    width: 100%;
    overflow: hidden;
    border-radius: 0.1rem;
    height: 1.5rem;
    margin-bottom: 0.15rem;
     box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);
}
.index_list_r_list_s{
    margin-bottom:0.2rem;
    border-radius:0.1rem;
}
.index_list_r_list_s>p{
    margin:0.1rem 0;
    font-size:0.26rem;
    color:rgba(153,153,153,1);
}
.index_list_r_list_d{
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.2);


}
.index_list_r_list_d_p1{
    width:100%;
    height:1.5rem;
    margin:0 auto;
    padding:0 0.33rem 0 0.1rem;
    border-radius:0.1rem;
    position:relative;
    display:-webkit-box; 							
	-webkit-box-pack:center;
	-webkit-box-align:center;
    box-sizing:border-box;
    background-color:#fff;
    z-index:1;
    transition:all 0.5s
}
.list_d_s1{
      width:1.52rem;
      height: 1.3rem;
      position: relative;
      // background: url('../image/item8-l-price.png') no-repeat center;
      background-size: 100% 100%;
      margin-right: 0.22rem;
}
.list_d_s1>p{
        width:100%;
        height:50%;
        line-height:0.65rem;
        text-align:center;
        color:#fff;
        font-size:0.22rem;

}
.list_d_s2{
    -webkit-box-flex:1;
    font-size:0.26rem;

}
.list_d_s2>p{
    line-height:1.2
}
.list_d_s3{
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    height:1.14rem;
    width:0.24rem;
    // background:url('../image/stateTag-doing.png') no-repeat center;
    background-size:100% 100%;

}
.index_list_r_list_d_p2{
    position:absolute;
    top:0;
    right: 0;
    width: 40px;
    height:1.5rem;
    line-height:1.5rem;
    background-color:#be0201;
    color:#ffffff;
    font-weight:bold;
    text-align:center;
    border-bottom-right-radius:0.1rem;
    border-top-right-radius:0.1rem
}
/* 招标详情 */

.ZBdetails {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-orient: vertical;
    z-index: 100;
}

    .ZBdetails > div {
        width: 94.6%;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
        margin-top: 0.9rem;
        position: relative;
    }

.ZBdetails-logo {
    width: 1.6rem;
    height: 1.6rem;
    background: rgba(9, 162, 163, 1);
    border: 0.1rem solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    box-sizing: border-box;
    font-size: 0.54rem;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 1.4rem;
    text-align: center;
    margin: -0.9rem auto 0;
}

.ZBdetails-statement {
    padding: 0 0.18rem;
}

.ZBdetails-statement-title {
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 1.5;
}

.ZBdetails-statement-price {
    font-size: 0.26rem;
    font-weight: bold;
}

    .ZBdetails-statement-price > span {
        color: #09a2a3;
    }

        .ZBdetails-statement-price > span:first-child {
            font-size: 0.36rem;
        }

.ZBdetails-statement-details {
    position: relative;
    padding: 0.2rem 0 0.2rem;
}

.ZBdetails-statement-details-left {
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.3rem;
    display: -webkit-box;
    font-size: 0.26rem;
    color: #666;
}

.ZBdetails-statement-details-tag {
    position: absolute;
    right: 0;
    top: 0.3rem;
    width: 1.2rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    background: rgba(191, 2, 0, 1);
    border-radius: 0.06rem;
    font-size: 0.24rem;
    color: #fff;
}

.ZBdetails-con {
    padding: 0.39rem 0.21rem 0.45rem;
    line-height: 1.8;
    height: 32.38vh;
    overflow-y: scroll;
}

.ZBdetails-closeBtn {
    position: absolute;
    top: -1.2rem;
    right: 0.3rem;
}

.ZBdetails-operator {
    position: relative;
    height: 1rem;
    display: -webkit-box;
    background-color: #f3f3f3;
}

    .ZBdetails-operator > button {
        position: relative;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        width: 33.3333%;
        font-size: 0.28rem;
        border: 0;
        border-radius: 0;
        margin: 0;
        padding: 0;
        overflow: visible;
        background: none;
    }

        .ZBdetails-operator > button > img {
            width: 0.34rem;
            height: 0.34rem;
            margin-right: 0.15rem;
        }

        .ZBdetails-operator > button.fs::after {
            position: absolute;
            right: 0;
            top: 0.3rem;

            width: 1px;
            height: 0.4rem;
            background-color: #ccc;
            display: block;
            content:""
        }

        .ZBdetails-operator > button.fs::before {
            position: absolute;
            left: 0;
            top: 0.3rem;
            width: 1px;
            height: 0.4rem;
            background-color: #ccc;
            display: block;
            content:""
        }


.fullScreen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding-bottom:1.2rem;
    overflow-y: scroll;
}

    .fullScreen > button {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 102;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #ffffff;
        background-color: #09A2A3;
        font-size:0.28rem
    }

.detail_close {
    position: absolute;
    right: 0;
    top: -1.5rem;
    width: 0.59rem;
    height: 0.59rem;
}
/* 招标详情end */
</style>

