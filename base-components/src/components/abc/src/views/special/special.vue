<template>
    <div id="sp-certification">
        <div class="sp_header">
            <div class="sp_img">
                <img :src="specialImg" alt="">
            </div>
            <ul class="list">
                <li class="item" v-for="(item,index) in typeStr" :key="index">
                <span class="img-box">
                    <img :src="require(`@/assets/icon/shanglian/${index-2}.png`)" alt />
                </span>
                <div class="auth-type">{{typeStr[index]}}</div>
                </li>
            </ul>
            <div @click="isAuto" class="apply">
                <span class="keypoint">申请认证:</span><span class="cost">599元/年</span>
            </div>
        </div>

        <div class="search-bar">
            <div @click="accurateSearch" class="search-btn " >精准检索</div>
            <div class="search-condition">
                <span class="search-des" >专注服务: <span class="search-content">{{businessInputConfig.changeText}}</span> </span>
                <span class="search-des" >所属城市: <span class="search-content">{{searchCity}}</span></span>
            </div>
        </div>

        <ul 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="search-datalist">
            <CompanyListItem 
            v-for="dataItem in searchDateList" 
            :key="dataItem.enterprises"
            :getDataItem="dataItem"
            @click.native="toSearchCompany(dataItem)" 
            ></CompanyListItem>
            
            <!-- <li v-for="dataItem in searchDateList" :key="dataItem.enterprises" @click="toSearchCompany(dataItem)" 
            :class="{
                'item-no_auto':dataItem.code==0,
                'item-is_auto':dataItem.code!==0,
                'item-is_click':dataItem.isClick,
            }"
             class="search-dataitem">
                <div class="search-item_title">{{ dataItem.enterprises }}</div>
                <div class="search-des singleLine" >专注:<span class="data-keyword">{{dataItem.kind}}</span></div>
                <div class="search-des singleLine" >地址:<span class="data-keyword">{{dataItem.business_address}}</span></div>
                <div class="tb-singleline" >
                    <div class="search-des tb-cell" >成立日期:<span class="data-keyword">{{dataItem.established_time}}</span></div>
                    <div class="search-des tb-cell" >注册资金:<span class="data-keyword">{{dataItem.registered_capital }}</span></div>
                </div>
                <div class="tb-singleline">
                    <div class="search-des tb-cell" >电话:<span class="">{{dataItem.mobile}}</span></div>
                    <div class="search-des tb-cell" >近况:<span class="isonline">{{ dataItem.code == 0 ? '离线': '上线'}}</span></div>
                </div>
            </li> -->
        </ul>
        <ChooseSelect
            class="select-choose"
            @isSelect="searchNewResult"
            :selectAllItem="{key:'label',value:'全省'}"
            :showProp="'label'"
            :selecterState="citySelecterState"
            :getChooseData="AreaJSON"
            :initChooseState="getSelectedProvince"
            btnText="精准检索"
            :closeBtn="true"
        >
            <template v-slot:head>
                <div class="select-head" >
                    <ComInput :config="nameInputConfig" class="select-input" />
                    <ComInput :config="businessInputConfig" class="select-input" />
                    <div class="select-subhead" >所属城市:</div>
                </div>
            </template>
        </ChooseSelect>
        <!-- <div v-show="" class="">

        </div> -->
    </div>
</template>

<script>
import specialTypeList from '@/assets/js/specialInfo.json'
import ChooseSelect from '@/components/common/ChooseSelect';
import AreaJSON from '@/assets/js/area.json';
import ComInput from "@/components/common/ComInput";
import CompanyListItem from '@/components/shangLian/CompanyListItem'
import { commonFnMixin } from '@/assets/js/mixins.js';
import { setTimeout } from 'timers';



