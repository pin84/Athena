import Vue from 'vue';
import axios from 'axios';
import api from './api.js';
import commonFn from '../utils'
import router from '../router'
import store from '../store'
import { Toast, Indicator } from 'mint-ui'

// axios拦截器
// function axiosInterceptors(){
//     axios.interceptors.request.use(
//     config => {
//         // 这里写死一个token，你需要在这里取到你设置好的token的值
//         // const token = 'this is a token';
//         // if (token) {
//         //     // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
//         //     config.headers.Authorization = 'JWT'+token;
//         // }


//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     });
// }

let reqNum = 0; //并发请求时 等请求都完成才关闭loading
axios.interceptors.request.use(
    config => {
       
        Indicator.open({
            text: `数据 让营销者先行...`,
        });
        reqNum++;
        
        return config
    },

    error => {
        if (store.userInfo) {

            let arr = [653,464,4,600]

            if (arr.includes(store.userInfo.user_id)) {
                Toast('请求')
                Toast(JSON.stringify(error))
            }

        }
        reqNum--;
        if(reqNum == 0){
            Indicator.close();
        }
        return Promise.reject(error)
    });

axios.interceptors.response.use(
    config => {
        
        reqNum--;
        if(reqNum == 0){
            Indicator.close();
        }
        // if (store.state.pageControl.isloading === false) {
        //     Indicator.close();
        // }
        // if(config.status !== 200){
        // }
        // let token_state = config.data.token_state
        // token_state = true
        // if( token_state === false && token_state!==undefined ){
        // localStorage.removeItem('sxlUserInfo');
        /*
        Toast({
            message:'身份验证，正重新认证'
        })
        setTimeout(()=>{
        },1000)
        */
        //    location.reload()
        // window.location.href = location.href;
        // }
        return config;
    },

    error => {
        reqNum--;
        if(reqNum == 0){
            Indicator.close();
        }
        if (store.userInfo) {

            let arr = [653,464,4,600]

            if (arr.includes(store.userInfo.user_id)) {
                Toast('请求')
                Toast(JSON.stringify(error))
            }

        }
        let username = store.state.loginInfo.userInfo.username;
        let noGetArr = [
            "XY lim",
            "池伟青Vince",
            "伊谢尔伦的风",
            "阿伟",
            "莊琼洲",
            "Ray",
          ].includes(username);
        if(!noGetArr){
            
            axios.post(api.errorApi,{
                info:JSON.stringify({
                  from:"axios",
                  userInfo:{
                      ...store.state.loginInfo.userInfo,
                  },
                  indexInfo:{
                      ...store.state.company.indexInfo,
                  },
                  error:{
                      ...error,
                  },

                }),
                path: window.location.href,
            })
        }

        Indicator.close();
        return Promise.reject(error)
    }
)

Vue.prototype.$axios = axios;


export default axios;
