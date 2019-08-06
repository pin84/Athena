<template>
  <div class="page">
    
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      resData:{}
    }
  },
  beaforeCreate(){
    
  },

  async mounted(){
    
    // console.log(code);
    // if(code!== null){
        // http://192.168.31.73:8000/oauth/users
        let code = this.getParam('code');

        // let isTest = true;
        let isTest = false;
        if(isTest){
          
          return
        }else{
          // 如果有code 则请求token
          
          if(code!== null){
          
            this.$axios.get(this.$api.getUserInfo,{
              params:{
                code
              }
            }).then(res=>{

              let getUserInfoByCode = {
                createdTime: Date.now(),
                ...res.data
              };
              
              this.$store.commit('userInfo',getUserInfoByCode);
              this.$commonFn.handleStroage.setLocalStorage('sxlUserInfo',getUserInfoByCode)
              
              
              let  targetPage = sessionStorage.getItem('targetPage') || '/';
              sessionStorage.removeItem('targetPage');
              // let  targetPage = this.$commonFn.handleStroage.getLocalStorage('targetPage') || '/';
              // this.$commonFn.handleStroage.removeLocalStorage('targetPage');
              
              // console.log('userInfo vuex'+JSON.stringify(this.$store.state.loginInfo.userInfo))
              // console.log('userInfo localStorage'+JSON.stringify(this.$commonFn.handleStroage.getLocalStorage('sxlUserInfo')))
              if( this.$commonFn.handleStroage.getLocalStorage('sxlUserInfo') ){

                window.location.href = '?/#'+targetPage;

              }else{
                // alert('setLocalStorage fail'+JSON.stringify(this.$commonFn.handleStroage.getLocalStorage('sxlUserInfo')));
              }

            })
          
          }else{
           
             // 如果没 url 上没有 code 则请求code
              this.$axios.get(this.$api.getCode).then(res=>{
                let firstRes = res.data;

                if(firstRes.auth_url){
                  
                  // let auth_url_ok = confirm('auth_url is ok:'+JSON.stringify(firstRes))

                  // if(auth_url_ok){
                  //   }
                    // window.location.href = firstRes.auth_url;
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx326433af14961e48&redirect_uri=http%3A%2F%2Fwww.shangxialian.net%2Fjs%2F%23%2Foauth%2Fusers&response_type=code&scope=snsapi_userinfo&state=/&connect_redirect=1&uin=Mjg2OTMwNDgxNQ%3D%3D&key=21d78e7e7d15501c9354aa6bf6d5cde816a795df4c76b1b3fd066dd9712a3a17fb9fe2ac1e314b5fe46947e9c77cf5d0&pass_ticket=R95PqHlSZ07MsFEf0vs3KhlvN6B29zj7CHdgau1r5VQ+CXIKWwX//LUwOaLf2eZS2hCWAMt2O8sOx1MYWPE+pA=='
                  // console.log(firstRes)
                  // window.location.hostname
                }else{
                  
                  // alert('请求结果中没有对应属性');
                  // console.log('请求结果中没有对应属性')
                  // console.log(firstRes.auth_url)
                }
                
              })

              /*
              try{
                let firstRes = await this.$axios.get(this.$api.getCode).then(res=>res.data)
                console.log(firstRes)
                // let first = confirm('get code '+firstRes.auth_url)
                // if(first){
                  

                // }
  
              }catch(e){
                console.log(e);
                console.log('请求code失败')
              }
              */
              
          }
        }
        
  },
  methods:{
     /** 
     * 获取指定的URL参数值 
     * URL:http://www.quwan.com/index?name=tyler 
     * 参数：paramName URL参数 
     * 调用方法:getParam("name") 
     * 返回值:tyler 
     */ 

    
    getParam(paramName) {
        let paramValue = "", isFound = !1; 
        if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) { 
            let arrSource = unescape(location.search).substring(1, location.search.length).split("&"), i = 0; 
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
        } 
        return paramValue == "" && (paramValue = null), paramValue 
    } 
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
</style>