export default {
    mixins:[commonFnMixin],
    components:{
        ChooseSelect,
        ComInput,
        CompanyListItem,

    },

    data() {
        return {
            loading:true,

            AreaJSON:[{
                "id": 0,
                "label": "全省"
            },],
            getSelectedProvince:[], //省份
            citySelecterState:{
                isShow:false,
            },

            typeStr: [
                "八千多万企业资源",
                "优先排名推荐",
                "海报展示",
                "短信触客",
                "分发触客",
                "法律采招推荐",
                "圈层营销",
                "客户池推荐",
                "团队协同"
            ],

            searchDateList:[],

            specialType:null,
            searchProvince:'',
            searchCity:'',
            searchServe:'',
            searchIndustryid:null,
            searchId:null,

            nameInputConfig:{
                inputPH: "企业名称",
                changeText:'',
            },
            businessInputConfig:{
                inputPH: "专注服务",
                changeText:'',
            },

            searchStart:0,
        }
    },

    computed: {
        specialImg(){
            if(this.specialType !== null){
                return require(`@/assets/image/special/${this.specialType}.jpg`);
            }
            return '';
        },
    },

    created(){

        this.getParamsReq();

    },
    mounted(){

        let title = '#上下链#：法律服务专场，面向八千多万企业提供法律服务。';
        this.$store.commit('setShareInfo',{
            title,
        })
        this.$store.commit('setFriendNetInfo',{
            title,
        })
    },

    methods: {
        isAuto(){
            this.identityAuth(()=>this.$toast('您已有认证企业'),this.$router.push('/autConfig'),false);
        },
        toSearchCompany(dataItem){
            dataItem.isClick = true;
            this.searchDateList = JSON.parse(JSON.stringify(this.searchDateList))
            setTimeout(()=>{
                this.$router.push({
                    name:'searchCompany',
                    params:{
                        enterpriseid:dataItem.enterprisesid,
                        enterprise:dataItem.enterprises,
                        industryid:this.searchIndustryid,
                    },
                })
                
            },100)
        },

        async getParamsReq(){
            try{

                let { province , specialType } = this.$route.query
                
                if(![province , specialType].includes(undefined)){
                    
                    let specialItem = specialTypeList.findIndex(ele=>{
                        return ele.name == specialType;
                    })
                    let { industryid , trueParams , id} = specialTypeList[specialItem];
                    
                    this.searchDateList = await this.specialDataSearch(province, undefined , industryid , id );
                    
                    this.contentFix(this.searchDateList);
                    
                    this.searchProvince = province;
                    this.searchCity = province + '全省';
                    this.specialType = specialType;
                    this.searchId = id;
                    this.searchIndustryid = industryid;
                    this.loading = false;
                }else{
                    throw 'no query params'
                }

            }catch(e){
                this.$router.push('/')
                
            }
        },

        contentFix(dataList){
            dataList.forEach(ele=>{
                for(let item in ele){
                    if([null,"",undefined].includes(ele[item])){
                        ele[item] = '未知'
                    }else{
                        if(item == 'established_time'){
                            ele[item] = this.$commonFn.StrDateFormat(ele[item],4,false)
                        }
                        if(item == 'kind'){
                            ele[item] = this.$commonFn.businessScope(ele[item]).join('、')
                        }
                    }
                }
            })
        },

        async searchNewResult(getData){
            let name = this.nameInputConfig.changeText,
            business = this.businessInputConfig.changeText;
            this.getSelectedProvince = JSON.parse(JSON.stringify(getData));
            
            this.searchStart = 0;
            let { searchProvince, searchCity,searchIndustryid, searchId} = this;
            
            this.searchDateList = await this.specialDataSearch(searchProvince, undefined , searchIndustryid , searchId, name, business, );

            this.contentFix(this.searchDateList);
            
        },
        async loadMore(){
            this.loading = true;
            let { searchProvince, searchCity,searchIndustryid, searchId} = this,
            name = this.nameInputConfig.changeText,
            business = this.businessInputConfig.changeText,
            newResult = [];
            if( [searchProvince, searchIndustryid,searchId].some( ele=>[undefined,false,'',null].includes(ele) ) ){return}
            
            newResult = await this.specialDataSearch(searchProvince, undefined , searchIndustryid , searchId, name, business, );
            // this.searchDateList.concat(newResult);
            if(!newResult){
                this.loading = true;
                return;
            }
            
            this.searchDateList.push(...newResult)
            this.contentFix(this.searchDateList);
            this.loading = false;
            
        },
        async specialDataSearch(province, city , industryid, id, company_name='', business='', ){
            let data = await this.$axios.get(this.$api.specialDataSearch,{
                params:{
                    provinces: province,
                    industryid: industryid,
                    business,
                    company_name,
                    start:this.searchStart++,
                    city,
                    id,
                }
            })
            .then(res=>{
                return res.data
            })
            console.log(data);
            return data.contacts;
        },

        accurateSearch(){
            this.citySelecterState.isShow = true;
            // this.$toast('即将开放，敬请期待');

        },

        spSearch(){
            this.$axios.get(this.$api.specialDataList,{
                params:{
                    logo: 'up',
                    provinces: '广东省',
                    industryid: 12,
                    name: '律师事务所'
                }
            })
            .then(res=>{
                console.log(res);

            })
        },

        
    },

}
</script>

