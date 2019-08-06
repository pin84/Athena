<template>
  <com-pop
    @comPopShow="comPopIsShow"
    my-index="selectTem"
  >

    <!-- class="top_0" -->
    <template v-slot:pop-content>
      <div class="pushTemplateList">
        <h3>短信模板列表(请选择推送内容)</h3>
        <ul class="list">
          <li
            class="item"
            v-if="isEmpty"
          >
            您尚未添加模板，请选择'添加模板'添加
            <!-- <span class="item-span">您尚未添加模板，请选择</span>
            <span  class="item-span" style="color:green;display:inline"></span>
            <span  class="item-span"></span> -->
          </li>
          <li
            class="item"
            v-for='(item,index) in templates'
            :key='index'
            @click="chooseTem(index)"
          >
            <p
              v-for='(v,key) in item'
              :key='key'
              class="content_p"
              :class="{hidden:key === 'status' || key==='id' || key ==='content'}"
            >
              <span class="title">
                {{key}}
              </span>
              <span
                :style="auditState(v,key)"
                class="right"
              >
                {{v}}
              </span>
            </p>

            <!-- <div class="btnAndStatus">
              <span class="btn">
                <span
                  @click="editTemplate(item)"
                  class="active"
                >编辑</span>
                <span @click="btnDEL(item)">删除</span>
              </span>
              <span :class="'status_'+item.status">{{status[item.status]}}</span>
            </div> -->

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
import "@/assets/scss/compop/comPopTemList.styl";

const ComPop = resolve => {
  import("@/components/common/ComPop").then(module => {
    resolve(module);
  });
};

export default {
  data() {
    return {
      templates: [],
      status: ["审核中", "审核通过", "审核失败"],
      userInfo: this.$store.state.loginInfo.userInfo,
      isEmpty: true
    };
  },
  components: {
    ComPop
  },

  methods: {
    // 审核状态
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

    chooseTem(index) {
      let chooseItem = this.templates[index];

      let tem = {
        template_name: chooseItem["模板名称"],
        content: chooseItem["模板内容"]
      };

      console.log(`=======`, chooseItem);

      if (chooseItem["审核状态"] === "审核通过") {
        this.$store.commit("showPop", {
          popName: "pushMsg",
          params: {
            saveParams: true,
            getTem: { ...tem }
          }
        });
      } else if (chooseItem["审核状态"] === "待审核") {
        this.$toast({
          message: "该模板待审核，请等待模板审核成功后再做选择"
        });
      } else if (chooseItem["审核状态"] === "审核不通过") {
        this.$toast({
          message: "该模板审核不通过，无法选择"
        });
      }
    },
    async comPopIsShow(isShow) {
      if (isShow) {
        let { data } = await this.$axios.get(this.$api.selectTemplate, {
          params: {
            token: this.userInfo.token
          }
        });
        // .then(res=>res.data)
        // .catch(rej=>rej)
        let { template: temList } = data;
        if (temList == undefined || temList.length == 0 || data.length == 0) {
          this.isEmpty = true;
          return;
        } else {
          this.isEmpty = false;
        }


        let showTemList = [];
        // 模板内容循环渲染
        temList.forEach((ele, index) => {
          let {
            id,
            template_name,
            sms_type,
            content,
            data_time,
            username,
            state
          } = ele;
          data_time = data_time.split("+")[0].replace("T", " ");
          let stateText;
          switch (state) {
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
            id: id,
            模板名称: template_name,
            模板类型: sms_type,
            模板内容: content,
            申请日期: data_time,
            申请人: username,
            审核状态: stateText
          };
          showTemList.push(item);
        });

        console.log(`==showTemList=====`, showTemList);

        let pass = [];
        let ng = [];
        let waiting = [];
        showTemList.forEach(item => {
          if (item["审核状态"] === "审核不通过") {
            ng.push(item);
          } else if (item["审核状态"] === "审核通过") {
            pass.push(item);
          } else {
            waiting.push(item);
          }
        });
        this.sortDate(pass, "申请日期");
        this.sortDate(ng, "申请日期");
        this.sortDate(waiting, "申请日期");

        this.templates = waiting.concat(pass.concat(ng));

        console.log(`=======`, this.templates);
      } else {
        this.$emit("closeMsgTemplate");
      }
    },

    sortDate(arr, sortProperty) {
      arr.sort((a, b) => {
        return new Date(b[sortProperty]) - new Date(a[sortProperty]);
      });
    },
    addTem() {
      this.$store.commit("showPop", {
        popName: "msgTemplate"
      });
    },
    editTemplate(item) {
      let type = item["模板类型"];
      if (type === "短信") {
        this.$store.commit("showPop", {
          popName: "editMsgTemplate",
          params: item
        });
      }
      if (type === "视频") {
        this.$store.commit("showPop", "videoTemplate", item);
      }
    },
    btnDEL(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="stylus">
/*
.item-span
  // float left
  
.pushTemplateList
  width 100%
  height 100%
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
*/
      

</style>
