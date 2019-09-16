<template>
    <li
    :class="{
        'item-no_auto':dataItem.code==0,
        'item-is_auto':dataItem.code!==0,
        'item-is_click':dataItem.isClick,
    }" class="search-dataitem">
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
</li>
</template>

<script>
export default {
    props:{
        getDataItem:{
            default:{},
            type:Object,
        },
        
    },
    data(){
        return{
            dataItem:this.getDataItem,

        }

    },
    created(){

    },
    watch:{
        getDataItem:{
            handler(newVal){
                this.dataItem = newVal;
            },
            deep:true,
        }
    }
}
</script>

<style lang="scss" scoped>
$spBgColor:#91c8f1;
$desFontColor:#012038;
$upLine:#840510;

.tb-singleline{
    display:table;
    width:100%;

}
.tb-cell{
    display:table-cell;

}
.search-des{
    font-size:0.3rem;
    color:#676767;

}

.search-item_title{
    font-size: 0.36rem;
    font-weight: bold;

}

.search-dataitem{
    background-color:white;
    background-repeat: no-repeat;
    background-position: top right;
    background-size:auto 60%;
    margin:0.2rem;
    padding:0.2rem;
    border-radius:4px;
}

.item-no_auto{
    background-image:url('../../assets/icon/noAutoTag.png');
    .data-keyword{
        color: #e98015;
    }
    .isonline{
        color:$themeColor;
    }
}

.item-is_auto{
    background-image:url('../../assets/icon/isAutoTag.png');
    background-color: $spBgColor;
    .data-keyword{
        color: $desFontColor;
    }
    .isonline{
        color:$upLine;
    }
}

.item-is_click{
    background-color:$themeColor;

}
</style>