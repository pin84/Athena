export let commonFnMixin = {

    methods: {
        
        
        getCompanyInfo(){
          return this.$axios.get(this.$api.companyInfo,{
              params:{
                token:this.$store.state.loginInfo.userInfo.token
              }
          })
          .then(res=>res.data)
          .then(rej=>rej)
        },

        // 判断是否含有认证企业
        async identityAuth(identityFn,noCertified=()=>{},isShowToast=true){
                //  ↑已有认证企业  未有认证企业      是否显示提示
            // let indexInfo = this.$store.state.company.indexInfo;
            let indexInfo = await this.getCompanyInfo()
            this.$store.commit('indexInfo',indexInfo)
            let { identity_status } = indexInfo
            
            if(identity_status){
                console.log(identity_status ,'ok')
                identityFn()
            }else{
                if(isShowToast){
                    this.$toast({
                        message:'您还未有认证企业，请认证后再发送'
                    })
                }
                noCertified()
            }
        },

    },

}

