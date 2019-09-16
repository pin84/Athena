import axios from 'axios';
import api from './api';
import specialInfo from '@/assets/js/specialInfo.json';
// import util from '../utils';

/**
 * warn 代用下面的方法需要用到 async await 关键词 才能正常运行
 */
let ajax = {};

const ShangLian = {
    // 获取链圈数据
    getLian(params) {
        let data = axios.get(api.lian)
            .then(res => res.data.data.json)
            .catch(rej => rej)
        return data;
    },


    // 获取下链数据
    getDownData() {
        // let {industryId} = params;
        // if(params==undefined || industryId ==undefined ){
        //     return 'no params';
        // }
        let data = axios.get(api.downData)
            .then(res => res.data)
            .catch(rej => rej)
        return data;
    },

    getListData(params) {
        let { industryId, provinces } = params;
        if (params == undefined || industryId == undefined || provinces == undefined) {
            return 'no params';
        }
        let data = axios.get(api.listData + industryId, {
            params: {
                provinces
            }
        })
            .then(res => res.data)
            .catch(rej => rej)
        return data;
    },

    // 列表 换一批
    getNextGroup() {
        let data = axios.get(api.nextGroup)
            .then(res => res.data)
            .catch(rej => rej)
        return data;
    },

    // 自画像信息
    getSelfInfo(params) {
        let { enterpriseid } = params;
        if (params == undefined || enterpriseid == undefined) {
            return 'no params';
        }
        let data = axios.get(api.selfInfo, {
            params: {
                enterpriseid: params.enterpriseid
            }
        })
            .then(res => res.data)
            .catch(rej => rej)
        return data;
    },

    getCompanyListData(params) {
        let {
            industryid,
            provinces,
            logo,
            up_industry,
        } = params;

        if (params == undefined) {
            return 'no params';
        }
        let data = axios.get(api.searchPrinceCom, {
            params: {
                industryid,
                provinces,
                logo,
                up_industry: logo == 'up' ? up_industry : '',
            }
        })
            .then(res => res.data)
            .catch(rej => rej)
        return data;
    },

    getSpecialIndustry(params){
        if(params==false){ return 'no params'}
        let spItemIndex = specialInfo.findIndex(ele=>{
            return ele.name == params
        });
        if( spItemIndex == -1 ) { return 'no special industry' }

        return axios.get(api.speciaIndustry,{
            params:{
                kind: specialInfo[spItemIndex].trueParams
            }
        }).then(res=>{
            res.data[0].ClassName.Name = params
            return res.data
        }
        )
    },


};

const dingYue = {

};

const chuKe = {

};

const lianQuan = {

};

const common = {
    async  getAllCity() {
        let { data } = await axios.get(api.getCity)
        return data.all_province_list

    }
};

const other = {

};

ajax = {
    ...ShangLian,
    ...dingYue,
    ...chuKe,
    ...lianQuan,
    ...common,
    ...other,
};

export default ajax;
