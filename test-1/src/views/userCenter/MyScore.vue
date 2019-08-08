<template>
    <div id="my-score">
        <div class="des_block">
            #上下链#邀请码天使 后台看板
        </div>

        <div class="user_info_block">
            <div class="user_avatar">
                <img class="avatar" :src="userInfo.headimgUrl" alt="">
            </div>

            <div class="user_info_detail">
                <div class="detail_name">{{userInfo.username}}</div>
                <div class="detail_company">
                    已邀请认证企业：<span class="com-bold">{{totalData.invitation_count}}家</span>
                </div>
                <div class="detail_account">
                    <span class="account_state">
                        未结算: <span class="com-bold">￥{{totalData.no_settlement}}</span>
                    </span>
                    <span class="account_state">
                        已结算: <span class="com-bold">￥{{totalData.settlement}}</span>
                    </span>
                </div>
                
            </div>

        </div>

        <div class="record-detail">

            <template v-for="(monthItem,index) in monthList">
            <div class="detail-month" :key="index">
                <div class="detail-head">
                    <div class="month_count">
                        <div class="month">
                            <span class="month_bold">{{monthItem.month}}月份</span>（已认证:{{monthItem.certification_count}}家企业）
                        </div>

                        <div class="count">
                            <span class="count-item">未结算:￥{{monthItem.no_settlement}}</span>
                            <span class="count-item">已结算:￥{{monthItem.settlement}}</span>
                        </div>
                    </div>

                    <div @click="showDetail(monthItem)" :class="monthItem.isHidDetail?'':'icon_show'" class="iconfont flex_icon">&#xe606;</div>
                </div>

                <template v-if="monthItem.isGetDetail" >
                <div v-show="!monthItem.isHidDetail" v-for="(detailItem,index) in monthItem.detailList" :key="index" class="detail-item" >
                    <div class="item-userinfo_state">
                        <div class="item-userinfo">
                            <div class="item-avatar">
                                <img class="avatar" :src="detailItem.headimgUrl" alt="">
                            </div>
                            <div class="item-username">
                                {{detailItem.username}}
                            </div>
                            <div class="item-user_state">
                                <img class="img-user_state" :src="detailItem.certification_status == 1 ? isAutoImg : noAutoImg " alt="">
                            </div>
                        </div>

                        <div v-if="detailItem.refund_status==1" class="item-count">
                            +100元 <span class="count_text">已结算</span>
                        </div>
                        <div v-if="detailItem.refund_status==0 && detailItem.certification_status == 1 " class="item-count">
                            +100元 <span class="count_text">未结算</span>
                        </div>
                        
                        
                    </div>
                    <div class="item-info_detail">
                        邀请时间: {{detailItem.invitation_time}}
                    </div>
                    <template v-if="detailItem.certification_status == 1">
                        <div class="item-info_detail">
                            认证企业: {{detailItem.company_name}}
                        </div>
                        <div class="item-info_detail">
                            认证时间: {{detailItem.certification_time}}
                        </div>
                    </template>
                </div>
                </template>
            </div>
            </template>
        </div>
        

    </div>
</template>

<script>

export default {
    name:'MyScore',

    data(){
        
        return{
            userInfo:this.$store.state.loginInfo.userInfo,
            isAutoImg:require('../../assets/icon/isAuto.png'),
            noAutoImg:require('../../assets/icon/notAuto.png'),
            totalData:{
                invitation_count:0, //已邀请认证企业
                no_settlement:0, //未结算
                settlement:0, //已结算
            },
            monthList:[],
            
        }

    },

    created(){
        
        this.getInvitationInfo();

    },

    methods: {

        async showDetail(monthItem){
            (monthItem.detailList.length !== 0) ? (monthItem.isGetDetail=true) : (monthItem.isGetDetail=false) ;
            
            if(monthItem.isGetDetail){
                monthItem.isHidDetail = !monthItem.isHidDetail;
                return;
            }else{
                if(await this.getInvitationMonthInfo(monthItem) !== null){
                  monthItem.isGetDetail = true ;
                  monthItem.isHidDetail = !monthItem.isHidDetail;
                }
            }

        },

        async getInvitationMonthInfo(monthItem){
            
            try{
                let monthDetail = await this.$axios.get(this.$api.invitationMonthInfo,{
                    params:{
                        token:this.userInfo.token,
                        month:monthItem.month,
                    }
                }).then(res=>res.data);
                console.log(monthDetail.data);
                monthItem.detailList = monthDetail.data;
                monthItem.detailList.forEach(ele=>{
                    ele.invitation_time !== undefined ? ele.invitation_time = this.$commonFn.StrDateFormat(ele.invitation_time,1) : null;
                    ele.certification_time !== undefined ? ele.certification_time = this.$commonFn.StrDateFormat(ele.certification_time,1) :null;
                })

            }catch(err){
                this.$toast({
                    message:err
                })
                return null;

            }
            
        },

        async getInvitationInfo(){

            let invitationInfo = this.$axios.get(this.$api.invitationInfo,{
                params:{
                    token:this.userInfo.token,
                }
            })
            .then(res=>res.data)

            let {
                invitation_count,
                month_count,
                no_settlement,
                settlement,
                message,
            } = await invitationInfo;

            if(message !== undefined){ return }

            this.totalData.invitation_count = invitation_count;
            this.totalData.no_settlement = no_settlement;
            this.totalData.settlement = settlement;
            
            this.monthList = this.monthCountTrans(month_count);
            console.log(await invitationInfo)
            
        },

        monthCountTrans(newMonthList){
            
            let newMonthListData = newMonthList;
            newMonthListData.forEach(ele => {
                ele.isGetDetail = false;
                ele.isHidDetail = true;
                ele.detailList = [];
            });
            
            newMonthListData.reverse();
            console.warn(newMonthListData);
            return newMonthListData;
        },

    },


}
</script>

