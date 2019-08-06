<template>
    <!-- ForeignInvestment - 对外投资 s -->
    <!-- <com-pop v-if="index==0" :is-show="item.isShow" @close="maskShow(item)" :class="{fullscreen:item.isFull,'g-pop-show':item.isShow}" @closefull="fullScreen(item)"> -->
    <com-pop my-index="dimen-4" >
        <!-- @close="maskShow(item)" -->
        <template v-slot:pop-content>
            <!-- 这里是中间内容插槽 -->                                        
            <!-- main-header s -->
            <com-head :get-company="company"></com-head>
            <!-- main-header e -->
            
            <com-content-layout  get-info-title="对外投资" my-index="">
                <template  v-slot:layout-content >
                    <template v-if="keyList.length !== 0">
                        
                        <div class="gd-content info-list" v-for="(keyitem) in keyList" :key="keyitem.key" >
                            <div class="item-single sp">
                                {{keyitem.Name}}
                                <!-- {{keyList}} -->
                            </div>
                            <div class="info-item item-single">
                                <div class="item-name">
                                    职位
                                </div>
                                <div class="item-value">
                                    {{keyitem.Position}}
                                </div>
                            </div>

                            <div class="info-item item-single">
                                <div class="item-name">
                                    关联公司
                                </div>
                                <div class="item-value">
                                    <!-- {{gditem.Stake}} -->
                                    {{keyitem.Associates}}
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="gd-content info-list" v-else>
                        <h3>暂无记录</h3>
                    </div>

                </template>
            </com-content-layout>
            
        </template>
        
        <template v-slot:flex-left>
            <!-- <com-foot @fs="fullScreen(item)"> -->
            <!-- </com-foot> -->
        </template>
        <template v-slot:flex-right>
        </template>
    </com-pop>

    <!-- ForeignInvestment 对外投资 e -->
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
            company:{}, //该值用于传输到com-head显示
            keyList:[],
        }
    },
    created() {
        // 在被初始化 创建后请求接口获取数据并将数据注入到模板中
        this.getInfo();
       
    },

    watch: {
        // 当我的showingCId 发生改变时 重新调用接口信息
        '$store.state.loginInfo.showingCId':{
            handler(){
                this.getInfo();
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
                "value": "4"  //对应值 （上方） //4 对外投资
                },
                {
                    "name": "enterpriseid", //企业维度对应的链接ID
                    "value": this.$store.state.loginInfo.showingCId
                    
                    // "value": this.$commonFn.handleStroage.getLocalStorage('userInfo').hidBidsCompanyID // 企业ID
                }]
            })
            .then(res=>{
                console.log(res,'entForeigninfo 对外投资');
                
                // 获得数据company 其中 该函数已将已处理的数据导入至data中
                let company = this.$commonFn.comHeadTrans.call(this,res);
                
                // entForeigninfo 对外投资
                let entForeigninfo = res.data.Result.rows.entForeigninfo
                console.log(entForeigninfo,'entForeigninfo')
                // this.$set(this,'keyList',entPersoninfo)
                
                /*
                let infoList = [
                    {
                        "企业名称":company.Name || "未知",
                        "统一社会信用代码":entIndustinfo.Code || "未知",
                        "注册资本":entIndustinfo.Capital || "未知",
                        "经营状态":entIndustinfo.OperaState || "未知",
                        "法定代表人":entIndustinfo.LegalReprese || "未知",
                        "登记机关":entIndustinfo.Registration || "未知",
                        "成立日期": company.CreationTime || "未知",
                        "类型":entIndustinfo.ComparryType || "未知",
                        "所属行业":entIndustinfo.BLindustry || "未知",
                        "人员规模":entIndustinfo.StaffSize || "未知",
                        "电话":entIndustinfo.Phone || "未知",
                        "邮箱":entIndustinfo.Email || "未知",
                        "官网":entIndustinfo.Website || "未知",
                        "企业地址":entIndustinfo.EnAddress || "未知",
                        "经营范围":entIndustinfo.Scope  || "未知",
                    },
                    
                ]
                this.$set(this,'infoList',infoList);*/
            })
            .catch(rej=>{
                console.log(rej);
            })
        },
        
    },
}
</script>


