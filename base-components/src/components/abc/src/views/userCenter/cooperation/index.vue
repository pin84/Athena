<template>
  <div id="yaoqing" ref="wrapper">
    <div class="mainbody">
      <h3 class="title">邀请同事加入</h3>
      <ul class="list" v-if="people.length !== 0">
        <li class="item" v-for="(item,index) in people" :key="index">
          <div class="avatar">
            <img :src="item.avatar" />
          </div>
          <div class="name">{{item.username}}</div>

          <div
            @click="del(index)"
            class="del"
            :class="{'tp':item.status === 2}"
            v-show="isAdmin || userInfo.user_id === item.user_id || item.status === 2"
            ref="domList"
          >
            <template v-if="isAdmin">{{item.status === 2 ? '权限转移':'删除'}}</template>
            <template v-else>{{item.user_id === userInfo.user_id ? '解绑':'管理员'}}</template>
          </div>
        </li>
        <!-- <li class="item" v-if="isShowDel">
          <div class="avatar add">+</div>
          <div class="del addbtn">去邀请</div>
        </li>-->
      </ul>

      <div v-else>你还没有加入任务团队协作</div>

      <!--  v-show="people.length !== 3 && isAdmin" -->
      <button
        class="btn"
        @click="addMemberT"
        v-show="isAdmin"
        :class="{'disabled':people.length === 3}"
      >立即邀请</button>
    </div>

    <TipsMod
      :leftText="tipLeftText"
      :rightText="tipRightText"
      :content="tipContent"
      :isShow="isShowTips"
      @submit="tipsMSub"
      @cancel="tipsMCan"
    />
    <Tips leftText="取消" rightText="确认" @btnEvent="delMember" />
    <TipsAvatar
      v-if="isShowSurrender"
      :avatarList="restPeople"
      leftText="取消"
      rightText="确认"
      @btnEvent="avatarBtn"
    />
  </div>
</template>
<script>
import TipsMod from "../../../components/common/feedback/Tips_2";
import Tips from "../../../components/common/feedback/Tips";
import TipsAvatar from "../../../components/common/feedback/TipsAvatar";
// import {commonFnMixin} from '@/assets/js/mixins.js';

