<template>
  <div id="setSub">
    <div
      class="selectArea"
      @click="showSelectArea"
    >
      <span>数据区域</span>
      <span class="arrow"></span>
    </div>

    <SearchList
      v-if="isShowSearchLit"
      @search='setArea'
    />

    <div class="area">{{showArea}}</div>
    <p class="note">设置关键词(商机信息包含的关键词)</p>
    <ul class="list">
      <li
        class="item"
        v-for="(item,index) in postData.keywordList"
        :key="index"
      >
        <span
          class="delBG"
          @click="delKeyword(index)"
        ></span>
        <input
          class="inputText"
          type="text"
          placeholder="请输入关键词，2-6个中文字"
          v-model="postData.keywordList[index]"
        >
      </li>
      <li
        class="add"
        @click="addKeyword"
      >
        <span class="addKeyword">添加关键词</span>
        <span class="limitNum"> ( 最多添加5个关键词 )</span>
      </li>
    </ul>
    <p class="note">提醒设置</p>
    <ul class="setting">
      <li class="isT">
        <span>推送提醒</span>
        <input
          class="weui-switch"
          type="checkbox"
          v-model="postData.is_remind"
        >
      </li>
      <li
        class="isT"
        @click="changeSaveTime"
      >
        <span>推送记录保存时间</span>
        <span class='timer'>{{postData.remind_long_time}} 天</span>
      </li>
      <li class="isT">
        <span>提醒微信用户</span>
        <div class="userInfo">
          <div class="avatar">
            <img
              :src="userInfo.headimgUrl"
              alt=""
            >
          </div>
          <span class="name">{{userInfo.username}}</span>
        </div>
      </li>
    </ul>
    <div
      class="saveBtn"
      @click="save"
    >保存</div>

  </div>
