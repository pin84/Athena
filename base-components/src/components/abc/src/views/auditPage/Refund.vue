<template>
    <div id="g-refund">
        <mt-navbar v-model="selected" class="mt-navbar-reset">
            <mt-tab-item id="0">待审核</mt-tab-item>
            <mt-tab-item id="1">审核成功</mt-tab-item>
            <!-- <mt-tab-item id="3">审核失败</mt-tab-item> -->
        </mt-navbar>
        
        <div class="g-refund_list">
            <div v-show="refundItem.refund_status == +selected" v-for=" (refundItem,index) in refundList" :key="index"  class="m-refund_item" >
                <div class="u-item_line">
                    <div class="l-line_des">
                        订单号
                    </div>
                    <div class="l-line_result">
                        {{refundItem.main_order_id}}
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        发送时间
                    </div>
                    <div class="l-line_result">
                        {{$commonFn.formatTime(new Date(refundItem.create_time),2)}}
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        企业名称
                    </div>
                    <div class="l-line_result">
                        {{refundItem.company_name}}
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        操作人
                    </div>
                    <div class="l-line_result">
                        {{refundItem.name}}
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        成功状态
                    </div>
                    <div class="l-line_result">
                        成功
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        发送数量
                    </div>
                    <div class="l-line_result_group">
                        <div class="l-line_result">
                            {{refundItem.sms_count.total_count}}条
                        </div>
                        <div class="l-line_result">
                            <span class="result_text">成功:</span><span class="result_success">{{refundItem.successful_count}}</span>
                        </div>
                        <div class="l-line_result">
                            <span class="result_text">未知:</span><span class="result_unknow">{{refundItem.unknown}}</span>
                        </div>
                        <div class="l-line_result">
                            <span class="result_text">失败:</span><span class="result_fail">{{refundItem.failure_count}}</span>
                        </div>
                    </div>

                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        消费金额
                    </div>
                    <div class="l-line_result result_money">
                        ￥{{refundItem.all_money.total_amount}}
                    </div>
                </div>
                <div class="u-item_line">
                    <div class="l-line_des">
                        退款金额
                    </div>
                    <div class="l-line_result result_money">
                        ￥{{refundItem.refund}}
                    </div>
                </div>
                <div v-show="selected == 0" class="u-item_line-reverse">
                    <div @click="refundBtnFunc(refundItem)" class="refund_btn">
                        确认退款
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
   
    created(){
        this.getRefundListData();
        
    },

    data(){
        return{
            selected:'0',
            refundList:[]
        }
    },

    watch:{
        selected(selNewVal){
            console.log(selNewVal);
            
        }
    },

    methods:{
        // 获取退款列表
        async getRefundListData(){
            let refundInfo = await this.$axios.get(this.$api.refundInfo)
                                              .then(res=>res.data)
            this.refundList = refundInfo.data;
            this.$commonFn.selfSort(this.refundList,'create_time',(val)=>new Date(val).getTime())
            
        },

        // 退款方法
        async refundBtnFunc(refundItem){

            console.log(refundItem)
            let {company_name,main_order_id} = refundItem;
            let token = this.$store.state.loginInfo.userInfo.token;

            let refundAuditMsg = await this.$axios.post(this.$api.refundAudit,{
                company_name,
                main_order_id,
                token,
            }).then(res=>res.data)

            if(refundAuditMsg.message == '退款成功'){
                this.getRefundListData();
            }else if( refundAuditMsg.message == '该订单已经退款'){
                this.$toast({
                    message:'该订单已经退款'
                })
            }
            else{
                this.$toast({
                    message:'退款失败 请稍后重试检查网络'
                })
            }

        },

    }

}
</script>

<style lang="scss">
$grayColor:#8b8b8b;
$redColor:#f10203;
$themeGreen:#09a2a3;
// mint-ui style reset

#g-refund{
    padding: 1rem 0 1rem;
    .m-refund_item{
        background: white;
        box-shadow: 0px 0px 6px #f0f0f0;
        border-radius: 6px;
        
        margin: 0.2rem;
        padding: 0.3rem;
        font-size: 0.3rem;

        @mixin item_line{
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            margin:0 0 0.4rem;
        }
        .u-item_line{
            @include item_line;

            position:relative;
            &::after{
                content:'';
                width:80%;
                position: absolute;
                border-bottom:1px solid #f3f3f3;
                height: 0px;
                bottom: -0.2rem;
                right:0;
            }

        }
        .u-item_line-reverse{
            @include item_line;
            flex-direction: row-reverse;

        }
        .l-line_des{
            width: 1.6rem;
            color:$grayColor;

        }
        .l-line_result_group{
            display: flex;
            justify-content: space-around;
            width: 100%;


        }
        .l-line_result{

        }
        .result_text{
            color:$grayColor;

        }
        .result_success{
            color:$themeGreen;

        }
        .result_unknow{
            color: $redColor;

        }
        .result_fail{
            color:$grayColor;

        }
        .result_money{
            color:$redColor;
            font-size: 0.34rem;
        }

        .refund_btn{
            width:1.8rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border-radius: 0.3rem;
            border: 1px solid $themeGreen;

            color:$themeGreen;
            text-align: center;

            align-self:flex-end;
        }
    }
}

</style>
