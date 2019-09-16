<template name="CustomerPool">
    <div id="customer-pool">

        <div class="g-header">
            <img class="header-img" :src="require('@/assets/icon/customerPoolHeader.png')" alt="">
        </div>

        <div class="g-setting_bar">
            <div><span class="setting_bar-left-b1">共推荐潜在客户: </span><span class="theme-color">{{count}}家企业</span></div>
            <!-- <div @click="dataScreen" class="iconfont">筛选&#xe64a;</div> -->
        </div>

        <div v-if="!isSetting" class="g-nosetting-tips">
            <div>您还未设置潜在客户池推荐</div>
            <span>点击右下角</span><span class="bold">“推荐设置”</span>
        </div>

        <div v-else class="g-customer_list">
            <div v-show="moreicon" class="moreicon">
                <span>数据加载中 </span>
                <mt-spinner type="triple-bounce" ></mt-spinner>
            </div>
            <div v-for="(dateItem,index) in dateList" :key="index" class="customer_list-item">
                
                <div class="item-title">
                    <div class="title-left-box">
                        <div class="left-deta">
                            {{dateItem.create_time}}
                        </div>
                        <div class="recommend">
                            推荐：{{dateItem.count}}家企业
                        </div>
                    </div>

                    <div @click="sendSms(dateItem)" class="title-right-btn">
                        发个短信触客
                    </div>
                </div>

                <div v-show="dateItem.isShow" class="item-content">
                <mt-loadmore :bottom-method="()=>loadBottom(dateItem)" :bottom-all-loaded="dateItem.isGetAllData" ref="loadmore">
                    <div v-for="(detailItem) in dateItem.dateDetailList" :key="detailItem.company_name" class="detailItem">
                        <div class="detailItem-left-box">
                            <div class="detailItem-company_name">
                                {{ detailItem.company_name }}
                            </div>
                            <div class="detailItem-kind signalLine">
                                主营：{{typeof detailItem.kind == 'string' ? detailItem.kind.replace(/\||\;|；|,/g,'、') :'未知'}}
                            </div>
                            <div class="detailItem-established_time">
                                成立日期：{{ $commonFn.formatTime(detailItem.established_time,4) }}
                            </div>
                            <div class="detailItem-registered_capital">
                                注册资金：{{ detailItem.registered_capital||'未知' }}
                            </div>
                        </div>

                        <div class="detailItem-phone">
                            {{ detailItem.phone }}
                        </div>
                    </div>
                </mt-loadmore>
                </div>

                <div :style="dateItem.isShow?'transform:rotate(180deg);':''" @click="dateItem.isShow = !dateItem.isShow , dateItem.dateDetailList.length ==0 ? getDetailData(dateItem):null" class="item-flex-btn">
                    <div class="iconfont date-flex-btn">&#xe606;</div>
                </div>

            </div>
            
        </div>
        
        <!-- <div id="customer-router-view">
            <router-view >
            </router-view>
        </div> -->

        <div @click="toSet" class="m-recommend_setting">
            <i class="iconfont setting_icon">&#xe62e;</i>
            <div class="setting_text">推荐设置</div>
        </div>
        <PushMsg/>
        <SelectMsgTem/>
        <AddMsgTem/>
        <follow-tip v-if="subscribe == 0" :openState="followPopState" @closeFollowTip="closeFollowTip"/>
        
    </div>
</template>

<script >
import { Loadmore,Spinner  } from 'mint-ui';
import PushMsg from '../../components/pop/pushMsgVideo/PushMsg';
import SelectMsgTem from '../../components/pop/pushTemplate/SelectTem';
import AddMsgTem from '../../components/pop/pushTemplate/MsgTemplate';
import FollowTip from '@/components/common/FollowTip.vue';

