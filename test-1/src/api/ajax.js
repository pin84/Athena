import axios from 'axios';
import api from './api';
// import util from '../utils';

/**
 * warn 代用下面的方法需要用到 async await 关键词 才能正常运行
 */
let ajax = {};

// 获取链圈数据
ajax.getLian = function (params) {
    let data = axios.get(api.lian)
        .then(res => res.data.data.json)
        .catch(rej => rej)
    return data;
}

// 获取下链数据
ajax.getDownData = function(){
    // let {industryId} = params;
    // if(params==undefined || industryId ==undefined ){
    //     return 'no params';
    // }
    let data = axios.get(api.downData)
                .then(res=>res.data)
                .catch(rej=>rej)
    return data;
}

// 
ajax.getListData = function(params){
    let {industryId,provinces} = params;
    if(params==undefined || industryId ==undefined || provinces ==undefined){
        return 'no params';
    }
    let data = axios.get(api.listData+industryId,{
        params:{
            provinces
        }
    })
    .then(res=>res.data)
    .catch(rej=>rej)
    return data;
}

// 列表 换一批
ajax.getNextGroup = function(){
    let data = axios.get(api.nextGroup)
                .then(res=>res.data)
                .catch(rej=>rej)
    return data;
}

// 自画像信息
ajax.getSelfInfo = function(params){
    let {enterpriseid} = params;
    if(params==undefined || enterpriseid ==undefined){
        return 'no params';
    }
    let data = axios.get(api.selfInfo,{
        params:{
            enterpriseid:params.enterpriseid
        }
    })
    .then(res=>res.data)
    .catch(rej=>rej)
    return data;
}

ajax.getCompanyListData = function(params){
    let {
        industryid,
        provinces,
        logo,
        up_industry,
    } = params;
    
    if(params==undefined){
        return 'no params';
    }
    let data = axios.get(api.searchPrinceCom,{
        params:{
            industryid,
            provinces,
            logo,
            up_industry:logo=='up'?up_industry:'',
        }
    })
    .then(res=>res.data)
    .catch(rej=>rej)
    return data;
}

export default ajax;
