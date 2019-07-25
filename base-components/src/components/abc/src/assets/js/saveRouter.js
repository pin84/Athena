router.beforeEach((to,from,next)=>{
    alert(to.path)
    if(isTest){
      alert('router isTest!')  
      next();
    }else{
      // vuex没有token
      if(!store.state.loginInfo.userInfo.token){
        alert('token no')
        toGetCode();
      }else{
        let code = getParam('code');
        if(code!== null){
          alert('get token')
          // let token;
            try{

              axios.get(api.getUserInfo,{
                params:{
                  code
                }
              }).then(res=>{
               let getUserInfoByCode =  res.data;
               store.commit('userInfo',getUserInfoByCode);
               commonFn.handleStroage.setLocalStorage('sxlUserInfo',getUserInfoByCode)
                console.log(getUserInfoByCode);
                axios.get('http://192.168.31.73:8000/pay/',null,{
                  headers:{
                    'Authorization' : 'JWT' + getUserInfoByCode.token
                  }
                })
                .then(res=>{
                  console.log(res);
                })

              })

            }catch(e){
              alert('有错')
              console.log(e)
              console.log('token请求失败')
            }

            // this.$router.push({
            //   name:'shangLianTest',
            // })
            // window.location.href = './'
            
        }else{
          alert('url no code');
        // 如果没 url 上没有 code 则请求code
            try{
               axios.get(api.getCode).then(res=>{
                  let firstRes = res.data
                  console.log(firstRes)
                  alert('get code '+firstRes.auth_url)
                  if(firstRes.auth_url){
                    window.location.href = firstRes.auth_url;
                    console.log(firstRes)
                    // window.location.hostname
                  }else{
                    console.log('请求结果中没有对应属性')
                    console.log(firstRes.auth_url)
                  }
              })

            }catch(e){
              console.log(e);
              console.log('请求code失败')
            }
            
            
        }

      }
    }
    
    // next();
  });