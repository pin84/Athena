<template>
    <div id="customer-set">
        <div class="des_block">
            潜在客户池推荐设置
        </div>

        <div class="set-detail">
            <CustomerSelect
                @selClick="openIndustrySel"
                :linkTo="true"
                :tipNum="1"
                :tipText="'组合条件一'"
                :placeHolder="'选择潜在客户所属行业'"
                :chooseArray="isAllIndustry(getSelectedIndustry.map(ele=>ele.industry))"
                class="cus-sele"
             >
                <!-- :tipsDetails="''" -->
                <!-- :tipsDes="'可输入企业名称包含关键词'"  -->
                <template v-slot:select-setter>
                    <ChooseSelect
                     :selecterState="industrySelecterState"
                     :getChooseData="industrySrcData"
                     @isSelect="getIndustry"
                     :selectAllItem="{key:'industry',value:'全行业'}"
                     :showProp="'industry'"
                     :initChooseState="getSelectedIndustry"
                     />
                </template>

            </CustomerSelect>

            <CustomerSelect
                @selClick="openProvinceSel" 
                :linkTo="true"
                :tipNum="2"
                :tipText="'组合条件二'"
                :placeHolder="'选择潜在客户所属省份'"
                :chooseArray="isAllProvince(getSelectedProvince.map(ele=>ele.label))"
                class="cus-sele"
             >
                <!-- :tipsDetails="''" -->
                <!-- :tipsDes="'可输入企业名称包含关键词'"  -->
                <template v-slot:select-setter>
                    <ChooseSelect
                     @isSelect="getProvince"
                     :selectAllItem="{key:'label',value:'全国'}"
                     :showProp="'label'"
                     :selecterState="provinceSelecterState"
                     :getChooseData="AreaJSON"
                     :initChooseState="getSelectedProvince"
                     />
                </template>

            </CustomerSelect>

            <CustomerSelect
                :tipNum="3" 
                :tipText="'组合条件三'" 
                tipsDes="可输入企业名称包括关键词,企业主营业务或经营产品"
                :placeHolder="'选择潜在客户企业推荐'"
                class="cus-sele"
            >
                <template v-slot:select-setter>
                    <div class="item-set-tips">
                        <span class="item-set-tips-order">A、</span>
                        <span class="item-set-tips-des">添加潜在客户企业名称包括关键词</span>
                        <span class="item-set-tips-small">(可添加5个、空为默认全部）</span>
                    </div>
                    <ComAddKeyWord 
                     :maxLength="6"
                     :maxTagNum="5"
                     placeHolder="输入关键词，2-6个中文字"
                     :checkFunc="checkKeyWord"
                     :initTagList="getCompanyNameKeyWords"
                    >
                     <!-- @getTagLiST="(tagList)=>getCompanyNameKeyWords = tagList" -->
                    </ComAddKeyWord>
                    <div class="item-set-tips">
                        <span class="item-set-tips-order">B、</span>
                        <span class="item-set-tips-des">添加潜在客户企业主营业务或经营产品</span>
                        <span class="item-set-tips-small">(可添加5个、空为默认全部）</span>
                    </div>
                    <ComAddKeyWord 
                     :maxLength="6"
                     :maxTagNum="5"
                     placeHolder="输入主营业务或主营产品，2-6个中文字"
                     :checkFunc="checkKeyWord"
                     :initTagList="getMainBussinessKeyWords"
                    >
                     <!-- @getTagLiST="(tagList)=>getMainBussinessKeyWords = tagList" -->
                    </ComAddKeyWord>
                </template>
            </CustomerSelect>

            <CustomerSelect
                :tipNum="4"
                :tipText="'组合条件四'"
                :placeHolder="'按企业标签推荐'"
                tipsDes="可按标签项目 (成立日期、注册资金)推荐"
                class="cus-sele"
            >
                <template v-slot:select-setter>

                    <div class="item-set-tips">
                        <span class="item-set-tips-order">A、</span>
                        <span class="item-set-tips-des">企业生日（成立日期）</span>
                        <ul @click="selectData" :style="selectDateFlag?'':'overflow:hidden'" class="data-select">
                            <li class="data-item">{{getDataListVal}}</li>
                            <li :data-selectData="date" :key="date" v-for="date in dateList" class="data-item">{{date}}</li>
                        </ul>
                        <span class="item-set-tips-des">天前推荐</span>
                    </div>
                    
                    <div class="item-set-tips">
                        <span class="item-set-tips-order">B、</span>
                        <span class="item-set-tips-des">注册资金</span>
                    </div>
                    <div class="select-btn-group">
                        
                        <div
                         v-for="(registeredItem,index) in registeredSelectData"
                         :key="index"
                         @click="btnClick(registeredItem,index)"
                         :class="registeredItem.active?'active':''"
                         class="select-btn"
                         >
                            {{registeredItem.label}}
                        </div>
                        <div style="width:30%;height:0;"></div>
                        <div style="width:30%;height:0;"></div>
                    </div>

                </template>
            </CustomerSelect>
            
            <div class="customer-set-item cus-sele">
                <ul class="setting">
                    <li class="isT">
                        <span>微信提醒推送</span>
                        <input
                        class="weui-switch"
                        type="checkbox"
                        v-model="wechatPushState"
                        >
                    </li>
                    <li class="isT">
                        <span>微信头像昵称</span>
                        <div class="userInfo">
                        <div class="avatar">
                            <img
                            :src="userInfo.headimgUrl"
                            alt=""
                            >
                        </div>
                        <span class="name">{{userInfo.username}}</span>
                        </div>
                    </li>
                    <li class="isT">
                        <span>启用/关闭潜在客户池</span>
                        <input
                        class="weui-switch"
                        type="checkbox"
                        v-model="customPoolState"
                        >
                    </li>
                </ul>
            </div>
            <!-- <div class="customer-set-item"> -->
            <!-- </div> -->
        </div>
        <div @click="saveConfig" class="save-config">保存设置</div>
        
    </div>
</template>

<script>
import CustomerSelect from '@/components/customerPool/CustomerSelect.vue';
import ChooseSelect from '@/components/common/ChooseSelect';
import AreaJSON from '@/assets/js/area.json';
import ComAddKeyWord from '@/components/common/ComAddKeyWord';

export default {
    name:'MyScore',
    components:{
        CustomerSelect,
        ChooseSelect,
        ComAddKeyWord,
    },
    data(){
        
        return{
          userInfo:this.$store.state.loginInfo.userInfo,

          // --获取配置信息 s

          //从组件传值回来 s
          getSelectedIndustry:[], //行业
          getSelectedProvince:[], //省份
          getCompanyNameKeyWords:[], //企业 名称关键词
          getMainBussinessKeyWords:[], //企业 主营业务或经营产品
          //从组件传值回来 e

          getDataListVal:'不限',
          wechatPushState:true, //微信推送状态
          customPoolState:true, //客户池状态

          initGetData:null, //初始化获取保存配置

          // --获取配置信息 e
          industrySelecterState:{
            isShow:false,
          },
          provinceSelecterState:{
            isShow:false,
          },
          AreaJSON:AreaJSON,
          industrySrcData:[{id:0,industry:'全行业'}],
          
          //   
          registeredSelectData:[
            //   {
            //       label:'全部',
            //       active:false,
            //       val:null,
            //   },
              {
                  label:'100万以内',
                  active:false,
                  val:'0,100',
              },
              {
                  label:'100-500万',
                  active:false,
                  val:'100,500',
              },
              {
                  label:'500-1000万',
                  active:false,
                  val:'500,1000',
              },
              {
                  label:'1000-3000万',
                  active:false,
                  val:'1000,3000',
              },
              {
                  label:'3000-5000万',
                  active:false,
                  val:'3000,5000',
              },
              {
                  label:'5000万以上',
                  active:false,
                  val:'5000,20000',
              },
          ],
          
          registeredAll:false,
          registeredActive:this.registeredCal,
          dateList:['不限',7,15,20,30,60],
          selectDateFlag:false,
          
        }

    },
    computed: {
        // 所有行业ID的字符串
        allIndustryIDStr(){
            let allIndAry = []
            for(let i=1; i<=19; i++){
                allIndAry.push(i);
            }
            allIndAry[0] = 6;
            allIndAry[5] = 1;

            return allIndAry.join(',')
        },

        // 显示所有行业名称的字符串
        allIndustryNameStr(){
            let AreaJSON = JSON.parse(JSON.stringify(AreaJSON));
            return AreaJSON.map(ele=>ele.label).join(',');
        },

        // 显示所有省份的字符串
        allProvinceStr(){
            let AllAreaJSON = JSON.parse(JSON.stringify(this.AreaJSON));
            AllAreaJSON.shift()
            
            return AllAreaJSON.map(ele=>ele.label).join(',');
        },

        // 选择当前行业id字符串 用于后端传值
        selectIndustryIDStr(){
            
            let result = this.getSelectedIndustry.map(ele=>ele.id).join(',');

            if(result === "0"){
                result = this.allIndustryIDStr;
            }
            
            return result;
        },

        // 选择当前省份名称的字符串 用于后端传值
        selectProvinceStr(){
            let result = this.getSelectedProvince.map(ele=>ele.label).join(',');

            if(result === '全国'){
                result = this.allProvinceStr;
            }
            return result
        },

        // 选择当前行业的数据数组
        selectIndustryArr(){
            let result = this.getSelectedIndustry.map(ele=>ele.industry).join(',');
            if(result === this.allIndustryNameStr){
                result = [{id:0,industry:'全行业'}]
            }
            return result
        },

        // 选择当前省份的数据数组
        selectProvinceArr(){
            let result = this.getSelectedProvince.map(ele=>ele.label).join(',');
            if(result === this.allProvinceStr){
                result = this.allProvinceStr[0]
            }
            return result
        },
        
        registeredCal(){
            let registeredActive = {};
             this.registeredSelectData.forEach(element => {
                registeredActive[element]=false;
            });
            return registeredActive
        },
        getRegisteredSelectData(){
            let getSelect = this.registeredSelectData.filter((ele)=>{
                return ele.active==true
            });
            return getSelect;
        },
    },

    created(){

        this.getConfigData();

    },
    mounted(){
        let core = this.$commonFn.coreJudge();
        if(core == 'ios'){
            let inputList = document.getElementsByTagName('input');
            Array.prototype.forEach.call(inputList,(ele)=>{
                
                ele.addEventListener("focus",function(){
                    setTimeout(function(){
                        document.body.scrollTop = 0;
                    },300)
                })
            })
        }

    },

    methods: {

        isAllIndustry(industryList){
            if(industryList.length == 19){ return ['全行业'] }

            return industryList
        },

        isAllProvince(provinceList){
            if(provinceList.length == 31){ return ['全国'] }

            return provinceList
        },

        async getConfigData(){
            
            let configRes = this.$axios.get(this.$api.customPoolGetSetting,{
                params:{token:this.userInfo.token}
            }).then(res=>{
                return res.data[0]
            });
            
            let industrySrcDataRes = this.$axios.get(this.$api.selectIndustry).then(res=>res.data)
            this.industrySrcData = this.industrySrcData.concat( JSON.parse(JSON.stringify(await industrySrcDataRes)))
            
            if(await configRes.length == 0){ 
                console.log(configRes)
                return 
            }
            let getConfig = await configRes
            if( !getConfig ) { return; }
            console.log(getConfig,'getConfig')
            let {
                company_name_birthday,
                contains_company_name,
                create_time,
                headimgUrl,
                id,
                industry,
                kind,
                province,
                registered_capital,
                up_down_chain_push_state,
                user_id,
                wechat_push_state,
            } = getConfig;
            this.initGetData = JSON.parse(JSON.stringify(getConfig));

            this.getSelectedIndustry = industry == null? [] : industry.split(',').map(ele=>{
                let industryIndex = this.industrySrcData.findIndex(industryItem=>{
                    return industryItem.id == ele;
                })
                return {
                    industry:this.industrySrcData[industryIndex].industry,
                    id:ele
                }
            })

            this.getSelectedProvince = province == null? [] : province.split(',').map(ele=>{
                let provinceIndex = this.AreaJSON.findIndex(areaItem=>{
                    return areaItem.label == ele;
                })
                return {
                    label:ele,
                    id:this.AreaJSON[provinceIndex].id
                }
            })
            
            this.getCompanyNameKeyWords  = contains_company_name == null? [] : contains_company_name.split(','); //主营产品
            this.getMainBussinessKeyWords =  kind == null? [] : kind.split(','); //企业关键词
            this.getDataListVal = company_name_birthday !== null && company_name_birthday !== 0 ? company_name_birthday:'不限'; //成立日期
            
            if( ['None',null].indexOf(registered_capital) === -1 ){ //注册资金
                let chooseArr = JSON.parse(registered_capital.replace(/\'/g,'\"'));
                
                chooseArr.forEach(ele=>{
                    let  findItem = this.registeredSelectData.findIndex((registerItem)=>{
                        
                        return registerItem.val == ele;
                    })
                    
                    if(findItem !== -1){
                        this.registeredSelectData[findItem].active = true;
                    }
                })
            }
            /*
            else{
                this.registeredSelectData[0].active = true;
            }
            */
            this.wechatPushState = wechat_push_state == 0 ? false : true;
            this.customPoolState = up_down_chain_push_state == 0 ? false : true;

            
        },

        selectData(e){
            this.selectDateFlag = !this.selectDateFlag;
            let selectdata = e.target.dataset.selectdata;
            if(selectdata == undefined){ return; }

            this.getDataListVal = e.target.dataset.selectdata;
        },
        
        btnClick(registeredItem,index){
            // if(index==0){
            //     this.registeredSelectData.forEach(ele=>{
            //         ele.active = false;
            //     })
            //     this.registeredSelectData[0].active = true
            // }else{
            //     }
            // if(this.registeredSelectData[0].active){
            //     this.registeredSelectData[0].active = false;
            // }
            registeredItem.active = !registeredItem.active;
        },
        /*
        btnActive(registeredItem,index){
            let result = '';
            if(index!==0){
                result = (this.registeredActive[registeredItem] && !this.registeredAll)?'active':''
            }else{
                result = this.registeredAll ?'active':''
            }
            return result;    
        },
        */
        checkKeyWord(tag){
            let result = tag.length>=2 && tag.length<=6?true:false;
            result?null:this.$toast('请输入2-6文字');
            return result
        },

        openIndustrySel(){
            this.industrySelecterState.isShow =true;
        },
        openProvinceSel(){
            this.provinceSelecterState.isShow =true;
        },

        getIndustry(getData){
            console.log(getData);
            this.getSelectedIndustry = JSON.parse(JSON.stringify(getData));

        },

        getProvince(getData){
            console.log(getData);
            this.getSelectedProvince = JSON.parse(JSON.stringify(getData));
            
        },

        checkConfigVal(){

            let contentCheck = (()=>{
                let checkArr = [
                    this.getCompanyNameKeyWords.length==0,
                    this.getMainBussinessKeyWords.length==0,
                    this.getDataListVal == '不限',
                    this.registeredSelectData.find(ele=>ele.active==true) == undefined,
                ];

                console.log(this,this.getCompanyNameKeyWords)
                
                if(checkArr.findIndex(ele=> ele===false) == -1){
                    
                    return true;
                }else{
                    
                    return false;
                }

            })()

            let checkDict = {
                '请选择潜在客户所属行业信息': this.getSelectedIndustry.length == 0 ,
                '请选择潜在客户所属省份信息' : this.getSelectedProvince.length == 0 ,
                '企业关键词、企业主营业务、企业生日、注册资金必须填其中一项':contentCheck,
            }

            for( let checkItem in checkDict ){
                if(checkDict[checkItem]){
                    this.$toast({
                        message:checkItem
                    });
                    return false;
                }
            }
            return true;
            
        },

        sameParamsCheck(postData){
            
            let initGetData = JSON.parse(JSON.stringify(this.initGetData));
            if(initGetData === null ){ return false }

            let params = ['company_name_birthday', 'industry', 'province', 'up_down_chain_push_state', 'wechat_push_state']
            
            let findDifference = params.find(ele=>{
            
                return initGetData[ele] !== postData[ele] ? true: false;
            })
            if( findDifference !== undefined ){ return false }
            initGetData.registered_capital
            
            let
            initGetDataRegistered_capital = initGetData.registered_capital ? JSON.parse(initGetData.registered_capital.replace(/\'/g,'\"')) :[],
            postDataRegistered_capital = postData.registered_capital ? postData.registered_capital : [];
            // if( initGetDataRegistered_capital  === postDataRegistered_capital ){ return false }
            if( initGetDataRegistered_capital.length !== postDataRegistered_capital.length ){ return false }
            
            let sameArrContent = (arrA, arrB)=>{
                arrA.sort()
                arrB.sort()
                return arrA+"" === arrB+"" ? true : false
            }

            let 
            initGetDataKind = initGetData.kind ? initGetData.kind.split(',') : [],
            postDataKind = postData.kind ? postData.kind.split(',') : [];
            if( initGetDataKind.length !== postDataKind.length ){ return false }
            if( !sameArrContent( initGetDataKind, postDataKind ) ){return false}
            
            let
            initGetDataContains_company_name = initGetData.contains_company_name ? initGetData.contains_company_name.split(',') : [],
            postDataContains_company_name = postData.contains_company_name ? postData.contains_company_name.split(',') : [];
            
            if( initGetDataContains_company_name.length !== postDataContains_company_name.length ) { return false }
            if( !sameArrContent( initGetDataContains_company_name, postDataContains_company_name ) ){return false }

            return true;
        },

        saveConfig(industryId,province){
            if( !this.checkConfigVal()){ return; }
            
            let data = {
                industry: this.selectIndustryIDStr,
                province: this.selectProvinceStr,
                headimgUrl: this.userInfo.headimgUrl,
                token: this.userInfo.token,
                kind: this.getMainBussinessKeyWords.join(','),
                contains_company_name: this.getCompanyNameKeyWords.join(','),
                company_name_birthday: this.getDataListVal=='不限' ? null : +this.getDataListVal,
                registered_capital: (this.getRegisteredSelectData.length >=1 ) ? this.getRegisteredSelectData.map(ele=>ele.val): null,
                wechat_push_state: +this.wechatPushState,
                up_down_chain_push_state: +this.customPoolState,
            }
            if( this.sameParamsCheck(data) ){
                this.bus.$emit('isFollow');
                this.$router.push({
                    name:'customerpool',
                    params:{
                        pathFrom:this.$route.path
                    }
                });
                return;
            }
            
            // data.industry === "0" ? data.industry = this.allIndustryIDStr: null;
            // data.province == '全国' ? data.province = this.allProvinceStr : null;
            for( let dataItem in data ){
                if( data[dataItem] ==='' ){
                    data[dataItem] = null;
                }
            }
            let newAxios = this.$axios.create();

            let saveSettingState = newAxios.post(this.$api.customPoolSaveSetting,data)
                        .then(res=>{
                           let saveConfigRes = res.data;
                           let { message } = saveConfigRes;
                            if( message !== '保存数据' ){
                                this.$toast({
                                    message
                                });
                            }
                            return true;
                        });

            // let { message } = saveConfigRes;
            // if( message == '保存数据'){
            //     return;
            //     this.$toast({
            //         message:'保存设置成功'
            //     });
            // }

            // 由于保存接口请求间隔过长 故在其未响应时跳转至客户池页面以减少等待时长
            this.$indicator.open({
                text: `数据 让营销者先行...`,
            });
            
            setTimeout(() => {
                this.$indicator.close();
                this.bus.$emit('isFollow');
                this.$router.push({
                    name:'customerpool',
                    params:{
                        saveSettingState,
                        // pathFrom:this.$route.path
                    }
                });
                
            }, 3000);

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
.data-select{
    position: relative;
    $selectHeightL:0.4rem;
    height: $selectHeightL;
    margin: 0 0.2rem;
    background: #f3f3f3;
    width: 1.2rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    border-radius: 4px;

    &::before{
        content:'';
        position: absolute;
        right:0.1rem;
        top: 50%;
        transform:translate(0,-50%);
        border-top:0.18rem solid #656565;
        border-left:0.09rem solid transparent;
        border-right:0.09rem solid transparent;
    }
    
    .data-item{
        padding: 0 0.1rem;
        background: #f3f3f3;
        text-align:left;
        color:#36bab7;
        height: $selectHeightL;
        border-bottom:1px solid #ccc;
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
    }
}
#customer-set{
    $themeColor:#49a0a2;
    .customer-set-item{
        padding: 0.2rem 0.2rem 0;
        box-sizing: border-box;
        width: 100%;
        background: white;
        font-size: 0.3rem;
        
    }
    
        .setting {
            width: 100%;
            padding: 0 0.1rem;
            box-sizing: border-box;
            background-color: #fff;

            .isT {
            padding: 0.22rem 0;
            border-bottom: 1px solid #f3f3f3;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .weui-switch {
                background-color: #09a2a3;
            }

            .timer {
                padding: 0 0.2rem 0 0.4rem;

                &::after {
                display: inline-block;
                content: '';
                width: 0.32rem;
                height: 0.32rem;
                background: url('../../assets/icon/arrow@16_29.png') 90% no-repeat;
                background-size: 0.16rem 0.32rem;
                vertical-align: middle;
                margin-left: 0.1rem;
                }
            }

            .otherT {
                position: absolute;
                width: 0.6rem;
                height: 1.2rem;
                border: 1px solid red;
            }

            .userInfo {
                display: flex;
                align-items: center;

                .avatar {
                display: inline-block;
                width: 0.8rem;
                height: 0.8rem;
                border: 1px solid #f3f3f3;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 0.16rem;

                img {
                    width: 100%;
                    height: 100%;
                }
                }

                .name {
                margin-right: 0.1rem;
                }
            }
            }
        }

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


    .set-detail{
        position: absolute;
        top: 1.2rem;
        bottom:1rem;
        left: 0;
        width: 100%;

        overflow: scroll;
        background: #f3f3f3;

        .item-set-tips{
            display: flex;
            font-size: 0.26rem;
            align-items: center;
            margin: 0.2rem 0;
        }

            .item-set-tips-order{
                color:#37bbb9;
                
            }
            .item-set-tips-des{
                
            }
            .item-set-tips-small{
                font-size: 0.16rem;
                color:#666;

            }

        .select-btn-group{
            
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
            text-align: center;
        }
            .select-btn{
                
                margin: 0.1rem 0;
                width: 30%;
                height: 0.6rem;
                font-size: 0.24rem;
                line-height: 0.6rem;
                // padding: 0.16rem 0.2rem;
                box-sizing: border-box;
                background: #f3f3f3;
                &.active{
                    color:white;
                    background: #37bbb9;
                }
            }
        
    }
    
    .cus-sele{
        margin: 0.2rem 0;

    }

}

.save-config{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    font-size: 0.3rem;
    text-align: center;
    background: #37bbb9;
    line-height: 1rem;
    color:white;

}

</style>
