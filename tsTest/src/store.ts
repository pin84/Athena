import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const tips = {
  state: {
    isShow: false
  },
  mutations: {
    // isShowTips(state: Object, params: Boolean) {
    //   state.isShow = params
    // }
  },
  actions: {

  },
};




export default new Vuex.Store(tips);
