<template>
<div class="customer-set-item">
    <div @click="$emit('selClick')" class="sele-tips">
        <div class="sele-tip-group">
            <div class="tip-icon">{{tipNum}}</div>
            <div class="tip-des">{{tipText}}</div>
        </div>
        <div class="place_holder">
            {{placeHolder}}
        </div>
        <div v-if="linkTo" class="iconfont icon-link">&#xe68c;</div>
    </div>
    <div v-if="tipsDes" class="tips-des">
        {{tipsDes}}
    </div>
    <div v-if="chooseArray" class="sele-content signalLine">
        <template v-for="(contentItem,index) in chooseArray">
            {{contentItem}}{{index+1 == chooseArray.length ?'':'，'}}
        </template>
    </div>
    <slot name="select-setter"/>
</div>
</template>

<script>
import ChooseSelect from '@/components/common/ChooseSelect';

export default {
    name:'',
    components:{
        ChooseSelect,
    },
    props:{
        // 注意 下面注释均为内容实例 具体请看代码及效果图
        tipNum:'', //数字图标
        tipText:'', //组合条件一
        tipsDes:'',  // 可输入企业名称包含关键词，企业主营业务或经营产品
        tipsDetails:'', //问号
        placeHolder:'', // 选择潜在客户所属行业
        chooseArray:null, //选择内容 如广东省、北京市、湖南省
        linkTo:{
            type:Boolean,
            default:false,
        }
    },
    data() {
        return {
            selecterState:{
                isShow:false,
            },
        }
    },
    created(){

    },
    methods: {
        showState(){
            this.selecterState.isShow = true;
        },

    },
}
</script>

<style lang="scss">
$tipsRes:#f64644;

.customer-set-item{

    padding: 0.4rem 0.2rem 0;
    box-sizing: border-box;
    width: 100%;
    background: white;
    font-size: 0.3rem;

    .sele-tips{
        display: flex;
        align-items: center;
        padding: 0 0 0.1rem;

    }
    .tips-des{
        border-bottom: 1px solid #f3f3f3;
        // padding: 0.2rem 0;
        color:#999;
        font-size: 0.24rem;
        
    }

    $tipGroupLineH:0.4rem;
    .sele-tip-group{
        display: block;
        position: relative;
        padding: 0 0.2rem 0 0.4rem;
        margin: 0 0.2rem 0 0.2rem;
        width:auto;
        height: $tipGroupLineH;
        border-radius: 0 $tipGroupLineH / 2 $tipGroupLineH / 2 0;
        font-weight: bold;
        background: #fdf1f0;

    }

    .tip-icon{
        $diameter:0.5rem;

        position: absolute;
        left: -$diameter / 2;
        top: 50%;
        transform: translate(0,-50%);
        
        width: $diameter;
        height: $diameter;

        font-size: 0.3rem;
        line-height: $diameter;
        text-align: center;
        color:white;
        border-radius: 50%;
        background: $tipsRes;

    }
    
    .tip-des{

        color:$tipsRes;
        text-align: center;
        font-size: 0.2rem;
        line-height: $tipGroupLineH;

    }

    .place_holder{
        display: block;
        font-weight: bold;

    }
    .icon-link{
        display: block;
        margin-left: auto;
        font-size: 0.3rem;

    }

    .sele-content{
        color: #666;
        // padding: 0.3rem 0;
        font-size: 0.3rem;
        line-height: 0.9rem;


    }

}

</style>