export default {
    name:'CustomerPool',
    components:{
        PushMsg,
        SelectMsgTem,
        AddMsgTem,
        [Loadmore.name]:Loadmore,
        FollowTip,
        [Spinner.name]:Spinner,

    },
    data() {
        return {
            
            userInfo:this.$store.state.loginInfo.userInfo,

            count:0,
            dateList:[],

            isSetting:true, //是否设置客户池推荐

            subscribe:1,
            followPopState:false,

            moreicon:false,
            saving:false,
        }
    },
    
    async created(){
        // this.getDetailData();
    },

    async activated(){

        let title = '#上下链#  企业潜在客户池工具';

        this.$store.commit('setShareInfo',{
            title
        })
        this.$store.commit('setFriendNetInfo',{
            title
        })
        
        let configRes = this.$axios.get(this.$api.customPoolGetSetting,{
                params:{token:this.userInfo.token}
        }).then(res=>res.data[0]);
        
        if(await configRes.length === 0){
            this.isSetting = false;
        }

        await this.getPoolData();
        if(this.$route.params.saveSettingState){
            this.moreicon = true;
            this.saving = true;
            let res = await this.$route.params.saveSettingState;
            if(res === true){
                await this.getPoolData();
                this.moreicon = false;
                this.saving = false;
                this.$toast('数据已更新');
            }
            
        }
        
    },

    methods:{

        toSet(){
            if(this.saving){ 
                this.$toast('数据正在更新，请稍候再更新设置');
                return
            }
            this.$router.push('/customerset');

        },

        closeFollowTip(){
            this.followPopState = false;
        },
        dataScreen(){
            // $toast('该功能即将开放 敬请期待');

            this.$router.push({
                name:'CustomerScreen',
                params:{
                    count:this.count,

                }
            })
            
        },
        async loadBottom(dateItem){
            
            await this.getDetailData(dateItem).then(()=>{
                this.$refs.loadmore[0].onBottomLoaded();

            })

        },

        async getPoolData(){
            
            await this.$axios.get(this.$api.customPoolIndex,{
                params:{
                    token:this.userInfo.token,
                }
            })
            .then(res=>{
                
                console.log(res);
                let {message, count, date} = res.data;
                
                if(message){
                    const showMessage = (message)=>{
                        this.$toast({
                            message
                        })
                    }
                    let messageTips = {
                        '你没有客户池信息':()=>{
                            showMessage('你没有客户池信息');
                            this.dateList = [];
                            this.$set(this,'dateList',this.dateList)
                            this.count = 0;
                        },

                    }
                
                    messageTips[message]();
                    return  
                }

                this.count = count;
                this.dateList = date.map(ele=>{
                    return {
                        ...ele,
                        datePage:1,
                        isGetAllData:false,
                        isShow:false,
                        dateDetailList:[],
                    }
                });
                this.$forceUpdate();
                
            })

        },

        async getDetailData(dateItem){
            if( dateItem.isGetAllData ){ return;}

            // dataTime = new Date(dataTime).getTime();
            let dataTime = dateItem.create_time;
            console.log(dateItem);
            let getDetailRes = await this.$axios.get(this.$api.customPoolSearchByTime,{
                    params:{
                        token:this.userInfo.token,
                        datetimes:dataTime,
                        page:dateItem.datePage
                    }
                }).then(res=>res.data)
            dateItem.datePage++;
            console.log( getDetailRes);
            let { end, date:detailDate } = getDetailRes;
            if( end === true ){
                dateItem.isGetAllData = true;
                return;
            }

            dateItem.dateDetailList.push(...detailDate);
        },

        async sendSms(dateItem){
            if(this.saving){
                this.$toast('数据正在更新，请稍后再发送短信');
                return
            }
            let { create_time, dateDetailList,count } = dateItem;
            dateItem.dateDetailList.length ==0 ? await this.getDetailData(dateItem):null
            // this.$toast({
            //     message:'该功能暂未开放,敬请期待'
            // })
            // return 
            this.$store.commit('showPop',{
                popName:"pushMsg",
                params:{
                    saveParams:true,
                    popModule:'customerPool',
                    date:create_time,
                    companyCount:count,
                    detail:dateDetailList,
                }
            })

        },
    }

}
</script>

<style lang="scss">
.moreicon{
    text-align: center;
    color:white;
}
.mint-spinner-triple-bounce{
    display: inline-block;
    vertical-align: middle;
}

.bold{
    font-weight: bold;

}

