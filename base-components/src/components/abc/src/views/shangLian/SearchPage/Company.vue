<template>
  <div id="search_company">
    <search-box-item
      id="search_page_style"
      @nameConfirm="nameConfirm"
      @changeCompany="getCompanyInfo"
    />

    <div v-show="infoList.length!==0" class="company_content">
      <div class="m-baseinfo_content">
        <com-head :showHeadShare="true" :shareFunc="headShareFunc" :detailInfo="detailInfo" />
        <com-content-layout :get-info-list="infoList" get-info-title="工商信息" my-index />
      </div>

      <div class="user_info_block">
        <div class="user_info_des">联系人</div>
        <div class="user_info_list">
          <template v-for=" (user,userIndex) in userinfo">
            <div
              v-show="user.headimgUrl!==0"
              :key="user.id"
              @click="getUserInfo(userIndex)"
              class="user_info_item"
            >
              <img :src="user.headimgUrl" class="user_item_img" />
              <div class="user_item_name">{{user.username}}</div>
            </div>

            <div v-show="userinfo[0].headimgUrl == 0" :key="user.id" class="user_unverified">
              <div class="unverified">
                <div class="usericon">
                  <i class="iconfont">&#xe65d;</i>
                </div>
                <span class="user_state_des">未认证无联系人</span>
              </div>

              <div @click="toAuto" class="auto_btn">去认证</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <ul v-show="infoList.length!==0" class="link_group">
      <template v-for="(linkBtn,index) in linkBtnList">
        <li
          @click="linkTo(linkBtn.linkTo)"
          v-if=" linkBtnList.length-1 !== index "
          :key="linkBtn.text"
          class="link_item"
        >{{linkBtn.text}}</li>
      </template>
      <li
        @click="linkTo(linkBtnList[linkBtnList.length-1].linkTo)"
        :key="linkBtnList[linkBtnList.length-1].text"
        class="link_item link_item_last"
      >{{linkBtnList[linkBtnList.length-1].text}}</li>
    </ul>
    <!-- <div style="position:fixed; left:0;top:0;color:white;" @click="$router.push('/test')">
      跳测试
    </div>-->
    <label-show :labelShow="labelShow" :companyInfo="chooseCompany" />
    <!-- <label-show/> -->
    <base-info />
  </div>
</template>

<script>
import SearchBoxItem from "@/components/shangLian/SearchBoxItem"; // 搜索框
import BaseInfo from "@/components/shangLian/dimenPop/BaseInfo"; //
import LabelShow from "@/components/pop/shanglian/LabelShow";
import Utils from "../../../utils";

const ComHead = resolve => {
  import("@/components/common/ComHead").then(module => {
    resolve(module);
  });
};

const ComContentLayout = resolve => {
  import("@/components/common/ComContentLayout").then(module => {
    resolve(module);
  });
};