</template>
<script>
import SearchList from "../model/SearchList";
export default {
  data() {
    return {
      oldKeyword: [], //保存第一次进入页面时拿到的关键词。以用之后的比较
      isShowSearchLit: false,
      postData: {
        user_id: 3, //要提醒的用户
        areas_id: "" || 0,
        remind_long_time: "" || 7, //选择的时间

        keywordLista: [], //设置的关键词
        keywordList: [], //设置的关键词
        is_remind: false, // 是否推送提醒
        area_name: "" //省份名字
      },
      showArea: "" || "全国", //显示 在页面上的区域
      isShowSelectTime: true, //是否显示时间选择下拉菜单
      dataTime: [
        {
          label: "7",
          value: 0
        },
        {
          label: "30",
          value: 0
        },
        {
          label: "90",
          value: 1
        }
      ],
      area: [
        {
          id: 0,
          label: "全国"
        },
        {
          id: 1,
          label: "北京市"
        },
        {
          id: 2,
          label: "天津市"
        },
        {
          id: 9,
          label: "上海市"
        },
        {
          id: 22,
          label: "重庆市"
        },
        {
          id: 3,
          label: "河北省"
        },
        {
          id: 4,
          label: "山西省"
        },
        {
          id: 6,
          label: "辽宁省"
        },
        {
          id: 7,
          label: "吉林省"
        },
        {
          id: 8,
          label: "黑龙江省"
        },
        {
          id: 10,
          label: "江苏省"
        },
        {
          id: 11,
          label: "浙江省"
        },
        {
          id: 12,
          label: "安徽省"
        },
        {
          id: 13,
          label: "福建省"
        },
        {
          id: 14,
          label: "江西省"
        },
        {
          id: 15,
          label: "山东省"
        },
        {
          id: 16,
          label: "河南省"
        },
        {
          id: 17,
          label: "湖北省"
        },
        {
          id: 18,
          label: "湖南省"
        },
        {
          id: 19,
          label: "广东省"
        },
        {
          id: 21,
          label: "海南省"
        },
        {
          id: 23,
          label: "四川省"
        },
        {
          id: 24,
          label: "贵州省"
        },
        {
          id: 25,
          label: "云南省"
        },
        {
          id: 27,
          label: "陕西省"
        },
        {
          id: 28,
          label: "甘肃省"
        },
        {
          id: 29,
          label: "青海省"
        },
        {
          id: 32,
          label: "台湾省"
        },
        {
          id: 5,
          label: "内蒙古自治区"
        },
        {
          id: 20,
          label: "广西壮族自治区"
        },
        {
          id: 26,
          label: "西藏自治区"
        },
        {
          id: 30,
          label: "宁夏回族自治区"
        },
        {
          id: 31,
          label: "新疆维吾尔自治区"
        },
        {
          id: 33,
          label: "澳门"
        },
        {
          id: 34,
          label: "香港"
        }
      ],

      uerInfo: {} //保存从store取来的用户信息
    };
  },

  components: {
    SearchList
  },

  beforeCreate() {
    let tabbar = document.getElementById("tabbar");
    tabbar.style.transform = "scale(0)";
  },

  beforeRouteLeave(to, from, next) {
    let tabbar = document.getElementById("tabbar");
    tabbar.style.transform = "scale(1)";
    next();
  },

  created() {
    let uerInfo = this.$store.state.loginInfo.userInfo;
    this.userInfo = uerInfo;
    //获取全国的区域
    // this.$axios.get(`${this.$api.selectArea}/`).then(res => {
    //   res.data.forEach((item, index) => {
    //     let tem = {};
    //     tem["label"] = item.provinces;
    //     tem["id"] = item.id;
    //     this.area.push(tem);
    //   });
    // });

    this.$axios
      .get(`${this.$api.setSubKeyword}`, {
        params: {
          token: uerInfo.token
        }
      })
      .then(res => {
        if (res.data.message === false) {
          return;
        }

        let keyword = res.data.data_dict.keywords_array;
        if (keyword) {
          this.postData.keywordList = keyword.split(",");
          this.oldKeyword = keyword.split(","); //保存原来的关键词，做为之后传到后台的对比
        } else {
          this.oldKeyword = "";
        }

        this.postData.is_remind = res.data.data_dict.is_remind;
        this.postData.remind_long_time = res.data.data_dict.remind_long_time;
        let areaid = res.data.data_dict.areas_id;

        let arrid = areaid.split(",");
        let tem = [];
        for (let i = 0; i < arrid.length; i++) {
          for (let j = 0; j < this.area.length; j++) {
            if (Number(arrid[i]) === Number(this.area[j].id)) {
              tem.push(this.area[j].label);
            }
          }
        }

        let set = new Set(tem);
        let tem1 = Array.from(set);
        this.showArea = tem1.join();
        this.postData.areas_id = res.data.data_dict.areas_id;
      });
  },

  methods: {
    setArea(area) {
      if (Object.keys(area).length === 0) {
        this.postData.area_name = this.showArea = "全国";
        this.postData.areas_id = "0";
      } else {
        let areaArr = [];
        let idArr = [];
        for (let key in area) {
          idArr.push(area[key].id);
          areaArr.push(area[key].label);
        }

        this.postData.area_name = this.showArea = areaArr.join();
        this.postData.areas_id = idArr.join();
      }
      this.isShowSearchLit = false;
    },

    delKeyword(index) {
      // if (this.postData.keywordList.length > 1) {
      this.postData.keywordList.splice(index, 1);
      // } else {
      //   this.$toast("至少保留一个关键词");
      // }
    },

    addKeyword() {
      if (this.postData.keywordList.length === 5) {
        return this.$messageBox("错误", "最多只能添加5关键词");
      }
      this.postData.keywordList.push("");
    },
    changeSaveTime() {
      this.$weui.picker(this.dataTime, {
        onChange: function(result) {},
        onConfirm: result => {
          this.postData.remind_long_time = result[0].label;
        }
      });
    },

    showSelectArea() {
      this.isShowSearchLit = true;
    },
    showSelectTime() {
      this.isShowSelectTime = true;
    },
    selectTime() {
      console.log("selectTime");
    },
    save() {
      let token = this.$store.state.loginInfo.userInfo.token;

      let allLength = this.postData.keywordList.length;
      let oldLength = this.oldKeyword.length;
      let newKeyword = [];

      if (allLength <= oldLength) {
        newKeyword = this.postData.keywordList;
      } else {
        this.postData.keywordList.forEach(item => {
          if (this.oldKeyword.indexOf(item) === -1) {
            newKeyword.push(item);
          }
        });
      }

      if (this.postData.keywordList.indexOf("") !== -1) {
        return this.$toast("关键词不能为空");
      }

      let data = {
        token,
        area_name: this.showArea,
        areas_id: String(this.postData.areas_id),
        keywords_array: this.postData.keywordList.join(),
        is_remind: this.postData.is_remind ? "1" : "0",
        remind_long_time: this.postData.remind_long_time,
        newKeyword: newKeyword.join()
      };

      if (data.keywords_array.trim() === "") {
        return this.$toast("请输入关键词,建议2-6个字。不包含空格或特殊字符");
      }

      this.$axios.post(`${this.$api.setSubKeyword}`, data).then(res => {
        let instance = this.$toast("保存成功");
        setTimeout(() => {
          instance.close();
          this.$router.push("/mySubscript");
        }, 1000);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#setSub
  width 100%
  height 100%
  box-sizing border-box
  font-size 0.28rem
  position relative
  background-color #f3f3f3
  margin-top 0.2rem
  padding-bottom 1.4rem
  font-size 0.24rem
  .selectArea
    position relative
    font-weight 600
    display flex
    justify-content space-between
    align-items center
    background-color #fff
    height 0.74rem
    line-height 0.74rem
    span 
      display inline-block
      width 30%
      padding 0.1rem 0.2rem
      &.arrow
        position absolute
        right 0
        height 0.32rem
        background url(../../../assets/icon/arrow@16_29.png) 90% no-repeat 
        background-size 0.16rem 0.32rem
  .area
    height 0.74rem
    line-height 0.74rem
    padding 0.1rem 0.2rem 
    background-color #fff
  .note
    font-weight 600
    background-color #f3f3f3
    height 40px
    line-height 40px
    padding 0 10px
  .list
    width 100%
    padding 0 0.2rem
    box-sizing border-box
    background-color #fff
    .add
      width 100%
      .addKeyword
        color  #09a2a3
        &::before 
          content ''
          display inline-block
          width 0.32rem
          height 0.32rem
          background url(../../../assets/icon/add@30.png) left no-repeat 
          background-size 0.32rem 0.32rem
          vertical-align middle
          padding 0.32rem 0.1rem  0.32rem 0
      .limitNum
        color #999999  
    .item
      border-bottom 1px solid #f3f3f3   
      .delBG
        content ''
        display inline-block
        width 0.32rem
        height 0.32rem
        background url(../../../assets/icon/reduce@30.png) left no-repeat 
        background-size 0.32rem 0.32rem
        vertical-align middle
        padding 0.32rem 0.1rem 0.32rem 0 
      .inputText
        border 0 
        width 85vw
  .setting
    width 100%
    padding 0 0.1rem
    box-sizing border-box
    background-color #fff
    .isT
      padding 0.22rem 0 
      border-bottom 1px solid #f3f3f3
      font-weight 600
      display flex
      justify-content space-between
      align-items center
      .weui-switch
        background-color #09a2a3
      .timer
        padding 0 0.2rem 0 0.4rem
        &::after
          display inline-block
          content ''
          width 0.32rem
          height 0.32rem
          background url(../../../assets/icon/arrow@16_29.png) 90% no-repeat 
          background-size 0.16rem 0.32rem
          vertical-align middle
          margin-left 0.1rem
      .otherT
        position absolute 
        width 0.6rem
        height 1.2rem 
        border 1px solid red  
      .userInfo
        display flex
        align-items center
        .avatar
          display inline-block
          width   0.8rem
          height   0.8rem
          border 1px solid #f3f3f3
          border-radius 50%
          overflow hidden
          margin-right 0.16rem
          img 
            width 100%
            height 100%
        .name
          margin-right 0.1rem
        
  .picker
    width 100%
    height 3rem
    border 1px solid red
    position fixed 
    bottom 1rem
    box-sizing border-box
    .list
      width 100%
      height 2rem
      text-align center
      height 0.48rem
      line-height 0.48rem
      overflow-y auto
  .saveBtn
    color #ffffff
    text-align center
    line-height 1rem
    font-size 0.3rem
    width 7rem
    height 1rem
    background-color #09a2a3
    border-radius 0.06rem
    margin 0 auto
    margin-top 0.5rem
</style>
