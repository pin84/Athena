<template>
    <div id="search_company">
        <search-box-item id="search_page_style"/>
        
        <div v-show="infoList.length!==0" class="company_content">

            <div class="m-content">
                <com-head :showHeadShare="true" :shareFunc="headShareFunc"/>
                <com-content-layout
                :get-info-list="infoList"
                get-info-title="工商信息"
                my-index=""
                />
            </div>

            <div class="user_info_block">
                <div class="user_info_des">
                    联系人
                </div>
                <div class="user_info_list">
                    <template v-for=" (user,userIndex) in userinfo" >
                    <div v-show="user.headimgUrl!==0" :key="user.id" @click="getUserInfo(userIndex)" class="user_info_item">
                        <img :src="user.headimgUrl" class="user_item_img" >
                        <div class="user_item_name">
                            {{user.username}}
                        </div>
                    </div>

                    <div v-show="userinfo[0].headimgUrl == 0" :key="user.id" class="user_unverified" >
                        <div class="unverified">
                            <div class="usericon">
                                <i class="iconfont">&#xe65d;</i>
                            </div>
                            <span class="user_state_des">未认证无联系人</span>
                        </div>

                        <div @click="toAuto" class="auto_btn">
                            去认证
                        </div>
                    </div>

                    </template>
                    
                </div>
            </div>
        </div>
        <ul v-show="infoList.length!==0" class="link_group">
            <template v-for="(linkBtn,index) in linkBtnList">
                <li @click="linkTo(linkBtn.linkTo)" v-if=" linkBtnList.length-1 !== index " :key="linkBtn.text" class="link_item">{{linkBtn.text}}</li>
                <li @click="linkTo(linkBtn.linkTo)" v-if=" linkBtnList.length-1 == index " :key="linkBtn.text" class="link_item link_item_last">{{linkBtn.text}}</li>
            </template>
        </ul>
        <label-show 
        :labelShow="labelShow"
        :companyInfo="chooseCompany"/>
        <!-- <label-show/> -->
        <base-info/>
    </div>
</template>

<script>
import SearchBoxItem from "@/components/shangLian/SearchBoxItem"; // 搜索框
import BaseInfo from "@/components/shangLian/dimenPop/BaseInfo"; // 
import LabelShow from '@/components/pop/shanglian/LabelShow';

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
    name:'searchCompanyPage',
    mixins:[BaseInfo],
    components:{
        SearchBoxItem, 
        ComHead,
        ComContentLayout,
        LabelShow,
        BaseInfo,

    },

    data(){
        return{
            linkBtnList:[
                {
                    text:'每天海报',
                    linkTo:'poster'
                },
                {
                    text:'短信触客',
                    linkTo:'/chuke-msg'
                },
                {
                    text:'营销漏斗',
                    linkTo:false
                },
                {
                    text:'分发触客',
                    linkTo:false
                },
                {
                    text:'企 业自画像',
                    linkTo:'myDraw'
                },
            ],
            infoList:[], // from BaseInfo-> this.getCompanyInfo
            labelShow:{
                isShow:false
            },
            chooseCompany: {
                companyName: "",
                companyTags: [],
                enterprisesid: "",
                industryid: 0
            },
            userinfo:[],
        }
    },

    created(){
    },
    activated(){
        this.bus.$on('changeCompany',this.getCompanyInfo)
    },
    deactivated(){
        this.bus.$off('changeCompany')
    },
    methods:{
        toAuto(){
            // this.userinfo[index]
            let isAuto = this.$store.state.company.authComInfo
            if(!isAuto){
                
                this.$router.push({
                    path: "/autConfig"
                });
                
            }else{
                this.$toast({
                    message:"您已有认证企业"
                })
            }
        },
        getUserInfo(index){
            // this.userinfo[index]
            let isAuto = this.$store.state.company.authComInfo
            if(!isAuto){
                
                this.$messageBox
                .confirm("获取联系人信息需要您实名认证您的企业才能使用。")
                .then(action => {
                this.$router.push({
                    path: "/autConfig"
                });
                });
      
            }else{
                this.$toast({
                    message:"该功能正在维护，即将到来，敬请请期待。"
                })
            }
        },
        headShareFunc(){
            console.log('we are share pop');
            let {detailInfo,indexInfo} = this.$store.state.company;
            
            let userName = this.$store.state.loginInfo.userInfo.username,
                companyName = detailInfo['企业名称'],
                str = `${userName}分享${companyName}基本信息`;
            // let str = ``;
            console.log(userName,indexInfo);
            console.log(str);
            let {enterpriseid,industryid} = indexInfo;
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
                enterprise:companyName,
                industryid,
            })
            let link = `http://${window.location.host}/js/#/?${qs}`;
            this.$store.commit("setShareInfo",{
                link,
                title: str
            });
            this.$store.commit("setFriendNetInfo",{
                link,
                title: str
            });
            
            
        },

        async getCompanyInfo(companyId,companyName,industryId,hadCompanyInfo){
            let companyInfo = hadCompanyInfo;
            // let companyInfo = await this.searchNewCompanyInfo(companyId,companyName,industryId);
            this.$store.commit('indexInfo',companyInfo)
            let baseInfo = await this.getInfo(companyId,companyName,industryId) // from mixins BaseInfo
            this.userinfo = baseInfo.data.userinfo;
            
        },

        async searchNewCompanyInfo(enterpriseid,enterprise,industriesId){
            let companyOtherInfo = await this.$axios.get(this.$api.searchCompany,{
                params:{
                enterpriseid:enterprise,
                industryid:+industriesId
                }
            }).then(res=>res.data).catch(rej=>rej)
            console.log(companyOtherInfo);
            let {code,count,identity_status,kind,kind_count,number} = companyOtherInfo;
            
            let authComInfo =  this.$store.state.company.authComInfo;

            if(authComInfo){
                let {
                    enterprise:authCompany,
                    enterpriseid:authId,
                } = authComInfo;

                if(authCompany == enterprise && authId==enterpriseid){
                    identity_status = true
                }

            }

            let companyInfo = {
                code,
                count, //访问数
                enterprise: enterprise,
                enterpriseid: enterpriseid,
                industryid: industriesId,
                number, //推荐数
                kind,
                kind_count,
                identity_status,
            }

            return companyInfo;

        },

        linkTo(linkPath){
            let {
                enterprise:companyName,
                kind,
                enterpriseid:enterprisesid,
                industryid,
            } = this.$store.state.company.indexInfo;

            switch(linkPath){
                case 'poster':
        
                    let chooseCompany = {
                        companyName,
                        companyTags:kind,
                        enterprisesid,
                        industryid,
                    }
                    
                    this.$router.push({
                        name:linkPath,
                        params:chooseCompany
                    })
                
                break;

                case '/chuke-msg':
                    this.$router.push({
                        path:linkPath
                    })
                break;

                case false:
                    this.$toast("此功能暂未开放，敬请期待");
                break;

                case 'myDraw':
                    this.chooseCompany = {
                        companyName,
                        companyTags: kind,
                        enterprisesid: enterprisesid,
                        industryid: industryid
                    }
                    
                    this.labelShow.isShow =true;
                    // this.bus.$emit('labelShowCall', enterprisesid,companyName,industryid );
                break;

            }
        },

    },
    destroyed(){

        this.bus.$off('changeCompany')
    },

}
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
    .m-content{
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
            .unverified{
                

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
