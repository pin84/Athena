<template>
    <!-- 股东信息 s -->
    <com-pop :my-index="'dimen-2'">
        <!-- @close="maskShow(item)" -->
        <template v-slot:pop-content>
            
            <!-- main-header s -->
            <com-head :get-company="company"></com-head>
            <!-- main-header e -->

            <!-- gs-info s -->
            <com-content-layout get-info-title="股东信息" my-index="" >
                <template  v-slot:layout-content >
                    <template v-if="getGdList.length !== 0">
                        
                        <div class="gd-content info-list"   v-for="gditem in getGdList" :key="gditem.id"  >
                            <div class="item-single sp">
                                {{gditem.Name}}
                            </div>
                            <div class="info-item item-single">
                                <div class="item-name">
                                    持股比例
                                </div>
                                <div class="item-value">
                                    {{gditem.Stake}}
                                </div>
                            </div>

                            <div class="info-item item-single">
                                <div class="item-name">
                                    认缴率（万元）
                                </div>
                                <div class="item-value">
                                    <!-- {{gditem.Stake}} -->
                                    {{gditem.SpandingMoney/10000}}万元
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="gd-content info-list" v-else>
                        <h3>暂无记录</h3>
                    </div>

                </template>
            </com-content-layout>
            
            <!-- gs-info e -->
        </template>

        <!-- <template v-slot:pop-footer> -->
            <!-- 这里是尾部内容插槽 -->
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
        <!-- </template> -->
    </com-pop>
    <!-- 股东信息 e -->
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
            getGdList:[],
            company:{}
        }
    },

    created() {

        // 在被初始化 创建后请求接口获取数据并将数据注入到模板中
        // this.getInfo();
    },

    watch: {

        // 当我的showingCId 发生改变时 重新调用接口信息
        '$store.state.loginInfo.showingCId':{
            handler(){
                // this.getInfo();
            }
        }
    },

    methods: {
        
        // 用于获取接口信息 请求接口获取数据后将数据注入到模板中
        getInfo(){
            this.$axios
            .post(this.$api.SelectDimDetial,{
                "PageIndex": 1,
                "PageSize": 30,
                "Where": [{
                "name": "id", //企业维度标题ID
                "value": "2"  //对应值 （上方） //2 股东信息
                },
                {
                    "name": "enterpriseid", //企业维度对应的链接ID
                    "value": this.$store.state.loginInfo.showingCId
                    // "value": this.$commonFn.handleStroage.getLocalStorage('userInfo').hidBidsCompanyID // 企业ID
                }]
            })
            .then(res=>{
                // console.warn(res);

                this.$commonFn.comHeadTrans.call(this,res);

                let ShareinfoList = res.data.Result.rows.entShareinfo
                
                this.$set(this,'getGdList',ShareinfoList);
                // this.getGdList = ShareinfoList
                
            })
            .catch(rej=>{
                console.log(rej);
            })
        }
    },

}
</script>
