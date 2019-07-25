<template>
    <!-- gs- 工商信息 s -->
    <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
    <com-pop my-index="">
        <!-- @close="maskShow(item)" -->
        <template v-slot:pop-content>
            <!-- 这里是中间内容插槽 -->                                        
            <!-- main-header s -->
            <com-head :get-company="company"></com-head>
            <!-- main-header e -->

            <!-- gs-info s -->
            <com-content-layout :get-info-list="infoList" get-info-title="" my-index=""></com-content-layout>
            <!-- gs-info e -->
        </template>
        
        <template v-slot:flex-left>
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
        </template>
        <template v-slot:flex-right>
        </template>
    </com-pop>

    <!-- 工商信息 e -->
</template>

<script>
const ComPop = resolve =>{
    import ('@/components/common/ComPop').then(module =>{
        resolve(module)
    })
}
const ComHead = resolve =>{
    import ('@/components/common/ComHead').then(module =>{
        resolve(module)
    })
}

const ComContentLayout = resolve =>{
    import ('@/components/common/ComContentLayout').then(module =>{
        resolve(module)
    })
}

export default {

    components:{
        ComPop,
        ComHead,
        ComContentLayout
    },
    
    data() {
        return {
            company:null, //该值用于传输到com-head显示
            infoList:[

            ],
        }
    },
    created() {

        // this.$axios
        // .post(this.$api.SelectDimDetial,{
        //     "PageIndex": 1,
        //     "PageSize": 30,
        //     "Where": [{
        //       "name": "id", //企业维度标题ID
        //       "value": "1"  //对应值 （上方）
        //       },
        //       {
        //         "name": "enterpriseid", //企业维度对应的链接ID
        //         "value": "d5adee6f-3125-458d-9da1-0002ebd22f72"
                
        //         // "value": this.$commonFn.handleStroage.getLocalStorage('userInfo').hidBidsCompanyID // 企业ID
        //       }]
        // })
        // .then(res=>{
        //     console.log(res);
        // })
        // .catch(rej=>{
        //     console.log(rej);
        // })
    },

    watch: {
        
    },
}
</script>