<template>
  <div id="operator">
    <TopSort />
    <div class="pushTemplateList">
      <h3>短信模板审核列表</h3>
      <ul class="list">
        <!-- <li class="item" v-if="isEmpty" >
        您尚未添加模板，请选择'添加模板'添加
        <span class="item-span">您尚未添加模板，请选择</span>
        <span  class="item-span" style="color:green;display:inline"></span>
        <span  class="item-span"></span>
        </li>-->
        <li class="item" v-for="(item,index) in templates" :key="index" v-show="item['审核意见'].split('--')[0]=== '审核通过' || item['审核意见'].split('--')[0]=== '审核不通过'">
          <template v-for="(v,key) in item" >
            <template v-if="key !=='id' && key !=='itemData' && key !=='审核意见' " >
            <!-- v-if="key=='待审核'" -->
            
            <p
              :key="key"
              class="content_p"
              v-if="aduitShow(item,key,v)"
              :class="{'line-slice':key=='审核人'}"
            >
              <!-- v-if="key !=='id' && key !=='审核意见' " -->
            <span class="title">{{key}}</span>
            <span  class="title-content">{{v}}</span>
            </p>
            </template>
          </template>
          <p class="i-add-ok">
            <span >审核建议</span>
            <textarea ref="input" class="textarea"  rows="3" cols="30%"    type="text" :value='item.itemData.sms_audit_content' />
          </p>



          <div class="btnAndStatus">
            审核意见
            <span v-if="item['审核意见']=='待审核'"  class="btn self-flexleft">
              <span class="active" @click="agree(item,index)">同意</span>
              <span @click="disagree(item,index)">不同意</span>
            </span>
            <span v-else class="self-flexleft">{{item['审核意见']}}</span>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/compop/comPopTemList.styl';
import TopSort from './TopSort'
export default {
  name: "Operator",

  data() {
    return {
      userInfo:this.$store.state.loginInfo.userInfo,
      templatesTest: [],
      templates:[],
      opinionText:'',//审核不通过时的文字
    };
  },
  components: {
    TopSort
  },

  async beforeMount(){

    // 数据获取格式转换

    
    // 获取审核列表数据
    let {data:auditList} =  await this.$axios.get(this.$api.getAuditTemList)

    // console.log(`===data====`,data);

    if(auditList !== undefined){
      // this.auditListTrans(auditList,'state');
      this.auditListTrans(auditList,'time',true);
    }else{

    }
    
    
  },

  methods: {
    // 根绝审核的状态 判断是否需要显示审核人及审核时间 （待审核才显示）
    aduitShow(item,key,val){
      if(key == '审核时间' || key == '审核人'){
        if(item['审核意见'] !== '待审核'){
          
          return true;

        }else{
          return false;
        }
      }
      return true;
    },

    // 审核状态判断 根据不同的状态选择不同的颜色
    auditState(val,key){
      
      let auditStyle 
      if(key === '审核状态'){
        if(val === '审核不通过'){
          auditStyle = {
            color:'red'
          }
        }

        else if(val === '审核通过'){
          auditStyle = {
            color:'green'
          }
        }

        return auditStyle;
      
      }
      
    },

    // 根据 状态排序
    stateSort(arr,sortProperty,sortRule= false){
      arr.sort((a,b)=>{
        
        let sta = a.itemData[sortProperty];
        let stb = b.itemData[sortProperty];
        if(sortRule){
          return   stb - sta
        }else{
          return   sta - stb
        }
      })
    },

    // 模板列表数据转换
    auditListTrans(temList,rule='state',sortRule=false){
      //                                sortRule true 倒序 false 正序
      // let temList = this.templatesTest;
      let showTemList = [];
        // 模板内容循环渲染
        temList.forEach((ele,index) => {
          let {id,template_name,sms_type,content,data_time,username,state,reviewer_name,reviewer_time} =  ele;
          ele.time = new Date(reviewer_time);

          let stateText;
          switch(state){
            case 1:
              stateText = '待审核';
            break;

            case 2:
              stateText = '审核通过';
            break;

            case 3:
              stateText = '审核不通过';
            break;
          }
          
          let item = {
            id :id,
            "模板名称":template_name,
            "模板类型":sms_type,
            "模板内容":content,
            "申请日期":this.$commonFn.formatTime(new Date(data_time)),
            "申请人":username,
            "审核意见":stateText,
            "审核人":reviewer_name,
            "审核时间":this.$commonFn.formatTime(new Date(reviewer_time)),
            itemData:ele,

          }
          // console.log(item)
          // debugger
          showTemList.push(item)
        });
      // let str1 = JSON.parse(JSON.stringify(showTemList))
      this.stateSort(showTemList,rule,sortRule);
      console.log(showTemList)
      this.templates = showTemList;
      // let str2 = JSON.parse(JSON.stringify(showTemList))
    },

    // 刷新模板信息
    async freshInfo(){

      // 获取审核列表数据
      let {data:auditList} =  await this.$axios.get(this.$api.getAuditTemList)
      console.log(`=======`,auditList);
      // console.log(auditList);
      if(auditList !== undefined){

        this.auditListTrans(auditList,'time',true);
      }else{

      }

    },
    
    // 同意及不同意的按钮公共方法
    
    async isAgreeCommonFun(item,aduitState,str){
      let stateNum = 3
      aduitState?stateNum = 2: stateNum = 3;

      this.$indicator.open({
        text: `数据 让营销者先行...`,
      });

      let {state,template_name,id} = item.itemData;

      let data ={
        state:stateNum,
        sms_audit_content:str,
        // template_name,
        id,
        token:this.userInfo.token,
      }

      console.log(`=======`,data);
      
      let {data:auditList} =  await this.$axios.post(this.$api.setauditTemState,data).catch(rej=>{
        this.$indicator.close();

        this.$toast({
          message:'审核失败,请检查网络或稍后再重试',
        })
        return rej
      })
      
      if(auditList.message == '审核成功'){
        this.$toast({
          message:'审核成功',
        })
        
      }else{
        this.$toast({
          message:'审核失败,请检查网络或稍后再重试',
        })
      }

      this.freshInfo();

    },

    // 同意按钮
    async agree(item,index){
      let str = '现在您可以进行短信触客推送'
      this.isAgreeCommonFun(item,true,str);
      // this.$indicator.open({
      //   text: `数据 让营销者先行...`,
      // });

      // let {state,template_name,id} = item.itemData;
      // let {data:auditList} =  await this.$axios.post(this.$api.setauditTemState,{
      //   state:2,
      //   template_name,
      //   id,
      //   token:this.userInfo.token,
      // }).catch(rej=>{
      //   this.$indicator.close();

      //   this.$toast({
      //     message:'审核失败,请检查网络或稍后再重试',
      //   })
      //   return rej
      // })
      
      // if(auditList.message == '审核成功'){
      //   this.$toast({
      //     message:'审核成功',
      //   })
        
      // }else{
      //   this.$toast({
      //     message:'审核失败,请检查网络或稍后再重试',
      //   })
      // }

      // this.freshInfo();


    },

    // 不同意按钮
    async disagree(item,index){
      let input = this.$refs.input
      let str = input[index].value
      this.opinionText = str
      if(str.length < 5 ){
        return this.$toast('审核意见不能少于5个字')
      }
      this.isAgreeCommonFun(item,false,str);
      input[index].value = ''
      // console.log(item.id)
      // console.log(item)
      // let {state,template_name,id} = item.itemData;
      // console.log(state,template_name,id)

      // let {data:auditList} =  await this.$axios.post(this.$api.setauditTemState,{
      //   state:3,
      //   template_name,
      //   id,
      //   token:this.userInfo.token,
      // })
      // if(auditList.message == '审核成功'){
      //   this.$toast({
      //     message:'审核成功',
      //   })

      // }else{
      //   this.$toast({
      //     message:'审核失败,请检查网络或稍后再重试',
      //   })
      // }

      // this.freshInfo();

    },

  }

};
</script>