export default {
  // mixins:[commonFnMixin],

  data() {
    return {
      tipLeftText: null,
      tipRightText: null,
      isShowTips: false,
      tipContent: "",
      restPeople: [], //权限转移给的成员
      isShowSurrender: false,
      companyInfo: {
        // company_id: "",
        // company_name:''
      },
      userInfo: {
        // token:""
        // headimgUrl:'',
        // username:'',
        // user_id:''
      },
      // isShowDel: true,
      isAdmin: null,
      domList: [],
      people: [
        // {
        //   token: "",
        //   avatar: "",
        //   username: "aaa",
        //   user_id: "",
        //   status: 2
        // },
      ],
      i: null
    };
  },
  components: {
    Tips,
    TipsAvatar,
    TipsMod
  },

  beforeRouteEnter(to, from, next) {
    document.title = "团队协同";
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.title = "上下链";
    next();
  },
  async created() {

    this.companyInfo = JSON.parse(localStorage.getItem("com-indexinfo"));
    this.userInfo = JSON.parse(localStorage.getItem("sxlUserInfo"));

    this.initData();

    //获取用户的信息，检查是否有认证企业
    this.getUserCompany();
  },
  methods: {
    tipsMSub() {
      this.isShowTips = false;
      this.release();
    },
    tipsMCan() {
      this.isShowTips = false;
    },
    async initData() {
      let d = {
        token: this.userInfo.token,
        user_id: this.userInfo.user_id
        // company_id: this.companyInfo.company_id
      };

      console.log(`=====d==`, d);

      let { data } = await this.$axios.get(this.$api.getUserAuth, {
        params: d
      });

      if (data.message === false) {
        //如果没有加入任何企业
        return;
      }
      let user_id = this.userInfo.user_id;
      let tem = data.message.find(item => {
        return item.user_id === user_id;
      });

      if (tem && tem.status === 2) {
        this.isAdmin = true;
      }

      //全局存加入的企业信息
      this.companyInfo.company_id = tem.enterpriseid;
      this.companyInfo.company_name = tem.enterprise;

      console.log(`====this.isAdmin===`, this.isAdmin);

      this.people = data.message;
    },
    async del(index) {
      let text = this.$refs.domList[index].innerText;

      switch (text) {
        case "解绑":
          this.isShowTips = true;
          this.tipContent = `你确认要退出 ${this.companyInfo.enterprise} 吗？`;

          this.tipLeftText = "取消";
          this.tipRightText = "确定";
          // this.release();
          break;
        case "删除":
          console.log(`=====删除==`, this.people[index]);
          let username = this.people[index].username;
          let content = `你确认把 "${username}" 移出企业协同管理？`;
          this.$store.commit("isShowTips", {
            content,
            isShow: true
          });

          this.i = index;

          break;

        case "权限转移":
          if (this.people.length < 2) {
            this.tipContent =
              "没有其他用户可转移权限，请先邀请其他用户进入后再转移。";
            this.tipLeftText = "确定";
            this.isShowTips = true;
            return;
          }
          this.restPeople = this.people.filter(item => item.status !== 2);
          this.isShowSurrender = true;
          break;

        default:
          console.log(`======default=`);
          break;
      }

      // this.people.splice(index, 1);
    },

    async release() {
      let d = {
        token: this.userInfo.token,
        company_id: this.companyInfo.enterpriseid,
        user_id: this.userInfo.user_id
      };

      console.log(`===del====`, d);

      let res = await this.$axios.get(this.$api.delMember, {
        params: d
      });

      console.log(`====del===`, res);
      this.$router.push("./");
    },

    async addMemberT() {
      if (this.people.length === 3) {
        return;
      }
      if (this.isAdmin) {
        console.log(
          `=======`,
          this.companyInfo.company_name,
          this.companyInfo.company_id
        );
        
        this.bus.$emit("shareMaskShow", true);
        let qs = this.$qs.stringify({
          behavior:'invitation',
          comname: this.companyInfo.enterprise,
          username:this.userInfo.username,
          comID:this.companyInfo.enterpriseid,
          user_id_i:this.userInfo.user_id,
          token:this.userInfo.token,
        });
        let info = {
          title: `#上下链#${this.userInfo.username}邀请您加入 "${this.companyInfo.enterprise}"，共享上下链服务，实现团队协同合作。`,
          desc: `#上下链#  共享企业客库资源`,
          // link: `http://www.shangxialian.net/js/#/?behavior=invitation&comname=${this.companyInfo.enterprise}&username=${this.userInfo.username}&comID=${this.companyInfo.enterpriseid}&user_id_i=${this.userInfo.user_id}&token=${this.userInfo.token}`
          link: `http://${window.location.host}/js/#/?${qs}`,
        };

        this.$store.commit("setShareInfo", {
          link: info.link,
          desc: info.desc,
          title: info.title,
        });

        this.$store.commit("setFriendNetInfo", {
          link: info.link,
          desc: info.desc,
          title: info.title
        });

        // this.$store.commit("setFriendNetInfo", info);
      }
    },

    async avatarBtn(params) {
      if (params.flag) {
        this.isShowSurrender = false;

        let d = {
          token: this.userInfo.token,
          company_id: this.companyInfo.enterpriseid,
          user_id: params.user.user_id
        };

        let res = await this.$axios.get(this.$api.surrender, {
          params: d
        });

        // this.userAuthority();
        location.reload();
      } else {
        this.isShowSurrender = false;
      }
    },

    async delMember(type) {
      if (type) {
        let d = {
          token: this.userInfo.token,
          user_id: this.people[this.i].user_id,
          company_id: this.people[this.i].company_id
        };

        console.log(`====d===`, d);

        let res = await this.$axios.get(this.$api.delMember, {
          params: d
        });

        console.log(`====del===`, res);
        this.initData();
      }
    },

    // 获取用户企业
    async getUserCompany() {
      let userInfo = this.$store.state.loginInfo.userInfo,
        token = userInfo.token;

      let companyInfo = await this.$axios
        .get(this.$api.companyInfo, {
          params: {
            token: this.$store.state.loginInfo.userInfo.token
          }
        })
        .then(res => res.data)
        .catch(rej => {
          console.log(rej);
          this.$toast({
            message: "公司数据加载失败,请重新加载"
          });
          // this.$indicator.close();
          return rej;
        });

      console.log(`===companyInfo====`, companyInfo);

      if (companyInfo.status) {
        this.$store.commit("authComInfo", companyInfo);
        this.$store.commit("indexInfo", companyInfo);
        localStorage.setItem("authComInfo", JSON.stringify(companyInfo));
      } else {
        //如果没有认证的企业，则查询是否有加入协同
        let res = await this.$commonFn.isJoinCooperation(
          this.$api.getUserAuth,
          userInfo.token,
          userInfo.user_id
        );

        if (res) {
          let tem = {
            enterprise: res.user.company_name,
            enterpriseid: res.user.company_id
          };

          companyInfo = Object.assign(res.companyInfo, tem);
          //储存两个store是为了区别之后的逻辑，indexInfo在使用的过程中储存当用的公司信息，比较用户搜索后的企业信息
          this.$store.commit("authComInfo", companyInfo);
          this.$store.commit("indexInfo", companyInfo);
          localStorage.setItem("authComInfo", JSON.stringify(companyInfo));
        } else {
          this.$store.commit("authComInfo", false);
          this.$store.commit("indexInfo", companyInfo);
        }
      }
    }
    // close() {
    //   let wrapper = this.$refs.wrapper;
    //   wrapper.style.transform = `translateY(100%)`;
    // }
  }
};
</script>
<style lang="stylus" scoped>
#yaoqing
  width 100%
  height 100%
  background-color #fff
  // display flex
  // flex-direction column 
  // align-items center
  // border 1px solid red
  box-sizing border-box
  font-size 0.28rem
  .mainbody
    position relative
    width 100%
    text-align center
    padding 0.2rem
    box-sizing border-box
    .title
      font-size 0.48rem
      padding 0.3rem 0
      letter-spacing 0.05rem
      text-align left
    .list
      display flex
      // align-items space-around
      // justify-content space-around
      // flex-wrap wrap
      .item
        display flex
        align-items center
        flex-direction column
        width 30%
        margin 0 0.1rem
        .avatar
          width 1.4rem
          height 1.4rem
          margin 0 auto
          border-radius 50%
          overflow hidden
          img 
            width 100%
            height 100%
        .name 
          width 100%    
          font-weight 600
          margin 0.15rem 0
          white-space nowrap 
          text-overflow ellipsis 
          overflow hidden
        .del,.tp
          display inline-block
          width 1.4rem
          // height 0.4rem
          // line-height 0.4rem
          padding 0.05rem 0
          border-radius 0.3rem
          color #fff
          font-size 0.24rem
          &.del
            background-color  #d81d1f
          &.tp
            background-color  #09a2a3   
    .btn
      width 90%
      height 1rem
      background-color #09a2a3
      border-radius 0.6rem
      margin 1.5rem auto
      color #fff
      font-size 0.32rem
      letter-spacing 0.1rem
      &.disabled
        background-color gray
      

</style>
