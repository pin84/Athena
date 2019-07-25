<template>
  <com-pop
    my-index="templateList"
    class="top_0"
  >
    <template v-slot:pop-content>
      <div class="pushTemplateList">
        <h3>推送模板列表</h3>
        <ul class="list">
          <li
            class="item"
            v-for='(item,index) in templates'
            :key='index'
          >
            <p
              v-for='(v,key) in item'
              :key='key'
              class="content_p"
              :class="{hidden:key === 'status' || key==='id' || key ==='content'}"
            >
              <span>
                {{key}}
              </span>
              <span>
                {{v}}
              </span>
            </p>
            <div class="btnAndStatus">
              <span class="btn">
                <span
                  @click="editTemplate(item)"
                  class="active"
                >编辑</span>
                <span @click="btnDEL(item)">删除</span>
              </span>
              <span :class="'status_'+item.status">{{status[item.status]}}</span>
            </div>
          </li>
        </ul>

      </div>

    </template>

    <template v-slot:flex-left>
      <div class="m-item m-itemcenter">取消</div>
    </template>
    <template v-slot:flex-right>
      <div class="m-item footbtn">
        <div
          class="radiusBtn"
          @click="addTem"
        >添加模板</div>
      </div>
    </template>
  </com-pop>

</template>
<script>
const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};

export default {
  data() {
    return {
      templates: [
        {
          id: 1,
          模板名称: "上下链短信模板",
          模板类型: "短信",
          "日期: ": "2019-02-14",
          "操作人:": "张依依",
          'content':'sdfsfs',
          status: 0
        },
        {
          id: 2,
          模板名称: "上下链视频模板",
          模板类型: "视频",
          "日期: ": "2019-02-14",
          "操作人:": "张依依",
          status: 1
        },
        {
          id: 3,
          模板名称: "上下链邮件模板",
          模板类型: "邮件",
          "日期: ": "2019-02-14",
          "操作人:": "张依依",
          status: 2
        }
      ],
      status: ["审核中", "审核通过", "审核失败"]
    };
  },
  components: {
    ComPop
  },


  methods: {
    addTem() {
      let oldShow = this.$store.state.pop.oldShow
      this.$store.commit("showPop", {
        popName:oldShow
      });
    },
    editTemplate(item) {
      let type = item["模板类型"];
      if (type === "短信") {
        this.$store.commit("showPop",{
          popName:'editMsgTemplate',
          params:item
        });
      }
      if (type === "视频") {
        this.$store.commit("showPop", "videoTemplate",item);
      }
    },
    btnDEL(item) {
      console.log(item);
    }
  }
};

</script>
<style lang="stylus" scoped>
.pushTemplateList
  width 100%
  height 100%
  background-color #fff
  padding-bottom 30px
  h3
    text-align center
    padding-top 40px
  .list
    width 100%
    .item
      background-color #f3f3f3
      border-radius 4px
      margin-top 10px
      padding 5px
      box-sizing border-box
      display flex
      flex-direction column
      font-size 14px
      .content_p
        display flex
        height 24px
        line-height 24px
        &>:first-child
          flex-basis 30%
        &.hidden
          display none  
      .btnAndStatus
        display flex
        justify-content space-between 
        height 36px
        line-height 36px   
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

      

</style>