export default {
  name: "searchCompanyPage",
  mixins: [BaseInfo],
  components: {
    SearchBoxItem,
    ComHead,
    ComContentLayout,
    LabelShow,
    BaseInfo
  },

  data() {
    return {
      linkBtnList: [
        {
          text: "图文动态",
          linkTo: "/special"
        },
        {
          text: "节日海报",
          linkTo: "spposter"
        },
        {
          text: "每天海报",
          linkTo: "poster"
        },
        {
          text: "短信触客",
          linkTo: "/chuke-msg"
        },
        {
          text: "营销漏斗",
          linkTo: false
        },
        {
          text: "企 业自画像",
          linkTo: "myDraw"
        }
      ],
      infoList: [], // from BaseInfo-> this.getCompanyInfo
      labelShow: {
        isShow: false
      },
      chooseCompany: {
        companyName: "",
        companyTags: [],
        enterprisesid: "",
        industryid: 0
      },
      userinfo: [],
      detailInfo: {} // from BaseInfo [mixins]
    };
  },

  async created() {
    //第一次到访提示
    this.isFirstVisit(2);
    this.posterActivity();
  },

  activated() {
    let { enterpriseid, enterprise, industryid } = this.$route.params;
    let { enterpriseid:qeId, enterprise:qeName, companyName:qcName, industryid:indId } = this.$route.query;
    
    if (enterpriseid && enterprise && industryid) {
      this.getCompanyInfo(
        enterpriseid,
        enterprise,
        industryid,
        this.$route.params
      );
    }
    let name = qeName || qcName
    if(qeId &&  name && indId){
      this.getCompanyInfo(
        qeId,
        name,
        indId,
      );
    }

    // this.bus.$on("changeCompany", this.getCompanyInfo);
  },
  // deactivated() {
  //   // this.bus.$off("changeCompany");
  // },
  methods: {
    // 海报邀请
    async posterActivity() {
      let isTake = localStorage.getItem("posterActivity");
      if (isTake == "true") {
        return;
      }
      let {
        linkPop,
        authCompany: companyName,
        authCompanyId: enterpriseid,
        share_user
      } = this.$route.query;
      // localStorage.getItem()
      // localStorage.setItem()
      const qs = [linkPop, companyName, enterpriseid, share_user];

      if (qs.indexOf(undefined) !== -1) {
        return;
      }
      if (linkPop !== "poster") {
        return;
      }

      let userId = this.$store.state.loginInfo.userInfo.user_id;
      userId = +userId;
      share_user = +share_user;
      if (share_user == userId) {
        return;
      }
      let posterReturn = await this.$axios
        .post(this.$api.posterActivity, {
          company_id: enterpriseid,
          company_name: companyName,
          new_user: userId,
          share_user: share_user,
          type: "海报"
        })
        .then(res => {
          localStorage.setItem("posterActivity", "true");
        });
    },

    nameConfirm(existItem) {
      if (existItem) {
        let { company_id, company_name, industriesid } = existItem;
        this.getCompanyInfo(company_id, company_name, industriesid);
        // this.changeCompany(company_id, company_name, industriesid);
      }
    },
    // 点击不同公司后 改变公司
    /*
    async changeCompany(companyId, companyName, industriesId) {
      this.index_search = companyName;
      // this.companyInfo = companyInfo;
      let companyInfo = await this.searchNewCompanyInfo(
        companyId,
        companyName,
        industriesId
      );
      this.$store.commit("indexInfo", companyInfo);
      this.$store.commit('searchCompany',{
        params:[
          companyId,
          companyName,
          industriesId,
          companyInfo,
        ],
      })
      this.$store.state.company.searchCompany

      this.bus.$emit(
        "changeCompany",
        companyId,
        companyName,
        industriesId,
        companyInfo
      );
      this.$store.state.company.indexInfo
      // this.$emit("inputText", { searchText: companyName, resultState: true });
      this.isShowResult = false;

      // this.index_search = name;
    },
    */

    toAuto() {
      // this.userinfo[index]
      let isAuto = this.$store.state.company.authComInfo;
      if (!isAuto) {
        this.$router.push({
          path: "/autConfig"
        });
      } else {
        this.$toast({
          message: "您已有认证企业"
        });
      }
    },
    getUserInfo(index) {
      // this.userinfo[index]
      let isAuto = this.$store.state.company.authComInfo;
      if (!isAuto) {
        this.$messageBox
          .confirm("获取联系人信息需要您实名认证您的企业才能使用。")
          .then(action => {
            this.$router.push({
              path: "/autConfig"
            });
          });
      } else {
        this.$toast({
          message: "该功能正在维护，即将到来，敬请请期待。"
        });
      }
    },
    headShareFunc() {
      let { detailInfo, indexInfo } = this.$store.state.company;
      let userName = this.$store.state.loginInfo.userInfo.username,
        companyName = detailInfo["企业名称"],
        str = `${userName}分享${companyName}基本信息`;

      let { enterpriseid, industryid } = indexInfo;
      // this.$router.push({
      //     path:this.$route.path,
      //     query:{
      //     enterpriseid,
      //     enterprise:companyName,
      //     industryid,
      //     }
      // })
      let qs = this.$qs.stringify({
        enterpriseid,
        enterprise: companyName,
        industryid
      });
      let link = `http://${window.location.host}/js/#/?${qs}`;
      this.$store.commit("setShareInfo", {
        link,
        title: str
      });
      this.$store.commit("setFriendNetInfo", {
        link,
        title: str
      });
    },

    // 根据参数信息 改变页面的企业信息及更新图谱企业信息
    async getCompanyInfo(companyId, companyName, industryId, hadCompanyInfo) {
      let companyInfo = hadCompanyInfo;
      companyInfo = await this.searchNewCompanyInfo(
        companyId,
        companyName,
        industryId
      );

      this.$store.commit("indexInfo", companyInfo);

      this.$store.commit("searchCompany", {
        params: [companyId, companyName, industryId, companyInfo]
      });

      let baseInfo = await this.getInfo(companyId, companyName, industryId); // from mixins BaseInfo

      this.userinfo = baseInfo.data.userinfo;

      //第一次到访提示
      this.isFirstVisit(3, "企业搜索显示详情");
    },

    //第一次到访提示 s
    async isFirstVisit(i, name = this.$route.meta.remark) {
      let flag = await Utils.isFirstVisit(this.$api.isShowTips, name);

      if (flag) {
        this.$router.push({
          path: "../tipmain",
          query: { num: [i], originUrl: this.$route.fullPath } //1是第1张图片
        });
      }
      //第一次到访提示 e
    },

    async searchNewCompanyInfo(enterpriseid, enterprise, industriesId) {
      
      let companyOtherInfo = await this.$axios
        .get(this.$api.searchCompany, {
          params: {
            enterpriseid: enterprise,
            industryid: +industriesId
          }
        })
        .then(res => res.data)
        .catch(rej => rej);
      
      let authComInfo = this.$store.state.company.authComInfo;

      // if (authComInfo) {
      //   let { enterprise: authCompany, enterpriseid: authId } = authComInfo;

      // if (authCompany == enterprise && authId == enterpriseid) {
      //   identity_status = true;
      // }
      // }

      let companyInfo = {
        ...companyOtherInfo,
        enterprise: enterprise,
        enterpriseid: enterpriseid,
        industryid: industriesId
      };

      return companyInfo;
    },

    linkTo(linkPath) {
      let {
        enterprise: companyName,
        kind,
        enterpriseid: enterprisesid,
        industryid
      } = this.$store.state.company.indexInfo;
      switch (linkPath) {
        case "poster":
        case "spposter":
          let chooseCompany = {
            companyName,
            companyTags: kind,
            enterprisesid,
            industryid
          };

          this.$router.push({
            name: linkPath,
            params: chooseCompany
          });

          break;

        case "/chuke-msg":
          this.$router.push({
            path: linkPath
          });
          break;
        case "/special":
          localStorage.setItem("specialAdmin", false);
          this.$router.push({
            path: linkPath,
            query: { ctype: 2 }
          });
          break;

        case false:
          this.$toast("此功能暂未开放，敬请期待");
          break;

        case "myDraw":
          
          this.chooseCompany = {
            companyName,
            companyTags: kind,
            enterprisesid: enterprisesid,
            industryid: industryid
          };

          this.labelShow.isShow = true;
          // this.bus.$emit('labelShowCall', enterprisesid,companyName,industryid );
          break;
      }
    }
  }
  // destroyed() {
  //   this.bus.$off("changeCompany");
  // }
};
</script>