<style lang="stylus" scope>
#operator
  position absolute
  top 0
  left 0
  width 100%
  bottom 0.98rem
  overflow scroll

// 审核人前分割 s
.line-slice
  margin-top 10px

// 审核人前分割 e

.self-flexleft
  align-self: flex-start

.i-add-ok
  display flex
  margin 0.2rem 0
  span 
    flex-basis 30%
  .textarea  
    border none
    background-color #f3f3f3
    color #222
    font-size 0.28rem
    // border 1px solid red
    font-family: 'SourceHanSansCN-Normal','microsoft yahei','sans-serif','Tahoma','Open Sans','Helvetica Neue','Arial','Hiragino Sans GB','WenQuanYi Micro Hei'; 
.title-content
  width 70%    
  // input 
  //   border none  
/*
.item-span
  // float left

.pushTemplateList
  width 100%
  background-color #fff
  padding-bottom 30px
  font-size 0.3rem
  height auto
  // border-radius 10px
  h3
    text-align center
    padding-top 40px
  .list
    // width 100%
    padding 0 0.20rem
    .item
      background-color #f3f3f3
      border-radius 10px
      margin-top 10px
      padding 0.20rem
      box-sizing border-box
      display flex
      flex-direction column
      font-size 0.28rem
      
      .content_p
        display flex
        // height 0.38rem
        margin 0.19rem 0 0
        line-height 0.28rem
        
        &>:first-child
          flex-basis 30%
          // font-weight 520
          
        &.hidden
          display none  
          

      .btnAndStatus
        display flex
        justify-content space-between 
        // height 36px
        // line-height 36px   
        .btn
          position relative
          span
            padding 1px 12px
            border 1px solid #333333
            border-radius 13px
            margin-right 15px
          .active
            color #09a2a3
            border 1px solid #09a2a3
        .status_0
          color #FF9900
        .status_1
          color #00CC00
        .status_2
          color #CC0033

*/

</style>