<template>
  <div>

    <com-pop
      my-index="CompanyListRouterTest"
      class="top_0"
      :headShow="false"
    >
      <template v-slot:pop-content>
        <div id="companyList">
          <div class="top">
            <h4>{{province}}({{total}}家)</h4>
            <button
              class="searchBtn"
              @click="searchCom"
            >精准搜索</button>
            <span
              class="random"
              @click="randomCompany"
            >换一批</span>

          </div>
          <div class="bottom">
            <ul class="list">
              <!-- <span>共{{total}}万家</span> -->
              <li
                class="item"
                :class="{active:num===index}"
                v-for="(item,index) in company"
                :key="index"
                @click="selectCompany(index)"
              >
                <span>{{index+1}}、</span>
                <span>{{item.enterprises}}</span>
              </li>
              <li class="item"><span>&nbsp;&nbsp;&nbsp;</span><span>......</span></li>
            </ul>
          </div>
        </div>
      </template>

      <template v-slot:flex-left>
        <div></div>
      </template>
      <template v-slot:flex-right>
        <div
          class="m-item m-itemcenter"
          @click="pushVideo"
        >推送视频</div>
        <div
          class="m-item m-itemcenter"
          @click="pushMessage"
        >推送短信</div>
      </template>

    </com-pop>
    <PrecisionSearch v-if="isShowPrecisionSearch" @close="searchClose" />
  </div>

  <!-- 工商信息 e -->
</template>

<script>
import PrecisionSearch from "@/components/pop/shanglian/PrecisionSearch";

const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};
export default {
  watch: {
    "$store.state.pop.call": {
      handler(newVal, oldVal) {
        // if(newVal % 2 == 0) return;
        let pName = this.$store.state.pop.params.pName;
        let insId = this.$store.state.pop.params.insId;
        let type = this.$store.state.pop.params.logo;
        let up_industry = this.$store.state.pop.params.up_industry
        
        this.province = pName;
        this.industryId = insId;

        console.log('====1===========',pName,insId);
        
        this.$axios
          .get(`${this.$api.searchPrinceCom}/?industryid=${insId}&provinces=${pName}&logo=${type}${type=='up'?'&up_industry='+up_industry:null}`)
          .then(res => {
            this.company = res.data.enterprises_data;
            this.total = res.data.count;
          });
      }
    }
  },

  components: {
    ComPop,
    PrecisionSearch
  },

  data() {
    return {
      id: undefined, //保存从store拿到的省份ID和行业ID
      province: "" || "广东省",
      industryId:null,
      total: "" || 1,
      company: [],
      num: 0, //用来控制是否给li加上active类
      temArr: ["A", "B", "C", "D", "E", "F", "G", "H"],
      isShowPrecisionSearch: false
    };
  },

  methods: {
    searchClose(){
      this.isShowPrecisionSearch = false
    },
    searchCom() {
      console.log('=========2======',this.province,this.industryId);
        this.isShowPrecisionSearch = true;
      //跳出弹窗
      this.$store.commit("showPop", {
        popName: "precisionSearch",
        params: {
          province: this.province, //省份id
          industryId: this.industryId //行业id
        }
      });

    },
    //给li加上active的类名
    selectCompany(index) {
      this.num = index;
    },
    randomCompany() {

      this.$axios.get(`${this.$api.inbatch}/batch/inbatch/`).then(res => {
        if (res.data.code === 2) {
          return alert("没有更多数据了");
        }
        this.company = res.data.enterprises_data;
      });

    },

    //生成一个随机的标记，以传给后台
    createRandomID() {
      let randomID;
      let companyID = localStorage.getItem("companyID");
      let tem = companyID.split(",");
      let index = Math.floor(Math.random() * tem.length);
      randomID = tem[index];
      tem.splice(index, 1);

      if (tem.length === 0) {
        localStorage.setItem("companyID", this.temArr);
        return randomID;
      }
      localStorage.setItem("companyID", tem);
      return randomID;
    },
    pushVideo() {
      console.log("bbbbbb");
    },
    pushMessage() {}
  }
};
</script>

<style lang="stylus" scoped>
 #companyList
  position relative
  width 100%
  .top
    position absolute
    width: inherit
    padding 0 15px 
    box-sizing border-box
    display flex
    background-color #fff
    justify-content space-between
    align-items center
    border-radius 5px 5px 0 0
    h4
      padding 10px 0
      font-size 0.36rem
    .searchBtn
      display inline-block
      padding 0.08rem 0.2rem  
      background-color #09a2a3
      border-radius 5px
      color #fff
      font-size 0.24rem
    .random
      position relative
      color #fe8700
      padding 0  0  0 20px
      font-size 0.32rem
      &::before
        position absolute 
        right 100%
        top 5px
        display inline-block
        content ''
        background url('../../../assets/icon/random.png') center no-repeat
        background-size 0.32rem 0.32rem
        width 0.32rem
        height 0.32rem
        vertical-align center
        transform scale(1)
  .bottom
    height 100vh
    padding 60px 15px  10px 15px
    box-sizing border-box
    background-color  rgba(233,233,233,0.6)
    .list
      font-size 0.38rem
      height 80vh
      .item 
        text-overflow: ellipsis
        overflow hidden
        white-space nowrap
        padding 3px 0
        font-size 0.38rem
        &.active
          color #fe8700
      .contact
        text-align center
        margin-top 10px  
        .contactType
          display flex
          justify-content space-around
          .imgbox
            width 30px
            height 30px
            img 
              width 100%
              height 100%
            
  .close  
    position absolute
    top -55px
    right -5px
    width 60px
    height 60px
    background url('../../../assets/icon/close@2x.png') no-repeat center
    transform scale(0.5)
  .foot
    position absolute 
    width 100%
    border-radius 0 0 5px 5px
    overflow hidden
 
</style>