<style lang="scss">

#search_company{
    position: relative;
    
    #search_page_style{
        position: absolute;

    }

    .company_content{
        position: absolute;
        left:1%;
        top: 1.04rem;
        bottom: 10px;
        width:98%;
        padding:2% 0;
        box-sizing: border-box;

        text-align: center;
        overflow: hidden;
        border-radius: 6px;
        background:white;
        
    }
    .m-baseinfo_content{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 1rem;
        width: 100%;
        padding: 10px 0;
        overflow: scroll;

    }
    // 用户信息块
    $userInfoBlockH:1rem;
    .user_info_block{

        display: flex;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: $userInfoBlockH;
        
        background: #f3f3f3;

    }
        .user_info_des{
            position: relative;
            width: 24%;
            height: 100%;
            margin-right: 0.14rem;
            background: #08a2a3;
            
            color:white;
            text-align: center;
            line-height: $userInfoBlockH;
            font-size: $userInfoBlockH /3;
            &::after{
                content:'';
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translate(0,-50%);
                
                $borderWidth:0.14rem;
                border-left: $borderWidth solid #08a2a3;
                border-top: $borderWidth solid #f3f3f3;
                border-bottom: $borderWidth solid #f3f3f3;
            }
        }
        
        @mixin userInfoBlock{
            display: flex;
            flex: 1;
            align-items: center;
            padding:0 0.1rem;
            box-sizing: border-box;
        }
        .user_info_list{
            @include userInfoBlock;
            justify-content:space-around;
         
        }
            .user_info_item{
                display: flex;
                flex-direction: column;
                padding: 1% 0;
                box-sizing: border-box;
                justify-content:space-around;
            }
            .user_item_img{
                height: 0.5rem;
                width: 0.5rem;
                border-radius: 50%;
                margin: auto;
            }
            .user_item_name{
                font-size: 0.24rem;
                width: auto;
            }

        .user_unverified{
            @include userInfoBlock;
            
            justify-content: space-between;
            height: 100%;

            background: #f3f3f3;
            
        }
            .usericon{
                display: inline-block;
                margin-right: 0.1rem;
                vertical-align: middle;
                background: #999999;
                border-radius: 50%;
                color: #c8c8c8;
                width: 0.5rem;
                height:0.5rem;
                line-height:0.6rem;
                overflow: hidden;
                
                .iconfont{

                    font-size: 0.4rem;
                }
            }
            .user_state_des{
                vertical-align: middle;
                font-size: 0.3rem;
                color:#666;

            }
            .auto_btn{
                $fontSz:0.3rem;
                height: $fontSz * 2;
                padding: 0 $fontSz;
                
                line-height: $fontSz * 2;
                border-radius: $fontSz;
                background: #ef964a;
                color: white;
                font-size: $fontSz;

            }

    .link_group{
        position: absolute;
        right:0.1rem;
        bottom:1rem;
        width: 1rem;
        
        color:white;
        background: transparent;


        .link_item{
            box-sizing: border-box;
            padding: 0.16rem;
            margin-bottom: 0.1rem;

            font-family:"微软雅黑";
            letter-spacing:0.046rem;
            line-height: 0.34rem;
            vertical-align: middle;
            text-align: center;
            font-size: 0.22rem;
            width:1rem;
            height:1rem;
            
            border-radius: 50%;
            background: #08a2a3;
            
            &.link_item_last{
                padding: 0.1rem;
                line-height: 0.36rem;
            }
        }
    }
}

</style>
