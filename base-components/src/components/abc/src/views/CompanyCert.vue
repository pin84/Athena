<template>
  <div id="operator">
    <mt-navbar v-model="selected" class="mt-navbar-reset">
      <mt-tab-item id="1">待审核</mt-tab-item>
      <mt-tab-item id="2">审核通过</mt-tab-item>
      <mt-tab-item id="3">审核不通过</mt-tab-item>
      <mt-tab-item id="4">待支付</mt-tab-item>
    </mt-navbar>
    <h2 class="list-title">企业认证审核列表</h2>
    <!-- v-infinite-scroll="loadMoreFunc"
    :infinite-scroll-disabled="loading"
    infinite-scroll-distance="100"-->
    <div class="pushTemplateList">
      <!-- <mt-loadmore  :autoFill="true" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <ul
        class="list"
        v-infinite-scroll="loadBottom"
        :infinite-scroll-disabled="allLoaded"
        infinite-scroll-distance="100"
      >
        <!-- <li class="item" v-if="isEmpty" >
          您尚未添加模板，请选择'添加模板'添加
          <span class="item-span">您尚未添加模板，请选择</span>
          <span  class="item-span" style="color:green;display:inline"></div>
          <span  class="item-span"></span>
        </li>-->
        <li
          class="item"
          v-show="showCondition(item,selected)"
          v-for="(item,index) in templates"
          :key="index"
        >
          <template v-for="(v,key) in item">
            <template v-if="['id','itemData','审核意见','营业执照'].indexOf(key) == -1">
              <!-- key !=='id' && key !=='itemData' && key !=='审核意见'  -->
              <!-- v-if="key=='待审核'" -->

              <p
                :key="key"
                class="content_p"
                v-if="aduitShow(item,key,v)"
                :class="{'line-slice':key=='审核人'}"
              >
                <!-- v-if="key !=='id' && key !=='审核意见' " -->
                <span class="title">{{key}}</span>
                <span>{{v}}</span>
              </p>
            </template>
            <template v-if="key=='营业执照'">
              <p class="content_p" :key="key">
                <span>{{key}}</span>
                <img class="bussiness-img" :src="v" alt v-preview="v" preview-nav-enable="false" />
              </p>
            </template>
          </template>
          <template v-if=" item.itemData.pay_status !== 0 ">
            <p class="content_p">
              <span>申请意见</span>
              <textarea v-if="+selected == 1" v-model="item.itemData.opinion" class="opinion_area"></textarea>
              <span v-if="+selected !== 1">{{item.itemData.opinion}}</span>
            </p>
            <div class="btnAndStatus">
              <span></span>
              <span v-if="item['审核意见']=='待审核'" class="btn self-flexleft">
                <span class="active" @click="agree(item)">同意</span>
                <span @click="disagree(item)">不同意</span>
              </span>
              <span v-else class="self-flexleft">{{item['审核意见']}}</span>
            </div>
          </template>
        </li>
      </ul>
      <!-- </mt-loadmore> -->
    </div>
  </div>
</template>

<script>
import "@/assets/scss/compop/comPopTemList.styl";
import { Loadmore } from "mint-ui";