<style lang="scss">
@mixin clear_fix{
    content:'';
    display: block;
    clear: both;
    
}
.com-bold{
    font-weight: bold;

}
#my-score{
    $themeColor:#49a0a2;
    
    .des_block{
        width: 100%;
        height: 1.2rem;
        
        font-size: 0.4rem;
        font-weight: bold;
        line-height: 1.2rem;
        text-align: center;
        color:white;
        background: $themeColor;

    }

    .user_info_block{
        width: 100%;
        height: 1.8rem;
        line-height: 1rem;
        background: white;

        .user_avatar{
            display: inline-block;
            height: 70%;
            vertical-align: middle;
            margin:0 0.2rem 0 0.4rem;

        }
            .avatar{
                display: inline-block;
                height: 100%;
                width: auto;
                border-radius: 50%;

            }

        .user_info_detail{
            display: inline-block;
            vertical-align: middle;
            margin:auto;
            line-height: 0.52rem;

        }

            .detail_name{
                font-weight: bold;
                font-size: 0.4rem;

            }

        &::after{
            content:'';
            display:inline-block;
            height: 100%;
            width: 0;
            vertical-align:middle;
        }
    }

    .record-detail{
        position: absolute;
        top: 3rem;
        bottom:0.98rem;
        left: 0;
        width: 100%;

        overflow: scroll;
        background: #f3f3f3;

        .detail-month{
            width: 100%;
            margin: 0.2rem auto 0.2rem;
            box-sizing: border-box;
            padding: 0 0.2rem;
            
        }
        .detail-head{
            position: relative;
            z-index: 1; 
            vertical-align: middle;
            background: white;
            padding: 0.4rem 0.2rem;
            box-sizing: border-box;
            box-shadow: 0px 6px 10px 0px #dadada;
            border-radius: 10px;

        }

            .month{
                color: #666;
            }
            .month_bold{
                font-size: 0.4rem;
                font-weight: bold;
                color:black;
            }

            @mixin month_item{
                display: inline-block;
                vertical-align: middle;
                
            }
            .month_count{
                
                @include month_item;

            }

            .count{
                text-align: justify;
                color:#666;
            }
                .count-item{
                    margin-right: 10px;
                }

            .flex_icon{
                
                @include month_item;

                position: absolute;
                right: 0.2rem;
                top: 50%;
                transform: translateY(-50%);

                $diameter:0.4rem;
                width: $diameter;
                height:$diameter;
                font-size: $diameter/2;

                text-align: center;
                line-height: 0.45rem;
                color:$themeColor;
                border: 2px solid $themeColor;
                border-radius: 50%;

            }

            .icon_show{
                transform: translateY(-50%) rotate(-180deg);
            }

        .detail-item{
            position: relative;
            padding: 0.2rem;
            background: white;
            font-size: 0.3rem;

            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                border-top: 1px solid #f3f3f3;
                height: 0;
                left: 0.2rem;
                right: 0.2rem;
            }

        }
            .item-userinfo_state{
                height: 0.8rem;
                line-height: 0.8rem;
                margin-bottom: 10px;
                vertical-align: middle;
                font-size: 0;

            }
            @mixin item{
                display: inline-block;
                vertical-align: middle;
                height: 100%;

            }

            .item-userinfo{
                @include item;
            }
            
            .item-avatar{
                @include item;
                font-size: 0;
                margin-right: 10px;

            }
                .avatar{
                    @include item;
                    width: auto;
                    border-radius: 50%;

                }
            .item-username{
                @include item;
                margin-right:0.1rem;
                font-size: 0.3rem;
            }
            .item-user_state{
                @include item;

            }
                .img-user_state{
                    height: 50%;
                    width: auto;
                    vertical-align: middle;

                }
            .item-count{
                @include item;
                float: right;
                font-size: 0.3rem;

            }
                .count_text{
                    color:$themeColor;

                }

            .item-info_detail{
                color: #999;

            }

    }

}

</style>
