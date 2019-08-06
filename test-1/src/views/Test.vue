<template>
    <div id="test-page">
     
    <div id="test">
        <button class="btn1" @click="autExplain">显示企业认证弹窗</button>
        <button class="btn1" @click="autConfig">企业认证设置界面</button>

<!-- 
      <button class="btn1" @click="getData">查询企业维度</button>

      <button class="btn1" @click="getUselianjierId">查询用户ID</button>

      <button class="btn1" @click="GetCheckdimension">获取查询勾选维度</button>

      <button class="btn1" @click="SelectDimDetial">获取用户已勾选的维度链接</button>

      <button class="btn1" @click="save">保存</button>

      <button class="btn1" @click="lianjie">获取企业维度链接</button>

      
      <div class="list">
        <div class="item" v-for="(item) of info" :key="item.id" >
          <div @click="save(item.id,item.name)">
          <div>{{item.name}}</div>
          </div>
        </div>
      </div> -->

      <comp-aut></comp-aut>
      <aut-config></aut-config>
    </div>
  </div>
</template>

<style lang="scss">

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#test{
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom:0;
  top:0;
  z-index: 999999999;
  .btn1{
    border: 1px solid black;

  }

  .imp{
      color:red;
  }

}


</style>

<script>
let vm = null;
import CompAut from '../components/shangLian/autPop/CompAut'
import AutConfig from '../components/shangLian/autPop/AutConfig'

export default {
  components:{
      CompAut,
      AutConfig
  },
  beforeCreate() {
    vm = this;
  },
  created() {
  
    
  },
  data() {
    return {
      info:[
        {
        id:1,
        name:'基本信息'
        },
        {
        id:2,
        name:'基本信息'
        }
      ]
    }
  },
  methods: {
    autExplain(){
        this.$store.commit('showPop','cert');
    },

    autConfig(){
        this.$store.commit('showPop','cert-ing');
    },

    // 查询企业维度
    getData(){
      this.$axios.get(this.$api.GetDimensionName,{
        params:{
          pageIndex:'1', //无此参数不影响 有可能写了默认值1
          pageSize:'30', //若失去该参数 返回结果的rows为空 该参数暂且写大 若写小了 有可能出现超过30 不显示30以后的数值
          where:[{
              name:'title',
              value:""
          }]
        }
      })
      .then((res)=>{
        console.log('test res',res);
        let rows = res.data.Result.rows
        this.$set(this,'info',rows);
        console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

      }).catch((rej)=>{
        console.log('test rej',rej)
      });
    },


    save(id,name){
      
      let info = {
          hidSxUserID:8,
          EntIndustState : true,
          EntShareState : true,
          EntPersonState : true,
          EntForeignState : true,
          SxProKeywordState : true,
          WfKeywordState : true,
          EntTaxCreditState : false,
          EntIprTradeState : false,
          EntIprPatentState : false,
          EntIprCertState : false,
          EntIprWorksState : false,
          EntIprSoftState : false,
          EntIprWebsiteState : false,
          EntRecruitState : false,
      }

      this.$axios.post(this.$api.SaveCheckdimension,{

        // userId:11,
        info

      }).then((res)=>{
        console.log(res);
      }).catch((rej)=>{
        console.log(rej);
      })

    },


    getUserId(){
      let  userId = this.$commonFn.handleStroage.getLocalStorage("userInfo").ID
      console.log(userId,'zzzzzzzzzz');
      this.$axios.get(this.$api.GetCheckdimension,{
        params:{
          userId:11,
          
        }
      }).then((res)=>{
        console.log('getUserId res',res);
        // let rows = res.data.Result.rows
        // this.$set(this,'info',rows);
        // console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

      }).catch((rej)=>{
        console.log('getUserId rej',rej)
      });

    },


    // 获取查询勾选维度（第一次进入 用户第一次登陆 默认保存基本资料维度）
    GetCheckdimension(){
      console.log('GetCheckdimension GetCheckdimension GetCheckdimension')
        this.$axios.post(this.$api.GetCheckdimension,{
          pageIndex:1,
          PageSize: 30,
          Where: [{
            name: "userid",
            value: 11
          }]
          
          // EntIndustState:true,
          // EntShareState:true
        
      }).then((res)=>{
        console.log('GetCheckdimension res',res);
        // let rows = res.data.Result.rows
        // this.$set(this,'info',rows);
        // console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

      }).catch((rej)=>{
        console.log('GetCheckdimension rej',rej)
      });
    },

    lianjie(){
        console.log('lianjie lianjie ')
        this.$axios.post(this.$api.SelectDimDetial,{
            // params:{
              "PageIndex": 1,
              "PageSize": 6,
              "Where": [{
                "name": "id", //维度id
                "value": "3" 
                },
                {
                  "name": "enterpriseid", //企业id
                "value": "d5adee6f-3125-458d-9da1-0002ebd22f72"
                }]
            // }	
            // EntIndustState:true,
            // EntShareState:true
          
        }).then((res)=>{
          console.log('lianjie res',res);
          // let rows = res.data.Result.rows
          // this.$set(this,'info',rows);
          // console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

        }).catch((rej)=>{
          console.log('lianjie rej',rej)
        });
    },
    
    SelectDimDetial(){
      /*
      // 获取用户已勾选的维度名字信息
        this.$axios.get(this.$api.GetDimensionName,{
        params:{
          pageIndex:1,
          pageSize:30,
          where:[{
            name:'title',
            value:''
          }]
          // EntIndustState:true,
          // EntShareState:true
        }
      }).then((res)=>{
        console.log('GetDimensionName res',res);
        // let rows = res.data.Result.rows
        // this.$set(this,'info',rows);
        // console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

      }).catch((rej)=>{
        console.log('GetDimensionName rej',rej)
      });

      
      // 查询已勾选的企业维度
      this.$axios.get(this.$api.GetCheckdimension,{
        params:{
          userId:12,
          // enterpriseid:,
          // EntShareState:true
        }
      }).then((res)=>{
        console.log('GetCheckdimension res',res);
        // let rows = res.data.Result.rows
        // this.$set(this,'info',rows);
        // console.log(this.info,'---- info ----',this.info[0],'rows',res.data.Result.rows);

      }).catch((rej)=>{
        console.log('GetCheckdimension rej',rej)
      });
*/    
      function GetDimensionName() {
        
        return vm.$axios.get(vm.$api.GetDimensionName,{
          params:{
            pageIndex:1,
            pageSize:30,
            where:[{
              name:'title',
              value:''
            }]
            // EntIndustState:true,
            // EntShareState:true
          }
        })
      }

      function GetCheckdimension(){
        return vm.$axios.get(vm.$api.GetCheckdimension,{
          params:{
            userId:12,
            // enterpriseid:,
            // EntShareState:true
          }
        })
      }

      // 同时获取 
      // 用户已勾选的维度名字信息
      // 已勾选的企业维度
      vm.$axios.all([GetDimensionName(),GetCheckdimension()])
      .then(vm.$axios.spread(
          (par1,par2)=>{
            console.log(
              'GetDimensionName',
              par1,
              'GetCheckdimension',
              par2
            )

            vm.info = par1;

          }
      ))

    },

    
  },
}
</script>