.theme-color{
    color: #15696c;

}
#customer-router-view{
    position: fixed;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    height: 60%;

}

#customer-pool{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.98rem;

    padding: 0 0.2rem;
    color:white;
    overflow: scroll;
    background: black;

    .g-header{
        height: 1.6rem;
        
        text-align: center;
        line-height: 1.6rem;
    }
        .header-img{
            vertical-align: middle;
            height: 0.5rem;
            width: auto;

        }

    .g-setting_bar{
        display: flex;
        height: 0.4rem;
        font-size: 0.3rem;
        width:100%;
        justify-content: space-between;
        
    }
        .setting_bar-left-b1{
            color:#ccc;

        }

    .g-nosetting-tips{

        margin-top: 1.5rem;
        text-align: center;
        font-size: 0.4rem;

    }

    .g-customer_list{
        position: absolute;
        top: 2.2rem;
        left:0;
        right: 0;
        bottom: 0rem;
        color: black;
        padding: 2%;
        box-sizing: border-box;
        overflow: scroll;
        // width: 98%;
        
    }
        .customer_list-item{
            margin: 10px 0;
            border-radius:  10px 10px 10px 10px;
            background:white;
        }

            .item-title{
                position: relative;
                z-index: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1.4rem;
                padding:0 2% 0 4%;
                box-sizing: border-box;
                box-shadow: 0px 4px 16px -6px #e3e3e3;
            
            }
                .left-deta{
                    font-weight: bold;
                    color: black;

                }
                .recommend{
                    // margin-top: 0.2rem;
                    color: #cdcdcd;

                }

                .title-right-btn{
                    padding: 0 0.2rem;
                    height: 0.7rem;
                    border-radius: 0.35rem;
                    line-height: 0.7rem;
                    color:white;
                    background: #0ba8a8;
                }
            .item-content{
                height: 5rem;
                overflow: scroll;
                padding: 0rem 0.39rem 0.26rem 0.26rem;
                box-sizing: border-box;

            }
                .detailItem{
                    width: 100%;
                    display: flex;
                    padding: 0.26rem 0;
                    border-bottom: 1px solid #f3f3f3;

                }
                .detailItem-left-box{
                    width: 80%;
                }
                .detailItem-company_name{
                    color:#666;
                    font-weight: bold;
                    font-size: 0.3rem;


                }
                @mixin detailItemDes{
                    color:#989898;
                    font-size: 0.28rem;
                    margin: 0.09rem 0;
                }
                .detailItem-kind{
                    @include detailItemDes;                    
                }
                .detailItem-established_time{
                    @include detailItemDes;
                }
                .detailItem-registered_capital{
                    @include detailItemDes;
                }

                .detailItem-phone{
                     color:#999;

                }

            .item-flex-btn{
                position: relative;
                display: flex;
                height:0.8rem;
                &::before{
                    content: '';
                    position: absolute;
                    border-top:1px solid #f3f3f3;
                    height: 0;
                    left: 50%;
                    top: 0;
                    width: 90%;
                    transform: translateX(-50%);

                }
            }
                .date-flex-btn{
                    $diameter:0.4rem;
                    $fs:0.2rem;
                    display: inline-block;
                    margin: auto;
                    width: $diameter;
                    height: $diameter;
                    font-size: $fs;
                    text-align: center;
                    line-height: $diameter + $fs / 2;
                    border-radius: 50%;
                    border: 2px solid #0ba8a8;
                    color: #0ba8a8;
                    
                }

    .m-recommend_setting{
        $settingColor:#74a9a8;
        $settingDiameter:1rem;
        
        position: fixed;
        z-index: 1;
        right: 0.2rem;
        bottom: 1.2rem;
        color:$settingColor;
        text-align: center;
        width: $settingDiameter;
        height: $settingDiameter;
        
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        font-size: 0.18rem;
        // padding: 0.1rem;
        box-sizing: border-box;
        border-radius: 50%;
        background: white;

        .setting_icon{
            $fs:0.4rem;
            font-size: $fs;
            line-height: $fs;
            margin-bottom:-0.24rem;
        }
        .setting_text{
            margin: 0;
        }
    }

}


</style>