export default {
  name: "Operator",

  data() {
    return {
      getNewItem: null,
      selected: "1",
      loadMore: false,
      nextData: null,
      previousData: null,
      needMore: false,
      userInfo: this.$store.state.loginInfo.userInfo,
      templates: [],
      loading: false,
      pageNum: 1,

      allLoaded: false //上拉刷新加载完成
    };
  },
  computed: {
    /*
    isLastPage(){
      let previousData = this.previousData,
          nextData = this.nextData;
          
      return (previousData !== null && nextData == null)?true:false
    },*/
    // isLastPage(){
    //   let count = this.count,
    //       templates = this.templates;
    //   if(count < templates.length){
    //     return true;
    //   }else{
    //     return false;
    //   }
    //   // return (previousData !== null && nextData == null)?true:false
    // },
  },

  components: {
    "mt-loadmore": Loadmore
  },

  beforeMount() {
    // 数据获取格式转换
  },
  watch: {
    selected() {
      this.freshInfo();
    }
  },
  methods: {
    isLastPage() {
      let count = this.count,
        templates = this.templates;

      if (count <= templates.length) {
        this.allLoaded = true;
        return true;
      } else {
        return false;
      }
      // return (previousData !== null && nextData == null)?true:false
    },
    async loadBottom() {
      // 加载更多数据
      // this.loadMoreFunc();

      if (this.isLastPage()) {
        return;
      }

      this.allLoaded = true; // 若数据已全部获取完毕
      let auditList = await this.getCompanyCertData();
      this.allLoaded = false;
      if (auditList && this.isLastPage()) {
        return;
      }
      // this.$refs.loadmore.onBottomLoaded();
    },
    showCondition(item, selected) {
      // this.loadBottom();
      // this.$refs.loadmore.onBottomLoaded();
      /*
        {
          1:待审核
          2:审核通过
          3:审核不通过
          4:待支付
        }
      */

      let selectedNum = +selected;
      let { identity_status, pay_status } = item.itemData;
      // [identity_status] 审核状态1-3 [pay_status] 待支付状态 0未支付 1待支付

      if (selectedNum >= 1 && selectedNum < 4) {
        // 待审核 审核通过 审核不通过

        if (selectedNum !== 1) {
          // 非待审核

          return identity_status == selectedNum;
        } else if (selectedNum == 1) {
          // 待审核

          return pay_status == 1 && identity_status == selectedNum;
        }
      } else if (selectedNum == 4) {
        // 待支付

        return pay_status == 0;
      }
    },

    /*
    async getCompanyCertData(){
      let url = 'http://47.106.105.213:8000';
      this.nextData?url += this.nextData :url =this.$api.companyCertData;
      // if(this.previousData !== null && this.nextData == null)return;
      
      let {data} =  await this.$axios.get(url)
      let { results:auditList,next,previous} = data;
      this.nextData = next?next.split('http://47.106.105.213')[1]:null;
      this.previousData = previous?previous.split('http://47.106.105.213')[1]:null;

      console.log(next,this.nextData,previous,this.previousData)
      
      if(auditList !== undefined ){
        this.auditListTrans(auditList,200);
      }
      
      return data
    },
    */

    async getCompanyCertData() {
      let { data } = await this.$axios.get(this.$api.companyCertData, {
        params: {
          page: this.pageNum
        }
      });
      let { results: auditList, count } = data;

      this.count = count;
      this.pageNum += 1;

      if (auditList !== undefined) {
        this.auditListTrans(auditList, 200);
      }

      return auditList;
    },

    async loadMoreFunc() {
      // console.log('loadmore!!!')
      // console.trace();
      // this.loading = true;

      // if(this.isLastPage()){
      //   this.allLoaded = true
      //   return
      // };
      await this.getCompanyCertData();
      if (this.isLastPage()) {
        return;
      }
      // this.loading = false;
    },

    // 根绝审核的状态 判断是否需要显示审核人及审核时间 （待审核才显示）
    aduitShow(item, key, val) {
      if (key == "审核时间" || key == "审核人") {
        if (item["审核意见"] !== "待审核") {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    // 审核状态判断 根据不同的状态选择不同的颜色
    auditState(val, key) {
      let auditStyle;
      if (key === "审核状态") {
        if (val === "审核不通过") {
          auditStyle = {
            color: "red"
          };
        } else if (val === "审核通过") {
          auditStyle = {
            color: "green"
          };
        }

        return auditStyle;
      }
    },

    // 根据 状态排序
    stateSort(arr) {
      arr.sort((a, b) => {
        let sta = a.itemData.state;
        let stb = b.itemData.state;

        return sta - stb;
      });
      return;
    },

    // 模板列表数据转换
    auditListTrans(temList, money) {
      let showTemList = [];
      // 模板内容循环渲染
      let hasIdentity_status = new Set(); //用于防止加载新数据 然而数据中缺失某一状态的情况
      temList.forEach((ele, index) => {
        //   let {id,template_name,sms_type,content,data_time,username,state,reviewer_name,reviewer_time} =  ele;
        let {
          name, //企业名称
          company_id, //企业id
          mysql, //数据库是否存在
          code, //统一社会信用代码
          province, //归属省份 : province
          industry, //归属行业
          avatar, //照片名称
          contacts, //联系人
          phone, //联系电话
          username, //申请用户
          create_time, //申请时间
          identity_status, //审核意见 状态
          reviewer_name, //审核人
          reviewer_time //审核时间
        } = ele;

        let stateText;
        if (ele.pay_status == 1) {
          hasIdentity_status.add(identity_status);
        }

        switch (identity_status) {
          case 1:
            stateText = "待审核";
            break;

          case 2:
            stateText = "审核通过";
            break;

          case 3:
            stateText = "审核不通过";
            break;
        }

        let item = {
          // id :id,
          企业名称: name,
          // "统一社会信用代码":code,
          归属省份: province,
          归属行业: industry,
          营业执照:
            `${this.$api.companyCertPicture}?token=${this.userInfo.token}&avatar=` +
            avatar,
          联系人: contacts,
          联系电话: phone,
          支付金额: money,
          申请用户: username,
          申请时间: this.$commonFn.formatTime(new Date(create_time), 2),
          审核意见: stateText,
          审核人: reviewer_name,
          审核时间: this.$commonFn.formatTime(new Date(reviewer_time), 2),
          存在数据: mysql,
          itemData: ele
        };
        showTemList.push(item);
      });

      this.templates = this.templates.concat(showTemList);

      if (hasIdentity_status.size !== 3) {
        //三个认证状态
        this.getNewItem = {};
        hasIdentity_status.forEach(ele => (this.getNewItem[ele] = true));

        if (this.getNewItem !== null && !this.getNewItem[this.selected]) {
          if (this.isLastPage()) {
            return;
          }
          this.loadMoreFunc();
        }
      } else {
        this.getNewItem = null;
      }
    },

    // 刷新模板信息
    freshInfo() {
      this.nextData = null;
      this.previousData = null;
      this.count = 0;
      this.templates = [];
      this.pageNum = 1;
      this.loadMoreFunc();
    },

    // 同意及不同意的按钮公共方法

    async isAgreeCommonFun(item, aduitState) {
      let { name, company_id, opinion } = item.itemData;
      if ((opinion == null || opinion.length < 5) && aduitState == false) {
        this.$toast({
          message: `申请意见不少于5个字！`
        });
        return;
      }

      let stateNum = 3;
      aduitState ? (stateNum = 2) : (stateNum = 3);

      this.$indicator.open({
        text: `数据 让营销者先行...`
      });

      let { data: auditList } = await this.$axios
        .post(this.$api.auditUsers, {
          identity_status: stateNum,
          company_id,
          name,
          opinion,
          token: this.userInfo.token
        })
        .catch(rej => {
          this.$indicator.close();

          this.$toast({
            message: "审核失败,请检查网络或稍后再重试"
          });
          return rej;
        });

      if (auditList.message == "审核成功") {
        this.$toast({
          message: "审核成功"
        });

        // let d = {
        //   user_id: item.itemData.user,
        //   company_id: item.itemData.company_id
        // };
        // console.log(`===00====`, d);

        // let res = await this.$axios.get(this.$api.setComAdmin, {
        //   params: d
        // });

        // console.log(`===res====`, res);
      } else {
        this.$toast({
          message: "审核失败,请检查网络或稍后再重试"
        });
      }

      this.freshInfo();
    },

    // 同意按钮
    async agree(item) {
      this.isAgreeCommonFun(item, true);
    },

    // 不同意按钮
    async disagree(item) {
      this.isAgreeCommonFun(item, false);
    }
  }
};
</script>

<style lang="stylus">
#operator
  position absolute
  top 1rem
  left 0
  width 100%
  bottom 0.98rem
  overflow scroll
  .list-title
    position fixed
    top 1rem
    left 0
    right 0
    height 1rem
    line-height 1rem
    text-align center
    z-index 1

    background white

// 审核人前分割 s
.line-slice
  margin-top 10px

// 审核人前分割 e

.bussiness-img
  height 2rem

    
.self-flexleft
  align-self: flex-start

.pushTemplateList
  margin-top 1rem
  height 100%

.list:after
  content ""
  display block
  width 100%
  height 100px

.opinion_area
  width 80%
  overflow auto
  word-break break-all
  height 2rem


/*
.item-span
  // float left
  
.pushTemplateList
  width 100%
  background-color #fff
  padding-bottom 30px
  font-size 0.3rem
  // border-radius 10px
  h3
    text-align center
    padding-top 40px
  .list
    // width 100%
    padding 0 0.20rem
    .item
      background-color #f3f3f3
      border-radius 10px
      margin-top 10px
      padding 0.20rem
      box-sizing border-box
      display flex
      flex-direction column
      font-size 0.28rem
      
      .content_p
        display flex
        height 0.38rem
        line-height 0.28rem
        
        &>:first-child
          flex-basis 30%
          // font-weight 520
          
        &.hidden
          display none  
          

      .btnAndStatus
        display flex
        justify-content space-between 
        // height 36px
        // line-height 36px   
        .btn
          position relative
          span
            padding 1px 12px
            border 1px solid #333333
            border-radius 13px
            margin-right 15px
          .active
            color #09a2a3
            border 1px solid #09a2a3
        .status_0
          color #FF9900
        .status_1
          color #00CC00
        .status_2
          color #CC0033
*/

</style>