<style lang="scss" scoped>

$spBgColor:#91c8f1;
$desFontColor:#012038;
$upLine:#840510;

.cgreen{
    color:$themeColor;

}

// .tb-singleline{
//     display:table;
//     width:100%;

// }
// .tb-cell{
//     display:table-cell;

// }

#sp-certification{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:.98rem;
    overflow-y: scroll;

    .sp_header{
        background: white;
        padding: 0 0 1px;
    }

    .sp_img{
        margin: 0 0 0.6rem;
    }

    .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: center;

    }
    .item{
        width: 30%;
        margin-bottom: 0.2rem;

    }
    .img-box{
        display: inline-block;
        width: 0.86rem;
        height: 0.86rem;
    }
    img{
        width: 100%;
        height: 100%;

    }
    .auth-type{
        color: #333;
        margin-top: 0.2rem;
        font-weight: 800;
        font-size: 0.26rem;

    }

    .apply{
        @include circularBeadBtn(1.2rem,90%);
        margin: 0.7rem auto;

    }
    .keypoint{
        font-size:0.6rem;

    }
    .cost{
        font-size: 0.48rem;   
    }


    .search-bar{
        margin: 0.2rem 0;

    }

    .search-condition{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

    }
    .search-des{
        font-size:0.3rem;
        color:#676767;

    }

    .search-content{
        color:black;

    }

    .search-btn{
        @include circularBeadBtn(0.8rem,2rem);
        margin:0.2rem auto;
        font-size: 0.3rem;
        
    }
    

    // .search-item_title{
    //     font-size: 0.36rem;
    //     font-weight: bold;

    // }

    // .search-dataitem{
    //     background-color:white;
    //     background-repeat: no-repeat;
    //     background-position: top right;
    //     background-size:auto 60%;
    //     margin:0.2rem;
    //     padding:0.2rem;
    //     border-radius:4px;
    // }

    // .item-no_auto{
    //     background-image:url('../../assets/icon/noAutoTag.png');
    //     .data-keyword{
    //         color: #e98015;
    //     }
    //     .isonline{
    //         color:$themeColor;
    //     }
    // }

    // .item-is_auto{
    //     background-image:url('../../assets/icon/isAutoTag.png');
    //     background-color: $spBgColor;
    //     .data-keyword{
    //         color: $desFontColor;
    //     }
    //     .isonline{
    //         color:$upLine;
    //     }
    // }

    // .item-is_click{
    //     background-color:$themeColor;

    // }
    
    .select-head{
        // display: flex;
        // justify-content: space-around;
        // flex-direction: column;
        // height: 3rem;

        padding: 0 0.3rem;

        // box-sizing: border-box;
        font-size: 0.3rem;

    }

    .select-input{
        margin:0.3rem 0;
        height: 0.98rem;

    }

    .select-subhead{
        font-weight: bold;

    }

    
}
</style>

<style lang="scss" >
.select-choose{
    .search-list-content{
        width:90%;
        left:50%;
        right:unset;
        border-radius: 8px;
        transform: translate(-50%, -50%);
    }

    .btn_content{
        border-radius: 8px;
    }

    .btn_110{
        border-radius: 0.65rem;

    }
}
    
</style>