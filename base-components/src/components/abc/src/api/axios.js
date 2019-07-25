import Vue from 'vue';
import axios from 'axios';
import commonFn from '../utils'
import router from '../router'
import store from '../store'
import {Toast ,Indicator } from 'mint-ui'


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

axios.interceptors.request.use(
config => {

    Indicator.open({
        text: `数据 让营销者先行...`,
    });
    return config
},

error => {
    Indicator.close();
    return Promise.reject(error)
});

axios.interceptors.response.use(
    config => {
        Indicator.close();
        let token_state = config.data.token_state
        // token_state = true
        if( token_state === false && token_state!==undefined ){
            // debugger
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
        }
        return config;
    },
    
    error => {
        Indicator.close();
        return Promise.reject(error)
});

Vue.prototype.$axios = axios;


export default axios;
